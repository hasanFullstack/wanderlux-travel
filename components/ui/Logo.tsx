import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
  onClick?: () => void;
};

/** Brand mark + wordmark linking to the home page. */
export function Logo({ tone = "dark", className, onClick }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-gold-300 via-gold-400 to-brand-500 shadow-[0_8px_20px_-8px] shadow-gold-500/80 transition-transform duration-500 ease-premium group-hover:rotate-12"
      >
        <svg viewBox="0 0 24 24" className="size-5 text-ink-950" fill="none">
          <path
            d="M12 2.5 14.6 9.4 21.5 12l-6.9 2.6L12 21.5l-2.6-6.9L2.5 12l6.9-2.6L12 2.5Z"
            fill="currentColor"
          />
          <circle cx="12" cy="12" r="1.6" fill="white" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-semibold tracking-tight transition-colors duration-300",
            isLight ? "text-white" : "text-ink-900",
          )}
        >
          {siteConfig.shortName}
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-bold tracking-[0.35em] uppercase transition-colors duration-300",
            isLight ? "text-gold-300" : "text-brand-600",
          )}
        >
          Travel
        </span>
      </span>
    </Link>
  );
}
