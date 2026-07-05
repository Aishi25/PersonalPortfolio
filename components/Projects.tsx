"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionWrapper, SectionLabel, SectionHeading } from "@/components/ui/SectionWrapper";
import { PROJECTS } from "@/content/projects";

export function Projects() {
  const router = useRouter();

  return (
    <SectionWrapper id="projects">
      <SectionLabel>projects</SectionLabel>
      <SectionHeading>things i&apos;ve built</SectionHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {PROJECTS.map((p) => (
          <div
            key={p.slug}
            role="link"
            tabIndex={0}
            aria-label={`View details for ${p.name}`}
            onClick={() => router.push(`/projects/${p.slug}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/projects/${p.slug}`);
              }
            }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem 1.75rem",
              transition: "border-color 0.15s",
              cursor: "pointer",
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
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: "14px", color: "var(--primary-light)", textDecoration: "none", fontWeight: 500 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--primary-light)")}
                  >
                    ↗ {p.demoLabel}
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
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

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
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
              <Link
                href={`/projects/${p.slug}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  marginLeft: "auto",
                  fontSize: "13px",
                  color: "var(--primary-light)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                learn more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
