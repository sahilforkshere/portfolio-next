"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

/* ─── types ─────────────────────────────────────────────── */
type LineKind = "cmd" | "out" | "err" | "info" | "blank";
interface Line { id: number; kind: LineKind; text: string }

let _id = 0;
const L = (kind: LineKind, text = ""): Line => ({ id: _id++, kind, text });

/* ─── file-system ────────────────────────────────────────── */
const FILES: Record<string, string> = {
  "profile.md": [
    "╔══════════════════════════════════════════════╗",
    "║           SAHIL PAL — profile.md             ║",
    "╚══════════════════════════════════════════════╝",
    "",
    "  Role      │ Software Engineer · Full Stack Dev",
    "  Education │ B.Tech IT — IIITM Gwalior (2023–27)",
    "  CGPA      │ 7.52",
    "  Location  │ Gwalior, M.P., India",
    "  Status    │ Open to opportunities",
    "",
    "  Building scalable backend systems at a stealth",
    "  startup with Node.js, Supabase, PostgreSQL.",
    "  Ex-intern @ Yamaha Motor Solutions India.",
    "",
    "  JEE Main 99%ile · JEE Adv AIR 11,994",
    "  300+ DSA problems across LeetCode / CF / GFG",
  ].join("\n"),

  "skills.txt": [
    "  Languages  │ JavaScript  TypeScript  Python  C/C++  SQL",
    "  Frontend   │ React.js  Next.js  React Native  Tailwind  Redux",
    "  Backend    │ Node.js  Express.js  REST APIs  Socket.IO  CI/CD",
    "  Databases  │ PostgreSQL  MongoDB  Supabase  Redis  Mongoose",
    "  Tools      │ Git  Docker  Linux  Postman  GitHub Actions  Expo",
  ].join("\n"),

  "experience.txt": [
    "  [1]  Software Engineer — Stealth Startup",
    "       Feb 2026 – Present · Remote · Full-time",
    "       ▸ Architected Node.js + Supabase backend",
    "       ▸ API contract design & feature roadmaps",
    "       Stack: Node.js · Supabase · PostgreSQL · Redis",
    "",
    "  [2]  Web Dev Intern — Yamaha Motor Solutions India",
    "       May 2025 – Jul 2025 · Remote",
    "       ▸ React + Node.js dashboard (−30% report time)",
    "       ▸ IoT API integrations & MongoDB optimisation",
    "       ▸ JWT auth — 100% security compliance",
    "       Stack: React.js · Node.js · MongoDB · JWT",
  ].join("\n"),

  "contact.txt": [
    "  Email    │ paalsahil04@gmail.com",
    "  GitHub   │ github.com/sahilforkshere",
    "  LinkedIn │ linkedin.com/in/sahilpal",
    "  LeetCode │ leetcode.com/sahil_100804",
  ].join("\n"),

  "projects/devduels": [
    "  DevDuels — Real-time Competitive Coding Platform",
    "  ─────────────────────────────────────────────────",
    "  ▸ Live 1v1 coding battles with real-time verdicts",
    "  ▸ Multiplayer rooms via Socket.IO",
    "  ▸ Problem bank with auto test-case evaluation",
    "  Stack : React · Node.js · MongoDB · Socket.IO",
    "  GitHub: github.com/sahilforkshere/DevDuels",
  ].join("\n"),

  "projects/medfleet": [
    "  MedFleet — Medical Resource Allocation System",
    "  ───────────────────────────────────────────────",
    "  ▸ Real-time ambulance & resource tracking",
    "  ▸ Geolocation-based nearest-unit dispatch",
    "  ▸ Admin dashboard with live maps",
    "  Stack : React · Node.js · PostgreSQL · Socket.IO",
    "  GitHub: github.com/sahilforkshere/MedFleet",
  ].join("\n"),

  "projects/snapsnack": [
    "  SnapSnack — AI-Powered Recipe Finder",
    "  ─────────────────────────────────────",
    "  ▸ Scan fridge → instant recipe suggestions",
    "  ▸ Gemini Vision API for ingredient detection",
    "  ▸ Swipe UX, nutrition info, smart filters",
    "  Stack : React Native · Gemini API · Expo",
    "  GitHub: github.com/sahilforkshere/SnapSnack",
  ].join("\n"),
};

