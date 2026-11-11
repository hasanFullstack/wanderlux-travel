import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  index: number;
  className?: string;
};

/**
 * Image-led service card. The title link is stretched over the whole card so
 * the entire surface is clickable while keeping a single, meaningful link.
 */
export function ServiceCard({ service, index, className }: ServiceCardProps) {
  const { title, href, summary, features, image, icon: Icon } = service;

  return (
    <article
      data-card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink-100",
        "transition-shadow duration-500 hover:shadow-lift has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-500",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-1000 ease-premium group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-ink-950/10 to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute top-4 right-5 font-display text-3xl text-white/85"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col px-6 pt-11 pb-6">
        <span
          aria-hidden="true"
          className="absolute -top-7 left-6 grid size-14 place-items-center rounded-2xl bg-ink-900 text-gold-300 shadow-soft ring-4 ring-white transition-colors duration-500 group-hover:bg-brand-600 group-hover:text-white"
        >
          <Icon className="size-6" />
        </span>

        <h3 className="font-display text-2xl font-semibold text-ink-900">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">{summary}</p>

        <ul className="mt-5 space-y-2.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-ink-700">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-brand-700"
        >
          Explore {title.split(" ")[0].toLowerCase()}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
