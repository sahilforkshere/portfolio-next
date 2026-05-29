import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "var(--font-inter, system-ui), sans-serif",
      }}
    >
      {/* Corner mark */}
      <div style={{
        position: "fixed",
        top: 28, left: 28,
        fontFamily: "var(--font-bebas, sans-serif)",
        fontSize: 16,
        letterSpacing: "0.2em",
        color: "rgba(201,168,76,0.5)",
      }}>
        SP.
      </div>

      {/* 404 */}
      <p style={{
        fontFamily: "var(--font-bebas, sans-serif)",
        fontSize: "clamp(6rem, 22vw, 16rem)",
        lineHeight: 1,
        color: "rgba(201,168,76,0.08)",
        letterSpacing: "0.05em",
        userSelect: "none",
        marginBottom: "-1.5rem",
      }}>
        404
      </p>

      <h1 style={{
        fontFamily: "var(--font-bebas, sans-serif)",
        fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.85)",
        marginBottom: "1rem",
      }}>
        You seem lost.
      </h1>

      <p style={{
        fontSize: 13,
        letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.28)",
        maxWidth: 320,
        lineHeight: 1.7,
        marginBottom: "2.5rem",
      }}>
        This page doesn&apos;t exist — but the rest of the portfolio does.
      </p>

      {/* Divider */}
      <div style={{
        width: 48, height: 1,
        background: "linear-gradient(to right, var(--gold, #c9a84c), var(--gold-light, #e8c97a))",
        marginBottom: "2.5rem",
      }} />

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          fontSize: 11,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--gold, #c9a84c)",
          textDecoration: "none",
        }}
      >
        <span style={{
          display: "inline-block",
          width: 32, height: 1,
          background: "var(--gold, #c9a84c)",
        }} />
        Back to home
      </Link>
    </main>
  );
}
