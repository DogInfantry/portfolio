import Link from "next/link";
import type { Project } from "@/data/projects";
import BrowserFrame from "@/components/BrowserFrame";

export default function FeatureRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flip = index % 2 === 1;
  const externalHref = project.live ?? project.github;

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div className={flip ? "md:order-2" : ""}>
        {project.screenshot && (
          <BrowserFrame
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            url={externalHref}
            href={externalHref}
          />
        )}
      </div>
      <div className={flip ? "md:order-1" : ""}>
        <p className="flex items-baseline gap-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          <span className="font-mono text-muted/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.category}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-snug tracking-tight sm:text-3xl">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-accent"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-5 flex gap-6 text-sm font-medium">
          <Link href={`/projects/${project.slug}`} className="lk text-accent">
            Case study →
          </Link>
          {externalHref && (
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="lk text-muted"
            >
              {project.live ? "Live ↗" : "GitHub ↗"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
