import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects
    .filter((p) => !p.comingSoon)
    .map((p) => ({ slug: p.slug }));
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
  if (!project || project.comingSoon) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/#projects"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        ← All projects
      </Link>

      <header className="mt-6">
        <h1 className="font-serif text-4xl leading-tight tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{project.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-3">
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
        <a
          href={project.live ?? project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 block overflow-hidden rounded-xl border border-line shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="w-full"
          />
        </a>
      )}

      <section className="mt-12 space-y-10 leading-relaxed">
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
          <ul className="mt-3 space-y-2">
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
    </article>
  );
}
