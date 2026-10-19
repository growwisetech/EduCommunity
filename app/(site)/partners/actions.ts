"use server";

import { z } from "zod";
import { emails, sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

const partnerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.email("Please enter a valid work email.").trim().toLowerCase().max(200),
  organization: z.string().trim().min(2, "Please enter your organization.").max(200),
  type: z.enum(["Edtech", "Publisher", "Nonprofit", "Other"], "Please choose an organization type."),
  message: z.string().trim().max(2000).optional(),
});

export type PartnerFieldErrors = Partial<Record<keyof z.infer<typeof partnerSchema>, string>>;

export type PartnerState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message?: string; fieldErrors?: PartnerFieldErrors; values?: Record<string, string> };

export async function submitPartnerRequest(_prev: PartnerState, formData: FormData): Promise<PartnerState> {
  const raw = Object.fromEntries(
    ["name", "email", "organization", "type", "message"].map((k) => [k, formData.get(k)?.toString() ?? undefined])
  );

  const parsed = partnerSchema.safeParse({ ...raw, message: raw.message || undefined });
  if (!parsed.success) {
    const fieldErrors: PartnerFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof PartnerFieldErrors;
      fieldErrors[key] ??= issue.message;
    }
    const values = Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined)) as Record<string, string>;
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const data = parsed.data;
  const letter = emails.joinRequest({
    leaderName: site.leader.name,
    fullName: data.name,
    role: `Education Partner (${data.type})`,
    organization: data.organization,
    email: data.email,
  });

  try {
    await sendEmail({
      to: site.contactEmail,
      replyTo: data.email,
      subject: letter.subject,
      text: data.message
        ? `${letter.text}\n\nHow they would like to support leaders:\n${data.message}`
        : letter.text,
    });
  } catch (err) {
    console.error("Partner email failed", err);
    return {
      status: "error",
      message: `Something went wrong sending your request. Please try again, or email ${site.contactEmail}.`,
      values: raw as Record<string, string>,
    };
  }

  return { status: "success" };
}
