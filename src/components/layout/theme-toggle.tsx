"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Glyph } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY } from "./theme";

/**
 * Light default, dark toggle. The stamp goes on `<html>` as `data-theme`; the
 * bootstrap script in `app/layout.tsx` applies the stored choice before first
 * paint, so this component only ever has to keep it in sync.
 */

type Theme = "dark" | "light";

function apply(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  document
    .getElementById("fractions-theme-color")
    ?.setAttribute("content", theme === "light" ? "#f4f4f4" : "#0d0d0d");
}

/**
 * The live theme, read from the DOM rather than mirrored into React state.
 * The script has already stamped `<html>` before React runs, so the DOM is
 * the source of truth and this is a subscription to an external system.
 */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

/** The server renders the documented default (light); the script corrects it pre-paint. */
function readServerTheme(): Theme {
  return "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = React.useSyncExternalStore(subscribeToTheme, readTheme, readServerTheme);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} theme`;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        // Only the DOM is written; the observer above pushes the change back
        // into React, so there is one source of truth.
        apply(next);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          /* storage blocked — the choice lasts for this page only */
        }
      }}
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-[var(--radius-pill)] text-[var(--color-foreground-muted)]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-fill-control)] hover:text-[var(--color-foreground)]",
        className,
      )}
    >
      {/* Both glyphs render; only the next theme's glyph is shown, so the
          control never changes size. */}
      <Glyph icon={Moon} size={20} className={theme === "light" ? "block" : "hidden"} />
      <Glyph icon={Sun} size={20} className={theme === "light" ? "hidden" : "block"} />
    </button>
  );
}
