import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/page-header";
import { PartnerForm } from "@/components/partner-form";
import { PlaceholderBadge } from "@/components/placeholder-badge";
import { partnerBenefits, partners } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Edtech companies, publishers, and nonprofits can support K–12 leaders through our partner program, with no selling in educator groups.",
  openGraph: { url: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Support education leaders the right way"
        intro="Partners help make events and resources possible. In return, they get a dedicated space to learn from educators, with clear rules that keep educator groups free of sales pitches."
      />

      <Section id="benefits" title="Partner benefits">
        <ul className="grid gap-5 sm:grid-cols-2">
          {partnerBenefits.map((b) => (
            <li key={b.title} className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-lg font-bold">{b.title}</h3>
              <p className="mt-2 text-muted-foreground">{b.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="showcase" title="Partner showcase" className="bg-surface">
        <PlaceholderBadge />
        <ul className="mt-4 grid gap-5 sm:grid-cols-3">
          {partners.map((p) => (
            <li key={p.name} className="rounded-xl border border-dashed border-navy/30 bg-white p-6">
              <p className="text-xs font-bold tracking-wide text-teal-dark uppercase">{p.category}</p>
              <h3 className="mt-1 text-lg font-bold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="apply" title="Apply as a Partner" intro="Tell us about your organization. We review every application.">
        <div className="max-w-3xl">
          <PartnerForm />
        </div>
      </Section>
    </>
  );
}
