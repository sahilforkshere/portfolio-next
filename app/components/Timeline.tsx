"use client";
import { useEffect, useRef } from "react";

const items = [
  {
    id: "platinux",
    type: "work",
    period: "May 2026",
    periodEnd: "Present",
    title: "Software Engineer Intern",
    org: "Platinux Labs",
    location: "Remote · Internship",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Streamlit", "AWS Lambda", "RSS Feed"],
    bullets: [
      "Building B2B SaaS products for agencies using Next.js and Supabase, integrating RSS feed pipelines and AWS Lambda serverless functions to automate content ingestion and processing workflows at scale.",
      "Developing full-stack features backed by PostgreSQL with Streamlit-powered internal dashboards, enabling agencies to monitor product analytics and client data in real time.",
    ],
    current: true,
    icon: "🚀",
  },
  {
    id: "swe",
    type: "work",
    period: "Feb 2026",
    periodEnd: "May 2026",
    title: "Software Engineer",
    org: "Stealth Startup",
    location: "Remote · Full-time",
    tags: ["Node.js", "Supabase", "PostgreSQL", "Redis", "CI/CD"],
    bullets: [
      "Architected scalable Node.js backend with Supabase for high availability and robust data processing.",
      "Spearheaded feature planning, translating product requirements into developer-ready technical roadmaps.",
      "Authored comprehensive API contracts and system guidelines to streamline team workflows.",
    ],
    current: false,
    icon: "💼",
  },
  {
    id: "intern",
    type: "work",
    period: "May 2025",
    periodEnd: "Jul 2025",
    title: "Web Development Intern",
    org: "Yamaha Motor Solutions India (YMSLI)",
    location: "Remote · Internship",
    tags: ["React.js", "Node.js", "MongoDB", "JWT"],
    bullets: [
      "Built internal React + Node.js dashboard with custom viz tools — 30% faster cross-dept reporting.",
      "Engineered IoT API integrations and optimized MongoDB schemas for agri-machinery (-20% manual entry).",
      "Integrated JWT authentication for 100% compliance with organizational security protocols.",
    ],
    current: false,
    icon: "🔧",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef    = useRef<HTMLDivElement>(null);

  /* Scroll-driven line fill */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !fillRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const wH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (wH * 0.72 - top) / (height * 0.88)));
      fillRef.current.style.transform = `scaleY(${progress})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* IntersectionObserver — reveal each item + dot */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("tl-visible");
      }),
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    );
    document.querySelectorAll(".tl-item").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 md:py-40 px-6 grid-bg">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">My Journey</span>
        </div>

        <h2 className="reveal text-5xl md:text-7xl font-light tracking-tight mb-20" style={{ transitionDelay: "0.1s" }}>
          How I got<br />
          <span style={{ color: "var(--gold)" }}>here.</span>
        </h2>

        {/* Timeline */}
        <div className="relative">

          {/* ── Track line ── */}
          <div className="absolute left-5 top-0 h-full"
            style={{ width: 1, background: "rgba(var(--sur),0.1)" }}>
            {/* Gold fill (scroll-driven) */}
            <div ref={fillRef} className="w-full h-full"
              style={{
                transformOrigin: "top",
                transform: "scaleY(0)",
                background: "linear-gradient(to bottom, var(--gold), var(--gold-light))",
                willChange: "transform",
                transition: "transform 0.08s linear",
              }} />
          </div>

          {/* ── Items ── */}
          <div className="space-y-0">
            {items.map((item, i) => (
              <div
                key={item.id}
                className="tl-item flex gap-8 pb-16 last:pb-0"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                {/* Left col: dot */}
                <div className="relative flex-shrink-0 w-10 flex flex-col items-center">
                  {/* Dot */}
                  <div
                    className="tl-dot relative z-10 mt-5 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                    style={{
                      border: "1.5px solid rgba(var(--sur),0.15)",
                      background: "var(--bg)",
                    }}
                  >
                    <span style={{ filter: "grayscale(1)", opacity: 0.6, fontSize: 10 }}>{item.icon}</span>
                  </div>
                </div>

                {/* Right col: card */}
                <div className="flex-1 pt-3 pb-2">
                  <div className="card p-6 md:p-8 group hover:border-[rgba(201,168,76,0.35)] transition-all duration-300">

                    {/* Row: title + period */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <div className="flex items-center flex-wrap gap-2 mb-1">
                          <h3 className="text-base md:text-lg font-medium" style={{ color: "rgba(var(--tx),0.9)" }}>
                            {item.title}
                          </h3>
                          {item.current && (
                            <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border"
                              style={{ borderColor: "rgba(201,168,76,0.4)", color: "var(--gold)" }}>
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm" style={{ color: "rgba(var(--tx),0.5)" }}>{item.org}</p>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <p className="font-mono text-sm" style={{ color: "rgba(var(--tx),0.55)" }}>
                          {item.period} — {item.periodEnd}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(var(--tx),0.3)" }}>{item.location}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.tags.map(t => (
                        <span key={t}
                          className="text-[10px] tracking-wider px-2.5 py-1"
                          style={{
                            border: "1px solid rgba(var(--sur),0.1)",
                            color: "rgba(var(--tx),0.38)",
                          }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2.5">
                      {item.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm leading-relaxed"
                          style={{ color: "rgba(var(--tx),0.45)" }}>
                          <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                          {b}
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
