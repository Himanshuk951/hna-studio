"use client";

import { useRef } from "react";

type Props = {
  src: string;
  label?: string;
}; 

export default function LivePreview({ src, label }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Separate the base URL from the anchor hash (e.g. "/demo/noir-and-bean#menu" -> baseUrl="/demo/noir-and-bean", hash="#menu")
  // Passing the hash directly in the iframe `src` causes the browser engine to perform native anchor navigation,
  // which forces the top-level parent window to scroll down to the bottom iframe!
  // By passing baseUrl to `src` and scrolling the iframe internally via window.scrollTo() on load,
  // the parent window remains firmly at the top without any jump.
  const [baseUrl, rawHash] = src.split("#");
  const targetHash = rawHash ? `#${rawHash}` : null;

  const scrollToTarget = () => {
    if (!targetHash || !iframeRef.current) return;
    try {
      const doc = iframeRef.current.contentDocument;
      const win = iframeRef.current.contentWindow;
      if (!doc || !win) return;
      const target = doc.querySelector(targetHash);
      if (target) {
        const top = target.getBoundingClientRect().top + win.scrollY;
        win.scrollTo({ top, left: 0, behavior: "instant" });
      }
    } catch (e) {
      // ignore
    }
  };

  const handleLoad = () => {
    scrollToTarget();
    setTimeout(scrollToTarget, 100);
    setTimeout(scrollToTarget, 300);
  };

  return (
    <div className="live-preview">
      <div className="live-preview-bar">
        <span className="lp-dot" />
        <span className="lp-dot" />
        <span className="lp-dot" />
        <span className="lp-url">{label ?? src}</span>
      </div>
      <div className="live-preview-viewport">
        <iframe
          ref={iframeRef}
          src={baseUrl}
          className="live-preview-iframe"
          title={label ?? "Live preview"}
          onLoad={handleLoad}
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
