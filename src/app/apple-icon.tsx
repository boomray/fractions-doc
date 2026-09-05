import { ImageResponse } from "next/og";
import { MARK_RATIO, markLargeDataUri } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the white mark on a light plate. iOS rounds the corners. */
export default async function AppleIcon() {
  const mark = await markLargeDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 40%, #ffffff 0%, #e9e9ec 55%, #d6d6dc 100%)",
        }}
      >
        <div style={{ display: "flex", padding: 4, borderRadius: 999, background: "rgba(0,0,0,0.06)" }}>
          <img src={mark} alt="" width={Math.round(120 * MARK_RATIO)} height={120} />
        </div>
      </div>
    ),
    size,
  );
}
