import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

/**
 * Per-page metadata with canonical URL, Open Graph and Twitter tags.
 * (Nested `openGraph` objects replace the parent's, so we rebuild it fully.)
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
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
