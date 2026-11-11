"use client";

import { useMemo, useState } from "react";
import { EmptyState, ResultsSection, SearchPanel, SortSelect, ToggleChip } from "@/components/results/Results";
import { usePagination } from "@/components/results/Pagination";
import { useUrlQuery } from "@/components/results/useUrlQuery";
import { VisaResultCard } from "@/components/cards/results/VisaResultCard";
import { VisaSearchForm } from "@/components/search/VisaSearchForm";
import { visaCountries } from "@/data/visa";
import { filterVisas, sortVisas, type VisaSort } from "@/lib/filters";
import { parseVisaQuery } from "@/lib/search";
import type { VisaCountry } from "@/lib/types";

const PAGE_SIZE = 5;

const sortOptions = [
  { value: "processing", label: "Fastest processing" },
  { value: "fee", label: "Lowest fee" },
  { value: "success", label: "Highest approval" },
];

const modes: VisaCountry["mode"][] = ["eVisa", "Embassy", "On arrival"];

export function VisaExplorer() {
  const { key, query, loading, search, reset } = useUrlQuery("/visa", parseVisaQuery);
  const [sort, setSort] = useState<VisaSort>("processing");
  const [mode, setMode] = useState<VisaCountry["mode"] | null>(null);

  const results = useMemo(
    () => sortVisas(filterVisas(visaCountries, query).filter((v) => !mode || v.mode === mode), sort),
    [query, sort, mode],
  );

  // Reset to page 1 whenever the search, sort or filters change.
  const resetKey = `${key}|${sort}|${mode}`;
  const pager = usePagination(results, PAGE_SIZE, resetKey);

  const country = visaCountries.find((v) => v.id === query.country)?.country;
  const summary = [
    country ?? "All destinations",
    `${query.nationality} passport`,
    query.type ? `${query.type} visa` : "Any visa type",
  ].join(" · ");

  const clearAll = () => {
    setMode(null);
    reset();
  };

  return (
    <div className="container-page">
      <SearchPanel>
        <VisaSearchForm key={key} defaultValues={query} onSearch={search} />
      </SearchPanel>

      <ResultsSection
        loading={loading}
        count={results.length}
        noun="visa option"
        summary={summary}
        animationKey={`${resetKey}|${pager.page}`}
        pagination={pager}
        toolbar={
          <>
            {modes.map((m) => (
              <ToggleChip key={m} pressed={mode === m} onToggle={() => setMode((cur) => (cur === m ? null : m))}>
                {m}
              </ToggleChip>
            ))}
            <SortSelect value={sort} options={sortOptions} onChange={(v) => setSort(v as VisaSort)} />
          </>
        }
        empty={
          <EmptyState
            noun="visa option"
            hint="This destination may not offer that visa type. Try “Any type”, another application mode, or ask our visa team."
            onReset={clearAll}
          />
        }
      >
        {pager.pageItems.map((visa) => (
          <li key={visa.id}>
            <VisaResultCard visa={visa} query={query} />
          </li>
        ))}
      </ResultsSection>
    </div>
  );
}
