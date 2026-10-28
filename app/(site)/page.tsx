import { cacheLife } from "next/cache";
import Link from "next/link";
import { AudienceCard, CommunityCard, EventCard } from "@/components/cards";
import { ImportantEventNotice } from "@/components/important-event-notice";
import { Section } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { audiences } from "@/content/audiences";
import { communities } from "@/content/communities";
import { upcomingEvents } from "@/content/events";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  "use cache";
  cacheLife("hours");
  const scheduledEvents = upcomingEvents();
  const nextEvent = scheduledEvents[0];
  const importantEvent = scheduledEvents.find((event) => event.important);
  const featured = communities.filter((c) => c.featured);

  return (
    <>
      {importantEvent && <ImportantEventNotice event={importantEvent} />}
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
        <div className="space-y-10">
          {importantEvent && (
            <section aria-labelledby="important-event-heading">
              <h2 id="important-event-heading" className="text-2xl font-extrabold">Important event</h2>
              <div className="mt-6">
                <EventCard event={importantEvent} />
              </div>
              <Link href="/events" className="mt-6 inline-block font-semibold text-teal-dark underline underline-offset-4">
                All event details
              </Link>
            </section>
          )}
          <section aria-labelledby="next-event-heading">
            <h2 id="next-event-heading" className="text-2xl font-extrabold">Next upcoming event</h2>
            <div className="mt-6">
              {nextEvent ? <EventCard event={nextEvent} /> : <p>No upcoming events yet. Check back soon.</p>}
            </div>
            <Link href="/events" className="mt-6 inline-block font-semibold text-teal-dark underline underline-offset-4">
              All events
            </Link>
          </section>
        </div>

        {/* TODO: Restore the latest forum discussions when real forum data is available. */}
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
