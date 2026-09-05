import { docsCard } from "@/lib/docs/og-card";
import { OVERVIEW_ID, getDocPage } from "@/lib/docs/content";
import { OG_SIZE, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

/** The card for `/` (the overview) and for any page without one of its own. */
export const alt = SITE_TITLE;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  const overview = getDocPage(OVERVIEW_ID);
  return docsCard({
    title: overview?.meta.title ?? SITE_TITLE,
    description: overview?.meta.description ?? SITE_DESCRIPTION,
  });
}
