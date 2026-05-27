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
    const COUNT = W < 768 ? 55 : 110;

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
    type Particle = { pos: THREE.Vector3; vel: THREE.Vector3 };
    const particles: Particle[] = [];
    const posArr = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD_X * 2;
      const y = (Math.random() - 0.5) * SPREAD_Y * 2;
      const z = (Math.random() - 0.5) * 0.5;
      posArr[i * 3]     = x;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 2] = z;
      particles.push({
        pos: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.0012,
          (Math.random() - 0.5) * 0.0012,
          0,
        ),
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
    const lGeo = new THREE.BufferGeometry();
    const lBuf = new THREE.BufferAttribute(linePosArr, 3);
    lGeo.setAttribute("position", lBuf);
    lGeo.setDrawRange(0, 0);

    const lMat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.12,
    });
    scene.add(new THREE.LineSegments(lGeo, lMat));

    /* ── mouse parallax ───────────────────────────────── */
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

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

    const animate = () => {
      raf = requestAnimationFrame(animate);

      // move particles
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];
        p.pos.add(p.vel);
        if (Math.abs(p.pos.x) > SPREAD_X) p.vel.x *= -1;
        if (Math.abs(p.pos.y) > SPREAD_Y) p.vel.y *= -1;
        posArr[i * 3]     = p.pos.x;
        posArr[i * 3 + 1] = p.pos.y;
        posArr[i * 3 + 2] = p.pos.z;
      }
      pBuf.needsUpdate = true;

      // rebuild connection lines
      let li = 0;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          if (particles[i].pos.distanceTo(particles[j].pos) < CONNECT_DIST) {
            linePosArr[li++] = particles[i].pos.x;
            linePosArr[li++] = particles[i].pos.y;
            linePosArr[li++] = particles[i].pos.z;
            linePosArr[li++] = particles[j].pos.x;
            linePosArr[li++] = particles[j].pos.y;
            linePosArr[li++] = particles[j].pos.z;
          }
        }
      }
      lGeo.setDrawRange(0, li / 3);
      lBuf.needsUpdate = true;

      // camera parallax (lazy follow)
      camera.position.x += (mouse.x * 0.12 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.07 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    /* ── cleanup ──────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
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
