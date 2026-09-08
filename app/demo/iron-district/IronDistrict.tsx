"use client";

import React, { useEffect, useRef, useState } from 'react';
import './IronDistrict.css';

/**
 * IRON DISTRICT — Concept Project by HNA Studio
 * ------------------------------------------------
 * A fictional premium fitness studio built as an HNA Studio portfolio demo.
 * Not a real business. All coaches, pricing and location details are
 * illustrative concept content.
 */

const IMG = {
  hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=80',
  strength: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80',
  conditioning: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  personal: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80',
  experience: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1800&q=80',
  coach1: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=900&q=80',
  coach2: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
  coach3: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
};

/* ---------- Scroll reveal hook ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '', as: Tag = 'div' }: { children: React.ReactNode; className?: string; as?: any }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref} className={`id-reveal ${className}`}>
      {children}
    </Tag>
  );
}

const NAV_LINKS = [
  { label: 'Programs', href: '#programs' },
  { label: 'Training', href: '#experience' },
  { label: 'Membership', href: '#membership' },
  { label: 'Coaches', href: '#coaches' },
  { label: 'Visit', href: '#location' },
];

const PRINCIPLES = [
  { num: '01', title: 'Discipline', body: "Show up when motivation doesn't." },
  { num: '02', title: 'Progress', body: 'Train with purpose. Track your growth.' },
  { num: '03', title: 'Community', body: 'Train together. Push further.' },
];

const PROGRAMS = [
  { num: '01', title: 'Strength', tags: 'Powerlifting · Hypertrophy · Functional Strength', img: IMG.strength },
  { num: '02', title: 'Conditioning', tags: 'HIIT · Endurance · Athletic Performance', img: IMG.conditioning },
  { num: '03', title: 'Personal', tags: '1-on-1 Coaching · Custom Programs · Nutrition Guidance', img: IMG.personal },
];

const PLANS = [
  {
    name: 'Starter',
    price: '₹1,999',
    features: ['Gym floor access', 'Standard equipment', 'Locker access'],
    featured: false,
  },
  {
    name: 'Unlimited',
    price: '₹2,999',
    features: ['Unlimited gym access', 'All equipment', 'Group sessions', 'Locker access'],
    featured: true,
  },
  {
    name: 'Elite',
    price: '₹5,999',
    features: ['Everything in Unlimited', 'Personal coaching', 'Custom training plan', 'Monthly progress review'],
    featured: false,
  },
];

const COACHES = [
  { name: 'Alex Ray', role: 'Strength Coach', body: 'Believes strength is built one honest rep at a time — no shortcuts, no ego lifting.', img: IMG.coach1 },
  { name: 'Maya Shah', role: 'Performance Coach', body: 'Focused on measurable progress — programming that adapts as you get stronger.', img: IMG.coach2 },
  { name: 'Arjun Mehta', role: 'Conditioning Coach', body: 'Trains engines, not just muscles. Conditioning built to hold up under pressure.', img: IMG.coach3 },
];

export default function IronDistrict() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', goal: '', time: '' });

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="iron-district">
      <div className="id-grain" aria-hidden="true" />

      {/* ===== NAV ===== */}
      <header className="id-nav">
        <div className="id-wrap id-nav-inner">
          <a href="#top" className="id-logo">
            IRON<span>DISTRICT</span>
          </a>

          <nav aria-label="Primary">
            <ul className="id-nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#cta" className="id-cta-btn desktop-only">
            Start Training
          </a>

          <button
            className={`id-burger ${menuOpen ? 'open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`id-mobile-menu ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#cta" className="id-cta-btn" onClick={closeMenu}>
            Start Training
          </a>
        </div>
      </header>

      <main id="top">
        {/* ===== HERO ===== */}
        <section className="id-hero">
          <div className="id-hero-bg">
            <img src={IMG.hero} alt="Athlete training with heavy barbell under low industrial lighting" />
          </div>
          <div className="id-wrap id-hero-inner">
            <div className="id-hero-tag">
              <span className="dot" />
              Hyderabad — Concept Training Facility
            </div>
            <h1>
              <span className="line"><span>Built Different.</span></span>
              <span className="line"><span>Train Different.</span></span>
            </h1>
            <p className="id-hero-sub">
              Strength, conditioning and discipline for people who refuse average.
            </p>
            <div className="id-hero-actions">
              <a href="#cta" className="id-btn primary">Start Training</a>
              <a href="#programs" className="id-btn ghost">View Programs</a>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <div className="id-ticker">
          <div className="id-ticker-track">
            {[...Array(2)].map((_, i) => (
              <div className="id-ticker-item" key={i}>
                <span>Discipline</span>
                <span className="accent">—</span>
                <span>Progress</span>
                <span className="accent">—</span>
                <span>Community</span>
                <span className="accent">—</span>
                <span>No Shortcuts</span>
                <span className="accent">—</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== PHILOSOPHY ===== */}
        <section className="id-section" id="philosophy">
          <div className="id-wrap">
            <Reveal>
              <div className="id-eyebrow">The District</div>
            </Reveal>
            <div className="id-phil-head">
              <Reveal as="h2">No Shortcuts.</Reveal>
              <Reveal as="p">
                Training is simple. Show up, train with purpose, and keep moving forward.
              </Reveal>
            </div>
            <Reveal>
              <div className="id-principles">
                {PRINCIPLES.map((p) => (
                  <div className="id-principle" key={p.num}>
                    <span className="num">{p.num}</span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== PROGRAMS ===== */}
        <section className="id-section" id="programs">
          <div className="id-wrap">
            <Reveal>
              <div className="id-eyebrow">Training</div>
            </Reveal>
            <Reveal as="div" className="id-programs-head">
              <h2>Choose your discipline.</h2>
            </Reveal>
            <div className="id-programs-list">
              {PROGRAMS.map((program) => (
                <Reveal as="a" className="id-program" key={program.num}>
                  <span className="p-num">{program.num}</span>
                  <span className="p-title">{program.title}</span>
                  <span className="p-tags">{program.tags}</span>
                  <span className="p-arrow">↗</span>
                  <span className="id-program-img">
                    <img src={program.img} alt={`${program.title} training at Iron District`} />
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section className="id-section id-experience" id="experience">
          <div className="id-wrap">
            <Reveal className="id-exp-media" as="div">
              <img src={IMG.experience} alt="Training floor with racks, free weights and structured equipment layout" />
            </Reveal>
            <div className="id-exp-content">
              <Reveal as="h2">This isn't just a gym.</Reveal>
              <Reveal as="div">
                <p>
                  Built for focused training, serious equipment and an environment that
                  makes you want to come back tomorrow.
                </p>
                <div className="id-exp-details">
                  <span>Free Weights</span>
                  <span>Power Racks</span>
                  <span>Machines</span>
                  <span>Open Training Floor</span>
                  <span>On-Floor Coaches</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== MEMBERSHIP ===== */}
        <section className="id-section" id="membership">
          <div className="id-wrap">
            <Reveal>
              <div className="id-eyebrow">Membership</div>
            </Reveal>
            <Reveal as="h2" className="id-programs-head">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,80px)', textTransform: 'uppercase', display: 'block' }}>
                Find your level.
              </span>
            </Reveal>

            <Reveal>
              <div className="id-plans">
                {PLANS.map((plan) => (
                  <div className={`id-plan ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                    {plan.featured && <span className="id-plan-badge">Most Popular</span>}
                    <div className="id-plan-name">{plan.name}</div>
                    <div className="id-plan-price">
                      {plan.price}
                      <span> / month</span>
                    </div>
                    <ul className="id-plan-list">
                      {plan.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <a href="#cta" className={`id-btn ${plan.featured ? 'primary' : 'ghost'}`}>
                      Get Started
                    </a>
                  </div>
                ))}
              </div>
            </Reveal>
            <p className="id-demo-note">
              Pricing shown is demonstration content for this concept project, not a real membership offer.
            </p>
          </div>
        </section>

        {/* ===== COACHES ===== */}
        <section className="id-section" id="coaches">
          <div className="id-wrap">
            <Reveal>
              <div className="id-eyebrow">Coaching</div>
            </Reveal>
            <Reveal as="h2" className="id-programs-head">
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,80px)', textTransform: 'uppercase', display: 'block' }}>
                Train with purpose.
              </span>
            </Reveal>
            <Reveal>
              <div className="id-coaches">
                {COACHES.map((coach) => (
                  <div className="id-coach" key={coach.name}>
                    <div className="id-coach-img">
                      <img src={coach.img} alt={`${coach.name}, ${coach.role} — concept profile`} />
                    </div>
                    <div className="id-coach-info">
                      <div className="role">{coach.role}</div>
                      <h3>{coach.name}</h3>
                      <p>{coach.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <p className="id-demo-note">
              Coach profiles are fictional and created for this concept project — not real trainers.
            </p>
          </div>
        </section>

        {/* ===== CTA / LEAD FORM ===== */}
        <section className="id-section id-cta-section" id="cta">
          <div className="id-wrap">
            <Reveal>
              <div className="id-eyebrow">Get Started</div>
            </Reveal>
            <div className="id-cta-grid">
              <Reveal as="div">
                <h2>Ready to start?</h2>
                <p>Tell us what you're working toward. We'll help you find the right way to train.</p>
              </Reveal>

              <Reveal as="div">
                {!submitted ? (
                  <form className="id-form" onSubmit={handleSubmit}>
                    <div className="id-field">
                      <label htmlFor="id-name">Name</label>
                      <input id="id-name" type="text" required value={formData.name} onChange={handleChange('name')} />
                    </div>
                    <div className="id-field">
                      <label htmlFor="id-phone">Phone</label>
                      <input id="id-phone" type="tel" required value={formData.phone} onChange={handleChange('phone')} />
                    </div>
                    <div className="id-field">
                      <label htmlFor="id-goal">Primary Goal</label>
                      <select id="id-goal" value={formData.goal} onChange={handleChange('goal')} required>
                        <option value="" disabled>Select a goal</option>
                        <option value="strength">Build Strength</option>
                        <option value="conditioning">Improve Conditioning</option>
                        <option value="weight-loss">Weight Loss</option>
                        <option value="personal">1-on-1 Coaching</option>
                      </select>
                    </div>
                    <div className="id-field">
                      <label htmlFor="id-time">Preferred Training Time</label>
                      <select id="id-time" value={formData.time} onChange={handleChange('time')} required>
                        <option value="" disabled>Select a time</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                      </select>
                    </div>
                    <button type="submit" className="id-btn primary">Book a Free Consultation</button>
                    <p className="id-form-note">Demo form — no real booking will be made.</p>
                  </form>
                ) : (
                  <div className="id-success">
                    <div className="mark">✓</div>
                    <h3>Request Received</h3>
                    <p>Thanks, {formData.name || 'there'}. In a live version of this site, our team would reach out to confirm your consultation.</p>
                    <p className="demo-flag">This is a concept project demo — no real booking has been made.</p>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== LOCATION ===== */}
        <section className="id-section" id="location">
          <div className="id-wrap">
            <Reveal>
              <div className="id-eyebrow">Visit</div>
            </Reveal>
            <Reveal as="h2" className="id-programs-head">
              <span>Find your district.</span>
            </Reveal>

            <Reveal>
              <div className="id-location-grid">
                <div className="id-location-info">
                  <div>
                    <h3>Iron District HQ</h3>
                    <p className="addr">Financial District, Nanakramguda · Hyderabad</p>
                    <div className="id-hours">
                      <div><span>Mon – Fri</span><span>6:00 AM – 10:00 PM</span></div>
                      <div><span>Sat – Sun</span><span>7:00 AM – 9:00 PM</span></div>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Financial+District+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="id-btn ghost"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    Get Directions
                  </a>
                </div>

                <div className="id-location-showcase">
                  <div className="id-location-media">
                    <img
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80"
                      alt="Iron District Strength and Conditioning Facility in Hyderabad"
                    />
                    <div className="id-location-tag">
                      <span className="id-live-dot" />
                      Facility Open · Until 10:00 PM
                    </div>
                  </div>
                  <div className="id-location-bar">
                    <div className="id-loc-stat">
                      <span className="id-loc-label">Facility</span>
                      <strong>15,000 sq.ft Strength Floor</strong>
                    </div>
                    <div className="id-loc-stat">
                      <span className="id-loc-label">Access</span>
                      <strong>Dedicated Member Parking &amp; Lockers</strong>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="id-footer">
        <div className="id-wrap">
          <div className="id-footer-badge">
            <span className="dot" />
            Concept Project — HNA Studio
          </div>
          <div className="id-footer-top">
            <div>
              <div className="id-footer-logo">IRON DISTRICT</div>
              <div className="id-footer-tag">Train Hard. Stay Consistent.</div>
            </div>
            <div className="id-footer-links">
              <div className="id-footer-col">
                <a href="#top">Instagram</a>
                <a href="#top">WhatsApp</a>
                <a href="#cta">Contact</a>
              </div>
              <div className="id-footer-col">
                <a href="#programs">Programs</a>
                <a href="#membership">Membership</a>
                <a href="#coaches">Coaches</a>
              </div>
            </div>
          </div>
          <div className="id-footer-bottom">
            <span>© 2026 Iron District — Concept Project</span>
            <span>Concept website designed &amp; developed by HNA Studio.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
