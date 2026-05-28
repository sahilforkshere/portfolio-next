"use client";
import { useRef, MouseEvent } from "react";

const projects = [
  {
    num: "01",
    title: "DevDuels",
    subtitle: "Online Coding Battle Platform",
    type: "Self Project",
    desc: "Real-time competitive coding platform where developers battle head-to-head with timed contests, Monaco Editor, live leaderboards, and conflict-free reconnection logic.",
    highlights: [
      "JWT auth with access + refresh tokens",
      "Live sync via Socket.IO rooms",
      "Monaco Editor integration",
    ],
    tags: ["React", "Node.js", "Socket.IO", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Soham271/DevDuel",
    live: null,
  },
  {
    num: "02",
    title: "MedFleet",
    subtitle: "Telemedicine & Emergency Response Platform",
    type: "Freelance Project",
    desc: "Scalable real-time dispatch application load-tested for 1,200+ concurrent users with sub-200ms queries. Cut ambulance dispatch time from 5 min to 90 seconds.",
    highlights: [
      "1,200+ concurrent users, <200ms queries",
      "Dispatch time: 5 min → 90 seconds",
      "Geo-fencing + push notification guarantees",
    ],
    tags: ["React Native", "Supabase", "RLS", "Geolocation", "Push Notifications"],
    github: "https://github.com/sahilforkshere/HealthApp",
    live: null,
  },
  {
    num: "03",
    title: "SnapSnack",
    subtitle: "Food Sharing Mobile App",
    type: "Self Project",
    desc: "React Native TypeScript app for real-time food sharing with location-aware feeds, live Supabase subscriptions, RLS-secured Postgres schema, and CDN-backed image delivery.",
    highlights: [
      "Location-aware real-time feeds",
      "Supabase RLS-secured schema",
      "CDN-backed image uploads",
    ],
    tags: ["React Native", "TypeScript", "Supabase", "PostgreSQL", "CDN"],
    github: "https://github.com/sahilforkshere/SnapSnack",
    live: null,
  },
];

const IconGithub = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

/* ── 3-D tilt card ───────────────────────────────────────── */
function TiltCard({ children, delay }: { children: React.ReactNode; delay: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;   // -0.5 → 0.5
    const y = (e.clientY - top)  / height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.01)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="reveal card group p-8"
      style={{
        transitionDelay: delay,
        transition: "transform 0.15s ease, opacity 0.6s ease, border-color 0.3s",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 md:py-40 px-6 grid-bg">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">Selected Work</span>
        </div>

        <h2
          className="reveal text-5xl md:text-7xl font-light tracking-tight mb-16"
          style={{ transitionDelay: "0.1s" }}
        >
          Featured
          <br />
          <span style={{ color: "var(--gold)" }}>projects.</span>
        </h2>

        <div className="space-y-px bg-white/[0.06]">
          {projects.map((p, i) => (
            <TiltCard key={p.num} delay={`${0.08 * i}s`}>
              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
                {/* Left */}
                <div>
                  <div className="flex items-baseline gap-4 mb-2">
                    <span
                      className="text-4xl text-white/10 group-hover:text-[#c9a84c]/25 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {p.num}
                    </span>
                    <div>
                      <h3 className="text-xl font-medium text-white group-hover:text-[#c9a84c] transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="text-xs text-white/30 tracking-wider">{p.subtitle}</p>
                    </div>
                    <span
                      className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border ml-auto hidden sm:block"
                      style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.25)" }}
                    >
                      {p.type}
                    </span>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-5 max-w-2xl">{p.desc}</p>

                  <ul className="space-y-1.5 mb-5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-xs text-white/35">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] tracking-wider px-2.5 py-1 border border-white/10 text-white/35 group-hover:border-[rgba(201,168,76,0.2)] group-hover:text-white/50 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex md:flex-col gap-4 items-center">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/30 hover:text-[#c9a84c] transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <IconGithub />
                    <span className="hidden md:inline">Code</span>
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/30 hover:text-[#c9a84c] transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="hidden md:inline">Live</span>
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="reveal mt-10 flex justify-end" style={{ transitionDelay: "0.25s" }}>
          <a
            href="https://github.com/sahilforkshere"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-white/25 hover:text-[#c9a84c] transition-colors duration-300"
          >
            More on GitHub
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
