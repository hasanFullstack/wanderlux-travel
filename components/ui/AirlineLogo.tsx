import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Emblems for the (fictional) airlines in the mock data. 24×24 glyphs. */
const airlines: Record<string, { tile: string; glyph: ReactNode }> = {
  // Aurora Airways — layered aurora arcs
  AU: {
    tile: "from-brand-400 to-brand-700 text-white",
    glyph: (
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9">
        <path d="M2.5 15.5C5 9 8.3 5.8 12 5.8s7 3.2 9.5 9.7" opacity=".55" />
        <path d="M5.5 17.5c1.9-4.6 4-6.9 6.5-6.9s4.6 2.3 6.5 6.9" />
        <path d="M9 19.2c.9-1.9 1.9-2.8 3-2.8s2.1.9 3 2.8" />
      </g>
    ),
  },
  // Skyward Air — rising chevrons
  SW: {
    tile: "from-ink-600 to-ink-950 text-white",
    glyph: (
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2">
        <path d="m5 13 7-7 7 7" />
        <path d="m5 19 7-7 7 7" opacity=".5" />
      </g>
    ),
  },
  // Nordic Blue — snowflake
  NB: {
    tile: "from-sky-500 to-sky-800 text-white",
    glyph: (
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
        <path d="m9.6 4.6 2.4 2.2 2.4-2.2M9.6 19.4l2.4-2.2 2.4 2.2" />
      </g>
    ),
  },
  // Meridian Air — globe with meridians
  MR: {
    tile: "from-rose-500 to-rose-800 text-white",
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8.5" />
        <ellipse cx="12" cy="12" rx="3.6" ry="8.5" />
        <path d="M3.5 12h17" strokeLinecap="round" />
      </g>
    ),
  },
  // Falcon Gulf — bird in flight beneath a sun
  FG: {
    tile: "from-gold-200 to-gold-500 text-ink-950",
    glyph: (
      <g fill="currentColor">
        <circle cx="19" cy="4.8" r="2" opacity=".5" />
        <path d="M1.5 7.5c3 0 5.6 1.3 7.7 3.6l1.4 1.6c.3-1.3.8-2.1 1.4-2.1s1.1.8 1.4 2.1l1.4-1.6c2.1-2.3 4.7-3.6 7.7-3.6-2.2 1.7-3.9 3.8-5.2 6.2-1 1.9-2.6 3.1-4.4 3.5l1.5 3.4h-4.8l1.5-3.4c-1.8-.4-3.4-1.6-4.4-3.5C5.4 11.3 3.7 9.2 1.5 7.5Z" />
      </g>
    ),
  },
  // Atlas Global — globe with orbit ring
  AG: {
    tile: "from-emerald-500 to-emerald-800 text-white",
    glyph: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="5.6" fill="currentColor" fillOpacity=".25" />
        <ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(-24 12 12)" strokeLinecap="round" />
        <circle cx="20.4" cy="8.4" r="1.2" fill="currentColor" stroke="none" />
      </g>
    ),
  },
  // Sakura Wings — cherry blossom
  SK: {
    tile: "from-pink-400 to-pink-700 text-white",
    glyph: (
      <g fill="currentColor">
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d="M12 11.4c-2.6-2.1-3.2-5.4-1.4-7.6l1.4 1.3 1.4-1.3c1.8 2.2 1.2 5.5-1.4 7.6Z"
            transform={`rotate(${angle} 12 12)`}
          />
        ))}
        <circle cx="12" cy="12" r="1.6" className="fill-pink-700" />
      </g>
    ),
  },
  // Pacific Crest — curling wave crest
  PC: {
    tile: "from-indigo-400 to-indigo-700 text-white",
    glyph: (
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9">
        <path d="M3 15.5c2.6 0 3.9-2.2 5.3-4.9C9.8 7.7 11.6 5.5 14.6 5.5c2.4 0 4 1.7 4 3.7 0 1.6-1.2 2.8-2.8 2.8-1.3 0-2.2-.9-2.2-2" />
        <path d="M3 19.5c1.5 0 2.3-1.3 3.8-1.3s2.3 1.3 3.8 1.3 2.3-1.3 3.8-1.3 2.3 1.3 3.8 1.3 2.3-1.3 3.8-1.3" opacity=".6" />
      </g>
    ),
  },
};

type AirlineLogoProps = {
  code: string;
  className?: string;
};

/** Gradient tile with the airline's emblem; falls back to the IATA-style code. */
export function AirlineLogo({ code, className }: AirlineLogoProps) {
  const airline = airlines[code];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br shadow-[0_8px_18px_-10px_rgb(15_30_47/0.6)] ring-1 ring-white/25 ring-inset",
        airline?.tile ?? "from-ink-600 to-ink-900 text-white",
        className,
      )}
    >
      {airline ? (
        <svg viewBox="0 0 24 24" className="size-6">
          {airline.glyph}
        </svg>
      ) : (
        <span className="text-xs font-bold">{code}</span>
      )}
    </span>
  );
}
