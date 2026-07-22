"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionWrapper, SectionLabel, SectionHeading } from "@/components/ui/SectionWrapper";

const MONO = "var(--font-mono), monospace";
const STEP = 0.3; // seconds between each dot lighting up

// ── Roles / work history ─────────────────────────────────────────────
// Timeline rail (no cards) to stay distinct from Projects.
// Wrap flashy keywords/metrics in **double asterisks** to highlight them.
// Bullets should add info NOT already covered in the Projects section.
type ExtLink = { label: string; href: string };

type Position = {
  role: string;
  date: string; // shown for single-position companies; omitted inside multi
  bullets: string[];
  slug: string | null; // deep-dive link to a project detail page
  links?: ExtLink[]; // external links unique to this role
};

type Company = {
  org: string;
  date?: string; // general date shown once for multi-position companies
  positions: Position[];
};

const COMPANIES: Company[] = [
  {
    org: "Aeroseal",
    positions: [
      {
        role: "Artificial Intelligence Intern",
        date: "Jun 2026 – July 2026",
        bullets: [
          "Architected the **RAG pipeline and vector DB ingestion** powering Aeroseal's production, customer-facing LLM chatbot",
          "Engineered prompt structure with **intent and audience-based routing** for reliable, on-brand responses",
          "Built a **Sealing Log Analyzer** that turns millions of production logs into a ranked dashboard, surfacing software bugs buried in the noise",
        ],
        slug: "aeroseal-chatbot",
      },
    ],
  },
  {
    org: "GT Big Data Big Impact",
    date: "Aug 2025 – ongoing",
    positions: [
      {
        role: "Machine Learning Analyst · Terra Trends",
        date: "",
        bullets: [
          "Pitched on Demo Day to **200+ GT students, professors, and companies**",
          "Boosted model stability with **IQR outlier capping**, **feature selection**, and **pd.melt reshaping**",
        ],
        slug: "terratrends",
      },
      {
        role: "AI Workshop Fellow",
        date: "",
        bullets: [
          "Built a **Flask + MongoDB** chatbot backend recommending GT clubs by student major and interests",
          "Integrated the **Google Gemini API** for conversational recommendations and response generation",
        ],
        slug: null,
      },
    ],
  },
  {
    org: "Girls Who Code · District STEAM Showcase",
    positions: [
      {
        role: "President",
        date: "Aug 2024 – May 2025",
        bullets: [
          "Organized **5 coding camps** for **115+** girls and non-binary students from underserved communities",
          "Directed a district **STEAM showcase** of **150+ student projects**, managing judges, prizes, and logistics",
        ],
        slug: null,
      },
    ],
  },
  {
    org: "Discovery Partners Institute · Digital Scholars",
    positions: [
      {
        role: "Data Science Intern",
        date: "Jun 2024 – Aug 2024",
        bullets: [
          "Analyzed **30 years** of U.S. mental-illness data with **big-data Python pipelines**",
          "Ran statistical analysis and visualization in **pandas, NumPy, and matplotlib**, surfacing demographic correlations",
          "Presented findings to **30+ faculty and peers**; earned the **UIUC Grainger Data Science DISCOVERY microcredential**",
        ],
        slug: null,
        links: [{ label: "capstone report + code", href: "http://bit.ly/PyDataAnalysis" }],
      },
    ],
  },
  {
    org: "Printpal.io",
    positions: [
      {
        role: "Software Developer Intern",
        date: "Jun 2024 – Aug 2024",
        bullets: [
          "Selected as **1 of only 3** Chicago interns at an **AI-driven 3D-printing startup**",
          "Improved the troubleshooting chatbot's **data accuracy** with **Python back-end functions**",
          "Built a **web-scraping algorithm** to automate data collection and sharpen the model's inputs",
        ],
        slug: null,
      },
    ],
  },
  {
    org: "UIC · Creative Algorithms Lab",
    positions: [
      {
        role: "Bioinformatics Research Intern",
        date: "May 2023 – Aug 2024",
        bullets: [
          "Studied **Forman-Ricci and Ollivier-Ricci curvature** and presented findings to a UIC professor and 5 undergraduates",
          "Reviewed drug-target interactions across **E. coli transcriptional**, **M. tuberculosis metabolism**, and **human protein-protein networks**",
        ],
        slug: "springer-paper",
      },
    ],
  },
];

