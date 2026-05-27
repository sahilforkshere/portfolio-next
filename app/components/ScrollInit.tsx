"use client";

import { useEffect } from "react";
import { initScrollReveal } from "../hooks/useScrollReveal";

export default function ScrollInit() {
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return null;
}
