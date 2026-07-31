import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getResearchDoc, research } from "@/data/research";
import { site } from "@/data/site";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return research.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getResearchDoc(slug);
  if (!doc) return {};
  const description = doc.publication
    ? doc.publication.abstract.slice(0, 300)
    : doc.summary;
  return {
    title: doc.title,
    description,
    keywords: doc.publication?.keywords,
    alternates: { canonical: `/research/${doc.slug}` },
    openGraph: {
      title: doc.title,
      description,
      type: "article",
      url: `${site.url}/research/${doc.slug}`,
      // declaring openGraph here replaces the layout's, so images must repeat
      images: ["/og.png"],
    },
  };
}

export default async function ResearchDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getResearchDoc(slug);
  if (!doc) notFound();

  const idx = research.findIndex((d) => d.slug === slug);
  const prev = research[(idx - 1 + research.length) % research.length];
  const next = research[(idx + 1) % research.length];
  const pub = doc.publication;
  const url = `${site.url}/research/${doc.slug}`;

  const jsonLd = pub
    ? {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: `${doc.title}: ${doc.subtitle}`,
        name: doc.title,
        abstract: pub.abstract,
        author: pub.authors.map((a) => ({
          "@type": "Person",
          name: a,
          ...(a === site.name ? { identifier: site.orcid } : {}),
        })),
        datePublished: pub.date,
        publisher: { "@type": "Organization", name: pub.venue },
        keywords: pub.keywords.join(", "),
        inLanguage: "en",
        url,
        sameAs: pub.url,
        associatedMedia: {
          "@type": "MediaObject",
          encodingFormat: "application/pdf",
          contentUrl: `${site.url}${doc.file}`,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Report",
        headline: `${doc.title}: ${doc.subtitle}`,
        name: doc.title,
        abstract: doc.summary,
        author: { "@type": "Person", name: site.name, url: site.url },
        inLanguage: "en",
        url,
        associatedMedia: {
          "@type": "MediaObject",
          encodingFormat: "application/pdf",
          contentUrl: `${site.url}${doc.file}`,
        },
      };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Research",
        item: `${site.url}/research`,
      },
      { "@type": "ListItem", position: 3, name: doc.title, item: url },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />

      <Link href="/research" className="lk text-sm text-muted">
        ← All research
      </Link>

      <header className="mt-8">
        <p className="sc tnum text-accent">
          {doc.kind} · {doc.pages} pp · PDF, {doc.sizeMB}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-4 font-serif text-lg italic leading-relaxed text-muted">
          {doc.subtitle}
        </p>
        {pub && (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {pub.authors.join(" · ")}
            <span className="mx-2 text-line">|</span>
            {pub.venue}, {pub.date}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Read the PDF ↗
          </a>
          {pub && (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-line px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              View on SSRN ↗
            </a>
          )}
          <a
            href={doc.file}
            download
            className="rounded-sm border border-line px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Download
          </a>
        </div>
      </header>

      {/* The header already carries the title, so a coverless doc shows nothing
          here rather than a DocCover repeating it. */}
      {doc.cover && (
        <figure className="mt-12 overflow-hidden rounded-sm border border-line bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={doc.cover}
            alt={`${doc.title}, first page`}
            className="aspect-[16/9] w-full object-cover object-top"
          />
        </figure>
      )}

      <section className="mt-12 space-y-12 leading-relaxed">
        {pub && (
          <div>
            <h2 className="font-serif text-2xl">Abstract</h2>
            <p className="mt-3 text-muted">{pub.abstract}</p>
          </div>
        )}
        <div>
          <h2 className="font-serif text-2xl">
            {pub ? "In short" : "Overview"}
          </h2>
          <p className="mt-3 text-muted">{doc.summary}</p>
        </div>
        {doc.findings && (
          <div>
            <h2 className="font-serif text-2xl">Findings</h2>
            <ul className="mt-4 space-y-3">
              {doc.findings.map((f) => (
                <li key={f} className="flex gap-3 text-muted">
                  <span className="mt-0.5 text-accent">▪</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {pub && (
          <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-[1fr_auto]">
            <div>
              <h3 className="sc text-accent">Keywords</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {pub.keywords.join(" · ")}
              </p>
            </div>
            <div>
              <h3 className="sc text-accent">JEL codes</h3>
              <p className="sc tnum mt-3 text-muted">{pub.jel.join(" · ")}</p>
            </div>
          </div>
        )}
      </section>

      {/* Prev / next */}
      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <Link
          href={`/research/${prev.slug}`}
          className="group rounded-sm border border-line bg-card p-5 transition-colors hover:border-accent"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-muted">
            ← Previous
          </p>
          <p className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-accent">
            {prev.title}
          </p>
        </Link>
        <Link
          href={`/research/${next.slug}`}
          className="group rounded-sm border border-line bg-card p-5 text-right transition-colors hover:border-accent"
        >
          <p className="text-xs uppercase tracking-[0.15em] text-muted">
            Next →
          </p>
          <p className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-accent">
            {next.title}
          </p>
        </Link>
      </nav>
    </article>
  );
}
