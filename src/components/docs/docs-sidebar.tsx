"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Glyph } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { DocGroupNav } from "@/lib/docs/types";
import { docIcon } from "./icons";

/**
 * The left column: every group and page with the current page highlighted.
 * Below `lg` it folds into a single row — the current page's name with a
 * chevron — that opens the same list as a glass sheet.
 */
export function DocsSidebar({ nav }: { nav: DocGroupNav[] }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const current = nav.flatMap((g) => g.pages).find((p) => p.href === pathname);

  const list = (
    <nav aria-label="Documentation" className="flex flex-col gap-5">
      {nav.map((group) => (
        <div key={group.id} className="flex flex-col gap-1">
          <p className="px-2.5 text-xs text-[var(--color-foreground-muted)]">{group.label}</p>
          <ul className="flex flex-col gap-0.5">
            {group.pages.map((page) => {
              const active = page.href === pathname;
              return (
                <li key={page.id}>
                  <Link
                    href={page.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[var(--radius-menu-item)] px-2.5 py-1.5 text-sm",
                      "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                      active
                        ? "bg-[var(--color-fill-control)] text-[var(--color-foreground)] shadow-[var(--glass-highlight)]"
                        : "text-[var(--color-foreground-secondary)] hover:bg-[var(--color-fill-control)] hover:text-[var(--color-foreground)]",
                    )}
                  >
                    <Glyph
                      icon={docIcon(page.icon)}
                      size={16}
                      className={cn(active ? "text-[var(--color-accent-text)]" : "opacity-70")}
                    />
                    <span className="min-w-0 truncate">{page.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Wide: a sticky column under the 64px bar. */}
      <aside className="hidden lg:block">
        <div className="scroll-pane sticky top-[80px] flex max-h-[calc(100dvh-96px)] flex-col gap-5 overflow-y-auto pb-6">
          {list}
        </div>
      </aside>

      {/* Narrow: one row that opens the list. */}
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="docs-mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "card-surface flex min-h-[44px] w-full min-w-0 items-center gap-2.5 rounded-[var(--radius-input)] px-3.5 text-sm",
            "text-[var(--color-foreground)]",
          )}
        >
          {current ? <Glyph icon={docIcon(current.icon)} size={16} className="text-[var(--color-accent-text)]" /> : null}
          <span className="min-w-0 flex-1 truncate text-left">{current?.title ?? "Docs"}</span>
          <Glyph
            icon={ChevronDown}
            size={16}
            className={cn("opacity-60 transition-transform duration-[var(--duration-fast)]", open && "rotate-180")}
          />
        </button>
        <div id="docs-mobile-nav" hidden={!open} className="glass-surface mt-2 rounded-[var(--radius-card)] p-3">
          {list}
        </div>
      </div>
    </>
  );
}
