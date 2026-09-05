import { ImageResponse } from "next/og";
import { MARK_RATIO, markLargeDataUri } from "@/lib/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** The favicon: the white mark on a soft light plate so it reads on any tab bar. */
export default async function Icon() {
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
          borderRadius: 112,
        }}
      >
        <div style={{ display: "flex", padding: 8, borderRadius: 999, background: "rgba(0,0,0,0.06)" }}>
          <img src={mark} alt="" width={Math.round(340 * MARK_RATIO)} height={340} />
        </div>
      </div>
    ),
    size,
  );
}
