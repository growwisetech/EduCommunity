import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how the Education Leader Community collects, uses, and protects personal information.",
  openGraph: { url: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 22, 2026">
      <p>
        Education Leaders Community (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is based in
        California, United States. This website and community are intended for mentors and educators in any region.
        This policy explains what personal information we collect, how we use and share it, and the choices available
        to you.
      </p>

      <h2>Information we collect</h2>
      <p>When you submit a request to join, we collect the information you provide:</p>
      <ul>
        <li>Your name, work email address, and phone number</li>
        <li>Your role, school, district or organization, and location</li>
        <li>Your optional answer about what you hope to get from the community</li>
      </ul>
      <p>
        We also create a one-way hash derived from your IP address to help limit automated or repeated join requests.
        The application stores this hash with the request rather than the raw IP address for this purpose. Our hosting
        and service providers may process connection information in their own logs.
      </p>
      <p>
        We use Vercel Analytics and Speed Insights to understand website usage and performance. These tools may process
        technical and usage information, such as pages visited, device or browser details, and performance data, under
        Vercel&apos;s privacy practices.
      </p>

      <h2>How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Review join requests and determine appropriate community groups</li>
        <li>Email you about your request, approval, or community membership</li>
        <li>Help keep the community safe and enforce our Code of Conduct</li>
        <li>Prevent abuse of the join form and operate, maintain, and improve the website</li>
      </ul>

      <h2>Phone numbers and WhatsApp</h2>
      <p>
        We use your phone number to support membership in WhatsApp groups, which identify members by phone number. If
        you choose to join a group, other group members may be able to see your number and other profile information
        according to your WhatsApp settings. WhatsApp&apos;s own privacy policy and terms apply to your use of its
        service. We do not use your number for marketing calls or texts.
      </p>

      <h2>How we share information</h2>
      <p>
        We do not sell personal information. We share information only as needed to run the community and provide the
        services described in this policy:
      </p>
      <ul>
        <li>With our authorized community administrators, to review and manage membership requests</li>
        <li>
          With service providers that support the website, database, analytics, and email delivery, including Vercel,
          Neon, and Resend
        </li>
        <li>
          With WhatsApp and group members when you choose to join a WhatsApp group, as described above
        </li>
      </ul>
      <p>
        Service providers process information on our behalf under their own privacy practices and may process or store
        information in the United States or other countries. We may also disclose information when required by law or
        when reasonably necessary to protect the rights, safety, and security of people or the community.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        We use analytics and performance tools as described above. The admin area also uses a necessary, HTTP-only
        session cookie to keep authorized administrators signed in. We do not use that cookie for advertising. Your
        browser settings can help you manage cookies, though blocking necessary cookies may affect site functionality.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep join-request information while a request is being reviewed and, if approved, while you remain a
        community member. If your request is rejected or you ask us to delete your information or record that you have
        left the community, we will delete it within seven days, unless we must retain it for a legal obligation or to
        address a safety or security issue. Service-provider backups and logs may be subject to their own retention
        schedules.
      </p>

      <h2>Your choices and privacy rights</h2>
      <p>
        You can ask us to access, correct, or delete personal information you have provided. Depending on where you
        live, applicable privacy laws may provide additional rights. To make a request, contact us at{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. We may need to verify your identity before
        completing a request.
      </p>

      <h2>Children</h2>
      <p>
        The community is intended for adult mentors and educators and is not directed to children under 18. We do not
        knowingly collect personal information from anyone under 18.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as our practices or legal requirements change. We will post the updated version on
        this page and revise the date above.
      </p>

      <h2>Contact us</h2>
      <p>
        For questions or privacy requests, email{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
