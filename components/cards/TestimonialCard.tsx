import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { name, location, avatar, rating, trip, quote } = testimonial;

  return (
    <figure
      data-card
      className={cn(
        "relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink-100 sm:p-8",
        className,
      )}
    >
      <Quote
        aria-hidden="true"
        className="absolute top-7 right-7 size-10 fill-brand-50 text-brand-100"
      />
      <div className="flex gap-1 text-gold-400" role="img" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            aria-hidden="true"
            className={cn("size-4", i < rating ? "fill-current" : "fill-ink-100 text-ink-100")}
          />
        ))}
      </div>
      <p className="mt-4 inline-flex w-fit rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-ink-600">
        {trip}
      </p>
      <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-ink-700">
        “{quote}”
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3 border-t border-ink-100 pt-6">
        <Image
          src={avatar}
          alt=""
          width={48}
          height={48}
          className="size-12 rounded-full object-cover ring-2 ring-gold-200"
        />
        <div>
          <p className="font-semibold text-ink-900">{name}</p>
          <p className="text-sm text-ink-400">{location}</p>
        </div>
      </figcaption>
    </figure>
  );
}
