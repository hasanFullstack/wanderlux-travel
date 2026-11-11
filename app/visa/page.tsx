import { Suspense } from "react";
import { VisaExplorer } from "@/components/explorers/VisaExplorer";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ExplorerFallback } from "@/components/results/Results";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Visa Services",
  description:
    "Check visa requirements, processing times and fees for 12+ destinations, and let our specialists prepare and track your application.",
  path: "/visa",
});

export default function VisaPage() {
  return (
    <Reveal>
      <PageHero
        overlap
        eyebrow="Visa services"
        title={<>Visas, <em className="text-gold-300">sorted</em></>}
        description="Check requirements, processing times and fees for popular destinations. Our specialists review your documents, book appointments and track every step."
        image="/images/visa/canada.jpg"
        crumb="Visa"
        path="/visa"
        highlights={["98% approval rate","Document review","Live status tracking"]}
      />
      {/* The explorer reads search params, so it renders inside Suspense. */}
      <Suspense fallback={<ExplorerFallback />}>
        <VisaExplorer />
      </Suspense>
      <CtaBanner />
    </Reveal>
  );
}
