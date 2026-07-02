"use client";

import { SectionWrapper, SectionLabel, SectionHeading } from "@/components/ui/SectionWrapper";

const PROJECTS = [
  {
    name: "Aeroseal Chatbot",
    badge: "AI/ML Intern · 2026",
    badgeAccent: true,
    bullets: [
      "Redesigned conversational flow, built session management into SQL backend with per-intent follow-up rules",
      "Tuned system prompt to eliminate hallucinations about the leadership team and formatting issues",
      "Fixed a vector store ingestion pipeline bug leaving stale, searchable copies when webpages updated",
    ],
    tags: ["OpenAI API", "RAG", "SQL", "C#", "Azure"],
    demo: "https://chat.aeroseal.com",
    github: null,
  },
  {
    name: "RxGuard",
    badge: "2nd place · Hacklytics 2026",
    badgeAccent: true,
    bullets: [
      "AI drug interaction analyzer ingesting 11.5M+ FAERS adverse event reports",
      "384-dim vector embeddings for semantic search, surfaces dangerous medication combinations",
      "Won 2nd place for Actian AI Vector DB track at Hacklytics 2026",
    ],
    tags: ["Python", "NLP", "FastAPI", "Actian Vector DB"],
    demo: "https://bit.ly/RxGuard",
    github: "https://github.com/gt12889/hacklytics2026",
  },
  {
    name: "Inbox Agent",
    badge: "personal project · 2026",
    badgeAccent: true,
    bullets: [
      "Gmail cleanup assistant powered by the Claude API and Google OAuth",
      "Suggests what to unsubscribe from via a React + Node.js interface",
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
      "Co-authored bioinformatics research published by Springer, modeled drug-target interaction using hypergraph curvature",
      "Conducted at UIC's Creative Algorithms Lab under Prof. DasGupta",
      "Co-authored at 17",
    ],
    tags: ["graph theory", "bioinformatics"],
    demo: "http://bit.ly/HypergraphPaper",
    github: null,
  },
  {
    name: "TerraTrends",
    badge: "BDBI · ML research · 2026",
    badgeAccent: true,
    bullets: [
      "LSTM time series model forecasting county-level economic growth across Georgia",
      "Trained on multi-source panel data using 10-year sliding windows, producing 3-year sector-level forecasts",
    ],
    tags: ["LSTM", "pandas", "Python"],
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
    tags: ["OCR", "NLP", "React", "Supabase"],
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
              padding: "1.5rem 1.75rem",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "10px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "17px", fontWeight: 600, color: "var(--text)" }}>{p.name}</span>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "3px 10px",
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
              <div style={{ display: "flex", gap: "14px", flexShrink: 0 }}>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "14px", color: "var(--primary-light)", textDecoration: "none", fontWeight: 500 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--primary-light)")}
                  >
                    ↗ {p.name === "Springer Paper" ? "read paper" : p.name === "Aeroseal Chatbot" ? "visit site" : "demo"}
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "14px", color: "var(--text-secondary)", textDecoration: "none", fontWeight: 500 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    ↗ github
                  </a>
                )}
              </div>
            </div>

            <div style={{ margin: "0 0 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
              {p.bullets.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                  <span style={{ color: "var(--primary-light)", fontSize: "16px", flexShrink: 0, lineHeight: 1.65 }}>•</span>
                  <span style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.65 }}>{b}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {p.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "12px",
                    color: "var(--primary-light)",
                    background: "var(--primary-dim)",
                    border: "1px solid rgba(61,157,174,0.2)",
                    borderRadius: "4px",
                    padding: "3px 10px",
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
