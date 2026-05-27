export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs tracking-[0.15em] uppercase text-white/20">
          © {new Date().getFullYear()} Sahil Pal
        </p>
        <p
          className="text-lg tracking-widest text-white/10"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          SAHIL PAL
        </p>
        <div className="flex gap-6">
          {[
            { l: "GitHub", h: "https://github.com/sahilpal" },
            { l: "LinkedIn", h: "https://linkedin.com/in/sahilpal" },
            { l: "Twitter", h: "https://twitter.com/sahilpal" },
          ].map((x) => (
            <a
              key={x.l}
              href={x.h}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.15em] uppercase text-white/20 hover:text-[#c9a84c] transition-colors duration-300"
            >
              {x.l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
