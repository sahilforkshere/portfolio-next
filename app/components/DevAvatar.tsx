"use client";
import { useState, useRef } from "react";

/* ─── Mode definitions ─────────────────────────────── */
const MODES = ["idea", "debug", "coffee", "hype"] as const;
type Mode = typeof MODES[number];

const MODE_META: Record<Mode, { label: string; accent: string }> = {
  idea:   { label: "IDEA!",      accent: "#c9a84c" },
  debug:  { label: "BUG!",       accent: "#f87171" },
  coffee: { label: "COFFEE?",    accent: "#f97316" },
  hype:   { label: "LGTM! 🎉",   accent: "#a78bfa" },
};

/* ─── Floating overlay per mode ────────────────────── */
function ModeOverlay({ mode }: { mode: Mode }) {
  const { accent } = MODE_META[mode];
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    return { x1: 256 + 30 * Math.cos(a), y1: 82 + 30 * Math.sin(a), x2: 256 + 44 * Math.cos(a), y2: 82 + 44 * Math.sin(a) };
  });

  if (mode === "idea") return (
    <g style={{ transformBox:"fill-box", transformOrigin:"center" }}>
      <circle cx="256" cy="82" r="52" fill={`${accent}10`} style={{ animation:"avGlowRing 2s ease-in-out infinite" }} />
      <circle cx="256" cy="82" r="35" fill={`${accent}18`} style={{ animation:"avGlowRing 2s ease-in-out infinite 0.4s" }} />
      <g style={{ transformBox:"fill-box", transformOrigin:"center", animation:"avRays 7s linear infinite" }}>
        {rays.map((r,i) => <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke={`${accent}${i%2===0?"99":"55"}`} strokeWidth="1.8" strokeLinecap="round"/>)}
      </g>
      <circle cx="256" cy="79" r="22" fill={`${accent}2a`} stroke={accent} strokeWidth="2"
        style={{ animation:"avBulbPulse 1.8s ease-in-out infinite" }} />
      <circle cx="256" cy="79" r="15" fill={`${accent}30`} />
      <ellipse cx="249" cy="72" rx="5" ry="4" fill="rgba(255,255,255,0.3)" transform="rotate(-25 249 72)" />
      <path d="M249 80 Q252 73 256 80 Q260 73 263 80" fill="none" stroke="#e8c97a" strokeWidth="2" strokeLinecap="round" />
      <rect x="249" y="98" width="14" height="5" rx="2" fill={`${accent}99`} />
      <rect x="251" y="103" width="10" height="4" rx="1.5" fill={`${accent}80`} />
      <rect x="253" y="107" width="6" height="3" rx="1" fill={`${accent}66`} />
      <text x="256" y="61" textAnchor="middle" fill={`${accent}dd`} fontSize="7.5" fontFamily="monospace" letterSpacing="2"
        style={{ animation:"avFadeIn 0.7s ease forwards" }}>IDEA!</text>
    </g>
  );

  if (mode === "debug") return (
    <g>
      <circle cx="256" cy="82" r="40" fill="rgba(248,113,113,0.08)" style={{ animation:"avGlowRing 1.2s ease-in-out infinite" }}/>
      {/* Bug body */}
      <ellipse cx="256" cy="88" rx="16" ry="20" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="1.8"/>
      {/* Bug head */}
      <circle cx="256" cy="68" r="10" fill="rgba(248,113,113,0.2)" stroke="#f87171" strokeWidth="1.5"/>
      {/* Bug antennae */}
      <path d="M250 60 Q244 50 240 46" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M262 60 Q268 50 272 46" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="240" cy="46" r="2" fill="#f87171"/>
      <circle cx="272" cy="46" r="2" fill="#f87171"/>
      {/* Bug legs */}
      {[-1,0,1].map(i=>(
        <g key={i}>
          <path d={`M242 ${82+i*10} Q232 ${80+i*10} 226 ${78+i*10}`} stroke="#f87171" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          <path d={`M270 ${82+i*10} Q280 ${80+i*10} 286 ${78+i*10}`} stroke="#f87171" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </g>
      ))}
      {/* Bug eyes */}
      <circle cx="252" cy="68" r="2.5" fill="#f87171"/>
      <circle cx="260" cy="68" r="2.5" fill="#f87171"/>
      {/* Glow */}
      <circle cx="256" cy="82" r="22" fill="rgba(248,113,113,0.05)" style={{ animation:"avBulbPulse 1s ease-in-out infinite" }}/>
      <text x="256" y="35" textAnchor="middle" fill="rgba(248,113,113,0.9)" fontSize="8" fontFamily="monospace" letterSpacing="2"
        style={{ animation:"avFadeIn 0.4s ease forwards" }}>BUG!</text>
    </g>
  );

  if (mode === "coffee") return (
    <g>
      {/* Big coffee cup */}
      <rect x="238" y="88" width="36" height="28" rx="4" fill="rgba(249,115,22,0.12)" stroke="#f97316" strokeWidth="1.5"/>
      <rect x="239" y="96" width="34" height="19" rx="3" fill="rgba(139,60,20,0.2)"/>
      <ellipse cx="256" cy="96" rx="16" ry="4" fill="rgba(249,115,22,0.2)"/>
      <path d="M274 93 Q282 93 282 99 Q282 105 274 105" fill="none" stroke="#f97316" strokeWidth="1.8"/>
      {/* Steam puffs */}
      {[0,1,2].map(i=>(
        <path key={i} d={`M${244+i*7} 87 Q${246+i*7} 78 ${244+i*7} 69`}
          fill="none" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" strokeLinecap="round"
          style={{ animation:`avSteam ${1.2+i*0.3}s ease-in-out infinite ${i*0.3}s` }}/>
      ))}
      {/* Coffee label */}
      <text x="256" y="58" textAnchor="middle" fill="rgba(249,115,22,0.85)" fontSize="8" fontFamily="monospace" letterSpacing="1.5"
        style={{ animation:"avFadeIn 0.5s ease forwards" }}>COFFEE?</text>
      {/* Glow */}
      <circle cx="256" cy="95" r="30" fill="rgba(249,115,22,0.05)" style={{ animation:"avGlowRing 2s ease-in-out infinite" }}/>
    </g>
  );

  /* hype */
  const stars = Array.from({length:10},(_,i)=>{
    const a=(i*36*Math.PI)/180, d=30+Math.random()*20;
    return { cx:256+d*Math.cos(a), cy:82+d*Math.sin(a), r:2+Math.random()*3, delay:i*0.1 };
  });
  return (
    <g>
      {stars.map((s,i)=>(
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r}
          fill={["#a78bfa","#f9a8d4","#fde68a","#6ee7b7"][i%4]}
          style={{ animation:`avSparkle ${0.8+i%3*0.3}s ease-in-out infinite ${s.delay}s` }}/>
      ))}
      <circle cx="256" cy="82" r="32" fill="rgba(167,139,250,0.1)" style={{ animation:"avGlowRing 1.5s ease-in-out infinite" }}/>
      <text x="256" y="55" textAnchor="middle" fill="rgba(167,139,250,0.9)" fontSize="8.5" fontFamily="monospace" letterSpacing="1"
        style={{ animation:"avFadeIn 0.3s ease forwards" }}>LGTM! 🎉</text>
      {/* Party confetti lines */}
      {[30,90,150,210,270,330].map((deg,i)=>{
        const r=(deg*Math.PI)/180;
        return <line key={i}
          x1={256+20*Math.cos(r)} y1={82+20*Math.sin(r)}
          x2={256+38*Math.cos(r)} y2={82+38*Math.sin(r)}
          stroke={["#a78bfa","#f9a8d4","#fde68a"][i%3]}
          strokeWidth="2.5" strokeLinecap="round"
          style={{ animation:`avRays ${2+i*0.2}s ease-in-out infinite ${i*0.1}s` }}/>;
      })}
    </g>
  );
}

