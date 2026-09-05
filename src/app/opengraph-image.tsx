import { ImageResponse } from "next/og";
import { MARK_RATIO, OG_BACKGROUND, WORDMARK_RATIO, markDataUri, wordmarkDataUri } from "@/lib/og";
import { OG_SIZE } from "@/lib/site";

/** The one card every docs link unfurls to: the mark, the wordmark, "Docs". */
export const alt = "fractions.fi Docs";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [mark, wordmark] = await Promise.all([markDataUri(), wordmarkDataUri()]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: OG_BACKGROUND,
          color: "#111111",
          fontFamily: "Inter, Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <img src={mark} alt="" width={Math.round(200 * MARK_RATIO)} height={200} style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.18))" }} />
          <img src={wordmark} alt="" width={Math.round(180 * WORDMARK_RATIO)} height={180} style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.18))" }} />
          <span style={{ fontSize: 96, color: "rgba(17,17,17,0.55)", marginLeft: 8 }}>Docs</span>
        </div>
        <span style={{ fontSize: 30, color: "rgba(17,17,17,0.55)" }}>How fractions.fi works, page by page.</span>
      </div>
    ),
    size,
  );
}
