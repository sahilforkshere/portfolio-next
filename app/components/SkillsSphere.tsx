"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const SKILLS = [
  "JavaScript","TypeScript","Python","C / C++","SQL",
  "React.js","Next.js","React Native","Tailwind CSS","Redux","Three.js",
  "Node.js","Express.js","REST APIs","Socket.IO","CI/CD",
  "PostgreSQL","MongoDB","Supabase","Redis","Mongoose",
  "Git / GitHub","Docker","Linux","Postman","GitHub Actions","Expo",
];

const RADIUS = 1.55;

function makeSprite(text: string): { sprite: THREE.Sprite; mat: THREE.SpriteMaterial; baseW: number; baseH: number } {
  const c   = document.createElement("canvas");
  const ctx = c.getContext("2d")!;
  const fs  = 15;
  ctx.font  = `${fs}px "Courier New", monospace`;
  const tw  = Math.ceil(ctx.measureText(text).width) + 24;
  const th  = fs + 14;
  c.width = tw; c.height = th;

  /* text */
  ctx.font      = `${fs}px "Courier New", monospace`;
  ctx.fillStyle = "rgba(201,168,76,0.9)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, tw / 2, th / 2);

  const tex = new THREE.CanvasTexture(c);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const spr = new THREE.Sprite(mat);
  const sc  = 1 / 70;
  spr.scale.set(tw * sc, th * sc, 1);
  return { sprite: spr, mat, baseW: tw * sc, baseH: th * sc };
}

export default function SkillsSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth || 500;
    const H = canvas.clientHeight || 400;

    /* ── renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 50);
    camera.position.z = 4.2;

    /* ── sphere group ── */
    const group  = new THREE.Group();
    scene.add(group);

    /* ── sprites — Fibonacci sphere distribution ── */
    type Entry = { sprite: THREE.Sprite; mat: THREE.SpriteMaterial; baseW: number; baseH: number };
    const entries: Entry[] = [];

    SKILLS.forEach((skill, i) => {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / SKILLS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const entry = makeSprite(skill);
      entry.sprite.position.set(
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.cos(phi),
        RADIUS * Math.sin(phi) * Math.sin(theta),
      );
      group.add(entry.sprite);
      entries.push(entry);
    });

    /* ── subtle axis helper lines (equator ring) ── */
    const ringGeo = new THREE.TorusGeometry(RADIUS, 0.003, 4, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.12 });
    group.add(new THREE.Mesh(ringGeo, ringMat));

    /* ── mouse drag rotation ── */
    let dragging  = false;
    let lastX = 0, lastY = 0;
    let velX  = 0, velY  = 0;

    const onDown = (e: MouseEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; velX = velY = 0; };
    const onUp   = ()               => { dragging = false; };
    const onMove = (e: MouseEvent)  => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      group.rotation.y += dx * 0.007;
      group.rotation.x += dy * 0.007;
      velX = dx * 0.007; velY = dy * 0.007;
      lastX = e.clientX; lastY = e.clientY;
    };

    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("mousemove", onMove);

    /* ── resize ── */
    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize, { passive: true });

    /* ── animation loop ── */
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      if (!dragging) {
        group.rotation.y += 0.0022;   // slow auto-spin
        velX *= 0.92; velY *= 0.92;
        group.rotation.y += velX;
        group.rotation.x += velY;
      }

      /* depth-based scale + opacity for every sprite */
      entries.forEach(({ sprite, mat, baseW, baseH }) => {
        /* world z after rotation */
        const wp = sprite.position.clone().applyQuaternion(group.quaternion);
        const t  = (wp.z + RADIUS) / (RADIUS * 2); // 0 = back, 1 = front
        const s  = 0.38 + t * 0.8;
        sprite.scale.set(baseW * s, baseH * s, 1);
        mat.opacity = 0.18 + t * 0.82;
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
      entries.forEach(e => { e.mat.map?.dispose(); e.mat.dispose(); });
      ringGeo.dispose(); ringMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: 380, display: "block", cursor: "grab" }}
    />
  );
}
