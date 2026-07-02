"use client";

import { SectionWrapper, SectionLabel, SectionHeading } from "@/components/ui/SectionWrapper";

const PROJECTS = [
  {
    slug: "RxGuard/",
    badge: "2nd place · Hacklytics 2026",
    badgeAccent: true,
    description: "AI drug analyzer — flags dangerous interactions across 11.5M+ FAERS records",
    tags: ["Python", "NLP", "FastAPI"],
    demo: null,
    github: "https://github.com/gt12889/hacklytics2026",
  },
  {
    slug: "BillBuddy/",
    badge: "AI ATL 2025",
    badgeAccent: false,
    description: "OCR + NLP medical bill analyzer — breaks down confusing hospital bills into plain English",
    tags: ["OCR", "NLP", "Python"],
    demo: null,
    github: "https://github.com/Aishi25/BillBuddyPrivate",
  },
  {
    slug: "inbox-agent/",
    badge: "personal project",
    badgeAccent: false,
    description: "Gmail cleanup assistant — Claude API + Google OAuth, suggests what to archive or unsubscribe",
    tags: ["React", "Claude API", "Node.js"],
    demo: null,
    github: "https://github.com/Aishi25/Inbox_Cleaning_Agent",
  },
  {
    slug: "terra-trends/",
    badge: "BDBI · ML research",
    badgeAccent: false,
    description: "LSTM model forecasting county-level economic growth across Georgia — multi-source panel data",
    tags: ["PyTorch", "LSTM", "pandas"],
    demo: null,
    github: "https://github.com/Aishi25/TerraTrends",
  },
  {
    slug: "springer-paper/",
    badge: "published · 2026",
    badgeAccent: true,
    description: "Hypergraph curvature in drug-target interactions — co-authored at 17",
    tags: ["graph theory", "bioinformatics"],
    demo: null,
    github: null,
  },
];

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionLabel>projects</SectionLabel>
      <SectionHeading>things i&apos;ve built</SectionHeading>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
          <span
            style={{
              marginLeft: "12px",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "12px",
              color: "var(--text-muted)",
            }}
          >
            aishi@portfolio ~/projects
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem", fontFamily: "var(--font-mono), monospace" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "1.25rem" }}>
            $ ls -la ./projects
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {PROJECTS.map((p) => (
              <div
                key={p.slug}
                className="project-row"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "1rem 1.25rem",
                  cursor: "default",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "6px", flexWrap: "wrap" }}>
                  <span style={{ color: "var(--primary-light)", fontWeight: 600 }}>→ {p.slug}</span>
                  <span
                    style={{
                      fontSize: "11px",
                      background: p.badgeAccent ? "rgba(249,115,22,0.12)" : "var(--primary-dim)",
                      color: p.badgeAccent ? "var(--accent)" : "var(--primary-light)",
                      border: `1px solid ${p.badgeAccent ? "rgba(249,115,22,0.25)" : "rgba(61,157,174,0.3)"}`,
                      borderRadius: "4px",
                      padding: "2px 8px",
                    }}
                  >
                    {p.badge}
                  </span>
                </div>
                <div style={{ color: "var(--text-secondary)", fontSize: "12px", marginBottom: "10px" }}>
                  {p.description}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "10px",
                          color: "var(--primary-light)",
                          background: "var(--primary-dim)",
                          border: "1px solid rgba(61,157,174,0.2)",
                          borderRadius: "4px",
                          padding: "2px 8px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: "12px", color: "var(--primary-light)", textDecoration: "none" }}
                      >↗ demo</a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: "12px", color: "var(--text-muted)", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                      >↗ github</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--border)",
              color: "var(--text-muted)",
              fontSize: "12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>5 projects · 2024–2026</span>
            <span style={{ color: "var(--primary-light)" }}>hover to highlight · click to open →</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
