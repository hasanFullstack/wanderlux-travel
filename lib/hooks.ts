"use client";

import { useSyncExternalStore } from "react";
import { toISODate } from "@/lib/search";

const noopSubscribe = () => () => {};

/**
 * Today's date as yyyy-mm-dd, read only in the browser. Returns "" during
 * prerendering so static HTML never bakes in a build-time date.
 */
function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

/** True when the user asks the OS for reduced motion (live-updating). */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function useCurrentYear(fallback: number) {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
}

export function useTodayISO() {
  return useSyncExternalStore(
    noopSubscribe,
    () => toISODate(new Date()),
    () => "",
  );
}
