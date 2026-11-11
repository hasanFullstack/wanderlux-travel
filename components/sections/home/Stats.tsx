import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section
      aria-label="Wanderlux in numbers"
      className="relative isolate overflow-hidden bg-ink-950 py-16 sm:py-20"
    >
      <Image
        src="/images/misc/roadtrip.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950 via-ink-950/80 to-brand-950/80"
      />

      <div className="container-page">
        <dl data-reveal-group className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal-item
              className="flex flex-col-reverse items-center text-center lg:border-l lg:border-white/10 lg:first:border-l-0"
            >
              <dt className="mt-3 text-sm font-medium tracking-wide text-ink-200 sm:text-base">
                {stat.label}
              </dt>
              <dd className="font-display text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
                <CountUp
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  className="tabular-nums"
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
