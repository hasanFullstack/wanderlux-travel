"use client";

import { useId, useState, type FormEvent } from "react";
import { CalendarCheck, CalendarDays, MapPin, Users } from "lucide-react";
import { FieldInput, FieldSelect, SearchField } from "@/components/search/SearchField";
import { SearchSubmit } from "@/components/search/SearchSubmit";
import { useSearchSubmit, type SearchFormProps } from "@/components/search/useSearchSubmit";
import type { SelectOption } from "@/components/ui/SelectMenu";
import { hotels } from "@/data/hotels";
import { useTodayISO } from "@/lib/hooks";
import { daysBetween, emptyHotelQuery, type HotelQuery } from "@/lib/search";

const destinations = Array.from(new Set(hotels.map((h) => h.city))).sort();
const guestOptions: SelectOption[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  value: String(n),
  label: `${n} ${n === 1 ? "guest" : "guests"}`,
}));

type Errors = Partial<Record<"checkIn" | "checkOut", string>>;

export function HotelSearchForm({ defaultValues, onSearch }: SearchFormProps<HotelQuery>) {
  const id = useId();
  const today = useTodayISO();
  const submit = useSearchSubmit<HotelQuery>("/hotels", onSearch);
  const [query, setQuery] = useState<HotelQuery>({ ...emptyHotelQuery, ...defaultValues });
  const [errors, setErrors] = useState<Errors>({});

  const update = <K extends keyof HotelQuery>(key: K, value: HotelQuery[K]) => {
    setQuery((q) => ({ ...q, [key]: value }));
    setErrors({});
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (query.checkIn && !query.checkOut) next.checkOut = "Choose a check-out date.";
    if (!query.checkIn && query.checkOut) next.checkIn = "Choose a check-in date.";
    if (query.checkIn && query.checkOut && daysBetween(query.checkIn, query.checkOut) < 1) {
      next.checkOut = "Check-out must be after check-in.";
    }
    setErrors(next);
    if (Object.keys(next).length === 0) submit(query);
  };

  const listId = `${id}-destinations`;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Search hotels" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-start">
      <SearchField id={`${id}-destination`} label="Destination" icon={MapPin} className="sm:col-span-2 lg:flex-[1.6]">
        <FieldInput
          id={`${id}-destination`}
          type="text"
          list={listId}
          autoComplete="off"
          placeholder="City or country"
          value={query.destination}
          onChange={(e) => update("destination", e.target.value)}
        />
        <datalist id={listId}>
          {destinations.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </SearchField>

      <SearchField id={`${id}-checkin`} label="Check-in" icon={CalendarDays} error={errors.checkIn} className="lg:flex-1">
        <FieldInput
          id={`${id}-checkin`}
          type="date"
          min={today || undefined}
          value={query.checkIn}
          onChange={(e) => update("checkIn", e.target.value)}
          aria-invalid={Boolean(errors.checkIn)}
          aria-describedby={errors.checkIn ? `${id}-checkin-error` : undefined}
        />
      </SearchField>

      <SearchField id={`${id}-checkout`} label="Check-out" icon={CalendarCheck} error={errors.checkOut} className="lg:flex-1">
        <FieldInput
          id={`${id}-checkout`}
          type="date"
          min={query.checkIn || today || undefined}
          value={query.checkOut}
          onChange={(e) => update("checkOut", e.target.value)}
          aria-invalid={Boolean(errors.checkOut)}
          aria-describedby={errors.checkOut ? `${id}-checkout-error` : undefined}
        />
      </SearchField>

      <SearchField id={`${id}-guests`} label="Guests" icon={Users} className="sm:col-span-2 lg:flex-[0.8]">
        <FieldSelect
          id={`${id}-guests`}
          value={query.guests}
          options={guestOptions}
          onChange={(v) => update("guests", Number(v))}
        />
      </SearchField>

      <SearchSubmit label="Search hotels" />
    </form>
  );
}
