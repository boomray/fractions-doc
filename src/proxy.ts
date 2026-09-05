import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, gateToken, safeEqual } from "@/lib/site-gate";

/**
 * Site-wide password gate.
 *
 * FAILS CLOSED, deliberately. If `SITE_PASSWORD` is missing or empty the whole
 * site returns 503 — it does NOT fall through to an open site. A gate that
 * silently disables itself when its config is absent is worse than no gate,
 * because the one time it matters is the one time someone forgot the variable.
 *
 * The cookie never carries the password. It carries a SHA-256 of the password
 * plus a fixed salt, so reading the cookie off a device does not hand anyone
 * the shared secret, and the value rotates automatically when the password
 * changes (every old cookie stops verifying).
 *
 * This is a deploy-preview shield, not authentication. It is one shared secret
 * with no identity, no per-user revocation and no rate limiting beyond what the
 * host provides. Do not let it grow into the login system.
 */

/**
 * What a crawler, a link unfurler or a browser needs BEFORE anyone types the
 * password: robots, the sitemap, the manifest, the favicons and the OpenGraph
 * cards (the site's at `/opengraph-image`, each page's at `/og/<id>`). None of
 * them carry page content beyond a title and a one-line description, and a
 * gated OpenGraph card is a broken image on every shared link.
 */
const PUBLIC_ASSET =
  /^\/(robots\.txt|sitemap\.xml|manifest\.webmanifest|icon(-[a-z0-9]+)?(\.png|\.svg)?|apple-icon(-[a-z0-9]+)?(\.png)?)$|\/(opengraph-image|twitter-image)(-[a-z0-9]+)?(\.png)?$|^\/og\/[a-z0-9-]+\/[a-z0-9-]+$/;

export async function proxy(request: NextRequest) {
  // The public launch switch. Explicit and loud: the gate is off only when
  // someone sets SITE_GATE=off, never because the password went missing.
  if (process.env.SITE_GATE === "off") {
    return NextResponse.next();
  }

  const password = process.env.SITE_PASSWORD;

  // No secret configured: nothing is reachable. This is the whole point.
  if (!password) {
    return new NextResponse(
      "This deployment is not configured. SITE_PASSWORD is unset, so the site is sealed.",
      { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }

  const expected = await gateToken(password);
  const presented = request.cookies.get(GATE_COOKIE)?.value;
  if (presented && safeEqual(presented, expected)) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  // The gate itself and the endpoint that opens it stay reachable, or there is
  // no way in. Everything else, including every other API route, does not.
  if (pathname === "/gate" || pathname === "/api/gate" || PUBLIC_ASSET.test(pathname)) {
    return NextResponse.next();
  }

  const gate = request.nextUrl.clone();
  gate.pathname = "/gate";
  gate.search = "";
  gate.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(gate);
}

export const config = {
  /**
   * Static assets are excluded so the gate page can style itself; they carry no
   * secrets. Every page, every route handler and every data fetch still goes
   * through the check above.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|woff2?)$).*)",
  ],
};
