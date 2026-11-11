"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { useReducedMotion } from "@/lib/hooks";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

type TestimonialsSliderProps = { items: Testimonial[] };

/**
 * Scroll-snap carousel: swipe/scroll natively, or use the arrows and dots.
 * Autoplays (pausable, and paused on hover/focus), never autoplays for
 * reduced-motion users, and adapts the page count to 1/2/3 visible cards.
 */
export function TestimonialsSlider({ items }: TestimonialsSliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(items.length);
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reduceMotion = useReducedMotion();
  const autoplay = !userPaused && !interacting && !reduceMotion;

  const metrics = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first.offsetWidth + gap;
    const visible = Math.max(1, Math.round((track.clientWidth + gap) / step));
    return { track, step, visible };
  };

  const goTo = (index: number) => {
    const m = metrics();
    if (!m) return;
    const max = items.length - m.visible;
    const target = Math.min(Math.max(index, 0), max);
    m.track.scrollTo({ left: target * m.step, behavior: reduceMotion ? "auto" : "smooth" });
  };

  // Recompute how many "pages" exist whenever the track resizes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => {
      const m = metrics();
      if (m) setPageCount(items.length - m.visible + 1);
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [items.length]);

  // Autoplay: advance one card at a time, looping back to the start.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      goTo(page + 1 >= pageCount ? 0 : page + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, page, pageCount]);

  const onScroll = () => {
    const m = metrics();
    if (m) setPage(Math.round(m.track.scrollLeft / m.step));
  };

  const controlBtn =
    "grid size-12 place-items-center rounded-full border border-ink-200 bg-white text-ink-800 transition-colors duration-300 hover:border-ink-900 hover:bg-ink-900 hover:text-white disabled:pointer-events-none disabled:opacity-40";

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Traveler testimonials"
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setInteracting(false);
      }}
    >
      <ul
        ref={trackRef}
        id="testimonials-track"
        onScroll={onScroll}
        tabIndex={0}
        aria-label="Testimonials — scroll horizontally"
        aria-live={autoplay ? "off" : "polite"}
        className="-my-6 flex snap-x snap-mandatory gap-6 overflow-x-auto py-6 [scrollbar-width:none] focus-visible:outline-offset-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
            className="shrink-0 basis-full snap-start md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
          >
            <TestimonialCard testimonial={item} />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === page ? "true" : undefined}
              className={cn(
                "h-2.5 rounded-full transition-all duration-500 ease-premium",
                index === page ? "w-8 bg-brand-600" : "w-2.5 bg-ink-200 hover:bg-ink-300",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? "Resume autoplay" : "Pause autoplay"}
              className={controlBtn}
            >
              {userPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
            </button>
          )}
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="Previous testimonials"
            aria-controls="testimonials-track"
            className={controlBtn}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page >= pageCount - 1}
            aria-label="Next testimonials"
            aria-controls="testimonials-track"
            className={controlBtn}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
