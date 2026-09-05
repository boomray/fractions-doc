import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Glyph } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { DocPageMeta } from "@/lib/docs/types";

/** Previous / next, at the foot of every page. */
export function DocsPager({ prev, next }: { prev: DocPageMeta | null; next: DocPageMeta | null }) {
  if (!prev && !next) return null;
  return (
    <nav aria-label="Previous and next page" className="mt-10 grid gap-3 sm:grid-cols-2">
      {prev ? <PagerLink page={prev} direction="prev" /> : <span />}
      {next ? <PagerLink page={next} direction="next" /> : null}
    </nav>
  );
}

function PagerLink({ page, direction }: { page: DocPageMeta; direction: "prev" | "next" }) {
  const next = direction === "next";
  return (
    <Link
      href={page.href}
      rel={next ? "next" : "prev"}
      className={cn(
        "card-surface group flex items-center gap-3 rounded-[var(--radius-card)] px-4 py-3.5",
        "transition-shadow duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-soft)]",
        next ? "text-right sm:col-start-2" : "",
      )}
    >
      {next ? null : <Glyph icon={ArrowLeft} size={16} className="opacity-60 transition-opacity group-hover:opacity-100" />}
      <span className={cn("flex min-w-0 flex-1 flex-col gap-0.5", next && "items-end")}>
        <span className="text-2xs text-[var(--color-foreground-muted)]">{next ? "Next" : "Previous"}</span>
        <span className="truncate text-sm text-[var(--color-foreground)]">{page.title}</span>
      </span>
      {next ? <Glyph icon={ArrowRight} size={16} className="opacity-60 transition-opacity group-hover:opacity-100" /> : null}
    </Link>
  );
}
