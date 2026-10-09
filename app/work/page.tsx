import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { indexProps, work } from "@/data/work";
import WorkCards from "@/components/WorkCards";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every project and research document by Anklesh Rawat in one filterable index: dashboards, two SSRN working papers, strategy decks and open code, across credit, equities, macro, market structure, climate, sustainable finance, quant research and product strategy.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Anklesh Rawat",
    description:
      "Dashboards, two working papers, strategy decks and open code, filterable by subject and by artefact, as cards or as a table.",
    type: "website",
    url: `${site.url}/work`,
  },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <h1 className="font-serif text-display">Work</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        All {work.length} pieces: selected work, dashboards, reports and
        working papers. Filter by subject or type, search titles and tools, or
        switch to the table to compare headline numbers before opening any.
      </p>
      <p className="mt-3 text-sm text-muted-2">
        Papers and reports on their own:{" "}
        <Link href="/research" className="lk text-accent">
          the research index
        </Link>
        .
      </p>

      <div className="mt-12">
        <WorkIndex {...indexProps()}>
          <WorkCards headingLevel={2} />
        </WorkIndex>
      </div>
    </div>
  );
}
