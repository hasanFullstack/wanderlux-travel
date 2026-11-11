"use client";

import { useId, useState, type FormEvent } from "react";
import { Flag, Globe2, ScrollText } from "lucide-react";
import { FieldSelect, SearchField } from "@/components/search/SearchField";
import { SearchSubmit } from "@/components/search/SearchSubmit";
import { useSearchSubmit, type SearchFormProps } from "@/components/search/useSearchSubmit";
import { nationalities, visaCountries, visaTypes } from "@/data/visa";
import { emptyVisaQuery, type VisaQuery } from "@/lib/search";
import type { VisaType } from "@/lib/types";

export function VisaSearchForm({ defaultValues, onSearch }: SearchFormProps<VisaQuery>) {
  const id = useId();
  const submit = useSearchSubmit<VisaQuery>("/visa", onSearch);
  const [query, setQuery] = useState<VisaQuery>({ ...emptyVisaQuery, ...defaultValues });

  const update = <K extends keyof VisaQuery>(key: K, value: VisaQuery[K]) =>
    setQuery((q) => ({ ...q, [key]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit(query);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Search visa requirements" className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-start">
      <SearchField id={`${id}-country`} label="Travelling to" icon={Globe2} className="sm:col-span-2 lg:flex-[1.6]">
        <FieldSelect id={`${id}-country`} value={query.country} onChange={(e) => update("country", e.target.value)}>
          <option value="">Any destination</option>
          {visaCountries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.country}
            </option>
          ))}
        </FieldSelect>
      </SearchField>

      <SearchField id={`${id}-nationality`} label="Passport" icon={Flag} className="lg:flex-1">
        <FieldSelect
          id={`${id}-nationality`}
          value={query.nationality}
          onChange={(e) => update("nationality", e.target.value)}
        >
          {nationalities.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </FieldSelect>
      </SearchField>

      <SearchField id={`${id}-type`} label="Visa type" icon={ScrollText} className="lg:flex-1">
        <FieldSelect
          id={`${id}-type`}
          value={query.type}
          onChange={(e) => update("type", e.target.value as VisaType | "")}
        >
          <option value="">Any type</option>
          {visaTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </FieldSelect>
      </SearchField>

      <SearchSubmit label="Check visa" />
    </form>
  );
}
