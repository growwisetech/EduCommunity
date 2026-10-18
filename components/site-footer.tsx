import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { legalNav, mainNav, site } from "@/lib/site";

export async function SiteFooter() {
  "use cache";
  cacheLife("days");
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} home`}>
            <span className="rounded-lg bg-white p-1">
              <Image src="/logo-icon.png" alt="" width={40} height={41} />
            </span>
            <span className="font-heading text-lg font-extrabold">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-white/85">{site.mission}</p>
          <p className="mt-4">
            <a href={`mailto:${site.contactEmail}`} className="text-teal-light underline underline-offset-2 hover:text-white">
              {site.contactEmail}
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-sm font-bold tracking-wide text-white uppercase">Explore</h2>
          <ul className="mt-3 space-y-2">
            {[...mainNav, { href: "/join", label: "Join" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/85 hover:text-teal-light hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-bold tracking-wide text-white uppercase">Legal</h2>
          <ul className="mt-3 space-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/85 hover:text-teal-light hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 font-heading text-sm font-bold tracking-wide text-white uppercase">Follow</h2>
          <ul className="mt-3 space-y-2">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-white/85 hover:text-teal-light hover:underline" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-white/75 sm:px-6">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
