import Link from "next/link";
import { logout } from "./actions";

export function AdminHeader({ current }: { current: "requests" | "settings" }) {
  const link = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={active ? "font-bold text-white underline underline-offset-8" : "text-white/85 hover:text-white"}
    >
      {label}
    </Link>
  );
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <span className="font-heading font-extrabold">ELC Admin</span>
          <nav aria-label="Admin" className="flex gap-5 text-sm">
            {link("/admin", "Join requests", current === "requests")}
            {link("/admin/settings", "Invite links", current === "settings")}
            <Link href="/" className="text-white/85 hover:text-white">
              View site
            </Link>
          </nav>
        </div>
        <form action={logout}>
          <button type="submit" className="text-sm text-white/85 underline hover:text-white">
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}

export function Flash({ notice, error }: { notice?: string; error?: string }) {
  if (error)
    return (
      <p role="alert" className="mb-6 rounded-lg border border-destructive/40 bg-white p-4 font-medium text-destructive">
        {error}
      </p>
    );
  if (notice)
    return (
      <p role="status" className="mb-6 rounded-lg border border-teal/40 bg-accent p-4 font-medium text-navy">
        {notice}
      </p>
    );
  return null;
}
