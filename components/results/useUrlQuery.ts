"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSimulatedLoading } from "@/lib/hooks";
import { toSearchParams } from "@/lib/search";

type ParamReader = { get(key: string): string | null };

/**
 * Keeps a search query in the URL (shareable, back/forward friendly).
 * Returns the parsed query, a simulated loading flag that flips on every
 * change, and helpers to run a new search or reset everything.
 */
export function useUrlQuery<Q extends Record<string, string | number>>(
  path: string,
  parse: (params: ParamReader) => Q,
) {
  const router = useRouter();
  const params = useSearchParams();
  const key = params.toString();
  const query = useMemo(() => parse(params), [parse, params]);
  const loading = useSimulatedLoading(key);

  const search = (next: Q) => {
    const qs = toSearchParams(next);
    router.replace(qs ? `${path}?${qs}` : path, { scroll: false });
  };

  const reset = () => router.replace(path, { scroll: false });

  return { key, query, loading, search, reset };
}
