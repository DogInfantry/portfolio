import Link from "next/link";
import type { Metadata } from "next";
import { research } from "@/data/research";
import { site } from "@/data/site";
import { work } from "@/data/work";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research and publications by Anklesh Rawat: a working paper on SEBI's 2024–25 index derivatives reforms, plus strategy and policy work on strategic metals, MSME credit, ESG value creation, river management, and currency markets.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research · Anklesh Rawat",
    description:
      "A working paper on SEBI's 2024–25 index derivatives reforms, plus strategy and policy work across metals, MSME credit, ESG, river management, and currency markets.",
    type: "website",
    url: `${site.url}/research`,
    images: ["/og.png"],
  },
};

/**
 * The route is kept rather than folded into /work, because it is indexed and
 * linked externally. It now renders the same index component scoped to the
 * written work, so the two pages can never drift apart.
 */
const researchItems = work.filter((w) => w.href.startsWith("/research/"));
const papers = research.filter((d) => d.publication).length;

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
      <p className="sc kicker">Publications &amp; research</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        Research
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {papers === 1 ? "A working paper" : `${papers} working papers`} on
        derivatives regulation, plus longer-form strategy roadmaps, policy
        proposals, market analysis, and company deep-dives. Every item has a
        summary page and an open PDF.
      </p>
      <p className="mt-3 text-sm text-muted-2">
        Looking for the live dashboards and code as well?{" "}
        <Link href="/work" className="lk text-accent">
          The full work index has everything
        </Link>
        .
      </p>

      <div className="mt-10">
        <WorkIndex items={researchItems} />
      </div>
    </div>
  );
}
