"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Route } from "lucide-react";
import { FlightResultCard } from "@/components/cards/results/FlightResultCard";
import { EmptyState, ResultsSection, SearchPanel, SortSelect, ToggleChip } from "@/components/results/Results";
import { useUrlQuery } from "@/components/results/useUrlQuery";
import { FlightSearchForm } from "@/components/search/FlightSearchForm";
import { airports, flights } from "@/data/flights";
import { filterFlights, sortFlights, type FlightSort } from "@/lib/filters";
import { formatShortDate, parseFlightQuery } from "@/lib/search";

const sortOptions = [
  { value: "price", label: "Cheapest first" },
  { value: "duration", label: "Fastest first" },
  { value: "departure", label: "Earliest departure" },
];

const cityOf = (code: string) => airports.find((a) => a.code === code)?.city ?? code;

export function FlightsExplorer() {
  const { key, query, loading, search, reset } = useUrlQuery("/flights", parseFlightQuery);
  const [sort, setSort] = useState<FlightSort>("price");
  const [nonStop, setNonStop] = useState(false);
  const [refundable, setRefundable] = useState(false);

  const results = useMemo(
    () =>
      sortFlights(
        filterFlights(flights, query).filter(
          (f) => (!nonStop || f.stops === 0) && (!refundable || f.refundable),
        ),
        sort,
      ),
    [query, sort, nonStop, refundable],
  );

  const summary = [
    query.from || query.to
      ? `${query.from ? cityOf(query.from) : "Anywhere"} → ${query.to ? cityOf(query.to) : "Anywhere"}`
      : "All routes",
    query.date ? formatShortDate(query.date) : "Any date",
    `${query.travelers} adult${query.travelers > 1 ? "s" : ""}`,
    query.cabin || "Any class",
  ].join(" · ");

  const clearAll = () => {
    setNonStop(false);
    setRefundable(false);
    reset();
  };

  return (
    <div className="container-page">
      <SearchPanel>
        <FlightSearchForm key={key} defaultValues={query} onSearch={search} />
      </SearchPanel>

      <ResultsSection
        loading={loading}
        count={results.length}
        noun="flight"
        summary={summary}
        media={false}
        animationKey={`${key}|${sort}|${nonStop}|${refundable}`}
        toolbar={
          <>
            <ToggleChip pressed={nonStop} onToggle={() => setNonStop((v) => !v)} icon={Route}>
              Non-stop only
            </ToggleChip>
            <ToggleChip pressed={refundable} onToggle={() => setRefundable((v) => !v)} icon={BadgeCheck}>
              Refundable
            </ToggleChip>
            <SortSelect value={sort} options={sortOptions} onChange={(v) => setSort(v as FlightSort)} />
          </>
        }
        empty={
          <EmptyState
            noun="flight"
            hint="Try another date or nearby airport, switch cabin class, or remove the non-stop filter."
            onReset={clearAll}
          />
        }
      >
        {results.map((flight) => (
          <li key={flight.id}>
            <FlightResultCard flight={flight} query={query} />
          </li>
        ))}
      </ResultsSection>
    </div>
  );
}
