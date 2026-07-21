"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Screenshot } from "@/content/projects";

function Placeholder({ label, hint }: { label: string; hint: string }) {
  return (
    <div
      style={{
        aspectRatio: "6 / 5",
        borderRadius: "var(--radius-lg)",
        border: "1.5px dashed var(--border)",
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)" }}>{label}</span>
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "11px",
          color: "var(--text-secondary)",
          opacity: 0.7,
        }}
      >
        {hint}
      </span>
    </div>
  );
}

export function Snapshots({ shots, slug }: { shots: Screenshot[]; slug: string }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  const activeShot = active !== null ? shots[active] : null;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "1.25rem",
          maxWidth: "700px",
        }}
      >
        {shots.map((shot, i) => (
          <figure key={i} style={{ margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            {shot.src ? (
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Enlarge snapshot: ${shot.caption}`}
                style={{
                  padding: 0,
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  background: "none",
                  cursor: "zoom-in",
                  overflow: "hidden",
                  display: "block",
                  lineHeight: 0,
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  width={1200}
                  height={750}
                  style={{
                    width: "100%",
                    aspectRatio: "6 / 5",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                  }}
                />
              </button>
            ) : (
              <Placeholder
                label="Snapshot coming soon"
                hint={`add /public/images/projects/${slug}-${i + 1}.png and set src in content/projects.ts`}
              />
            )}
            <figcaption style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>

      {activeShot?.src && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeShot.caption}
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "3rem 1.5rem",
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "28px",
              lineHeight: 1,
              cursor: "pointer",
              opacity: 0.8,
            }}
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeShot.src}
            alt={activeShot.caption}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "min(1400px, 95vw)",
              maxHeight: "82vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "var(--radius-lg)",
              cursor: "default",
            }}
          />
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", textAlign: "center", margin: 0 }}>
            {activeShot.caption}
          </p>
        </div>
      )}
    </>
  );
}
