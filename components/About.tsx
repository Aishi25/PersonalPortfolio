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

          {/* Trait pills with staggered animation */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "1.75rem",
            }}
          >
            {TRAITS.map((t, i) => (
              <span
                key={t}
                className="trait-pill"
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--primary-light)",
                  background: "var(--primary-dim)",
                  border: "1px solid rgba(61,157,174,0.3)",
                  borderRadius: "var(--radius)",
                  padding: "5px 16px",
                  animationDelay: `${i * 0.15}s`,
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

          {/* Status badge */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--primary-light)",
                background: "var(--primary-dim)",
                border: "1px solid rgba(61,157,174,0.3)",
                borderRadius: "var(--radius)",
                padding: "8px 16px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--primary-light)",
                  display: "inline-block",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              Open to Summer 2027 internships
            </span>
          </div>

          {/* Contact card */}
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem 1.5rem",
              background: "var(--surface)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxWidth: "360px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}
            >
              contact card
            </div>
            <div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "2px",
                }}
              >
                Aishi Agarwal
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                }}
              >
                CS @ Georgia Tech · Class of &apos;28
              </div>
            </div>
            <div
              style={{
                height: "1px",
                background: "var(--border)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "email", value: "aishi.agarwal.cs@gmail.com", href: "mailto:aishi.agarwal.cs@gmail.com" },
                { label: "linkedin", value: "linkedin.com/in/aishi-agarwal", href: "https://www.linkedin.com/in/aishi-agarwal/" },
                { label: "github", value: "github.com/Aishi25", href: "https://github.com/Aishi25" },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "10px",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      minWidth: "52px",
                    }}
                  >
                    {label}
                  </span>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "12px",
                      color: "var(--primary-light)",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--primary-light)")
                    }
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes traitPop {
          0% { opacity: 0; transform: translateY(6px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .trait-pill {
          opacity: 0;
          animation: traitPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
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
