import "server-only";
import { Resend } from "resend";
import { site } from "@/lib/site";

type Mail = { to: string; subject: string; text: string; replyTo?: string };

let resend: Resend | undefined;

async function sendViaFormSubmit({ to, subject, text, replyTo }: Mail) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: subject,
      _replyto: replyTo ?? undefined,
      _template: "box",
      _captcha: "false",
      message: text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Email failed (${res.status}): ${body || res.statusText}`);
  }

  const payload = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;
  if (payload && payload.success === false) {
    throw new Error(`Email failed: ${payload.message ?? "unknown error"}`);
  }
}

/** Deliver email via Resend when configured, otherwise via FormSubmit so it still arrives. */
export async function sendEmail(mail: Mail) {
  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      resend ??= new Resend(key);
      const { error } = await resend.emails.send({
        from: process.env.FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
        replyTo: mail.replyTo ?? site.contactEmail,
      });
      if (error) throw new Error(error.message);
      return;
    } catch (err) {
      console.error("Resend failed, falling back to FormSubmit", err);
    }
  }

  await sendViaFormSubmit(mail);
}

export type JoinRequestMail = {
  leaderName: string;
  fullName: string;
  role: string;
  organization: string;
  email: string;
};

export const emails = {
  /** Fills the join letter template with the applicant's submitted details. */
  joinRequest: ({ leaderName, fullName, role, organization, email }: JoinRequestMail) => ({
    subject: `Join request from ${fullName}`,
    text: `Hi ${leaderName},

I'd like to join the Education Leaders Community to connect with fellow leaders, share ideas, and collaborate.

Name: ${fullName}
Role: ${role}
Organization: ${organization}
Email: ${email}

Please let me know the next steps.

Best regards,
${fullName}`,
  }),

  received: (name: string) => ({
    subject: `We received your request to join ${site.name}`,
    text: `Hi ${name},

Thanks for requesting to join ${site.name}. We review every request and will email your group invite link once approved.

${site.name}`,
  }),

  approved: (
    name: string,
    links: { mainCommunityUrl?: string; groupName: string; groupUrl: string; podcastUrl?: string }
  ) => {
    const sections = [
      links.mainCommunityUrl && `Join the Education Leaders Community:\n${links.mainCommunityUrl}`,
      `Your ${links.groupName} group:\n${links.groupUrl}`,
      links.podcastUrl && `Also join our Podcast & Monthly Meeting group:\n${links.podcastUrl}`,
    ].filter(Boolean);

    return {
      subject: `You're approved: join the ${links.groupName} group`,
      text: `Hi ${name},

Welcome to ${site.name}, led by ${site.leader.name}! Your request has been approved.

${sections.join("\n\n")}

Please don't share these links. They're for approved members only. Before you post, take a minute to read our Code of Conduct: ${site.url}/legal/code-of-conduct

See you inside,
${site.name}`,
    };
  },

  rejected: (name: string) => ({
    subject: `About your request to join ${site.name}`,
    text: `Hi ${name},

Thank you for your interest in ${site.name}. We weren't able to approve your request at this time. Our groups are limited to specific roles to keep conversations focused.

If you think we got this wrong, just reply to this email and we'll take another look.

${site.name}`,
  }),

  adminNotify: (name: string, role: string, adminUrl: string) => ({
    subject: `New join request: ${name}`,
    text: `${name} (${role}) requested to join.\n\nReview it here: ${adminUrl}`,
  }),
};
