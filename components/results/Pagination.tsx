"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PageItem = number | "ellipsis-start" | "ellipsis-end";

/**
 * Page numbers to display, collapsing long ranges with ellipses:
 * 1 … 4 5 6 … 12 (always keeps first, last and `siblings` around current).
 */
export function getPageItems(current: number, total: number, siblings = 1): PageItem[] {
  const maxVisible = siblings * 2 + 5;
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);

  const left = Math.max(current - siblings, 2);
  const right = Math.min(current + siblings, total - 1);
  const items: PageItem[] = [1];

  if (left > 2) items.push("ellipsis-start");
  else for (let p = 2; p < left; p++) items.push(p);

  for (let p = left; p <= right; p++) items.push(p);

  if (right < total - 1) items.push("ellipsis-end");
  else for (let p = right + 1; p < total; p++) items.push(p);

  items.push(total);
  return items;
}

/**
 * Client-side pagination state. The page resets to 1 whenever `resetKey`
 * changes (new search, sort or filter) — derived during render, no effects.
 */
export function usePagination<T>(items: T[], pageSize: number, resetKey: string) {
  const [state, setState] = useState({ page: 1, key: resetKey });
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const requested = state.key === resetKey ? state.page : 1;
  const page = Math.min(Math.max(requested, 1), pageCount);
  const startIndex = (page - 1) * pageSize;

  return {
    page,
    pageCount,
    pageItems: items.slice(startIndex, startIndex + pageSize),
    start: items.length ? startIndex + 1 : 0,
    end: Math.min(startIndex + pageSize, items.length),
    total: items.length,
    setPage: (next: number) => setState({ page: next, key: resetKey }),
  };
}

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** e.g. "flights" — used in the accessible label. */
  label: string;
  className?: string;
};

const arrowButton =
  "group/arrow inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-ink-800 transition-colors duration-300 " +
  "hover:bg-ink-900 hover:text-white disabled:pointer-events-none disabled:text-ink-300";

/**
 * Accessible pagination bar: a white pill holding prev/next and numbered
 * pages (with ellipses). Collapses to "Page X of Y" on small screens.
 */
export function Pagination({ page, pageCount, onPageChange, label, className }: PaginationProps) {
  if (pageCount <= 1) return null;
  const items = getPageItems(page, pageCount);

  return (
    <nav
      aria-label={`${label} pages`}
      className={cn(
        "flex w-full items-center justify-between gap-1 rounded-full bg-white p-1.5 shadow-soft ring-1 ring-ink-100 sm:inline-flex sm:w-auto",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={arrowButton}
      >
        <ChevronLeft className="size-4 transition-transform duration-300 group-hover/arrow:-translate-x-0.5" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only">Previous</span>
      </button>

      <span aria-hidden="true" className="hidden h-6 w-px bg-ink-100 sm:block" />

      {/* Compact indicator on small screens */}
      <p className="px-2 text-sm text-ink-500 sm:hidden" aria-hidden="true">
        Page <span className="font-semibold text-ink-900">{page}</span> of{" "}
        <span className="font-semibold text-ink-900">{pageCount}</span>
      </p>

      <ul className="hidden items-center gap-1 px-1 sm:flex">
        {items.map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  "grid size-11 place-items-center rounded-full text-sm font-semibold tabular-nums transition-[background-color,color,box-shadow] duration-300",
                  item === page
                    ? "bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-[0_10px_24px_-10px] shadow-brand-600/80"
                    : "text-ink-600 hover:bg-brand-50 hover:text-brand-700",
                )}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item} aria-hidden="true" className="grid size-11 place-items-center text-ink-400">
              …
            </li>
          ),
        )}
      </ul>

      <span aria-hidden="true" className="hidden h-6 w-px bg-ink-100 sm:block" />

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
        className={arrowButton}
      >
        <span className="sr-only sm:not-sr-only">Next</span>
        <ChevronRight className="size-4 transition-transform duration-300 group-hover/arrow:translate-x-0.5" aria-hidden="true" />
      </button>
    </nav>
  );
}