const LS_DIRS: Record<string, string[]> = {
  "~":          ["profile.md", "skills.txt", "experience.txt", "contact.txt", "resume.pdf", "projects/"],
  "~/projects": ["devduels", "medfleet", "snapsnack"],
};

const NEOFETCH = [
  "        .---.         sahil@portfolio",
  "       /     \\        ───────────────",
  "      | () () |       OS: Arch Linux (Portfolio Edition)",
  "       \\  ^  /        Shell: zsh 5.9",
  "        |||||         DE: Next.js 16 + Tailwind CSS",
  "        |||||         WM: Framer Motion",
  "                      CPU: Node.js 20 @ 3.2 GHz",
  "  ██ ██ ██ ██ ██      GPU: Three.js (WebGL)",
  "  ██ ██ ██ ██ ██      RAM: ∞ (async/await)",
  "                      Uptime: 2+ yrs coding",
];

const HELP_LINES = [
  "  Command           Description",
  "  ───────────────── ─────────────────────────────────",
  "  whoami            about me",
  "  ls [projects/]    list files / project names",
  "  cat <file>        read a file",
  "  skills            view full tech stack",
  "  projects          list all projects",
  "  experience        work history",
  "  contact           get in touch",
  "  neofetch          system info",
  "  open <github|linkedin|leetcode>  open in new tab",
  "  pwd               print working directory",
  "  cd [dir]          change directory",
  "  clear             clear terminal",
  "",
  "  Tip: use ↑ ↓ for history · Tab to autocomplete",
];

const OPEN_URLS: Record<string, string> = {
  github:   "https://github.com/sahilforkshere",
  linkedin: "https://linkedin.com/in/sahilpal",
  leetcode: "https://leetcode.com/sahil_100804",
};

const ALL_CMDS = [
  "whoami","ls","cat","skills","projects","experience",
  "contact","neofetch","open","pwd","cd","clear","help",
];

/* ─── welcome ────────────────────────────────────────────── */
const WELCOME: Line[] = [
  L("info", "Welcome to Sahil's Portfolio Terminal v1.0.0"),
  L("info", "Type  help  to see available commands."),
  L("blank"),
];