/* ─── Face config per mode ─────────────────────────── */
function getFace(mode: Mode | null) {
  if (!mode) return {
    eyeR: 3.8, pupilR: 2.2, pupilOff: 0,
    browL: "M136 188 Q147.5 186 159 187", browR: "M161 187 Q172.5 186 184 188",
    mouth: <path d="M151 212 Q160 217 169 212" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>,
  };
  if (mode === "idea") return {
    eyeR: 4.6, pupilR: 2.2, pupilOff: 1,
    browL: "M136 186 Q147.5 182 159 185", browR: "M161 185 Q172.5 182 184 186",
    mouth: <path d="M149 213 Q160 223 171 213" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round"/>,
  };
  if (mode === "debug") return {
    eyeR: 3.5, pupilR: 2.5, pupilOff: 0,
    browL: "M136 191 Q147.5 188 159 190", browR: "M161 190 Q172.5 188 184 191",
    mouth: <path d="M151 215 Q160 211 169 215" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>,
  };
  if (mode === "coffee") return {
    eyeR: 3.2, pupilR: 2.8, pupilOff: 0,
    browL: "M136 190 Q147.5 190 159 190", browR: "M161 190 Q172.5 190 184 190",
    mouth: <path d="M150 215 Q160 218 170 215" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>,
  };
  /* hype */
  return {
    eyeR: 5, pupilR: 1.8, pupilOff: 1,
    browL: "M136 184 Q147.5 180 159 183", browR: "M161 183 Q172.5 180 184 184",
    mouth: (
      <>
        <path d="M148 213 Q160 226 172 213" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.7)" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M150 214 Q160 223 170 214" fill="rgba(255,255,255,0.15)"/>
      </>
    ),
  };
}

