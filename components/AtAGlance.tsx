import { skillsFor } from "@/data/skills";

/**
 * The answer first, for a reader who stops after one screen and for answer
 * engines that quote the first plain statement on a page. The conclusion is
 * the first sentence of the piece's first finding, so it says nothing the
 * findings below do not; the skills are the About skills that cite this piece.
 */
export default function AtAGlance({
  slug,
  answer,
  hue,
}: {
  slug: string;
  answer?: string;
  hue: string;
}) {
  const skills = skillsFor(slug);
  if (!answer && skills.length === 0) return null;
  return (
    <dl
      className="mt-6 space-y-4 rounded-md border border-line-strong border-l-[3px] bg-card p-5 shadow-[var(--raise)]"
      style={{ borderLeftColor: hue }}
    >
      {answer && (
        <div>
          <dt className="sc text-muted-2">The answer</dt>
          <dd className="mt-1.5 text-lg leading-relaxed text-foreground">
            {answer}
          </dd>
        </div>
      )}
      {skills.length > 0 && (
        <div>
          <dt className="sc text-muted-2">Skills shown</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-muted">
            {skills.join(" · ")}
          </dd>
        </div>
      )}
    </dl>
  );
}
