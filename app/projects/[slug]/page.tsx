import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/ui/SectionWrapper";
import { PROJECTS, getProject, type Screenshot } from "@/content/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} · Aishi Agarwal`,
    description: project.tagline,
  };
}

function Placeholder({ label, hint, aspect }: { label: string; hint: string; aspect: string }) {
  return (
    <div
      style={{
        aspectRatio: aspect,
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

function ScreenshotFigure({ shot, slug, index }: { shot: Screenshot; slug: string; index: number }) {
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
      {shot.src ? (
        <Image
          src={shot.src}
          alt={shot.caption}
          width={1200}
          height={750}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
          }}
        />
      ) : (
        <Placeholder
          label="Screenshot coming soon"
          hint={`add /public/images/projects/${slug}-${index + 1}.png and set src in content/projects.ts`}
          aspect="16 / 10"
        />
      )}
      <figcaption style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{shot.caption}</figcaption>
    </figure>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "var(--text)",
        letterSpacing: "-0.01em",
        margin: "3rem 0 1rem",
      }}
    >
      {children}
    </h2>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main>
        <article style={{ maxWidth: "820px", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>
          <Link
            href="/#projects"
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            ← all projects
          </Link>

          <div style={{ marginTop: "2rem" }}>
            <SectionLabel>project</SectionLabel>
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", flexWrap: "wrap" }}>
              <h1
                style={{
                  fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)",
                  fontWeight: 600,
                  color: "var(--text)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {project.name}
              </h1>
              <span
                style={{
                  fontSize: "12px",
                  padding: "3px 10px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  background: project.badgeAccent ? "rgba(249,115,22,0.12)" : "var(--primary-dim)",
                  color: project.badgeAccent ? "var(--accent)" : "var(--primary-light)",
                  border: `1px solid ${project.badgeAccent ? "rgba(249,115,22,0.25)" : "rgba(61,157,174,0.3)"}`,
                }}
              >
                {project.badge}
              </span>
            </div>
            <p style={{ marginTop: "0.75rem", fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {project.tagline}
            </p>

            <div style={{ display: "flex", gap: "16px", marginTop: "1.25rem", flexWrap: "wrap" }}>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "15px", color: "var(--primary-light)", textDecoration: "none", fontWeight: 500 }}
                >
                  ↗ {project.demoLabel}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "15px", color: "var(--text-secondary)", textDecoration: "none", fontWeight: 500 }}
                >
                  ↗ github
                </a>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1.25rem" }}>
              {project.tags.map((t) => (
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
            </div>
          </div>

          <SubHeading>overview</SubHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {project.overview.map((para, i) => (
              <p key={i} style={{ fontSize: "15.5px", color: "var(--text-secondary)", lineHeight: 1.75 }}>
                {para}
              </p>
            ))}
          </div>

          <SubHeading>demo video</SubHeading>
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              controls
              style={{
                width: "100%",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
              }}
            />
          ) : (
            <Placeholder
              label="Demo video coming soon"
              hint={`add /public/videos/${project.slug}-demo.mp4 and set videoUrl in content/projects.ts`}
              aspect="16 / 9"
            />
          )}

          <SubHeading>screenshots</SubHeading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {project.screenshots.map((shot, i) => (
              <ScreenshotFigure key={i} shot={shot} slug={project.slug} index={i} />
            ))}
          </div>

          <SubHeading>how it&apos;s built</SubHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {project.techStack.map((t) => (
              <div
                key={t.name}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "0.9rem 1.1rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "13px",
                    color: "var(--primary-light)",
                    whiteSpace: "nowrap",
                    minWidth: "160px",
                  }}
                >
                  {t.name}
                </span>
                <span style={{ fontSize: "14.5px", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, minWidth: "200px" }}>
                  {t.role}
                </span>
              </div>
            ))}
          </div>

          <SubHeading>challenges &amp; learnings</SubHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {project.challenges.map((c) => (
              <div key={c.title}>
                <h3 style={{ fontSize: "15.5px", fontWeight: 600, color: "var(--text)", marginBottom: "0.35rem" }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
