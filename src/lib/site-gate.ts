/**
 * Shared bits of the site password gate, so the middleware (edge runtime) and
 * the unlock route handler agree on the cookie name and the token derivation.
 *
 * Web Crypto only — no `node:crypto` — because the middleware runs on the edge.
 */

export const GATE_COOKIE = "fractions_gate";

/** Bumping this salt invalidates every issued cookie. */
const SALT = "fractions/site-gate/v1";

/**
 * The cookie value. Never the password itself: reading this off a device does
 * not hand anyone the shared secret, and changing the password automatically
 * stops every previously issued cookie from verifying.
 */
export async function gateToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${SALT}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Constant-time compare. Always used on two hex digests, so both sides are the
 * same length and a wrong guess cannot be narrowed down by timing.
 */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
