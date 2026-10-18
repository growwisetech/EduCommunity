import type { Metadata } from "next";
import { Guidelines } from "@/components/guidelines";
import { PageHeader, Section } from "@/components/page-header";
import { PlaceholderBadge } from "@/components/placeholder-badge";
import { ledBy, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Why we started the Education Leader Community, our mission, and the team behind it.",
  openGraph: { url: "/about" },
};

type Person = { name: string; role: string; placeholder?: boolean };

const team: Person[] = [
  { name: site.leader.name, role: site.leader.title },
  { name: "Team Member Name", role: "Community Manager", placeholder: true },
  { name: "Team Member Name", role: "Events & Programs", placeholder: true },
];

const advisors: Person[] = [
  { name: "Advisor Name", role: "Former Superintendent", placeholder: true },
  { name: "Advisor Name", role: "Head of School", placeholder: true },
  { name: "Advisor Name", role: "Tutoring Center Owner", placeholder: true },
];

function PersonCard({ name, role, placeholder }: Person) {
  return (
    <li className="flex items-center gap-4 rounded-xl border border-border bg-white p-5">
      <div aria-hidden className="flex size-14 shrink-0 items-center justify-center rounded-full bg-surface font-heading text-lg font-bold text-navy">
        {name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")}
      </div>
      <div>
        <p className="font-bold text-navy">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
        {placeholder && <PlaceholderBadge className="mt-2" />}
      </div>
    </li>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built by and for education leaders"
        intro={
          <>
            <p>{site.mission}</p>
            <p className="mt-3 font-heading font-bold text-teal-dark">{ledBy}</p>
          </>
        }
      />

      <Section id="story" title="Our founding story">
        <div className="max-w-3xl space-y-4 text-lg leading-8">
          <PlaceholderBadge />
          <p>
            [Placeholder] Leading a school, district, or tutoring business can be isolating. Many of the hardest
            decisions don&apos;t have a playbook, and the people who would understand are in other buildings and
            other towns.
          </p>
          <p>
            [Placeholder] The Education Leader Community started as a small group chat of leaders comparing notes.
            Replace this paragraph with the real story of how and why the community began.
          </p>
        </div>
      </Section>

      <Section id="mission" title="Our mission" className="bg-surface">
        <p className="max-w-3xl text-lg leading-8">
          To give every K–12 education leader a trusted peer group: a place to ask honest questions, share what
          works, and get practical help, without sales pitches.
        </p>
      </Section>

      <Section id="team" title="Team">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((p, i) => (
            <PersonCard key={i} {...p} />
          ))}
        </ul>
      </Section>

      <Section id="advisors" title="Advisors" className="bg-surface">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advisors.map((p, i) => (
            <PersonCard key={i} {...p} />
          ))}
        </ul>
      </Section>

      <Section id="guidelines" title="Community guidelines">
        <Guidelines />
      </Section>
    </>
  );
}
