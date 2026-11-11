"use client";

import { useSyncExternalStore } from "react";
import { toISODate } from "@/lib/search";

const noopSubscribe = () => () => {};

/**
 * Today's date as yyyy-mm-dd, read only in the browser. Returns "" during
 * prerendering so static HTML never bakes in a build-time date.
 */
export function useTodayISO() {
  return useSyncExternalStore(
    noopSubscribe,
    () => toISODate(new Date()),
    () => "",
  );
}
