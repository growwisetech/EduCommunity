import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { PageHeader, Section } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { forumBoards } from "@/content/forums";

export const metadata: Metadata = {
  title: "Forums",
  description: "Members-only discussion boards on budgets, hiring, culture, curriculum, AI, safety, and tutoring.",
  openGraph: { url: "/forums" },
};

export default function ForumsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Forums"
        title="Longer conversations, organized by topic"
        intro="The forums are for members only. Browsing, posting, and replying open to approved members soon."
      />

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <div role="note" className="flex flex-col gap-4 rounded-xl border border-teal/40 bg-accent p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-navy">
            <Lock aria-hidden className="mt-0.5 size-5 shrink-0" />
            <span>
              <strong>Members only. Coming soon.</strong> Boards marked &ldquo;Educators only&rdquo; are not visible to education partners.
            </span>
          </p>
          <Link href="/join" className={buttonVariants({ variant: "brand", size: "lg" })}>
            Request membership
          </Link>
        </div>
      </div>

      <Section id="boards" title="Topic boards">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {forumBoards.map((b) => (
            <li key={b.slug} className="flex flex-col rounded-xl border border-border bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold">{b.name}</h3>
                {b.educatorsOnly && (
                  <span className="shrink-0 rounded-full bg-navy px-2.5 py-0.5 text-xs font-semibold text-white">
                    Educators only
                  </span>
                )}
              </div>
              <p className="mt-2 text-muted-foreground">{b.description}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
