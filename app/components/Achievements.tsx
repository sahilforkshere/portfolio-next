"use client";

const leadership = [
  {
    role: "Core Team Member — Design",
    org: "Aurora Fest, IIITM Gwalior",
    detail: "Designed visual branding and ensured consistent design language across all fest events.",
    index: "01",
  },
  {
    role: "Core Team Member",
    org: "Urja Sports Fest, IIITM Gwalior",
    detail: "Managed logistics and team coordination for the institute's annual sports events.",
    index: "02",
  },
  {
    role: "Founder",
    org: "It's Not Too Late — Climate Org",
    detail: "Led a student climate organization with workshops, campaigns, and local tree-planting drives.",
    index: "03",
  },
  {
    role: "Member",
    org: "Rotaract Club",
    detail: "Mentored underprivileged children via weekend literacy sessions and community initiatives.",
    index: "04",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">Leadership</span>
        </div>

        <h2
          className="reveal text-5xl md:text-7xl font-light tracking-tight mb-20"
          style={{ transitionDelay: "0.1s" }}
        >
          Beyond
          <br />
          <span style={{ color: "var(--gold)" }}>the code.</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-px bg-white/[0.06]">
          {leadership.map((l, i) => (
            <div
              key={l.role}
              className="reveal skill-card p-8 group"
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              {/* index + org row */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "rgba(var(--tx), 0.2)" }}
                >
                  {l.org}
                </span>
                <span
                  className="text-xs tabular-nums"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    color: "rgba(201,168,76,0.25)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {l.index}
                </span>
              </div>

              {/* role — large title */}
              <p
                className="text-xl md:text-2xl mb-4 leading-tight skill-card-title"
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.05em" }}
              >
                {l.role}
              </p>

              {/* divider */}
              <div
                className="mb-4"
                style={{
                  height: 1,
                  background: "linear-gradient(90deg, rgba(201,168,76,0.25), transparent)",
                  transition: "opacity 0.3s",
                }}
              />

              {/* detail */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(var(--tx), 0.38)" }}
              >
                {l.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
