"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionWrapper, SectionLabel } from "@/components/ui/SectionWrapper";

const TRAIT_STRING = "Tinkerer. Pathfinder. Connector.";

function TraitTypewriter() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(TRAIT_STRING.slice(0, i));
      if (i >= TRAIT_STRING.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <div ref={ref} style={{ marginBottom: "1.75rem" }}>
      <span
        style={{
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          fontFamily: "var(--font-mono), monospace",
          background: "linear-gradient(90deg, var(--primary-light) 0%, var(--primary) 50%, #2a7a8a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {displayed}
      </span>
      {!done && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1.4em",
            background: "var(--primary-light)",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            animation: "blink 0.7s step-end infinite",
          }}
        />
      )}
    </div>
  );
}

export function About() {
  return (
    <SectionWrapper id="about" style={{ paddingTop: "3rem" }}>
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
        {/* Headshot + contact card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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

          {/* Contact card */}
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem 1.5rem",
              background: "var(--surface)",
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "12px",
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
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: "4px",
                }}
              >
                Aishi Agarwal
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                CS @ Georgia Tech · Class of &apos;28
              </div>
            </div>
            <div style={{ height: "1px", background: "var(--border)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "email", value: "aishi.agarwal.cs@gmail.com", href: "mailto:aishi.agarwal.cs@gmail.com" },
                { label: "linkedin", value: "aishi-agarwal", href: "https://www.linkedin.com/in/aishi-agarwal/" },
                { label: "github", value: "Aishi25", href: "https://github.com/Aishi25" },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ display: "flex", gap: "0.5rem", alignItems: "baseline", flexWrap: "wrap" }}>
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
                      wordBreak: "break-all",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--primary-light)")}
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>
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

          <TraitTypewriter />

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "1.25rem",
            }}
          >
            I love integrating creativity into software, whether that&apos;s
            building <span style={{ color: "var(--text)" }}>AI-powered applications</span>,{" "}
            <span style={{ color: "var(--text)" }}>prompt engineering</span>, or
            extracting insights from{" "}
            <span style={{ color: "var(--text)" }}>large-scale datasets</span>. Along the way I&apos;ve contributed to
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
                fontSize: "15px",
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

        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
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
