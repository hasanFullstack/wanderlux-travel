import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Format a number as a whole-dollar USD price, e.g. 1290 → "$1,290". */
export function formatPrice(value: number) {
  return currencyFormatter.format(value);
}

/** Resolve after `ms` milliseconds — used to simulate network latency. */
export function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
