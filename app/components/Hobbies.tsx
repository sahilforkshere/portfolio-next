"use client";
import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */

const PLAYLIST_URL = "https://music.apple.com/in/playlist/calm/pl.u-MDAWkg6TAKyd7VR";

const TOP_SONGS = [
  { title: "The Night We Met",  artist: "Lord Huron", query: "the night we met lord huron" },
  { title: "Piano Man",         artist: "Billy Joel",  query: "piano man billy joel"        },
  { title: "Sweet But Psycho",  artist: "Ava Max",     query: "sweet but psycho ava max"    },
];

const books = [
  {
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    isbn: "9780143130727",
    color: "#e8b87a",
    spine: "#c9943a",
    link: "https://www.goodreads.com/book/show/39995046-ikigai",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    color: "#7ab8e8",
    spine: "#3a8bc9",
    link: "https://www.goodreads.com/book/show/40121378-atomic-habits",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    isbn: "9781455586691",
    color: "#a8e07a",
    spine: "#5ab83a",
    link: "https://www.goodreads.com/book/show/25744928-deep-work",
  },
  {
    title: "The Almanack of Naval",
    author: "Eric Jorgenson",
    isbn: "9781544514222",
    color: "#e07ab8",
    spine: "#b83a7a",
    link: "https://www.goodreads.com/book/show/54898389-the-almanack-of-naval-ravikant",
  },
];

const watchlist = [
  {
    title: "The Prestige",
    imdbId: "tt0482571",
    type: "Movie",
    year: 2006,
    rating: "8.5",
    meta: "Dir. Christopher Nolan",
    color: "rgba(251,191,36,0.7)",
  },
  {
    title: "Dark",
    imdbId: "tt5753856",
    type: "Series",
    year: 2017,
    rating: "8.8",
    meta: "3 Seasons · Netflix",
    color: "rgba(96,165,250,0.7)",
  },
  {
    title: "Dexter",
    imdbId: "tt0773262",
    type: "Series",
    year: 2006,
    rating: "8.6",
    meta: "8 Seasons · Showtime",
    color: "rgba(248,113,113,0.7)",
  },
];

/* ═══════════════════════════════════════════
   ICONS
═══════════════════════════════════════════ */

const AppleMusicIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.769-.73 10.9 10.9 0 00-1.808-.18H5.982C3.18 0 1.046.896.21 2.812A8.48 8.48 0 000 5.117V18.88c0 2.758.974 4.461 2.93 5.296a9.24 9.24 0 002.168.563c.59.082 1.18.14 1.773.14h11.984c2.86 0 5.154-.93 5.996-3.48.22-.66.34-1.32.34-2.05V6.124zM8.246 17.26c0 .518-.133.927-.4 1.228-.267.3-.617.45-1.05.45a1.47 1.47 0 01-1.077-.45c-.3-.3-.45-.71-.45-1.228V10.6l-2.13 1.08c-.232.118-.48.118-.714-.024-.234-.14-.35-.35-.35-.63V9.77c0-.284.128-.514.386-.69l3.135-1.868c.185-.11.39-.165.62-.165.265 0 .48.085.646.256.165.17.248.4.248.69l-.004 9.267h-.86zm8.516 1.62c0 .282-.094.508-.28.68-.187.17-.43.255-.728.255h-4.53c-.283 0-.516-.09-.698-.268a.91.91 0 01-.274-.667c0-.267.09-.49.274-.666.182-.178.415-.267.698-.267h1.478V10.6L10.19 11.68c-.232.117-.48.117-.714-.025-.234-.14-.35-.35-.35-.63V9.77c0-.284.128-.514.385-.69l3.135-1.868c.185-.11.39-.165.62-.165.264 0 .48.085.645.256.166.17.25.4.25.69v9.014h1.473c.3 0 .542.09.728.268.186.178.28.4.28.667l-.876-.262z"/>
  </svg>
);

