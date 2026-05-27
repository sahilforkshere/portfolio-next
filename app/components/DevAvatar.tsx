"use client";
import { useState } from "react";

export default function DevAvatar() {
  const [hovered, setHovered] = useState(false);

  const rays = Array.from({ length: 8 }).map((_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    return { x1: 256 + 30 * Math.cos(a), y1: 82 + 30 * Math.sin(a), x2: 256 + 44 * Math.cos(a), y2: 82 + 44 * Math.sin(a) };
  });

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{ maxWidth: 300 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
        <defs>
          <filter id="avGlow">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="scrClip">
            <rect x="107" y="207" width="106" height="66" rx="2" />
          </clipPath>
        </defs>

        {/* ── DESK ── */}
        <rect x="18" y="304" width="284" height="10" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="38" y="314" width="8" height="56" rx="3" fill="rgba(255,255,255,0.03)" />
        <rect x="274" y="314" width="8" height="56" rx="3" fill="rgba(255,255,255,0.03)" />

        {/* ── CHAIR BACK ── */}
        <rect x="76" y="250" width="168" height="55" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* ── BODY / HOODIE (drawn before screen so screen is on top) ── */}
        <path d="M116 260 C105 275 96 290 94 300 L226 300 C224 290 215 275 204 260 Q196 248 160 248 Q124 248 116 260Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <rect x="146" y="270" width="28" height="20" rx="5" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="154" y1="260" x2="152" y2="270" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="166" y1="260" x2="168" y2="270" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* ── LAPTOP SCREEN (on top of body) ── */}
        <rect x="96" y="197" width="128" height="96" rx="7" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
        <rect x="103" y="203" width="114" height="84" rx="4" fill="#060612" />
        <circle cx="160" cy="200" r="2" fill="rgba(255,255,255,0.1)" />
        <rect x="106" y="291" width="108" height="6" rx="2" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

        {/* Screen code lines */}
        <g clipPath="url(#scrClip)">
          <rect x="109" y="210" width="58" height="4" rx="2" fill="rgba(74,222,128,0.75)" />
          <rect x="109" y="219" width="84" height="4" rx="2" fill="rgba(96,165,250,0.6)" />
          <rect x="109" y="228" width="46" height="4" rx="2" fill="rgba(249,168,212,0.55)" />
          <rect x="109" y="237" width="68" height="4" rx="2" fill="rgba(96,165,250,0.45)" />
          <rect x="109" y="246" width="36" height="4" rx="2" fill="rgba(74,222,128,0.4)" />
          <rect x="109" y="255" width="50" height="4" rx="2" fill="rgba(201,168,76,0.5)" className="av-typing-line" style={{ transformOrigin: "109px 257px" }} />
          {hovered && <rect x="109" y="264" width="60" height="4" rx="2" fill="rgba(96,165,250,0.4)" className="av-fadein" />}
          {/* Cursor */}
          <rect x="161" y="254" width="3" height="6" rx="1" fill="#c9a84c" className={hovered ? "av-blink-fast" : "av-blink"} />
          {hovered && <rect x="103" y="203" width="114" height="84" rx="4" fill="rgba(201,168,76,0.03)" className="av-glow-screen" />}
        </g>

        {/* ── NECK ── */}
        <rect x="151" y="241" width="18" height="12" rx="4" fill="rgba(255,235,210,0.1)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        {/* ── HEAD ── */}
        <ellipse cx="160" cy="197" rx="37" ry="41" fill="rgba(255,235,210,0.07)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {/* ── HAIR ── */}
        <path d="M125 198 Q124 162 142 152 Q152 143 160 148 Q168 141 178 148 Q194 156 196 174 Q198 188 196 200"
          fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <path d="M131 175 Q129 164 136 168" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M143 153 Q141 143 148 147" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M160 148 Q158 138 164 143" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M175 149 Q177 140 182 144" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M124 192 Q119 197 124 206" fill="rgba(255,235,210,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <path d="M196 192 Q201 197 196 206" fill="rgba(255,235,210,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* ── GLASSES ── */}
        <rect x="136" y="191" width="22" height="15" rx="5" fill="rgba(20,20,50,0.6)" stroke="rgba(201,168,76,0.8)" strokeWidth="1.5" />
        <rect x="162" y="191" width="22" height="15" rx="5" fill="rgba(20,20,50,0.6)" stroke="rgba(201,168,76,0.8)" strokeWidth="1.5" />
        <path d="M158 198.5 L162 198.5" stroke="rgba(201,168,76,0.8)" strokeWidth="1.5" />
        <line x1="136" y1="198" x2="124" y2="197" stroke="rgba(201,168,76,0.5)" strokeWidth="1.2" />
        <line x1="184" y1="198" x2="197" y2="197" stroke="rgba(201,168,76,0.5)" strokeWidth="1.2" />
        <line x1="139" y1="193" x2="143" y2="197" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="165" y1="193" x2="169" y2="197" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" />

        {/* ── EYES ── */}
        <circle cx="147" cy="198" r={hovered ? 4.5 : 3.8} fill="rgba(255,255,255,0.9)" style={{ transition: "r 0.2s" }} />
        <circle cx="173" cy="198" r={hovered ? 4.5 : 3.8} fill="rgba(255,255,255,0.9)" style={{ transition: "r 0.2s" }} />
        <circle cx={hovered ? 148 : 147} cy="199" r="2.2" fill="rgba(10,5,40,1)" />
        <circle cx={hovered ? 174 : 173} cy="199" r="2.2" fill="rgba(10,5,40,1)" />
        <circle cx="149" cy="196.5" r="0.9" fill="rgba(255,255,255,0.9)" />
        <circle cx="175" cy="196.5" r="0.9" fill="rgba(255,255,255,0.9)" />

        {/* ── EYEBROWS ── */}
        <path d={hovered ? "M136 187 Q147.5 183 159 186" : "M136 188 Q147.5 186 159 187"}
          stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" fill="none" style={{ transition: "d 0.3s" }} />
        <path d={hovered ? "M161 186 Q172.5 183 184 187" : "M161 187 Q172.5 186 184 188"}
          stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" fill="none" style={{ transition: "d 0.3s" }} />

        {/* ── MOUTH ── */}
        {hovered
          ? <path d="M149 213 Q160 223 171 213" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
          : <path d="M151 212 Q160 217 169 212" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        }

        {/* ── ARMS ── */}
        <path d="M118 258 C106 272 97 285 94 296" stroke="rgba(255,255,255,0.07)" strokeWidth="15" strokeLinecap="round" fill="none" />
        <path d="M202 258 C214 272 223 285 226 296" stroke="rgba(255,255,255,0.07)" strokeWidth="15" strokeLinecap="round" fill="none" />

        {/* ── KEYBOARD BASE ── */}
        <rect x="86" y="294" width="148" height="12" rx="4" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i} x={91 + i * 28} y={297} width="22" height="4" rx="1.5" fill="rgba(255,255,255,0.04)" />
        ))}

        {/* ── LEFT HAND ── */}
        <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: hovered ? "avTypingL 0.18s ease-in-out infinite alternate" : "none" }}>
          <ellipse cx="96" cy="297" rx="12" ry="8" fill="rgba(255,235,210,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line x1="88" y1="291" x2="87" y2="283" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="96" y1="289" x2="95" y2="281" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="104" y1="291" x2="104" y2="283" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ── RIGHT HAND ── */}
        <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: hovered ? "avTypingR 0.18s ease-in-out infinite alternate" : "none" }}>
          <ellipse cx="224" cy="297" rx="12" ry="8" fill="rgba(255,235,210,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line x1="216" y1="291" x2="215" y2="283" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="224" y1="289" x2="223" y2="281" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="232" y1="291" x2="232" y2="283" stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ── COFFEE CUP ── */}
        <g style={{ opacity: hovered ? 1 : 0.4, transition: "opacity 0.4s" }}>
          <rect x="246" y="288" width="26" height="20" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="247" y="296" width="24" height="12" rx="2" fill="rgba(139,90,43,0.15)" />
          <ellipse cx="259" cy="296" rx="11" ry="3" fill="rgba(201,168,76,0.12)" />
          <path d="M272 293 Q278 293 278 298 Q278 303 272 303" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          {hovered && <>
            <path d="M253 286 Q255 280 253 274" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeLinecap="round" style={{ animation: "avSteam 1.4s ease-in-out infinite" }} />
            <path d="M260 285 Q262 279 260 273" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeLinecap="round" style={{ animation: "avSteam 1.4s ease-in-out infinite 0.5s" }} />
          </>}
        </g>

        {/* ── LIGHT BULB ── */}
        <g style={{
          transformBox: "fill-box", transformOrigin: "center",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1) translateY(0px)" : "scale(0.3) translateY(15px)",
          transition: "opacity 0.3s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          {/* Ambient halos */}
          <circle cx="256" cy="82" r="52" fill="rgba(201,168,76,0.06)" style={{ animation: "avGlowRing 2s ease-in-out infinite" }} />
          <circle cx="256" cy="82" r="35" fill="rgba(201,168,76,0.1)" style={{ animation: "avGlowRing 2s ease-in-out infinite 0.4s" }} />

          {/* Rotating rays */}
          <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "avRays 7s linear infinite" }}>
            {rays.map((r, i) => (
              <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                stroke={`rgba(201,168,76,${i % 2 === 0 ? 0.55 : 0.3})`} strokeWidth="1.8" strokeLinecap="round" />
            ))}
          </g>

          {/* Bulb glass */}
          <circle cx="256" cy="79" r="22" fill="rgba(201,168,76,0.18)" stroke="#c9a84c" strokeWidth="2"
            filter="url(#avGlow)" style={{ animation: "avBulbPulse 1.8s ease-in-out infinite" }} />
          <circle cx="256" cy="79" r="15" fill="rgba(255,220,100,0.18)" />
          {/* Highlight shine */}
          <ellipse cx="249" cy="72" rx="5" ry="4" fill="rgba(255,255,255,0.3)" transform="rotate(-25 249 72)" />
          {/* Filament */}
          <path d="M249 80 Q252 73 256 80 Q260 73 263 80" fill="none" stroke="#e8c97a" strokeWidth="2" strokeLinecap="round" />
          {/* Base */}
          <rect x="249" y="98" width="14" height="5" rx="2" fill="rgba(201,168,76,0.6)" />
          <rect x="251" y="103" width="10" height="4" rx="1.5" fill="rgba(201,168,76,0.5)" />
          <rect x="253" y="107" width="6" height="3" rx="1" fill="rgba(201,168,76,0.4)" />
          {/* IDEA! label */}
          <text x="256" y="61" textAnchor="middle" fill="rgba(201,168,76,0.85)"
            fontSize="7.5" fontFamily="monospace" letterSpacing="2"
            style={{ animation: "avFadeIn 0.7s ease forwards" }}>
            IDEA!
          </text>
          {/* Dashed thread to head */}
          <path d="M256 110 Q228 132 213 162" stroke="rgba(201,168,76,0.1)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
        </g>

        {/* ── SPARKLES ── */}
        {hovered && <>
          <circle cx="72" cy="162" r="3" fill="rgba(201,168,76,0.65)" style={{ animation: "avSparkle 1.1s ease-in-out infinite" }} />
          <circle cx="67" cy="157" r="1.4" fill="rgba(201,168,76,0.4)" style={{ animation: "avSparkle 1.1s ease-in-out infinite 0.2s" }} />
          <circle cx="293" cy="218" r="2.5" fill="rgba(201,168,76,0.5)" style={{ animation: "avSparkle 1.3s ease-in-out infinite 0.35s" }} />
          <circle cx="297" cy="212" r="1.2" fill="rgba(201,168,76,0.3)" style={{ animation: "avSparkle 1.3s ease-in-out infinite 0.5s" }} />
        </>}
      </svg>

      <style>{`
        @keyframes avTypingL { from { transform: translateY(-5px); } to { transform: translateY(5px); } }
        @keyframes avTypingR { from { transform: translateY(5px); } to { transform: translateY(-5px); } }
        @keyframes avBulbPulse {
          0%,100% { opacity:.85; }
          50% { opacity:1; filter:drop-shadow(0 0 14px rgba(201,168,76,.7)); }
        }
        @keyframes avGlowRing {
          0%,100% { transform:scale(1); opacity:.5; }
          50% { transform:scale(1.18); opacity:.75; }
        }
        @keyframes avRays { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes av-blink, .av-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes avFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes avSteam {
          0%   { transform:translateY(0) scaleX(1);   opacity:.15; }
          60%  { transform:translateY(-10px) scaleX(1.3); opacity:.3; }
          100% { transform:translateY(-20px) scaleX(.8); opacity:0; }
        }
        @keyframes avSparkle {
          0%,100% { transform:scale(0);   opacity:0; }
          50%     { transform:scale(1.5); opacity:1; }
        }
        @keyframes avGlowScreen { 0%,100%{opacity:.5} 50%{opacity:1} }
        .av-blink      { animation: av-blink 1.1s step-end infinite; }
        .av-blink-fast { animation: av-blink 0.45s step-end infinite; }
        .av-fadein     { animation: avFadeIn 0.4s ease forwards; }
        .av-glow-screen { animation: avGlowScreen 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
