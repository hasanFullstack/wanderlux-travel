import { cn } from "@/lib/utils";

type LogoMarkProps = {
  /** Unique suffix so gradient ids don't collide when several marks render. */
  idSuffix?: string;
  className?: string;
};

/**
 * Brand emblem: a navy tile framed in gold, holding a globe, an orbiting
 * flight path with a plane, and a gold compass star at its centre.
 */
export function LogoMark({ idSuffix = "mark", className }: LogoMarkProps) {
  const bg = `wl-bg-${idSuffix}`;
  const gold = `wl-gold-${idSuffix}`;
  const teal = `wl-teal-${idSuffix}`;
  const shine = `wl-shine-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("size-11", className)}
    >
      <defs>
        <linearGradient id={bg} x1="6" y1="2" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1f4766" />
          <stop offset="0.55" stopColor="#0f1e2f" />
          <stop offset="1" stopColor="#08131f" />
        </linearGradient>
        <linearGradient id={gold} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fbefcf" />
          <stop offset="0.45" stopColor="#ecbf56" />
          <stop offset="1" stopColor="#c27417" />
        </linearGradient>
        <linearGradient id={teal} x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#aee8e5" />
          <stop offset="1" stopColor="#239d9e" />
        </linearGradient>
        <radialGradient id={shine} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14 9) rotate(50) scale(30)">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Tile */}
      <rect x="1" y="1" width="46" height="46" rx="14" fill={`url(#${bg})`} />
      <rect x="1" y="1" width="46" height="46" rx="14" fill={`url(#${shine})`} />
      <rect x="1.6" y="1.6" width="44.8" height="44.8" rx="13.4" stroke={`url(#${gold})`} strokeOpacity="0.7" strokeWidth="1.2" />

      {/* Globe */}
      <circle cx="24" cy="24" r="12.5" stroke={`url(#${teal})`} strokeWidth="1.4" />
      <ellipse cx="24" cy="24" rx="5.6" ry="12.5" stroke={`url(#${teal})`} strokeOpacity="0.65" strokeWidth="1.1" />
      <path d="M11.5 24h25M13.6 17.5h20.8M13.6 30.5h20.8" stroke={`url(#${teal})`} strokeOpacity="0.45" strokeWidth="1" />

      {/* Flight path + plane */}
      <path
        d="M6.5 33.5C11 25.5 25 15.5 36.2 14.6"
        stroke={`url(#${gold})`}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeDasharray="0.1 3.4"
      />
      <path d="M42.5 13.2 34.4 13l2.9 2.3-1 3.4 6.2-5.5Z" fill={`url(#${gold})`} />

      {/* Compass star */}
      <path
        d="M24 15.8 26.1 21.9 32.2 24 26.1 26.1 24 32.2 21.9 26.1 15.8 24 21.9 21.9 24 15.8Z"
        fill={`url(#${gold})`}
        stroke="#08131f"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="1.7" fill="#08131f" />
      <circle cx="24" cy="24" r="0.8" fill="#fbefcf" />
    </svg>
  );
}
