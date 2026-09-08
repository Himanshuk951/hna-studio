import { notFound } from "next/navigation";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { projects } from "../../data/projects";
import LivePreview from "../../components/LivePreview";
import ScrollToTop from "../../components/ScrollToTop";
import "./case-study.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — HNA Studio`,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { theme } = project;
  const themeVars = {
    "--cs-bg": theme.bg,
    "--cs-fg": theme.fg,
    "--cs-accent": theme.accent,
    "--cs-muted": theme.muted,
    "--cs-line": theme.line,
    "--cs-font-display": theme.fontDisplay,
    "--cs-font-mono": theme.fontMono,
    "--cs-title-transform": theme.titleTransform ?? "none",
  } as CSSProperties;

  const [anchorTop, anchorMid, anchorEnd] = project.previewAnchors;
  const demoBase = project.liveUrl; // e.g. "/demo/noir-and-bean"

  return (
    <div className="cs-page" style={themeVars}>
      <ScrollToTop />
      {theme.fontImportUrl && <link rel="stylesheet" href={theme.fontImportUrl} />}

      <div className="wrap">
        <Link href="/" className="cs-back">
          ← Back to HNA Studio
        </Link>
      </div>

      <header className="cs-hero">
        <div className="wrap">
          <div className="cs-kicker">Case Study</div>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-subtitle">Concept Project — HNA Studio</p>

          <div className="cs-meta">
            <div>
              <div className="cs-meta-label">Industry</div>
              <div className="cs-meta-value">{project.caseStudy.industry}</div>
            </div>
            <div>
              <div className="cs-meta-label">Services</div>
              <div className="cs-meta-value">{project.caseStudy.services}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="wrap">
        {/* Real, embedded preview of the live demo — top of the page */}
        <div className="cs-visual">
          <LivePreview src={`${demoBase}${anchorTop}`} label={`${demoBase}${anchorTop}`} />
        </div>

        <section className="cs-section">
          <h2>The Concept</h2>
          <p>{project.caseStudy.concept}</p>
        </section>

        {/* Same live site, jumped to the mid-flow section (offering / plans) */}
        <div className="cs-visual">
          <LivePreview src={`${demoBase}${anchorMid}`} label={`${demoBase}${anchorMid}`} />
        </div>

        <section className="cs-section">
          <h2>The Approach</h2>
          <p>{project.caseStudy.approach}</p>
        </section>

        {/* Same live site, jumped to the conversion action */}
        <div className="cs-visual">
          <LivePreview src={`${demoBase}${anchorEnd}`} label={`${demoBase}${anchorEnd}`} />
        </div>

        <section className="cs-built">
          <h2>What We Built</h2>
          <ul>
            {project.caseStudy.whatWeBuilt.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="cs-end">
        <div className="wrap">
          <p style={{ color: "var(--cs-muted)", fontSize: 15 }}>
            {project.title} is a concept project, not a live HNA client.
          </p>
          <div className="cs-end-actions">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-btn cs-btn-solid"
            >
              View Live Demo
            </a>
            <Link href="/" className="cs-btn cs-btn-outline">
              Back to HNA Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
