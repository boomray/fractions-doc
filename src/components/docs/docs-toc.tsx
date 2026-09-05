"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { DocHeading } from "@/lib/docs/types";

/**
 * "On this page": the h2/h3 list on the right. An IntersectionObserver
 * watches every heading; the topmost one inside the reading band (just under
 * the sticky bar to about a third of the way down) is the active entry.
 */
export function DocsToc({ headings }: { headings: DocHeading[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(headings[0]?.id ?? null);

  React.useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        if (visible.size > 0) {
          const [top] = Array.from(visible.entries()).sort((a, b) => a[1] - b[1])[0]!;
          setActiveId(top);
          return;
        }
        // Nothing in the band: the last heading above it is the section being read.
        const above = elements.filter((el) => el.getBoundingClientRect().top < 96);
        if (above.length > 0) setActiveId(above[above.length - 1]!.id);
      },
      { rootMargin: "-88px 0px -66% 0px", threshold: [0, 1] },
    );
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="flex flex-col gap-2">
      <p className="text-xs text-[var(--color-foreground-muted)]">On this page</p>
      <ul className="flex flex-col">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "block border-l py-1 text-sm leading-snug transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                  heading.depth === 3 ? "pl-6" : "pl-3",
                  active
                    ? "border-[var(--color-accent-text)] text-[var(--color-foreground)]"
                    : "border-[var(--color-border)] text-[var(--color-foreground-secondary)] hover:text-[var(--color-foreground)]",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
