import { ContactForm } from "@/components/forms/ContactForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-y scroll-mt-20 bg-sand-100"
    >
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading
            id="contact-heading"
            align="left"
            eyebrow="Get in touch"
            title={
              <>
                Let&apos;s plan something <span className="text-brand-600 italic">unforgettable</span>
              </>
            }
            description="Share a few details and a dedicated travel expert will reply within 24 hours with ideas, prices and next steps."
          />
          <div data-reveal className="mt-10">
            <ContactDetails />
          </div>
        </div>
        <div data-reveal className="min-w-0 lg:sticky lg:top-28 lg:col-span-7 lg:self-start">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
