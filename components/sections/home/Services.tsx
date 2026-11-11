import { Headphones, Phone } from "lucide-react";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative section-y overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-brand-100/50 blur-3xl"
      />

      <div className="container-page relative">
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title={
            <>
              Everything your trip needs,{" "}
              <span className="text-brand-600 italic">under one roof</span>
            </>
          }
          description="Four specialist teams working together, so your visa, flights, stay and wheels are planned as one seamless journey."
        />

        <ul data-reveal-group className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((service, index) => (
            <li key={service.id} data-reveal-item>
              <ServiceCard service={service} index={index} />
            </li>
          ))}
        </ul>

        <div
          data-reveal
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl bg-ink-900 px-6 py-6 text-center sm:flex-row sm:px-8 sm:text-left"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-400 text-ink-950">
              <Headphones className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-xl text-white">
                Not sure where to start?
              </p>
              <p className="mt-1 text-sm text-ink-200">
                Tell us your dream trip — an expert will plan it end to end,
                free of charge.
              </p>
            </div>
          </div>
          <Button href={siteConfig.contact.phoneHref} variant="gold" className="w-full sm:w-auto">
            <Phone className="size-4" aria-hidden="true" />
            {siteConfig.contact.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