// Render text with **highlighted** segments in bold, brighter color.
function Hl({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((s, i) =>
        i % 2 === 1 ? (
          <span key={i} style={{ color: "var(--text)" }}>
            {s}
          </span>
        ) : (
          <span key={i}>{s}</span>
        )
      )}
    </>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
      {items.map((b, i) => (
        <div key={i} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
          <span style={{ color: "var(--primary-light)", fontSize: "16px", flexShrink: 0, lineHeight: 1.6 }}>•</span>
          <span style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            <Hl text={b} />
          </span>
        </div>
      ))}
    </div>
  );
}

function RoleLine({ role, org, date }: { role: string; org: string; date?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
      <span style={{ fontSize: "17px", lineHeight: 1.3 }}>
        <span style={{ fontWeight: 700, color: "var(--accent)", letterSpacing: "-0.01em" }}>{role}</span>
        <span style={{ fontWeight: 500, color: "var(--primary-light)" }}> @ {org}</span>
      </span>
      {date && <span style={{ fontFamily: MONO, fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{date}</span>}
    </div>
  );
}

function Links({ p }: { p: Position }) {
  if (!p.slug && !p.links?.length) return null;
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", marginTop: "10px" }}>
      {p.slug && (
        <Link href={`/projects/${p.slug}`} style={{ fontSize: "15px", color: "var(--primary-light)", textDecoration: "none", fontWeight: 600 }}>
          deep dive in Projects →
        </Link>
      )}
      {p.links?.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "15px", color: "var(--primary-light)", textDecoration: "none", fontWeight: 600 }}>
          ↗ {l.label}
        </a>
      ))}
    </div>
  );
}

export function Experience() {
  // The "light traces the timeline" animation auto-starts once the section scrolls into view.
  const [pulsing, setPulsing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPulsing(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="experience" accent="violet" divider style={{ paddingTop: "3rem" }}>
      <SectionLabel>experience</SectionLabel>
      <SectionHeading>where i&apos;ve worked</SectionHeading>

      <div ref={ref}>
        {COMPANIES.map((c, i) => {
          const last = i === COMPANIES.length - 1;
          const multi = c.positions.length > 1;
          // Trace oldest → newest: the bottom-most (oldest) dot lights first, up to the top.
          const dotDelay = (COMPANIES.length - 1 - i) * STEP;
          const lineDelay = (COMPANIES.length - 2 - i) * STEP + STEP * 0.5;

          return (
            <div key={c.org} style={{ position: "relative", paddingLeft: "2.6rem", paddingBottom: last ? 0 : "2.75rem" }}>
              {/* Continuous rail line to the next dot */}
              {!last && (
                <div style={{ position: "absolute", left: "6.5px", top: "22px", bottom: "-6px", width: 2, background: "var(--border)", overflow: "hidden" }}>
                  {pulsing && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--primary-light)",
                        boxShadow: "0 0 8px var(--primary-light)",
                        transformOrigin: "bottom",
                        transform: "scaleY(0)",
                        animation: `lineFill 0.34s linear ${lineDelay}s forwards`,
                      }}
                    />
                  )}
                </div>
              )}

              {/* Dot */}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "6px",
                  boxSizing: "border-box",
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  background: "var(--bg)",
                  border: "3px solid var(--primary-light)",
                  boxShadow: "0 0 0 4px var(--primary-dim)",
                  ...(pulsing ? { animation: `dotLight 0.55s ease ${dotDelay}s forwards` } : {}),
                }}
              />

              {/* Divider centered in the gap between entries */}
              {!last && <div style={{ position: "absolute", left: "2.6rem", right: 0, bottom: "1.375rem", height: 1, background: "var(--border)" }} />}

              {/* Content */}
              <div style={{ minWidth: 0 }}>
                {multi ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                    {c.positions.map((p, idx) => (
                      <div key={p.role}>
                        <RoleLine role={p.role} org={c.org} date={idx === 0 ? c.date : undefined} />
                        <Bullets items={p.bullets} />
                        <Links p={p} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <RoleLine role={c.positions[0].role} org={c.org} date={c.positions[0].date} />
                    <Bullets items={c.positions[0].bullets} />
                    <Links p={c.positions[0]} />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes dotLight {
          0%   { background: var(--bg); transform: scale(1); box-shadow: 0 0 0 4px var(--primary-dim); }
          50%  { transform: scale(1.45); box-shadow: 0 0 0 8px var(--primary-dim), 0 0 22px 5px var(--primary-light); }
          100% { background: var(--primary-light); transform: scale(1); box-shadow: 0 0 0 4px var(--primary-dim), 0 0 12px 2px var(--primary-light); }
        }
        @keyframes lineFill {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </SectionWrapper>
  );
}
