import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/**
 * Generates a branded OG image with a title and optional subtitle.
 * Used by opengraph-image.tsx files across dynamic routes.
 */
export function generateOGImage(params: {
  title: string;
  subtitle?: string;
  icon?: string;
}) {
  const { title, subtitle, icon } = params;

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
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a1145 50%, #0f0c29 100%)",
          fontFamily: "sans-serif",
          padding: "60px 80px",
        }}
      >
        {/* Icon */}
        {icon && (
          <div
            style={{
              fontSize: 80,
              marginBottom: 16,
              display: "flex",
            }}
          >
            {icon}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? 42 : 56,
            fontWeight: 800,
            color: "#fbbf24",
            textAlign: "center",
            lineHeight: 1.2,
            display: "flex",
            maxWidth: "100%",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: 24,
              color: "#c4b5fd",
              marginTop: 20,
              textAlign: "center",
              display: "flex",
              maxWidth: "90%",
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Brand footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#f59e0b",
              display: "flex",
              border: "3px solid #f59e0b",
              borderRadius: 8,
              padding: "2px 8px",
            }}
          >
            AP
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#e2e0ff",
              display: "flex",
            }}
          >
            AstroPut
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#8b5cf6",
              marginLeft: 8,
              display: "flex",
            }}
          >
            astroput.com
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
