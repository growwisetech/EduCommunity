import Link from "next/link";
import { communityGuidelines } from "@/content/communities";

export function Guidelines() {
  return (
    <>
      <ol className="grid gap-5 md:grid-cols-2">
        {communityGuidelines.map((g, i) => (
          <li key={g.title} className="flex gap-4 rounded-xl border border-border bg-white p-5">
            <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy font-heading font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h3 className="font-bold">{g.title}</h3>
              <p className="mt-1 text-muted-foreground">{g.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6">
        Read the full{" "}
        <Link href="/legal/code-of-conduct" className="font-semibold text-teal-dark underline underline-offset-2">
          Code of Conduct
        </Link>
        .
      </p>
    </>
  );
}
