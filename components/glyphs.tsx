import type { ArtifactType } from "@/data/work";

/**
 * One mark per artefact type, so a reader can tell a dashboard from a document
 * without reading the label.
 *
 * Inline SVG on currentColor, drawn here rather than pulled from a set. Eight
 * glyphs do not justify a dependency, and the alternative that was considered
 * and rejected earlier, stock illustration, would put generic artwork next to
 * an SSRN paper on derivatives regulation.
 *
 * These are always redundant: the artefact label sits beside them in words
 * everywhere they appear. That is why they are aria-hidden. A glyph that is the
 * only carrier of meaning would be a defect, not a decoration.
 */

const PATHS: Record<ArtifactType, React.ReactNode> = {
  // a screen with a plotted line: something you open and interrogate
  app: (
    <>
      <rect x="1.5" y="2.5" width="13" height="9" rx="1.2" />
      <path d="M4 9l2.5-2.5L9 8l3-3.5" />
      <path d="M6 14h4" />
    </>
  ),
  // a ruled page: something you read
  paper: (
    <>
      <path d="M3.5 1.5h6L12.5 4.5v10h-9z" />
      <path d="M9.5 1.5v3h3" />
      <path d="M5.5 8h5M5.5 11h5" />
    </>
  ),
  // stacked pages: a longer document behind a cover
  deck: (
    <>
      <rect x="1.5" y="3.5" width="9" height="11" rx="1" />
      <path d="M4.5 3.5v-2h9v11h-2" />
      <path d="M4 7.5h4M4 10.5h4" />
    </>
  ),
  // a branch: source you can check line by line
  code: (
    <>
      <circle cx="4.5" cy="3.5" r="2" />
      <circle cx="4.5" cy="12.5" r="2" />
      <circle cx="11.5" cy="6" r="2" />
      <path d="M4.5 5.5v5M9.5 7.2c0 2-5 1.3-5 3.3" />
    </>
  ),
};

export default function Glyph({
  type,
  className = "h-3.5 w-3.5",
}: {
  type: ArtifactType;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[type]}
    </svg>
  );
}
