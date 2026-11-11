"use client";

import { useId, useState, type FormEvent } from "react";
import { CalendarCheck, CalendarDays, CarFront, MapPin } from "lucide-react";
import { FieldInput, FieldSelect, SearchField } from "@/components/search/SearchField";
import { SearchSubmit } from "@/components/search/SearchSubmit";
import { useSearchSubmit, type SearchFormProps } from "@/components/search/useSearchSubmit";
import type { SelectOption } from "@/components/ui/SelectMenu";
import { carCategories, carLocations } from "@/data/cars";
import { useTodayISO } from "@/lib/hooks";
import { daysBetween, emptyCarQuery, type CarQuery } from "@/lib/search";
import type { CarCategory } from "@/lib/types";

const locationOptions: SelectOption[] = [
  { value: "", label: "Any location" },
  ...carLocations.map((city) => ({ value: city, label: city })),
];
const categoryOptions: SelectOption[] = [
  { value: "", label: "Any type" },
  ...carCategories.map((c) => ({ value: c, label: c })),
];

export function CarSearchForm({ defaultValues, onSearch }: SearchFormProps<CarQuery>) {
  const id = useId();
  const today = useTodayISO();
  const submit = useSearchSubmit<CarQuery>("/cars", onSearch);
  const [query, setQuery] = useState<CarQuery>({ ...emptyCarQuery, ...defaultValues });
  const [error, setError] = useState("");

  const update = <K extends keyof CarQuery>(key: K, value: CarQuery[K]) => {
    setQuery((q) => ({ ...q, [key]: value }));
    setError("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (query.pickup && query.dropoff && daysBetween(query.pickup, query.dropoff) < 0) {
      setError("Return date can't be before pick-up.");
      return;
    }
    submit(query);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Search rental cars" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-start">
      <SearchField id={`${id}-location`} label="Pick-up location" icon={MapPin} className="sm:col-span-2 lg:flex-[1.5]">
        <FieldSelect
          id={`${id}-location`}
          value={query.location}
          options={locationOptions}
          onChange={(v) => update("location", v)}
        />
      </SearchField>

      <SearchField id={`${id}-pickup`} label="Pick-up date" icon={CalendarDays} className="lg:flex-1">
        <FieldInput
          id={`${id}-pickup`}
          type="date"
          min={today || undefined}
          value={query.pickup}
          onChange={(e) => update("pickup", e.target.value)}
        />
      </SearchField>

      <SearchField id={`${id}-dropoff`} label="Return date" icon={CalendarCheck} error={error} className="lg:flex-1">
        <FieldInput
          id={`${id}-dropoff`}
          type="date"
          min={query.pickup || today || undefined}
          value={query.dropoff}
          onChange={(e) => update("dropoff", e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-dropoff-error` : undefined}
        />
      </SearchField>

      <SearchField id={`${id}-category`} label="Car type" icon={CarFront} className="sm:col-span-2 lg:flex-1">
        <FieldSelect
          id={`${id}-category`}
          value={query.category}
          options={categoryOptions}
          onChange={(v) => update("category", v as CarCategory | "")}
        />
      </SearchField>

      <SearchSubmit label="Find cars" />
    </form>
  );
}
