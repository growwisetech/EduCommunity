import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { EventsBrowser } from "@/components/events-browser";
import { PageHeader, Section } from "@/components/page-header";
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
        intro="Join our monthly community meetings: live conversations and podcast sessions with education leaders."
      />
      <Section>
        <Suspense>
          <EventsBrowser upcoming={upcomingEvents()} past={pastEvents()} />
        </Suspense>
      </Section>
    </>
  );
}
