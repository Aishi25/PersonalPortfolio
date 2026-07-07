"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
];

export function Nav() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // On the home page, smooth-scroll to the section instead of doing a hash jump.
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/" || !href.startsWith("/#")) return;
    const el = document.getElementById(href.slice(2));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", href);
  };

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "";
      for (const id of ["about", "projects", "experience"]) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 130 && rect.bottom >= 130) current = id;
        }
      }
      setActive(current);
    };
    onScroll();
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
        href="/"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "15px",
          letterSpacing: "0.08em",
          fontWeight: 700,
          textDecoration: "none",
          background: "linear-gradient(135deg, var(--primary-light), var(--primary))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        AA
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => handleSectionClick(e, l.href)}
            className={`nav-link${active && l.href === `/#${active}` ? " active" : ""}`}
          >
            {l.label}
          </a>
        ))}

        <a href="/Aishi-Agarwal-Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume">
          Resume
        </a>
      </div>

      <style>{`
        .nav-link {
          position: relative;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 4px 2px;
          transition: color 0.18s ease;
        }
        .nav-link:hover,
        .nav-link.active { color: var(--text); }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 2px;
          width: 0;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--primary-light), var(--primary));
          transition: width 0.22s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }
        .nav-resume {
          background: linear-gradient(135deg, var(--primary-light), var(--primary));
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          padding: 7px 18px;
          border-radius: var(--radius);
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(61,157,174,0.35);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .nav-resume:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(61,157,174,0.55);
        }
      `}</style>
    </nav>
  );
}
