import { ImageResponse } from "next/og";
import { personal } from "@/data/personal";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${personal.name} — ${personal.title}`;

export function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1224",
          color: "#f4f7ff",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#7dd3fc" }}>
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>{personal.name}</div>
          <div style={{ display: "flex", fontSize: 36, color: "#c9d4ea", marginTop: 16 }}>{personal.title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#93a4c4" }}>
          <div style={{ display: "flex" }}>{personal.location}</div>
          <div style={{ display: "flex" }}>{personal.experienceLabel} experience</div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
