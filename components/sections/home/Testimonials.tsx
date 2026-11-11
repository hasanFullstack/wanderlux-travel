import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { TestimonialsSlider } from "./TestimonialsSlider";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-y scroll-mt-20 overflow-hidden bg-sand-100"
    >
      <div className="container-page">
        <SectionHeading
          id="testimonials-heading"
          align="left"
          eyebrow="Traveler stories"
          title={
            <>
              Loved by <span className="text-brand-600 italic">48,000+</span> travelers
            </>
          }
          description="Honeymoons, family holidays, business trips and first-time visas — here's what our travelers say."
        />
        <div data-reveal className="mt-12">
          <TestimonialsSlider items={testimonials} />
        </div>
      </div>
    </section>
  );
}
