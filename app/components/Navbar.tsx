"use client";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "About",      href: "#about" },
  { label: "Journey",    href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(20,16,10,0.1)";
  const bg = isDark ? "rgba(0,0,0,0.88)" : "rgba(242,239,232,0.92)";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>
      <div className="mx-4 mt-4 rounded-sm px-5 py-3 flex items-center justify-between"
        style={{ background: bg, backdropFilter: "blur(24px)", border: `1px solid ${borderColor}` }}>

        <a href="#hero" className="text-xl tracking-widest" style={{ fontFamily: "var(--font-bebas)", color: "var(--gold)" }}>
          SP.
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href}
                className="text-[11px] tracking-[0.16em] uppercase transition-colors duration-300"
                style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(20,16,10,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = isDark ? "#fff" : "rgb(20,16,10)")}
                onMouseLeave={e => (e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.45)" : "rgba(20,16,10,0.5)")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a href="mailto:paalsahil04@gmail.com"
            className="text-[11px] tracking-[0.18em] uppercase px-4 py-2 transition-all duration-300"
            style={{
              border: `1px solid rgba(var(--gold), 0.4)`,
              borderColor: "rgba(201,168,76,0.4)",
              color: "var(--gold)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
          style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(20,16,10,0.6)" }}>
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`h-px bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mx-4 mt-1 rounded-sm p-4 space-y-3"
          style={{ background: isDark ? "rgba(0,0,0,0.95)" : "rgba(242,239,232,0.97)", border: `1px solid ${borderColor}` }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block py-1.5 text-[11px] tracking-[0.18em] uppercase transition-colors"
              style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(20,16,10,0.55)" }}>
              {l.label}
            </a>
          ))}
          <div className="pt-2 border-t" style={{ borderColor }}>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
