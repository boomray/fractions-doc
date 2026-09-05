import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, gateToken, safeEqual } from "@/lib/site-gate";

/**
 * Opens the site gate. See `src/middleware.ts` for why this exists and what it
 * is not. Fails closed the same way the middleware does: with no configured
 * password there is no correct answer, so nothing can unlock.
 */

export async function POST(request: NextRequest) {
  const configured = process.env.SITE_PASSWORD;
  if (!configured) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const form = await request.formData();
  const supplied = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/");

  // Compare hashes, not raw strings: equal length regardless of what was typed.
  const [a, b] = await Promise.all([gateToken(supplied), gateToken(configured)]);
  if (!safeEqual(a, b)) {
    const retry = new URL("/gate", request.url);
    retry.searchParams.set("next", next);
    retry.searchParams.set("error", "1");
    return NextResponse.redirect(retry, { status: 303 });
  }

  // Only ever redirect to a path on this origin — never to an attacker's URL.
  const destination = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  const response = NextResponse.redirect(new URL(destination, request.url), { status: 303 });
  response.cookies.set(GATE_COOKIE, b, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
