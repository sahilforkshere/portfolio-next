"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const SKILLS = [
  { name: "JavaScript",   slug: "javascript" },
  { name: "TypeScript",   slug: "typescript" },
  { name: "Python",       slug: "python" },
  { name: "C++",          slug: "cplusplus" },
  { name: "React",        slug: "react" },
  { name: "Next.js",      slug: "nextdotjs" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Redux",        slug: "redux" },
  { name: "Three.js",     slug: "threedotjs" },
  { name: "Node.js",      slug: "nodedotjs" },
  { name: "Express.js",   slug: "express" },
  { name: "Socket.IO",    slug: "socketdotio" },
  { name: "PostgreSQL",   slug: "postgresql" },
  { name: "MongoDB",      slug: "mongodb" },
  { name: "Supabase",     slug: "supabase" },
  { name: "Redis",        slug: "redis" },
  { name: "Docker",       slug: "docker" },
  { name: "Linux",        slug: "linux" },
  { name: "GitHub",       slug: "github" },
  { name: "Git",          slug: "git" },
  { name: "Postman",      slug: "postman" },
  { name: "Expo",         slug: "expo" },
  { name: "GH Actions",   slug: "githubactions" },
  { name: "React Native", slug: "react" },
  { name: "SQL",          slug: "mysql" },
  { name: "Mongoose",     slug: "mongoose" },
  { name: "REST APIs",    slug: null },
] as const;

const RADIUS  = 1.6;
const S       = 64;
const BASE_SC = 0.34;
const MAX_VEL = 0.04;  // momentum clamp

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

function logoCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = S; c.height = S;
  const ctx = c.getContext("2d")!;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(201,168,76,0.07)";
  ctx.fill();
  ctx.strokeStyle = "rgba(201,168,76,0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();
  const pad = 13;
  ctx.drawImage(img, pad, pad, S - pad * 2, S - pad * 2);
  return c;
}

