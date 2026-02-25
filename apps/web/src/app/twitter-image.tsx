import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "AstroPut - Astrologija na srpskom";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0c29 0%, #1a1145 50%, #0f0c29 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#f59e0b",
            marginBottom: 16,
            display: "flex",
            border: "4px solid #f59e0b",
            borderRadius: 16,
            padding: "8px 24px",
          }}
        >
          AP
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            background: "linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          AstroPut
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#c4b5fd",
            marginTop: 16,
            display: "flex",
          }}
        >
          Astrologija na srpskom. Precizno, besplatno, detaljno.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#8b5cf6",
            display: "flex",
            gap: 32,
          }}
        >
          <span style={{ display: "flex" }}>600+ clanaka</span>
          <span style={{ display: "flex" }}>•</span>
          <span style={{ display: "flex" }}>Natalne karte</span>
          <span style={{ display: "flex" }}>•</span>
          <span style={{ display: "flex" }}>Dnevni horoskop</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
