import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ground Truth // Archive";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: "60px 80px",
          border: "16px solid #F7F4FD",
        }}
      >
        {/* Header strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #E3DCF5",
            paddingBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: "#5A2FC2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#36178A",
              }}
            >
              GROUND TRUTH // ARCHIVE
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#E9E2FA",
              padding: "6px 16px",
              borderRadius: "2px",
              fontFamily: "monospace",
              fontSize: "16px",
              color: "#36178A",
            }}
          >
            =INDEX(issues, 1..2)
          </div>
        </div>

        {/* Center Title in Serif */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "24px 0" }}>
          <div
            style={{
              fontFamily: "serif",
              fontSize: "64px",
              lineHeight: 1.12,
              color: "#17112B",
              fontWeight: 400,
            }}
          >
            Issue Archive
          </div>

          <div
            style={{
              fontFamily: "serif",
              fontStyle: "italic",
              fontSize: "26px",
              color: "#5E5675",
              lineHeight: 1.4,
              maxWidth: "980px",
            }}
          >
            Every Ground Truth dispatch, one sheet per issue.
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #E3DCF5",
            paddingTop: "20px",
            fontFamily: "monospace",
            fontSize: "16px",
            color: "#5E5675",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <span>UPDATED: OCTOBER 2026</span>
            <span>FORMAT: WORKBOOK ARCHIVE</span>
          </div>
          <span style={{ color: "#36178A", fontWeight: 600 }}>
            BY GROUND TRUTH EDITORIAL
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
