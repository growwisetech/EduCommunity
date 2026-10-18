import { cn } from "@/lib/utils";

export function PlaceholderBadge({
  className,
  label = "Placeholder",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dashed border-navy/40 bg-surface px-2 py-0.5 text-xs font-semibold tracking-wide text-navy uppercase",
        className
      )}
    >
      {label}
    </span>
  );
}
