import { Suspense } from "react";
import { FlightsExplorer } from "@/components/explorers/FlightsExplorer";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ExplorerFallback } from "@/components/results/Results";
import { CtaBanner } from "@/components/sections/home/CtaBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Flight Tickets",
  description:
    "Compare fares from 400+ airlines and book flights in Economy, Premium Economy, Business or First — with flexible tickets and 24/7 rebooking support.",
  path: "/flights",
});

export default function FlightsPage() {
  return (
    <Reveal>
      <PageHero
        overlap
        eyebrow="Flight tickets"
        title={<>Fly further, <em className="text-gold-300">for less</em></>}
        description="Search routes from Lahore, Karachi, Islamabad and major hubs worldwide. Filter by cabin, stops and refundable fares — then let our team lock in the best price."
        image="/images/services/flights.jpg"
        crumb="Flights"
        highlights={["Best-fare guarantee","Flexible tickets","24/7 rebooking"]}
      />
      {/* The explorer reads search params, so it renders inside Suspense. */}
      <Suspense fallback={<ExplorerFallback media={false} />}>
        <FlightsExplorer />
      </Suspense>
      <CtaBanner />
    </Reveal>
  );
}
