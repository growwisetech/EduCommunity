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

/** Placeholder events. Edit this list to add, change, or remove events. */
export const events: CommunityEvent[] = [
  {
    slug: "budget-season-roundtable",
    title: "Budget Season Roundtable",
    date: "2026-11-12",
    time: "4:00–5:00 PM ET",
    format: "Virtual",
    location: "Online (Zoom)",
    audience: "Superintendents & District Leaders",
    pdHours: 1,
    registerUrl: "#",
    description: "Peer roundtable on building next year's budget with flat or declining revenue.",
  },
  {
    slug: "ai-policy-workshop",
    title: "Writing a Practical AI Policy",
    date: "2026-12-03",
    time: "3:30–5:00 PM ET",
    format: "Virtual",
    location: "Online (Zoom)",
    audience: "Principals, Private School Leaders, Teachers",
    pdHours: 1.5,
    registerUrl: "#",
    description: "Hands-on workshop to draft an AI acceptable-use policy for your school.",
  },
  {
    slug: "tutoring-owners-meetup",
    title: "Tutoring Owners Meetup",
    date: "2027-01-21",
    time: "6:00–8:00 PM",
    format: "In Person",
    location: "Placeholder City, ST",
    audience: "Tutoring Business Owners",
    pdHours: 0,
    registerUrl: "#",
    description: "Evening meetup to compare notes on staffing, pricing, and school partnerships.",
  },
  {
    slug: "leadership-summit-2027",
    title: "Education Leader Summit 2027",
    date: "2027-04-15",
    time: "Two days",
    format: "Summit",
    location: "Placeholder City, ST",
    audience: "All members",
    pdHours: 10,
    registerUrl: "#",
    description: "Our annual gathering of education leaders: workshops, peer sessions, and networking.",
  },
  {
    slug: "new-leaders-circle-fall",
    title: "New Leaders Circle",
    date: "2026-09-24",
    time: "4:00–5:00 PM ET",
    format: "Virtual",
    location: "Online (Zoom)",
    audience: "First- and second-year leaders",
    pdHours: 1,
    registerUrl: "#",
    description: "Monthly peer circle for new principals and assistant principals.",
  },
  {
    slug: "hiring-retention-panel",
    title: "Hiring & Retention Panel",
    date: "2026-08-20",
    time: "3:00–4:30 PM ET",
    format: "Virtual",
    location: "Online (Zoom)",
    audience: "Public & Private School Leaders",
    pdHours: 1.5,
    registerUrl: "#",
    description: "School leaders share what is working to recruit and keep great staff.",
  },
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