/* ─── component ──────────────────────────────────────────── */
export default function PortfolioTerminal() {
  const [lines, setLines]     = useState<Line[]>(WELCOME);
  const [input, setInput]     = useState("");
  const [cwd, setCwd]         = useState("~");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx]       = useState(-1);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = (...ls: Line[]) => setLines(p => [...p, ...ls]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const newHistory = [trimmed, ...history].slice(0, 50);
    setHistory(newHistory);
    setHIdx(-1);

    push(L("cmd", `${cwd} $ ${trimmed}`));

    const [cmd, ...args] = trimmed.split(/\s+/);

    switch (cmd) {
      case "clear":
        setLines([]);
        return;

      case "help":
        HELP_LINES.forEach(t => push(L("out", t)));
        push(L("blank"));
        break;

      case "whoami":
        push(
          L("out", "  Sahil Pal"),
          L("out", "  Software Engineer · Full Stack Web Developer"),
          L("out", "  B.Tech IT — IIITM Gwalior · Open to work"),
          L("blank"),
        );
        break;

      case "pwd":
        push(L("out", `  /home/${cwd === "~" ? "sahil" : "sahil/projects"}`), L("blank"));
        break;

      case "cd": {
        const target = args[0] ?? "~";
        if (target === "~" || target === "") { setCwd("~"); push(L("blank")); break; }
        if (target === "projects" || target === "projects/") {
          setCwd("~/projects"); push(L("blank")); break;
        }
        if (target === "..") {
          setCwd("~"); push(L("blank")); break;
        }
        push(L("err", `  cd: ${target}: No such directory`), L("blank"));
        break;
      }

      case "ls": {
        const dir = args[0]
          ? (args[0].startsWith("projects") ? "~/projects" : cwd)
          : cwd;
        const entries = LS_DIRS[dir];
        if (!entries) { push(L("err", `  ls: cannot access '${args[0]}': No such directory`), L("blank")); break; }
        const row = entries
          .map(e => (e.endsWith("/") ? e : e))
          .join("   ");
        push(L("out", "  " + row), L("blank"));
        break;
      }

      case "cat": {
        if (!args[0]) { push(L("err", "  cat: missing operand"), L("blank")); break; }
        const key = args[0].replace(/^\.\//, "");
        const cwdKey = cwd === "~/projects" ? `projects/${key}` : key;
        const content = FILES[key] ?? FILES[cwdKey];
        if (!content) { push(L("err", `  cat: ${args[0]}: No such file`), L("blank")); break; }
        content.split("\n").forEach(t => push(L("out", t)));
        push(L("blank"));
        break;
      }

      case "skills":
        FILES["skills.txt"].split("\n").forEach(t => push(L("out", t)));
        push(L("blank"));
        break;

      case "experience":
        FILES["experience.txt"].split("\n").forEach(t => push(L("out", t)));
        push(L("blank"));
        break;

      case "contact":
        FILES["contact.txt"].split("\n").forEach(t => push(L("out", t)));
        push(L("blank"));
        break;

      case "projects":
        push(L("out", "  devduels    medfleet    snapsnack"), L("blank"));
        push(L("info", "  Use: cat projects/<name>  for details"), L("blank"));
        break;

      case "neofetch":
        NEOFETCH.forEach(t => push(L("out", t)));
        push(L("blank"));
        break;

      case "open": {
        const target = args[0]?.toLowerCase();
        const url = OPEN_URLS[target];
        if (!url) {
          push(L("err", `  open: unknown target '${target || ""}'. Try: github, linkedin, leetcode`), L("blank"));
          break;
        }
        window.open(url, "_blank");
        push(L("info", `  Opening ${url} ...`), L("blank"));
        break;
      }

      default:
        push(
          L("err", `  command not found: ${cmd}`),
          L("info", "  Type  help  for available commands."),
          L("blank"),
        );
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      setHIdx(next);
      setInput(history[next] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIdx - 1;
      if (next < 0) { setHIdx(-1); setInput(""); return; }
      setHIdx(next);
      setInput(history[next] ?? "");
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.split(/\s+/).pop() ?? "";
      const matches = ALL_CMDS.filter(c => c.startsWith(partial));
      if (matches.length === 1) {
        const parts = input.split(/\s+/);
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(" "));
      }
    }
  };

  const lineColor = (kind: LineKind) => {
    if (kind === "cmd")  return "rgba(201,168,76,0.9)";
    if (kind === "err")  return "rgba(255,100,100,0.8)";
    if (kind === "info") return "rgba(100,200,255,0.75)";
    return "rgba(255,255,255,0.55)";
  };

  return (
    <div
      className="w-full reveal"
      style={{
        border: "1px solid rgba(201,168,76,0.2)",
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(8px)",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: 12,
        lineHeight: "1.65",
        cursor: "text",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(201,168,76,0.12)", background: "rgba(255,255,255,0.03)" }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-3 text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          sahil@portfolio — terminal
        </span>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        className="px-4 py-3 overflow-y-auto"
        style={{ height: 280, scrollbarWidth: "thin", scrollbarColor: "rgba(201,168,76,0.2) transparent" }}
      >
        {lines.map(ln => (
          <div
            key={ln.id}
            style={{
              color: lineColor(ln.kind),
              whiteSpace: "pre",
              minHeight: ln.kind === "blank" ? "0.7em" : undefined,
            }}
          >
            {ln.text}
          </div>
        ))}
      </div>

      {/* Input row */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span style={{ color: "var(--gold)", whiteSpace: "nowrap", fontSize: 12 }}>
          {cwd} $
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="flex-1 bg-transparent outline-none border-none"
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "inherit",
            fontSize: 12,
            caretColor: "var(--gold)",
          }}
          placeholder="type a command…"
        />
      </div>
    </div>
  );
}
