"use client";

import Image from "next/image";
import { SectionWrapper, SectionLabel } from "@/components/ui/SectionWrapper";

const TRAITS = ["Tinkerer", "Pathfinder", "Connector"];

export function About() {
  return (
    <SectionWrapper id="about">
      <SectionLabel>about</SectionLabel>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "4rem",
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Headshot */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 0 0 4px var(--primary-dim)",
              aspectRatio: "3/4",
              position: "relative",
            }}
          >
            <Image
              src="/images/headshot.png"
              alt="Aishi Agarwal"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="280px"
              priority
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--text)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Hey there!
          </h2>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            I&apos;m a Computer Science student at Georgia Tech with a habit of
            turning &ldquo;that would be cool&rdquo; into &ldquo;it&apos;s
            actually working.&rdquo;
          </p>

          {/* Trait pills */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "1.75rem",
            }}
          >
            {TRAITS.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--primary-light)",
                  background: "var(--primary-dim)",
                  border: "1px solid rgba(61,157,174,0.3)",
                  borderRadius: "var(--radius)",
                  padding: "4px 14px",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.25rem",
            }}
          >
            I love integrating creativity into software, whether that&apos;s
            building AI-powered applications, optimizing LLM prompts, or
            wrangling messy datasets. Along the way I&apos;ve contributed to
            published research, shipped software for companies, and placed at
            hackathons.
          </p>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.25rem",
            }}
          >
            Somehow, I&apos;ve also found the time to act as Co-Director of
            Outreach for{" "}
            <span style={{ color: "var(--text)" }}>Data Science @ GT</span>,
            the largest student data club at Georgia Tech, and work as a Machine
            Learning Analyst on an LSTM economic forecasting project under{" "}
            <span style={{ color: "var(--text)" }}>Big Data Big Impact</span>,
            a club focused on AI for social good.
          </p>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "2rem",
            }}
          >
            Apart from school, I document the world through a camera lens and
            fuel it entirely in bubble tea.{" "}
            <span style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
              Priorities.
            </span>
          </p>

          {/* Status + contact */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "12px",
                color: "var(--text-muted)",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "5px 12px",
              }}
            >
              ✦ open to Summer 2027 internships
            </span>
            <a
              href="mailto:aishi.agarwal.cs@gmail.com"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "12px",
                color: "var(--primary-light)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--primary-light)")
              }
            >
              aishi.agarwal.cs@gmail.com →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </SectionWrapper>
  );
}
