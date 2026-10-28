"use server";

import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { getDb, schema } from "@/db";
import { roleSlugs } from "@/content/audiences";
import { communities, inviteLinkGroups, memberWideGroups } from "@/content/communities";
import { checkPassword, endSession, requireAdmin, startSession } from "@/lib/auth";
import { addContactToBrevo } from "@/lib/brevo";
import { emails, sendEmail } from "@/lib/email";

export async function login(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const password = formData.get("password")?.toString() ?? "";
  if (!checkPassword(password)) return { error: "Incorrect password." };
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

function back(formData: FormData, params: Record<string, string>): never {
  const status = formData.get("returnStatus")?.toString() || "pending";
  const qs = new URLSearchParams({ status, ...params });
  redirect(`/admin?${qs}`);
}

async function loadRequest(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) back(formData, { error: "Invalid request." });
  const db = getDb();
  const [request] = await db.select().from(schema.joinRequests).where(eq(schema.joinRequests.id, id));
  if (!request) back(formData, { error: "Request not found." });
  return { db, request };
}

export async function approveRequest(formData: FormData) {
  await requireAdmin();
  const { db, request } = await loadRequest(formData);

  const groupSlug = formData.get("groupSlug")?.toString() ?? request.groupSlug;
  if (!(roleSlugs as readonly string[]).includes(groupSlug)) back(formData, { error: "Choose a valid group." });
  const group = communities.find((c) => c.slug === groupSlug);

  const links = await db
    .select()
    .from(schema.groupInviteLinks)
    .where(inArray(schema.groupInviteLinks.groupSlug, [groupSlug, ...memberWideGroups.map((g) => g.slug)]));
  const urlFor = (slug: string) => links.find((l) => l.groupSlug === slug)?.inviteUrl;

  const roleUrl = urlFor(groupSlug);
  if (!roleUrl) {
    back(formData, { error: `No invite link is set for ${group?.name ?? groupSlug}. Add it in Settings first.` });
  }

  const message = emails.approved(request.fullName, {
    mainCommunityUrl: urlFor("main-community"),
    groupName: group?.name ?? groupSlug,
    groupUrl: roleUrl,
    podcastUrl: urlFor("podcast-monthly"),
  });

  try {
    await sendEmail({ to: request.email, ...message });
  } catch (err) {
    console.error(err);
    back(formData, { error: `Could not email ${request.email}. The request is still pending.` });
  }

  await db
    .update(schema.joinRequests)
    .set({ status: "approved", groupSlug, reviewedAt: new Date() })
    .where(eq(schema.joinRequests.id, request.id));

  if (request.marketingConsent) {
    after(async () => {
      try {
        await addContactToBrevo(request.email);
      } catch (err) {
        console.error("Brevo contact sync failed", err);
      }
    });
  }

  revalidatePath("/admin");
  back(formData, { notice: `Approved ${request.fullName} and emailed the invite link.` });
}

export async function rejectRequest(formData: FormData) {
  await requireAdmin();
  const { db, request } = await loadRequest(formData);
  const notify = formData.get("notify") === "on";

  if (notify) {
    try {
      await sendEmail({ to: request.email, ...emails.rejected(request.fullName) });
    } catch (err) {
      console.error(err);
      back(formData, { error: `Could not email ${request.email}. The request is still pending.` });
    }
  }

  await db
    .update(schema.joinRequests)
    .set({ status: "rejected", reviewedAt: new Date() })
    .where(eq(schema.joinRequests.id, request.id));

  revalidatePath("/admin");
  back(formData, { notice: `Rejected ${request.fullName}${notify ? " and sent a notice" : ""}.` });
}

export async function reopenRequest(formData: FormData) {
  await requireAdmin();
  const { db, request } = await loadRequest(formData);
  await db
    .update(schema.joinRequests)
    .set({ status: "pending", reviewedAt: null })
    .where(eq(schema.joinRequests.id, request.id));
  revalidatePath("/admin");
  back(formData, { notice: `Moved ${request.fullName} back to pending.` });
}

export async function saveInviteLinks(formData: FormData) {
  await requireAdmin();
  const db = getDb();

  for (const { slug } of inviteLinkGroups) {
    const url = formData.get(slug)?.toString().trim() ?? "";
    if (!url) {
      await db.delete(schema.groupInviteLinks).where(eq(schema.groupInviteLinks.groupSlug, slug));
      continue;
    }
    if (!/^https:\/\/(chat\.whatsapp\.com|wa\.me)\//.test(url)) {
      redirect(`/admin/settings?error=${encodeURIComponent(`"${url}" is not a WhatsApp invite link.`)}`);
    }
    await db
      .insert(schema.groupInviteLinks)
      .values({ groupSlug: slug, inviteUrl: url })
      .onConflictDoUpdate({
        target: schema.groupInviteLinks.groupSlug,
        set: { inviteUrl: url, updatedAt: new Date() },
      });
  }

  revalidatePath("/admin/settings");
  redirect("/admin/settings?notice=Invite+links+saved.");
}
