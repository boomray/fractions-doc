"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Glyph } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { DocSearchEntry } from "@/lib/docs/types";
import { docIcon } from "./icons";

/**
 * Client-side docs search. The server builds a small JSON index (title,
 * description, headings, body text per page) and passes it down; this
 * filters it as you type. Title matches rank first, then description, then
 * headings, then body, with a short snippet around the first body hit.
 *
 * ⌘K / Ctrl+K opens it from anywhere on the site. There is one instance, in
 * the top bar: a pill with the label on wide screens, an icon button below `sm`.
 */

interface Hit {
  entry: DocSearchEntry;
  score: number;
  snippet: string | null;
}

const RESULT_LIMIT = 8;

function search(index: DocSearchEntry[], query: string): Hit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  const hits: Hit[] = [];
  for (const entry of index) {
    const title = entry.title.toLowerCase();
    const description = entry.description.toLowerCase();
    const headings = entry.headings.map((h) => h.toLowerCase());
    const body = entry.body.toLowerCase();
    let score = 0;
    let everyWord = true;
    for (const word of words) {
      let matched = false;
      if (title.includes(word)) {
        score += title.startsWith(word) ? 12 : 8;
        matched = true;
      }
      if (description.includes(word)) {
        score += 4;
        matched = true;
      }
      if (headings.some((h) => h.includes(word))) {
        score += 3;
        matched = true;
      }
      if (body.includes(word)) {
        score += 1;
        matched = true;
      }
      if (!matched) everyWord = false;
    }
    if (!everyWord || score === 0) continue;
    let snippet: string | null = null;
    const at = body.indexOf(words[0]!);
    if (at !== -1 && !title.includes(words[0]!)) {
      const start = Math.max(0, at - 56);
      const end = Math.min(entry.body.length, at + 84);
      snippet = `${start > 0 ? "…" : ""}${entry.body.slice(start, end).trim()}${end < entry.body.length ? "…" : ""}`;
    }
    hits.push({ entry, score, snippet });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, RESULT_LIMIT);
}

export function DocsSearch({ index }: { index: DocSearchEntry[] }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [cursor, setCursor] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listId = React.useId();

  const hits = React.useMemo(() => search(index, query), [index, query]);
  const active = hits[Math.min(cursor, Math.max(hits.length - 1, 0))];

  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onEscape);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previous;
    };
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }

  function go(href: string) {
    close();
    router.push(href);
  }

  function onInputKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => Math.min(c + 1, Math.max(hits.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (event.key === "Enter" && active) {
      event.preventDefault();
      go(active.entry.href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the docs"
        className={cn(
          "card-surface flex h-[41px] shrink-0 items-center justify-center gap-2.5 rounded-[var(--radius-pill)] text-sm text-[var(--color-foreground-muted)]",
          "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-[var(--color-foreground)]",
          "w-[41px] sm:w-[220px] sm:justify-start sm:px-3.5",
        )}
      >
        <Glyph icon={Search} size={16} className="opacity-70" />
        <span className="hidden flex-1 text-left sm:inline">Search docs</span>
        <kbd className="num hidden rounded-[6px] bg-[var(--color-fill-control)] px-1.5 py-0.5 text-2xs text-[var(--color-foreground-muted)] sm:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-[rgb(17_17_17/0.32)] p-4 pt-[12vh] backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search the docs"
            className="glass-surface flex w-full max-w-[560px] flex-col overflow-hidden rounded-[var(--radius-float)]"
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <Glyph icon={Search} size={20} className="opacity-60" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCursor(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search the docs"
                aria-autocomplete="list"
                aria-controls={listId}
                aria-activedescendant={active ? `${listId}-${active.entry.href}` : undefined}
                className="min-h-[40px] flex-1 bg-transparent text-md text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-foreground-muted)]"
              />
              <kbd className="rounded-[6px] bg-[var(--color-fill-control)] px-1.5 py-0.5 text-2xs text-[var(--color-foreground-muted)]">
                esc
              </kbd>
            </div>
            <hr className="mx-4" />
            <ul id={listId} role="listbox" className="scroll-pane max-h-[50vh] overflow-y-auto p-2">
              {query.trim() === "" ? (
                <li className="px-3 py-6 text-center text-sm text-[var(--color-foreground-muted)]">
                  Type to search titles, headings and text.
                </li>
              ) : hits.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-[var(--color-foreground-muted)]">
                  Nothing matches “{query.trim()}”.
                </li>
              ) : (
                hits.map((hit, i) => {
                  const selected = hit === active;
                  return (
                    <li
                      key={hit.entry.href}
                      id={`${listId}-${hit.entry.href}`}
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setCursor(i)}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => go(hit.entry.href)}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-[var(--radius-menu-item)] px-3 py-2.5",
                        "transition-colors duration-[var(--duration-fast)]",
                        selected && "bg-[var(--color-fill-control)]",
                      )}
                    >
                      <Glyph
                        icon={docIcon(hit.entry.icon)}
                        size={16}
                        className={cn("mt-0.5", selected ? "text-[var(--color-accent-text)]" : "opacity-60")}
                      />
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="flex items-baseline gap-2">
                          <span className="truncate text-sm text-[var(--color-foreground)]">{hit.entry.title}</span>
                          <span className="shrink-0 text-2xs text-[var(--color-foreground-muted)]">{hit.entry.group}</span>
                        </span>
                        <span className="line-clamp-2 text-xs text-[var(--color-foreground-secondary)]">
                          {hit.snippet ?? hit.entry.description}
                        </span>
                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
