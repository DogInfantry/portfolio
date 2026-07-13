import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-accent-soft">
        {project.screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-4xl text-accent/40">
              {project.title}
            </span>
          </div>
        )}
        {project.comingSoon && (
          <span className="absolute right-3 top-3 rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium text-white">
            Coming soon
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-xl leading-snug">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{project.tagline}</p>
        {project.stack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-accent"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        {!project.comingSoon && (
          <div className="flex gap-4 pt-1 text-sm font-medium">
            <span className="text-accent">Case study →</span>
            {project.live && <span className="text-muted">Live ↗</span>}
            {!project.live && project.github && (
              <span className="text-muted">GitHub ↗</span>
            )}
          </div>
        )}
      </div>
    </article>
  );

  if (project.comingSoon) return inner;
  return (
    <Link href={`/projects/${project.slug}`} className="h-full">
      {inner}
    </Link>
  );
}
