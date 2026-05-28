"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setPct((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 9998, background: "rgba(255,255,255,0.04)" }}>
      <div style={{
        height: "100%",
        width: `${pct}%`,
        background: "linear-gradient(to right, var(--gold), var(--gold-light))",
        transition: "width 0.08s linear",
        boxShadow: "0 0 8px rgba(201,168,76,0.6)",
      }} />
    </div>
  );
}
