import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 60,
          background: "linear-gradient(135deg, #000 0%, #0b1220 100%)",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "8px 14px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.04)",
            fontSize: 22,
            color: "#9ca3af",
            marginBottom: 24,
            width: "fit-content",
          }}
        >
          AI Integration & Automation Consulting
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: -1 }}>
          FIELDPORTER
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 36,
            fontWeight: 600,
            color: "#d1d5db",
          }}
        >
          Build Your Own AI Advantage
        </div>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#3B82F6",
              boxShadow: "0 0 24px rgba(59,130,246,0.6)",
            }}
          />
          <div style={{ fontSize: 26, color: "#9ca3af" }}>fieldporter.com</div>
        </div>
      </div>
    ),
    size,
  );
}
