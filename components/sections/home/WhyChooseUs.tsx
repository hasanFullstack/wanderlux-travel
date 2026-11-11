import Image from "next/image";
import { ArrowRight, BadgeDollarSign, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Licensed & secure",
    text: "A registered agency with encrypted payments and transparent, all-in pricing.",
  },
  {
    icon: Headphones,
    title: "24/7 human support",
    text: "Real travel experts on call around the clock — before, during and after your trip.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best price promise",
    text: "Found the same trip cheaper? We'll match it and add a little extra for your trouble.",
  },
  {
    icon: Sparkles,
    title: "Tailor-made trips",
    text: "Every itinerary is built around you — your pace, your budget, your style.",
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="section-y overflow-hidden">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image collage */}
        <div data-reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] shadow-lift sm:w-[85%]">
            <Image
              src="/images/misc/traveler.jpg"
              alt="Traveler with a backpack looking out over a mountain lake"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-0 -bottom-8 hidden aspect-square w-[48%] overflow-hidden rounded-[1.75rem] border-8 border-sand-50 shadow-lift sm:block">
            <Image
              src="/images/misc/planning.jpg"
              alt="Map, camera and notebook laid out for trip planning"
              fill
              sizes="(min-width: 1024px) 20vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute top-8 -left-3 rounded-2xl bg-gold-400 px-5 py-4 text-ink-950 shadow-lift sm:-left-6">
            <p className="font-display text-4xl leading-none font-semibold">15+</p>
            <p className="mt-1 text-xs font-bold tracking-wide uppercase">
              Years crafting
              <br />
              journeys
            </p>
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            id="why-heading"
            align="left"
            eyebrow="Why travel with us"
            title={
              <>
                Travel planning, done <span className="text-brand-600 italic">properly</span>
              </>
            }
            description="We sweat the details so you don't have to. From the first idea to the flight home, one dedicated team looks after everything."
          />

          <ul data-reveal-group className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} data-reveal-item className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10">
            <Button href="/contact" variant="dark" size="lg">
              Plan with an expert
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
