"use client";
import { useEffect, useState } from "react";

type Day = { date: string; count: number; level: number };

/* gold at 5 intensity levels — matches portfolio palette */
const CELL_COLOR = [
  "rgba(201,168,76,0.07)",   // 0 — no contributions
  "rgba(201,168,76,0.22)",   // 1 — low
  "rgba(201,168,76,0.48)",   // 2 — medium
  "rgba(201,168,76,0.74)",   // 3 — high
  "rgba(201,168,76,1.00)",   // 4 — max
];

const CELL = 12;
const GAP  = 3;
const LEFT = 26;   // space for Mon/Wed/Fri labels
const TOP  = 22;   // space for month labels

export default function GitHubGraph() {
  const [weeks, setWeeks]   = useState<Day[][]>([]);
  const [months, setMonths] = useState<{ label: string; weekIdx: number }[]>([]);
  const [total, setTotal]   = useState<number | null>(null);
  const [err, setErr]       = useState(false);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/sahilforkshere?y=last")
      .then(r => r.json())
      .then((data: { contributions: Day[]; total: Record<string, number> }) => {
        /* group flat array into [week][day] */
        const allWeeks: Day[][] = [];
        let cur: Day[] = [];
        data.contributions.forEach(d => {
          cur.push(d);
          if (cur.length === 7) { allWeeks.push(cur); cur = []; }
        });
        if (cur.length) allWeeks.push(cur);
        setWeeks(allWeeks);

        /* month labels — one entry per month change */
        const ms: { label: string; weekIdx: number }[] = [];
        let lastM = -1;
        allWeeks.forEach((w, wi) => {
          const m = new Date(w[0].date).getMonth();
          if (m !== lastM) {
            ms.push({
              label: new Date(w[0].date).toLocaleString("default", { month: "short" }),
              weekIdx: wi,
            });
            lastM = m;
          }
        });
        setMonths(ms);

        /* sum directly from the contributions array — avoids year-key mismatch */
        const counted = data.contributions.reduce((s: number, d: Day) => s + d.count, 0);
        setTotal(counted);
      })
      .catch(() => setErr(true));
  }, []);

  const W = LEFT + weeks.length * (CELL + GAP);
  const H = TOP  + 7             * (CELL + GAP);

  if (err) return (
    <p style={{ fontSize: 11, color: "rgba(201,168,76,0.3)", letterSpacing: "0.2em", padding: "20px 0" }}>
      Unable to load GitHub activity.
    </p>
  );

  return (
    <div>
      {/* row: total + link */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(201,168,76,0.5)", fontFamily: "'Courier New',monospace" }}>
          {total !== null ? `${total} contributions in the last year` : "Loading…"}
        </span>
        <a
          href="https://github.com/sahilforkshere"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(201,168,76,0.28)", fontFamily: "'Courier New',monospace", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(201,168,76,0.28)")}
        >
          @sahilforkshere ↗
        </a>
      </div>

      {/* graph — horizontally scrollable on mobile */}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"] }}>
        {weeks.length > 0 ? (
          <svg width={W} height={H} style={{ display: "block" }}>
            {/* month labels */}
            {months.map((m, i) => (
              <text key={i}
                x={LEFT + m.weekIdx * (CELL + GAP)}
                y={13}
                fontSize={9}
                fill="rgba(201,168,76,0.38)"
                fontFamily="'Courier New',monospace"
              >
                {m.label}
              </text>
            ))}

            {/* day labels — Mon / Wed / Fri only */}
            {["M","","W","","F","",""].map((label, di) =>
              label ? (
                <text key={di}
                  x={0}
                  y={TOP + di * (CELL + GAP) + CELL - 2}
                  fontSize={8}
                  fill="rgba(201,168,76,0.28)"
                  fontFamily="'Courier New',monospace"
                >
                  {label}
                </text>
              ) : null
            )}

            {/* contribution cells */}
            {weeks.map((week, wi) =>
              week.map((day, di) => (
                <rect key={day.date}
                  x={LEFT + wi * (CELL + GAP)}
                  y={TOP  + di * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={CELL_COLOR[Math.min(day.level, 4)]}
                >
                  <title>{day.date} · {day.count} contribution{day.count !== 1 ? "s" : ""}</title>
                </rect>
              ))
            )}
          </svg>
        ) : (
          /* skeleton while loading */
          <svg width={780} height={H} style={{ display: "block" }}>
            {Array.from({ length: 52 }).map((_, wi) =>
              Array.from({ length: 7 }).map((__, di) => (
                <rect key={`${wi}-${di}`}
                  x={LEFT + wi * (CELL + GAP)}
                  y={TOP  + di * (CELL + GAP)}
                  width={CELL} height={CELL} rx={2}
                  fill="rgba(201,168,76,0.05)"
                />
              ))
            )}
          </svg>
        )}
      </div>

      {/* legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 9, color: "rgba(201,168,76,0.28)", letterSpacing: "0.1em", fontFamily: "'Courier New',monospace" }}>Less</span>
        {CELL_COLOR.map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
        ))}
        <span style={{ fontSize: 9, color: "rgba(201,168,76,0.28)", letterSpacing: "0.1em", fontFamily: "'Courier New',monospace" }}>More</span>
      </div>
    </div>
  );
}
