"use client";
import { useEffect, useState } from "react";

const greetings = [
  { word: "Hello",       lang: "English" },
  { word: "नमस्ते",      lang: "Hindi" },
  { word: "Hola",        lang: "Spanish" },
  { word: "Bonjour",     lang: "French" },
  { word: "こんにちは",  lang: "Japanese" },
  { word: "你好",        lang: "Chinese" },
  { word: "Ciao",        lang: "Italian" },
  { word: "Olá",         lang: "Portuguese" },
  { word: "Hallo",       lang: "German" },
  { word: "مرحبا",       lang: "Arabic" },
];

const DURATION = 260; // ms per greeting

export default function LoadingScreen() {
  const [idx, setIdx]         = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone]       = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (gone) return;

    if (idx < greetings.length - 1) {
      const t = setTimeout(() => {
        setIdx(i => i + 1);
        setAnimKey(k => k + 1);
      }, DURATION);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setExiting(true);
        document.body.style.overflow = "";
        setTimeout(() => setGone(true), 650);
      }, DURATION + 120);
      return () => clearTimeout(t);
    }
  }, [idx, gone]);

  if (gone) return null;

  const progress = ((idx + 1) / greetings.length) * 100;

  return (
    <>
      <style>{`
        @keyframes greet-in {
          from { opacity: 0; transform: translateY(22px) scaleY(0.92); }
          to   { opacity: 1; transform: translateY(0)   scaleY(1); }
        }
        @keyframes lang-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 0.35; transform: translateY(0); }
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
          opacity: exiting ? 0 : 1,
          transition: exiting ? "opacity 0.65s cubic-bezier(0.4,0,0.2,1)" : "none",
          pointerEvents: exiting ? "none" : "all",
        }}
      >
        {/* Corner mark */}
        <div style={{
          position: "absolute",
          top: 28,
          left: 28,
          fontFamily: "var(--font-bebas)",
          fontSize: 22,
          letterSpacing: "0.12em",
          color: "var(--gold)",
        }}>
          SP.
        </div>

        {/* Greeting */}
        <div style={{ textAlign: "center", userSelect: "none" }}>
          <p
            key={animKey}
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(3.5rem, 13vw, 10rem)",
              color: "#c9a84c",
              letterSpacing: "0.05em",
              lineHeight: 1,
              animation: `greet-in ${DURATION * 0.7}ms cubic-bezier(0.22,1,0.36,1) forwards`,
              marginBottom: 10,
            }}
          >
            {greetings[idx].word}
          </p>
          <p
            key={`lang-${animKey}`}
            style={{
              fontSize: 11,
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              animation: `lang-in ${DURATION * 0.6}ms ease forwards`,
            }}
          >
            {greetings[idx].lang}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "rgba(255,255,255,0.06)",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, var(--gold), var(--gold-light))",
            transition: `width ${DURATION}ms linear`,
          }} />
        </div>

        {/* Counter */}
        <div style={{
          position: "absolute",
          bottom: 24,
          right: 28,
          fontFamily: "var(--font-bebas)",
          fontSize: 13,
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.18)",
        }}>
          {String(idx + 1).padStart(2, "0")} / {greetings.length}
        </div>
      </div>
    </>
  );
}
