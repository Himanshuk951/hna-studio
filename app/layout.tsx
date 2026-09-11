import type { Metadata } from "next";
import { Unbounded, Inter_Tight, Space_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hnastudio.in"),
  title: {
    default: "HNA Studio — Websites, Content & Digital Systems",
    template: "%s | HNA Studio",
  },
  description:
    "Websites, content and smart digital systems for small businesses that want to look professional — and convert.",
  keywords: [
    "HNA Studio",
    "web design studio",
    "website development",
    "brand systems",
    "small business websites",
    "digital agency",
  ],
  alternates: {
    canonical: "https://hnastudio.in",
  },
  openGraph: {
    title: "HNA Studio — Websites, Content & Digital Systems",
    description:
      "Websites, content and smart digital systems for small businesses that want to look professional — and convert.",
    url: "https://hnastudio.in",
    siteName: "HNA Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HNA Studio",
    description:
      "Websites, content and smart digital systems for small businesses.",
    creator: "@HNA_Studio",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${interTight.variable} ${spaceMono.variable}`}
    >
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
