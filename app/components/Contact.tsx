"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full bg-transparent border-b border-white/15 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c] transition-colors duration-300";

  return (
    <section id="contact" className="py-32 md:py-40 px-6">
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
              Have a project in mind, a role to fill, or just want to say hi?
              My inbox is always open.
            </p>

            <div className="reveal space-y-6" style={{ transitionDelay: "0.3s" }}>
              {[
                { label: "Email", value: "sahil@email.com", href: "mailto:sahil@email.com" },
                { label: "GitHub", value: "github.com/sahilpal", href: "https://github.com/sahilpal" },
                { label: "LinkedIn", value: "linkedin.com/in/sahilpal", href: "https://linkedin.com/in/sahilpal" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-6 group"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 w-16 pt-0.5 shrink-0 group-hover:text-[#c9a84c] transition-colors">
                    {item.label}
                  </span>
                  <span className="text-sm text-white/50 group-hover:text-white transition-colors duration-300 border-b border-transparent group-hover:border-white/20 pb-0.5">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            className="reveal space-y-8"
            style={{ transitionDelay: "0.15s" }}
          >
            <div>
              <label className="text-[10px] tracking-[0.2em] uppercase text-white/25 block mb-2">Name</label>
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
              <label className="text-[10px] tracking-[0.2em] uppercase text-white/25 block mb-2">Email</label>
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
              <label className="text-[10px] tracking-[0.2em] uppercase text-white/25 block mb-2">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="group flex items-center gap-4 text-xs tracking-[0.18em] uppercase text-white disabled:opacity-50 transition-all duration-300"
            >
              <span
                className="w-10 h-px transition-all duration-500 group-hover:w-16"
                style={{ background: "var(--gold)" }}
              />
              <span className="group-hover:text-[#c9a84c] transition-colors duration-300">
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Sent ✓"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
