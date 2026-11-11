import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-heading" className="section-y bg-white">
      <div className="container-page">
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-[2rem] px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24"
        >
          <Image
            src="/images/destinations/maldives.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/95 via-ink-950/75 to-brand-900/30"
          />

          <div className="max-w-2xl text-white">
            <p className="text-xs font-bold tracking-[0.22em] text-gold-300 uppercase">
              Limited-time offer
            </p>
            <h2
              id="cta-heading"
              className="mt-4 font-display text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl"
            >
              Your next great story starts with one conversation
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-100 sm:text-lg">
              Book a free 20-minute planning call this month and get complimentary
              airport transfers on any package over PKR 300,000.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/contact" variant="gold" size="lg">
                Plan my trip
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                size="lg"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Chat on WhatsApp
                <span className="sr-only">(opens in a new tab)</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
