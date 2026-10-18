import type { Metadata } from "next";
import { CommunityCard } from "@/components/cards";
import { Guidelines } from "@/components/guidelines";
import { PageHeader, Section } from "@/components/page-header";
import { communities } from "@/content/communities";
import { ledBy } from "@/lib/site";

export const metadata: Metadata = {
  title: "Communities",
  description:
    "Private WhatsApp groups for superintendents, principals, private school leaders, curriculum heads, teachers, tutoring business owners, and education partners.",
  openGraph: { url: "/communities" },
};

export default function CommunitiesPage() {
  const educatorGroups = communities.filter((c) => !c.isPartnerGroup);
  const partnerGroups = communities.filter((c) => c.isPartnerGroup);

  return (
    <>
      <PageHeader
        eyebrow="Communities"
        title="Join the group for your role"
        intro={
          <>
            <p>
              Every group is a private WhatsApp community. Request to join, and once you&apos;re approved we&apos;ll
              email your invite links: the main Education Leaders Community, the group for your role, and our Podcast
              &amp; Monthly Meeting group.
            </p>
            <p className="mt-3 font-heading font-bold text-teal-dark">{ledBy}</p>
          </>
        }
      />

      <Section id="educator-groups" title="Educator groups">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {educatorGroups.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      </Section>

      <Section
        id="partner-groups"
        title="Partner group"
        intro="Education partners have their own group, separate from educator groups. Selling in educator groups is never allowed."
        className="bg-surface"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {partnerGroups.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
      </Section>

      <Section id="guidelines" title="Community guidelines">
        <Guidelines />
      </Section>
    </>
  );
}
