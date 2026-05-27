"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLElement | null>(null);
  return ref;
}

// Global initializer — call once in a layout client component
export function initScrollReveal() {
  if (typeof window === "undefined") return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
  );

  const targets = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );
  targets.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
