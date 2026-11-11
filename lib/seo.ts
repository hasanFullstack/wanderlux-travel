import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

/** Root opengraph-image route (app/opengraph-image.tsx), resolved via metadataBase. */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — visas, flights, hotels and car rentals`,
};

/**
 * Per-page metadata with canonical URL, Open Graph and Twitter tags.
 * (Nested `openGraph` objects replace the parent's — including the file-based
 * share image — so we rebuild it fully and reference the image explicitly.)
 */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}
