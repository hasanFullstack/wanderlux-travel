import type { CabinClass, CarCategory, VisaType } from "@/lib/types";

/* ------------------------------------------------------------------
   Search query shapes shared by the hero widget and service pages.
   Every value is a string/number so it round-trips through the URL.
------------------------------------------------------------------- */

export type FlightQuery = {
  from: string;
  to: string;
  date: string;
  travelers: number;
  cabin: CabinClass | "";
};

export type HotelQuery = {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
};

export type CarQuery = {
  location: string;
  pickup: string;
  dropoff: string;
  category: CarCategory | "";
};

export type VisaQuery = {
  country: string;
  nationality: string;
  type: VisaType | "";
};

export const emptyFlightQuery: FlightQuery = {
  from: "",
  to: "",
  date: "",
  travelers: 1,
  cabin: "",
};

export const emptyHotelQuery: HotelQuery = {
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: 2,
};

export const emptyCarQuery: CarQuery = {
  location: "",
  pickup: "",
  dropoff: "",
  category: "",
};

export const emptyVisaQuery: VisaQuery = {
  country: "",
  nationality: "Pakistan",
  type: "",
};

type ParamReader = { get(key: string): string | null };

function readNumber(params: ParamReader, key: string, fallback: number) {
  const value = Number(params.get(key));
  return Number.isFinite(value) && value > 0 ? Math.min(value, 9) : fallback;
}

export function parseFlightQuery(params: ParamReader): FlightQuery {
  return {
    from: params.get("from") ?? "",
    to: params.get("to") ?? "",
    date: params.get("date") ?? "",
    travelers: readNumber(params, "travelers", emptyFlightQuery.travelers),
    cabin: (params.get("cabin") as CabinClass | null) ?? "",
  };
}

export function parseHotelQuery(params: ParamReader): HotelQuery {
  return {
    destination: params.get("destination") ?? "",
    checkIn: params.get("checkIn") ?? "",
    checkOut: params.get("checkOut") ?? "",
    guests: readNumber(params, "guests", emptyHotelQuery.guests),
  };
}

export function parseCarQuery(params: ParamReader): CarQuery {
  return {
    location: params.get("location") ?? "",
    pickup: params.get("pickup") ?? "",
    dropoff: params.get("dropoff") ?? "",
    category: (params.get("category") as CarCategory | null) ?? "",
  };
}

export function parseVisaQuery(params: ParamReader): VisaQuery {
  return {
    country: params.get("country") ?? "",
    nationality: params.get("nationality") ?? emptyVisaQuery.nationality,
    type: (params.get("type") as VisaType | null) ?? "",
  };
}

/** Serialize a query object, dropping empty values. */
export function toSearchParams(query: Record<string, string | number>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== "" && value !== undefined) params.set(key, String(value));
  }
  return params.toString();
}

/* ------------------------------------------------------------------
   Date helpers (ISO yyyy-mm-dd strings, local time).
------------------------------------------------------------------- */

export function toISODate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Whole days between two ISO dates (0 if either is missing/invalid). */
export function daysBetween(start: string, end: string) {
  if (!start || !end) return 0;
  const ms = Date.parse(end) - Date.parse(start);
  return Number.isFinite(ms) ? Math.round(ms / 86_400_000) : 0;
}

export function formatShortDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
