"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EventCard } from "@/components/cards";
import { FilterChips, buildFilterUrl } from "@/components/filter-chips";
import { eventFormats, type CommunityEvent, type EventFormat } from "@/content/events";
import { cn } from "@/lib/utils";

export function EventsBrowser({ upcoming, past }: { upcoming: CommunityEvent[]; past: CommunityEvent[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const view = searchParams.get("view") === "past" ? "past" : "upcoming";
  const formatParam = searchParams.get("format") ?? "";
  const format = (eventFormats as readonly string[]).includes(formatParam) ? (formatParam as EventFormat) : "";

  const set = (updates: Record<string, string>) =>
    router.replace(buildFilterUrl(pathname, searchParams, updates), { scroll: false });

  const list = (view === "past" ? past : upcoming).filter((e) => !format || e.format === format);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div role="group" aria-label="Show events" className="inline-flex self-start rounded-lg border border-input bg-white p-1">
          {(["upcoming", "past"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => set({ view: v === "upcoming" ? "" : v })}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-semibold capitalize",
                view === v ? "bg-navy text-white" : "text-navy hover:bg-surface"
              )}
            >
              {v}
            </button>
          ))}
        </div>
        <FilterChips label="Format" options={eventFormats} value={format} onChange={(v) => set({ format: v })} />
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} {list.length === 1 ? "event" : "events"} shown
      </p>

      {list.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-input p-8 text-center text-muted-foreground">
          No {view} events match this filter.
        </p>
      ) : (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <li key={e.slug}>
              <EventCard event={e} past={view === "past"} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
