import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader, Section } from "@/components/page-header";
import { PlaceholderBadge } from "@/components/placeholder-badge";
import { ResourcesBrowser } from "@/components/resources-browser";

export const metadata: Metadata = {
  title: "Resources",
  description: "Playbooks, templates, guides, and case studies for superintendents, principals, teachers, and tutoring owners.",
  openGraph: { url: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Practical tools from the field"
        intro="Playbooks, templates, guides, and case studies you can adapt for your school, district, or business."
      >
        <PlaceholderBadge label="Placeholder resources" />
      </PageHeader>
      <Section>
        <Suspense>
          <ResourcesBrowser />
        </Suspense>
      </Section>
    </>
  );
}
