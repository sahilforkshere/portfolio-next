"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const HeroBackground = dynamic(() => import("./HeroBackground"), { ssr: false });

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  // Start with real text so server & first client render match (no hydration error)
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 28;
    // Kick off scramble after mount
    const t = setTimeout(() => {
      setDisplay(text.split("").map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
      const id = setInterval(() => {
        frame++;
        setDisplay(text.split("").map((char, i) => {
          if (i < Math.floor((frame / totalFrames) * text.length)) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join(""));
        if (frame >= totalFrames) clearInterval(id);
      }, 40);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return <>{display}</>;
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax: name moves up slower than scroll
  const nameY = scrollY * 0.35;
  // Fade out as user scrolls — use 600 as SSR-safe fallback
  const viewH = typeof window !== "undefined" ? window.innerHeight : 600;
  const heroOpacity = Math.max(0, 1 - scrollY / (viewH * 0.7));

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Three.js particle constellation */}
      <HeroBackground />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 text-center px-4 select-none"
        style={{
          transform: `translateY(${nameY}px)`,
          opacity: heroOpacity,
          willChange: "transform, opacity",
        }}
      >
        {/* Overline */}
        <p className="subtitle-gold mb-6 md:mb-8">
          Full Stack Web Developer
        </p>

        {/* The big name */}
        <h1 className="name-striped" style={{ fontSize: "clamp(72px, 16vw, 260px)" }}>
          <ScrambleText text="SAHIL" delay={200} />
        </h1>
        <h1 className="name-striped" style={{ fontSize: "clamp(72px, 16vw, 260px)" }}>
          <ScrambleText text="PAL" delay={500} />
        </h1>

        {/* Underline */}
        <p className="subtitle-gold mt-6 md:mt-8">
          Software Engineer
        </p>

        {/* ── Open to Work badge ── */}
        <div className="mt-7 flex items-center justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-4 py-2 border transition-all duration-300 group"
            style={{
              borderColor: "rgba(201,168,76,0.28)",
              background: "rgba(201,168,76,0.05)",
              borderRadius: 2,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.55)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(201,168,76,0.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.28)";
              (e.currentTarget as HTMLElement).style.background  = "rgba(201,168,76,0.05)";
            }}
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--gold)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--gold-light)" }}
              />
            </span>
            <span
              className="text-[10px] tracking-[0.22em] uppercase"
              style={{ color: "rgba(201,168,76,0.85)" }}
            >
              Available for freelance &amp; full-time
            </span>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: heroOpacity }}
      >
        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <div
            className="w-px bg-white/30"
            style={{
              height: "200%",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
