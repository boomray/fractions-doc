import { ImageResponse } from "next/og";
import { OG_COLORS, WORDMARK_RATIO, wordmarkDataUri } from "@/lib/og";
import { OG_SIZE } from "@/lib/site";

/**
 * The one card every docs link unfurls to: the wordmark top-left on a dark
 * plate, the page's title and description beneath, "Docs · <title>" along the
 * bottom. Only the wordmark, never the mark; no shadow on it.
 */

const WORDMARK_WIDTH = 420;

/** Keep a long description to roughly two lines at 30px. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/[\s,;:.]+\S*$/, "")}…`;
}

export function docsCard({ title, description }: { title: string; description: string }): Promise<ImageResponse> {
  return wordmarkDataUri().then(
    (wordmark) =>
      new ImageResponse(
        (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "64px 80px 56px",
              background: OG_COLORS.background,
              color: OG_COLORS.foreground,
              fontFamily: "Inter, Helvetica, Arial, sans-serif",
              fontWeight: 400,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
              <img src={wordmark} alt="" width={WORDMARK_WIDTH} height={Math.round(WORDMARK_WIDTH / WORDMARK_RATIO)} />
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <span style={{ fontSize: 60, lineHeight: 1.1, letterSpacing: -1 }}>{clip(title, 60)}</span>
                <span style={{ fontSize: 30, lineHeight: 1.35, color: OG_COLORS.muted }}>{clip(description, 150)}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: OG_COLORS.muted }}>
              <span style={{ color: OG_COLORS.accent }}>Docs</span>
              <span>·</span>
              <span>{clip(title, 70)}</span>
            </div>
          </div>
        ),
        OG_SIZE,
      ),
  );
}
