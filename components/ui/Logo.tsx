import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "light" | "dark";
  /** Unique per placement (e.g. "nav", "footer") to keep SVG ids distinct. */
  idSuffix?: string;
  className?: string;
  onClick?: () => void;
};

/** Brand emblem + wordmark linking to the home page. */
export function Logo({
  tone = "dark",
  idSuffix = "logo",
  className,
  onClick,
}: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <LogoMark
        idSuffix={idSuffix}
        className="drop-shadow-[0_8px_18px_rgb(8_19_31/0.35)] transition-transform duration-700 ease-premium group-hover:-rotate-6 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.4rem] font-semibold tracking-tight transition-colors duration-300",
            isLight ? "text-white" : "text-ink-900",
          )}
        >
          Wanderlux
        </span>
        <span
          className={cn(
            "mt-1 flex items-center gap-1.5 text-[0.58rem] font-bold tracking-[0.42em] uppercase transition-colors duration-300",
            isLight ? "text-gold-300" : "text-gold-600",
          )}
        >
          <span aria-hidden="true" className="h-px w-3 bg-current opacity-70" />
          Travel
        </span>
      </span>
    </Link>
  );
}
