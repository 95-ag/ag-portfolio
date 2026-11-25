import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";

export const alt = "Aishwarya Ganesan — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse cannot read CSS variables, so the dark neutrals and the dark accent (DESIGN.md → Foundations → Colors)
// are written out here.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#000000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 48,
            height: 4,
            background: "#f35c5d",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#e9e9e9",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Aishwarya Ganesan
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#f35c5d",
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          AI Engineer
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#b8b8b8",
            letterSpacing: "0.5px",
          }}
        >
          AI Systems · Machine Learning · Computer Vision
        </div>
      </div>
      <div style={{ fontSize: 18, color: "#6a6a6a" }}>
        {SITE_URL.replace(/^https?:\/\//, "")}
      </div>
    </div>,
    { ...size },
  );
}
