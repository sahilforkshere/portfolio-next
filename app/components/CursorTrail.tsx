"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── Custom GLSL shaders for per-particle alpha glow ── */
const VERT = /* glsl */`
  attribute float aAlpha;
  attribute float aSize;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    gl_PointSize = aSize;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */`
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    if (a < 0.008) discard;
    // warm gold core, cooler edges
    vec3 col = mix(vec3(0.95, 0.82, 0.45), vec3(0.78, 0.66, 0.30), d * 2.0);
    gl_FragColor = vec4(col, a);
  }
`;

const MAX    = 200;
const LIFE   = 48; // frames

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  sz: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(pointer: coarse)").matches) return; // skip on touch

    let W = window.innerWidth;
    let H = window.innerHeight;

    /* ── renderer ─────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, premultipliedAlpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    /* ── scene + orthographic camera (screen space) ── */
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 100);
    cam.position.z = 1;

    /* ── geometry buffers (pre-allocated) ─── */
    const posArr   = new Float32Array(MAX * 3);
    const alphaArr = new Float32Array(MAX);
    const sizeArr  = new Float32Array(MAX);

    const geo = new THREE.BufferGeometry();
    const posBuf   = new THREE.BufferAttribute(posArr,   3);
    const alphaBuf = new THREE.BufferAttribute(alphaArr, 1);
    const sizeBuf  = new THREE.BufferAttribute(sizeArr,  1);
    geo.setAttribute("position", posBuf);
    geo.setAttribute("aAlpha",   alphaBuf);
    geo.setAttribute("aSize",    sizeBuf);
    geo.setDrawRange(0, 0);

    const mat = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      transparent:    true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending, // glow overlap
    });
    scene.add(new THREE.Points(geo, mat));

    /* ── state ────────────────────────────── */
    const pool: Particle[] = [];
    const mouse  = { x: 0, y: 0 };
    const prev   = { x: -9999, y: -9999 };

    const onMouse = (e: MouseEvent) => {
      // convert to orthographic world coords (origin = screen center)
      mouse.x =  e.clientX - W / 2;
      mouse.y = -(e.clientY - H / 2);
    };

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      renderer.setSize(W, H);
      Object.assign(cam, { left: -W/2, right: W/2, top: H/2, bottom: -H/2 });
      cam.updateProjectionMatrix();
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize",    onResize, { passive: true });

    /* ── animation loop ───────────────────── */
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      /* spawn particles along cursor path */
      const dx   = mouse.x - prev.x;
      const dy   = mouse.y - prev.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 3 && pool.length < MAX) {
        const n = Math.min(4, Math.ceil(dist / 7));
        for (let k = 0; k < n && pool.length < MAX; k++) {
          const t = k / n;
          pool.push({
            x:  prev.x + dx * t,
            y:  prev.y + dy * t,
            vx: (Math.random() - 0.5) * 0.7,
            vy:  Math.random() * 0.9 + 0.2,
            life: LIFE,
            sz:  Math.random() * 7 + 3,
          });
        }
      }
      prev.x = mouse.x; prev.y = mouse.y;

      /* update particles */
      for (let i = pool.length - 1; i >= 0; i--) {
        const p = pool[i];
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy *= 0.96;  // drag
        p.life--;
        if (p.life <= 0) { pool.splice(i, 1); }
      }

      /* write to GPU buffers */
      const count = pool.length;
      for (let i = 0; i < count; i++) {
        const p = pool[i];
        const t = p.life / LIFE;
        posArr[i * 3]     = p.x;
        posArr[i * 3 + 1] = p.y;
        posArr[i * 3 + 2] = 0;
        alphaArr[i] = t * t * 0.8;        // quadratic fade
        sizeArr[i]  = p.sz * (0.3 + t * 0.7);
      }

      geo.setDrawRange(0, count);
      posBuf.needsUpdate   = true;
      alphaBuf.needsUpdate = true;
      sizeBuf.needsUpdate  = true;

      renderer.render(scene, cam);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9,
      }}
    />
  );
}
