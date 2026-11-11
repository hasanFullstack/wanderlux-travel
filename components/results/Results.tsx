"use client";

import { useId, useRef, type ReactNode } from "react";
import { RotateCcw, SearchX, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectMenu, type SelectOption } from "@/components/ui/SelectMenu";
import { Pagination } from "@/components/results/Pagination";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";
import { cn, pluralize } from "@/lib/utils";

/* ------------------------------------------------------------------
   Search panel — white card that overlaps the bottom of the PageHero.
------------------------------------------------------------------- */

export function SearchPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-20 -mt-24 rounded-[1.75rem] border border-white/60 bg-white p-3 shadow-lift sm:-mt-28 sm:p-4">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Toolbar controls
------------------------------------------------------------------- */

type ToggleChipProps = {
  pressed: boolean;
  onToggle: () => void;
  icon?: LucideIcon;
  children: ReactNode;
};

/** Toggle button styled as a pill (uses aria-pressed). */
export function ToggleChip({ pressed, onToggle, icon: Icon, children }: ToggleChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors duration-300",
        pressed
          ? "border-ink-900 bg-ink-900 text-white"
          : "border-ink-200 bg-white text-ink-700 hover:border-ink-400",
      )}
    >
      {Icon && <Icon className="size-4" aria-hidden="true" />}
      {children}
    </button>
  );
}

type SortSelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export function SortSelect({ value, options, onChange }: SortSelectProps) {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <span id={`${id}-label`} className="shrink-0 text-sm text-ink-500">
        Sort by
      </span>
      <div className="relative w-52 rounded-full border border-ink-200 bg-white px-4 py-2.5 transition-[border-color,box-shadow] focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15 hover:border-ink-400">
        <SelectMenu
          id={id}
          labelId={`${id}-label`}
          value={value}
          options={options}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   States
------------------------------------------------------------------- */

export function ResultsSkeleton({ count = 3, media = true }: { count?: number; media?: boolean }) {
  return (
    <ul className="grid grid-cols-1 gap-5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink-100 md:flex"
        >
          {media && <div className="aspect-16/10 bg-ink-100 md:aspect-auto md:w-72" />}
          <div className="flex-1 space-y-4 p-6">
            <div className="h-4 w-24 rounded-full bg-ink-100" />
            <div className="h-6 w-2/3 rounded-full bg-ink-100" />
            <div className="h-4 w-1/2 rounded-full bg-ink-100" />
            <div className="flex gap-2 pt-2">
              <div className="h-7 w-20 rounded-full bg-ink-50" />
              <div className="h-7 w-24 rounded-full bg-ink-50" />
              <div className="h-7 w-16 rounded-full bg-ink-50" />
            </div>
          </div>
          <div className="space-y-3 border-t border-ink-100 p-6 md:w-60 md:border-t-0 md:border-l">
            <div className="ml-auto h-4 w-16 rounded-full bg-ink-100" />
            <div className="ml-auto h-7 w-28 rounded-full bg-ink-100" />
            <div className="ml-auto h-11 w-full rounded-full bg-ink-100" />
          </div>
        </li>
      ))}
    </ul>
  );
}

type EmptyStateProps = {
  noun: string;
  hint: string;
  onReset: () => void;
};

export function EmptyState({ noun, hint, onReset }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-ink-200 bg-white px-6 py-16 text-center sm:py-20">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-sand-100 text-ink-400">
        <SearchX className="size-8" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-2xl font-semibold text-ink-900">
        No {noun}s match your search
      </h3>
      <p className="mx-auto mt-3 max-w-md text-ink-500">{hint}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Clear search &amp; filters
        </Button>
        <Button href="/contact" variant="dark">
          Ask a travel expert
        </Button>
      </div>
    </div>
  );
}

/** Suspense fallback while the URL-driven explorer hydrates. */
export function ExplorerFallback({ media = true }: { media?: boolean }) {
  return (
    <div className="container-page">
      <SearchPanel>
        <div className="h-[8.5rem] animate-pulse rounded-2xl bg-ink-50" />
      </SearchPanel>
      <section id="results" aria-busy="true" aria-label="Loading results" className="scroll-mt-28 pt-12 pb-20">
        <div className="border-b border-ink-100 pb-6">
          <div className="h-8 w-56 animate-pulse rounded-full bg-ink-100" />
          <div className="mt-3 h-4 w-72 animate-pulse rounded-full bg-ink-50" />
        </div>
        <div className="mt-8">
          <ResultsSkeleton media={media} />
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------
   Results section
------------------------------------------------------------------- */

type ResultsSectionProps = {
  loading: boolean;
  count: number;
  noun: string;
  summary: string;
  toolbar: ReactNode;
  empty: ReactNode;
  /** Changes whenever the visible list changes, to re-run the entrance stagger. */
  animationKey: string;
  media?: boolean;
  /** Client-side pagination state from usePagination(). */
  pagination?: {
    page: number;
    pageCount: number;
    start: number;
    end: number;
    total: number;
    setPage: (page: number) => void;
  };
  children: ReactNode;
};

export function ResultsSection({
  loading,
  count,
  noun,
  summary,
  toolbar,
  empty,
  animationKey,
  media = true,
  pagination,
  children,
}: ResultsSectionProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Change page, bring the list back into view and move focus to its heading.
  const goToPage = (page: number) => {
    pagination?.setPage(page);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    headingRef.current?.focus({ preventScroll: true });
  };

  useGSAP(
    () => {
      const list = listRef.current;
      if (loading || !list) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION.ok, () => {
        gsap.fromTo(
          list.children,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" },
        );
      });
      return () => mm.revert();
    },
    { dependencies: [animationKey, loading], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="results"
      aria-labelledby="results-heading"
      aria-busy={loading}
      className="scroll-mt-28 pt-12 pb-20 sm:pb-28"
    >
      <div className="flex flex-col gap-5 border-b border-ink-100 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2
            ref={headingRef}
            id="results-heading"
            tabIndex={-1}
            className="font-display text-3xl font-semibold text-ink-900 outline-none"
          >
            {loading ? `Searching ${noun}s…` : `${pluralize(count, noun)} found`}
          </h2>
          <p className="mt-1.5 text-sm text-ink-500">{summary}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">{toolbar}</div>
      </div>

      <p role="status" className="sr-only">
        {loading ? `Searching ${noun}s` : `${pluralize(count, noun)} found`}
      </p>

      <div className="mt-8">
        {loading ? (
          <ResultsSkeleton media={media} />
        ) : count === 0 ? (
          empty
        ) : (
          <>
            <ul ref={listRef} className="grid grid-cols-1 gap-5">
              {children}
            </ul>
            {pagination && pagination.pageCount > 1 && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <Pagination
                  page={pagination.page}
                  pageCount={pagination.pageCount}
                  onPageChange={goToPage}
                  label={`${noun.charAt(0).toUpperCase()}${noun.slice(1)}`}
                />
                <p className="text-sm text-ink-500" aria-live="polite">
                  Showing <span className="font-semibold text-ink-900">{pagination.start}–{pagination.end}</span> of{" "}
                  <span className="font-semibold text-ink-900">{pagination.total}</span> {noun}s
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
