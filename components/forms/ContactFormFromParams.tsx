"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm, serviceOptions } from "@/components/forms/ContactForm";

/**
 * Reads `?service=…&ref=…` (set by "Book now" buttons on result cards) and
 * pre-fills the contact form with the chosen service and a booking message.
 */
export function ContactFormFromParams() {
  const params = useSearchParams();
  const serviceParam = params.get("service") ?? "";
  const ref = params.get("ref")?.slice(0, 300) ?? "";
  const service = serviceOptions.some((o) => o.value === serviceParam && o.value) ? serviceParam : "";

  return (
    <ContactForm
      key={params.toString()}
      notice={ref || undefined}
      defaultValues={{
        service,
        message: ref
          ? `Hi! I'd like to book: ${ref}. Please confirm availability and the final price.`
          : "",
      }}
    />
  );
}
