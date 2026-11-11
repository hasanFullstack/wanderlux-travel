import Image from "next/image";
import { BadgeCheck, Coffee, MapPin, Star } from "lucide-react";
import { Pill, PriceTag, ResultCard } from "@/components/cards/ResultCard";
import { Button } from "@/components/ui/Button";
import { bookingHref, daysBetween, formatShortDate, type HotelQuery } from "@/lib/search";
import type { Hotel } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const scoreLabel = (score: number) =>
  score >= 9.5 ? "Exceptional" : score >= 9 ? "Superb" : score >= 8.5 ? "Excellent" : "Very good";

type HotelResultCardProps = { hotel: Hotel; query: HotelQuery };

export function HotelResultCard({ hotel, query }: HotelResultCardProps) {
  const nights = daysBetween(query.checkIn, query.checkOut);
  const ref = `${hotel.name}, ${hotel.city}${
    nights > 0 ? ` · ${formatShortDate(query.checkIn)} – ${formatShortDate(query.checkOut)} (${nights} nights)` : ""
  } · ${query.guests} guest${query.guests > 1 ? "s" : ""}`;

  return (
    <ResultCard
      media={
        <>
          <Image
            src={hotel.image}
            alt={`${hotel.name} in ${hotel.city}`}
            fill
            sizes="(min-width: 768px) 288px, 100vw"
            className="object-cover transition-transform duration-1000 ease-premium group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800 backdrop-blur">
            {hotel.type}
          </span>
        </>
      }
      aside={
        <>
          <PriceTag
            label="per night"
            amount={formatPrice(hotel.pricePerNight)}
            note={nights > 0 ? `${formatPrice(hotel.pricePerNight * nights)} for ${nights} nights` : "Taxes included"}
          />
          <Button href={bookingHref("hotels", ref)} className="md:w-full">
            Book now
            <span className="sr-only"> at {hotel.name}</span>
          </Button>
        </>
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex gap-0.5 text-gold-400" role="img" aria-label={`${hotel.stars}-star hotel`}>
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" aria-hidden="true" />
            ))}
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink-900 sm:text-2xl">{hotel.name}</h3>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-500">
            <MapPin className="size-4 text-brand-600" aria-hidden="true" />
            {hotel.city}, {hotel.country}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <span className="inline-grid size-11 place-items-center rounded-xl rounded-bl-sm bg-ink-900 text-sm font-bold text-white">
            {hotel.reviewScore.toFixed(1)}
          </span>
          <p className="mt-1 text-xs font-semibold text-ink-700">{scoreLabel(hotel.reviewScore)}</p>
          <p className="text-xs text-ink-400">{hotel.reviewCount.toLocaleString("en-US")} reviews</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Amenities">
        {hotel.amenities.map((amenity) => (
          <li key={amenity}>
            <Pill>{amenity}</Pill>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
        {hotel.freeCancellation && (
          <span className="inline-flex items-center gap-1.5 text-emerald-700">
            <BadgeCheck className="size-4" aria-hidden="true" />
            Free cancellation
          </span>
        )}
        {hotel.breakfastIncluded && (
          <span className="inline-flex items-center gap-1.5 text-brand-700">
            <Coffee className="size-4" aria-hidden="true" />
            Breakfast included
          </span>
        )}
        <span className="text-ink-400">Sleeps up to {hotel.maxGuests}</span>
      </div>
    </ResultCard>
  );
}
