"use client";

import Glyph from "@/components/glyphs";
import { domainVar } from "@/data/hue";
import type { DomainKey } from "@/data/domains";
import type { ArtifactType, DomainOption, IndexRow } from "@/data/work";

/**
 * Two rows of chips: subject, then form, each with its count.
 *
 * This replaced a subject-by-form dot matrix. It was compact and honest, but a
 * reader landing on /work had to learn how to read it before it helped, and
 * most never did. A chip says what it filters in plain words and how many
 * pieces are behind it, which is the whole job.
 *
 * Counts come from the search-filtered set with both facets ignored, so the
 * numbers hold still while chips are toggled.
 */

const chip =
  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors";
const on = "border-accent bg-accent-soft text-foreground";
const off = "border-line-strong bg-card text-muted hover:border-accent hover:text-accent";

export default function WorkFacets({
  rows,
  domains,
  types,
  selectedDomains,
  selectedTypes,
  onToggleDomain,
  onToggleType,
}: {
  rows: IndexRow[];
  domains: DomainOption[];
  types: { key: ArtifactType; label: string }[];
  selectedDomains: DomainKey[];
  selectedTypes: ArtifactType[];
  onToggleDomain: (k: DomainKey) => void;
  onToggleType: (k: ArtifactType) => void;
}) {
  return (
    <div className="space-y-3">
      <div role="group" aria-label="Filter by subject" className="flex flex-wrap items-center gap-2">
        <span className="sc mr-1 w-14 text-muted-2">Subject</span>
        {domains.map((d) => {
          const n = rows.filter((r) => r.domain === d.key).length;
          const pressed = selectedDomains.includes(d.key);
          return (
            <button
              key={d.key}
              type="button"
              aria-pressed={pressed}
              disabled={n === 0}
              onClick={() => onToggleDomain(d.key)}
              className={`${chip} ${pressed ? on : off} disabled:opacity-50`}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: domainVar(d.key) }}
              />
              {d.label}
              <span className="tnum text-xs text-muted-2">{n}</span>
            </button>
          );
        })}
      </div>

      {types.length > 1 && (
        <div role="group" aria-label="Filter by form" className="flex flex-wrap items-center gap-2">
          <span className="sc mr-1 w-14 text-muted-2">Form</span>
          {types.map((t) => {
            const n = rows.filter((r) => r.type === t.key).length;
            const pressed = selectedTypes.includes(t.key);
            return (
              <button
                key={t.key}
                type="button"
                aria-pressed={pressed}
                disabled={n === 0}
                onClick={() => onToggleType(t.key)}
                className={`${chip} ${pressed ? on : off} disabled:opacity-50`}
              >
                <Glyph type={t.key} className="h-3.5 w-3.5" />
                {t.label}
                <span className="tnum text-xs text-muted-2">{n}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
