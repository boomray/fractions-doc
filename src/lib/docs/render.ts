import { Marked, type Tokens, type TokenizerAndRendererExtension } from "marked";
import GithubSlugger from "github-slugger";
import { escapeHtml } from "./values";
import type { DocHeading } from "./types";

/**
 * Markdown → HTML for the docs, with the handful of blocks a docs page needs
 * beyond CommonMark:
 *
 *   - `:::note`, `:::tip`, `:::warning` … `:::` callouts (an optional title
 *     after the kind)
 *   - headings with stable ids and a copy-link anchor
 *   - numbered lists drawn as a stepper
 *   - tables wrapped so they scroll instead of the page
 *   - external links open in a new tab
 *
 * Values (`{{ECON.X}}`) are substituted before this runs; see `values.ts`.
 * The four glyphs below are lucide paths, drawn at the product's 1.5px stroke
 * (`components/ui/icon.tsx`), inlined because this output is a string.
 */

const STROKE = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
const svg = (size: number, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" ${STROKE} aria-hidden="true">${body}</svg>`;

const GLYPH = {
  link: svg(
    14,
    '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  ),
  note: svg(16, '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  tip: svg(
    16,
    '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  ),
  warning: svg(
    16,
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  ),
} as const;

type CalloutKind = "note" | "tip" | "warning";
const CALLOUT_TITLE: Record<CalloutKind, string> = { note: "Note", tip: "Tip", warning: "Careful" };

interface CalloutToken extends Tokens.Generic {
  type: "callout";
  kind: CalloutKind;
  title: string;
  tokens: Tokens.Generic[];
}

const callout: TokenizerAndRendererExtension = {
  name: "callout",
  level: "block",
  start(src) {
    return src.match(/^:::/m)?.index;
  },
  tokenizer(src) {
    const match = /^:::(note|tip|warning)[ \t]*([^\n]*)\n([\s\S]*?)\n:::[ \t]*(?:\n+|$)/.exec(src);
    if (!match) return undefined;
    const token: CalloutToken = {
      type: "callout",
      raw: match[0],
      kind: match[1] as CalloutKind,
      title: match[2]!.trim(),
      tokens: [],
    };
    this.lexer.blockTokens(match[3]!.trim(), token.tokens);
    return token;
  },
  renderer(token) {
    const { kind, title, tokens } = token as CalloutToken;
    const label = title || CALLOUT_TITLE[kind];
    return (
      `<aside class="docs-callout docs-callout-${kind}" role="note">` +
      `<span class="docs-callout-icon">${GLYPH[kind]}</span>` +
      `<div class="docs-callout-body"><p class="docs-callout-title">${escapeHtml(label)}</p>${this.parser.parse(tokens)}</div>` +
      `</aside>`
    );
  },
};

/** The visible words of a heading, for its id and the table of contents. */
function plainText(tokens: Tokens.Generic[]): string {
  return tokens
    .map((t) => {
      if (t.type === "codespan" || t.type === "text" || t.type === "escape") {
        return t.tokens ? plainText(t.tokens) : String(t.text ?? "");
      }
      return t.tokens ? plainText(t.tokens) : "";
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
}

export function renderMarkdown(source: string): { html: string; headings: DocHeading[] } {
  const slugger = new GithubSlugger();
  const headings: DocHeading[] = [];
  const marked = new Marked({ gfm: true, breaks: false });

  marked.use({
    extensions: [callout],
    renderer: {
      heading({ tokens, depth }) {
        const text = plainText(tokens);
        const id = slugger.slug(text);
        if (depth === 2 || depth === 3) headings.push({ id, text, depth });
        const inner = this.parser.parseInline(tokens);
        return (
          `<h${depth} id="${id}" class="docs-heading">` +
          `<span>${inner}</span>` +
          `<a href="#${id}" class="docs-anchor" data-anchor="${id}" aria-label="Copy link to “${escapeHtml(text)}”">${GLYPH.link}</a>` +
          `</h${depth}>\n`
        );
      },
      list(token) {
        if (!token.ordered) return false;
        const start = typeof token.start === "number" ? token.start : 1;
        const items = token.items
          .map((item, i) => {
            const body = this.parser.parse(item.tokens);
            return (
              `<li class="docs-step">` +
              `<span class="docs-step-marker num" aria-hidden="true">${start + i}</span>` +
              `<div class="docs-step-body">${body}</div>` +
              `</li>`
            );
          })
          .join("");
        return `<ol class="docs-steps" start="${start}">${items}</ol>\n`;
      },
      table(token) {
        const cell = (c: Tokens.TableCell, tag: "th" | "td") => {
          const align = c.align ? ` style="text-align:${c.align}"` : "";
          const scope = tag === "th" ? ' scope="col"' : "";
          return `<${tag}${scope}${align}>${this.parser.parseInline(c.tokens)}</${tag}>`;
        };
        const head = `<tr>${token.header.map((c) => cell(c, "th")).join("")}</tr>`;
        const rows = token.rows.map((row) => `<tr>${row.map((c) => cell(c, "td")).join("")}</tr>`).join("");
        return `<div class="docs-table"><table><thead>${head}</thead><tbody>${rows}</tbody></table></div>\n`;
      },
      code({ text, lang }) {
        const language = (lang ?? "").trim().split(/\s+/)[0] ?? "";
        const label = language ? `<span class="docs-code-lang">${escapeHtml(language)}</span>` : "";
        return (
          `<figure class="docs-code">${label}<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ""}>` +
          `${escapeHtml(text)}</code></pre></figure>\n`
        );
      },
      link({ href, title, tokens }) {
        const inner = this.parser.parseInline(tokens);
        const attrs = [
          `href="${escapeHtml(href)}"`,
          title ? `title="${escapeHtml(title)}"` : "",
          isExternal(href) ? 'target="_blank" rel="noreferrer"' : "",
        ]
          .filter(Boolean)
          .join(" ");
        return `<a ${attrs}>${inner}</a>`;
      },
    },
  });

  const html = marked.parse(source, { async: false });
  return { html, headings };
}

/**
 * Markdown → the words on the page, for the search index. Loose on purpose:
 * it only needs to keep the vocabulary, not the structure.
 */
export function markdownToText(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^:::.*$/gm, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/gm, " ")
    .replace(/[|`*_>]/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
