import { site } from "@/lib/site";

export const eventFormats = ["Virtual", "In Person", "Summit", "TBD"] as const;
export type EventFormat = (typeof eventFormats)[number];

export type CommunityEvent = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  time?: string;
  format: EventFormat;
  location: string;
  audience: string;
  pdHours?: number;
  registerUrl?: string;
  livestreamUrl?: string;
  actionLabel?: string;
  /** Where the action button goes. Without it, the button shows as disabled ("link coming soon"). */
  joinUrl?: string;
  secondaryAction?: { label: string; url: string };
  important?: boolean;
  availabilityNote?: string;
  description: string;
  /** Shown as "Led by …”. Defaults to the community lead in `lib/site.ts`. */
  host?: string | null;
};

function monthlyMeeting(date: string, time: string): CommunityEvent {
  return {
    slug: `monthly-meeting-${date.slice(0, 7)}`,
    title: "Monthly Community Meeting",
    date,
    time,
    format: "Virtual",
    location: "Online (link shared with members)",
    audience: "All members",
    pdHours: 0,
    registerUrl: "/join",
    description:
      "Our monthly live conversation and podcast session for members of the Education Leaders Community.",
  };
}

/** Edit this list to add, change, or remove events. */
export const events: CommunityEvent[] = [
  monthlyMeeting("2026-10-24", "8:00 PM PT"),
  {
    slug: "uncomfortable-conversation-teachers-leaving",
    title:
      "🎙️ Live: The uncomfortable conversation — why teachers are leaving, and what principals can actually do about it.",
    date: "2026-11-01",
    time: "9:00 PM PST",
    format: "Virtual",
    location: "Microsoft Teams (online)",
    audience: "All members",
    pdHours: 0,
    actionLabel: "Join Now",
    joinUrl:
      "https://events.teams.microsoft.com/event/9be9b6af-bdd6-40a1-a1ad-6437846a62a0@6a0b9904-509b-49fd-ba05-033cf05b64dc",
    secondaryAction: {
      label: "Register to Be a Part of Podcast",
      url: site.podcastGuestFormUrl,
    },
    important: true,
    description:
      "A live conversation about why teachers are leaving and practical steps principals can take to support and retain them.",
  },
  {
    slug: "event-details-tbd-2026-11-07",
    title: "Event details TBD",
    date: "2026-11-07",
    time: "TBD",
    format: "TBD",
    location: "TBD",
    audience: "Public",
    actionLabel: "Join Now",
    availabilityNote: "Join link: TBD.",
    description: "More information about this event will be shared soon.",
    host: "Anshika Verma",
  },
  monthlyMeeting("2026-11-21", "7:00 PM PT"),
  monthlyMeeting("2026-12-12", "7:00 PM PT"),
  monthlyMeeting("2027-01-23", "7:00 PM PT"),
];

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function upcomingEvents(today = todayISO()) {
  return events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
}

export function pastEvents(today = todayISO()) {
  return events.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));
}

export function formatEventDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
