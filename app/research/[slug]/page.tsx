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
    <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />

      <Link href="/research" className="lk text-sm text-muted">
        <span aria-hidden="true">←</span> All research
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
        </p>
        <h1 className="mt-4 font-serif text-display">{doc.title}</h1>
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
            Read the PDF <span aria-hidden="true">↗</span>
          </a>
          {pub && (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-line px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              View on SSRN <span aria-hidden="true">↗</span>
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

      {/* Same glance block as a project case study, because they are the same
          practice and the two templates should read as one page shape. */}
      <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-4">
        <div>
          <dt className="sc text-muted-2">Domain</dt>
          <dd className="mt-1 text-sm">
            <Link href={`/work?domain=${doc.domain}`} className="lk text-accent">
              {domain.label}
            </Link>
          </dd>
        </div>
        <div>
          <dt className="sc text-muted-2">Kind</dt>
          <dd className="mt-1 text-sm text-muted">{doc.kind}</dd>
        </div>
        <div>
          <dt className="sc text-muted-2">Length</dt>
          <dd className="tnum mt-1 text-sm text-muted">
            {doc.pages} pp · {doc.sizeMB}
          </dd>
        </div>
        {/* not every item is published at a venue; say nothing rather than
            leave a labelled empty cell */}
        {pub && (
          <div>
            <dt className="sc text-muted-2">Venue</dt>
            <dd className="mt-1 text-sm text-muted">{pub.venue}</dd>
          </div>
        )}
      </dl>

      <nav
        aria-label="On this page"
        className="sc no-print mt-4 hidden flex-wrap gap-x-5 gap-y-2 text-muted-2 md:flex"
      >
        {[
          ...(doc.metrics?.length ? [{ href: "#result", label: "Result" }] : []),
          ...(doc.figures?.length ? [{ href: "#figures", label: "Figures" }] : []),
          ...(pub ? [{ href: "#abstract", label: "Abstract" }] : []),
          { href: "#overview", label: pub ? "In short" : "Overview" },
          ...(doc.findings?.length
            ? [{ href: "#findings", label: "Findings" }]
            : []),
        ].map((a) => (
          <a
            key={a.href}
            href={a.href}
            className="transition-colors hover:text-accent"
          >
            {a.label}
          </a>
        ))}
      </nav>

      {/* Headline numbers before the prose, for the same reason as on a project
          page: a reader who stops early should still leave with the result. */}
      {doc.metrics && doc.metrics.length > 0 && (
        <section id="result" className="mt-12 scroll-mt-24 border-b border-line pb-8">
          <h2 className="sc kicker">What it found</h2>
          <StatTiles
            metrics={doc.metrics}
            domain={doc.domain}
            className="mt-6"
          />
        </section>
      )}

      {doc.figures && doc.figures.length > 0 && (
        <div id="figures" className="mt-12 flex scroll-mt-24 flex-col gap-8">
          {doc.figures.map((f) => (
            <Figure key={f.caption} figure={f} domain={doc.domain} />
          ))}
        </div>
      )}

      {/* The header already carries the title, so a coverless doc shows nothing
          here rather than a DocCover repeating it. */}
      {doc.cover && (
        <figure className="mt-12 overflow-hidden rounded-sm border border-line bg-card">
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

      <section className="mt-16 space-y-12 leading-relaxed">
        {pub && (
          <div id="abstract" className="scroll-mt-24">
            <h2 className="font-serif text-2xl">Abstract</h2>
            <p className="mt-4 text-muted">{pub.abstract}</p>
          </div>
        )}
        <div id="overview" className="scroll-mt-24">
          <h2 className="font-serif text-2xl">
            {pub ? "In short" : "Overview"}
          </h2>
          <p className="mt-4 text-muted">{doc.summary}</p>
        </div>
        {doc.findings && (
          <div id="findings" className="scroll-mt-24">
            <h2 className="font-serif text-2xl">Findings</h2>
            <ol className="mt-6 space-y-5">
              {doc.findings.map((f, i) => {
                const cut = f.indexOf(". ");
                const lead = cut === -1 ? f : f.slice(0, cut + 1);
                const rest = cut === -1 ? "" : f.slice(cut + 2);
                return (
                  <li
                    key={f}
                    className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-line pb-5 last:border-0"
                  >
                    <span
                      aria-hidden="true"
                      className="sc tnum pt-1 text-muted-2"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-relaxed">
                      <span className="font-medium text-foreground">
                        {lead}
                      </span>
                      {rest && <span className="text-muted"> {rest}</span>}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
        {pub && (
          <div className="border-t border-line pt-8">
            <h3 className="sc text-accent">Keywords</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {pub.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-sm border border-line bg-card px-3 py-1 text-xs text-muted"
                >
                  {k}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Prev / next */}
      <nav className="mt-24 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {[
          { item: prev, dir: "Previous", align: "" },
          { item: next, dir: "Next", align: "text-right" },
        ].map(({ item, dir, align }) => (
          <Link
            key={item.slug}
            href={`/research/${item.slug}`}
            className={`group rounded-sm border border-line-strong bg-card p-6 transition-colors hover:border-accent ${align}`}
          >
            <p className="sc text-muted-2">
              {dir === "Previous" ? (
                <>
                  <span aria-hidden="true">←</span> Previous
                </>
              ) : (
                <>
                  Next <span aria-hidden="true">→</span>
                </>
              )}
            </p>
            <p className="sc mt-3 text-muted">{getDomain(item.domain).label}</p>
            <p className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-accent">
              {item.title}
            </p>
          </Link>
        ))}
      </nav>
    </article>
  );
}
