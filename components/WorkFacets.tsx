"use client";

import Glyph from "@/components/glyphs";
import { domainVar } from "@/data/hue";
import type { DomainKey } from "@/data/domains";
import type { ArtifactType, DomainOption, IndexRow } from "@/data/work";

/**
 * Subjects down the side, forms across the top, one dot per item in the
 * subject's own hue.
 *
 * This is the filter control and the portfolio overview at the same time, which
 * is the only reason it earns its place. A standalone chart of "sixteen items
 * by subject" sitting above an unchanged chip row would be decoration; a chart
 * that is also the navigation is not. It replaces a control that had to exist
 * anyway: nine subject chips plus three form chips is fourteen wrapping targets
 * and about four rows of chrome at 375px, where this is nine rows at every
 * width, adds no tab stops because the row headers are the chips, and shows
 * counts, which chips never do.
 *
 * It also cannot flatter. Thirteen of the twenty seven cells are empty and
 * visibly so, which is the honest shape of the practice.
 *
 * Cells are not interactive on purpose. A cell is an AND coordinate, so two
 * selected cells would mean (credit AND app) OR (macro AND paper), which the
 * flat facet model cannot express, and it would put fourteen tab stops in front
 * of the results for capability the row and column headers already give.
 * Headers filter, cells inform.
 *
 * Counts are computed from the query filtered set with both facets ignored, so
 * the map holds still while you filter and the selected region is highlighted
 * instead. Excluding a facet's own selection is correct at scale and
 * disorienting at sixteen items, where the whole map is on screen at once.
 */

export default function WorkFacets({
  rows,
  domains,
  types,
  selectedDomains,
  selectedTypes,
  showCounts,
  onToggleDomain,
  onToggleType,
}: {
  rows: IndexRow[];
  domains: DomainOption[];
  types: { key: ArtifactType; label: string }[];
  selectedDomains: DomainKey[];
  selectedTypes: ArtifactType[];
  showCounts: boolean;
  onToggleDomain: (k: DomainKey) => void;
  onToggleType: (k: ArtifactType) => void;
}) {
  const count = (d: DomainKey, t?: ArtifactType) =>
    rows.filter((r) => r.domain === d && (!t || r.type === t)).length;

  return (
    /* Not a <details>. A closed one cannot be forced open by CSS in Chrome:
       the user agent skips its contents for layout, so an author rule that sets
       the body to display:block leaves it painting into a zero height parent.
       Below sm the same markup degrades to a wrapping chip row through the
       .facet rules in globals.css, which needs no state and no JavaScript. */
    <div className="facet">
      {/* capped, because at full page width the row label and its dots end up
          a third of a screen apart and the reader has to track across */}
      <table className="w-full max-w-2xl border-collapse text-left">
        <caption className="vh">
          Work by subject and form. Use the subject and form headers to filter;
          the cells show how many items are in each combination.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="sc pb-2 pr-3 font-medium text-muted-2">
              Subject
            </th>
            {showCounts &&
              types.map((t) => (
                <th
                  key={t.key}
                  scope="col"
                  className="sc pb-2 pl-3 text-center font-medium"
                >
                  <button
                    type="button"
                    onClick={() => onToggleType(t.key)}
                    aria-pressed={selectedTypes.includes(t.key)}
                    className={`rounded-sm px-2 py-1 transition-colors ${
                      selectedTypes.includes(t.key)
                        ? "bg-accent-soft text-accent"
                        : "text-muted-2 hover:text-accent"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Glyph type={t.key} className="h-3 w-3" />
                      {t.label}
                    </span>
                  </button>
                </th>
              ))}
            {showCounts && (
              <th
                scope="col"
                className="sc pb-2 pl-3 text-right font-medium text-muted-2"
              >
                All
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {domains.map((d) => {
            const total = count(d.key);
            const on = selectedDomains.includes(d.key);
            return (
              <tr
                key={d.key}
                className={`border-t border-line ${on ? "bg-accent-soft" : ""}`}
              >
                <th scope="row" className="py-1 pr-3 font-normal">
                  <button
                    type="button"
                    onClick={() => onToggleDomain(d.key)}
                    aria-pressed={on}
                    disabled={total === 0}
                    className={`sc flex w-full items-center gap-2 rounded-sm py-1.5 text-left transition-colors ${
                      total === 0
                        ? "cursor-default text-muted-2 opacity-60"
                        : on
                          ? "text-foreground"
                          : "text-muted hover:text-accent"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: domainVar(d.key) }}
                    />
                    {d.label}
                  </button>
                </th>

                {showCounts &&
                  types.map((t) => {
                    const n = count(d.key, t.key);
                    return (
                      <td key={t.key} className="py-1 pl-3 text-center">
                        {/* numerals below sm so four narrow columns fit
                              375px without a horizontal scrollbar */}
                        <span className="tnum text-xs text-muted-2 sm:hidden">
                          {n || "·"}
                        </span>
                        <span className="hidden justify-center gap-1 sm:inline-flex">
                          {n === 0 ? (
                            /* a hairline, not a hollow ring: a ring reads as
                                 an item that is somehow switched off */
                            <span className="h-px w-2 self-center bg-line" />
                          ) : (
                            Array.from({ length: n }, (_, i) => (
                              <span
                                key={i}
                                className="h-2 w-2 rounded-full"
                                style={{ background: domainVar(d.key) }}
                              />
                            ))
                          )}
                        </span>
                      </td>
                    );
                  })}

                {showCounts && (
                  <td className="tnum py-1 pl-3 text-right text-xs text-muted-2">
                    {total}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
