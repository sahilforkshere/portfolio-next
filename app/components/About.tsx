export default function About() {
  return (
    <section id="about" className="py-32 md:py-40 px-6 grid-bg">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">About Me</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text left */}
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
              className="reveal space-y-4 text-white/50 text-sm md:text-base leading-relaxed"
              style={{ transitionDelay: "0.2s" }}
            >
              <p>
                Hi, I&apos;m <strong className="text-white font-medium">Sahil Pal</strong> — a
                Software Engineer and Full Stack Web Developer passionate about crafting
                fast, accessible, and beautifully designed digital experiences.
              </p>
              <p>
                I specialize in building end-to-end web applications, from polished
                user interfaces to robust server-side systems. I care deeply about
                clean code, performance, and the details that make products feel great.
              </p>
            </div>

            <div
              className="reveal mt-10 grid grid-cols-2 gap-3"
              style={{ transitionDelay: "0.3s" }}
            >
              {[
                { k: "Location", v: "Your City, India" },
                { k: "Email", v: "sahil@email.com" },
                { k: "Role", v: "Software Engineer" },
                { k: "Status", v: "Open to work" },
              ].map((item) => (
                <div key={item.k} className="border-t border-white/10 pt-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-1">{item.k}</p>
                  <p className="text-sm text-white/80">{item.v}</p>
                </div>
              ))}
            </div>

            <div className="reveal mt-10" style={{ transitionDelay: "0.4s" }}>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase px-6 py-3 border border-white/20 text-white/70 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* Avatar right */}
          <div className="reveal-right flex justify-center" style={{ transitionDelay: "0.15s" }}>
            <div className="relative">
              <div
                className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
                style={{
                  border: "1px solid rgba(201,168,76,0.2)",
                  background: "rgba(201,168,76,0.03)",
                }}
              >
                <span className="text-[120px] select-none">👨‍💻</span>
              </div>
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: "var(--gold)" }} />
              <span className="absolute top-0 right-0 w-4 h-4 border-t border-r" style={{ borderColor: "var(--gold)" }} />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l" style={{ borderColor: "var(--gold)" }} />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: "var(--gold)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
