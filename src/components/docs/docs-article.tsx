"use client";

import * as React from "react";

/**
 * The rendered markdown. The HTML is produced on the server (`lib/docs/render.ts`);
 * the one client behaviour is the copy-link anchor beside every heading,
 * handled by delegation so the markup stays a plain string.
 */
export function DocsArticle({ html }: { html: string }) {
  const [copied, setCopied] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function onClick(event: React.MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a.docs-anchor");
    if (!anchor) return;
    const id = anchor.dataset.anchor;
    if (!id) return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    void navigator.clipboard?.writeText(url).then(
      () => setCopied(id),
      () => undefined,
    );
  }

  return (
    <>
      <div className="docs-prose" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center">
        {copied ? (
          <span className="glass-surface rounded-[var(--radius-pill)] px-3.5 py-2 text-sm text-[var(--color-foreground)]">
            Link copied
          </span>
        ) : null}
      </div>
    </>
  );
}
