import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

/** Eyebrow + display heading + supporting copy, used to open every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          data-reveal
          className={cn(
            "inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase",
            isLight ? "text-gold-300" : "text-brand-700",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              isLight ? "bg-gold-300/70" : "bg-brand-500/60",
            )}
          />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        data-reveal
        className={cn(
          "mt-4 font-display text-3xl leading-[1.15] font-semibold sm:text-4xl lg:text-5xl",
          isLight ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          data-reveal
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            isLight ? "text-ink-200" : "text-ink-500",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
