"use client";

import { useRef } from "react";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

type CountUpProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Animated number that counts up from 0 the first time it scrolls into view.
 * The final value is server-rendered, so it is correct without JS and for
 * users who prefer reduced motion.
 */
export function CountUp({ value, decimals = 0, suffix = "", duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION.ok, () => {
        const counter = { n: 0 };
        el.textContent = format(0, decimals) + suffix;
        const tween = gsap.to(counter, {
          n: value,
          duration,
          ease: "power2.out",
          paused: true,
          onUpdate: () => {
            el.textContent = format(counter.n, decimals) + suffix;
          },
        });
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => tween.play(),
        });
        return () => {
          trigger.kill();
          tween.kill();
          el.textContent = format(value, decimals) + suffix;
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [value, decimals, suffix, duration] },
  );

  return (
    <span ref={ref} className={className}>
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
