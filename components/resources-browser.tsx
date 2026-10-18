"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FileText, Search } from "lucide-react";
import { FilterChips, buildFilterUrl } from "@/components/filter-chips";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resourceRoles, resources, resourceTopics, type Resource } from "@/content/resources";

type Role = Resource["roles"][number];
type Topic = Resource["topics"][number];

function pick<T extends string>(options: readonly T[], value: string | null): T | "" {
  return value && (options as readonly string[]).includes(value) ? (value as T) : "";
}

export function ResourcesBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const role = pick<Role>(resourceRoles, searchParams.get("role"));
  const topic = pick<Topic>(resourceTopics, searchParams.get("topic"));
  const [q, setQ] = useState(searchParams.get("q") ?? "");

  const set = (updates: Record<string, string>) =>
    router.replace(buildFilterUrl(pathname, searchParams, updates), { scroll: false });

  const needle = q.trim().toLowerCase();
  const list = resources.filter(
    (r) =>
      (!role || r.roles.includes(role)) &&
      (!topic || r.topics.includes(topic)) &&
      (!needle || `${r.title} ${r.summary} ${r.type}`.toLowerCase().includes(needle))
  );

  return (
    <div>
      <div className="grid gap-6">
        <div className="max-w-md">
          <Label htmlFor="resource-search" className="mb-2 text-navy">
            Search resources
          </Label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="resource-search"
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                set({ q: e.target.value });
              }}
              placeholder="e.g. budget, interview, AI policy"
              className="h-11 pl-9"
            />
          </div>
        </div>
        <FilterChips label="Role" options={resourceRoles} value={role} onChange={(v) => set({ role: v })} allLabel="All roles" />
        <FilterChips label="Topic" options={resourceTopics} value={topic} onChange={(v) => set({ topic: v })} allLabel="All topics" />
      </div>

      <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
        {list.length} {list.length === 1 ? "resource" : "resources"}
      </p>

      {list.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-input p-8 text-center text-muted-foreground">
          No resources match. Try clearing a filter.
        </p>
      ) : (
        <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <li key={r.slug} className="flex flex-col rounded-xl border border-border bg-white p-6">
              <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-teal-dark uppercase">
                <FileText aria-hidden className="size-4" /> {r.type}
              </p>
              <h3 className="mt-2 text-lg font-bold">{r.title}</h3>
              <p className="mt-2 flex-1 text-muted-foreground">{r.summary}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {r.roles.join(", ")} · {r.topics.join(", ")}
              </p>
              <a href={r.url} className="mt-4 font-semibold text-teal-dark underline underline-offset-4">
                View {r.type.toLowerCase()}<span className="sr-only">: {r.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
