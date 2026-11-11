"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ErrorPageProps = {
  error: unknown;
  retry: () => void;
};

/** Route-level error boundary with a friendly recovery UI. */
export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      aria-labelledby="error-heading"
      className="flex min-h-svh items-center bg-ink-950 py-32 text-center text-white"
    >
      <div className="container-page">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/10 text-gold-300 ring-1 ring-white/20">
          <TriangleAlert className="size-8" aria-hidden="true" />
        </span>
        <h1 id="error-heading" className="mt-8 font-display text-3xl font-semibold sm:text-5xl">
          Turbulence ahead
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-ink-200 sm:text-lg">
          Something went wrong while loading this page. Please try again — or head back home.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Button variant="gold" size="lg" onClick={() => retry()}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Try again
          </Button>
          <Button href="/" variant="light" size="lg">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
