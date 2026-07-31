/**
 * Typographic stand-in for a document thumbnail. Used wherever a research doc
 * has no cover PNG, or a project's artefact is a deck rather than a live app.
 * Matches the 16/9 figure treatment used by the real covers.
 */
export default function DocCover({
  title,
  kind,
  subtitle,
  className = "",
}: {
  title: string;
  kind: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-[16/9] w-full flex-col justify-between bg-accent-soft px-5 py-4 sm:px-7 sm:py-6 ${className}`}
    >
      <p className="sc text-accent">{kind}</p>
      <div className="border-t border-accent/20 pt-3">
        <p className="font-serif text-lg leading-snug tracking-tight text-foreground sm:text-2xl">
          {title}
        </p>
        {subtitle && (
          <p className="mt-1 font-serif text-xs italic leading-snug text-muted sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
