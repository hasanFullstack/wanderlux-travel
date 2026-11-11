import type { LucideIcon } from "lucide-react";

export type ServiceId = "visa" | "flights" | "hotels" | "cars";

export type Service = {
  id: ServiceId;
  title: string;
  href: `/${ServiceId}`;
  summary: string;
  description: string;
  icon: LucideIcon;
  image: string;
  features: string[];
};

export type Destination = {
  id: string;
  name: string;
  country: string;
  region: "Europe" | "Asia" | "Middle East" | "Americas" | "Oceania";
  image: string;
  description: string;
  priceFrom: number;
  rating: number;
  nights: number;
  tag?: string;
};

export type Airport = { city: string; code: string; country: string };

export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First";

export type Flight = {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  from: Airport;
  to: Airport;
  departTime: string;
  arriveTime: string;
  /** +1 when the flight lands the next calendar day. */
  dayOffset: 0 | 1;
  durationMinutes: number;
  stops: 0 | 1 | 2;
  stopover?: string;
  cabin: CabinClass;
  price: number;
  seatsLeft: number;
  baggage: string;
  refundable: boolean;
};

export type HotelType = "Resort" | "Hotel" | "Boutique" | "Villa";

export type Hotel = {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  type: HotelType;
  stars: 3 | 4 | 5;
  reviewScore: number;
  reviewCount: number;
  pricePerNight: number;
  maxGuests: number;
  amenities: string[];
  freeCancellation: boolean;
  breakfastIncluded: boolean;
};

export type CarCategory =
  | "Economy"
  | "Compact"
  | "SUV"
  | "Luxury"
  | "Sports"
  | "Electric";

export type Car = {
  id: string;
  name: string;
  category: CarCategory;
  image: string;
  supplier: string;
  seats: number;
  bags: number;
  doors: number;
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  pricePerDay: number;
  rating: number;
  locations: string[];
  unlimitedMileage: boolean;
  freeCancellation: boolean;
};

export type VisaType = "Tourist" | "Business" | "Student" | "Transit";

export type VisaCountry = {
  id: string;
  country: string;
  region: Destination["region"];
  image: string;
  visaTypes: VisaType[];
  mode: "eVisa" | "Embassy" | "On arrival";
  processing: string;
  /** Minimum processing time in business days — used for sorting. */
  processingDays: number;
  validity: string;
  maxStay: string;
  fee: number;
  successRate: number;
  requirements: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  trip: string;
  quote: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
};
