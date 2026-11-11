"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Plane, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { destinations } from "@/data/destinations";
import { flights } from "@/data/flights";
import { testimonials } from "@/data/testimonials";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";
import { HERO_IMAGE_QUALITY } from "@/lib/site";
import { cn, formatPrice } from "@/lib/utils";

const featured = destinations[0];
const dealFlight =
  flights.find((f) => f.from.code === "LHE" && f.to.code === "DXB" && f.cabin === "Economy") ??
  flights[0];
const glassCard =
  "rounded-3xl border border-white/15 bg-white/10 p-3 shadow-lift backdrop-blur-xl";

type HeroProps = {
  /** Search widget rendered at the bottom of the hero. */
  search?: ReactNode;
};

const headingLines: ReactNode[] = [
  "Explore the world,",
  <em key="accent" className="font-medium text-gold-300 italic">
    beautifully
  </em>,
  "handled for you.",
];

export function Hero({ search }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION.ok, () => {
        const show = { autoAlpha: 1, y: 0, scale: 1 };
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          "[data-hero-bg]",
          { scale: 1.18 },
          { scale: 1, duration: 2.6, ease: "power2.out" },
          0,
        )
          .fromTo(
            "[data-hero-eyebrow]",
            { autoAlpha: 0, y: 20 },
            { ...show, duration: 0.8 },
            0.3,
          )
          .fromTo(
            "[data-hero-line]",
            { autoAlpha: 0, yPercent: 110 },
            { autoAlpha: 1, yPercent: 0, duration: 1.1, stagger: 0.12, ease: "power4.out" },
            0.4,
          )
          .fromTo(
            "[data-hero-copy]",
            { autoAlpha: 0, y: 24 },
            { ...show, duration: 0.9 },
            0.9,
          )
          .fromTo(
            "[data-hero-cta]",
            { autoAlpha: 0, y: 20 },
            { ...show, duration: 0.7, stagger: 0.1 },
            1.05,
          )
          .fromTo(
            "[data-hero-trust]",
            { autoAlpha: 0, y: 16 },
            { ...show, duration: 0.7 },
            1.25,
          )
          .fromTo(
            "[data-hero-card]",
            { autoAlpha: 0, y: 40, scale: 0.94 },
            { ...show, duration: 1, stagger: 0.15 },
            1,
          )
          .fromTo(
            "[data-hero-search]",
            { autoAlpha: 0, y: 40 },
            { ...show, duration: 1 },
            1.3,
          );

        // Gentle idle float on the card column (moves as one to keep alignment).
        gsap.to("[data-hero-float]", {
          y: -10,
          duration: 3.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Background drifts slower than the page while scrolling away.
        gsap.to("[data-hero-parallax]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const avatars = testimonials.slice(0, 4);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-heading"
      className="relative isolate z-10 flex min-h-svh flex-col bg-ink-950 text-white"
    >
      {/* Background — clipped here (not on the section) so dropdowns can overflow */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-parallax className="absolute inset-0">
          <div data-hero-bg className="absolute inset-0 motion-safe:[transform:scale(1.18)]">
            <Image
              src="/images/hero/hero-mountains.jpg"
              alt=""
              fill
              preload
              loading="eager"
              quality={HERO_IMAGE_QUALITY}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/90 via-ink-950/55 to-ink-950/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-ink-950 via-ink-950/50 to-transparent"
      />

      <div className="container-page flex flex-1 flex-col pt-32 pb-10 sm:pt-36 lg:pt-40">
        <div className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p
              data-hero-eyebrow
              data-hero-hide
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-gold-100 backdrop-blur-md"
            >
              <Sparkles className="size-3.5 text-gold-300" aria-hidden="true" />
              Award-winning travel agency since 2011
            </p>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-[2.75rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            >
              {headingLines.map((line, index) => (
                <span key={index} className="block overflow-hidden pb-[0.08em]">
                  <span data-hero-line data-hero-hide className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-hero-copy
              data-hero-hide
              className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink-100 sm:text-lg"
            >
              Visas, flights, hotels and car rentals — planned by travel experts
              and booked in minutes. One team, every detail, anywhere you want
              to go.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <div data-hero-cta data-hero-hide>
                <Button href="#destinations" variant="gold" size="lg" className="w-full sm:w-auto">
                  Explore destinations
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </div>
              <div data-hero-cta data-hero-hide>
                <Button href="/contact" variant="light" size="lg" className="w-full sm:w-auto">
                  Talk to an expert
                </Button>
              </div>
            </div>

            <div
              data-hero-trust
              data-hero-hide
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex shrink-0 -space-x-3">
                {avatars.map((person) => (
                  <Image
                    key={person.id}
                    src={person.avatar}
                    alt=""
                    width={44}
                    height={44}
                    className="size-10 rounded-full border-2 border-ink-950 object-cover sm:size-11"
                  />
                ))}
              </div>
              <div className="min-w-0 text-sm">
                <div className="flex items-center gap-1 text-gold-300" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-ink-200">
                  <span className="font-semibold text-white">4.9/5</span> from
                  48,000+ happy travelers
                </p>
              </div>
            </div>
          </div>

          {/* Highlight cards — one aligned column, equal widths */}
          <div className="hidden lg:col-span-5 lg:flex lg:justify-end" aria-hidden="true">
            <div data-hero-float className="flex w-80 flex-col gap-4 xl:w-[21rem]">
              <div data-hero-card data-hero-hide className={glassCard}>
                <div className="relative h-40 overflow-hidden rounded-2xl">
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    sizes="336px"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-ink-950/70 px-3 py-1 text-[0.7rem] font-semibold tracking-wide backdrop-blur">
                    Featured escape
                  </span>
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-ink-950/70 px-2.5 py-1 text-[0.7rem] font-semibold backdrop-blur">
                    <Star className="size-3 fill-gold-300 text-gold-300" />
                    {featured.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-3 px-1.5 pt-3 pb-1">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg">
                      {featured.name}, {featured.country}
                    </p>
                    <p className="text-xs text-ink-200">
                      {featured.nights} nights · Flights + hotel
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-[0.7rem] text-ink-200">
                    from
                    <span className="block text-base font-bold text-gold-300">
                      {formatPrice(featured.priceFrom)}
                    </span>
                  </p>
                </div>
              </div>

              <div data-hero-card data-hero-hide className={cn(glassCard, "flex items-center gap-3 pr-4")}>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500">
                  <BadgeCheck className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Visa approved</p>
                  <p className="text-xs text-ink-200">Canada · in 11 days</p>
                </div>
                <span className="rounded-full bg-brand-400/20 px-2.5 py-1 text-[0.7rem] font-semibold text-brand-200">
                  98% rate
                </span>
              </div>

              <div data-hero-card data-hero-hide className={cn(glassCard, "flex items-center gap-3 pr-4")}>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-400 text-ink-950">
                  <Plane className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    {dealFlight.from.city} → {dealFlight.to.city}
                  </p>
                  <p className="text-xs text-ink-200">
                    Daily {dealFlight.departTime} · Non-stop
                  </p>
                </div>
                <p className="shrink-0 text-right text-[0.7rem] text-ink-200">
                  from
                  <span className="block text-sm font-bold text-gold-300">
                    {formatPrice(dealFlight.price)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {search && (
          <div data-hero-search data-hero-hide className="mt-12 lg:mt-6">
            {search}
          </div>
        )}
      </div>
    </section>
  );
}
