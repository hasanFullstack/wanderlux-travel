"use client";

import { useRef, type ReactNode } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Scroll-reveal scope. Inside it:
 *  - `[data-reveal]` elements fade/slide up when they enter the viewport;
 *  - `[data-reveal-group]` containers stagger their `[data-reveal-item]` children.
 * Animations are scoped to this subtree, reverted on unmount (useGSAP), and
 * skipped entirely when the user prefers reduced motion.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION.ok, () => {
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
          if (!items.length) return;
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: { trigger: group, start: "top 85%", once: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
