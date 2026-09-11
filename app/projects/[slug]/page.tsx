import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { asset } from "@/data/asset";
import { getProject, projects } from "@/data/projects";
import { getDomain, domainVar } from "@/data/domains";
import { site } from "@/data/site";
import BrowserFrame from "@/components/BrowserFrame";
import DocCover from "@/components/DocCover";
import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import StatTiles from "@/components/charts/StatTiles";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    keywords: [getDomain(project.domain).label, ...project.stack],
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
      url: `${site.url}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const externalHref = project.live ?? project.github ?? project.doc;
  const url = `${site.url}/projects/${project.slug}`;
  const domain = getDomain(project.domain);
  const hue = domainVar(project.domain);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": project.live ? "SoftwareApplication" : "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.description,
    about: domain.label,
    keywords: project.stack.join(", "),
    author: { "@type": "Person", name: site.name, url: site.url },
    inLanguage: "en",
    url,
    ...(project.live
      ? {
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          sameAs: project.live,
        }
      : {}),
    ...(project.doc
      ? {
          associatedMedia: {
            "@type": "MediaObject",
            encodingFormat: "application/pdf",
            contentUrl: `${site.url}${project.doc}`,
          },
        }
      : {}),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${site.url}/work`,
      },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />
      <Link href="/work" className="lk text-sm text-muted">
        <span aria-hidden="true">←</span> All work
      </Link>

      <header className="mt-8">
        <p className="sc tnum flex flex-wrap items-center gap-2 text-muted">
          <span>{String(idx + 1).padStart(2, "0")}</span>
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: hue }}
          />
          <Link
            href={`/work?domain=${project.domain}`}
            className="lk transition-colors hover:text-accent"
          >
            {domain.label}
          </Link>
        </p>
        <h1 className="mt-4 font-serif text-display">{project.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>
        {/* The overview paragraph used to sit under an "Overview" heading below
            the numbers, where it restated the tagline to a reader who had not
            been given a single figure yet. As an unlabelled lede it is read. */}
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              Open the dashboard <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-line px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              View on GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.doc && (
            <a
              href={asset(project.doc)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              Open the deck <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </header>

      {/* Stack used to be the last section of the case study, which quietly
          argued the wrong thing about an analyst. As one cell here it is a
          fact. `fact` is the provenance line that until now appeared only on
          index cards, where the reader could not act on it. */}
      <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-4">
        <div>
          <dt className="sc text-muted-2">Domain</dt>
          <dd className="mt-1 text-sm">
            <Link
              href={`/work?domain=${project.domain}`}
              className="lk text-accent"
            >
              {domain.label}
            </Link>
          </dd>
        </div>
        <div>
          <dt className="sc text-muted-2">Artefact</dt>
          <dd className="mt-1 text-sm text-muted">
            {project.live ? "Dashboard" : project.doc ? "Report" : "Repository"}
          </dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className="sc text-muted-2">Basis</dt>
          <dd className="mt-1 text-sm text-muted">{project.fact}</dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className="sc text-muted-2">Stack</dt>
          <dd className="mt-1 text-sm text-muted">
            {project.stack.join(" · ")}
          </dd>
        </div>
      </dl>

      {/* Plain anchors, no scroll spy and no sticky rail. A max-w-3xl article
          with five sections does not earn a rail. */}
      <nav
        aria-label="On this page"
        className="sc no-print mt-4 hidden flex-wrap gap-x-5 gap-y-2 text-muted-2 md:flex"
      >
        {[
          { href: "#result", label: "Result" },
          ...(project.figures?.length ? [{ href: "#figures", label: "Figures" }] : []),
          { href: "#problem", label: "The problem" },
          { href: "#approach", label: "The approach" },
          { href: "#findings", label: "What it found" },
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

      {/* The result comes first. A reader who stops after one screen should
          still leave with the numbers, not with a paragraph of setup. */}
      <section id="result" className="mt-12 scroll-mt-24 border-b border-line pb-8">
        <h2 className="sc kicker">What it produced</h2>
        <StatTiles
          metrics={project.metrics}
          domain={project.domain}
          className="mt-6"
        />
      </section>

      {project.figures && project.figures.length > 0 && (
        <div id="figures" className="mt-12 flex scroll-mt-24 flex-col gap-8">
          {project.figures.map((f) => (
            <Figure key={f.caption} figure={f} domain={project.domain} />
          ))}
        </div>
      )}

      {project.screenshot ? (
        <div className="mt-12">
          <BrowserFrame
            src={project.screenshot}
            priority
            alt={`${project.title}, application screenshot`}
            url={externalHref}
            href={externalHref}
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>
      ) : project.doc ? (
        <figure className="mt-12">
          <a
            href={asset(project.doc)}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-sm border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            {project.cover ? (
              <Image
                src={asset(project.cover)}
                alt={`${project.title}, opening slide`}
                width={1200}
                height={675}
                sizes="(min-width: 768px) 768px, 100vw"
                className="h-auto w-full"
              />
            ) : (
              /* Title is already in the header above, so the fallback card is
                   a call to action rather than a repeat of it. */
              <DocCover
                title="Read the full case deck ↗"
                kind={`${domain.label} · ${project.docLabel ?? "Case deck"}`}
              />
            )}
          </a>
          <figcaption className="sc mt-3 text-muted-2">
            {project.docLabel ?? "Case deck"} · opens as a PDF
          </figcaption>
        </figure>
      ) : project.cover ?? project.thumbnail ? (
        <figure className="mt-12 overflow-hidden rounded-sm border border-line bg-card">
          <Image
            src={asset((project.cover ?? project.thumbnail)!)}
            alt={`${project.title}, an exhibit from the analysis`}
            width={1200}
            height={675}
            sizes="(min-width: 768px) 768px, 100vw"
            /* a vector exhibit needs no raster optimizer; see WorkCard */
            unoptimized={(project.cover ?? project.thumbnail)!.endsWith(".svg")}
            className="h-auto w-full"
          />
        </figure>
      ) : null}

      <section className="mt-16 space-y-12 leading-relaxed">
        <div id="problem" className="scroll-mt-24">
          <h2 className="font-serif text-2xl">The problem</h2>
          <p className="mt-4 text-muted">{project.problem}</p>
        </div>
        <div id="approach" className="scroll-mt-24">
          <h2 className="font-serif text-2xl">The approach</h2>
          <p className="mt-4 text-muted">{project.approach}</p>
        </div>
        <div id="findings" className="scroll-mt-24">
          <h2 className="font-serif text-2xl">What it found</h2>
          {/* Seven identical bordered blocks of body copy gave a skimming eye
              no entry point. Each highlight is already written with its claim
              in the first sentence, so the split is at render time and the two
              halves are weighted differently. No data change, and the reader
              gets seven anchors instead of seven grey rectangles. */}
          <ol className="mt-6 space-y-5">
            {project.highlights.map((h, i) => {
              const cut = h.indexOf(". ");
              const lead = cut === -1 ? h : h.slice(0, cut + 1);
              const rest = cut === -1 ? "" : h.slice(cut + 2);
              return (
                <li
                  key={h}
                  className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-line pb-5 last:border-0"
                >
                  <span aria-hidden="true" className="sc tnum pt-1 text-muted-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed">
                    <span className="font-medium text-foreground">{lead}</span>
                    {rest && <span className="text-muted"> {rest}</span>}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Prev / next */}
      {/* the neighbour's subject sits above its title, so a reader can tell
          whether the next case is even in their field before clicking */}
      <nav className="mt-24 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {[
          { item: prev, dir: "Previous", align: "" },
          { item: next, dir: "Next", align: "text-right" },
        ].map(({ item, dir, align }) => (
          <Link
            key={item.slug}
            href={`/projects/${item.slug}`}
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
            <p className="sc mt-3 text-muted">
              {getDomain(item.domain).label}
            </p>
            <p className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-accent">
              {item.title}
            </p>
          </Link>
        ))}
      </nav>
    </article>
  );
}
