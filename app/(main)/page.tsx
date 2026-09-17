"use client";

import { useEffect, useState } from "react";
import SelectedWork from "../components/SelectedWork";
import ContactModal from "../components/ContactModal";

const SERVICES = [
  {
    num: "01",
    key: "web",
    title: "Websites / Apps",
    desc: "Fast, modern websites and web apps that make a strong first impression and drive enquiries.",
  },
  {
    num: "02",
    key: "content",
    title: "Content",
    desc: "Reels, social creatives, thumbnails and visual systems that keep brands active.",
  },
  {
    num: "03",
    key: "automation",
    title: "Automation",
    desc: "Forms, WhatsApp flows and AI-assisted systems that reduce repetitive work.",
  },
  {
    num: "04",
    key: "brand",
    title: "Brand Systems",
    desc: "A consistent visual identity across web, social and customer touchpoints.",
  },
];

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
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
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="hero">
          <div className="reveal in">
            <div className="eyebrow">HNA Studio — Web / Content / Automation / Brand</div>
            <h1 className="h-headline">
              Look impossible <span className="mark">to ignore.</span>
            </h1>
            <p className="lede">
              Websites, content and smart digital systems for small businesses that want to
              look professional — and convert.
            </p>
            <div className="hero-cta">
              <a href="#work" className="btn btn-solid">See demos</a>
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="btn btn-outline"
              >
                Start a project
              </button>
            </div>
          </div>
          <div className="swatch-panel reveal in d2">
            <div className="sp-top">HNA / SIGNAL</div>
            <div className="sp-num">04</div>
            <div className="sp-bottom">Ways to grow — scroll for the index</div>
          </div>
        </div>
      </div>

      <section id="services">
        <div className="wrap">
          <div className="sec-eyebrow reveal">What we do</div>
          <h2 className="sec-title reveal d1">
            One studio. Four ways to grow.
          </h2>

          <div className="index-wrap">
            <div className="index">
              {SERVICES.map((s, i) => (
                <div
                  key={s.key}
                  className={`index-row reveal ${i > 0 ? `d${i}` : ""}`}
                  data-service={s.key}
                >
                  <div className="index-num">{s.num}</div>
                  <div className="index-title">{s.title}</div>
                  <div className="index-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SelectedWork />

      <section className="about" id="about">
        <div className="wrap">
          <div className="sec-eyebrow reveal">About HNA</div>
          <div className="about-grid">
            <h3 className="reveal d1">
              Small team. <span className="hl">Big ambition.</span>
            </h3>
            <div className="reveal d2">
              <p>
                HNA Studio is a two-person creative and digital team built by Himanshu and
                Aditya. We combine design, development, editing and 3D skills to create
                practical digital experiences for businesses.
              </p>
              <div className="meta">
                BASED IN INDIA — WORKING WITH AMBITIOUS LOCAL AND ONLINE BRANDS
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contact" id="contact">
        <div className="wrap">
          <h2 className="reveal">
            Let&apos;s build something
            <br />
            impossible to ignore.
          </h2>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="btn btn-solid reveal d1"
          >
            Start a project
          </button>
        </div>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
