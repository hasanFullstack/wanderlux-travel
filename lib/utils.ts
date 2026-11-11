import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// All mock prices are stored in Pakistani Rupees. A fixed "PKR" prefix with
// en-US grouping renders identically on server and client (no ICU drift).
const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

/** Format a PKR amount, e.g. 59000 → "PKR 59,000". */
export function formatPrice(value: number) {
  return `PKR ${numberFormatter.format(value)}`;
}

/** 445 → "7h 25m" */
export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** "flight" + 2 → "2 flights" */
export function pluralize(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

/** Resolve after `ms` milliseconds — used to simulate network latency. */
export function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
