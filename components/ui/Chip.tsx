export function Chip({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
}) {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      background: "var(--primary-dim)",
      color: "var(--primary-light)",
      border: "1px solid rgba(124, 58, 237, 0.25)",
    },
    accent: {
      background: "var(--accent-dim)",
      color: "var(--accent)",
      border: "1px solid rgba(249, 115, 22, 0.25)",
    },
    muted: {
      background: "var(--surface-2)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border)",
    },
  };

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "11px",
        padding: "3px 9px",
        borderRadius: "4px",
        ...styles[variant],
      }}
    >
      {children}
    </span>
  );
}
