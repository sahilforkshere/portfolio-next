"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "gone">("enter");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // letters finish revealing ~600ms → hold
    const t1 = setTimeout(() => setPhase("hold"), 600);
    // line finishes drawing ~1000ms → brief hold then exit
    const t2 = setTimeout(() => setPhase("exit"), 1400);
    // fully gone after fade
    const t3 = setTimeout(() => {
      setPhase("gone");
      document.body.style.overflow = "";
    }, 2050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <>
      <style>{`
        @keyframes revealUp {
          from { clip-path: inset(100% 0 0 0); opacity: 0; }
          to   { clip-path: inset(0% 0 0 0);   opacity: 1; }
        }
        @keyframes drawLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fadeSubtitle {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity:    phase === "exit" ? 0 : 1,
          transform:  phase === "exit" ? "scale(1.04)" : "scale(1)",
          transition: phase === "exit"
            ? "opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)"
            : "none",
          pointerEvents: phase === "exit" ? "none" : "all",
        }}
      >
        {/* Corner mark */}
        <div style={{
          position: "absolute",
          top: 28, left: 28,
          fontFamily: "var(--font-bebas)",
          fontSize: 13,
          letterSpacing: "0.35em",
          color: "rgba(201,168,76,0.4)",
          textTransform: "uppercase",
        }}>
          Portfolio
        </div>

        {/* Initials */}
        <div style={{ position: "relative", userSelect: "none", textAlign: "center" }}>
          {/* S and P reveal from bottom */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.04em", lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(7rem, 22vw, 18rem)",
                color: "#fff",
                letterSpacing: "-0.02em",
                animation: "revealUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both",
                display: "block",
              }}
            >
              S
            </span>
            <span
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(7rem, 22vw, 18rem)",
                color: "var(--gold)",
                letterSpacing: "-0.02em",
                animation: "revealUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.22s both",
                display: "block",
              }}
            >
              P
            </span>
          </div>

          {/* Gold underline draws left to right */}
          <div
            style={{
              height: 2,
              background: "linear-gradient(to right, var(--gold), var(--gold-light))",
              transformOrigin: "left",
              animation: "drawLine 0.5s cubic-bezier(0.22,1,0.36,1) 0.65s both",
              marginTop: 6,
            }}
          />

          {/* Subtitle fades in */}
          <p
            style={{
              marginTop: 18,
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              fontFamily: "var(--font-inter, sans-serif)",
              animation: "fadeSubtitle 0.5s ease 1s both",
            }}
          >
            Sahil Pal
          </p>
        </div>

        {/* Bottom progress line */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 1,
          background: "rgba(255,255,255,0.05)",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(to right, var(--gold), var(--gold-light))",
            transformOrigin: "left",
            animation: "drawLine 1.3s cubic-bezier(0.22,1,0.36,1) 0.1s both",
          }} />
        </div>
      </div>
    </>
  );
}
