import Link from "next/link";
import type { Metadata } from "next";
import { research } from "@/data/research";
import { site } from "@/data/site";
import { indexProps, work } from "@/data/work";
import WorkCards from "@/components/WorkCards";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research and publications by Anklesh Rawat: two SSRN working papers, one on SEBI's 2024–25 index derivatives reforms and one on social protection take-up in rural India, plus strategy and policy work on strategic metals, MSME credit, ESG value creation, river management, and currency markets.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research · Anklesh Rawat",
    description:
      "Two SSRN working papers, plus strategy and policy work across metals, MSME credit, ESG, river management, and currency markets.",
    type: "website",
    url: `${site.url}/research`,
  },
};

/**
 * The route is kept rather than folded into /work, because it is indexed and
 * linked externally. It renders the same index scoped to the written work, so
 * the two pages can never drift apart, and the copy names the venue explicitly
 * so a reader arriving from a search result does not read it as a filtered
 * /work.
 */
const researchItems = work.filter((w) => w.href.startsWith("/research/"));
const papers = research.filter((d) => d.publication).length;

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="sc kicker">Publications &amp; research</p>
      <h1 className="mt-4 font-serif text-display">Research</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {papers === 1 ? "A working paper" : `${papers} working papers`} on SSRN,
        each with an abstract, a stated design, and results reported whether or
        not they flatter the hypothesis. Then longer-form strategy roadmaps,
        policy proposals, market analysis and company deep-dives. Every item has
        a summary page and an open PDF.
      </p>
      <p className="mt-3 text-sm text-muted-2">
        Looking for the live dashboards and code as well?{" "}
        <Link href="/work" className="lk text-accent">
          The full work index has everything
        </Link>
        .
      </p>

      <div className="mt-12">
        <WorkIndex {...indexProps(researchItems)}>
          <WorkCards items={researchItems} headingLevel={2} />
        </WorkIndex>
      </div>
    </div>
  );
}
