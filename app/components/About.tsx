import DevAvatar from "./DevAvatar";
import PortfolioTerminal from "./PortfolioTerminal";

export default function About() {
  return (
    <section id="about" className="py-32 md:py-40 px-6 grid-bg">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">About Me</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text */}
          <div>
            <h2
              className="reveal text-5xl md:text-7xl font-light leading-tight mb-8 tracking-tight"
              style={{ transitionDelay: "0.1s" }}
            >
              Building things
              <br />
              <span style={{ color: "var(--gold)" }}>for the web.</span>
            </h2>

            <div
              className="reveal space-y-4 text-white/50 text-sm md:text-[0.95rem] leading-relaxed"
              style={{ transitionDelay: "0.2s" }}
            >
              <p>
                Hi, I&apos;m <strong className="text-white font-medium">Sahil Pal</strong> — a
                Software Engineer and Full Stack Web Developer currently pursuing B.Tech in
                Information Technology at <strong className="text-white/80">IIITM Gwalior</strong>.
              </p>
              <p>
                I&apos;m currently building scalable backend systems at a stealth startup using
                Node.js, Supabase, and PostgreSQL. Previously interned at{" "}
                <strong className="text-white/80">Yamaha Motor Solutions India</strong>, where I
                shipped an internal dashboard that cut reporting time by 30%.
              </p>
              <p>
                I love the intersection of engineering and product — turning complex requirements
                into clean, performant systems that actually work at scale.
              </p>
            </div>

            <div
              className="reveal mt-10 grid grid-cols-2 gap-3"
              style={{ transitionDelay: "0.3s" }}
            >
              {[
                { k: "Location", v: "Gwalior, M.P., India" },
                { k: "Email", v: "paalsahil04@gmail.com" },
                { k: "Degree", v: "B.Tech IT — IIITM Gwalior" },
                { k: "Status", v: "Open to opportunities" },
              ].map((item) => (
                <div key={item.k} className="border-t border-white/10 pt-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-1">{item.k}</p>
                  <p className="text-sm text-white/75">{item.v}</p>
                </div>
              ))}
            </div>

            <div
              className="reveal mt-10 flex flex-wrap gap-4"
              style={{ transitionDelay: "0.4s" }}
            >
              <a
                href="/resume.pdf"
                download="Sahil_Pal_Resume.pdf"
                className="inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase px-6 py-3 border border-white/20 text-white/70 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <a
                href="https://github.com/sahilforkshere"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase px-6 py-3 border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Right — avatar + terminal */}
          <div className="reveal-right flex flex-col items-center gap-6 w-full" style={{ transitionDelay: "0.15s" }}>
            <div className="relative w-full max-w-[300px]">
              {/* Corner accents */}
              <span className="absolute top-4 left-4 w-4 h-4 border-t border-l z-10 pointer-events-none" style={{ borderColor: "var(--gold)" }} />
              <span className="absolute top-4 right-4 w-4 h-4 border-t border-r z-10 pointer-events-none" style={{ borderColor: "var(--gold)" }} />
              <span className="absolute bottom-4 left-4 w-4 h-4 border-b border-l z-10 pointer-events-none" style={{ borderColor: "var(--gold)" }} />
              <span className="absolute bottom-4 right-4 w-4 h-4 border-b border-r z-10 pointer-events-none" style={{ borderColor: "var(--gold)" }} />
              <DevAvatar />
            </div>

            <PortfolioTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
