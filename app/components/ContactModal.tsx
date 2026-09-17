"use client";

import { useEffect, useState, useRef, type FormEvent } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SERVICES = [
  "Websites / Apps",
  "Content / Video",
  "Automation",
  "Brand Systems",
  "Full Package",
];

const BUDGETS = [
  "₹5k – ₹10k",
  "₹10k – ₹25k",
  "₹25k – ₹50k",
  "₹50k+",
  "Flexible",
];

export default function ContactModal({ isOpen, onClose }: Props) {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Websites / Apps",
  ]);
  const [selectedBudget, setSelectedBudget] = useState("₹5k – ₹10k");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const toggleService = (srv: string) => {
    setSelectedServices((prev) => {
      if (srv === "Full Package") {
        return ["Full Package"];
      }

      const withoutFull = prev.filter((s) => s !== "Full Package");

      if (withoutFull.includes(srv)) {
        if (withoutFull.length === 1) return withoutFull; // keep at least one selected
        return withoutFull.filter((s) => s !== srv);
      } else {
        return [...withoutFull, srv];
      }
    });
  };

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus first input on open
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello.hnastudio@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const isValidContact = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\d][\d\s\-().]{6,}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const contactError =
    contact && !isValidContact(contact)
      ? "Please enter a valid email or phone number."
      : "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !contact || !isValidContact(contact)) return;

    setSubmitting(true);
    setStatus("idle");

    try {
      const servicesLabel = selectedServices.join(", ");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "83fd0ade-db90-446c-85fc-fd2a77e64bcb",
          from_name: "HNA Studio Website",
          subject: `New Project Inquiry — ${name} (${servicesLabel} · ${selectedBudget})`,
          name,
          email: contact,
          service: servicesLabel,
          budget: selectedBudget,
          message: `Services: ${servicesLabel}\nEstimated Budget: ${selectedBudget}\n\n${message || "(no message provided)"}`,
          replyto: contact,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setContact("");
        setMessage("");
        setSelectedServices(["Websites / Apps"]);
        setSelectedBudget("₹5k – ₹10k");
      } else {
        console.error("Web3Forms error:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const gmailComposeUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=hello.hnastudio@gmail.com&su=Project%20Enquiry%20%E2%80%94%20HNA%20Studio";

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-card"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-tag">
            <span className="dot-mini" />
            HNA STUDIO / START A PROJECT
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <h3 id="modal-title" className="modal-title">
            Let&apos;s build something{" "}
            <span className="mark-accent">great.</span>
          </h3>
          <p className="modal-sub">
            Fill out the quick form below, or connect with us directly via Gmail
            or clipboard.
          </p>

          {status === "success" ? (
            <div className="modal-success-box">
              <div className="success-icon">✓</div>
              <h4>Inquiry Received!</h4>
              <p>
                We&apos;ve received your{" "}
                <strong>{selectedServices.join(", ")}</strong> inquiry (
                {selectedBudget}) and will reply within 24 hours to{" "}
                <strong>{contact}</strong>. Check your inbox!
              </p>
              <button
                type="button"
                className="btn btn-solid modal-reset-btn"
                onClick={() => {
                  setStatus("idle");
                  setName("");
                  setContact("");
                  setMessage("");
                  setSelectedServices(["Websites / Apps"]);
                  setSelectedBudget("₹5k – ₹10k");
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="modal-name">Your Name *</label>
                <input
                  id="modal-name"
                  ref={firstInputRef}
                  type="text"
                  required
                  placeholder="e.g. Alex Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-contact">
                  Email or WhatsApp / Phone *
                </label>
                <input
                  id="modal-contact"
                  type="text"
                  required
                  placeholder="name@example.com or +91 98765 43210"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className={`modal-input${contactError ? " input-error" : ""}`}
                />
                {contactError && <p className="field-error">{contactError}</p>}
              </div>

              <div className="form-group">
                <label>
                  What services are you interested in?{" "}
                  <span
                    style={{ opacity: 0.6, fontSize: "11px", fontWeight: 400 }}
                  >
                    (Select one or more)
                  </span>
                </label>
                <div className="service-pills">
                  {SERVICES.map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        className={`service-pill ${isSelected ? "active" : ""}`}
                        onClick={() => toggleService(srv)}
                      >
                        {isSelected ? "✓ " : ""}
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group">
                <label>Estimated Project Budget</label>
                <div className="budget-pills">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      className={`budget-pill ${
                        selectedBudget === b ? "active" : ""
                      }`}
                      onClick={() => setSelectedBudget(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-message">
                  Tell us about your project (optional)
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  placeholder="Briefly describe what you're looking to build, timeline, or any reference sites..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="modal-input modal-textarea"
                />
              </div>

              {status === "error" && (
                <p className="modal-error-msg">
                  ⚠️ Something went wrong submitting the form. Please copy our
                  email directly below!
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-solid modal-submit-btn"
              >
                {submitting ? "Sending..." : "Send Project Inquiry →"}
              </button>
            </form>
          )}

          <div className="modal-divider">
            <span>OR CONNECT DIRECTLY</span>
          </div>

          <div className="modal-direct-grid">
            <button
              type="button"
              onClick={copyEmail}
              className={`direct-action-btn ${copied ? "copied" : ""}`}
              title="Click to copy email address"
            >
              <span className="btn-icon">📋</span>
              <span className="btn-text">
                {copied
                  ? "✓ Copied to clipboard!"
                  : "Copy: hello.hnastudio@gmail.com"}
              </span>
            </button>

            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="direct-action-btn"
            >
              <span className="btn-icon">🌐</span>
              <span className="btn-text">Open in Gmail Webmail ↗</span>
            </a>

            <a
              href="https://x.com/HNA_Studio"
              target="_blank"
              rel="noopener noreferrer"
              className="direct-action-btn"
            >
              <span className="btn-icon">𝕏</span>
              <span className="btn-text">Follow on X ↗</span>
            </a>

            <a
              href="https://www.instagram.com/hello.hnastudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="direct-action-btn"
            >
              <span className="btn-icon">📸</span>
              <span className="btn-text">Instagram ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
