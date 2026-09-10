export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="wrap">
        <nav>
          <div className="logo">
            HNA
            <span className="dot" />
          </div>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </div>

      {children}

      <footer>
        <div className="wrap">
          <span className="f-mono">HNA STUDIO — 2026</span>
          <div className="f-links">
            <a
              href="https://x.com/HNA_Studio"
              target="_blank"
              rel="noopener noreferrer"
              className="f-mono f-link"
            >
              X ↗
            </a>
            <span className="f-mono f-sep">·</span>
            <a
              href="https://www.instagram.com/hello.hnastudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="f-mono f-link"
            >
              Instagram ↗
            </a>
            <span className="f-mono f-sep">·</span>
            <span className="f-mono">Himanshu × Aditya</span>
          </div>
        </div>
      </footer>
    </>
  );
}
