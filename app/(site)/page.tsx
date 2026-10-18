import { cacheLife } from "next/cache";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { AudienceCard, CommunityCard, EventCard } from "@/components/cards";
import { Section } from "@/components/page-header";
import { PlaceholderBadge } from "@/components/placeholder-badge";
import { buttonVariants } from "@/components/ui/button";
import { audiences } from "@/content/audiences";
import { communities } from "@/content/communities";
import { upcomingEvents } from "@/content/events";
import { threadPreviews } from "@/content/forums";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  "use cache";
  cacheLife("hours");
  const nextEvent = upcomingEvents()[0];
  const featured = communities.filter((c) => c.featured);

  return (
    <>
      <section aria-labelledby="hero-heading" className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="font-heading text-sm font-bold tracking-wide text-teal-dark uppercase">
            For K–12 education leaders
          </p>
          <h1 id="hero-heading" className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Lead with peers who get it.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">{site.mission}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/join" className={buttonVariants({ variant: "brand", size: "xl" })}>
              Join the Community
            </Link>
            <Link href="/communities" className={buttonVariants({ variant: "navyOutline", size: "xl" })}>
              Explore Communities
            </Link>
          </div>
        </div>
      </section>

      <Section id="audiences" title="Find your peer group" intro="Each group is a private WhatsApp community for people in the same role.">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.slug}>
              <AudienceCard audience={a} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="featured" title="Featured communities" className="bg-surface">
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
        <Link href="/communities" className="mt-8 inline-block font-semibold text-teal-dark underline underline-offset-4">
          See all communities
        </Link>
      </Section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16">
        <section aria-labelledby="next-event-heading">
          <h2 id="next-event-heading" className="text-2xl font-extrabold">Next upcoming event</h2>
          <div className="mt-6">
            {nextEvent ? <EventCard event={nextEvent} /> : <p>No upcoming events yet. Check back soon.</p>}
          </div>
          <Link href="/events" className="mt-6 inline-block font-semibold text-teal-dark underline underline-offset-4">
            All events
          </Link>
        </section>

        <section aria-labelledby="discussions-heading">
          <div className="flex items-center gap-3">
            <h2 id="discussions-heading" className="text-2xl font-extrabold">Latest forum discussions</h2>
            <PlaceholderBadge />
          </div>
          <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-white">
            {threadPreviews.map((t) => (
              <li key={t.title} className="flex gap-3 p-5">
                <MessageSquare aria-hidden className="mt-1 size-5 shrink-0 text-teal-dark" />
                <div>
                  <p className="font-semibold text-navy">{t.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t.board} · {t.replies} replies · {t.lastActivity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/forums" className="mt-6 inline-block font-semibold text-teal-dark underline underline-offset-4">
            Browse the forums
          </Link>
        </section>
      </div>

      <section aria-labelledby="cta-heading" className="bg-navy">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="cta-heading" className="text-3xl font-extrabold text-white">Ready to find your people?</h2>
            <p className="mt-2 max-w-xl text-white/85">
              Membership is free. We review every request to keep groups focused and free of sales pitches.
            </p>
          </div>
          <Link href="/join" className={cn(buttonVariants({ variant: "brand", size: "xl" }), "shrink-0")}>
            Join the Community
          </Link>
        </div>
      </section>
    </>
  );
}
