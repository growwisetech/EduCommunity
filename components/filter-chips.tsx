"use client";

import { cn } from "@/lib/utils";

export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
  allLabel = "All",
}: {
  label: string;
  options: readonly T[];
  value: T | "";
  onChange: (value: T | "") => void;
  allLabel?: string;
}) {
  const items: { v: T | ""; text: string }[] = [{ v: "", text: allLabel }, ...options.map((o) => ({ v: o, text: o }))];
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-navy">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {items.map(({ v, text }) => {
          const active = value === v;
          return (
            <button
              key={text}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(v)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                active ? "border-navy bg-navy text-white" : "border-input bg-white text-navy hover:border-navy"
              )}
            >
              {text}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function buildFilterUrl(pathname: string, current: URLSearchParams, updates: Record<string, string>) {
  const params = new URLSearchParams(current.toString());
  for (const [k, v] of Object.entries(updates)) {
    if (v) params.set(k, v);
    else params.delete(k);
  }
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
