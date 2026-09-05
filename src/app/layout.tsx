import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { THEME_SCRIPT } from "@/components/layout/theme";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, X_HANDLE } from "@/lib/site";
import "./globals.css";

/** One voice: Inter, weight 400 almost everywhere. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  // `icon.tsx`, `apple-icon.tsx` and `opengraph-image.tsx` beside this file
  // register themselves.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: X_HANDLE,
    creator: X_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variable lives on <html> so `--font-sans` in globals.css can
    // resolve it at the root.
    <html lang="en" dir="ltr" className={sans.variable} suppressHydrationWarning>
      <head>
        <meta id="fractions-theme-color" name="theme-color" content="#f4f4f4" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="isolate antialiased">{children}</body>
    </html>
  );
}
