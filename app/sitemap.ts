import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Fixed content date keeps the sitemap fully static (no request-time APIs).
const LAST_UPDATED = "2026-11-11";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/flights", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hotels", priority: 0.9, changeFrequency: "weekly" },
  { path: "/visa", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cars", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: LAST_UPDATED,
    changeFrequency,
    priority,
  }));
}
