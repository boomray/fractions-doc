import type { Metadata } from "next";
import type { DocPageMeta } from "./types";
import { OG_SIZE, SITE_NAME, X_HANDLE } from "@/lib/site";

/**
 * Per-page metadata. Next merges segments shallowly, so a page that sets
 * `openGraph` replaces the layout's whole object, card image included; the
 * shared bits are restated here. The card is the page's own, `/og/<id>`, the
 * dark wordmark card with this page's title on it.
 */
export function docPageMetadata(meta: DocPageMeta, overrides: Metadata = {}): Metadata {
  const card = { url: `/og/${meta.id}`, width: OG_SIZE.width, height: OG_SIZE.height, alt: meta.title, type: "image/png" };
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
      images: [card],
    },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
      title: meta.title,
      description: meta.description,
      images: [card],
    },
    ...overrides,
  };
}
