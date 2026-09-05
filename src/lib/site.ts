/** Where this site is served. Canonical URLs, the sitemap and the cards read it. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.fractions.fi").replace(/\/$/, "");
/** Where "Open the app" and every app link point. */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.fractions.fi").replace(/\/$/, "");

export const SITE_NAME = "fractions.fi Docs";
export const SITE_TITLE = "fractions.fi Docs";
export const SITE_DESCRIPTION =
  "How fractions.fi works: what an index is, how to buy, sell and create one, how the price and fees work, and where the contracts live.";
/** The product's X account. */
export const X_URL = (process.env.NEXT_PUBLIC_X_URL ?? "https://x.com/fractionsfi").replace(/\/$/, "");
export const X_HANDLE = process.env.NEXT_PUBLIC_X_HANDLE ?? "@fractionsfi";
export const OG_SIZE = { width: 1200, height: 630 } as const;
