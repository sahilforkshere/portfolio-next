"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import * as THREE from "three";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What stack do you use?",
  "Tell me about DevDuels",
  "Are you open to work?",
  "What's your JEE rank?",
];

/* ── Three.js burst on send ─────────────────────────────── */
function useBurst(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const burstRef = useRef<{
    trigger: (x: number, y: number) => void;
    destroy: () => void;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, premultipliedAlpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 10);
    camera.position.z = 1;

    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    renderer.setSize(W, H);

    /* particle pool */
    const MAX = 60;
    type P = { x: number; y: number; vx: number; vy: number; life: number; sz: number };
    const pool: P[] = [];

    const posArr   = new Float32Array(MAX * 3);
    const alphaArr = new Float32Array(MAX);
    const sizeArr  = new Float32Array(MAX);

    const geo = new THREE.BufferGeometry();
    const pB  = new THREE.BufferAttribute(posArr,   3);
    const aB  = new THREE.BufferAttribute(alphaArr, 1);
    const sB  = new THREE.BufferAttribute(sizeArr,  1);
    geo.setAttribute("position", pB);
    geo.setAttribute("aAlpha",   aB);
    geo.setAttribute("aSize",    sB);
    geo.setDrawRange(0, 0);

    const mat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float aAlpha; attribute float aSize; varying float vAlpha;
        void main(){ vAlpha=aAlpha; gl_PointSize=aSize; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main(){
          float d=length(gl_PointCoord-vec2(.5));
          float a=smoothstep(.5,.05,d)*vAlpha;
          if(a<.01)discard;
          gl_FragColor=vec4(.95,.82,.45,a);
        }
      `,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(geo, mat));

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize, { passive: true });

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      for (let i = pool.length - 1; i >= 0; i--) {
        const p = pool[i];
        p.x += p.vx; p.y += p.vy; p.vy -= 0.0008; p.life--;
        if (p.life <= 0) pool.splice(i, 1);
      }
      const n = pool.length;
      for (let i = 0; i < n; i++) {
        const p = pool[i];
        posArr[i*3]   = p.x / W;
        posArr[i*3+1] = 1 - p.y / H;
        alphaArr[i]   = (p.life / 40) ** 2;
        sizeArr[i]    = p.sz * (p.life / 40);
      }
      geo.setDrawRange(0, n);
      pB.needsUpdate = aB.needsUpdate = sB.needsUpdate = true;
      renderer.render(scene, camera);
    };
    tick();

    burstRef.current = {
      trigger(x, y) {
        for (let k = 0; k < MAX; k++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 1;
          pool.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1,
            life: Math.random() * 20 + 20,
            sz:   Math.random() * 6 + 3,
          });
        }
      },
      destroy() {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        renderer.dispose(); geo.dispose(); mat.dispose();
      },
    };

    return () => burstRef.current?.destroy();
  }, [canvasRef]);

  return burstRef;
}

/* ── component ─────────────────────────────────────────── */
export default function AskSahil() {
  const [msgs, setMsgs]       = useState<Msg[]>([]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen]       = useState(false);

  const msgsBoxRef  = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const sendBtnRef  = useRef<HTMLButtonElement>(null);
  const burstRef    = useBurst(canvasRef);

  /* scroll INSIDE the messages box — not the page */
  useEffect(() => {
    const el = msgsBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  const send = async (text = input) => {
    const q = text.trim();
    if (!q || loading) return;

    /* burst from send button */
    if (sendBtnRef.current) {
      const r = sendBtnRef.current.getBoundingClientRect();
      const cr = canvasRef.current?.getBoundingClientRect();
      if (cr) burstRef.current?.trigger(r.left - cr.left + r.width / 2, r.top - cr.top + r.height / 2);
    }

    const updated: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, history: msgs }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      setMsgs([...updated, { role: "assistant", content: data.reply ?? data.error ?? "…" }]);
    } catch {
      setMsgs([...updated, { role: "assistant", content: "Network error — try again." }]);
    }
    setLoading(false);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="w-full reveal" style={{ position: "relative" }}>
      {/* Three.js burst canvas — overlaid, pointer-events none */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          pointerEvents: "none", zIndex: 20,
        }}
      />

      {/* header / toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-3"
        style={{
          border: "1px solid rgba(201,168,76,0.22)",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(12px)",
          cursor: "pointer",
        }}
      >
        <div className="flex items-center gap-3">
          {/* pulsing dot */}
          <span style={{ position: "relative", width: 8, height: 8 }}>
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "var(--gold)", opacity: 0.8,
              animation: "pulse 2s ease-in-out infinite",
            }} />
          </span>
          <span style={{ fontFamily: "var(--font-bebas)", fontSize: 16, letterSpacing: "0.18em", color: "var(--gold)" }}>
            Ask Sahil
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em" }}>
            AI · powered by GPT-4o
          </span>
        </div>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ color: "rgba(201,168,76,0.5)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{ border: "1px solid rgba(201,168,76,0.14)", borderTop: "none", background: "rgba(4,4,8,0.92)" }}>
          {/* messages */}
          <div ref={msgsBoxRef} style={{ height: 260, overflowY: "auto", padding: "14px 16px", scrollbarWidth: "thin", scrollbarColor: "rgba(201,168,76,0.15) transparent" }}>
            {msgs.length === 0 && (
              <div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 14, letterSpacing: "0.05em" }}>
                  Ask me anything about my background, projects, or skills.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{
                        fontSize: 10, padding: "5px 12px", letterSpacing: "0.08em",
                        border: "1px solid rgba(201,168,76,0.22)", color: "rgba(201,168,76,0.65)",
                        background: "transparent", cursor: "pointer", transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.65)"; }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {msgs.map((m, i) => (
              <div key={i} style={{ marginBottom: 14, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "8px 13px",
                  fontSize: 12,
                  lineHeight: 1.6,
                  letterSpacing: "0.03em",
                  background: m.role === "user"
                    ? "rgba(201,168,76,0.12)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${m.role === "user" ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.07)"}`,
                  color: m.role === "user" ? "rgba(201,168,76,0.95)" : "rgba(255,255,255,0.7)",
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: 5, padding: "8px 13px", width: "fit-content",
                border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.04)" }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "var(--gold)",
                    animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}
          </div>

          {/* input */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={loading}
              placeholder="Ask anything about Sahil…"
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                padding: "11px 16px", fontSize: 12, color: "rgba(255,255,255,0.8)",
                letterSpacing: "0.04em", caretColor: "var(--gold)",
              }}
            />
            <button
              ref={sendBtnRef}
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                padding: "10px 16px", background: "transparent",
                border: "none", borderLeft: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer", color: "rgba(201,168,76,0.6)",
                transition: "color 0.2s, background 0.2s",
                opacity: loading || !input.trim() ? 0.35 : 1,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(201,168,76,0.6)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L6 8M13 1L9 13L6 8M13 1L1 5L6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
