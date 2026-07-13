import type { Metadata } from "next";
import { research } from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Selected research by Anklesh Rawat: strategic metals, MSME credit, ESG value creation, and market analysis.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="sc kicker">Selected research</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
        Research
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        Longer-form work: strategy roadmaps, policy proposals, market analysis,
        and company deep-dives. Each opens as a PDF in your browser.
      </p>

      <div className="mt-14">
        {research.map((doc, i) => (
          <article
            key={doc.slug}
            className="grid gap-6 border-t border-line py-10 md:grid-cols-[240px_1fr] md:gap-10"
          >
            <a
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group block self-start"
            >
              <figure className="overflow-hidden rounded-sm border border-line bg-card shadow-[0_1px_2px_rgba(28,37,48,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_28px_rgba(28,37,48,0.12)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doc.cover}
                  alt={`${doc.title}, first page`}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover object-top"
                />
              </figure>
            </a>
            <div>
              <p className="sc tnum text-muted">
                {String(i + 1).padStart(2, "0")} · {doc.kind} · {doc.pages} pp
                · PDF, {doc.sizeMB}
              </p>
              <h2 className="mt-2 font-serif text-2xl leading-snug tracking-tight">
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {doc.title}
                </a>
              </h2>
              <p className="mt-1 font-serif italic text-muted">
                {doc.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {doc.summary}
              </p>
              <div className="mt-5 flex gap-6 text-sm font-medium">
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lk text-accent"
                >
                  Read ↗
                </a>
                <a href={doc.file} download className="lk text-muted">
                  Download PDF
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
