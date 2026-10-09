import Image from "next/image";
import Link from "next/link";
import Glyph from "@/components/glyphs";
import { asset } from "@/data/asset";
import { domainVar } from "@/data/hue";
import type { IndexRow } from "@/data/work";

/**
 * The whole body of work as a table.
 *
 * Sixteen rows is the entire portfolio on one screen, which a card grid never
 * gives you: an analyst reading a grid of sixteen cards is reading a pile. This
 * is the flat mode, and the card grid stays the editorial one.
 *
 * One component serves two jobs. With `onSort` it renders sortable headers and
 * lives inside the client index. Without it, it is a plain server rendered
 * table, which is what the home page and the 404 page use. That is why the sort
 * affordance is an optional callback rather than a boolean flag: absence means
 * static, and there is nothing to configure.
 *
 * Evidence is deliberately not sortable. `metrics[].value` is a formatted
 * display string with mixed units ("₹65,100Cr", "63.9% / 23.0%", "11 of 11"),
 * so it displays honestly and does not order at all.
 */

export type SortKey = "featured" | "title" | "domain" | "type";
export type Dir = "asc" | "desc";

const SORTABLE: { key: SortKey; label: string }[] = [
  { key: "title", label: "Work" },
  { key: "domain", label: "Subject" },
  { key: "type", label: "Form" },
];

function HeadCell({
  col,
  className,
  sort,
  dir,
  onSort,
}: {
  col: SortKey;
  className?: string;
  sort?: SortKey;
  dir?: Dir;
  onSort?: (k: SortKey) => void;
}) {
  const label = SORTABLE.find((s) => s.key === col)!.label;
  const active = sort === col;
  return (
    <th
      scope="col"
      aria-sort={
        active ? (dir === "desc" ? "descending" : "ascending") : "none"
      }
      className={`sc border-b border-line pb-3 pr-4 text-left font-medium text-muted-2 ${className ?? ""}`}
    >
      {onSort ? (
        <button
          type="button"
          onClick={() => onSort(col)}
          className="inline-flex items-center gap-1 transition-colors hover:text-accent"
        >
          {label}
          <span aria-hidden="true" className={active ? "" : "opacity-0"}>
            {dir === "desc" ? "↓" : "↑"}
          </span>
        </button>
      ) : (
        label
      )}
    </th>
  );
}

export default function WorkRows({
  rows,
  sort,
  dir,
  onSort,
  quietHead = false,
}: {
  rows: IndexRow[];
  sort?: SortKey;
  dir?: Dir;
  onSort?: (k: SortKey) => void;
  /** stacked tables share one visible header row; the rest keep theirs for
      screen readers only, so the same four labels do not repeat down the page */
  quietHead?: boolean;
}) {
  return (
    /* wide content scrolls inside its own container; the page body never does */
    <div className="overflow-x-auto">
      {/* The minimum width applies from sm up. Below it the table used to stay
          544px wide inside a 335px phone column, clipping titles and pushing
          the number and the link off screen. On a phone a row is the title,
          the outcome and the number, and nothing else. */}
      <table className="w-full border-collapse text-left sm:min-w-[34rem]">
        <caption className="vh">
          Every piece of work, with its subject, form and headline number.
        </caption>
        <thead className={quietHead ? "vh" : undefined}>
          <tr>
            <th scope="col" className="hidden border-b border-line pb-3 pr-4 sm:table-cell">
              <span className="vh">Cover</span>
            </th>
            <HeadCell col="title" sort={sort} dir={dir} onSort={onSort} />
            <HeadCell
              col="domain"
              className="hidden sm:table-cell"
              sort={sort}
              dir={dir}
              onSort={onSort}
            />
            <HeadCell
              col="type"
              className="hidden sm:table-cell"
              sort={sort}
              dir={dir}
              onSort={onSort}
            />
            <th
              scope="col"
              className="sc hidden border-b border-line pb-3 pr-4 text-left font-medium text-muted-2 md:table-cell"
            >
              Evidence
            </th>
            <th scope="col" className="border-b border-line pb-3">
              <span className="vh">Open</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.slug}
              className="group border-b border-line transition-colors hover:bg-row-hover"
            >
              {/* The plate is the row's face. Covers are contained so a
                  document reads as a page, screenshots fill so a dashboard
                  reads as a screen, and an item with neither gets its artefact
                  glyph over the domain hue rather than an empty cell. Hidden
                  below sm, where the row already carries four things. */}
              <td
                className="hidden border-l-[3px] py-3 pl-4 pr-4 align-top sm:table-cell"
                style={{ borderLeftColor: domainVar(r.domain) }}
              >
                <span className="flex h-[70px] w-28 items-center justify-center overflow-hidden rounded-[2px] bg-sunken">
                  {r.thumb ? (
                    <Image
                      src={asset(r.thumb)}
                      alt=""
                      width={224}
                      height={140}
                      sizes="112px"
                      /* see the note in WorkCard: a vector needs no optimizer,
                         and enabling SVG there would loosen remote handling */
                      unoptimized={r.thumb.endsWith(".svg")}
                      className={
                        r.thumbKind === "cover"
                          ? "h-full w-full object-contain p-1"
                          : "h-full w-full object-cover object-top"
                      }
                    />
                  ) : (
                    /* the hue repeats the row's left rule and the Subject
                       cell, so it is never the only carrier of meaning */
                    <span style={{ color: domainVar(r.domain) }}>
                      <Glyph type={r.type} className="h-6 w-6" />
                    </span>
                  )}
                </span>
              </td>
              {/* the domain rule moves onto the plate at sm and above, so it
                  lives here for the narrow layout where the plate is hidden */}
              <th
                scope="row"
                className="border-l-[3px] py-3 pl-4 pr-4 text-left align-top font-normal sm:border-l-0 sm:pl-0"
                style={{ borderLeftColor: domainVar(r.domain) }}
              >
                <Link
                  href={r.href}
                  className="font-serif text-base leading-snug tracking-tight transition-colors group-hover:text-accent"
                >
                  {r.title}
                </Link>
                <span className="mt-1 block text-sm leading-snug text-muted">
                  {r.outcome}
                </span>
                {/* the Evidence column only exists from md up */}
                {r.evidence && (
                  <span className="tnum mt-2 block text-sm font-semibold text-foreground md:hidden">
                    {r.evidence.value}
                  </span>
                )}
              </th>
              <td className="sc hidden py-3 pr-4 align-top text-muted sm:table-cell">
                {r.domainLabel}
              </td>
              <td className="sc hidden py-3 pr-4 align-top text-muted-2 sm:table-cell">
                {r.typeLabel}
              </td>
              <td className="hidden py-3 pr-4 align-top md:table-cell">
                {r.evidence ? (
                  <>
                    <span className="tnum block text-base font-semibold leading-none tracking-tight text-foreground">
                      {r.evidence.value}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-muted-2">
                      {r.evidence.label}
                    </span>
                  </>
                ) : (
                  /* eurusd-currency-analysis states only counts, so it gets its
                     provenance line rather than an empty cell */
                  <span className="text-xs text-muted-2">{r.meta}</span>
                )}
              </td>
              {/* One link per row. The title already opens the case page, so a
                  second "Case study" link to the same place was a duplicate tab
                  stop, and the wrong word for a report. */}
              <td className="whitespace-nowrap py-3 text-right align-top text-sm">
                {r.external && (
                  <a
                    href={r.external.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lk font-medium text-accent"
                  >
                    {r.external.label} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
