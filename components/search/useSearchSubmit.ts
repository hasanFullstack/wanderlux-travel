"use client";

import { useRouter } from "next/navigation";
import { toSearchParams } from "@/lib/search";

export type SearchFormProps<Q> = {
  defaultValues?: Partial<Q>;
  /** When provided the form calls this instead of navigating. */
  onSearch?: (query: Q) => void;
};

/**
 * Returns a submit handler: calls `onSearch` when given (service pages),
 * otherwise navigates to the service page with the query in the URL (hero).
 */
export function useSearchSubmit<Q extends Record<string, string | number>>(
  path: string,
  onSearch?: (query: Q) => void,
) {
  const router = useRouter();
  return (query: Q) => {
    if (onSearch) {
      onSearch(query);
      return;
    }
    const qs = toSearchParams(query);
    router.push(`${path}${qs ? `?${qs}` : ""}#results`);
  };
}
