import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import BrowserFrame from "@/components/BrowserFrame";
import DocCover from "@/components/DocCover";
import JsonLd from "@/components/JsonLd";

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
    keywords: [project.category, ...project.stack],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": project.live ? "SoftwareApplication" : "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.description,
    about: project.category,
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
        name: "Projects",
        item: `${site.url}/#projects`,
      },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />
      <Link href="/#projects" className="lk text-sm text-muted">
        ← All projects
      </Link>

      <header className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {String(idx + 1).padStart(2, "0")} · {project.category}
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
              className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
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
              className="rounded-sm bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Open the deck ↗
            </a>
          )}
        </div>
      </header>

      {project.screenshot ? (
        <div className="mt-12">
          <BrowserFrame
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            url={externalHref}
            href={externalHref}
          />
        </div>
      ) : (
        project.doc && (
          <a
            href={project.doc}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 block overflow-hidden rounded-sm border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(28,37,48,0.12)]"
          >
            {/* Title is already in the header above, so the card is a call to
                action rather than a repeat of it. */}
            <DocCover
              title="Read the full case deck ↗"
              kind={`${project.category} · ${project.docLabel ?? "Case deck"}`}
            />
          </a>
        )
      )}

      {/* Key metrics */}
      <div className="mt-12 grid grid-cols-3 gap-4 border-y border-line py-8">
        {project.metrics.map((m) => (
          <div key={m.label}>
            <p className="font-serif text-2xl tracking-tight text-accent sm:text-3xl">
              {m.value}
            </p>
            <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">
              {m.label}
            </p>
          </div>
        ))}
      </div>

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
          <h2 className="font-serif text-2xl">Highlights</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-muted">
                <span className="mt-0.5 text-accent">▪</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl">Stack</h2>
          <p className="sc mt-3 leading-relaxed text-muted">
            {project.stack.join(" · ")}
          </p>
        </div>
      </section>

      {/* Prev / next */}
      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <Link
          href={`/projects/${prev.slug}`}
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
          href={`/projects/${next.slug}`}
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
