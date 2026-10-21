import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin, UserRound, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { Audience } from "@/content/audiences";
import type { Community } from "@/content/communities";
import { formatEventDate, type CommunityEvent } from "@/content/events";
import { ledBy, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AudienceCard({ audience }: { audience: Audience }) {
  return (
    <Link
      href={`/communities#${audience.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 transition hover:border-teal hover:shadow-md"
    >
      <h3 className="text-lg font-bold">{audience.title}</h3>
      <p className="mt-2 flex-1 text-muted-foreground">{audience.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 font-semibold text-teal-dark">
        See the group <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function CommunityCard({ community, headingLevel = "h3" }: { community: Community; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article
      id={community.slug}
      className={cn(
        "flex h-full scroll-mt-24 flex-col rounded-xl border bg-white p-6",
        community.isPartnerGroup ? "border-dashed border-navy/40" : "border-border"
      )}
    >
      <Heading className="text-xl font-bold">{community.name}</Heading>
      <p className="mt-1 text-sm font-semibold text-teal-dark">WhatsApp group · {ledBy}</p>
      <p className="mt-3 text-foreground">
        <span className="font-semibold">Who it&apos;s for: </span>
        {community.whoFor}
      </p>
      <div className="mt-4 flex-1">
        <p className="text-sm font-semibold text-navy">Group rules</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {community.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
      <Link
        href={`/join?role=${community.slug}`}
        className={cn(buttonVariants({ variant: "brand", size: "lg" }), "mt-6 h-11 w-full")}
        aria-label={`Request to join ${community.name}`}
      >
        Request to Join
      </Link>
    </article>
  );
}

export function EventCard({ event, past = false }: { event: CommunityEvent; past?: boolean }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-white p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-navy">{event.format}</span>
        {event.important && (
          <span className="rounded-full bg-orange px-2.5 py-0.5 text-xs font-bold text-navy">Important event</span>
        )}
        {event.pdHours !== undefined && event.pdHours > 0 && (
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-navy">
            {event.pdHours} PD {event.pdHours === 1 ? "hour" : "hours"}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-bold">{event.title}</h3>
      <p className="mt-2 text-muted-foreground">{event.description}</p>
      <dl className="mt-4 flex-1 space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <dt><CalendarDays aria-hidden className="size-4 text-teal-dark" /><span className="sr-only">Date</span></dt>
          <dd><time dateTime={event.date}>{formatEventDate(event.date)}</time></dd>
        </div>
        {event.time && (
          <div className="flex items-start gap-2">
            <dt><Clock aria-hidden className="size-4 text-teal-dark" /><span className="sr-only">Time</span></dt>
            <dd>{event.time}</dd>
          </div>
        )}
        <div className="flex items-start gap-2">
          <dt><MapPin aria-hidden className="size-4 text-teal-dark" /><span className="sr-only">Location</span></dt>
          <dd>{event.location}</dd>
        </div>
        <div className="flex items-start gap-2">
          <dt><Users aria-hidden className="size-4 text-teal-dark" /><span className="sr-only">Audience</span></dt>
          <dd>{event.audience}</dd>
        </div>
        <div className="flex items-start gap-2">
          <dt><UserRound aria-hidden className="size-4 text-teal-dark" /><span className="sr-only">Host</span></dt>
          {event.host !== null && (
            <dd className="font-semibold text-navy">Led by {event.host ?? site.leader.name}</dd>
          )}
        </div>
      </dl>
      {past ? (
        <p className="mt-6 text-sm font-semibold text-muted-foreground">This event has ended.</p>
      ) : event.livestreamUrl ? (
        <a
          href={event.livestreamUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "brand", size: "lg" }), "mt-6 h-11 w-full")}
          aria-label={`Watch ${event.title} on YouTube`}
        >
          Watch on YouTube
        </a>
      ) : event.actionLabel ? (
        <button
          type="button"
          disabled
          aria-label={`${event.actionLabel} (YouTube Live link coming soon)`}
          className={cn(buttonVariants({ variant: "brand", size: "lg" }), "mt-6 h-11 w-full")}
        >
          {event.actionLabel}
        </button>
      ) : event.registerUrl ? (
        <a
          href={event.registerUrl}
          className={cn(buttonVariants({ variant: "brand", size: "lg" }), "mt-6 h-11 w-full")}
          aria-label={`Register for ${event.title}`}
        >
          Register
        </a>
      ) : (
        <p className="mt-6 text-sm font-semibold text-muted-foreground">{event.availabilityNote ?? "Details TBD."}</p>
      )}
      {!past && event.secondaryAction && (
        <a
          href={event.secondaryAction.url}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "navyOutline", size: "lg" }), "mt-3 h-11 w-full")}
        >
          {event.secondaryAction.label}
        </a>
      )}
    </article>
  );
}
