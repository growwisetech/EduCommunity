"use client";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">
        The admin dashboard couldn&apos;t load. If this is a new setup, check that <code>DATABASE_URL</code> is set and
        that migrations have been run (<code>npm run db:migrate</code>).
      </p>
      {error.digest && <p className="mt-2 text-sm text-muted-foreground">Error reference: {error.digest}</p>}
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-navy px-4 py-2 font-semibold text-white hover:bg-navy-700"
      >
        Try again
      </button>
    </main>
  );
}
