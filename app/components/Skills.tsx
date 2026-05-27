const categories = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C / C++", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "React Native", "Tailwind CSS", "Redux", "Three.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "CI / CD"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "Supabase", "Redis", "Mongoose"],
  },
  {
    title: "Tools & Infra",
    items: ["Git / GitHub", "Docker", "Linux", "Postman", "GitHub Actions", "Expo"],
  },
];

const stats = [
  { n: "3+", label: "Production Projects" },
  { n: "2+", label: "Years Coding" },
  { n: "300+", label: "DSA Problems Solved" },
  { n: "99%ile", label: "JEE Main 2023" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">Skills & Stack</span>
        </div>

        <h2
          className="reveal text-5xl md:text-7xl font-light tracking-tight mb-16"
          style={{ transitionDelay: "0.1s" }}
        >
          What I work
          <br />
          <span style={{ color: "var(--gold)" }}>with.</span>
        </h2>

        {/* Skill grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.06]">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="reveal card p-8"
              style={{ transitionDelay: `${0.07 * i}s` }}
            >
              <h3
                className="text-2xl mb-6 tracking-wider"
                style={{ fontFamily: "var(--font-bebas)", color: "var(--gold)" }}
              >
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/55">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Competitive programming card spans remaining space */}
          <div
            className="reveal card p-8 sm:col-span-2 md:col-span-1"
            style={{ transitionDelay: "0.35s" }}
          >
            <h3
              className="text-2xl mb-6 tracking-wider"
              style={{ fontFamily: "var(--font-bebas)", color: "var(--gold)" }}
            >
              Competitive
            </h3>
            <ul className="space-y-3">
              {[
                "LeetCode — 300+ solved",
                "Codeforces — Active",
                "GFG — Active",
                "JEE Main — 99 percentile",
                "JEE Advanced — AIR 11,994",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/55">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--gold)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] mt-px">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal card p-8 text-center"
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              <p
                className="text-4xl md:text-5xl mb-2"
                style={{ fontFamily: "var(--font-bebas)", color: "var(--gold-light)" }}
              >
                {s.n}
              </p>
              <p className="text-xs tracking-[0.15em] uppercase text-white/25">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
