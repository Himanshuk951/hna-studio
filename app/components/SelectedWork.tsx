"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { projects } from "../data/projects";
import LivePreview from "./LivePreview";

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reveals = el.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-eyebrow reveal">Selected Work</div>
        <h2 className="sec-title reveal d1">Things we&apos;ve built.</h2>
        <p className="work-support reveal d2">
          A selection of concept projects exploring how thoughtful design, development and
          digital systems can help businesses stand out.
        </p>

        <div className="work-list">
          {projects.map((project, i) => (
            <article
              key={project.slug}
              className={`work-item reveal ${i % 2 === 1 ? "reverse" : ""}`}
            >
              <div className="work-visual-col">
                <Link href={`/work/${project.slug}`} className="work-visual-link" aria-label={`View ${project.title} case study`}>
                  <div className="work-visual-frame">
                    <LivePreview src={project.liveUrl} label={project.title} />
                  </div>
                </Link>
              </div>

              <div className="work-info-col">
                <span className="work-num">{project.num}</span>
                <Link href={`/work/${project.slug}`} className="work-title-link">
                  <span className="work-title">{project.title}</span>
                </Link>
                <div className="work-status">{project.status}</div>

                <div className="work-meta-row">
                  <div>
                    <strong>Category</strong>
                    {project.category}
                  </div>
                  <div>
                    <strong>Services</strong>
                    {project.services}
                  </div>
                </div>

                <p className="work-desc">{project.description}</p>

                <div className="work-actions">
                  <Link href={`/work/${project.slug}`} className="work-action-primary">
                    View Project <span className="work-arrow">→</span>
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-action-secondary"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
