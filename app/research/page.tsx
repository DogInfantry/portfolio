import Link from "next/link";
import type { Metadata } from "next";
import { research, type ResearchDoc } from "@/data/research";
import { site } from "@/data/site";
import DocCover from "@/components/DocCover";

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

const papers = research.filter((d) => d.publication);
const reports = research.filter((d) => !d.publication);

function DocRow({ doc, n }: { doc: ResearchDoc; n: number }) {
  const pub = doc.publication;
  return (
    <article className="grid gap-6 border-t border-line py-10 md:grid-cols-[240px_1fr] md:gap-10">
      <Link href={`/research/${doc.slug}`} className="group block self-start">
        <figure className="overflow-hidden rounded-sm border border-line bg-card shadow-[0_1px_2px_rgba(28,37,48,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_28px_rgba(28,37,48,0.12)]">
          {doc.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={doc.cover}
              alt={`${doc.title}, first page`}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover object-top"
            />
          ) : (
            <DocCover title={doc.title} kind={doc.kind} />
          )}
        </figure>
      </Link>
      <div>
        <p className="sc tnum flex flex-wrap items-center gap-x-2 text-muted">
          <span>{String(n).padStart(2, "0")}</span>
          <span>·</span>
          <span>{doc.kind}</span>
          <span>·</span>
          <span>{doc.pages} pp</span>
          <span>·</span>
          <span>PDF, {doc.sizeMB}</span>
          {pub && <span className="kicker ml-1">SSRN</span>}
        </p>
        <h2 className="mt-2 font-serif text-2xl leading-snug tracking-tight">
          <Link
            href={`/research/${doc.slug}`}
            className="transition-colors hover:text-accent"
          >
            {doc.title}
          </Link>
        </h2>
        <p className="mt-1 font-serif italic text-muted">{doc.subtitle}</p>
        {pub && (
          <p className="mt-2 text-sm text-muted">
            {pub.authors.join(" · ")}
            <span className="mx-2 text-line">|</span>
            {pub.venue}, {pub.date}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-muted">{doc.summary}</p>
        <div className="mt-5 flex flex-wrap gap-6 text-sm font-medium">
          <Link href={`/research/${doc.slug}`} className="lk text-accent">
            Read the summary →
          </Link>
          <a
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            className="lk text-muted"
          >
            PDF ↗
          </a>
          {pub && (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="lk text-muted"
            >
              SSRN ↗
            </a>
          )}
          <a href={doc.file} download className="lk text-muted">
            Download
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="sc kicker">Publications &amp; research</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
        Research
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        A working paper on derivatives regulation, plus longer-form strategy
        roadmaps, policy proposals, market analysis, and company deep-dives.
        Every item has a summary page and an open PDF.
      </p>

      {papers.length > 0 && (
        <section className="mt-14">
          <h2 className="sc text-accent">Publications</h2>
          <div className="mt-4">
            {papers.map((doc, i) => (
              <DocRow key={doc.slug} doc={doc} n={i + 1} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <h2 className="sc text-accent">Reports &amp; analysis</h2>
        <div className="mt-4">
          {reports.map((doc, i) => (
            <DocRow key={doc.slug} doc={doc} n={papers.length + i + 1} />
          ))}
          <div className="border-t border-line" />
        </div>
      </section>
    </div>
  );
}
