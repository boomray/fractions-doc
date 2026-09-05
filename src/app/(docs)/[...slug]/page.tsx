import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DocsPage } from "@/components/docs/docs-page";
import { OVERVIEW_ID, getDocPage, getDocsSlugs } from "@/lib/docs/content";
import { docPageMetadata } from "@/lib/docs/metadata";

type Props = { params: Promise<{ slug: string[] }> };

/** Every page under `content/docs/<group>/<slug>.md`, rendered at build time. */
export const dynamicParams = false;

export function generateStaticParams() {
  return [...getDocsSlugs(), OVERVIEW_ID.split("/")].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug.join("/"));
  if (!page) return {};
  return docPageMetadata(page.meta);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const id = slug.join("/");
  // The overview has one address, `/`.
  if (id === OVERVIEW_ID) redirect("/");
  const page = getDocPage(id);
  if (!page) notFound();
  return <DocsPage page={page} />;
}
