"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── skill list with Simple Icons slugs ─────────────────────
   slug: null → text fallback (no icon available)            */
const SKILLS = [
  { name: "JavaScript",     slug: "javascript" },
  { name: "TypeScript",     slug: "typescript" },
  { name: "Python",         slug: "python" },
  { name: "C++",            slug: "cplusplus" },
  { name: "React",          slug: "react" },
  { name: "Next.js",        slug: "nextdotjs" },
  { name: "Tailwind CSS",   slug: "tailwindcss" },
  { name: "Redux",          slug: "redux" },
  { name: "Three.js",       slug: "threedotjs" },
  { name: "Node.js",        slug: "nodedotjs" },
  { name: "Express.js",     slug: "express" },
  { name: "Socket.IO",      slug: "socketdotio" },
  { name: "PostgreSQL",     slug: "postgresql" },
  { name: "MongoDB",        slug: "mongodb" },
  { name: "Supabase",       slug: "supabase" },
  { name: "Redis",          slug: "redis" },
  { name: "Docker",         slug: "docker" },
  { name: "Linux",          slug: "linux" },
  { name: "GitHub",         slug: "github" },
  { name: "Git",            slug: "git" },
  { name: "Postman",        slug: "postman" },
  { name: "Expo",           slug: "expo" },
  { name: "GH Actions",     slug: "githubactions" },
  { name: "React Native",   slug: "react" },
  { name: "SQL",            slug: "mysql" },
  { name: "Mongoose",       slug: "mongoose" },
  { name: "REST APIs",      slug: null },
] as const;

const RADIUS  = 1.6;
const S       = 64;          // canvas texture size (px)
const BASE_SC = 0.34;        // sprite base scale in 3D units

/* ── draw a circular placeholder (shows before logo loads) ── */
function placeholderCanvas(label: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = S; c.height = S;
  const ctx = c.getContext("2d")!;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(201,168,76,0.28)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "rgba(201,168,76,0.55)";
  ctx.font = `bold 13px 'Courier New'`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label.substring(0, 3).toUpperCase(), S / 2, S / 2);
  return c;
}

/* ── draw the logo into a circular canvas ─────────────────── */
function logoCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = S; c.height = S;
  const ctx = c.getContext("2d")!;
  // soft circle bg
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(201,168,76,0.07)";
  ctx.fill();
  ctx.strokeStyle = "rgba(201,168,76,0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();
  // icon
  const pad = 13;
  ctx.drawImage(img, pad, pad, S - pad * 2, S - pad * 2);
  return c;
}

export default function SkillsSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let alive = true;

    const W = canvas.clientWidth  || 520;
    const H = canvas.clientHeight || 400;

    /* ── renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 50);
    camera.position.z = 4.4;

    /* ── group (everything rotates together) ── */
    const group = new THREE.Group();
    scene.add(group);

    /* ── equator guide ring ── */
    const ringGeo = new THREE.TorusGeometry(RADIUS, 0.003, 4, 90);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.1 });
    group.add(new THREE.Mesh(ringGeo, ringMat));

    /* ── sprites ── */
    type Entry = { sprite: THREE.Sprite; mat: THREE.SpriteMaterial };
    const entries: Entry[] = [];

    SKILLS.forEach((skill, i) => {
      /* Fibonacci sphere position */
      const phi   = Math.acos(1 - 2 * (i + 0.5) / SKILLS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const pos   = new THREE.Vector3(
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.cos(phi),
        RADIUS * Math.sin(phi) * Math.sin(theta),
      );

      /* start with placeholder texture */
      const ph  = placeholderCanvas(skill.name);
      const tex = new THREE.CanvasTexture(ph);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      const spr = new THREE.Sprite(mat);
      spr.scale.set(BASE_SC, BASE_SC, 1);
      spr.position.copy(pos);
      group.add(spr);
      entries.push({ sprite: spr, mat });

      /* load real icon in background */
      if (skill.slug) {
        const img  = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (!alive) return;
          const newTex = new THREE.CanvasTexture(logoCanvas(img));
          tex.dispose();
          mat.map = newTex;
          mat.needsUpdate = true;
        };
        // Simple Icons CDN — gold color, no #
        img.src = `https://cdn.simpleicons.org/${skill.slug}/c9a84c`;
      }
    });

    /* ── drag rotation ── */
    let dragging = false, lastX = 0, lastY = 0, velX = 0, velY = 0;

    const onDown = (e: MouseEvent) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY; velX = velY = 0;
    };
    const onUp   = () => { dragging = false; };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      velX = (e.clientX - lastX) * 0.007;
      velY = (e.clientY - lastY) * 0.007;
      group.rotation.y += velX;
      group.rotation.x += velY;
      lastX = e.clientX; lastY = e.clientY;
    };

    /* touch support */
    const onTouchStart = (e: TouchEvent) => {
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; velX = velY = 0; dragging = true;
    };
    const onTouchMove  = (e: TouchEvent) => {
      if (!dragging) return;
      velX = (e.touches[0].clientX - lastX) * 0.007;
      velY = (e.touches[0].clientY - lastY) * 0.007;
      group.rotation.y += velX; group.rotation.x += velY;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { dragging = false; };

    canvas.addEventListener("mousedown",  onDown);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: true });
    canvas.addEventListener("touchend",   onTouchEnd);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("mousemove",  onMove);

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
        group.rotation.y += 0.0020;
        velX *= 0.90; velY *= 0.90;
        group.rotation.y += velX;
        group.rotation.x += velY;
      }

      /* depth-based scale + opacity */
      entries.forEach(({ sprite, mat }) => {
        const wp = sprite.position.clone().applyQuaternion(group.quaternion);
        const t  = (wp.z + RADIUS) / (RADIUS * 2); // 0 = back, 1 = front
        const s  = 0.35 + t * 0.75;
        sprite.scale.set(BASE_SC * s, BASE_SC * s, 1);
        mat.opacity = 0.15 + t * 0.85;
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown",  onDown);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("resize",     onResize);
      renderer.dispose();
      entries.forEach(({ mat }) => { mat.map?.dispose(); mat.dispose(); });
      ringGeo.dispose(); ringMat.dispose();
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: 400, display: "block", cursor: "grab", touchAction: "none" }}
      />
      <p style={{
        position: "absolute", bottom: 8, right: 12,
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(var(--tx),0.2)",
      }}>
        drag to rotate
      </p>
    </div>
  );
}
