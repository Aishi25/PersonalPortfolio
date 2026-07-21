const ACCENTS = {
  teal: { "--primary": "#3D9DAE", "--primary-light": "#6BBFCC", "--primary-dim": "rgba(61,157,174,0.12)" },
  orange: { "--primary": "#F97316", "--primary-light": "#FB923C", "--primary-dim": "rgba(249,115,22,0.12)" },
  violet: { "--primary": "#8B5CF6", "--primary-light": "#A78BFA", "--primary-dim": "rgba(139,92,246,0.12)" },
  rose: { "--primary": "#F43F5E", "--primary-light": "#FB7185", "--primary-dim": "rgba(244,63,94,0.12)" },
} as const;

export type AccentName = keyof typeof ACCENTS;

export function SectionWrapper({
  id,
  children,
  style,
  accent,
}: {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: AccentName;
}) {
  return (
    <section
      id={id}
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "6rem 1.5rem",
        scrollMarginTop: "72px",
        ...(accent ? (ACCENTS[accent] as React.CSSProperties) : {}),
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
