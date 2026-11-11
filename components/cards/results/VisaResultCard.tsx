import Image from "next/image";
import { CalendarClock, Check, Clock, Hourglass, TrendingUp } from "lucide-react";
import { Pill, PriceTag, ResultCard } from "@/components/cards/ResultCard";
import { Button } from "@/components/ui/Button";
import { bookingHref, type VisaQuery } from "@/lib/search";
import type { VisaCountry } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const modeTone = { eVisa: "brand", Embassy: "neutral", "On arrival": "success" } as const;

type VisaResultCardProps = { visa: VisaCountry; query: VisaQuery };

export function VisaResultCard({ visa, query }: VisaResultCardProps) {
  const type = query.type || visa.visaTypes[0];
  const ref = `${type} visa for ${visa.country} · ${query.nationality} passport`;
  const facts = [
    { icon: Clock, label: "Processing", value: visa.processing },
    { icon: CalendarClock, label: "Validity", value: visa.validity },
    { icon: Hourglass, label: "Max stay", value: visa.maxStay },
    { icon: TrendingUp, label: "Approval rate", value: `${visa.successRate}%` },
  ];
  const docs = visa.requirements.slice(0, 4);
  const moreDocs = visa.requirements.length - docs.length;

  return (
    <ResultCard
      media={
        <Image
          src={visa.image}
          alt={visa.country}
          fill
          sizes="(min-width: 768px) 288px, 100vw"
          className="object-cover transition-transform duration-1000 ease-premium group-hover:scale-105"
        />
      }
      aside={
        <>
          <PriceTag
            label="service fee"
            amount={visa.fee ? formatPrice(visa.fee) : "Free"}
            note="per applicant, incl. govt. fee"
          />
          <Button href={bookingHref("visa", ref)} className="md:w-full">
            Apply now
            <span className="sr-only"> for {visa.country}</span>
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone={modeTone[visa.mode]}>{visa.mode}</Pill>
        <Pill>{visa.region}</Pill>
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold text-ink-900 sm:text-2xl">{visa.country}</h3>
      <p className="mt-1 text-sm text-ink-500">
        {visa.visaTypes.join(" · ")} visas · for {query.nationality} passport holders
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
        {facts.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <dt className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400">
              <Icon className="size-3.5 text-brand-600" aria-hidden="true" />
              {label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-ink-800">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-ink-100 pt-4">
        <p className="text-xs font-semibold tracking-wide text-ink-400 uppercase">Documents needed</p>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {docs.map((doc) => (
            <li key={doc} className="inline-flex items-start gap-2 text-sm text-ink-600">
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
              {doc}
            </li>
          ))}
          {moreDocs > 0 && <li className="text-sm font-medium text-brand-700">+{moreDocs} more — we&apos;ll guide you</li>}
        </ul>
      </div>
    </ResultCard>
  );
}
