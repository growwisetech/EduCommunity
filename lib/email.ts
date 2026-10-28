import "server-only";
import { brevoApiKey, brevoRequest } from "@/lib/brevo";
import { site } from "@/lib/site";

type Mail = { to: string; subject: string; text: string };

// The sender must be a verified sender in Brevo (Senders, Domains & Dedicated IPs > Senders).
export async function sendEmail({ to, subject, text }: Mail) {
  const apiKey = brevoApiKey();
  if (!apiKey) {
    console.info(`[email:dev] To: ${to}\nSubject: ${subject}\n\n${text}`);
    return;
  }
  await brevoRequest("/smtp/email", apiKey, {
    sender: { name: site.name, email: site.contactEmail },
    to: [{ email: to }],
    replyTo: { email: site.contactEmail },
    subject,
    textContent: text,
  });
}

export const emails = {
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
