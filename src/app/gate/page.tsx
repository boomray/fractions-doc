import type { Metadata } from "next";
import { BrandMark, BrandWordmark } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Enter password",
  robots: { index: false, follow: false },
};

/**
 * The gate. Deliberately says nothing about what is behind it — no product
 * copy, no page names, no nav. An unauthorised visitor should learn only
 * that a password exists.
 */
export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next = "/", error } = await searchParams;

  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <form
        action="/api/gate"
        method="POST"
        className="card-surface flex w-full max-w-[380px] flex-col gap-5 rounded-[var(--radius-float)] p-7"
      >
        <div className="flex flex-col items-center gap-3">
          <BrandMark height={56} priority />
          <BrandWordmark height={22} priority />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-xl leading-tight font-normal">Password required</h1>
          <p className="text-sm text-pretty text-[var(--color-foreground-secondary)]">This deployment is not public yet.</p>
        </div>

        <input type="hidden" name="next" value={next} />

        <input
          type="password"
          name="password"
          autoFocus
          required
          autoComplete="current-password"
          placeholder="Password"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "gate-error" : undefined}
          className="well-surface min-h-[46px] w-full rounded-[var(--radius-input)] px-3.5 text-md text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-foreground-muted)] focus:shadow-[var(--glass-inset),0_0_0_3px_rgb(212_252_80/0.16),inset_0_0_0_1px_rgb(212_252_80/0.95)]"
        />

        {error ? (
          <p
            id="gate-error"
            role="alert"
            className="rounded-[var(--radius-input)] bg-[var(--color-danger-subtle)] px-3.5 py-2.5 text-sm text-[var(--color-danger)]"
          >
            That password is not correct.
          </p>
        ) : null}

        <button
          type="submit"
          className="min-h-[56px] w-full rounded-[var(--radius-panel)] bg-[var(--color-accent)] text-md font-medium text-[var(--color-accent-foreground)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:bg-[var(--color-accent-hover)]"
        >
          Enter
        </button>
      </form>
    </main>
  );
}
