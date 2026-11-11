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
import { airports, cabinClasses } from "@/data/flights";
import { useTodayISO } from "@/lib/hooks";
import { emptyFlightQuery, type FlightQuery } from "@/lib/search";
import type { CabinClass } from "@/lib/types";

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
    <form onSubmit={handleSubmit} noValidate aria-label="Search flights" className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-start">
      <div className="relative grid gap-3 sm:col-span-2 sm:grid-cols-2 lg:flex-[2.2]">
        <SearchField id={`${id}-from`} label="From" icon={PlaneTakeoff}>
          <FieldSelect id={`${id}-from`} value={query.from} onChange={(e) => update("from", e.target.value)}>
            <option value="">Any city</option>
            {airports.map((a) => (
              <option key={a.code} value={a.code}>
                {a.city} ({a.code})
              </option>
            ))}
          </FieldSelect>
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
            onChange={(e) => update("to", e.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-to-error` : undefined}
          >
            <option value="">Any city</option>
            {airports.map((a) => (
              <option key={a.code} value={a.code}>
                {a.city} ({a.code})
              </option>
            ))}
          </FieldSelect>
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
          onChange={(e) => update("travelers", Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "adult" : "adults"}
            </option>
          ))}
        </FieldSelect>
      </SearchField>

      <SearchField id={`${id}-cabin`} label="Cabin" icon={Crown} className="sm:col-span-2 lg:flex-1">
        <FieldSelect
          id={`${id}-cabin`}
          value={query.cabin}
          onChange={(e) => update("cabin", e.target.value as CabinClass | "")}
        >
          <option value="">Any class</option>
          {cabinClasses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </FieldSelect>
      </SearchField>

      <SearchSubmit label="Search flights" />
    </form>
  );
}
