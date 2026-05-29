"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const GOLD = 0xc9a84c;
const CONNECT_DIST = 0.32;

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const SPREAD_X = 3.2;
    const SPREAD_Y = 2.0;
    const SPREAD_Z = 1.0; // depth layering
    const COUNT = W < 768 ? 55 : 110;
    const REPEL_RADIUS = 0.55;
    const REPEL_FORCE  = 0.00045;

    /* ── renderer ─────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    /* ── scene / camera ───────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 50);
    camera.position.z = 4;

    /* ── particles ────────────────────────────────────── */
    type Particle = { pos: THREE.Vector3; vel: THREE.Vector3; home: THREE.Vector3 };
    const particles: Particle[] = [];
    const posArr = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD_X * 2;
      const y = (Math.random() - 0.5) * SPREAD_Y * 2;
      const z = (Math.random() - 0.5) * SPREAD_Z * 2;
      posArr[i * 3]     = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;
      particles.push({
        pos:  new THREE.Vector3(x, y, z),
        vel:  new THREE.Vector3(
          (Math.random() - 0.5) * 0.0012,
          (Math.random() - 0.5) * 0.0012,
          0,
        ),
        home: new THREE.Vector3(x, y, z),
      });
    }

    const pGeo = new THREE.BufferGeometry();
    const pBuf = new THREE.BufferAttribute(posArr, 3);
    pGeo.setAttribute("position", pBuf);

    const pMat = new THREE.PointsMaterial({
      color: GOLD,
      size: 0.022,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    /* ── lines ────────────────────────────────────────── */
    const maxPairs = COUNT * COUNT;
    const linePosArr = new Float32Array(maxPairs * 6);
    const lineColArr = new Float32Array(maxPairs * 6); // per-vertex colors for opacity
    const lGeo = new THREE.BufferGeometry();
    const lBuf = new THREE.BufferAttribute(linePosArr, 3);
    const lCol = new THREE.BufferAttribute(lineColArr, 3);
    lGeo.setAttribute("position", lBuf);
    lGeo.setAttribute("color", lCol);
    lGeo.setDrawRange(0, 0);

    const lMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1,
    });
    scene.add(new THREE.LineSegments(lGeo, lMat));

    /* ── mouse ────────────────────────────────────────── */
    const mouse    = { x: 0, y: 0 };        // normalized -1..1
    const mouseWorld = new THREE.Vector3();  // world-space cursor at z=0

    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    /* ── scroll ───────────────────────────────────────── */
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── resize ───────────────────────────────────────── */
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize, { passive: true });

    /* ── animation loop ───────────────────────────────── */
    let raf: number;
    const _tmp = new THREE.Vector3();

    const animate = () => {
      raf = requestAnimationFrame(animate);

      // project mouse to world at z≈0
      mouseWorld.set(mouse.x * SPREAD_X, mouse.y * SPREAD_Y, 0);

      // move particles + repulsion
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];

        // repel from cursor
        _tmp.copy(p.pos).sub(mouseWorld);
        const dist = _tmp.length();
        if (dist < REPEL_RADIUS && dist > 0.001) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          p.vel.addScaledVector(_tmp.normalize(), force);
        }

        p.pos.add(p.vel);

        // bounce at walls
        if (Math.abs(p.pos.x) > SPREAD_X) p.vel.x *= -1;
        if (Math.abs(p.pos.y) > SPREAD_Y) p.vel.y *= -1;
        if (Math.abs(p.pos.z) > SPREAD_Z) p.vel.z *= -1;

        // soft drag so velocity doesn't grow forever
        p.vel.multiplyScalar(0.998);

        posArr[i * 3]     = p.pos.x;
        posArr[i * 3 + 1] = p.pos.y;
        posArr[i * 3 + 2] = p.pos.z;
      }
      pBuf.needsUpdate = true;

      // rebuild connection lines with distance-based brightness
      const gr = 0xc9 / 255, gg = 0xa8 / 255, gb = 0x4c / 255;
      let li = 0;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const d = particles[i].pos.distanceTo(particles[j].pos);
          if (d < CONNECT_DIST) {
            const bright = (1 - d / CONNECT_DIST) * 0.35; // near=0.35, far=0
            linePosArr[li * 2]     = particles[i].pos.x;
            linePosArr[li * 2 + 1] = particles[i].pos.y;
            linePosArr[li * 2 + 2] = particles[i].pos.z;
            linePosArr[li * 2 + 3] = particles[j].pos.x;
            linePosArr[li * 2 + 4] = particles[j].pos.y;
            linePosArr[li * 2 + 5] = particles[j].pos.z;
            lineColArr[li * 2]     = gr * bright;
            lineColArr[li * 2 + 1] = gg * bright;
            lineColArr[li * 2 + 2] = gb * bright;
            lineColArr[li * 2 + 3] = gr * bright;
            lineColArr[li * 2 + 4] = gg * bright;
            lineColArr[li * 2 + 5] = gb * bright;
            li++;
          }
        }
      }
      lGeo.setDrawRange(0, li * 2);
      lBuf.needsUpdate = true;
      lCol.needsUpdate = true;

      // camera: mouse parallax + scroll drift
      const targetX = mouse.x * 0.12;
      const targetY = mouse.y * 0.07 - scrollY * 0.0006;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    /* ── cleanup ──────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
      lGeo.dispose();
      lMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
