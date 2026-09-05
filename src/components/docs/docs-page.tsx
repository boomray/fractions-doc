import { Glyph } from "@/components/ui/icon";
import type { RenderedDocPage } from "@/lib/docs/content";
import { DOC_GROUPS } from "@/lib/docs/content";
import { DocsArticle } from "./docs-article";
import { DocsPager } from "./docs-pager";
import { DocsToc } from "./docs-toc";
import { docIcon } from "./icons";

/**
 * One docs page: the header (group, title, description), the article, the
 * prev/next links, and the table of contents in the right-hand column.
 */
export function DocsPage({ page }: { page: RenderedDocPage }) {
  const group = DOC_GROUPS.find((g) => g.id === page.meta.group)?.label ?? page.meta.group;
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-10">
      <div className="mx-auto w-full max-w-[680px] min-w-0">
        <div className="card-surface rounded-[var(--radius-panel)] px-5 py-6 sm:px-8 sm:py-8">
        <header className="mb-8 flex flex-col gap-3">
          <p className="flex items-center gap-2 text-xs text-[var(--color-foreground-secondary)]">
            <Glyph icon={docIcon(page.meta.icon)} size={16} className="text-[var(--color-accent-text)]" />
            {group}
          </p>
          <h1 className="text-[clamp(1.75rem,3vw,2.125rem)] leading-tight text-balance text-[var(--color-foreground)]">
            {page.meta.title}
          </h1>
          {page.meta.description ? (
            <p className="text-md text-pretty text-[var(--color-foreground-secondary)]">{page.meta.description}</p>
          ) : null}
        </header>
        <DocsArticle html={page.html} />
        </div>
        <DocsPager prev={page.prev} next={page.next} />
      </div>
      <aside className="hidden xl:block">
        <div className="scroll-pane sticky top-[80px] max-h-[calc(100dvh-96px)] overflow-y-auto pb-6">
          <DocsToc headings={page.headings} />
        </div>
      </aside>
    </div>
  );
}