/* ─── Screen content per mode ──────────────────────── */
function ScreenLines({ mode }: { mode: Mode | null }) {
  if (mode === "debug") return (
    <>
      <rect x="109" y="210" width="58" height="4" rx="2" fill="rgba(248,113,113,0.7)"/>
      <rect x="109" y="219" width="84" height="4" rx="2" fill="rgba(248,113,113,0.5)"/>
      <rect x="109" y="228" width="46" height="4" rx="2" fill="rgba(248,113,113,0.4)"/>
      <text x="109" y="248" fill="rgba(248,113,113,0.8)" fontSize="7" fontFamily="monospace">ERROR: null reference</text>
      <text x="109" y="260" fill="rgba(248,113,113,0.6)" fontSize="7" fontFamily="monospace">at line 42 💀</text>
      <rect x="109" y="264" width="3" height="6" rx="1" fill="#f87171" style={{ animation:"avBlink 0.4s step-end infinite" }}/>
    </>
  );
  if (mode === "coffee") return (
    <>
      <rect x="109" y="210" width="58" height="4" rx="2" fill="rgba(249,115,22,0.6)"/>
      <rect x="109" y="219" width="70" height="4" rx="2" fill="rgba(249,115,22,0.4)"/>
      <text x="109" y="238" fill="rgba(249,115,22,0.75)" fontSize="7" fontFamily="monospace">// TODO: fix later</text>
      <text x="109" y="250" fill="rgba(249,115,22,0.6)" fontSize="7" fontFamily="monospace">// need coffee first</text>
      <rect x="109" y="254" width="3" height="6" rx="1" fill="#f97316" style={{ animation:"avBlink 1.2s step-end infinite" }}/>
    </>
  );
  if (mode === "hype") return (
    <>
      <rect x="109" y="210" width="58" height="4" rx="2" fill="rgba(167,139,250,0.8)"/>
      <rect x="109" y="219" width="84" height="4" rx="2" fill="rgba(167,139,250,0.6)"/>
      <rect x="109" y="228" width="46" height="4" rx="2" fill="rgba(167,139,250,0.5)"/>
      <text x="109" y="248" fill="rgba(167,139,250,0.85)" fontSize="7" fontFamily="monospace">✓ All tests passed!</text>
      <text x="109" y="260" fill="rgba(74,222,128,0.8)" fontSize="7" fontFamily="monospace">✓ Build successful 🚀</text>
      <rect x="109" y="264" width="3" height="6" rx="1" fill="#a78bfa" style={{ animation:"avBlink 0.5s step-end infinite" }}/>
    </>
  );
  /* idea / null - default green code */
  return (
    <>
      <rect x="109" y="210" width="58" height="4" rx="2" fill="rgba(74,222,128,0.75)"/>
      <rect x="109" y="219" width="84" height="4" rx="2" fill="rgba(96,165,250,0.6)"/>
      <rect x="109" y="228" width="46" height="4" rx="2" fill="rgba(249,168,212,0.55)"/>
      <rect x="109" y="237" width="68" height="4" rx="2" fill="rgba(96,165,250,0.45)"/>
      <rect x="109" y="246" width="36" height="4" rx="2" fill="rgba(74,222,128,0.4)"/>
      <rect x="109" y="255" width={mode === "idea" ? 72 : 50} height="4" rx="2" fill="rgba(201,168,76,0.55)"
        style={{ transition: mode === "idea" ? "width 1.5s steps(15)" : "none" }}/>
      <rect x="161" y="254" width="3" height="6" rx="1" fill="#c9a84c"
        style={{ animation: mode === "idea" ? "avBlink 0.45s step-end infinite" : "avBlink 1s step-end infinite" }}/>
    </>
  );
}

