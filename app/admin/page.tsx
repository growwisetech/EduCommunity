import Link from "next/link";
import { count, desc, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { getDb, schema } from "@/db";
import { getAudience } from "@/content/audiences";
import { communities } from "@/content/communities";
import { requireAdmin } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { AdminHeader, Flash } from "./admin-header";
import { approveRequest, rejectRequest, reopenRequest } from "./actions";

const statuses = ["pending", "approved", "rejected"] as const;
type Status = (typeof statuses)[number];

export default async function AdminRequestsPage({ searchParams }: PageProps<"/admin">) {
  await requireAdmin();
  const sp = await searchParams;
  const status: Status = statuses.includes(sp.status as Status) ? (sp.status as Status) : "pending";
  const notice = typeof sp.notice === "string" ? sp.notice : undefined;
  const error = typeof sp.error === "string" ? sp.error : undefined;

  const db = getDb();
  const [rows, counts, links] = await Promise.all([
    db
      .select()
      .from(schema.joinRequests)
      .where(eq(schema.joinRequests.status, status))
      .orderBy(desc(schema.joinRequests.createdAt))
      .limit(200),
    db
      .select({ status: schema.joinRequests.status, value: count() })
      .from(schema.joinRequests)
      .groupBy(schema.joinRequests.status),
    db.select({ groupSlug: schema.groupInviteLinks.groupSlug }).from(schema.groupInviteLinks),
  ]);
  const countFor = (s: Status) => counts.find((c) => c.status === s)?.value ?? 0;
  const groupsWithLinks = new Set(links.map((l) => l.groupSlug));
  const missingLinks = communities.filter((c) => !groupsWithLinks.has(c.slug));

  return (
    <>
      <AdminHeader current="requests" />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-extrabold">Join requests</h1>

        <div className="mt-6">
          <Flash notice={notice} error={error} />
          {missingLinks.length > 0 && (
            <p className="mb-6 rounded-lg border border-orange bg-white p-4 text-sm">
              <strong>No invite link yet for:</strong> {missingLinks.map((c) => c.name).join(", ")}.{" "}
              <Link href="/admin/settings" className="font-semibold text-teal-dark underline">
                Add invite links
              </Link>{" "}
              before approving people into those groups.
            </p>
          )}
        </div>

        <nav aria-label="Filter by status" className="flex gap-2">
          {statuses.map((s) => (
            <Link
              key={s}
              href={`/admin?status=${s}`}
              aria-current={s === status ? "page" : undefined}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold capitalize",
                s === status ? "border-navy bg-navy text-white" : "border-input bg-white text-navy hover:border-navy"
              )}
            >
              {s} ({countFor(s)})
            </Link>
          ))}
        </nav>

        {rows.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-input bg-white p-8 text-center text-muted-foreground">
            No {status} requests.
          </p>
        ) : (
          <ul className="mt-6 grid gap-4">
            {rows.map((r) => (
              <li key={r.id} className="rounded-xl border border-border bg-white p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold">{r.fullName}</h2>
                    <p className="text-sm text-muted-foreground">
                      {getAudience(r.role)?.role ?? r.role} · {r.organization} · {r.location}
                    </p>
                    <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
                      <dt className="font-semibold text-navy">Email</dt>
                      <dd><a href={`mailto:${r.email}`} className="text-teal-dark underline">{r.email}</a></dd>
                      <dt className="font-semibold text-navy">Phone</dt>
                      <dd>{r.phone}</dd>
                      <dt className="font-semibold text-navy">Submitted</dt>
                      <dd>{r.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</dd>
                      {r.reviewedAt && (
                        <>
                          <dt className="font-semibold text-navy">Reviewed</dt>
                          <dd>{r.reviewedAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</dd>
                        </>
                      )}
                      {r.status === "approved" && (
                        <>
                          <dt className="font-semibold text-navy">Group</dt>
                          <dd>{communities.find((c) => c.slug === r.groupSlug)?.name ?? r.groupSlug}</dd>
                        </>
                      )}
                    </dl>
                    {r.goals && (
                      <p className="mt-3 max-w-prose rounded-lg bg-surface p-3 text-sm whitespace-pre-line">{r.goals}</p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col gap-3 lg:w-72">
                    {r.status === "pending" ? (
                      <>
                        <form action={approveRequest} className="grid gap-2">
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="returnStatus" value={status} />
                          <label htmlFor={`group-${r.id}`} className="text-sm font-semibold text-navy">
                            Group
                          </label>
                          <select
                            id={`group-${r.id}`}
                            name="groupSlug"
                            defaultValue={r.groupSlug}
                            className="h-10 rounded-lg border border-input bg-white px-2 text-sm"
                          >
                            {communities.map((c) => (
                              <option key={c.slug} value={c.slug}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                          <Button type="submit" variant="brand" size="lg" className="h-10">
                            Approve &amp; email invite
                          </Button>
                        </form>
                        <form action={rejectRequest} className="grid gap-2">
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="returnStatus" value={status} />
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" name="notify" defaultChecked className="size-4 accent-navy" />
                            Email a polite decline
                          </label>
                          <Button type="submit" variant="outline" size="lg" className="h-10">
                            Reject
                          </Button>
                        </form>
                      </>
                    ) : (
                      <form action={reopenRequest}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="returnStatus" value={status} />
                        <Button type="submit" variant="outline" size="lg" className="h-10 w-full">
                          Move back to pending
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
