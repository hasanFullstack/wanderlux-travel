"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { BedDouble, CarFront, Plane, Stamp, type LucideIcon } from "lucide-react";
import { CarSearchForm } from "@/components/search/CarSearchForm";
import { FlightSearchForm } from "@/components/search/FlightSearchForm";
import { HotelSearchForm } from "@/components/search/HotelSearchForm";
import { VisaSearchForm } from "@/components/search/VisaSearchForm";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";
import type { ServiceId } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = { id: ServiceId; label: string; icon: LucideIcon };

const tabs: Tab[] = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: BedDouble },
  { id: "cars", label: "Cars", icon: CarFront },
  { id: "visa", label: "Visa", icon: Stamp },
];

const panels: Record<ServiceId, () => React.JSX.Element> = {
  flights: () => <FlightSearchForm />,
  hotels: () => <HotelSearchForm />,
  cars: () => <CarSearchForm />,
  visa: () => <VisaSearchForm />,
};

type SearchTabsProps = {
  defaultTab?: ServiceId;
  className?: string;
};

/**
 * Tabbed search widget (WAI-ARIA tabs pattern): arrow keys / Home / End move
 * between tabs, each tab owns a panel that keeps its form state when hidden.
 */
export function SearchTabs({ defaultTab = "flights", className }: SearchTabsProps) {
  const [active, setActive] = useState<ServiceId>(defaultTab);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<ServiceId, HTMLButtonElement | null>>>({});

  const select = (id: ServiceId, focus = false) => {
    setActive(id);
    if (focus) tabRefs.current[id]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((t) => t.id === active);
    const last = tabs.length - 1;
    const keyMap: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (event.key in keyMap) {
      event.preventDefault();
      select(tabs[keyMap[event.key]].id, true);
    }
  };

  // Fade the newly selected panel in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION.ok, () => {
        gsap.fromTo(
          `[data-panel="${active}"]`,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
        );
      });
      return () => mm.revert();
    },
    { dependencies: [active], scope: rootRef, revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "rounded-[1.75rem] border border-white/60 bg-white/95 p-3 shadow-lift backdrop-blur-xl sm:p-4",
        className,
      )}
    >
      <div
        role="tablist"
        aria-label="Choose what to search"
        onKeyDown={onKeyDown}
        className="grid grid-cols-4 gap-1 rounded-2xl bg-ink-50 p-1 sm:inline-grid"
      >
        {tabs.map(({ id, label, icon: Icon }) => {
          const selected = id === active;
          return (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[id] = el;
              }}
              type="button"
              role="tab"
              id={`search-tab-${id}`}
              aria-selected={selected}
              aria-controls={`search-panel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2.5 text-xs font-semibold transition-[background-color,color,box-shadow] duration-300 sm:flex-row sm:gap-2 sm:px-5 sm:text-sm",
                selected
                  ? "bg-ink-900 text-white shadow-soft"
                  : "text-ink-500 hover:bg-white hover:text-ink-900",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 sm:mt-4">
        {tabs.map(({ id }) => {
          const Panel = panels[id];
          return (
            <div
              key={id}
              role="tabpanel"
              id={`search-panel-${id}`}
              aria-labelledby={`search-tab-${id}`}
              data-panel={id}
              hidden={id !== active}
            >
              <Panel />
            </div>
          );
        })}
      </div>
    </div>
  );
}
