import { ArrowRight } from "lucide-react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { destinations } from "@/data/destinations";
import { cn } from "@/lib/utils";

/** Bento layout: a large featured tile, one wide tile, the rest standard. */
const layout = (index: number) =>
  cn(
    index === 0 && "sm:col-span-2 lg:row-span-2",
    index === 5 && "sm:col-span-2",
  );

export function Destinations() {
  return (
    <section
      id="destinations"
      aria-labelledby="destinations-heading"
      className="section-y scroll-mt-20 bg-white"
    >
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="destinations-heading"
            align="left"
            eyebrow="Popular destinations"
            title={
              <>
                Where will you wake up <span className="text-brand-600 italic">next?</span>
              </>
            }
            description="Hand-picked escapes our travelers love most — each one available as a fully planned package."
          />
          <Button href="/hotels" variant="outline" className="shrink-0" data-reveal>
            Browse all stays
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <ul
          data-reveal-group
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:auto-rows-[17rem] lg:grid-cols-4"
        >
          {destinations.map((destination, index) => (
            <li key={destination.id} data-reveal-item className={layout(index)}>
              <DestinationCard
                destination={destination}
                featured={index === 0}
                sizes={
                  index === 0 || index === 5
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