/* ═══════════════════════════════════════════
   MUSIC CARD
═══════════════════════════════════════════ */
function MusicCard({ active, songArt }: { active: boolean; songArt: Record<string, string> }) {
  const bars = [55, 88, 38, 100, 60, 80, 42];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Headphones + equalizer */}
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 120 85" className="w-20 h-auto">
          <path d="M14 52 Q14 14 60 14 Q106 14 106 52"
            stroke="rgba(255,255,255,0.45)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <rect x="4" y="46" width="22" height="32" rx="9"
            fill={active ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)"}
            stroke={active ? "rgba(167,139,250,0.8)" : "rgba(255,255,255,0.2)"}
            strokeWidth="1.8" style={{ transition: "all 0.4s" }} />
          <rect x="94" y="46" width="22" height="32" rx="9"
            fill={active ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)"}
            stroke={active ? "rgba(167,139,250,0.8)" : "rgba(255,255,255,0.2)"}
            strokeWidth="1.8" style={{ transition: "all 0.4s" }} />
          {active && <circle cx="60" cy="52" r="5" fill="rgba(167,139,250,0.4)"
            style={{ animation: "hbPulse 1s ease-in-out infinite" }} />}
        </svg>
        <div className="flex items-end gap-1" style={{ height: 28 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              width: 6, borderRadius: 2,
              background: active ? `rgba(167,139,250,${0.45 + i * 0.07})` : "rgba(255,255,255,0.1)",
              height: active ? `${h}%` : "20%",
              transition: `height 0.15s ease ${i * 0.05}s, background 0.3s`,
              animation: active ? `hbEq${i} ${0.55 + i * 0.08}s ease-in-out infinite alternate` : "none",
            }} />
          ))}
        </div>
      </div>

      {/* Album art — same style as books/movies */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10, width: "100%" }}>
        {TOP_SONGS.map((s, i) => {
          const isHov = hovered === i;
          return (
            <div
              key={s.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: 72, height: 72, flexShrink: 0, borderRadius: 4,
                overflow: "hidden", position: "relative",
                transform: isHov ? "translateY(-10px) scale(1.06)" : "translateY(0) scale(1)",
                transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: isHov
                  ? "0 16px 32px rgba(0,0,0,0.7), 0 0 0 2px rgba(167,139,250,0.7)"
                  : "0 6px 16px rgba(0,0,0,0.5)",
                background: "rgba(167,139,250,0.1)",
                border: `1px solid ${isHov ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.08)"}`,
                cursor: "default",
              }}
            >
              {songArt[s.title] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={songArt[s.title]} alt={s.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, opacity: 0.25 }}>♪</div>
              )}
              {/* hover overlay with title */}
              {isHov && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(transparent 30%, rgba(0,0,0,0.85))",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  padding: "5px 5px 6px",
                }}>
                  <p style={{ fontSize: 8, color: "rgba(255,255,255,0.9)", margin: 0, letterSpacing: "0.05em", lineHeight: 1.3 }}>{s.title}</p>
                  <p style={{ fontSize: 7, color: "rgba(167,139,250,0.8)", margin: 0 }}>{s.artist}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BOOKS CARD
