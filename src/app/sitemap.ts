import type { MetadataRoute } from "next";
import { getDocsNav } from "@/lib/docs/content";
import { SITE_URL } from "@/lib/site";

/** Every docs page, the overview first. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return getDocsNav()
    .flatMap((group) => group.pages)
    .map((page) => ({
      url: `${SITE_URL}${page.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page.href === "/" ? 1 : 0.7,
    }));
}
