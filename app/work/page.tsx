import type { Metadata } from "next";
import { site } from "@/data/site";
import { work } from "@/data/work";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every project and research document by Anklesh Rawat in one filterable index: live analytical apps, an SSRN working paper, strategy decks and open code, across credit, equities, macro, market structure, climate, sustainable finance, quant research and product strategy.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Anklesh Rawat",
    description:
      "Live analytical apps, a working paper, strategy decks and open code, filterable by domain and artefact type.",
    type: "website",
    url: `${site.url}/work`,
    images: ["/og.png"],
  },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
      <p className="sc kicker">Everything, in one place</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
        Work
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {work.length} pieces in four groups: selected work, working papers,
        live apps with their code, then longer-form reports and decks. Filter by
        subject to narrow within the groups. Every card carries the numbers the
        work produced, so you can decide what to open before you open it.
      </p>

      <div className="mt-10">
        <WorkIndex />
      </div>
    </div>
  );
}
