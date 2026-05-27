"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div
        className="mx-4 mt-4 rounded-sm px-6 py-3 flex items-center justify-between"
        style={{
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <a
          href="#hero"
          className="text-xl tracking-widest text-white"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          SP.
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs tracking-[0.18em] uppercase text-white/50 hover:text-white transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:paalsahil04@gmail.com"
              className="text-xs tracking-[0.18em] uppercase px-4 py-2 border border-[#c9a84c]/40 text-[#c9a84c] hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile */}
        <button
          className="md:hidden text-white/60 hover:text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`h-px bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden mx-4 mt-1 rounded-sm p-4"
          style={{ background: "rgba(0,0,0,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-xs tracking-[0.18em] uppercase text-white/50 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
