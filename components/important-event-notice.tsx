"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CalendarDays, Clock, X } from "lucide-react";
import { formatEventDate, type CommunityEvent } from "@/content/events";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ImportantEventNotice({ event }: { event: CommunityEvent }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) return;

    dialog.showModal();
  }, [event.slug]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="important-event-notice-title"
      aria-describedby="important-event-notice-description"
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-border bg-white p-0 text-foreground shadow-2xl backdrop:bg-navy/60"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-orange px-3 py-1 text-xs font-bold text-navy">Important event</span>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Dismiss event notification"
            className="rounded-md p-1 text-muted-foreground hover:bg-surface hover:text-navy"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <h2 id="important-event-notice-title" className="mt-4 text-2xl font-extrabold">
          {event.title}
        </h2>
        <p id="important-event-notice-description" className="mt-3 text-muted-foreground">
          {event.description}
        </p>
        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays aria-hidden className="size-4 text-teal-dark" />
            <dt className="sr-only">Date</dt>
            <dd><time dateTime={event.date}>{formatEventDate(event.date)}</time></dd>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock aria-hidden className="size-4 text-teal-dark" />
              <dt className="sr-only">Time</dt>
              <dd>{event.time}</dd>
            </div>
          )}
        </dl>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-lg border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-surface"
          >
            Maybe later
          </button>
          <Link
            href="/events"
            onClick={() => dialogRef.current?.close()}
            className={cn(buttonVariants({ variant: "brand", size: "lg" }))}
          >
            View event details
          </Link>
        </div>
      </div>
    </dialog>
  );
}
