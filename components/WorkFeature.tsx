import Link from "next/link";
import Glyph from "@/components/glyphs";
import { WorkMedia } from "@/components/WorkCard";
import { domainVar, getDomain } from "@/data/domains";
import type { WorkItem } from "@/data/work";

/**
 * A lane's lead piece, shown wide.
 *
 * A grid of equal cards gives a reader no place to start. One piece per lane
 * gets room for three things a card has no space for: what was asked, what the
 * work concluded, and one number. The finding is authored on the group in
 * data/work.ts and quoted from the item's own copy, so this component states
 * nothing the case page does not.
 */
export default function WorkFeature({
  item,
  finding,
  eager = false,
}: {
  item: WorkItem;
  finding?: string;
  eager?: boolean;
}) {
  const domain = getDomain(item.domain);
  const hue = domainVar(item.domain);
  const metric = item.metrics[0];

  return (
    <article className="group relative overflow-hidden rounded-md border border-line-strong bg-card shadow-[var(--raise)] transition-colors hover:border-accent">
      <span
        aria-hidden="true"
        className="block h-[3px] w-full"
        style={{ background: hue }}
      />
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        {/* the plate carries the sunken ground to the full row height, so a
            long text column does not leave a white gap under the image */}
        <div className="bg-sunken lg:flex lg:items-center">
          <WorkMedia
            item={item}
            eager={eager}
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <h3 className="font-serif text-2xl leading-tight tracking-tight sm:text-3xl">
            <Link
              href={item.href}
              className="transition-colors hover:text-accent"
            >
              {/* one overlay link for the whole block; the external link below
                  sits above it */}
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              {item.title}
            </Link>
          </h3>

          <p className="mt-3 leading-relaxed text-muted">{item.outcome}</p>

          {finding && (
            <p className="mt-5 text-lg leading-relaxed text-foreground">
              {finding}
            </p>
          )}

          {metric && (
            <dl className="mt-6">
              <dd className="tnum text-2xl font-semibold leading-none tracking-tight text-foreground">
                {metric.value}
              </dd>
              <dt className="sc mt-2 text-muted-2">{metric.label}</dt>
            </dl>
          )}

          {/* pinned to the bottom of the column when the image is taller */}
          <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
            <p className="sc flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: hue }}
                />
                {domain.label}
              </span>
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
                className="lk relative z-10 text-sm font-medium text-accent"
              >
                {item.external.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          </div>
        </div>
      </div>
    </article>
  );
}
