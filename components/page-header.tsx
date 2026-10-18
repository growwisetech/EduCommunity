import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {eyebrow && (
          <p className="font-heading text-sm font-bold tracking-wide text-teal-dark uppercase">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl md:text-5xl">{title}</h1>
        {intro && <div className="mt-4 max-w-3xl text-lg text-muted-foreground">{intro}</div>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}

export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section id={id} aria-labelledby={title ? headingId : undefined} className={className}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {title && (
          <h2 id={headingId} className="text-2xl font-extrabold sm:text-3xl">
            {title}
          </h2>
        )}
        {intro && <div className="mt-3 max-w-3xl text-muted-foreground">{intro}</div>}
        <div className={title || intro ? "mt-8" : undefined}>{children}</div>
      </div>
    </section>
  );
}
