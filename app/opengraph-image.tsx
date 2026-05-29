import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sahil Pal — Software Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid texture overlay — subtle dots */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(201,168,76,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          display: "flex",
        }} />

        {/* Top-left corner accent */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 180, height: 2,
          background: "linear-gradient(to right, #c9a84c, transparent)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 2, height: 180,
          background: "linear-gradient(to bottom, #c9a84c, transparent)",
          display: "flex",
        }} />

        {/* Bottom-right corner accent */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 180, height: 2,
          background: "linear-gradient(to left, #c9a84c, transparent)",
          display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 2, height: 180,
          background: "linear-gradient(to top, #c9a84c, transparent)",
          display: "flex",
        }} />

        {/* SP monogram */}
        <div style={{
          fontSize: 18,
          letterSpacing: "0.3em",
          color: "rgba(201,168,76,0.55)",
          textTransform: "uppercase",
          marginBottom: 48,
          display: "flex",
        }}>
          SP.
        </div>

        {/* Name */}
        <div style={{
          fontSize: 96,
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          marginBottom: 8,
          display: "flex",
        }}>
          SAHIL{" "}
          <span style={{ color: "#c9a84c" }}>PAL</span>
        </div>

        {/* Gold line */}
        <div style={{
          width: 80, height: 2,
          background: "linear-gradient(to right, #c9a84c, #e8c97a)",
          margin: "28px 0",
          display: "flex",
        }} />

        {/* Title */}
        <div style={{
          fontSize: 24,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 40,
          display: "flex",
        }}>
          Software Engineer · Full Stack Developer
        </div>

        {/* Stack chips */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Next.js", "Node.js", "Supabase", "PostgreSQL", "React"].map(s => (
            <div key={s} style={{
              fontSize: 13,
              letterSpacing: "0.15em",
              color: "rgba(201,168,76,0.7)",
              border: "1px solid rgba(201,168,76,0.25)",
              padding: "6px 14px",
              display: "flex",
            }}>
              {s}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div style={{
          position: "absolute",
          bottom: 48, right: 80,
          fontSize: 14,
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.18)",
          display: "flex",
        }}>
          sahilpal.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
