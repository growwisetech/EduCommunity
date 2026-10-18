import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.name;
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
          justifyContent: "center",
          padding: 80,
          background: "#002957",
          color: "white",
        }}
      >
        <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: "#F6802F" }} />
          <div style={{ width: 56, height: 56, borderRadius: 28, background: "#008994" }} />
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1 }}>{site.name}</div>
        <div style={{ fontSize: 34, marginTop: 24, color: "rgba(255,255,255,0.85)", maxWidth: 900 }}>
          {site.mission}
        </div>
      </div>
    ),
    size
  );
}
