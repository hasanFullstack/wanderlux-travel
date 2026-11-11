import { Hero } from "@/components/sections/home/Hero";
import { SearchTabs } from "@/components/search/SearchTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Hero search={<SearchTabs />} />
      <section className="container-page section-y">
        <SectionHeading
          eyebrow="Coming next"
          title="Sections are on their way"
          description="Services, destinations, stats and more will be built in the next steps."
        />
      </section>
    </>
  );
}
