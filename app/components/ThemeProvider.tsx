"use client";
import { createContext, useContext, useLayoutEffect, useState } from "react";

type Theme = "dark" | "light";
interface Ctx { theme: Theme; toggle: () => void }

const ThemeCtx = createContext<Ctx>({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  /* useLayoutEffect fires synchronously before the browser paints —
     the same effect as the old inline <script>, but no React 19 warning. */
  useLayoutEffect(() => {
    const saved = (localStorage.getItem("sp-theme") as Theme) ?? "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sp-theme", next);
  };

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
