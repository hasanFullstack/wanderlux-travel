"use client";

import { useCurrentYear } from "@/lib/hooks";

/** Current year, read in the browser so the static HTML never goes stale. */
export function FooterYear() {
  return <>{useCurrentYear(2026)}</>;
}
