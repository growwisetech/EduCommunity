import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Education Leader Community collects, uses, and protects your information, including your phone number.",
  openGraph: { url: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="[Date]">
      <p>
        This policy explains what information {site.name} (&ldquo;we&rdquo;) collects when you request to join, how
        we use it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <p>When you submit the Join form, we collect:</p>
      <ul>
        <li>Full name and work email</li>
        <li>Phone number</li>
        <li>Role, school / district / organization, and location</li>
        <li>Your optional answer to &ldquo;What do you hope to get from the community?&rdquo;</li>
        <li>Whether you would like to receive community news and updates by email (optional)</li>
      </ul>
      <p>We also collect basic, privacy-friendly website analytics (pages visited, device type) that do not identify you.</p>

      <h2>Why we collect your phone number</h2>
      <p>
        Our peer groups run on WhatsApp, which identifies members by phone number. We use your number only to:
      </p>
      <ul>
        <li>Confirm that the person joining the WhatsApp group matches an approved request</li>
        <li>Help group admins recognize members and remove anyone who was not approved</li>
      </ul>
      <p>
        We do not use your phone number for marketing calls or texts, we do not sell it, and we do not share it
        with partners or sponsors. When you join a WhatsApp group, other members of that group can see your number,
        as with any WhatsApp group. WhatsApp&apos;s own privacy policy applies to your use of WhatsApp.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To review your request and place you in the right group</li>
        <li>To email you your group invite link and important community updates</li>
        <li>
          If you opt in, to send you community news and updates. We add your email to that list only once your
          request is approved.
        </li>
        <li>To keep groups safe and enforce the Code of Conduct</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We share information only with service providers that help us run the community (for example, our database
        and email providers, including Brevo for community news and updates), and only as needed to
        provide those services. We never sell personal information.
      </p>

      <h2>Retention and your choices</h2>
      <p>
        We keep your information while you are a member, and delete it within [X] days of a request to leave or a
        rejected application. You can unsubscribe from community news and updates at any time using the unsubscribe
        link in those emails. You can also ask us to access, correct, or delete your information by emailing{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>

      <h2>Children</h2>
      <p>This community is for adult professionals. We do not knowingly collect information from anyone under 18.</p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
