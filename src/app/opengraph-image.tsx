import { ImageResponse } from "next/og";

export const alt = "Aishwarya Ganesan — AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0d0d0d",
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
            background: "#2aa566",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#f0f0f0",
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
            color: "#2aa566",
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          AI/ML Engineer
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#707070",
            letterSpacing: "0.5px",
          }}
        >
          AI Systems · Machine Learning · Computer Vision
        </div>
      </div>
      <div style={{ fontSize: 18, color: "#444" }}>ag-portfolio.vercel.app</div>
    </div>,
    { ...size },
  );
}
