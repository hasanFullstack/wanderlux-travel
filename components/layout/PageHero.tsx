import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  /** Current page label for the breadcrumb trail. */
  crumb: string;
  highlights?: string[];
  /** Extra bottom padding when a search panel overlaps the hero. */
  overlap?: boolean;
};

/** Dark photographic header used by every inner page. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumb,
  highlights = [],
  overlap = false,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-heading"
      className={`relative isolate overflow-hidden bg-ink-950 pt-32 text-white sm:pt-36 ${
        overlap ? "pb-36 sm:pb-40" : "pb-20 sm:pb-24"
      }`}
    >
      <Image
        src={image}
        alt=""
        fill
        preload
        loading="eager"
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/95 via-ink-950/75 to-ink-950/35"
      />

      <div className="container-page">
        <nav aria-label="Breadcrumb" data-reveal data-hero-hide>
          <ol className="flex items-center gap-1.5 text-sm text-ink-200">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4 text-ink-400" />
            </li>
            <li aria-current="page" className="font-semibold text-gold-300">
              {crumb}
            </li>
          </ol>
        </nav>

        <div className="mt-8 max-w-3xl">
          <p
            data-reveal
            data-hero-hide
            className="text-xs font-bold tracking-[0.22em] text-gold-300 uppercase"
          >
            {eyebrow}
          </p>
          <h1
            id="page-heading"
            data-reveal
            data-hero-hide
            className="mt-4 font-display text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          <p
            data-reveal
            data-hero-hide
            className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-ink-100 sm:text-lg"
          >
            {description}
          </p>
          {highlights.length > 0 && (
            <ul data-reveal data-hero-hide className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-2 text-sm font-medium text-ink-100">
                  <span className="grid size-5 place-items-center rounded-full bg-gold-400 text-ink-950">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
