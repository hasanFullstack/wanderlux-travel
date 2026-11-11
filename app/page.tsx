import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <section className="container-page section-y">
      <p className="text-sm font-semibold tracking-[0.2em] text-brand-600 uppercase">
        {siteConfig.tagline}
      </p>
      <h1 className="mt-4 font-display text-5xl text-ink-900">
        {siteConfig.name}
      </h1>
    </section>
  );
}
