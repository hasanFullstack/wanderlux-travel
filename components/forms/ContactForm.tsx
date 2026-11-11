"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectMenu, type SelectOption } from "@/components/ui/SelectMenu";
import { cn, wait } from "@/lib/utils";
import {
  MESSAGE_MAX,
  contactFieldOrder,
  validateContact,
  type ContactValues,
} from "@/lib/validation";

const initialValues: ContactValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const serviceOptions: SelectOption[] = [
  { value: "", label: "Select a service" },
  { value: "visa", label: "Visa services" },
  { value: "flights", label: "Flight tickets" },
  { value: "hotels", label: "Hotel booking" },
  { value: "cars", label: "Car rental" },
  { value: "package", label: "Complete holiday package" },
  { value: "other", label: "Something else" },
];

const inputClass =
  "block w-full rounded-2xl border bg-sand-50 px-4 py-3.5 text-sm text-ink-900 transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-ink-300 " +
  "hover:border-ink-200 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15 focus:outline-none focus-visible:outline-none";

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
};

function Field({ id, label, optional, error, hint, className, children }: FieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label id={`${id}-label`} htmlFor={id} className="text-sm font-semibold text-ink-800">
          {label}
          {optional && <span className="ml-1 font-normal text-ink-400">(optional)</span>}
        </label>
        {hint}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

type ContactFormProps = { className?: string };

/**
 * Contact form with client-side validation: errors appear after a field is
 * blurred (or on submit), the first invalid field is focused on submit, and a
 * simulated request shows a loading state then a success message.
 */
export function ContactForm({ className }: ContactFormProps) {
  const id = useId();
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [sentTo, setSentTo] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  const errors = validateContact(values);
  const errorFor = (key: keyof ContactValues) =>
    touched[key] || submitted ? errors[key] : undefined;
  const fieldId = (key: keyof ContactValues) => `${id}-${key}`;

  const set = (key: keyof ContactValues, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));
  const touch = (key: keyof ContactValues) => setTouched((t) => ({ ...t, [key]: true }));

  const a11y = (key: keyof ContactValues) => ({
    id: fieldId(key),
    "aria-invalid": errorFor(key) ? true : undefined,
    "aria-describedby": errorFor(key) ? `${fieldId(key)}-error` : undefined,
  });

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    const firstInvalid = contactFieldOrder.find((key) => errors[key]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }
    setStatus("submitting");
    await wait(1400); // simulated request — no backend
    setSentTo(values.name.trim().split(" ")[0]);
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={cn(
          "flex flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-ink-100 outline-none sm:p-12",
          className,
        )}
      >
        <span className="grid size-16 place-items-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold text-ink-900">
          Thank you{sentTo ? `, ${sentTo}` : ""}!
        </h3>
        <p className="mt-3 max-w-sm text-ink-500">
          Your message is on its way. A travel expert will get back to you within
          24 hours — usually much sooner.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";
  const messageLength = values.message.trim().length;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      aria-busy={submitting}
      className={cn("rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-100 sm:p-8", className)}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={fieldId("name")} label="Full name" error={errorFor("name")}>
          <input
            {...a11y("name")}
            type="text"
            autoComplete="name"
            placeholder="Ayesha Khan"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => touch("name")}
            className={cn(inputClass, errorFor("name") ? "border-red-400" : "border-ink-100")}
          />
        </Field>

        <Field id={fieldId("email")} label="Email" error={errorFor("email")}>
          <input
            {...a11y("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => touch("email")}
            className={cn(inputClass, errorFor("email") ? "border-red-400" : "border-ink-100")}
          />
        </Field>

        <Field id={fieldId("phone")} label="Phone" optional error={errorFor("phone")}>
          <input
            {...a11y("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+92 300 1234567"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => touch("phone")}
            className={cn(inputClass, errorFor("phone") ? "border-red-400" : "border-ink-100")}
          />
        </Field>

        <Field id={fieldId("service")} label="Service" error={errorFor("service")}>
          <div
            className={cn(
              "relative rounded-2xl border bg-sand-50 px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-300 hover:border-ink-200",
              "focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-500/15",
              errorFor("service") ? "border-red-400" : "border-ink-100",
            )}
          >
            <SelectMenu
              id={fieldId("service")}
              labelId={`${fieldId("service")}-label`}
              value={values.service}
              options={serviceOptions}
              onChange={(v) => {
                set("service", v);
                touch("service");
              }}
              invalid={Boolean(errorFor("service"))}
              describedBy={errorFor("service") ? `${fieldId("service")}-error` : undefined}
            />
          </div>
        </Field>

        <Field
          id={fieldId("message")}
          label="Your trip"
          error={errorFor("message")}
          className="sm:col-span-2"
          hint={
            <span className="text-xs text-ink-400" aria-hidden="true">
              {messageLength}/{MESSAGE_MAX}
            </span>
          }
        >
          <textarea
            {...a11y("message")}
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder="Where would you like to go, when, and who's travelling?"
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => touch("message")}
            className={cn(inputClass, "resize-y", errorFor("message") ? "border-red-400" : "border-ink-100")}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-ink-400">
          We reply within 24 hours. Your details are never shared.
        </p>
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
