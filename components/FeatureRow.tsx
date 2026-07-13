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
    <div>
      {/* index rule */}
      <div className="mb-8 flex items-baseline justify-between gap-4 border-t border-line pt-3">
        <p className="sc tnum flex items-center gap-2 text-muted">
          No. {String(index + 1).padStart(2, "0")}
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          <span className="text-accent">{project.category}</span>
        </p>
        <p className="sc tnum hidden text-muted/70 sm:block">{project.fact}</p>
      </div>

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
          <h3 className="font-serif text-2xl leading-snug tracking-tight sm:text-3xl">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{project.tagline}</p>
          <p className="sc mt-5 text-muted/80">{project.stack.join(" · ")}</p>
          <div className="mt-6 flex gap-6 text-sm font-medium">
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
    </div>
  );
}
