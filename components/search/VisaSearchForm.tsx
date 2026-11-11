"use client";

import { useId, useState, type FormEvent } from "react";
import { Flag, Globe2, ScrollText } from "lucide-react";
import { FieldSelect, SearchField } from "@/components/search/SearchField";
import { SearchSubmit } from "@/components/search/SearchSubmit";
import { useSearchSubmit, type SearchFormProps } from "@/components/search/useSearchSubmit";
import type { SelectOption } from "@/components/ui/SelectMenu";
import { nationalities, visaCountries, visaTypes } from "@/data/visa";
import { emptyVisaQuery, type VisaQuery } from "@/lib/search";
import type { VisaType } from "@/lib/types";

const countryOptions: SelectOption[] = [
  { value: "", label: "Any destination" },
  ...visaCountries.map((c) => ({ value: c.id, label: c.country })),
];
const nationalityOptions: SelectOption[] = nationalities.map((n) => ({ value: n, label: n }));
const typeOptions: SelectOption[] = [
  { value: "", label: "Any type" },
  ...visaTypes.map((t) => ({ value: t, label: t })),
];

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
    <form onSubmit={handleSubmit} noValidate aria-label="Search visa requirements" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-start">
      <SearchField id={`${id}-country`} label="Travelling to" icon={Globe2} className="sm:col-span-2 lg:flex-[1.6]">
        <FieldSelect
          id={`${id}-country`}
          value={query.country}
          options={countryOptions}
          onChange={(v) => update("country", v)}
        />
      </SearchField>

      <SearchField id={`${id}-nationality`} label="Passport" icon={Flag} className="lg:flex-1">
        <FieldSelect
          id={`${id}-nationality`}
          value={query.nationality}
          options={nationalityOptions}
          onChange={(v) => update("nationality", v)}
        />
      </SearchField>

      <SearchField id={`${id}-type`} label="Visa type" icon={ScrollText} className="lg:flex-1">
        <FieldSelect
          id={`${id}-type`}
          value={query.type}
          options={typeOptions}
          onChange={(v) => update("type", v as VisaType | "")}
        />
      </SearchField>

      <SearchSubmit label="Check visa" />
    </form>
  );
}
