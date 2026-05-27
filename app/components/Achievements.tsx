const academic = [
  {
    title: "JEE Main 2023",
    value: "99 Percentile",
    detail: "Top 1% among 1.4 million candidates nationwide",
    icon: "🏆",
  },
  {
    title: "JEE Advanced 2023",
    value: "AIR 11,994",
    detail: "Among 200,000+ aspirants — qualified for central institute counselling",
    icon: "🎯",
  },
  {
    title: "DSA & Competitive Programming",
    value: "300+ Problems",
    detail: "Solved across LeetCode, Codeforces, and GeeksForGeeks",
    icon: "⚡",
  },
];

const leadership = [
  {
    role: "Core Team Member — Design",
    org: "Aurora Fest, IIITM Gwalior",
    detail: "Designed visual branding and ensured consistent design language across all fest events.",
  },
  {
    role: "Core Team Member",
    org: "Urja Sports Fest, IIITM Gwalior",
    detail: "Managed logistics and team coordination for the institute's annual sports events.",
  },
  {
    role: "Founder",
    org: "It's Not Too Late — Climate Org",
    detail: "Led a student climate organization with workshops, campaigns, and local tree-planting drives.",
  },
  {
    role: "Member",
    org: "Rotaract Club",
    detail: "Mentored underprivileged children via weekend literacy sessions and community initiatives.",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">Recognition & Leadership</span>
        </div>

        <h2
          className="reveal text-5xl md:text-7xl font-light tracking-tight mb-16"
          style={{ transitionDelay: "0.1s" }}
        >
          Beyond
          <br />
          <span style={{ color: "var(--gold)" }}>the code.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Academic achievements */}
          <div>
            <p className="reveal text-xs tracking-[0.2em] uppercase text-white/30 mb-8" style={{ transitionDelay: "0.1s" }}>
              Academic & Competitive
            </p>
            <div className="space-y-px bg-white/[0.06]">
              {academic.map((a, i) => (
                <div
                  key={a.title}
                  className="reveal card p-6 group"
                  style={{ transitionDelay: `${0.1 * i}s` }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl mt-0.5">{a.icon}</span>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-1">{a.title}</p>
                      <p
                        className="text-2xl mb-1 group-hover:text-[#c9a84c] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-bebas)", color: "var(--gold-light)" }}
                      >
                        {a.value}
                      </p>
                      <p className="text-xs text-white/35 leading-relaxed">{a.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <p className="reveal text-xs tracking-[0.2em] uppercase text-white/30 mb-8" style={{ transitionDelay: "0.1s" }}>
              Positions of Responsibility
            </p>
            <div className="space-y-px bg-white/[0.06]">
              {leadership.map((l, i) => (
                <div
                  key={l.role}
                  className="reveal card p-6 group"
                  style={{ transitionDelay: `${0.1 * i}s` }}
                >
                  <p className="text-sm font-medium text-white group-hover:text-[#c9a84c] transition-colors duration-300 mb-0.5">
                    {l.role}
                  </p>
                  <p className="text-xs text-white/40 mb-2">{l.org}</p>
                  <p className="text-xs text-white/30 leading-relaxed">{l.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
