import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ResultCardProps = {
  /** Optional image / visual on the left (top on mobile). */
  media?: ReactNode;
  /** Main details. */
  children: ReactNode;
  /** Price + call to action column. */
  aside: ReactNode;
  className?: string;
};

/**
 * Shared layout for every search result: media | details | price & CTA.
 * Stacks vertically on mobile, becomes a row from the md breakpoint.
 */
export function ResultCard({ media, children, aside, className }: ResultCardProps) {
  return (
    <article
      data-card
      className={cn(
        "group overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink-100 transition-shadow duration-500 hover:shadow-lift md:flex",
        className,
      )}
    >
      {media && (
        <div className="relative aspect-16/10 shrink-0 overflow-hidden md:aspect-auto md:w-72">
          {media}
        </div>
      )}
      <div className="min-w-0 flex-1 p-5 sm:p-6">{children}</div>
      <div className="flex items-center justify-between gap-4 border-t border-ink-100 p-5 sm:p-6 md:w-60 md:shrink-0 md:flex-col md:items-stretch md:justify-center md:border-t-0 md:border-l">
        {aside}
      </div>
    </article>
  );
}

type PriceTagProps = {
  label: string;
  amount: string;
  note?: string;
};

/** Price block used inside a ResultCard aside. */
export function PriceTag({ label, amount, note }: PriceTagProps) {
  return (
    <div className="md:text-right">
      <p className="text-xs font-medium text-ink-400">{label}</p>
      <p className="font-display text-2xl font-semibold text-ink-900">{amount}</p>
      {note && <p className="mt-0.5 text-xs text-ink-500">{note}</p>}
    </div>
  );
}

/** Small rounded label used for badges inside result cards. */
export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "gold" | "success";
}) {
  const tones = {
    neutral: "bg-sand-100 text-ink-600",
    brand: "bg-brand-50 text-brand-700",
    gold: "bg-gold-50 text-gold-700",
    success: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone])}>
      {children}
    </span>
  );
}
