import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the Education Leader Community website, groups, forums, and events.",
  openGraph: { url: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="[Date]">
      <p>
        By using this website or joining any {site.name} group, forum, or event, you agree to these terms.
      </p>

      <h2>Membership</h2>
      <p>
        Membership is free and by approval. We may approve, decline, or remove membership at our discretion,
        including for violations of the <Link href="/legal/code-of-conduct">Code of Conduct</Link>.
      </p>

      <h2>Your content</h2>
      <p>
        You are responsible for what you share. Do not share confidential information or any identifiable
        information about students, families, or staff. By posting in our forums you grant us permission to display
        that content to other members.
      </p>

      <h2>No professional advice</h2>
      <p>
        Discussions and resources are peer-to-peer and for general information. They are not legal, financial, or
        HR advice. Consult your own counsel and district policies.
      </p>

      <h2>Third-party services</h2>
      <p>
        Groups run on WhatsApp and events may use other platforms. Your use of those services is governed by their
        own terms.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. We will post the new date at the top of this page.</p>

      <h2>Contact</h2>
      <p>
        Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
