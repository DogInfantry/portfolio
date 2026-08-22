import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
      // declaring openGraph here replaces the layout's, so images must repeat
      images: ["/og.png"],
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
    <article className="mx-auto max-w-3xl px-5 py-14">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />
      <Link href="/work" className="lk text-sm text-muted">
        ← All work
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
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {project.tagline}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              Open live app ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-line px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              View on GitHub ↗
            </a>
          )}
          {project.doc && (
            <a
              href={project.doc}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              Open the deck ↗
            </a>
          )}
        </div>
      </header>

      {/* The result comes first. A reader who stops after one screen should
          still leave with the numbers, not with a paragraph of setup. */}
      <section className="mt-12 border-y border-line py-8">
        <h2 className="sc kicker">What it produced</h2>
        <StatTiles
          metrics={project.metrics}
          domain={project.domain}
          className="mt-6"
        />
      </section>

      {project.figures && project.figures.length > 0 && (
        <div className="mt-10 flex flex-col gap-8">
          {project.figures.map((f) => (
            <Figure key={f.caption} figure={f} domain={project.domain} />
          ))}
        </div>
      )}

      {project.screenshot ? (
        <div className="mt-10">
          <BrowserFrame
            src={project.screenshot}
            alt={`${project.title}, application screenshot`}
            url={externalHref}
            href={externalHref}
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>
      ) : (
        project.doc && (
          <figure className="mt-10">
            <a
              href={project.doc}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-sm border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              {project.cover ? (
                <Image
                  src={project.cover}
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
        )
      )}

      <section className="mt-12 space-y-12 leading-relaxed">
        <div>
          <h2 className="font-serif text-2xl">Overview</h2>
          <p className="mt-3 text-muted">{project.description}</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl">The problem</h2>
          <p className="mt-3 text-muted">{project.problem}</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl">The approach</h2>
          <p className="mt-3 text-muted">{project.approach}</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl">What it found</h2>
          <ul className="mt-5 space-y-3">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="rounded-sm border border-line bg-card px-5 py-4 leading-relaxed text-muted"
              >
                <span
                  aria-hidden="true"
                  className="mb-3 block h-0.5 w-6 rounded-full"
                  style={{ background: hue }}
                />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl">Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-sm border border-line bg-card px-2.5 py-1 text-xs text-muted"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prev / next */}
      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <Link
          href={`/projects/${prev.slug}`}
          className="group rounded-sm border border-line bg-card p-5 transition-colors hover:border-accent"
        >
          <p className="sc text-muted-2">← Previous</p>
          <p className="mt-2 font-serif text-lg leading-snug transition-colors group-hover:text-accent">
            {prev.title}
          </p>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
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
