export const eventFormats = ["Virtual", "In Person", "Summit"] as const;
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
  pdHours: number;
  registerUrl: string;
  description: string;
  /** Shown as "Led by …". Defaults to the community lead in `lib/site.ts`. */
  host?: string;
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
