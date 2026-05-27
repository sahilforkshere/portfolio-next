"use client";
import dynamic from "next/dynamic";

const CursorTrail = dynamic(() => import("./CursorTrail"), { ssr: false });

export default function ClientExtras() {
  return <CursorTrail />;
}