═══════════════════════════════════════════ */
function BooksCard({ active }: { active: boolean }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Bookshelf */}
      <div className="relative flex items-end justify-center gap-2 pb-3 w-full px-4"
        style={{ borderBottom: "3px solid rgba(251,191,36,0.25)" }}>
        {books.map((b, i) => {
          const isHov = hoveredIdx === i;
          return (
            <a
              key={b.isbn}
              href={b.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={e => e.stopPropagation()}
              title={`${b.title} — ${b.author}`}
              style={{
                display: "flex",
                flexDirection: "column",
                width: 44,
                height: isHov ? 130 : 110,
                borderRadius: 2,
                overflow: "hidden",
                transform: isHov ? "translateY(-12px) rotate(0deg)" : active ? "rotate(-1deg)" : "rotate(0deg)",
                transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: isHov
                  ? `4px 6px 20px rgba(0,0,0,0.6), -1px 0 0 ${b.spine}`
                  : "2px 4px 10px rgba(0,0,0,0.4)",
                flexShrink: 0,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://covers.openlibrary.org/b/isbn/${b.isbn}-M.jpg`}
                alt={b.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={e => {
                  /* fallback to spine if cover not found */
                  const el = e.currentTarget.parentElement!;
                  e.currentTarget.style.display = "none";
                  el.style.background = b.color;
                  el.style.justifyContent = "flex-end";
                  el.style.alignItems = "center";
                  el.style.padding = "4px";
                }}
              />
            </a>
          );
        })}
        {/* shelf shadow */}
        <div style={{
          position: "absolute", bottom: -6, left: "10%", right: "10%", height: 6,
          background: "rgba(0,0,0,0.3)", filter: "blur(4px)", borderRadius: "50%",
        }} />
      </div>

      {/* hover hint */}
      <p style={{ fontSize: 10, color: "rgba(251,191,36,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        {hoveredIdx !== null ? books[hoveredIdx].title : "hover a book to open"}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MOVIES CARD — poster wall + playlist
═══════════════════════════════════════════ */
function MoviesCard({ active }: { active: boolean }) {
  const [hovered, setHovered]   = useState<number | null>(null);
  const [posters, setPosters]   = useState<Record<string, string>>({});

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_OMDB_KEY;
    if (!key) return;
    watchlist.forEach(w => {
      fetch(`https://www.omdbapi.com/?i=${w.imdbId}&apikey=${key}`)
        .then(r => r.json())
        .then((data: { Poster?: string }) => {
          if (data.Poster && data.Poster !== "N/A") {
            setPosters(prev => ({ ...prev, [w.imdbId]: data.Poster! }));
          }
        })
        .catch(() => {});
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Poster wall */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10, width: "100%" }}>
        {watchlist.map((w, i) => {
          const isHov = hovered === i;
          return (
            <div
              key={w.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: 72,
                height: isHov ? 118 : 108,
                flexShrink: 0,
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                transform: isHov ? "translateY(-10px) scale(1.05)" : active ? "translateY(0)" : "translateY(0)",
                transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: isHov
                  ? `0 16px 32px rgba(0,0,0,0.7), 0 0 0 2px ${w.color}`
                  : "0 6px 16px rgba(0,0,0,0.5)",
                cursor: "default",
              }}
            >
              {/* loading placeholder */}
              {!posters[w.imdbId] && (
                <div style={{
                  width: "100%", height: "100%",
                  background: w.color.replace("0.7", "0.12"),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: w.color, letterSpacing: "0.1em", textAlign: "center", padding: 6,
                }}>
                  {w.title}
                </div>
              )}
              {posters[w.imdbId] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={posters[w.imdbId]}
                  alt={w.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }}
                />
              )}
              {/* hover label */}
              {isHov && (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.88))",
                  padding: "18px 5px 6px",
                  textAlign: "center",
                }}>
                  <p style={{ fontSize: 8, color: "rgba(255,255,255,0.9)", letterSpacing: "0.08em", margin: 0, lineHeight: 1.3 }}>
                    {w.title}
                  </p>
                  <p style={{ fontSize: 7, color: w.color, margin: 0, letterSpacing: "0.05em" }}>★ {w.rating}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Playlist-style watchlist */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5 }}>
        {watchlist.map((w, i) => (
          <div key={w.title} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "6px 10px",
            borderLeft: `2px solid ${active ? w.color : "rgba(255,255,255,0.07)"}`,
            background: active ? w.color.replace("0.7","0.04") : "transparent",
            transition: `all 0.3s ease ${i * 0.06}s`,
          }}>
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: 11, color: active ? w.color : "rgba(255,255,255,0.18)", letterSpacing: "0.12em", minWidth: 22 }}>
              {String(i+1).padStart(2,"0")}
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)", letterSpacing: "0.03em", margin: 0 }}>
                {w.title}
              </p>
              <p style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", margin: 0 }}>
                {w.type} · {w.year}
              </p>
            </div>
            <span style={{ fontSize: 10, color: active ? w.color : "rgba(255,255,255,0.18)", fontFamily: "var(--font-bebas)" }}>
              ★ {w.rating}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════ */
const hobbies = [
  {
    key: "music" as const,
    title: "Music",
    label: "Always in my ears",
    desc: "Lo-fi while coding, hip-hop on walks — music is the background thread that never pauses.",
    accent: "rgba(167,139,250,0.6)",
    accentBg: "rgba(167,139,250,0.06)",
  },
  {
    key: "books" as const,
    title: "Books",
    label: "Always reading",
    desc: "Philosophy, productivity, and ideas that rewire how I think. A good book is better than any tutorial.",
    accent: "rgba(251,191,36,0.6)",
    accentBg: "rgba(251,191,36,0.05)",
  },
  {
    key: "movies" as const,
    title: "Films & Series",
    label: "Certified cinephile",
    desc: "Mind-bending plots and complex characters. If it makes me think, I'll watch it twice.",
    accent: "rgba(248,113,113,0.6)",
    accentBg: "rgba(248,113,113,0.05)",
  },
];

export default function Hobbies() {
  const [activeKey, setActiveKey]   = useState<string | null>(null);
  const [songArt, setSongArt]       = useState<Record<string, string>>({});

  useEffect(() => {
    TOP_SONGS.forEach(s => {
      fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(s.query)}&entity=song&limit=1`)
        .then(r => r.json())
        .then((data: { results?: { artworkUrl100?: string }[] }) => {
          const raw = data.results?.[0]?.artworkUrl100;
          if (raw) {
            /* swap 100x100 → 300x300 for sharper art */
            setSongArt(prev => ({ ...prev, [s.title]: raw.replace("100x100bb", "300x300bb") }));
          }
        })
        .catch(() => {});
    });
  }, []);

  return (
    <section id="hobbies" className="py-32 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex items-center gap-4 mb-16">
          <span className="line-gold" />
          <span className="subtitle-gold">Off the Clock</span>
        </div>

        <h2 className="reveal text-5xl md:text-7xl font-light tracking-tight mb-4" style={{ transitionDelay: "0.1s" }}>
          Life outside<br />
          <span style={{ color: "var(--gold)" }}>the code.</span>
        </h2>
        <p className="reveal text-sm text-white/35 mb-16 max-w-sm leading-relaxed" style={{ transitionDelay: "0.15s" }}>
          Hover to see what I get up to when the terminal is closed.
        </p>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {hobbies.map((h, i) => {
            const isActive = activeKey === h.key;
            return (
              <div key={h.key} className="reveal" style={{ transitionDelay: `${0.08 * i}s` }}>
                <div
                  className="group relative overflow-hidden h-full cursor-pointer"
                  style={{
                    background: isActive ? h.accentBg : "rgba(255,255,255,0.025)",
                    border: `1px solid ${isActive ? h.accent : "rgba(255,255,255,0.07)"}`,
                    transition: "background 0.4s, border-color 0.4s",
                  }}
                  onMouseEnter={() => setActiveKey(h.key)}
                  onMouseLeave={() => setActiveKey(null)}
                >
                  {/* Top illustration */}
                  <div className="flex items-center justify-center"
                    style={{
                      minHeight: 200,
                      background: isActive ? h.accentBg : "transparent",
                      transition: "background 0.4s",
                      borderBottom: `1px solid ${isActive ? h.accent : "rgba(255,255,255,0.05)"}`,
                      padding: "2rem 1.5rem",
                    }}>
                    {h.key === "music"  && <MusicCard  active={isActive} songArt={songArt} />}
                    {h.key === "books"  && <BooksCard  active={isActive} />}
                    {h.key === "movies" && <MoviesCard active={isActive} />}
                  </div>

                  {/* Text area */}
                  <div className="p-6 md:p-8">
                    <p className="text-[10px] tracking-[0.2em] uppercase mb-2 transition-colors duration-300"
                      style={{ color: isActive ? h.accent : "rgba(255,255,255,0.2)" }}>
                      {h.label}
                    </p>
                    <h3 className="mb-3 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-bebas)", fontSize: "2rem", letterSpacing: "0.08em", color: isActive ? "white" : "rgba(255,255,255,0.7)" }}>
                      {h.title}
                    </h3>
                    <p className="text-sm text-white/35 leading-relaxed">{h.desc}</p>

                    {/* Music — Apple Music playlist badge (matches other cards) */}
                    {h.key === "music" && (
                      <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 transition-all duration-300"
                        style={{
                          border: `1px solid ${isActive ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.1)"}`,
                          color: isActive ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.25)",
                          fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                          background: isActive ? "rgba(167,139,250,0.07)" : "transparent",
                        }}>
                        <AppleMusicIcon />
                        <span>Listen on Apple Music</span>
                      </a>
                    )}

                    {/* Goodreads badge on books card */}
                    {h.key === "books" && (
                      <a href="https://www.goodreads.com" target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 transition-all duration-300"
                        style={{
                          border: `1px solid ${isActive ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.1)"}`,
                          color: isActive ? "rgba(251,191,36,0.9)" : "rgba(255,255,255,0.25)",
                          fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                          background: isActive ? "rgba(251,191,36,0.07)" : "transparent",
                        }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.525 15.977V.49h-2.059v2.906h-.064a5.204 5.204 0 00-1.97-2.302 5.493 5.493 0 00-3.12-.924 5.947 5.947 0 00-3.32.967 6.03 6.03 0 00-2.14 2.73 9.568 9.568 0 00-.753 3.949 9.04 9.04 0 00.753 3.821 6.067 6.067 0 002.15 2.64 5.92 5.92 0 003.22.946 5.597 5.597 0 003.16-.924 5.344 5.344 0 001.98-2.302h.064v2.777c.043 1.73-.408 3.173-1.335 4.34-.926 1.166-2.3 1.751-4.072 1.751a5.97 5.97 0 01-2.796-.624 4.15 4.15 0 01-1.785-1.805l-1.895.86a6.03 6.03 0 002.42 2.388 7.77 7.77 0 003.745.86c2.31 0 4.085-.698 5.314-2.087 1.23-1.39 1.845-3.262 1.802-5.61v-.01zm-7.485-.129a4.257 4.257 0 01-2.334-.647 4.294 4.294 0 01-1.559-1.87 6.637 6.637 0 01-.56-2.821 7.065 7.065 0 01.56-2.885 4.52 4.52 0 011.559-1.944 4.168 4.168 0 012.334-.71 4.5 4.5 0 012.258.592 4.262 4.262 0 011.613 1.72 5.557 5.557 0 01.602 2.647 6.605 6.605 0 01-.602 2.885 4.617 4.617 0 01-1.613 1.87 4.384 4.384 0 01-2.258.163z"/>
                        </svg>
                        <span>Explore on Goodreads</span>
                      </a>
                    )}


                    {/* Animated underline */}
                    <div className="mt-5 h-px transition-all duration-500 ease-out"
                      style={{ background: h.accent, width: isActive ? "100%" : "0%" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @keyframes hbEq0 { from{height:20%} to{height:55%} }
        @keyframes hbEq1 { from{height:20%} to{height:88%} }
        @keyframes hbEq2 { from{height:20%} to{height:38%} }
        @keyframes hbEq3 { from{height:20%} to{height:100%} }
        @keyframes hbEq4 { from{height:20%} to{height:60%} }
        @keyframes hbEq5 { from{height:20%} to{height:80%} }
        @keyframes hbEq6 { from{height:20%} to{height:42%} }
        @keyframes hbPulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.6);opacity:.9} }
      `}</style>
    </section>
  );
}
