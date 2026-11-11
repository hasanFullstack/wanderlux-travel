import { BedDouble, CarFront, Plane, Stamp } from "lucide-react";
import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "visa",
    title: "Visa Services",
    href: "/visa",
    summary: "Stress-free visa applications with a 98% approval rate.",
    description:
      "From document checklists to embassy appointments, our visa specialists prepare and track your application end to end.",
    icon: Stamp,
    image: "/images/services/visa.jpg",
    features: ["Document review", "Appointment booking", "Live status tracking"],
  },
  {
    id: "flights",
    title: "Flight Tickets",
    href: "/flights",
    summary: "Compare 400+ airlines and lock in the best fare.",
    description:
      "Search one-way and return fares across every cabin class, with flexible tickets and 24/7 rebooking support.",
    icon: Plane,
    image: "/images/services/flights.jpg",
    features: ["Best-fare guarantee", "Flexible tickets", "Seat selection"],
  },
  {
    id: "hotels",
    title: "Hotel Booking",
    href: "/hotels",
    summary: "Hand-picked stays, from boutique hideaways to resorts.",
    description:
      "Every property is vetted by our team, with exclusive member rates, free cancellation and complimentary upgrades.",
    icon: BedDouble,
    image: "/images/services/hotels.jpg",
    features: ["Member-only rates", "Free cancellation", "Verified reviews"],
  },
  {
    id: "cars",
    title: "Car Rental",
    href: "/cars",
    summary: "Premium cars waiting at 300+ pickup points.",
    description:
      "Economy to electric to luxury — transparent pricing, unlimited mileage options and no hidden fees at the counter.",
    icon: CarFront,
    image: "/images/services/cars.jpg",
    features: ["No hidden fees", "Unlimited mileage", "Airport pickup"],
  },
];
