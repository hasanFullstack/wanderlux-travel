import { Suspense } from "react";
import { HotelsExplorer } from "@/components/explorers/HotelsExplorer";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ExplorerFallback } from "@/components/results/Results";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hotel Booking",
  description:
    "Hand-picked hotels, resorts, villas and boutique stays with member-only rates, free cancellation and verified reviews.",
  path: "/hotels",
});

export default function HotelsPage() {
  return (
    <Reveal>
      <PageHero
        overlap
        eyebrow="Hotel booking"
        title={<>Stays you&apos;ll <em className="text-gold-300">remember</em></>}
        description="From overwater villas in the Maldives to boutique gems in Paris and five-star comfort in Lahore — every property is vetted by our team."
        image="/images/hotels/hotel-2.jpg"
        crumb="Hotels"
        path="/hotels"
        highlights={["Member-only rates","Free cancellation","Verified reviews"]}
      />
      {/* The explorer reads search params, so it renders inside Suspense. */}
      <Suspense fallback={<ExplorerFallback />}>
        <HotelsExplorer />
      </Suspense>
      <CtaBanner />
    </Reveal>
  );
}
