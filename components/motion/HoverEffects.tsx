"use client";

import { useEffect } from "react";
import { MOTION, gsap } from "@/lib/gsap";

const TARGETS = "[data-card], [data-button]";

/**
 * Site-wide GSAP hover micro-interactions via event delegation, so it also
 * covers elements rendered later (e.g. search results):
 *  - `[data-card]` lifts on hover;
 *  - `[data-button]` gently scales up.
 * Mouse pointers only, and disabled when the user prefers reduced motion.
 */
export function HoverEffects() {
  useEffect(() => {
    const reduce = window.matchMedia(MOTION.reduce);

    const targetOf = (event: PointerEvent) =>
      (event.target as Element | null)?.closest<HTMLElement>(TARGETS) ?? null;

    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduce.matches) return;
      const el = targetOf(event);
      if (!el || el.contains(event.relatedTarget as Node | null)) return;
      const isCard = el.hasAttribute("data-card");
      gsap.to(el, {
        y: isCard ? -8 : -2,
        scale: isCard ? 1 : 1.035,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onOut = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const el = targetOf(event);
      if (!el || el.contains(event.relatedTarget as Node | null)) return;
      gsap.to(el, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "transform",
      });
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return null;
}
