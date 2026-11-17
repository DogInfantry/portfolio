import Image from "next/image";
import Link from "next/link";
import DocCover from "@/components/DocCover";
import Glyph from "@/components/glyphs";
import { asset } from "@/data/asset";
import { domainVar, getDomain } from "@/data/domains";
import type { WorkItem } from "@/data/work";

/**
 * The 16:10 media slot, shared by the card and the lane lead on the home page
 * so a cover is contained and a screenshot fills in both places by one rule.
 */
export function WorkMedia({
  item,
  sizes,
  eager = false,
}: {
  item: WorkItem;
  sizes: string;
  /** the first image on a page should not wait for scroll */
  eager?: boolean;
}) {
  const isCover = item.imageKind === "cover";
  /* An SVG is already resolution independent, so the raster optimizer has
     nothing to do and Next refuses to run it without dangerouslyAllowSVG. That
     flag also loosens remote SVG handling, which is not a trade worth making
     for one local file we authored ourselves. */
  const isVector = item.image?.endsWith(".svg") ?? false;

  if (!item.image) {
    /* A card with no thumbnail reads as an afterthought beside one that has
       it, so a document without cover art gets a typographic stand-in rather
       than an empty slot. */
    return <DocCover title={item.outcome} kind={item.meta} />;
  }

  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden bg-sunken ${
        isCover ? "p-4" : ""
      }`}
    >
      <Image
        src={asset(item.image)}
        alt={
          item.imageKind === "screenshot"
            ? `${item.title}, application screenshot`
            : isCover
              ? `${item.title}, first page`
              : `${item.title}, an exhibit from the analysis`
        }
        fill
        unoptimized={isVector}
        loading={eager ? "eager" : undefined}
        sizes={sizes}
        /* A chart is contained, never cropped. The exhibit is 720x470 against
           a 16:10 slot, so object-cover would take about four per cent off the
           bottom, which is exactly where its axis label sits. Raster
           screenshots still fill, because losing a few pixels of a dashboard
           costs nothing. */
        className={
          isCover || isVector
            ? "object-contain object-top p-2"
            : "object-cover object-top"
        }
      />
    </div>
  );
}

/**
 * One card for every artefact, read as question, answer, number.
 *
 * A recruiter skimming the grid gets three things per piece without opening
 * it: what was asked (`outcome`), what the work concluded (`answer`, or the
 * lane's curated `finding` on a lead card) and one number with its label.
 * Taxonomy sits at the foot as a caption, never above the title.
 *
 * `lead` is the lane's first piece on the home page: same card, bigger type,
 * the lane's finding and two numbers. Every card is a container query
 * box, so once the grid makes it wide (the lead, or a card stretched to close
 * a row) it turns into an image-left layout by itself instead of a stretched
 * portrait card.
 *
 * Covers are contained on a sunken plate so an A4 first page reads as a page;
 * screenshots and figures fill. The whole card is one overlay link; the
 * external link and the subject filter sit above it.
 */
export default function WorkCard({
  item,
  headingLevel = 3,
  lead = false,
  finding,
  eager = false,
}: {
  item: WorkItem;
  headingLevel?: 3 | 4;
  lead?: boolean;
  /** a lane's curated conclusion; replaces the derived answer on a lead */
  finding?: string;
  eager?: boolean;
}) {
  const domain = getDomain(item.domain);
  const hue = domainVar(item.domain);
  const metric = item.metrics[0];
  const answer = finding ?? item.answer;
  const Heading = `h${headingLevel}` as const;
  return (
    <article
      data-slug={item.slug}
      className="@container group relative flex h-full flex-col overflow-hidden rounded-md border border-line-strong bg-card shadow-[var(--raise)] transition-[border-color,box-shadow] hover:border-accent hover:shadow-[var(--shadow-lift)]"
    >
      <span
        aria-hidden="true"
        className="block h-[3px] w-full shrink-0"
        style={{ background: hue }}
      />

      <div className="flex flex-1 flex-col @2xl:grid @2xl:grid-cols-[1.1fr_1fr]">
        <div className="bg-sunken @2xl:flex @2xl:items-center">
          <WorkMedia
            item={item}
            eager={eager}
            sizes={
              lead
                ? "(min-width: 1024px) 600px, 100vw"
                : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
            }
          />
        </div>

        <div className={`flex flex-1 flex-col ${lead ? "p-6 sm:p-8" : "p-6"}`}>
          <Heading
            className={`font-serif leading-snug tracking-tight ${
              lead ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            <Link href={item.href} className="transition-colors hover:text-accent">
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              {item.title}
            </Link>
          </Heading>

          <p
            className={`mt-3 leading-relaxed text-muted ${
              lead ? "" : "text-sm"
            }`}
          >
            {item.outcome}
          </p>

          {answer && (
            <p
              className={`mt-4 border-l-2 pl-3 leading-relaxed text-foreground ${
                lead ? "text-lg" : "text-sm line-clamp-4"
              }`}
              style={{ borderColor: hue }}
            >
              {answer}
            </p>
          )}

          {lead && item.metrics.length > 1 ? (
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
              {item.metrics.slice(0, 2).map((m) => (
                <div key={m.label}>
                  <dd className="tnum text-2xl font-semibold leading-none tracking-tight text-foreground">
                    {m.value}
                  </dd>
                  <dt className="sc mt-2 text-muted-2">{m.label}</dt>
                </div>
              ))}
            </dl>
          ) : metric && (
            <dl className={lead ? "mt-6" : "mt-auto pt-6"}>
              <dd
                className={`tnum font-semibold leading-none tracking-tight text-foreground ${
                  lead ? "text-3xl" : "text-xl"
                }`}
              >
                {metric.value}
              </dd>
              <dt className="sc mt-2 text-muted-2">{metric.label}</dt>
            </dl>
          )}

          <div
            className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-3 ${
              metric ? "mt-5" : "mt-auto"
            }`}
          >
            <p className="sc flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <Link
                href={`/work?domain=${item.domain}`}
                className="relative z-10 flex items-center gap-2 transition-colors hover:text-accent"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: hue }}
                />
                {domain.label}
              </Link>
              <span className="flex items-center gap-1.5 text-muted-2">
                <Glyph type={item.type} className="h-3 w-3" />
                {item.typeLabel}
              </span>
            </p>

            {item.external && (
              <a
                href={item.external.href}
                target="_blank"
                rel="noopener noreferrer"
                className="lk relative z-10 shrink-0 text-sm font-medium text-accent"
              >
                {item.external.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
