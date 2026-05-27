"use client";
import { useState } from "react";

/* ── Music icon with live equalizer ── */
function MusicCard({ active }: { active: boolean }) {
  const bars = [55, 88, 38, 100, 60, 80, 42];
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Headphones SVG */}
      <svg viewBox="0 0 120 85" className="w-28 h-auto">
        {/* Band */}
        <path d="M14 52 Q14 14 60 14 Q106 14 106 52"
          stroke="rgba(255,255,255,0.45)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        {/* Left cup */}
        <rect x="4" y="46" width="22" height="32" rx="9"
          fill={active ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)"}
          stroke={active ? "rgba(167,139,250,0.8)" : "rgba(255,255,255,0.2)"}
          strokeWidth="1.8"
          style={{ transition: "all 0.4s" }} />
        {/* Right cup */}
        <rect x="94" y="46" width="22" height="32" rx="9"
          fill={active ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)"}
          stroke={active ? "rgba(167,139,250,0.8)" : "rgba(255,255,255,0.2)"}
          strokeWidth="1.8"
          style={{ transition: "all 0.4s" }} />
        {/* Cord */}
        <path d="M60 78 Q60 85 60 85" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
        {/* Note indicator */}
        {active && <circle cx="60" cy="52" r="5" fill="rgba(167,139,250,0.4)" style={{ animation: "hbPulse 1s ease-in-out infinite" }} />}
      </svg>

      {/* Equalizer bars */}
      <div className="flex items-end gap-1.5" style={{ height: 44 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-2.5 rounded-sm"
            style={{
              background: active
                ? `rgba(167,139,250,${0.5 + i * 0.07})`
                : "rgba(255,255,255,0.12)",
              height: active ? `${h}%` : "20%",
              transition: `height 0.15s ease ${i * 0.05}s, background 0.3s`,
              animation: active ? `hbEq${i} ${0.55 + i * 0.08}s ease-in-out infinite alternate` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Football icon with bounce + spin ── */
function FootballCard({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div style={{ animation: active ? "hbBounce 0.7s ease-in-out infinite alternate" : "none" }}>
        <svg
          viewBox="0 0 100 100"
          className="w-28 h-28"
          style={{ animation: active ? "hbSpin 1.4s linear infinite" : "none" }}
        >
          {/* Ball */}
          <circle cx="50" cy="50" r="46"
            fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          {/* Pentagon patches */}
          <polygon points="50,8 62,30 85,28 78,50 94,64 70,70 50,88 30,70 6,64 22,50 15,28 38,30"
            fill="none" stroke="rgba(74,222,128,0.35)" strokeWidth="1.5" />
          {/* Center patch */}
          <polygon points="50,24 62,35 58,49 42,49 38,35"
            fill="rgba(74,222,128,0.12)" stroke="rgba(74,222,128,0.5)" strokeWidth="1.5" />
          {/* Side patches */}
          <polygon points="78,36 90,47 85,62 70,63 66,49"
            fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.4)" strokeWidth="1.5" />
          <polygon points="22,36 10,47 15,62 30,63 34,49"
            fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.4)" strokeWidth="1.5" />
          <polygon points="50,76 64,69 70,82 50,92 30,82 36,69"
            fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.4)" strokeWidth="1.5" />
          {/* Shine */}
          <ellipse cx="35" cy="32" rx="8" ry="6" fill="rgba(255,255,255,0.15)" transform="rotate(-20 35 32)" />
        </svg>
      </div>
      {/* Shadow */}
      <div
        className="rounded-full"
        style={{
          width: 80,
          height: 12,
          background: "rgba(74,222,128,0.08)",
          filter: "blur(6px)",
          transform: active ? "scaleX(0.7)" : "scaleX(1)",
          transition: "transform 0.35s ease",
          animation: active ? "hbShadow 0.7s ease-in-out infinite alternate" : "none",
        }}
      />
    </div>
  );
}

/* ── Sleep icon with floating ZZZs ── */
function SleepCard({ active }: { active: boolean }) {
  return (
    <div className="relative flex flex-col items-center" style={{ height: 150 }}>
      {/* Moon */}
      <svg viewBox="0 0 100 100" className="w-24 h-24 mt-2"
        style={{ filter: active ? "drop-shadow(0 0 16px rgba(96,165,250,0.5))" : "none", transition: "filter 0.5s" }}>
        {/* Crescent */}
        <path d="M60 10 A38 38 0 1 0 60 90 A28 28 0 1 1 60 10Z"
          fill={active ? "rgba(96,165,250,0.2)" : "rgba(255,255,255,0.07)"}
          stroke={active ? "rgba(96,165,250,0.7)" : "rgba(255,255,255,0.2)"}
          strokeWidth="1.8"
          style={{ transition: "all 0.4s" }} />
        {/* Stars */}
        <circle cx="72" cy="22" r={active ? 3 : 2} fill={active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)"}
          style={{ transition: "all 0.3s", animation: active ? "hbStar 1.2s ease-in-out infinite" : "none" }} />
        <circle cx="82" cy="42" r={active ? 2 : 1.5} fill={active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"}
          style={{ transition: "all 0.3s", animation: active ? "hbStar 1.2s ease-in-out infinite 0.4s" : "none" }} />
        <circle cx="78" cy="12" r={active ? 1.5 : 1} fill={active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)"}
          style={{ transition: "all 0.3s", animation: active ? "hbStar 1.2s ease-in-out infinite 0.2s" : "none" }} />
      </svg>

      {/* ZZZ letters */}
      {(["Z", "Z", "Z"] as const).map((z, i) => (
        <span
          key={i}
          className="absolute font-bold select-none"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: 14 + i * 5,
            color: active ? `rgba(96,165,250,${0.7 - i * 0.1})` : "rgba(255,255,255,0.1)",
            right: 28 + i * 16,
            bottom: 10 + i * 10,
            animation: active ? `hbZzz${i} 1.8s ease-in-out infinite ${i * 0.4}s` : "none",
            transition: "color 0.3s",
          }}
        >
          {z}
        </span>
      ))}
    </div>
  );
}

