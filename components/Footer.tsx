"use client";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "12px",
          color: "var(--text-muted)",
        }}
      >
        Aishi Agarwal · {new Date().getFullYear()}
      </span>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        {[
          { label: "Email", href: "mailto:aishiagarwal11@gmail.com" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/aishi-agarwal/" },
          { label: "GitHub", href: "https://github.com/Aishi25" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
