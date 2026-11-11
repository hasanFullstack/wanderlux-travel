import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import type { Destination } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

type DestinationCardProps = {
  destination: Destination;
  /** Larger typography for the featured tile in the bento grid. */
  featured?: boolean;
  sizes?: string;
  className?: string;
};

/** Full-bleed photo card linking to hotel results for the destination. */
export function DestinationCard({
  destination,
  featured = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  className,
}: DestinationCardProps) {
  const { name, country, image, tag, rating, nights, priceFrom, description } = destination;
  const href = `/hotels?destination=${encodeURIComponent(country)}#results`;

  return (
    <article
      data-card
      className={cn(
        "group relative isolate flex h-full min-h-72 flex-col justify-end overflow-hidden rounded-3xl bg-ink-900 text-white shadow-soft",
        "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-gold-300 has-[a:focus-visible]:ring-offset-2",
        className,
      )}
    >
      <Image
        src={image}
        alt={`${name}, ${country}`}
        fill
        sizes={sizes}
        className="-z-10 object-cover transition-transform duration-1000 ease-premium group-hover:scale-110"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950/90 via-ink-950/25 to-ink-950/10"
      />

      <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
        {tag ? (
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            {tag}
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-1 rounded-full bg-ink-950/50 px-2.5 py-1 text-xs font-semibold backdrop-blur-md">
          <Star className="size-3.5 fill-gold-300 text-gold-300" aria-hidden="true" />
          <span className="sr-only">Rated</span>
          {rating.toFixed(1)}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] text-gold-200 uppercase">
          <MapPin className="size-3.5" aria-hidden="true" />
          {country}
        </p>
        <h3
          className={cn(
            "mt-2 font-display font-semibold",
            featured ? "text-4xl sm:text-5xl" : "text-2xl",
          )}
        >
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {name}
            <span className="sr-only"> — browse stays</span>
          </Link>
        </h3>
        {featured && (
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-100">{description}</p>
        )}
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/15 pt-4">
          <p className="text-xs text-ink-200">
            {nights} nights from
            <span className="block text-base font-bold text-white">{formatPrice(priceFrom)}</span>
          </p>
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-ink-950"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
