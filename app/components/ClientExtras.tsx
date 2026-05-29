"use client";
import dynamic from "next/dynamic";

const CursorTrail = dynamic(() => import("./CursorTrail"), { ssr: false });
const BackToTop   = dynamic(() => import("./BackToTop"),   { ssr: false });

export default function ClientExtras() {
  return (
    <>
      <CursorTrail />
      <BackToTop />
    </>
  );
}
