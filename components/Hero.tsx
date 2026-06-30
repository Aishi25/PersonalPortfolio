"use client";

import { useEffect, useRef, useState } from "react";

const PROMPT = "find me the best AI/ML intern at Georgia Tech";

const RESPONSE_LINES = [
  { text: "Aishi Agarwal", type: "name" },
  { text: "Computer Science @ Georgia Tech · Intelligence (AI/ML) + Devices · GPA 4.0/4.0 · Class of '28", type: "meta" },
  { text: "---", type: "divider" },
  { text: "→ RxGuard — AI drug analyzer, 11.5M+ FAERS records · 2nd place Hacklytics 2026", type: "bullet" },
  { text: "→ built BillBuddy — OCR + NLP medical bill analyzer (AI ATL '25)", type: "bullet" },
  { text: "→ Springer-published paper on Ricci curvature, co-authored at 17, published 2026", type: "bullet" },
  { text: "---", type: "divider" },
  { text: "confidence: 110%  ·  recommendation: hire her", type: "footer" },
];


function Cursor({ visible }: { visible: boolean }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 500);
    return () => clearInterval(t);
  }, []);
  if (!visible) return null;
  return (
    <span style={{ color: "var(--primary-light)", opacity: on ? 1 : 0, transition: "opacity 0.1s" }}>
      ▋
    </span>
  );
}

export function Hero() {
  const [phase, setPhase] = useState<"idle" | "typing-prompt" | "thinking" | "streaming">("idle");
  const [thinkingDots, setThinkingDots] = useState(".");
  const [visibleLines, setVisibleLines] = useState(0);
  const [promptText, setPromptText] = useState("");
  const [promptDone, setPromptDone] = useState(false);
  const streamRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start sequence
  useEffect(() => {
    const t = setTimeout(() => setPhase("typing-prompt"), 800);
    return () => clearTimeout(t);
  }, []);

  // Type the prompt — runs once, never resets
  useEffect(() => {
    if (phase !== "typing-prompt") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setPromptText(PROMPT.slice(0, i));
      if (i >= PROMPT.length) {
        clearInterval(interval);
        setPromptDone(true);
        setTimeout(() => setPhase("thinking"), 600);
      }
    }, 32);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "thinking") return;
    let count = 0;
    const t = setInterval(() => {
      count++;
      setThinkingDots(".".repeat((count % 3) + 1));
      if (count >= 12) {
        clearInterval(t);
        setPhase("streaming");
      }
    }, 300);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "streaming") return;
    let i = 0;
    function next() {
      if (i < RESPONSE_LINES.length) {
        setVisibleLines(i + 1);
        i++;
        const delay = RESPONSE_LINES[i - 1].type === "name" ? 120 : 80;
        streamRef.current = setTimeout(next, delay);
      }
    }
    next();
    return () => { if (streamRef.current) clearTimeout(streamRef.current); };
  }, [phase]);

  const lineStyles: Record<string, React.CSSProperties> = {
    name: {
      fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
      fontWeight: 600,
      color: "var(--text)",
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
      marginBottom: "0.4rem",
    },
    meta: {
      fontFamily: "var(--font-mono), monospace",
      fontSize: "12px",
      color: "var(--text-secondary)",
      marginBottom: "0.5rem",
    },
    divider: {
      fontFamily: "var(--font-mono), monospace",
      fontSize: "11px",
      color: "var(--border-strong)",
      margin: "0.5rem 0",
    },
    bullet: {
      fontFamily: "var(--font-mono), monospace",
      fontSize: "13px",
      color: "var(--text-secondary)",
      lineHeight: 1.7,
    },
    footer: {
      fontFamily: "var(--font-mono), monospace",
      fontSize: "12px",
      color: "var(--primary-light)",
      marginTop: "0.5rem",
    },
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.5rem 3rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "920px" }}>

        {/* Window chrome */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "0 0 0 1px var(--border), 0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: "var(--surface-2)",
              borderBottom: "1px solid var(--border)",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F" }} />
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "11px",
                color: "var(--text-muted)",
                marginLeft: "8px",
                letterSpacing: "0.05em",
              }}
            >
              recruiter-gpt · context: 128k tokens
            </span>
          </div>

          {/* Chat body */}
          <div style={{ padding: "1.75rem 1.5rem", minHeight: "340px" }}>

            {/* User message */}
            {phase !== "idle" && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    marginBottom: "6px",
                    letterSpacing: "0.08em",
                  }}
                >
                  USER
                </div>
                <div
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "10px 14px",
                    fontSize: "14px",
                    color: "var(--text)",
                    display: "inline-block",
                    maxWidth: "100%",
                  }}
                >
                  {promptDone ? PROMPT : promptText}
                  <Cursor visible={phase === "typing-prompt"} />
                </div>
              </div>
            )}

            {/* Thinking indicator */}
            {phase === "thinking" && (
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "12px",
                  color: "var(--primary-light)",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>MODEL  </span>
                thinking{thinkingDots}
              </div>
            )}

            {/* Model response */}
            {phase === "streaming" && (
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "11px",
                    color: "var(--primary-light)",
                    marginBottom: "12px",
                    letterSpacing: "0.08em",
                  }}
                >
                  MODEL
                </div>
                <div
                  style={{
                    background: "var(--primary-dim)",
                    border: "1px solid rgba(61,157,174,0.2)",
                    borderRadius: "var(--radius)",
                    padding: "1.25rem 1.4rem",
                  }}
                >
                  {RESPONSE_LINES.slice(0, visibleLines).map((line, i) => (
                    <div key={i} style={lineStyles[line.type]}>
                      {line.text}
                      {i === visibleLines - 1 && visibleLines < RESPONSE_LINES.length && (
                        <Cursor visible />
                      )}
                    </div>
                  ))}

                  {/* CTAs appear after all lines stream in */}
                  {visibleLines >= RESPONSE_LINES.length && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "1.25rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <a
                        href="#projects"
                        style={{
                          background: "var(--primary)",
                          color: "#fff",
                          fontSize: "13px",
                          fontWeight: 500,
                          padding: "8px 18px",
                          borderRadius: "var(--radius)",
                          textDecoration: "none",
                          transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        see projects →
                      </a>
                      <a
                        href="/Aishi-Agarwal-Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "transparent",
                          color: "var(--text-secondary)",
                          fontSize: "13px",
                          fontWeight: 500,
                          padding: "8px 18px",
                          borderRadius: "var(--radius)",
                          textDecoration: "none",
                          border: "1px solid var(--border-strong)",
                          transition: "border-color 0.15s, color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--primary)";
                          e.currentTarget.style.color = "var(--text)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border-strong)";
                          e.currentTarget.style.color = "var(--text-secondary)";
                        }}
                      >
                        download resume ↓
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll nudge */}
        {visibleLines >= RESPONSE_LINES.length && (
          <div
            style={{
              textAlign: "center",
              marginTop: "2.5rem",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
            }}
          >
            scroll to explore ↓
          </div>
        )}
      </div>
    </section>
  );
}