/* ─── Typing speed per mode ────────────────────────── */
const typingAnim: Record<Mode, string> = {
  idea:   "avTypingL 0.18s ease-in-out infinite alternate",
  debug:  "avTypingL 0.4s ease-in-out infinite alternate",
  coffee: "avTypingL 0.8s ease-in-out infinite alternate",
  hype:   "avTypingL 0.1s ease-in-out infinite alternate",
};
const typingAnimR: Record<Mode, string> = {
  idea:   "avTypingR 0.18s ease-in-out infinite alternate",
  debug:  "avTypingR 0.4s ease-in-out infinite alternate",
  coffee: "avTypingR 0.8s ease-in-out infinite alternate",
  hype:   "avTypingR 0.1s ease-in-out infinite alternate",
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function DevAvatar() {
  const [mode, setMode] = useState<Mode | null>(null);
  const modeIdx = useRef(0);
  const face = getFace(mode);

  const onEnter = () => {
    setMode(MODES[modeIdx.current % MODES.length]);
    modeIdx.current++;
  };

  return (
    <div className="relative w-full cursor-pointer select-none" style={{ maxWidth: 300 }}
      onMouseEnter={onEnter} onMouseLeave={() => setMode(null)}>

      {/* Mode badge */}
      {mode && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
          style={{
            background: `${MODE_META[mode].accent}20`,
            border: `1px solid ${MODE_META[mode].accent}60`,
            color: MODE_META[mode].accent,
            animation: "avFadeIn 0.3s ease forwards",
            whiteSpace: "nowrap",
          }}>
          {mode === "idea" ? "💡 Thinking..." : mode === "debug" ? "🐛 Debugging..." : mode === "coffee" ? "☕ Need a break..." : "🎉 Shipping!"}
        </div>
      )}

      <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"auto" }}>
        <defs>
          <filter id="avGlow">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <clipPath id="scrClip"><rect x="107" y="207" width="106" height="66" rx="2"/></clipPath>
        </defs>

        {/* ── DESK ── */}
        <rect x="18" y="304" width="284" height="10" rx="3" fill="rgba(var(--sur),0.05)" stroke="rgba(var(--sur),0.1)" strokeWidth="1"/>
        <rect x="38" y="314" width="8" height="56" rx="3" fill="rgba(var(--sur),0.03)"/>
        <rect x="274" y="314" width="8" height="56" rx="3" fill="rgba(var(--sur),0.03)"/>

        {/* ── CHAIR ── */}
        <rect x="76" y="250" width="168" height="55" rx="10" fill="rgba(var(--sur),0.02)" stroke="rgba(var(--sur),0.05)" strokeWidth="1"/>

        {/* ── BODY / HOODIE ── */}
        <path d="M116 260 C105 275 96 290 94 300 L226 300 C224 290 215 275 204 260 Q196 248 160 248 Q124 248 116 260Z"
          fill="rgba(var(--sur),0.06)" stroke="rgba(var(--sur),0.12)" strokeWidth="1.5"/>
        <rect x="146" y="270" width="28" height="20" rx="5" fill="rgba(var(--sur),0.03)" stroke="rgba(var(--sur),0.07)" strokeWidth="1"/>
        <line x1="154" y1="260" x2="152" y2="270" stroke="rgba(var(--sur),0.06)" strokeWidth="1"/>
        <line x1="166" y1="260" x2="168" y2="270" stroke="rgba(var(--sur),0.06)" strokeWidth="1"/>

        {/* ── LAPTOP SCREEN ── */}
        <rect x="96" y="197" width="128" height="96" rx="7" fill="rgba(var(--sur),0.09)" stroke="rgba(var(--sur),0.18)" strokeWidth="1.5"/>
        <rect x="103" y="203" width="114" height="84" rx="4" fill="#060612"/>
        <circle cx="160" cy="200" r="2" fill="rgba(var(--sur),0.1)"/>
        <rect x="106" y="291" width="108" height="6" rx="2" fill="rgba(var(--sur),0.07)" stroke="rgba(var(--sur),0.12)" strokeWidth="1"/>

        {/* Screen content */}
        <g clipPath="url(#scrClip)">
          <ScreenLines mode={mode}/>
          {/* Screen glow per mode */}
          {mode && (
            <rect x="103" y="203" width="114" height="84" rx="4"
              fill={`${MODE_META[mode].accent}08`}
              style={{ animation:"avGlowScreen 2s ease-in-out infinite" }}/>
          )}
        </g>

        {/* ── NECK ── */}
        <rect x="151" y="241" width="18" height="12" rx="4" fill="rgba(var(--sur),0.07)" stroke="rgba(var(--sur),0.08)" strokeWidth="1"/>

        {/* ── HEAD ── */}
        <ellipse cx="160" cy="197" rx="37" ry="41" fill="rgba(var(--sur),0.06)" stroke="rgba(var(--sur),0.2)" strokeWidth="1.5"/>

        {/* ── HAIR ── */}
        <path d="M125 198 Q124 162 142 152 Q152 143 160 148 Q168 141 178 148 Q194 156 196 174 Q198 188 196 200"
          fill="rgba(var(--sur),0.1)" stroke="rgba(var(--sur),0.2)" strokeWidth="1.5"/>
        <path d="M131 175 Q129 164 136 168" stroke="rgba(var(--sur),0.18)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M143 153 Q141 143 148 147" stroke="rgba(var(--sur),0.18)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M160 148 Q158 138 164 143" stroke="rgba(var(--sur),0.18)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M175 149 Q177 140 182 144" stroke="rgba(var(--sur),0.18)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M124 192 Q119 197 124 206" fill="rgba(var(--sur),0.06)" stroke="rgba(var(--sur),0.1)" strokeWidth="1"/>
        <path d="M196 192 Q201 197 196 206" fill="rgba(var(--sur),0.06)" stroke="rgba(var(--sur),0.1)" strokeWidth="1"/>

        {/* ── GLASSES ── */}
        <rect x="136" y="191" width="22" height="15" rx="5" fill="rgba(20,20,50,0.55)" stroke="rgba(var(--gold),0.8)" strokeWidth="1.5"/>
        <rect x="162" y="191" width="22" height="15" rx="5" fill="rgba(20,20,50,0.55)" stroke="rgba(var(--gold),0.8)" strokeWidth="1.5"/>
        <path d="M158 198.5 L162 198.5" stroke="rgba(var(--gold),0.8)" strokeWidth="1.5"/>
        <line x1="136" y1="198" x2="124" y2="197" stroke="rgba(var(--gold),0.5)" strokeWidth="1.2"/>
        <line x1="184" y1="198" x2="197" y2="197" stroke="rgba(var(--gold),0.5)" strokeWidth="1.2"/>
        <line x1="139" y1="193" x2="143" y2="197" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="165" y1="193" x2="169" y2="197" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round"/>

        {/* ── EYES ── */}
        <circle cx="147" cy="198" r={face.eyeR} fill="rgba(255,255,255,0.9)" style={{ transition:"r 0.2s" }}/>
        <circle cx="173" cy="198" r={face.eyeR} fill="rgba(255,255,255,0.9)" style={{ transition:"r 0.2s" }}/>
        {/* Coffee mode: half-closed eyelids */}
        {mode === "coffee" && <>
          <rect x="142" y="194" width="11" height="7" rx="2" fill="rgba(20,20,50,0.55)"/>
          <rect x="168" y="194" width="11" height="7" rx="2" fill="rgba(20,20,50,0.55)"/>
        </>}
        <circle cx={147 + face.pupilOff} cy="199" r={face.pupilR} fill="rgba(10,5,40,1)"/>
        <circle cx={173 + face.pupilOff} cy="199" r={face.pupilR} fill="rgba(10,5,40,1)"/>
        <circle cx="149" cy="196.5" r="0.9" fill="rgba(255,255,255,0.9)"/>
        <circle cx="175" cy="196.5" r="0.9" fill="rgba(255,255,255,0.9)"/>

        {/* ── EYEBROWS ── */}
        <path d={face.browL} stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" fill="none" style={{ transition:"d 0.3s" }}/>
        <path d={face.browR} stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round" fill="none" style={{ transition:"d 0.3s" }}/>

        {/* ── MOUTH ── */}
        {face.mouth}

        {/* ── ARMS ── */}
        <path d="M118 258 C106 272 97 285 94 296" stroke="rgba(var(--sur),0.07)" strokeWidth="15" strokeLinecap="round" fill="none"/>
        <path d="M202 258 C214 272 223 285 226 296" stroke="rgba(var(--sur),0.07)" strokeWidth="15" strokeLinecap="round" fill="none"/>

        {/* ── KEYBOARD ── */}
        <rect x="86" y="294" width="148" height="12" rx="4" fill="rgba(var(--sur),0.07)" stroke="rgba(var(--sur),0.16)" strokeWidth="1.5"/>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={91+i*28} y={297} width="22" height="4" rx="1.5" fill="rgba(var(--sur),0.04)"/>
        ))}

        {/* ── LEFT HAND ── */}
        <g style={{ transformBox:"fill-box", transformOrigin:"center",
          animation: mode ? typingAnim[mode] : "none" }}>
          <ellipse cx="96" cy="297" rx="12" ry="8" fill="rgba(var(--sur),0.1)" stroke="rgba(var(--sur),0.2)" strokeWidth="1.5"/>
          <line x1="88" y1="291" x2="87" y2="283" stroke="rgba(var(--sur),0.14)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="96" y1="289" x2="95" y2="281" stroke="rgba(var(--sur),0.14)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="104" y1="291" x2="104" y2="283" stroke="rgba(var(--sur),0.14)" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* ── RIGHT HAND ── */}
        <g style={{ transformBox:"fill-box", transformOrigin:"center",
          animation: mode ? typingAnimR[mode] : "none" }}>
          <ellipse cx="224" cy="297" rx="12" ry="8" fill="rgba(var(--sur),0.1)" stroke="rgba(var(--sur),0.2)" strokeWidth="1.5"/>
          <line x1="216" y1="291" x2="215" y2="283" stroke="rgba(var(--sur),0.14)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="224" y1="289" x2="223" y2="281" stroke="rgba(var(--sur),0.14)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="232" y1="291" x2="232" y2="283" stroke="rgba(var(--sur),0.14)" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* ── COFFEE CUP ── */}
        <g style={{ opacity: mode ? 1 : 0.4, transition:"opacity 0.4s" }}>
          <rect x="246" y="288" width="26" height="20" rx="3" fill="rgba(var(--sur),0.04)" stroke="rgba(var(--sur),0.1)" strokeWidth="1"/>
          <rect x="247" y="296" width="24" height="12" rx="2" fill="rgba(139,90,43,0.15)"/>
          <ellipse cx="259" cy="296" rx="11" ry="3" fill="rgba(201,168,76,0.12)"/>
          <path d="M272 293 Q278 293 278 298 Q278 303 272 303" fill="none" stroke="rgba(var(--sur),0.1)" strokeWidth="1.5"/>
          {mode && <>
            <path d="M253 286 Q255 280 253 274" fill="none" stroke="rgba(var(--sur),0.12)" strokeWidth="1.2" strokeLinecap="round"
              style={{ animation:"avSteam 1.4s ease-in-out infinite" }}/>
            <path d="M260 285 Q262 279 260 273" fill="none" stroke="rgba(var(--sur),0.12)" strokeWidth="1.2" strokeLinecap="round"
              style={{ animation:"avSteam 1.4s ease-in-out infinite 0.5s" }}/>
          </>}
        </g>

        {/* ── MODE OVERLAY ── */}
        <g style={{
          transformBox:"fill-box", transformOrigin:"center",
          opacity: mode ? 1 : 0,
          transform: mode ? "scale(1) translateY(0px)" : "scale(0.3) translateY(15px)",
          transition:"opacity 0.3s ease, transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          {mode && <ModeOverlay mode={mode}/>}
        </g>

        {/* ── SPARKLES (hype mode) ── */}
        {mode === "hype" && [
          {cx:72,cy:162,r:3,d:0},{cx:67,cy:157,r:1.4,d:0.2},
          {cx:293,cy:218,r:2.5,d:0.35},{cx:297,cy:212,r:1.2,d:0.5},
        ].map((s,i)=>(
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r}
            fill={["#a78bfa","#f9a8d4","#fde68a"][i%3]}
            style={{ animation:`avSparkle 1.1s ease-in-out infinite ${s.d}s` }}/>
        ))}
      </svg>

      <style>{`
        @keyframes avTypingL { from{transform:translateY(-5px)} to{transform:translateY(5px)} }
        @keyframes avTypingR { from{transform:translateY(5px)}  to{transform:translateY(-5px)} }
        @keyframes avBulbPulse { 0%,100%{opacity:.85} 50%{opacity:1;filter:drop-shadow(0 0 14px currentColor)} }
        @keyframes avGlowRing  { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.18);opacity:.75} }
        @keyframes avRays      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes avBlink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes avFadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes avSteam     { 0%{transform:translateY(0) scaleX(1);opacity:.15} 60%{transform:translateY(-10px) scaleX(1.3);opacity:.3} 100%{transform:translateY(-20px) scaleX(.8);opacity:0} }
        @keyframes avSparkle   { 0%,100%{transform:scale(0);opacity:0} 50%{transform:scale(1.5);opacity:1} }
        @keyframes avGlowScreen{ 0%,100%{opacity:.5} 50%{opacity:1} }
      `}</style>
    </div>
  );
}
