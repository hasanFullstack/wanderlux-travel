"use client";

import { useMemo, useState } from "react";
import { Gauge, Settings2 } from "lucide-react";
import { CarResultCard } from "@/components/cards/results/CarResultCard";
import { EmptyState, ResultsSection, SearchPanel, SortSelect, ToggleChip } from "@/components/results/Results";
import { usePagination } from "@/components/results/Pagination";
import { useUrlQuery } from "@/components/results/useUrlQuery";
import { CarSearchForm } from "@/components/search/CarSearchForm";
import { cars } from "@/data/cars";
import { filterCars, sortCars, type CarSort } from "@/lib/filters";
import { daysBetween, formatShortDate, parseCarQuery } from "@/lib/search";

const PAGE_SIZE = 5;

const sortOptions = [
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function CarsExplorer() {
  const { key, query, loading, search, reset } = useUrlQuery("/cars", parseCarQuery);
  const [sort, setSort] = useState<CarSort>("price-asc");
  const [automatic, setAutomatic] = useState(false);
  const [unlimited, setUnlimited] = useState(false);

  const results = useMemo(
    () =>
      sortCars(
        filterCars(cars, query).filter(
          (c) => (!automatic || c.transmission === "Automatic") && (!unlimited || c.unlimitedMileage),
        ),
        sort,
      ),
    [query, sort, automatic, unlimited],
  );

  // Reset to page 1 whenever the search, sort or filters change.
  const resetKey = `${key}|${sort}|${automatic}|${unlimited}`;
  const pager = usePagination(results, PAGE_SIZE, resetKey);

  const days = query.pickup && query.dropoff ? Math.max(1, daysBetween(query.pickup, query.dropoff)) : 0;
  const summary = [
    query.location || "All locations",
    days ? `${formatShortDate(query.pickup)} – ${formatShortDate(query.dropoff)} · ${days} day${days > 1 ? "s" : ""}` : "Flexible dates",
    query.category || "Any type",
  ].join(" · ");

  const clearAll = () => {
    setAutomatic(false);
    setUnlimited(false);
    reset();
  };

  return (
    <div className="container-page">
      <SearchPanel>
        <CarSearchForm key={key} defaultValues={query} onSearch={search} />
      </SearchPanel>

      <ResultsSection
        loading={loading}
        count={results.length}
        noun="car"
        summary={summary}
        animationKey={`${resetKey}|${pager.page}`}
        pagination={pager}
        toolbar={
          <>
            <ToggleChip pressed={automatic} onToggle={() => setAutomatic((v) => !v)} icon={Settings2}>
              Automatic
            </ToggleChip>
            <ToggleChip pressed={unlimited} onToggle={() => setUnlimited((v) => !v)} icon={Gauge}>
              Unlimited mileage
            </ToggleChip>
            <SortSelect value={sort} options={sortOptions} onChange={(v) => setSort(v as CarSort)} />
          </>
        }
        empty={
          <EmptyState
            noun="car"
            hint="Try another pick-up city, choose “Any type”, or remove the transmission filter."
            onReset={clearAll}
          />
        }
      >
        {pager.pageItems.map((car) => (
          <li key={car.id}>
            <CarResultCard car={car} query={query} />
          </li>
        ))}
      </ResultsSection>
    </div>
  );
}
