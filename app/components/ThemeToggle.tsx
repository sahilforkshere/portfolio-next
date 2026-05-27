"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase transition-colors duration-300"
      style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(20,16,10,0.45)" }}
    >
      {/* Track */}
      <div
        className="relative w-11 h-5 rounded-full transition-all duration-500"
        style={{
          background: isDark ? "rgba(201,168,76,0.12)" : "rgba(20,16,10,0.1)",
          border: `1px solid ${isDark ? "rgba(201,168,76,0.35)" : "rgba(20,16,10,0.2)"}`,
        }}
      >
        {/* Thumb */}
        <div
          className="absolute top-0.5 bottom-0.5 aspect-square rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            left: isDark ? "calc(100% - 1.1rem - 2px)" : "2px",
            background: isDark ? "var(--gold)" : "rgb(20,16,10)",
            fontSize: 9,
          }}
        >
          {isDark ? "🌙" : "☀️"}
        </div>
      </div>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
