import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { EventsBrowser } from "@/components/events-browser";
import { PageHeader, Section } from "@/components/page-header";
import { PlaceholderBadge } from "@/components/placeholder-badge";
import { pastEvents, upcomingEvents } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Virtual sessions, in-person meetups, and summits for K–12 education leaders, many with PD hours.",
  openGraph: { url: "/events" },
};

export default async function EventsPage() {
  "use cache";
  cacheLife("hours");
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Learn alongside your peers"
        intro="Virtual roundtables, local meetups, and an annual summit. Many sessions count toward PD hours."
      >
        <PlaceholderBadge label="Placeholder events" />
      </PageHeader>
      <Section>
        <Suspense>
          <EventsBrowser upcoming={upcomingEvents()} past={pastEvents()} />
        </Suspense>
      </Section>
    </>
  );
}
