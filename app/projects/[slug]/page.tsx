import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import BrowserFrame from "@/components/BrowserFrame";

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
  return { title: project.title, description: project.tagline };
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
  const externalHref = project.live ?? project.github;

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
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
              className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Open live app ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              View on GitHub ↗
            </a>
          )}
        </div>
      </header>

      {project.screenshot && (
        <div className="mt-12">
          <BrowserFrame
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            url={externalHref}
            href={externalHref}
          />
        </div>
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
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full bg-accent-soft px-3 py-1 text-sm text-accent"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / next */}
      <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <Link
          href={`/projects/${prev.slug}`}
          className="group rounded-xl border border-line bg-card p-5 transition-colors hover:border-accent"
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
          className="group rounded-xl border border-line bg-card p-5 text-right transition-colors hover:border-accent"
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
