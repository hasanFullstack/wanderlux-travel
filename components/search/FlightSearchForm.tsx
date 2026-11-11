"use client";

import { useId, useState, type FormEvent } from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  Crown,
  PlaneLanding,
  PlaneTakeoff,
  Users,
} from "lucide-react";
import { FieldInput, FieldSelect, SearchField } from "@/components/search/SearchField";
import { SearchSubmit } from "@/components/search/SearchSubmit";
import { useSearchSubmit, type SearchFormProps } from "@/components/search/useSearchSubmit";
import type { SelectOption } from "@/components/ui/SelectMenu";
import { airports, cabinClasses } from "@/data/flights";
import { useTodayISO } from "@/lib/hooks";
import { emptyFlightQuery, type FlightQuery } from "@/lib/search";
import type { CabinClass } from "@/lib/types";

const airportOptions: SelectOption[] = [
  { value: "", label: "Any city" },
  ...airports.map((a) => ({ value: a.code, label: `${a.city} (${a.code})` })),
];
const travelerOptions: SelectOption[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  value: String(n),
  label: `${n} ${n === 1 ? "adult" : "adults"}`,
}));
const cabinOptions: SelectOption[] = [
  { value: "", label: "Any class" },
  ...cabinClasses.map((c) => ({ value: c, label: c })),
];

export function FlightSearchForm({ defaultValues, onSearch }: SearchFormProps<FlightQuery>) {
  const id = useId();
  const today = useTodayISO();
  const submit = useSearchSubmit<FlightQuery>("/flights", onSearch);
  const [query, setQuery] = useState<FlightQuery>({ ...emptyFlightQuery, ...defaultValues });
  const [error, setError] = useState("");

  const update = <K extends keyof FlightQuery>(key: K, value: FlightQuery[K]) => {
    setQuery((q) => ({ ...q, [key]: value }));
    setError("");
  };

  const swap = () => setQuery((q) => ({ ...q, from: q.to, to: q.from }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (query.from && query.from === query.to) {
      setError("Origin and destination must be different.");
      return;
    }
    submit(query);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Search flights" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-start">
      <div className="relative grid grid-cols-1 gap-3 sm:col-span-2 sm:grid-cols-2 lg:flex-[2.2]">
        <SearchField id={`${id}-from`} label="From" icon={PlaneTakeoff}>
          <FieldSelect
            id={`${id}-from`}
            value={query.from}
            options={airportOptions}
            onChange={(v) => update("from", v)}
          />
        </SearchField>

        <button
          type="button"
          onClick={swap}
          aria-label="Swap origin and destination"
          className="absolute top-[4.375rem] right-12 z-10 grid size-9 -translate-y-1/2 rotate-90 place-items-center rounded-full border border-ink-100 bg-white text-brand-700 shadow-soft transition-transform duration-500 ease-premium hover:rotate-270 sm:top-8 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:rotate-0 sm:hover:rotate-180"
        >
          <ArrowLeftRight className="size-4" aria-hidden="true" />
        </button>

        <SearchField id={`${id}-to`} label="To" icon={PlaneLanding} error={error}>
          <FieldSelect
            id={`${id}-to`}
            value={query.to}
            options={airportOptions}
            onChange={(v) => update("to", v)}
            invalid={Boolean(error)}
            describedBy={error ? `${id}-to-error` : undefined}
          />
        </SearchField>
      </div>

      <SearchField id={`${id}-date`} label="Depart" icon={CalendarDays} className="lg:flex-1">
        <FieldInput
          id={`${id}-date`}
          type="date"
          min={today || undefined}
          value={query.date}
          onChange={(e) => update("date", e.target.value)}
        />
      </SearchField>

      <SearchField id={`${id}-travelers`} label="Travelers" icon={Users} className="lg:flex-[0.8]">
        <FieldSelect
          id={`${id}-travelers`}
          value={query.travelers}
          options={travelerOptions}
          onChange={(v) => update("travelers", Number(v))}
        />
      </SearchField>

      <SearchField id={`${id}-cabin`} label="Cabin" icon={Crown} className="sm:col-span-2 lg:flex-1">
        <FieldSelect
          id={`${id}-cabin`}
          value={query.cabin}
          options={cabinOptions}
          onChange={(v) => update("cabin", v as CabinClass | "")}
        />
      </SearchField>

      <SearchSubmit label="Search flights" />
    </form>
  );
}
