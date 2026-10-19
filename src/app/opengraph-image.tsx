import { ImageResponse } from "next/og";

/* Social share card: paper, ink headline, the O ring, one orange underline */

export const alt = "bigO — Every business has a slow part. We write the software that fixes it.";
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
          padding: "70px 80px",
          background: "#f7f6f2",
          color: "#121110",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 56, fontWeight: 700, letterSpacing: -2 }}>
          big
          <div style={{ display: "flex", width: 40, height: 40, marginLeft: 3, borderRadius: 9999, border: "8px solid #121110" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>
            Every business has a slow part.
          </div>
          <div style={{ display: "flex", height: 8, width: 360, background: "#e8541a", marginTop: 6, marginLeft: 420 }} />
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, marginTop: 10 }}>
            We write the software that fixes it.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#75726a" }}>Web apps · Client portals · AI assistants · Automation — Delhi NCR</div>
      </div>
    ),
    size,
  );
}
