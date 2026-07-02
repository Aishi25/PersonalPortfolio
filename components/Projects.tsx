"use client";

import { SectionWrapper, SectionLabel, SectionHeading } from "@/components/ui/SectionWrapper";

const PROJECTS = [
  {
    name: "Aeroseal Chatbot",
    badge: "AI/ML Intern · 2026",
    badgeAccent: false,
    bullets: [
      "Redesigned conversational flow — built session management into SQL backend with per-intent follow-up rules",
      "Tuned system prompt to eliminate hallucinations about leadership team and formatting issues",
      "Fixed vector store ingestion pipeline bug leaving stale, searchable copies when webpages updated",
      "Deployed to production; presented improvements to engineering leadership",
    ],
    tags: ["LLM", "RAG", "SQL", "C#"],
    demo: "https://chat.aeroseal.com",
    github: null,
  },
  {
    name: "RxGuard",
    badge: "2nd place · Hacklytics 2026",
    badgeAccent: true,
    bullets: [
      "AI drug interaction analyzer ingesting 11.5M+ FAERS adverse event reports",
      "384-dim vector embeddings for semantic search — surfaces dangerous medication combinations",
      "Won 2nd place for Actian AI Vector DB track at Hacklytics 2026",
    ],
    tags: ["Python", "NLP", "FastAPI", "React"],
    demo: "https://bit.ly/RxGuard",
    github: "https://github.com/gt12889/hacklytics2026",
  },
  {
    name: "Inbox Agent",
    badge: "personal project · 2026",
    badgeAccent: false,
    bullets: [
      "Gmail cleanup assistant powered by the Claude API and Google OAuth",
      "Analyzes inbox patterns and categorizes emails by priority",
      "Suggests what to archive or unsubscribe from via a React + Node.js interface",
    ],
    tags: ["React", "Claude API", "Node.js", "OAuth"],
    demo: "https://inbox-cleaning-agent.onrender.com/",
    github: "https://github.com/Aishi25/Inbox_Cleaning_Agent",
  },
  {
    name: "Springer Paper",
    badge: "published · 2026",
    badgeAccent: true,
    bullets: [
      "Co-authored bioinformatics research published by Springer — modeled drug-target interaction success using hypergraph Ricci curvature",
      "Conducted at UIC's Creative Algorithms Lab under Prof. DasGupta",
      "Co-authored at 17",
    ],
    tags: ["graph theory", "bioinformatics", "Python"],
    demo: "http://bit.ly/HypergraphPaper",
    github: null,
  },
  {
    name: "TerraTrends",
    badge: "BDBI · ML research",
    badgeAccent: false,
    bullets: [
      "LSTM time series model forecasting county-level economic growth across Georgia",
      "Trained on multi-source panel data using 10-year sliding windows → 3-year sector-level forecasts",
      "Built under GT's Big Data Big Impact club focused on AI for social good",
    ],
    tags: ["PyTorch", "LSTM", "pandas", "Python"],
    demo: null,
    github: "https://github.com/Aishi25/TerraTrends",
  },
  {
    name: "BillBuddy",
    badge: "AI ATL 2025",
    badgeAccent: false,
    bullets: [
      "Medical bill analyzer using OCR and NLP to parse hospital bills and flag billing errors",
      "Translates confusing line items into plain English so patients understand what they're charged for",
    ],
    tags: ["OCR", "NLP", "React", "JavaScript"],
    demo: "https://bit.ly/BillBuddy25",
    github: "https://github.com/Aishi25/BillBuddyPrivate",
  },
];

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionLabel>projects</SectionLabel>
      <SectionHeading>things i&apos;ve built</SectionHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem 1.5rem",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "8px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>{p.name}</span>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    background: p.badgeAccent ? "rgba(249,115,22,0.12)" : "var(--primary-dim)",
                    color: p.badgeAccent ? "var(--accent)" : "var(--primary-light)",
                    border: `1px solid ${p.badgeAccent ? "rgba(249,115,22,0.25)" : "rgba(61,157,174,0.3)"}`,
                  }}
                >
                  {p.badge}
                </span>
              </div>
              <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "12px", color: "var(--primary-light)", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--primary-light)")}
                  >
                    ↗ {p.name === "Springer Paper" ? "read paper" : p.name === "Aeroseal Chatbot" ? "live demo" : "demo"}
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
            </div>

            <ul style={{ margin: "0 0 12px", paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "4px" }}>
              {p.bullets.map((b, i) => (
                <li key={i} style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {b}
                </li>
              ))}
            </ul>

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
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
