export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#080808",
        color: "#f0ede8",
        fontFamily: "sans-serif",
        gap: "1rem",
      }}
    >
      <span style={{ fontSize: "6rem", fontWeight: 700, lineHeight: 1, opacity: 0.15 }}>
        404
      </span>
      <p style={{ fontSize: "1rem", opacity: 0.5 }}>Page not found</p>
      <a
        href="/"
        style={{
          marginTop: "1rem",
          padding: "0.75rem 2rem",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "inherit",
          textDecoration: "none",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Go home
      </a>
    </div>
  );
}
