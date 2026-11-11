import { Suspense } from "react";
import { CarsExplorer } from "@/components/explorers/CarsExplorer";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ExplorerFallback } from "@/components/results/Results";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Car Rental",
  description:
    "Rent economy, SUV, electric, sports and luxury cars at 300+ pickup points, with transparent pricing and unlimited mileage options.",
  path: "/cars",
});

export default function CarsPage() {
  return (
    <Reveal>
      <PageHero
        overlap
        eyebrow="Car rental"
        title={<>The open road, <em className="text-gold-300">your way</em></>}
        description="Economy runabouts, family SUVs, electric and luxury cars — transparent pricing, insurance included and no surprises at the counter."
        image="/images/cars/car-2.jpg"
        crumb="Cars"
        path="/cars"
        highlights={["No hidden fees","Insurance included","Airport pickup"]}
      />
      {/* The explorer reads search params, so it renders inside Suspense. */}
      <Suspense fallback={<ExplorerFallback />}>
        <CarsExplorer />
      </Suspense>
      <CtaBanner />
    </Reveal>
  );
}
