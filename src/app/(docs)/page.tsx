import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage } from "@/components/docs/docs-page";
import { OVERVIEW_ID, getDocPage } from "@/lib/docs/content";
import { docPageMetadata } from "@/lib/docs/metadata";
import { SITE_TITLE } from "@/lib/site";

/** `/` is the overview page, `content/docs/start/overview.md`. */
export function generateMetadata(): Metadata {
  const page = getDocPage(OVERVIEW_ID);
  if (!page) return { title: { absolute: SITE_TITLE } };
  // The overview carries the site's own name, not "Overview".
  return docPageMetadata({ ...page.meta, title: SITE_TITLE }, { title: { absolute: SITE_TITLE } });
}

export default function Page() {
  const page = getDocPage(OVERVIEW_ID);
  if (!page) notFound();
  return <DocsPage page={page} />;
}
