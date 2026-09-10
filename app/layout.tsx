import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/data/site";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist Mono was loaded for exactly one consumer, the 11px URL chip in
// BrowserFrame, which is hidden below sm. A phone downloaded and preloaded a
// whole family for something it never rendered. The chip is sans now, and
// .tnum is font-variant-numeric, so tabular figures survive the removal.

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Portfolio of Anklesh Rawat (MBA, IIM Bodh Gaya): strategy, finance, investment research and quantitative work. Two SSRN working papers, on SEBI's 2024–25 index derivatives reforms and on social protection take-up in rural India. Commercial strategy cases, covenant surveillance, payments economics, equity research engines, capital markets intelligence, climate macro and sustainable finance.",
  keywords: [
    "Anklesh Rawat",
    "commercial strategy",
    "market entry strategy",
    "corporate finance",
    "investment research",
    "payments economics",
    "policy research",
    "equity research",
    "credit analysis",
    "covenant monitoring",
    "financial modeling",
    "derivatives regulation",
    "SEBI index derivatives reforms",
    "difference-in-differences",
    "capital markets",
    "sustainable finance",
    "product strategy",
    "IIM Bodh Gaya",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  other: { "color-scheme": "light dark" },
  openGraph: {
    title: `${site.name} · ${site.role}`,
    description:
      "Commercial strategy cases, covenant surveillance, payments economics, equity research engines, capital markets intelligence, and two SSRN working papers.",
    type: "website",
    url: site.url,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Investment Research & Strategy Analyst",
  description:
    "Finance and strategy generalist working across investment research, management-consulting-style problem-solving, and financial analysis, publishing each analysis as a live dashboard, paper, or case study.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Management Bodh Gaya",
  },
  identifier: site.orcid,
  sameAs: [site.linkedin, site.github, site.ssrn, site.orcid],
  knowsAbout: [
    "Investment research",
    "Equity valuation",
    "Credit and covenant analysis",
    "Derivatives regulation",
    "Causal inference",
    "Capital markets",
    "Sustainable finance",
    "Product strategy",
  ],
};

/**
 * Runs synchronously during HTML parsing, before first paint.
 *
 * Theme: an absent data-theme means "follow the OS", which the light-dark()
 * tokens in globals.css handle on their own, so this only stamps an explicit
 * stored choice. A reader with JavaScript disabled still gets their OS theme.
 *
 * View: the work index ships both the card grid and the table in the markup and
 * lets CSS choose, so stamping ?view=table here means a deep link paints the
 * right one immediately instead of flashing cards and swapping after hydration.
 */
const BOOT_SCRIPT = `(function(){try{
var t=localStorage.getItem("theme");
if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);
if(new URLSearchParams(location.search).get("view")==="table")document.documentElement.dataset.view="table";
}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs synchronously during HTML parsing, so the stored theme is
            applied before the first paint. No attribute means follow the OS.
            The type flips to text/plain on the client because React warns when
            a component renders a script tag, and a script inserted by a DOM
            update would never execute anyway. */}
        <script
          type={
            typeof window === "undefined" ? "text/javascript" : "text/plain"
          }
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Nav puts a wordmark, four links, a GitHub link and the theme toggle
            ahead of content on every page, and it is sticky, so a keyboard user
            tabbed through all of it on every navigation. The unhide rule for
            a.vh:focus lives in globals.css. */}
        <a href="#main" className="vh">
          Skip to content
        </a>
        <JsonLd data={personJsonLd} />
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1 scroll-mt-24">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
