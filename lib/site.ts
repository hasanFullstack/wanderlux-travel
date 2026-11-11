const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteConfig = {
  name: "Wanderlux Travel",
  shortName: "Wanderlux",
  tagline: "Journeys, beautifully handled.",
  description:
    "Wanderlux Travel is a full-service travel agency for visa assistance, flight tickets, hotel stays and car rentals — planned by experts, booked in minutes.",
  url: siteUrl,
  contact: {
    phone: "+92 315 5859158",
    phoneHref: "tel:+923155859158",
    email: "hasanamin877@gmail.com",
    emailHref: "mailto:hasanamin877@gmail.com",
    address: "Available worldwide — online & by appointment",
    hours: "Mon – Sat, 9:00 – 19:00 (PKT)",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Visa", href: "/visa" },
    { label: "Flights", href: "/flights" },
    { label: "Hotels", href: "/hotels" },
    { label: "Cars", href: "/cars" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
