import { docsCard } from "@/lib/docs/og-card";
import { OVERVIEW_ID, getDocPage, getDocsSlugs } from "@/lib/docs/content";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

type Props = { params: Promise<{ slug: string[] }> };

/**
 * One card per docs page, `/og/<group>/<slug>`, rendered at build time: the
 * same dark wordmark card, with this page's title and description on it.
 * (Next does not allow `opengraph-image.tsx` inside a catch-all segment, so
 * the pages point at this route instead.)
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [...getDocsSlugs(), OVERVIEW_ID.split("/")].map((slug) => ({ slug }));
}

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const page = getDocPage(slug.join("/"));
  return docsCard({
    title: page?.meta.title ?? SITE_TITLE,
    description: page?.meta.description ?? SITE_DESCRIPTION,
  });
}
