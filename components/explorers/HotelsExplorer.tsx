"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Coffee } from "lucide-react";
import { HotelResultCard } from "@/components/cards/results/HotelResultCard";
import { EmptyState, ResultsSection, SearchPanel, SortSelect, ToggleChip } from "@/components/results/Results";
import { useUrlQuery } from "@/components/results/useUrlQuery";
import { HotelSearchForm } from "@/components/search/HotelSearchForm";
import { hotels } from "@/data/hotels";
import { filterHotels, sortHotels, type HotelSort } from "@/lib/filters";
import { daysBetween, formatShortDate, parseHotelQuery } from "@/lib/search";

const sortOptions = [
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export function HotelsExplorer() {
  const { key, query, loading, search, reset } = useUrlQuery("/hotels", parseHotelQuery);
  const [sort, setSort] = useState<HotelSort>("rating");
  const [freeCancel, setFreeCancel] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  const results = useMemo(
    () =>
      sortHotels(
        filterHotels(hotels, query).filter(
          (h) => (!freeCancel || h.freeCancellation) && (!breakfast || h.breakfastIncluded),
        ),
        sort,
      ),
    [query, sort, freeCancel, breakfast],
  );

  const nights = daysBetween(query.checkIn, query.checkOut);
  const summary = [
    query.destination ? `“${query.destination}”` : "All destinations",
    nights > 0
      ? `${formatShortDate(query.checkIn)} – ${formatShortDate(query.checkOut)} · ${nights} night${nights > 1 ? "s" : ""}`
      : "Flexible dates",
    `${query.guests} guest${query.guests > 1 ? "s" : ""}`,
  ].join(" · ");

  const clearAll = () => {
    setFreeCancel(false);
    setBreakfast(false);
    reset();
  };

  return (
    <div className="container-page">
      <SearchPanel>
        <HotelSearchForm key={key} defaultValues={query} onSearch={search} />
      </SearchPanel>

      <ResultsSection
        loading={loading}
        count={results.length}
        noun="stay"
        summary={summary}
        animationKey={`${key}|${sort}|${freeCancel}|${breakfast}`}
        toolbar={
          <>
            <ToggleChip pressed={freeCancel} onToggle={() => setFreeCancel((v) => !v)} icon={BadgeCheck}>
              Free cancellation
            </ToggleChip>
            <ToggleChip pressed={breakfast} onToggle={() => setBreakfast((v) => !v)} icon={Coffee}>
              Breakfast
            </ToggleChip>
            <SortSelect value={sort} options={sortOptions} onChange={(v) => setSort(v as HotelSort)} />
          </>
        }
        empty={
          <EmptyState
            noun="stay"
            hint="Try a city or country name like “Dubai” or “Pakistan”, reduce the number of guests, or remove a filter."
            onReset={clearAll}
          />
        }
      >
        {results.map((hotel) => (
          <li key={hotel.id}>
            <HotelResultCard hotel={hotel} query={query} />
          </li>
        ))}
      </ResultsSection>
    </div>
  );
}
