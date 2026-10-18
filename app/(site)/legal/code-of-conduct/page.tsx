import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "How members of the Education Leader Community are expected to treat each other.",
  openGraph: { url: "/legal/code-of-conduct" },
};

export default function CodeOfConductPage() {
  return (
    <LegalPage title="Code of Conduct" updated="[Date]">
      <p>
        {site.name} is a peer space. These expectations apply in every WhatsApp group, forum, and event.
      </p>

      <h2>Expected behavior</h2>
      <ul>
        <li>Be respectful and assume good intent, even when you disagree.</li>
        <li>Share experience, not sales pitches.</li>
        <li>Keep what others share in the group, in the group.</li>
        <li>Stay on topic for the group you are in.</li>
      </ul>

      <h2>Not allowed</h2>
      <ul>
        <li>Selling, recruiting, or promoting products or services in educator groups</li>
        <li>Sharing identifiable information about students, families, or staff</li>
        <li>Harassment, discrimination, or personal attacks</li>
        <li>Screenshots or forwarding of group messages without permission</li>
        <li>Adding people to groups without going through the Join form</li>
      </ul>

      <h2>Education partners</h2>
      <p>
        Partners participate only in the Education Partners group and through the partner program. Partners may not
        contact educators they met through the community with unsolicited offers.
      </p>

      <h2>Enforcement</h2>
      <p>
        Admins may remove messages or members who break this code. Serious or repeated violations lead to permanent
        removal from all groups.
      </p>

      <h2>Reporting</h2>
      <p>
        Message a group admin or email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Reports are
        kept confidential.
      </p>
    </LegalPage>
  );
}
