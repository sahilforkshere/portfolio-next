const categories = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker", "AWS", "Figma", "Linux", "CI / CD"],
  },
];

const stats = [
  { n: "20+", label: "Projects Built" },
  { n: "2+", label: "Years Experience" },
  { n: "10+", label: "Happy Clients" },
  { n: "5+", label: "OSS Contributions" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">Skills & Tools</span>
        </div>

        <h2
          className="reveal text-5xl md:text-7xl font-light tracking-tight mb-16"
          style={{ transitionDelay: "0.1s" }}
        >
          What I work
          <br />
          <span style={{ color: "var(--gold)" }}>with.</span>
        </h2>

        {/* Skill categories */}
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="reveal card p-8"
              style={{ transitionDelay: `${0.1 * i}s` }}
            >
              <h3
                className="text-2xl mb-6 tracking-wider"
                style={{ fontFamily: "var(--font-bebas)", color: "var(--gold)" }}
              >
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="w-1 h-1 rounded-full bg-[#c9a84c] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] mt-px">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal card p-8 text-center"
              style={{ transitionDelay: `${0.1 * i}s` }}
            >
              <p
                className="text-4xl md:text-5xl mb-2"
                style={{ fontFamily: "var(--font-bebas)", color: "var(--gold-light)" }}
              >
                {s.n}
              </p>
              <p className="text-xs tracking-[0.15em] uppercase text-white/30">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
