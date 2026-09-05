import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand/logo";
import { DocsSearch } from "@/components/docs/docs-search";
import { Glyph } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { DocSearchEntry } from "@/lib/docs/types";
import { APP_URL } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

/**
 * The top bar: the mark alone on the left (no plate, soft shadow only) with a
 * "Docs" label, then the search trigger, the theme toggle and the pill that
 * opens the app. Sticky transparent glass, no hard rule underneath.
 */
export function SiteHeader({ searchIndex }: { searchIndex: DocSearchEntry[] }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-[var(--color-foreground)] focus:px-3 focus:py-2 focus:text-[var(--color-background)]"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-30",
          "bg-[var(--color-background)] supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--color-surface)_60%,transparent)] supports-[backdrop-filter]:backdrop-blur-xl",
          "shadow-[var(--shadow-glass),0_8px_24px_rgb(17_17_17/0.04)]",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-3 px-4">
          <Link
            href="/"
            aria-label="fractions.fi docs home"
            className={cn(
              "flex h-11 shrink-0 items-center gap-3 rounded-full",
              "transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:opacity-80 active:opacity-60",
              "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ring)]",
            )}
          >
            <BrandMark height={34} priority />
            <span className="text-md text-[var(--color-foreground)]">Docs</span>
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <DocsSearch index={searchIndex} />
            <ThemeToggle />
            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "ml-1 inline-flex h-[39px] items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-4 text-[15px] font-medium text-[var(--color-accent-foreground)]",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-accent-hover)]",
              )}
            >
              <span className="hidden sm:inline">Open the app</span>
              <span className="sm:hidden">App</span>
              <Glyph icon={ArrowUpRight} size={16} />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
