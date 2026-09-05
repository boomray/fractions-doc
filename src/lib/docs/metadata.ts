import type { Metadata } from "next";
import type { DocPageMeta } from "./types";
import { SITE_NAME } from "@/lib/site";

/**
 * Per-page metadata. Next merges segments shallowly, so a page that sets
 * `openGraph` replaces the layout's whole object, card image included; the
 * shared bits are restated here so every page unfurls with the same card.
 */
export function docPageMetadata(meta: DocPageMeta, overrides: Metadata = {}): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.href },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: meta.title,
      description: meta.description,
      url: meta.href,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/opengraph-image"],
    },
    ...overrides,
  };
}
