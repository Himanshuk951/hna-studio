export type ProjectTheme = {
  bg: string;
  fg: string;
  accent: string;
  muted: string;
  line: string;
  fontDisplay: string;
  fontMono: string;
  /** Optional Google Fonts stylesheet URL for fonts not already loaded elsewhere. */
  fontImportUrl?: string;
  /** Case-study <h1> text-transform, e.g. "uppercase" for bold display faces. */
  titleTransform?: string;
};

export type Project = {
  slug: string;
  num: string;
  title: string;
  category: string;
  services: string;
  status: string;
  description: string;
  // Real live demo route, served from app/demo/<slug>/.
  liveUrl: string;
  // Which anchors to show across the 3 case-study preview embeds,
  // in narrative order (top of page / mid offering / conversion action).
  // Use "" for the top of the page.
  previewAnchors: [string, string, string];
  theme: ProjectTheme;
  caseStudy: {
    industry: string;
    services: string;
    concept: string;
    approach: string;
    whatWeBuilt: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "noir-and-bean",
    num: "01",
    title: "NOIR & BEAN",
    category: "Hospitality / Café",
    services: "Web Design · Development · UX",
    status: "Concept Project",
    description:
      "A premium digital experience for a modern specialty café — designed around atmosphere, discovery, menu exploration and reservations.",
    liveUrl: "/demo/noir-and-bean",
    previewAnchors: ["", "#menu", "#reserve"],
    theme: {
      bg: "#f3ece1",
      fg: "#2b2117",
      accent: "#b5563c",
      muted: "#6b5d49",
      line: "#ded2be",
      fontDisplay: "Georgia, 'Times New Roman', serif",
      fontMono: "'IBM Plex Mono', monospace",
    },
    caseStudy: {
      industry: "Hospitality / Café",
      services: "Web Design / Development / UX / Digital Experience",
      concept: "Create a premium digital identity for a modern specialty café.",
      approach:
        "Focus on strong typography, warm editorial visuals, menu discovery, mobile usability and clear conversion paths.",
      whatWeBuilt: [
        "Responsive café website",
        "Interactive menu",
        "Reservation experience",
        "Location / visit section",
        "Mobile navigation",
        "Motion and micro-interactions",
      ],
    },
  },

  {
    slug: "iron-district",
    num: "02",
    title: "IRON DISTRICT",
    category: "Fitness / Gym",
    services: "Web Design · Development · UX",
    status: "Concept Project",
    description:
      "A high-energy digital experience for a premium strength and conditioning studio — built around programs, membership plans, coaching profiles and lead capture.",
    liveUrl: "/demo/iron-district",
    previewAnchors: ["", "#membership", "#cta"],
    theme: {
      bg: "#0a0a09",
      fg: "#f2efe9",
      accent: "#e64327",
      muted: "#8f8c83",
      line: "#2b2a25",
      fontDisplay: "'Anton', sans-serif",
      fontMono: "'JetBrains Mono', monospace",
      fontImportUrl:
        "https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      titleTransform: "uppercase",
    },
    caseStudy: {
      industry: "Fitness / Gym",
      services: "Web Design / Development / UX / Digital Experience",
      concept: "Create a bold, high-energy digital identity for a premium strength and conditioning gym.",
      approach:
        "Focus on dramatic imagery, confident typography, clear program structure, membership comparison and a low-friction lead capture flow.",
      whatWeBuilt: [
        "Responsive gym website",
        "Program showcase",
        "Membership plan comparison",
        "Coach profiles",
        "Lead capture form",
        "Location & hours section",
        "Motion and scroll reveals",
      ],
    },
  },

  // Add future projects here in the same shape — SelectedWork.tsx and
  // app/work/[slug]/page.tsx both read from this array automatically.
  // Each project just needs its own `theme` for the case study to look
  // right; no new CSS file or page code required.
];
