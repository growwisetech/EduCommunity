"use server";

import { createHash } from "node:crypto";
import { and, count, eq, gte } from "drizzle-orm";
import { headers } from "next/headers";
import { getDb, schema } from "@/db";
import { getAudience } from "@/content/audiences";
import { emails, sendEmail } from "@/lib/email";
import { joinSchema, type JoinFieldErrors, type JoinState } from "@/lib/join-schema";
import { site } from "@/lib/site";

const MAX_REQUESTS_PER_HOUR = 5;

function hashIp(ip: string) {
  return createHash("sha256")
    .update(`${process.env.ADMIN_SESSION_SECRET ?? ""}:${ip}`)
    .digest("hex");
}

export async function submitJoinRequest(_prev: JoinState, formData: FormData): Promise<JoinState> {
  // Bots tend to fill every field, including the visually hidden one.
  if (formData.get("website")) return { status: "success" };

  const raw = Object.fromEntries(
    ["fullName", "email", "phone", "role", "organization", "location", "goals", "consent"].map((k) => [
      k,
      formData.get(k)?.toString() ?? undefined,
    ])
  );

  const parsed = joinSchema.safeParse({ ...raw, goals: raw.goals || undefined });
  if (!parsed.success) {
    const fieldErrors: JoinFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof JoinFieldErrors;
      fieldErrors[key] ??= issue.message;
    }
    const values = Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined)) as Record<string, string>;
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const data = parsed.data;
  const roleLabel = getAudience(data.role)?.role ?? data.role;

  // Send the filled letter to conect@thegrowwise.com as soon as they click Join.
  try {
    await sendEmail({
      to: site.contactEmail,
      replyTo: data.email,
      ...emails.joinRequest({
        leaderName: site.leader.name,
        fullName: data.fullName,
        role: roleLabel,
        organization: data.organization,
        email: data.email,
        phone: data.phone,
        location: data.location,
        goals: data.goals,
      }),
    });
  } catch (err) {
    console.error("Join request email failed", err);
    return {
      status: "error",
      message: `Something went wrong sending your request. Please try again, or email ${site.contactEmail}.`,
      values: raw as Record<string, string>,
    };
  }

  // Best-effort admin record when a database is configured.
  if (process.env.DATABASE_URL) {
    try {
      const h = await headers();
      const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
      const ipHash = hashIp(ip);
      const db = getDb();
      const since = new Date(Date.now() - 60 * 60 * 1000);
      const [{ value: recent }] = await db
        .select({ value: count() })
        .from(schema.joinRequests)
        .where(and(eq(schema.joinRequests.ipHash, ipHash), gte(schema.joinRequests.createdAt, since)));

      if (recent < MAX_REQUESTS_PER_HOUR) {
        await db.insert(schema.joinRequests).values({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          role: data.role,
          organization: data.organization,
          location: data.location,
          goals: data.goals ?? null,
          consent: true,
          groupSlug: data.role,
          ipHash,
        });
      }
    } catch (err) {
      console.error("Join request DB save failed", err);
    }
  }

  return { status: "success" };
}
