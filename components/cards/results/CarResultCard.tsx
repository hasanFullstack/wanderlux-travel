import Image from "next/image";
import { BadgeCheck, Briefcase, DoorOpen, Fuel, Gauge, Settings2, Star, Users, Zap } from "lucide-react";
import { Pill, PriceTag, ResultCard } from "@/components/cards/ResultCard";
import { Button } from "@/components/ui/Button";
import { bookingHref, daysBetween, formatShortDate, type CarQuery } from "@/lib/search";
import type { Car } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type CarResultCardProps = { car: Car; query: CarQuery };

export function CarResultCard({ car, query }: CarResultCardProps) {
  const days = query.pickup && query.dropoff ? Math.max(1, daysBetween(query.pickup, query.dropoff)) : 0;
  const location = query.location || car.locations[0];
  const ref = `${car.name} (${car.category}) · pick-up ${location}${
    days ? ` · ${formatShortDate(query.pickup)} – ${formatShortDate(query.dropoff)} (${days} days)` : ""
  }`;

  const specs = [
    { icon: Users, label: `${car.seats} seats` },
    { icon: Briefcase, label: `${car.bags} bags` },
    { icon: DoorOpen, label: `${car.doors} doors` },
    { icon: Settings2, label: car.transmission },
    { icon: car.fuel === "Electric" ? Zap : Fuel, label: car.fuel },
  ];

  return (
    <ResultCard
      media={
        <>
          <Image
            src={car.image}
            alt={car.name}
            fill
            sizes="(min-width: 768px) 288px, 100vw"
            className="object-cover transition-transform duration-1000 ease-premium group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-800 backdrop-blur">
            {car.category}
          </span>
        </>
      }
      aside={
        <>
          <PriceTag
            label="per day"
            amount={formatPrice(car.pricePerDay)}
            note={days ? `${formatPrice(car.pricePerDay * days)} for ${days} day${days > 1 ? "s" : ""}` : "Insurance included"}
          />
          <Button href={bookingHref("cars", ref)} className="md:w-full">
            Reserve
            <span className="sr-only"> {car.name}</span>
          </Button>
        </>
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">
            {car.name}
            <span className="ml-2 align-middle text-sm font-normal text-ink-400">or similar</span>
          </h3>
          <p className="mt-1 text-sm text-ink-500">
            by <span className="font-semibold text-ink-700">{car.supplier}</span>
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gold-50 px-2.5 py-1 text-sm font-semibold text-gold-700">
          <Star className="size-3.5 fill-current" aria-hidden="true" />
          {car.rating.toFixed(1)}
          <span className="sr-only"> out of 5</span>
        </span>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Specifications">
        {specs.map(({ icon: Icon, label }) => (
          <li key={label} className="inline-flex items-center gap-2 text-sm text-ink-600">
            <Icon className="size-4 text-brand-600" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {car.unlimitedMileage && (
          <Pill tone="brand">
            <Gauge className="size-3.5" aria-hidden="true" />
            Unlimited mileage
          </Pill>
        )}
        {car.freeCancellation && (
          <Pill tone="success">
            <BadgeCheck className="size-3.5" aria-hidden="true" />
            Free cancellation
          </Pill>
        )}
        <Pill>Pick-up: {query.location || car.locations.slice(0, 3).join(", ")}</Pill>
      </div>
    </ResultCard>
  );
}
