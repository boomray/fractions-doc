import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "./frontmatter";
import { markdownToText, renderMarkdown } from "./render";
import { substituteValues } from "./values";
import type { DocGroupNav, DocHeading, DocPageMeta, DocSearchEntry } from "./types";

/**
 * The docs live in `content/docs/<group>/<slug>.md`. This module reads them
 * on the server, orders them, and hands the pages, the sidebar, the
 * prev/next links and the search index to the routes. Nothing here reaches
 * the client except the plain objects in `types.ts`.
 */

const DOCS_ROOT = path.join(process.cwd(), "content", "docs");

/** Sidebar groups, in order. A folder without an entry here is not published. */
export const DOC_GROUPS: ReadonlyArray<{ id: string; label: string }> = [
  { id: "start", label: "Start" },
  { id: "use-it", label: "Use it" },
  { id: "protocol", label: "Protocol" },
  { id: "faq", label: "FAQ" },
];

/** The page served at `/` itself. */
export const OVERVIEW_ID = "start/overview";

interface DocSource extends DocPageMeta {
  /** the markdown body with every `{{…}}` already substituted */
  body: string;
}

function hrefFor(id: string): string {
  return id === OVERVIEW_ID ? "/" : `/${id}`;
}

function readAll(): DocSource[] {
  const pages: DocSource[] = [];
  for (const group of DOC_GROUPS) {
    const dir = path.join(DOCS_ROOT, group.id);
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir)) {
      if (!entry.endsWith(".md")) continue;
      const file = path.join(dir, entry);
      const slug = entry.slice(0, -3);
      const id = `${group.id}/${slug}`;
      const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"), file);
      pages.push({
        id,
        group: group.id,
        slug,
        href: hrefFor(id),
        title: substituteValues(data.title, file),
        description: substituteValues(data.description, file),
        icon: data.icon,
        order: data.order,
        body: substituteValues(body, file),
      });
    }
  }
  const groupIndex = new Map(DOC_GROUPS.map((g, i) => [g.id, i]));
  pages.sort(
    (a, b) =>
      groupIndex.get(a.group)! - groupIndex.get(b.group)! ||
      a.order - b.order ||
      a.title.localeCompare(b.title),
  );
  return pages;
}

// Read once per process in production; re-read on every request in
// development so an edit to a markdown file shows up on refresh.
let cached: DocSource[] | null = null;
function allPages(): DocSource[] {
  if (process.env.NODE_ENV !== "production") return readAll();
  cached ??= readAll();
  return cached;
}

function stripBody(page: DocSource): DocPageMeta {
  return {
    id: page.id,
    group: page.group,
    slug: page.slug,
    href: page.href,
    title: page.title,
    description: page.description,
    icon: page.icon,
    order: page.order,
  };
}

export function getDocsNav(): DocGroupNav[] {
  const pages = allPages();
  return DOC_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    pages: pages.filter((p) => p.group === group.id).map(stripBody),
  })).filter((group) => group.pages.length > 0);
}

/** Every `[...slug]` route that exists; the overview is served at `/`. */
export function getDocsSlugs(): string[][] {
  return allPages()
    .filter((p) => p.id !== OVERVIEW_ID)
    .map((p) => [p.group, p.slug]);
}

export interface RenderedDocPage {
  meta: DocPageMeta;
  html: string;
  headings: DocHeading[];
  prev: DocPageMeta | null;
  next: DocPageMeta | null;
}

export function getDocPage(id: string): RenderedDocPage | null {
  const pages = allPages();
  const index = pages.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const page = pages[index]!;
  const { html, headings } = renderMarkdown(page.body);
  return {
    meta: stripBody(page),
    html,
    headings,
    prev: index > 0 ? stripBody(pages[index - 1]!) : null,
    next: index < pages.length - 1 ? stripBody(pages[index + 1]!) : null,
  };
}

export function getDocsSearchIndex(): DocSearchEntry[] {
  const labels = new Map(DOC_GROUPS.map((g) => [g.id, g.label]));
  return allPages().map((page) => {
    const headings = Array.from(page.body.matchAll(/^#{2,3}\s+(.+)$/gm), (m) => m[1]!.trim());
    return {
      href: page.href,
      title: page.title,
      description: page.description,
      group: labels.get(page.group) ?? page.group,
      icon: page.icon,
      headings,
      body: markdownToText(page.body),
    };
  });
}
