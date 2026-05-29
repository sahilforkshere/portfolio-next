"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(pct > 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 32,
        right: 28,
        zIndex: 9990,
        width: 40,
        height: 40,
        border: "1px solid rgba(201,168,76,0.3)",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.3s ease, transform 0.3s ease, border-color 0.2s, background 0.2s",
        pointerEvents: visible ? "all" : "none",
        borderRadius: 2,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.7)";
        (e.currentTarget as HTMLElement).style.background  = "rgba(201,168,76,0.1)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)";
        (e.currentTarget as HTMLElement).style.background  = "rgba(0,0,0,0.75)";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="rgba(201,168,76,0.85)" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
