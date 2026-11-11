import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for has wandered off the map.",
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink-950 py-32 text-white"
    >
      <Image
        src="/images/destinations/swiss-alps.jpg"
        alt=""
        fill
        preload
        loading="eager"
        sizes="100vw"
        className="-z-20 object-cover opacity-40"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-ink-950/80 via-ink-950/70 to-ink-950" />

      <div className="container-page text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/10 text-gold-300 ring-1 ring-white/20 backdrop-blur">
          <Compass className="size-8" aria-hidden="true" />
        </span>
        <p className="mt-8 font-display text-7xl font-semibold text-gold-300 sm:text-8xl">404</p>
        <h1 id="not-found-heading" className="mt-4 font-display text-3xl font-semibold sm:text-5xl">
          You&apos;ve wandered off the map
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-ink-200 sm:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get your journey back on course.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Button href="/" variant="gold" size="lg">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Button>
          <Button href="/contact" variant="light" size="lg">
            Talk to an expert
          </Button>
        </div>

        <nav aria-label="Popular pages" className="mt-14">
          <p className="text-xs font-bold tracking-[0.22em] text-ink-300 uppercase">Or explore</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-3">
            {services.map(({ id, title, href, icon: Icon }) => (
              <li key={id}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold backdrop-blur transition-colors hover:border-gold-300 hover:bg-gold-300 hover:text-ink-950"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
