/**
 * The limits a creator meets when editing an index page. Copied from the
 * app's `lib/signing.ts`; only the two numbers the docs quote.
 */

/** A signed edit is accepted this long either side of its issue time. */
export const SIGNING_WINDOW_MS = 10 * 60_000;

/** The largest index image an upload may be. */
export const IMAGE_MAX_BYTES = 4 * 1024 * 1024;