export default function SkillsSphere() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const selectedRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let alive = true;

    const W = canvas.clientWidth  || 520;
    const H = canvas.clientHeight || 400;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 50);
    camera.position.z = 4.4;

    const group = new THREE.Group();
    scene.add(group);

    /* ── guide rings (gyroscope style) ── */
    const rings: THREE.Mesh[] = [];
    const ringDefs = [
      { tiltX: 0,               tiltZ: 0 },
      { tiltX: Math.PI / 2.5,   tiltZ: Math.PI / 6 },
      { tiltX: -Math.PI / 3,    tiltZ: Math.PI / 4 },
    ];
    ringDefs.forEach(({ tiltX, tiltZ }) => {
      const geo = new THREE.TorusGeometry(RADIUS, 0.003, 4, 90);
      const mat = new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.09 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = tiltX;
      mesh.rotation.z = tiltZ;
      group.add(mesh);
      rings.push(mesh);
    });

    /* ── sprites ── */
    type Entry = { sprite: THREE.Sprite; mat: THREE.SpriteMaterial; index: number };
    const entries: Entry[] = [];
    const raycaster = new THREE.Raycaster();
    const pointer   = new THREE.Vector2();

    SKILLS.forEach((skill, i) => {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / SKILLS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const pos   = new THREE.Vector3(
        RADIUS * Math.sin(phi) * Math.cos(theta),
        RADIUS * Math.cos(phi),
        RADIUS * Math.sin(phi) * Math.sin(theta),
      );

      const ph  = placeholderCanvas(skill.name);
      const tex = new THREE.CanvasTexture(ph);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      const spr = new THREE.Sprite(mat);
      spr.scale.set(BASE_SC, BASE_SC, 1);
      spr.position.copy(pos);
      group.add(spr);
      entries.push({ sprite: spr, mat, index: i });

      if (skill.slug) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (!alive) return;
          const newTex = new THREE.CanvasTexture(logoCanvas(img));
          tex.dispose();
          mat.map = newTex;
          mat.needsUpdate = true;
        };
        img.src = `https://cdn.simpleicons.org/${skill.slug}/c9a84c`;
      }
    });

    /* ── drag rotation ── */
    let dragging = false, lastX = 0, lastY = 0, velX = 0, velY = 0;
    let axisTilt = 0; // for wobble

    const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

    const onDown = (e: MouseEvent) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY; velX = velY = 0;
    };
    const onUp = () => { dragging = false; };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      velX = clamp((e.clientX - lastX) * 0.007, MAX_VEL);
      velY = clamp((e.clientY - lastY) * 0.007, MAX_VEL);
      group.rotation.y += velX;
      group.rotation.x += velY;
      lastX = e.clientX; lastY = e.clientY;

      // update pointer for raycasting
      const rect = canvas.getBoundingClientRect();
      pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
    };

    const onHover = (e: MouseEvent) => {
      if (dragging) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const sprites = entries.map(e => e.sprite);
      const hits = raycaster.intersectObjects(sprites);
      if (hits.length > 0) {
        const idx = sprites.indexOf(hits[0].object as THREE.Sprite);
        setTooltip({ name: SKILLS[idx].name, x: e.clientX - rect.left, y: e.clientY - rect.top });
        canvas.style.cursor = "pointer";
      } else {
        setTooltip(null);
        canvas.style.cursor = "grab";
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const sprites = entries.map(e => e.sprite);
      const hits = raycaster.intersectObjects(sprites);
      if (hits.length > 0) {
        const idx = sprites.indexOf(hits[0].object as THREE.Sprite);
        const next = selectedRef.current === idx ? null : idx;
        selectedRef.current = next;
        setSelected(next);
      } else {
        selectedRef.current = null;
        setSelected(null);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; velX = velY = 0; dragging = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      velX = clamp((e.touches[0].clientX - lastX) * 0.007, MAX_VEL);
      velY = clamp((e.touches[0].clientY - lastY) * 0.007, MAX_VEL);
      group.rotation.y += velX; group.rotation.x += velY;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { dragging = false; };

    canvas.addEventListener("mousedown",  onDown);
    canvas.addEventListener("mousemove",  onHover);
    canvas.addEventListener("click",      onClick);
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
    let t = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.01;

      if (!dragging) {
        group.rotation.y += 0.0020;
        velX *= 0.90; velY *= 0.90;
        group.rotation.y += velX;
        group.rotation.x += velY;
      }

      // axis wobble — slowly tilts the sphere on its x-axis
      axisTilt = Math.sin(t * 0.18) * 0.12;
      group.rotation.z = axisTilt;

      const sel = selectedRef.current;

      entries.forEach(({ sprite, mat, index }) => {
        const wp = sprite.position.clone().applyQuaternion(group.quaternion);
        const depth = (wp.z + RADIUS) / (RADIUS * 2); // 0=back, 1=front

        if (sel === null) {
          // normal depth-based scale/opacity
          const s = 0.35 + depth * 0.75;
          sprite.scale.set(BASE_SC * s, BASE_SC * s, 1);
          mat.opacity = 0.15 + depth * 0.85;
        } else if (sel === index) {
          // highlighted: pulsing scale
          const pulse = 1.3 + Math.sin(t * 4) * 0.08;
          const s = (0.35 + depth * 0.75) * pulse;
          sprite.scale.set(BASE_SC * s, BASE_SC * s, 1);
          mat.opacity = 1.0;
        } else {
          // dimmed
          const s = 0.35 + depth * 0.75;
          sprite.scale.set(BASE_SC * s * 0.7, BASE_SC * s * 0.7, 1);
          mat.opacity = 0.08 + depth * 0.2;
        }
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown",  onDown);
      canvas.removeEventListener("mousemove",  onHover);
      canvas.removeEventListener("click",      onClick);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("resize",     onResize);
      renderer.dispose();
      entries.forEach(({ mat }) => { mat.map?.dispose(); mat.dispose(); });
      rings.forEach(r => { (r.geometry as THREE.BufferGeometry).dispose(); (r.material as THREE.Material).dispose(); });
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: 400, display: "block", cursor: "grab", touchAction: "none" }}
      />
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 14,
            top:  tooltip.y - 10,
            pointerEvents: "none",
            background: "rgba(10,10,10,0.82)",
            border: "1px solid rgba(201,168,76,0.35)",
            color: "rgba(201,168,76,0.9)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 3,
            whiteSpace: "nowrap",
          }}
        >
          {tooltip.name}
        </div>
      )}
      {selected !== null && (
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
            background: "rgba(10,10,10,0.82)",
            border: "1px solid rgba(201,168,76,0.4)",
            color: "rgba(201,168,76,0.95)",
            fontSize: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "4px 14px",
            borderRadius: 3,
          }}
        >
          {SKILLS[selected].name}
        </div>
      )}
      <p style={{
        position: "absolute", bottom: 8, right: 12,
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(var(--tx),0.2)",
      }}>
        drag · click to highlight
      </p>
    </div>
  );
}
