import { ImageResponse } from "next/og";

/* Social share card: brand wordmark + tagline in the site's light palette */

export const alt = "bigO — Digital Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#eeeae8",
          color: "#121212",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#575960" }}>
          DIGITAL STUDIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 220, fontWeight: 700, letterSpacing: -8, lineHeight: 1 }}>
            bigO
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 44, color: "#575960" }}>
            We build, run &amp; grow your business online.
          </div>
        </div>
        <div style={{ display: "flex", height: 8, width: 160, background: "#002bba" }} />
      </div>
    ),
    size,
  );
}
