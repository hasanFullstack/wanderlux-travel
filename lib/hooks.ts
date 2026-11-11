"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { toISODate } from "@/lib/search";

const noopSubscribe = () => () => {};

/**
 * Today's date as yyyy-mm-dd, read only in the browser. Returns "" during
 * prerendering so static HTML never bakes in a build-time date.
 */
/**
 * Simulates network latency for mock searches: returns true for `ms` after
 * `key` changes (e.g. the URL query), then false. No setState runs
 * synchronously inside the effect — only in the timeout callback.
 */
export function useSimulatedLoading(key: string, ms = 750) {
  const [settledKey, setSettledKey] = useState<string | null>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => setSettledKey(key), ms);
    return () => window.clearTimeout(timer);
  }, [key, ms]);
  return settledKey !== key;
}

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
