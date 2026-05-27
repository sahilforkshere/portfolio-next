const experiences = [
  {
    role: "Software Engineer",
    company: "Stealth Startup",
    period: "Feb 2026 — Present",
    type: "Full-time · Remote",
    stack: ["Node.js", "Supabase", "PostgreSQL", "Redis", "CI/CD"],
    bullets: [
      "Architected scalable backend systems utilizing Node.js and Supabase, ensuring high availability and robust data processing capabilities.",
      "Spearheaded feature planning and execution, translating complex product requirements into precise, developer-ready technical roadmaps.",
      "Authored comprehensive API documentation and system guidelines to streamline developer workflows across the team.",
    ],
    current: true,
  },
  {
    role: "Web Development Intern",
    company: "Yamaha Motor Solutions India Pvt. Ltd.",
    period: "May 2025 — Jul 2025",
    type: "Internship · Remote",
    stack: ["React.js", "Node.js", "MongoDB", "JWT"],
    bullets: [
      "Built an internal React.js + Node.js dashboard with custom visualization tools, accelerating cross-departmental reporting speeds by 30%.",
      "Engineered IoT API integrations and optimized MongoDB schemas for agri-machinery, reducing manual data entry by 20%.",
      "Integrated JWT authentication for secure dealer and farmer data access, ensuring 100% compliance with security protocols.",
    ],
    current: false,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 md:py-40 px-6 grid-bg">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">Experience</span>
        </div>

        <h2
          className="reveal text-5xl md:text-7xl font-light tracking-tight mb-16"
          style={{ transitionDelay: "0.1s" }}
        >
          Where I&apos;ve
          <br />
          <span style={{ color: "var(--gold)" }}>worked.</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "rgba(201,168,76,0.15)" }}
          />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <div
                key={exp.role + exp.company}
                className="reveal md:pl-12 relative"
                style={{ transitionDelay: `${0.1 * i}s` }}
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:block absolute left-0 top-6 w-2.5 h-2.5 rounded-full -translate-x-[5px]"
                  style={{
                    background: exp.current ? "var(--gold)" : "rgba(255,255,255,0.2)",
                    boxShadow: exp.current ? "0 0 12px rgba(201,168,76,0.5)" : "none",
                  }}
                />

                <div className="card p-8 mb-px group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-medium text-white group-hover:text-[#c9a84c] transition-colors duration-300">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span
                            className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border"
                            style={{ borderColor: "rgba(201,168,76,0.4)", color: "var(--gold)" }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-white/50 text-sm">{exp.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-white/60 font-mono">{exp.period}</p>
                      <p className="text-xs text-white/25 mt-0.5">{exp.type}</p>
                    </div>
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] tracking-wider px-2.5 py-1 border border-white/10 text-white/40"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2.5">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-white/45 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
