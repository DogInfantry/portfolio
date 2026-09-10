import Image from "next/image";
import Link from "next/link";
import DocCover from "@/components/DocCover";
import { domainVar, getDomain } from "@/data/domains";
import type { WorkItem } from "@/data/work";

/**
 * One card shape for every artefact: live app, paper, deck or repository.
 *
 * Reading order is hue rule, media, title, outcome, one number, caption row.
 * Taxonomy is a caption, not a header: the domain and the artefact type used to
 * sit above the title, which put two lines of small caps between the reader and
 * the thing they came for.
 *
 * Three earlier faults, all measured rather than felt:
 *
 * The media slot and DocCover disagreed on aspect ratio, 16/10 against 16/9, so
 * cards in the same row had different heights. They match now.
 *
 * Six of the sixteen images are portrait A4 first pages, and object-cover
 * cropped them into a landscape box, so a reader saw the top strip of a title
 * page. Covers are contained on a sunken plate now, which reads as a page on a
 * desk. Screenshots and figures are genuinely landscape and still fill.
 *
 * The card carried two metrics in a two-column table, which nobody reads at
 * 320px, and a "Case study" link to the same destination as the overlay that
 * already makes the whole card clickable, which was a second tab stop to one
 * place. One metric, one link, and the affordance text is decorative.
 */
export default function WorkCard({
  item,
  headingLevel = 3,
}: {
  item: WorkItem;
  headingLevel?: 3 | 4;
}) {
  const domain = getDomain(item.domain);
  const hue = domainVar(item.domain);
  const metric = item.metrics[0];
  const Heading = `h${headingLevel}` as const;
  const isCover = item.imageKind === "cover";

  return (
    <article
      data-slug={item.slug}
      className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line-strong bg-card shadow-[var(--raise)] transition-colors hover:border-accent"
    >
      <span
        aria-hidden="true"
        className="block h-[3px] w-full"
        style={{ background: hue }}
      />

      {item.image ? (
        <div
          className={`relative aspect-[16/10] w-full overflow-hidden bg-sunken ${
            isCover ? "p-4" : ""
          }`}
        >
          <Image
            src={item.image}
            alt={
              item.imageKind === "screenshot"
                ? `${item.title}, application screenshot`
                : isCover
                  ? `${item.title}, first page`
                  : `${item.title}, an exhibit from the analysis`
            }
            fill
            sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
            className={
              isCover
                ? "object-contain object-top p-2"
                : "object-cover object-top"
            }
          />
        </div>
      ) : (
        /* A card with no thumbnail reads as an afterthought beside one that has
           it, so a document without cover art gets a typographic stand-in
           rather than an empty slot. */
        <DocCover title={item.outcome} kind={item.meta} />
      )}

      <div className="flex flex-1 flex-col p-6">
        <Heading className="font-serif text-xl leading-snug tracking-tight sm:line-clamp-2">
          <Link href={item.href} className="transition-colors hover:text-accent">
            {/* the whole card is not a link: it holds two destinations, and a
                nested anchor for the second one would be invalid */}
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {item.title}
          </Link>
        </Heading>

        <p className="mt-3 text-sm leading-relaxed text-muted sm:line-clamp-2">
          {item.outcome}
        </p>

        {metric && (
          <dl className="mt-auto pt-6">
            <dd className="tnum text-xl font-semibold leading-none tracking-tight text-foreground">
              {metric.value}
            </dd>
            <dt className="sc mt-2 text-muted-2">{metric.label}</dt>
          </dl>
        )}

        <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-line pt-3">
          <p className="sc flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: hue }}
            />
            <Link
              href={`/work?domain=${item.domain}`}
              className="relative z-10 transition-colors hover:text-accent"
            >
              {domain.label}
            </Link>
            <span aria-hidden="true" className="text-line">
              |
            </span>
            <span className="text-muted-2">{item.typeLabel}</span>
          </p>

          {item.external && (
            <a
              href={item.external.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lk relative z-10 shrink-0 text-sm font-medium text-muted"
            >
              {item.external.label} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
