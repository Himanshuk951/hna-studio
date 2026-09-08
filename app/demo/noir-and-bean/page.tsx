"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import "./noir-bean.css";

const MENU: Record<"coffee" | "food" | "dessert", { name: string; price: string }[]> = {
  coffee: [
    { name: "Espresso", price: "₹160" },
    { name: "Cappuccino", price: "₹220" },
    { name: "Flat White", price: "₹240" },
    { name: "Spanish Latte", price: "₹260" },
    { name: "Cold Brew", price: "₹250" },
  ],
  food: [
    { name: "Avocado Toast", price: "₹320" },
    { name: "Truffle Mushroom Toast", price: "₹380" },
    { name: "Grilled Chicken Sandwich", price: "₹420" },
    { name: "Classic Croissant", price: "₹180" },
  ],
  dessert: [
    { name: "Basque Cheesecake", price: "₹320" },
    { name: "Chocolate Tart", price: "₹280" },
  ],
};

const GALLERY = [
  { cls: "g-1", src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80", alt: "Guests sitting and talking inside the café", cap: "People & Conversation" },
  { cls: "g-2", src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80", alt: "Freshly roasted coffee beans", cap: "Coffee" },
  { cls: "g-3", src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80", alt: "Café interior with warm lighting", cap: "Interior" },
  { cls: "g-4", src: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80", alt: "Fresh pastries and toast on a plate", cap: "Food" },
  { cls: "g-5", src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", alt: "Barista preparing a drink behind the counter", cap: "Barista" },
  { cls: "g-6", src: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=900&q=80", alt: "Evening atmosphere at the café with warm lights", cap: "Evening Atmosphere" },
];

const WHY = [
  { num: "01", title: "Specialty Coffee", desc: "Carefully sourced beans and precise brewing, cup after cup." },
  { num: "02", title: "Fresh Kitchen", desc: "Simple food made with quality ingredients, prepared daily." },
  { num: "03", title: "Good Atmosphere", desc: "A space designed for work, conversations and slow mornings." },
  { num: "04", title: "Community", desc: "Events, workshops and coffee culture, open to everyone." },
];

type Filter = "all" | "coffee" | "food" | "dessert";
type Success = { name: string; detail: string } | null;

export default function NoirBeanDemo() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [success, setSuccess] = useState<Success>(null);

  // sticky nav background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // scroll reveal
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function handleReserve(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim() || "friend";
    const date = data.get("date") as string;
    const time = data.get("time") as string;
    const guests = data.get("guests") as string;

    let dateLabel = date;
    try {
      const d = new Date(`${date}T00:00:00`);
      dateLabel = d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    } catch {
      // keep raw date string
    }

    setSuccess({
      name,
      detail: `${guests} guest${Number(guests) === 1 ? "" : "s"} on ${dateLabel} at ${time}`,
    });
  }

  const closeMenu = () => setMenuOpen(false);
  const imgFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.classList.add("img-fallback");
    e.currentTarget.removeAttribute("src");
  };
  const imgFallbackRemove = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.parentElement?.classList.add("img-fallback");
    e.currentTarget.remove();
  };

  return (
    <div className="nb-page" ref={pageRef}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <a href="#main" className="sr-only">Skip to content</a>

      {/* NAV */}
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo">NOIR <span className="amp">&amp;</span> BEAN</a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#menu">Menu</a>
          <a href="#story">Our Story</a>
          <a href="#experience">Experience</a>
          <a href="#visit">Visit</a>
          <a href="#reserve">Contact</a>
        </nav>
        <div className="nav-right">
          <a href="#reserve" className="btn btn-ghost on-dark desktop-only">Order / Reserve</a>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#menu" onClick={closeMenu}>Menu</a>
        <a href="#story" onClick={closeMenu}>Our Story</a>
        <a href="#experience" onClick={closeMenu}>Experience</a>
        <a href="#visit" onClick={closeMenu}>Visit</a>
        <a href="#reserve" onClick={closeMenu}>Contact</a>
        <a href="#reserve" className="btn btn-outline-brass mm-cta" onClick={closeMenu}>Order / Reserve</a>
      </div>

      <main id="main">
        {/* HERO */}
        <section className="hero">
          <div className="hero-media">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=80" alt="Barista pouring latte art into a cup at NOIR & BEAN" />
          </div>
          <div className="hero-inner">
            <p className="hero-eyebrow">Specialty coffee · Hyderabad</p>
            <h1>
              <span className="line1">Coffee worth</span>
              <span className="line2">slowing down for.</span>
            </h1>
            <p className="hero-sub">Specialty coffee, thoughtful food, and a space designed for good conversations.</p>
            <div className="hero-actions">
              <a href="#menu" className="btn btn-primary">Explore the Menu</a>
              <a href="#visit" className="btn btn-ghost on-dark">Visit Us</a>
            </div>
          </div>
          <div className="hero-scroll" aria-hidden="true">
            <span>Scroll</span>
            <span className="dash"></span>
          </div>
        </section>

        {/* STORY */}
        <section className="section" id="story">
          <div className="container about-grid">
            <div className="about-media" data-reveal>
              <img
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80"
                alt="Warm interior seating area of NOIR & BEAN café"
                onError={imgFallback}
              />
              <span className="frame-tag">Our Space</span>
            </div>
            <div className="about-copy" data-reveal style={{ transitionDelay: ".12s" }}>
              <p className="eyebrow">Our Story</p>
              <h2>More than <em>coffee.</em></h2>
              <p>NOIR &amp; BEAN was built around one idea: a café should slow you down, not speed you up. Every detail, from the beans we roast to the music we play, is chosen to hold a moment a little longer — quality coffee, honest food, and a room that feels good to sit in.</p>
              <p>It&apos;s a place for early meetings, long afternoons, and evenings that run past closing. Coffee, food, music and conversation, gathered under one warm light.</p>
              <div className="about-list">
                <div><span>Coffee</span><span>Small-batch, seasonal roasts</span></div>
                <div><span>Food</span><span>Cooked fresh, daily</span></div>
                <div><span>Atmosphere</span><span>Warm light, low noise</span></div>
                <div><span>Community</span><span>Events &amp; workshops</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* MENU */}
        <section className="section hairline-top" id="menu">
          <div className="container">
            <div className="menu-head" data-reveal>
              <div>
                <p className="eyebrow">On The Menu</p>
                <h2>Today&apos;s selection.</h2>
              </div>
              <div className="menu-filters" role="group" aria-label="Filter menu by category">
                {(["all", "coffee", "food", "dessert"] as Filter[]).map((f) => (
                  <button
                    key={f}
                    className={`filter-btn ${filter === f ? "active" : ""}`}
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {(["coffee", "food", "dessert"] as const).map((cat, i) =>
              (filter === "all" || filter === cat) && (
                <div className="menu-category" key={cat} data-reveal>
                  <p className="menu-category-title">
                    <span className="num">0{i + 1}</span> {cat[0].toUpperCase() + cat.slice(1)}
                  </p>
                  <div className="ticket">
                    {MENU[cat].map((item) => (
                      <div className="ticket-row" key={item.name}>
                        <span className="item-name">{item.name}</span>
                        <span className="ticket-leader"></span>
                        <span className="item-price">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* SIGNATURE */}
        <section className="section signature">
          <div className="hero-media signature-media">
            <img
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1800&q=80"
              alt="NOIR Signature Latte with layered milk and espresso"
              onError={imgFallbackRemove}
            />
          </div>
          <div className="container">
            <div className="signature-inner" data-reveal>
              <p className="eyebrow">Signature</p>
              <h2>NOIR <em>Signature</em> Latte</h2>
              <p className="signature-price">₹280</p>
              <p className="desc">Double espresso, silky milk and our signature house blend — built slow, poured smooth, finished with a whisper of cocoa.</p>
              <div className="signature-actions">
                <a href="#menu" className="btn btn-outline-brass">View Full Menu</a>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="section hairline-top" id="experience">
          <div className="container">
            <div data-reveal style={{ marginBottom: 50 }}>
              <p className="eyebrow">Experience</p>
              <h2 style={{ fontSize: "clamp(34px,4.5vw,60px)" }}>Inside NOIR &amp; BEAN.</h2>
            </div>
            <div className="gallery-grid" data-reveal>
              {GALLERY.map((g) => (
                <div className={`gallery-item ${g.cls}`} key={g.cls}>
                  <img src={g.src} alt={g.alt} loading="lazy" onError={imgFallbackRemove} />
                  <span className="g-cap">{g.cap}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY VISIT */}
        <section className="section hairline-top" style={{ paddingBottom: 0 }}>
          <div className="container" style={{ paddingBottom: "var(--section-pad)" }}>
            <div data-reveal style={{ marginBottom: 50 }}>
              <p className="eyebrow">Why Visit</p>
              <h2 style={{ fontSize: "clamp(34px,4.5vw,60px)" }}>Built to be lingered in.</h2>
            </div>
          </div>
          <div className="why-grid" data-reveal>
            {WHY.map((w) => (
              <div className="why-item" key={w.num}>
                <p className="why-num">{w.num}</p>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VISIT */}
        <section className="section hairline-top" id="visit">
          <div className="container visit-grid">
            <div className="visit-copy" data-reveal>
              <p className="eyebrow">Visit</p>
              <h2>Come find us.</h2>
              <div className="visit-block">
                <p className="vb-label">Address</p>
                <p className="vb-text">NOIR &amp; BEAN<br />Road No. 36, Jubilee Hills<br />Hyderabad, Telangana 500033</p>
              </div>
              <div className="visit-block">
                <p className="vb-label">Hours</p>
                <p className="vb-text">Mon–Fri: 8:00 AM – 10:00 PM<br />Sat–Sun: 8:00 AM – 11:00 PM</p>
              </div>
              <div className="visit-actions">
                <a href="https://maps.google.com/?q=Jubilee+Hills+Hyderabad" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get Directions</a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">WhatsApp Us</a>
              </div>
            </div>
            <div className="location-showcase" data-reveal>
              <div className="location-media">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80"
                  alt="NOIR & BEAN Café entrance and outdoor patio in Jubilee Hills"
                />
                <div className="location-tag-top">
                  <span className="live-dot" />
                  Open Today · Until 10:00 PM
                </div>
              </div>
              <div className="location-info-bar">
                <div className="loc-item">
                  <span className="loc-icon">📍</span>
                  <div>
                    <strong>Jubilee Hills, Road 36</strong>
                    <span>Opposite Metro Pillar 1420</span>
                  </div>
                </div>
                <div className="loc-item">
                  <span className="loc-icon">🚗</span>
                  <div>
                    <strong>Valet &amp; Parking</strong>
                    <span>Dedicated parking behind café</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESERVE */}
        <section className="section reserve" id="reserve">
          <div className="container reserve-grid">
            <div className="reserve-copy" data-reveal>
              <p className="eyebrow">Reserve a Table</p>
              <h2>Your table is waiting.</h2>
              <p>Tell us when you&apos;re coming and we&apos;ll have a table ready. This is a concept demo — no booking is actually made.</p>
            </div>

            <div data-reveal style={{ transitionDelay: ".1s" }}>
              {!success ? (
                <form className="reserve-form" onSubmit={handleReserve} noValidate>
                  <div className="field">
                    <label htmlFor="r-name">Name</label>
                    <input type="text" id="r-name" name="name" placeholder="Your full name" required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="r-phone">Phone</label>
                    <input type="tel" id="r-phone" name="phone" placeholder="+91 00000 00000" required autoComplete="tel" />
                  </div>
                  <div className="field">
                    <label htmlFor="r-date">Date</label>
                    <input type="date" id="r-date" name="date" required />
                  </div>
                  <div className="field">
                    <label htmlFor="r-time">Time</label>
                    <input type="time" id="r-time" name="time" required />
                  </div>
                  <div className="field full">
                    <label htmlFor="r-guests">Number of Guests</label>
                    <input type="number" id="r-guests" name="guests" min={1} max={20} placeholder="2" required />
                  </div>
                  <div className="field full reserve-submit">
                    <button type="submit" className="btn btn-outline-brass" style={{ width: "fit-content" }}>Request a Reservation</button>
                  </div>
                  <p className="reserve-note field full">Demo form — not connected to a live booking system.</p>
                </form>
              ) : (
                <div className="reserve-success show" role="status" aria-live="polite">
                  <div className="check" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12.5L9.5 18L20 6" stroke="#C79A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>Table requested.</h3>
                  <p>Thank you, {success.name}. We&apos;ve noted your request for <span className="rs-detail">{success.detail}</span>. We&apos;ll confirm shortly by phone.</p>
                  <button type="button" className="btn btn-ghost on-dark" onClick={() => setSuccess(null)}>
                    Make Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="nav-logo">NOIR <span className="amp">&amp;</span> BEAN</a>
              <p className="footer-tag">Coffee · Food · Community</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Follow</h4>
                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
              <div className="footer-col">
                <h4>Find Us</h4>
                <a href="https://maps.google.com/?q=12+Example+Street+Hyderabad+Telangana" target="_blank" rel="noopener noreferrer">Directions</a>
                <a href="#reserve">Contact</a>
              </div>
              <div className="footer-col">
                <h4>Explore</h4>
                <a href="#menu">Menu</a>
                <a href="#story">Our Story</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 NOIR &amp; BEAN — Concept Project, HNA Studio</span>
            <span className="studio-credit">Concept website designed and developed by <strong>HNA Studio</strong>.</span>
          </div>
        </div>
      </footer>

      <span className="concept-badge">Concept Project — HNA Studio</span>
    </div>
  );
}
