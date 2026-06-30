export function SectionWrapper({
  id,
  children,
  style,
}: {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "6rem 1.5rem",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: "11px",
        letterSpacing: "0.15em",
        color: "var(--primary-light)",
        marginBottom: "0.75rem",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
        fontWeight: 600,
        color: "var(--text)",
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
        marginBottom: "1rem",
      }}
    >
      {children}
    </h2>
  );
}
