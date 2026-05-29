import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sahil Pal — Software Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const imageData = await fetch(
    new URL("/sahil.jpeg", "https://sahil-pal.dev")
  )
    .then((r) => r.arrayBuffer())
    .catch(() => null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          backgroundImage: "radial-gradient(rgba(201,168,76,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* Top-left corner */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 160, height: 2, background: "linear-gradient(to right, #c9a84c, transparent)", display: "flex" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: 2, height: 160, background: "linear-gradient(to bottom, #c9a84c, transparent)", display: "flex" }} />

        {/* Bottom-right corner */}
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 160, height: 2, background: "linear-gradient(to left, #c9a84c, transparent)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 2, height: 160, background: "linear-gradient(to top, #c9a84c, transparent)", display: "flex" }} />

        {/* Left: text content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: 1, paddingRight: 60 }}>
          {/* SP monogram */}
          <div style={{ fontSize: 15, letterSpacing: "0.35em", color: "rgba(201,168,76,0.5)", marginBottom: 40, display: "flex" }}>
            SP.
          </div>

          {/* Name */}
          <div style={{ fontSize: 88, fontWeight: 700, color: "#ffffff", lineHeight: 0.9, letterSpacing: "-0.02em", display: "flex", flexWrap: "wrap" }}>
            SAHIL&nbsp;<span style={{ color: "#c9a84c" }}>PAL</span>
          </div>

          {/* Gold line */}
          <div style={{ width: 64, height: 2, background: "linear-gradient(to right, #c9a84c, #e8c97a)", margin: "28px 0", display: "flex" }} />

          {/* Title */}
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.45)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 36, display: "flex" }}>
            Software Engineer · Full Stack Developer
          </div>

          {/* Stack chips */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Next.js", "Node.js", "Supabase", "PostgreSQL"].map((s) => (
              <div key={s} style={{
                fontSize: 12, letterSpacing: "0.14em",
                color: "rgba(201,168,76,0.75)",
                border: "1px solid rgba(201,168,76,0.25)",
                padding: "5px 12px", display: "flex",
              }}>
                {s}
              </div>
            ))}
          </div>

          {/* URL */}
          <div style={{ marginTop: 40, fontSize: 13, letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", display: "flex" }}>
            sahil-pal.dev
          </div>
        </div>

        {/* Right: photo */}
        {imageData && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            {/* Outer gold ring */}
            <div style={{
              width: 280, height: 280,
              borderRadius: "50%",
              border: "2px solid rgba(201,168,76,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(201,168,76,0.05)",
            }}>
              <img
                src={imageData as unknown as string}
                width={260}
                height={260}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
