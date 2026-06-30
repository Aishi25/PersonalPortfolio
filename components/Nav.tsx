"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
];

export function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "0 1.5rem",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "var(--bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "13px",
          letterSpacing: "0.08em",
          color: "var(--primary-light)",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        AA
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            {l.label}
          </a>
        ))}

<a
          href="/Aishi-Agarwal-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "var(--primary)",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 500,
            padding: "6px 14px",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
