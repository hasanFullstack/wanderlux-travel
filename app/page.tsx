import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { SearchTabs } from "@/components/search/SearchTabs";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { Destinations } from "@/components/sections/home/Destinations";
import { Hero } from "@/components/sections/home/Hero";
import { Services } from "@/components/sections/home/Services";
import { Stats } from "@/components/sections/home/Stats";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero search={<SearchTabs />} />
      <Reveal>
        <Services />
        <Destinations />
        <Stats />
        <WhyChooseUs />
        <Testimonials />
        <CtaBanner />
        <ContactSection />
      </Reveal>
    </>
  );
}
