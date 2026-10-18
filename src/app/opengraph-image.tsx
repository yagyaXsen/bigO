import { ImageResponse } from "next/og";

/* Social share card in the site's palette: cream paper, ink text, one accent rule */

export const alt = "bigO — Custom software and AI automation for growing businesses";
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
          background: "#f4efe6",
          color: "#1b1915",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 56, letterSpacing: -1 }}>bigO</div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: "#6d675c", fontFamily: "monospace" }}>
            SOFTWARE &amp; AI AUTOMATION
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 2, width: 96, background: "#2e4c8c", marginBottom: 36 }} />
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 980 }}>
            Custom software and AI automation for growing businesses.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
