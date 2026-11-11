import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactFormFromParams } from "@/components/forms/ContactFormFromParams";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Talk to a Wanderlux travel expert about visas, flights, hotels or car rentals. Call, WhatsApp or send a message — we reply within 24 hours.",
  path: "/contact",
});

const faqs = [
  {
    q: "How quickly will you reply?",
    a: "Within 24 hours — usually within two hours during office hours (Mon – Sat, 9:00 – 19:00 PKT).",
  },
  {
    q: "Do you charge for trip planning?",
    a: "No. Planning, advice and quotes are completely free. You only pay once you approve a booking.",
  },
  {
    q: "My visa was refused before — can you still help?",
    a: "Yes. Our visa team reviews previous refusals and rebuilds your application to address the reasons given.",
  },
  {
    q: "Is my booking confirmed instantly?",
    a: "We confirm live availability with the airline, hotel or rental partner first, then send a secure payment link. Nothing is charged until you approve.",
  },
];

export default function ContactPage() {
  return (
    <Reveal>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Let&apos;s plan your <em className="text-gold-300">next journey</em>
          </>
        }
        description="Tell us where you'd like to go and a dedicated travel expert will reply with ideas, prices and next steps — usually within a couple of hours."
        image="/images/misc/planning.jpg"
        crumb="Contact"
        highlights={["Free trip planning", "Reply within 24 hours", "Real human experts"]}
      />

      <section aria-label="Contact options" className="section-y">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <h2 data-reveal className="font-display text-3xl font-semibold text-ink-900">
              Reach us your way
            </h2>
            <p data-reveal className="mt-3 text-ink-500">
              Prefer to talk? Call or WhatsApp us — or send the form and we&apos;ll get back to you.
            </p>
            <div data-reveal className="mt-8">
              <ContactDetails />
            </div>

            <div data-reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink-900">Quick answers</h2>
              <div className="mt-5 divide-y divide-ink-100 rounded-3xl bg-white px-6 shadow-soft ring-1 ring-ink-100">
                {faqs.map(({ q, a }) => (
                  <details key={q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                      {q}
                      <ChevronDown
                        className="size-5 shrink-0 text-ink-400 transition-transform duration-300 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <div data-reveal className="min-w-0 lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
            <h2 className="sr-only">Send us a message</h2>
            {/* Reads ?service & ?ref from "Book now" links, so it renders inside Suspense. */}
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromParams />
            </Suspense>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
