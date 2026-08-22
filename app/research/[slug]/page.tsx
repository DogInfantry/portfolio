import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getResearchDoc, research } from "@/data/research";
import { getDomain, domainVar } from "@/data/domains";
import { site } from "@/data/site";
import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import StatTiles from "@/components/charts/StatTiles";

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
  const domain = getDomain(doc.domain);
  const hue = domainVar(doc.domain);

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
    <article className="mx-auto max-w-3xl px-5 py-14">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />

      <Link href="/research" className="lk text-sm text-muted">
        ← All research
      </Link>

      <header className="mt-8">
        <p className="sc tnum flex flex-wrap items-center gap-2 text-muted">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: hue }}
          />
          <Link
            href={`/work?domain=${doc.domain}`}
            className="lk transition-colors hover:text-accent"
          >
            {domain.label}
          </Link>
          <span aria-hidden="true" className="text-line">
            |
          </span>
          <span className="text-muted-2">
            {doc.kind} · {doc.pages} pp · PDF, {doc.sizeMB}
          </span>
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
            {/* not every venue assigns JEL codes; say nothing rather than an empty label */}
            {pub.jel && pub.jel.length > 0 && (
              <>
                <span className="mx-2 text-line">|</span>
                JEL {pub.jel.join(" · ")}
              </>
            )}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
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

      {/* Headline numbers before the prose, for the same reason as on a project
          page: a reader who stops early should still leave with the result. */}
      {doc.metrics && doc.metrics.length > 0 && (
        <section className="mt-12 border-y border-line py-8">
          <h2 className="sc kicker">What it found</h2>
          <StatTiles
            metrics={doc.metrics}
            domain={doc.domain}
            className="mt-6"
          />
        </section>
      )}

      {doc.figures && doc.figures.length > 0 && (
        <div className="mt-10 flex flex-col gap-8">
          {doc.figures.map((f) => (
            <Figure key={f.caption} figure={f} domain={doc.domain} />
          ))}
        </div>
      )}

      {/* The header already carries the title, so a coverless doc shows nothing
          here rather than a DocCover repeating it. */}
      {doc.cover && (
        <figure className="mt-10 overflow-hidden rounded-sm border border-line bg-card">
          <Image
            src={doc.cover}
            alt={`${doc.title}, first page`}
            width={1200}
            height={675}
            sizes="(min-width: 768px) 768px, 100vw"
            className="h-auto w-full"
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
            <ul className="mt-5 space-y-3">
              {doc.findings.map((f) => (
                <li
                  key={f}
                  className="rounded-sm border border-line bg-card px-5 py-4 leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mb-3 block h-0.5 w-6 rounded-full"
                    style={{ background: hue }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
        {pub && (
          <div className="border-t border-line pt-8">
            <h3 className="sc text-accent">Keywords</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {pub.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-sm border border-line bg-card px-2.5 py-1 text-xs text-muted"
                >
                  {k}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Prev / next */}
      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <Link
          href={`/research/${prev.slug}`}
          className="group rounded-sm border border-line bg-card p-5 transition-colors hover:border-accent"
        >
          <p className="sc text-muted-2">← Previous</p>
          <p className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-accent">
            {prev.title}
          </p>
        </Link>
        <Link
          href={`/research/${next.slug}`}
          className="group rounded-sm border border-line bg-card p-5 text-right transition-colors hover:border-accent"
        >
          <p className="sc text-muted-2">Next →</p>
          <p className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-accent">
            {next.title}
          </p>
        </Link>
      </nav>
    </article>
  );
}
