import { DocsShell } from "@/components/docs/docs-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDocsNav, getDocsSearchIndex } from "@/lib/docs/content";
import "../docs.css";

/**
 * Every docs page shares the frame: the top bar (with the search index it
 * filters), the sidebar on the left, the page on the right, the footer. All
 * of it is built on the server from `content/docs/**`.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const nav = getDocsNav();
  const searchIndex = getDocsSearchIndex();
  return (
    <>
      <SiteHeader searchIndex={searchIndex} />
      {/* 64px is the bar's height; the footer stays below the fold. */}
      <main id="main" className="min-h-[calc(100dvh-64px)]">
        <DocsShell nav={nav}>{children}</DocsShell>
      </main>
      <SiteFooter />
    </>
  );
}
