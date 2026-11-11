import { Hero } from "@/components/sections/home/Hero";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="container-page section-y">
        <SectionHeading
          eyebrow="Coming next"
          title="Sections are on their way"
          description="The search widget and home sections will be built in the next steps."
        />
      </section>
    </>
  );
}
