import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="bg-ink-950 pt-40 pb-24">
        <div className="container-page">
          <SectionHeading
            as="h1"
            tone="light"
            eyebrow={siteConfig.tagline}
            title={siteConfig.name}
            description={siteConfig.description}
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/flights" variant="gold" size="lg">
              Search flights
            </Button>
            <Button href="/contact" variant="light" size="lg">
              Talk to an expert
            </Button>
          </div>
        </div>
      </section>
      <section className="container-page section-y">
        <SectionHeading
          eyebrow="Coming next"
          title="Sections are on their way"
          description="The hero, search widget and service sections will be built in the next steps."
        />
      </section>
    </>
  );
}
