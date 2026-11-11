import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

/** schema.org TravelAgency describing the business (home page). */
export function travelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/opengraph-image`,
    telephone: siteConfig.contact.phoneHref.replace("tel:", ""),
    email: siteConfig.contact.email,
    areaServed: "Worldwide",
    openingHours: "Mo-Sa 09:00-19:00",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Travel services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description, url: `${siteConfig.url}${s.href}` },
      })),
    },
  };
}

/** schema.org BreadcrumbList for an inner page. */
export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name, item: `${siteConfig.url}${path}` },
    ],
  };
}
