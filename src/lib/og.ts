import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Shared pieces for the generated images (favicon, home-screen icon, the
 * OpenGraph card). They run on the server, so the brand PNGs are read
 * straight off disk and embedded as data URIs — `next/og` cannot fetch
 * relative URLs.
 */

const cache = new Map<string, string>();

async function publicPng(relative: string): Promise<string> {
  const cached = cache.get(relative);
  if (cached) return cached;
  const bytes = await readFile(path.join(process.cwd(), "public", relative));
  const uri = `data:image/png;base64,${bytes.toString("base64")}`;
  cache.set(relative, uri);
  return uri;
}

/** The "F" mark (846×922) as a data URI. */
export function markDataUri(): Promise<string> {
  return publicPng("brand/mark-192.png");
}
/** The mark at full size, for icons. */
export function markLargeDataUri(): Promise<string> {
  return publicPng("brand/mark-512.png");
}
/** The "fractions" wordmark (1430×666) as a data URI. */
export function wordmarkDataUri(): Promise<string> {
  return publicPng("brand/wordmark-1x.png");
}

export const MARK_RATIO = 846 / 922;
export const WORDMARK_RATIO = 1430 / 666;

/** The light page with the faint lime tint, so the white marks lift off it. */
export const OG_BACKGROUND =
  "radial-gradient(circle at 12% 0%, rgba(212,252,80,0.22), rgba(0,0,0,0) 46%), linear-gradient(145deg, #f7f9ef 0%, #f4f4f4 60%)";
