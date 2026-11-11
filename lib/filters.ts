import type { CarQuery, FlightQuery, HotelQuery, VisaQuery } from "@/lib/search";
import type { Car, Flight, Hotel, VisaCountry } from "@/lib/types";

/* Pure, client-side filtering & sorting over the local mock data. */

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

/* ----------------------------- Flights ----------------------------- */

export type FlightSort = "price" | "duration" | "departure";

export function filterFlights(list: Flight[], q: FlightQuery) {
  return list.filter(
    (f) =>
      (!q.from || f.from.code === q.from) &&
      (!q.to || f.to.code === q.to) &&
      (!q.cabin || f.cabin === q.cabin) &&
      f.seatsLeft >= q.travelers,
  );
}

export function sortFlights(list: Flight[], sort: FlightSort) {
  const sorted = [...list];
  if (sort === "price") sorted.sort((a, b) => a.price - b.price);
  if (sort === "duration") sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
  if (sort === "departure") sorted.sort((a, b) => a.departTime.localeCompare(b.departTime));
  return sorted;
}

/* ------------------------------ Hotels ----------------------------- */

export type HotelSort = "rating" | "price-asc" | "price-desc";

export function filterHotels(list: Hotel[], q: HotelQuery) {
  const term = normalize(q.destination);
  return list.filter(
    (h) =>
      (!term ||
        normalize(h.city).includes(term) ||
        normalize(h.country).includes(term) ||
        normalize(h.name).includes(term)) &&
      h.maxGuests >= q.guests,
  );
}

export function sortHotels(list: Hotel[], sort: HotelSort) {
  const sorted = [...list];
  if (sort === "rating") sorted.sort((a, b) => b.reviewScore - a.reviewScore);
  if (sort === "price-asc") sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
  if (sort === "price-desc") sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
  return sorted;
}

/* ------------------------------- Cars ------------------------------ */

export type CarSort = "price-asc" | "price-desc" | "rating";

export function filterCars(list: Car[], q: CarQuery) {
  return list.filter(
    (c) =>
      (!q.location || c.locations.includes(q.location)) &&
      (!q.category || c.category === q.category),
  );
}

export function sortCars(list: Car[], sort: CarSort) {
  const sorted = [...list];
  if (sort === "price-asc") sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
  if (sort === "price-desc") sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
  if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}

/* ------------------------------- Visa ------------------------------ */

export type VisaSort = "processing" | "fee" | "success";

export function filterVisas(list: VisaCountry[], q: VisaQuery) {
  return list.filter(
    (v) => (!q.country || v.id === q.country) && (!q.type || v.visaTypes.includes(q.type)),
  );
}

export function sortVisas(list: VisaCountry[], sort: VisaSort) {
  const sorted = [...list];
  if (sort === "processing") sorted.sort((a, b) => a.processingDays - b.processingDays);
  if (sort === "fee") sorted.sort((a, b) => a.fee - b.fee);
  if (sort === "success") sorted.sort((a, b) => b.successRate - a.successRate);
  return sorted;
}
