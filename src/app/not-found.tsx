import Link from "next/link";
import { BrandMark } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="card-surface flex w-full max-w-[380px] flex-col items-center gap-4 rounded-[var(--radius-float)] p-7 text-center">
        <BrandMark height={48} />
        <h1 className="text-xl leading-tight">There is no page here</h1>
        <p className="text-sm text-[var(--color-foreground-secondary)]">The link may be old, or the page may have moved.</p>
        <Link
          href="/"
          className="inline-flex h-[39px] items-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-4 text-[15px] font-medium text-[var(--color-accent-foreground)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-accent-hover)]"
        >
          Back to the docs
        </Link>
      </div>
    </main>
  );
}
