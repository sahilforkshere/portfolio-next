const projects = [
  {
    num: "01",
    title: "Project One",
    desc: "A full-stack web application with real-time updates, authentication, and a sleek admin dashboard.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    live: "#",
    github: "#",
  },
  {
    num: "02",
    title: "Project Two",
    desc: "An e-commerce platform with Stripe payments, inventory management, and order tracking.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "TypeScript"],
    live: "#",
    github: "#",
  },
  {
    num: "03",
    title: "Project Three",
    desc: "A developer productivity tool that automates repetitive tasks via CLI and REST APIs.",
    tags: ["Python", "FastAPI", "Docker"],
    live: "#",
    github: "#",
  },
  {
    num: "04",
    title: "Project Four",
    desc: "A real-time chat application with rooms, file sharing, and end-to-end encryption.",
    tags: ["Socket.io", "React", "Express"],
    live: "#",
    github: "#",
  },
];

const IconGithub = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const IconExternal = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

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
            <div
              key={p.num}
              className="reveal card group grid md:grid-cols-[80px_1fr_auto] gap-6 md:gap-10 p-6 md:p-8 items-start md:items-center"
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              {/* Number */}
              <span
                className="text-4xl text-white/10 group-hover:text-[#c9a84c]/30 transition-colors duration-300 hidden md:block"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {p.num}
              </span>

              {/* Body */}
              <div>
                <h3 className="text-xl font-medium text-white group-hover:text-[#c9a84c] transition-colors duration-300 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-4 max-w-xl">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] tracking-wider px-2.5 py-1 border border-white/10 text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 text-white/30 group-hover:text-white/60 transition-colors duration-300">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                  <IconGithub />
                </a>
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a84c] transition-colors" aria-label="Live">
                  <IconExternal />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 flex justify-end" style={{ transitionDelay: "0.3s" }}>
          <a
            href="https://github.com/sahilpal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-white/30 hover:text-[#c9a84c] transition-colors duration-300"
          >
            All projects on GitHub
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
