import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { PlaceholderBadge } from "@/components/placeholder-badge";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} intro={<>Last updated: {updated}</>} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div role="note" className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-navy/40 bg-surface p-4 text-sm">
          <PlaceholderBadge />
          <span>This is placeholder text. Have legal counsel review it before launch.</span>
        </div>
        <div className="prose-legal">{children}</div>
      </div>
    </>
  );
}
