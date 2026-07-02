"use client";

import { SectionWrapper, SectionLabel, SectionHeading } from "@/components/ui/SectionWrapper";

const PROJECTS = [
  {
    name: "RxGuard",
    badge: "2nd place · Hacklytics 2026",
    badgeAccent: true,
    description: "AI drug analyzer — flags dangerous interactions across 11.5M+ FAERS records",
    tags: ["Python", "NLP", "FastAPI"],
    demo: "https://bit.ly/RxGuard",
    github: "https://github.com/gt12889/hacklytics2026",
  },
  {
    name: "BillBuddy",
    badge: "AI ATL 2025",
    badgeAccent: false,
    description: "OCR + NLP medical bill analyzer — breaks down confusing hospital bills into plain English",
    tags: ["OCR", "NLP", "Python"],
    demo: "https://bit.ly/BillBuddy25",
    github: "https://github.com/Aishi25/BillBuddyPrivate",
  },
  {
    name: "Inbox Agent",
    badge: "personal project",
    badgeAccent: false,
    description: "Gmail cleanup assistant — Claude API + Google OAuth, suggests what to archive or unsubscribe",
    tags: ["React", "Claude API", "Node.js"],
    demo: null,
    github: "https://github.com/Aishi25/Inbox_Cleaning_Agent",
  },
  {
    name: "TerraTrends",
    badge: "BDBI · ML research",
    badgeAccent: false,
    description: "LSTM model forecasting county-level economic growth across Georgia — multi-source panel data",
    tags: ["PyTorch", "LSTM", "pandas"],
    demo: null,
    github: "https://github.com/Aishi25/TerraTrends",
  },
  {
    name: "Springer Paper",
    badge: "published · 2026",
    badgeAccent: true,
    description: "Hypergraph curvature in drug-target interactions — co-authored at 17",
    tags: ["graph theory", "bioinformatics"],
    demo: "http://bit.ly/HypergraphPaper",
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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
              <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>
                {p.name}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  background: p.badgeAccent ? "rgba(249,115,22,0.12)" : "var(--primary-dim)",
                  color: p.badgeAccent ? "var(--accent)" : "var(--primary-light)",
                  border: `1px solid ${p.badgeAccent ? "rgba(249,115,22,0.25)" : "rgba(61,157,174,0.3)"}`,
                }}
              >
                {p.badge}
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, margin: 0 }}>
              {p.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {p.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "11px",
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

            {(p.demo || p.github) && (
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  paddingTop: "10px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "12px", color: "var(--primary-light)", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--primary-light)")}
                  >
                    ↗ {p.name === "Springer Paper" ? "read paper" : "demo"}
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "12px", color: "var(--text-muted)", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    ↗ github
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
