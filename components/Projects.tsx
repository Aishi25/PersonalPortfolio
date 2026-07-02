"use client";

import { SectionWrapper, SectionLabel, SectionHeading } from "@/components/ui/SectionWrapper";

const PROJECTS = [
  {
    name: "Aeroseal Chatbot",
    badge: "AI/ML Intern · 2025",
    badgeAccent: false,
    description:
      "Redesigned conversational flow for Aeroseal's public-facing AI chatbot — built session management into the SQL backend, engineered per-intent follow-up rules, and tuned the system prompt to eliminate hallucinations. Also diagnosed and fixed a vector store ingestion pipeline bug that left stale, searchable copies when webpages updated.",
    tags: ["LLM", "RAG", "SQL", "Python"],
    demo: "https://chat.aeroseal.com",
    github: null,
  },
  {
    name: "RxGuard",
    badge: "2nd place · Hacklytics 2026",
    badgeAccent: true,
    description:
      "AI drug interaction analyzer built at Hacklytics 2026 — ingests 11.5M+ FAERS adverse event reports and uses 384-dim vector embeddings for semantic search to surface dangerous medication combinations. Won 2nd place for Actian AI Vector DB track.",
    tags: ["Python", "NLP", "FastAPI", "React"],
    demo: "https://bit.ly/RxGuard",
    github: "https://github.com/gt12889/hacklytics2026",
  },
  {
    name: "BillBuddy",
    badge: "AI ATL 2025",
    badgeAccent: false,
    description:
      "Medical bill analyzer from AI ATL 2025 — uses OCR and NLP to parse hospital bills, flag potential billing errors, and translate confusing line items into plain English so patients actually understand what they're being charged for.",
    tags: ["OCR", "NLP", "React", "JavaScript"],
    demo: "https://bit.ly/BillBuddy25",
    github: "https://github.com/Aishi25/BillBuddyPrivate",
  },
  {
    name: "Inbox Agent",
    badge: "personal project",
    badgeAccent: false,
    description:
      "Gmail cleanup assistant powered by the Claude API and Google OAuth — analyzes inbox patterns, categorizes emails by priority, and suggests what to archive or unsubscribe from. Built with a React frontend and Node.js backend.",
    tags: ["React", "Claude API", "Node.js", "OAuth"],
    demo: null,
    github: "https://github.com/Aishi25/Inbox_Cleaning_Agent",
  },
  {
    name: "TerraTrends",
    badge: "BDBI · ML research",
    badgeAccent: false,
    description:
      "LSTM time series model forecasting county-level economic growth across Georgia, built under GT's Big Data Big Impact club. Trained on multi-source panel data using 10-year sliding windows to generate 3-year sector-level forecasts.",
    tags: ["PyTorch", "LSTM", "pandas", "Python"],
    demo: null,
    github: "https://github.com/Aishi25/TerraTrends",
  },
  {
    name: "Springer Paper",
    badge: "published · 2026",
    badgeAccent: true,
    description:
      "Co-authored bioinformatics research paper published by Springer — modeled drug-target interaction success using hypergraph Ricci curvature methods. Conducted at UIC's Creative Algorithms Lab under Prof. DasGupta. Co-authored at 17.",
    tags: ["graph theory", "bioinformatics", "Python"],
    demo: "http://bit.ly/HypergraphPaper",
    github: null,
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

            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 12px" }}>
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
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
