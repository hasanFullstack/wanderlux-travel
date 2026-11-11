import { Armchair, BadgeCheck, Luggage, Plane } from "lucide-react";
import { Pill, PriceTag, ResultCard } from "@/components/cards/ResultCard";
import { AirlineLogo } from "@/components/ui/AirlineLogo";
import { Button } from "@/components/ui/Button";
import { bookingHref, formatShortDate, type FlightQuery } from "@/lib/search";
import type { Flight } from "@/lib/types";
import { formatDuration, formatPrice } from "@/lib/utils";

type FlightResultCardProps = { flight: Flight; query: FlightQuery };

export function FlightResultCard({ flight, query }: FlightResultCardProps) {
  const { from, to } = flight;
  const travelers = query.travelers;
  const total = flight.price * travelers;
  const ref = `Flight ${flight.flightNumber} · ${from.city} (${from.code}) → ${to.city} (${to.code}) · ${flight.cabin}${
    query.date ? ` · ${formatShortDate(query.date)}` : ""
  } · ${travelers} traveler${travelers > 1 ? "s" : ""}`;

  return (
    <ResultCard
      aside={
        <>
          <PriceTag
            label="per traveler"
            amount={formatPrice(flight.price)}
            note={travelers > 1 ? `${formatPrice(total)} for ${travelers}` : flight.refundable ? "Refundable fare" : "Non-refundable"}
          />
          <Button href={bookingHref("flights", ref)} className="md:w-full">
            Select
            <span className="sr-only"> flight {flight.flightNumber}</span>
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <AirlineLogo code={flight.airlineCode} />
        <div className="mr-auto">
          <h3 className="font-semibold text-ink-900">{flight.airline}</h3>
          <p className="text-xs text-ink-400">
            {flight.flightNumber}
            {query.date && ` · ${formatShortDate(query.date)}`}
          </p>
        </div>
        <Pill tone={flight.cabin === "Economy" ? "neutral" : "gold"}>{flight.cabin}</Pill>
      </div>

      {/* Timeline */}
      <div className="mt-6 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div>
          <p className="font-display text-2xl font-semibold text-ink-900 tabular-nums">{flight.departTime}</p>
          <p className="text-sm font-semibold text-ink-500">
            {from.code} <span className="font-normal">· {from.city}</span>
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-ink-400">{formatDuration(flight.durationMinutes)}</p>
          <div className="relative my-1.5 flex items-center" aria-hidden="true">
            <span className="size-2 rounded-full border-2 border-brand-500" />
            <span className="h-px flex-1 border-t-2 border-dashed border-ink-200" />
            <Plane className="mx-1 size-4 rotate-45 text-brand-600" />
            <span className="h-px flex-1 border-t-2 border-dashed border-ink-200" />
            <span className="size-2 rounded-full bg-brand-500" />
          </div>
          <p className={`text-xs font-semibold ${flight.stops ? "text-gold-700" : "text-emerald-700"}`}>
            {flight.stops ? `1 stop · ${flight.stopover}` : "Non-stop"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-semibold text-ink-900 tabular-nums">
            {flight.arriveTime}
            {flight.dayOffset > 0 && (
              <sup className="ml-0.5 text-xs font-bold text-gold-700" title="Arrives next day">
                +1
              </sup>
            )}
          </p>
          <p className="text-sm font-semibold text-ink-500">
            {to.code} <span className="font-normal">· {to.city}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Pill>
          <Luggage className="size-3.5" aria-hidden="true" />
          {flight.baggage}
        </Pill>
        {flight.refundable && (
          <Pill tone="success">
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            Refundable
          </Pill>
        )}
        {flight.seatsLeft <= 6 && (
          <Pill tone="gold">
            <Armchair className="size-3.5" aria-hidden="true" />
            Only {flight.seatsLeft} seats left
          </Pill>
        )}
      </div>
    </ResultCard>
  );
}
