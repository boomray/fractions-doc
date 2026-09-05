import { BrandWordmark } from "@/components/brand/logo";
import { XGlyph } from "@/components/brand/x-glyph";
import { cn } from "@/lib/cn";
import { APP_URL, X_HANDLE, X_URL } from "@/lib/site";

const LINK_CLASS = cn(
  "inline-flex min-h-8 items-center gap-2 rounded-full text-sm text-[var(--color-foreground-secondary)]",
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:text-[var(--color-foreground)]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]",
);

/** The footer: the wordmark, a line, and links to the app and to X. */
export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1200px] px-4 pb-[max(24px,env(safe-area-inset-bottom))]">
      <div className="panel-surface flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex flex-col gap-3">
          <a
            href={APP_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="fractions.fi"
            className="inline-flex w-fit items-center rounded-full transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:opacity-80"
          >
            <BrandWordmark height={26} />
          </a>
          <p className="max-w-[44ch] text-sm text-pretty text-[var(--color-foreground-secondary)]">
            Bundles of Robinhood Chain tokens, sold as one coin each. These pages explain how it works.
          </p>
        </div>
        <nav aria-label="Elsewhere" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={APP_URL} target="_blank" rel="noreferrer noopener" className={LINK_CLASS}>
            Open the app
          </a>
          <a href={X_URL} target="_blank" rel="noreferrer noopener" aria-label="fractions on X" className={LINK_CLASS}>
            <XGlyph size={14} />
            {X_HANDLE} on X
          </a>
        </nav>
      </div>
    </footer>
  );
}