/* ── Main section ── */
const hobbies = [
  {
    key: "music" as const,
    title: "Music",
    label: "Always in my ears",
    desc: "Lo-fi while coding, hip-hop on walks, and anything that hits right in between. Music is the background thread that never pauses.",
    accent: "rgba(167,139,250,0.6)",
    accentBg: "rgba(167,139,250,0.06)",
  },
  {
    key: "football" as const,
    title: "Football",
    label: "Weekend warrior",
    desc: "A good five-a-side fixes everything — including bugs. Nothing beats the pitch after a long week of staring at a screen.",
    accent: "rgba(74,222,128,0.6)",
    accentBg: "rgba(74,222,128,0.05)",
  },
  {
    key: "sleep" as const,
    title: "Sleep",
    label: "Professional recharger",
    desc: "The best debugger I know. Most problems solve themselves overnight. Sleep is not laziness — it is async processing.",
    accent: "rgba(96,165,250,0.6)",
    accentBg: "rgba(96,165,250,0.05)",
  },
];

export default function Hobbies() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <section id="hobbies" className="py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">Off the Clock</span>
        </div>

        <h2
          className="reveal text-5xl md:text-7xl font-light tracking-tight mb-4"
          style={{ transitionDelay: "0.1s" }}
        >
          Life outside
          <br />
          <span style={{ color: "var(--gold)" }}>the code.</span>
        </h2>
        <p
          className="reveal text-sm text-white/35 mb-16 max-w-sm leading-relaxed"
          style={{ transitionDelay: "0.15s" }}
        >
          Hover to see what I get up to when the terminal is closed.
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {hobbies.map((h, i) => {
            const isActive = activeKey === h.key;
            return (
              <div
                key={h.key}
                className="reveal"
                style={{ transitionDelay: `${0.08 * i}s` }}
              >
                <div
                  className="group relative overflow-hidden h-full cursor-pointer"
                  style={{
                    background: isActive ? h.accentBg : "rgba(255,255,255,0.025)",
                    border: `1px solid ${isActive ? h.accent : "rgba(255,255,255,0.07)"}`,
                    transition: "background 0.4s, border-color 0.4s",
                  }}
                  onMouseEnter={() => setActiveKey(h.key)}
                  onMouseLeave={() => setActiveKey(null)}
                >
                  {/* Top illustration area */}
                  <div
                    className="flex items-center justify-center"
                    style={{
                      minHeight: 200,
                      background: isActive ? `${h.accentBg}` : "transparent",
                      transition: "background 0.4s",
                      borderBottom: `1px solid ${isActive ? h.accent : "rgba(255,255,255,0.05)"}`,
                      padding: "2rem 1.5rem",
                    }}
                  >
                    {h.key === "music"    && <MusicCard    active={isActive} />}
                    {h.key === "football" && <FootballCard active={isActive} />}
                    {h.key === "sleep"    && <SleepCard    active={isActive} />}
                  </div>

                  {/* Text area */}
                  <div className="p-6 md:p-8">
                    <p
                      className="text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-300"
                      style={{ color: isActive ? h.accent : "rgba(255,255,255,0.2)" }}
                    >
                      {h.label}
                    </p>
                    <h3
                      className="mb-3 transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-bebas)",
                        fontSize: "2rem",
                        letterSpacing: "0.08em",
                        color: isActive ? "white" : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {h.title}
                    </h3>
                    <p className="text-sm text-white/35 leading-relaxed">{h.desc}</p>

                    {/* Animated underline */}
                    <div
                      className="mt-5 h-px transition-all duration-500 ease-out"
                      style={{
                        background: h.accent,
                        width: isActive ? "100%" : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Equalizer bars ── */
        @keyframes hbEq0 { from{height:20%} to{height:55%} }
        @keyframes hbEq1 { from{height:20%} to{height:88%} }
        @keyframes hbEq2 { from{height:20%} to{height:38%} }
        @keyframes hbEq3 { from{height:20%} to{height:100%} }
        @keyframes hbEq4 { from{height:20%} to{height:60%} }
        @keyframes hbEq5 { from{height:20%} to{height:80%} }
        @keyframes hbEq6 { from{height:20%} to{height:42%} }

        /* ── Headphones pulse ── */
        @keyframes hbPulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.6);opacity:.9} }

        /* ── Football ── */
        @keyframes hbSpin   { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes hbBounce { from{transform:translateY(0)}  to{transform:translateY(-18px)} }
        @keyframes hbShadow { from{transform:scaleX(1) scaleY(1)} to{transform:scaleX(0.55) scaleY(0.6)} }

        /* ── Sleep ZZZs ── */
        @keyframes hbZzz0 { 0%{opacity:0;transform:translate(0,0) scale(0.6)} 30%{opacity:.8} 100%{opacity:0;transform:translate(-12px,-38px) scale(1.1)} }
        @keyframes hbZzz1 { 0%{opacity:0;transform:translate(0,0) scale(0.6)} 30%{opacity:.7} 100%{opacity:0;transform:translate(-8px,-32px) scale(1.2)} }
        @keyframes hbZzz2 { 0%{opacity:0;transform:translate(0,0) scale(0.6)} 30%{opacity:.6} 100%{opacity:0;transform:translate(-4px,-26px) scale(1.3)} }

        /* ── Stars ── */
        @keyframes hbStar { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.5);opacity:1} }
      `}</style>
    </section>
  );
}
