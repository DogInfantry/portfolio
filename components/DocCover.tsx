/**
 * Typographic stand-in for a document thumbnail. Used wherever a research doc
 * has no cover PNG, or a project's artefact is a document rather than a dashboard.
 *
 * It was a full-bleed accent-soft plate, which made the two cards that use it
 * the only saturated teal blocks in a sixteen card grid. On the sunken ground
 * it reads as paper instead, consistent with the six real covers beside it.
 * The 16/10 ratio matches the card's media slot; it was 16/9, which made rows
 * of cards ragged.
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
      className={`flex aspect-[16/10] w-full flex-col justify-between bg-sunken px-6 py-4 sm:py-6 ${className}`}
    >
      <p className="sc text-muted">{kind}</p>
      <div className="border-t border-line pt-3">
        <p className="font-serif text-xl leading-snug tracking-tight text-foreground">
          {title}
        </p>
        {subtitle && (
          <p className="mt-1 font-serif text-small italic leading-snug text-muted">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
