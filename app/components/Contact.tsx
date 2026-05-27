"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Replace with Formspree/EmailJS/your API endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/12 py-3 text-sm text-white placeholder-white/18 focus:outline-none focus:border-[#c9a84c] transition-colors duration-300";

  const socials = [
    {
      label: "Email",
      value: "paalsahil04@gmail.com",
      href: "mailto:paalsahil04@gmail.com",
    },
    {
      label: "GitHub",
      value: "github.com/sahilforkshere",
      href: "https://github.com/sahilforkshere",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/sahilpal",
      href: "https://linkedin.com/in/sahilpal",
    },
    {
      label: "LeetCode",
      value: "sahil_100804",
      href: "https://leetcode.com/sahil_100804",
    },
  ];

  return (
    <section id="contact" className="py-32 md:py-40 px-6 grid-bg">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">Get In Touch</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left */}
          <div>
            <h2
              className="reveal text-5xl md:text-7xl font-light tracking-tight mb-8"
              style={{ transitionDelay: "0.1s" }}
            >
              Let&apos;s work
              <br />
              <span style={{ color: "var(--gold)" }}>together.</span>
            </h2>

            <p
              className="reveal text-sm text-white/40 leading-relaxed mb-12 max-w-sm"
              style={{ transitionDelay: "0.2s" }}
            >
              Open to full-time roles, freelance projects, and interesting collaborations.
              My inbox is always open — say hi.
            </p>

            <div className="reveal space-y-6" style={{ transitionDelay: "0.3s" }}>
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-6 group"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 w-16 pt-0.5 shrink-0 group-hover:text-[#c9a84c] transition-colors duration-300">
                    {item.label}
                  </span>
                  <span className="text-sm text-white/50 group-hover:text-white transition-colors duration-300 border-b border-transparent group-hover:border-white/15 pb-0.5">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="reveal space-y-8"
            style={{ transitionDelay: "0.15s" }}
          >
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-white/22 block mb-2">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-white/22 block mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-white/22 block mb-2">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project or opportunity..."
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="group flex items-center gap-4 text-xs tracking-[0.18em] uppercase text-white disabled:opacity-50 transition-all duration-300 hover:gap-6"
            >
              <span
                className="h-px transition-all duration-500 w-10 group-hover:w-14"
                style={{ background: "var(--gold)" }}
              />
              <span className="group-hover:text-[#c9a84c] transition-colors duration-300">
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent ✓"}
              </span>
            </button>
          </form>
        </div>

        {/* ── GitHub contribution graph — full width ── */}
        <div className="reveal mt-20 md:mt-24" style={{ transitionDelay: "0.25s" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="line-gold" />
              <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: "rgba(var(--tx),0.35)" }}>
                GitHub Activity
              </p>
            </div>
            <a
              href="https://github.com/sahilforkshere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.18em] uppercase transition-colors duration-300"
              style={{ color: "rgba(var(--tx),0.22)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(var(--tx),0.22)")}
            >
              github.com/sahilforkshere ↗
            </a>
          </div>

          {/* dark-theme activity graph — fits the portfolio palette */}
          <div style={{
            border: "1px solid rgba(201,168,76,0.18)",
            background: "rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=sahilforkshere&bg_color=000000&color=c9a84c&line=c9a84c&point=e8c97a&area=true&hide_border=true&area_color=c9a84c"
              alt="Sahil Pal GitHub activity graph"
              style={{
                display: "block",
                width: "100%",
                minWidth: 660,
                height: "auto",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
