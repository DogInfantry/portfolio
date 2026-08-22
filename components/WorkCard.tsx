import Image from "next/image";
import Link from "next/link";
import DocCover from "@/components/DocCover";
import { domainVar, getDomain } from "@/data/domains";
import type { WorkItem } from "@/data/work";

/**
 * One card shape for every artefact: live app, paper, deck or repository.
 *
 * The card carries numbers because the index is where a reader decides what to
 * open, and a title plus a tagline gives them nothing to decide on.
 */
export default function WorkCard({ item }: { item: WorkItem }) {
  const domain = getDomain(item.domain);
  const hue = domainVar(item.domain);
  const shown = item.metrics.slice(0, 2);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-card transition-colors hover:border-accent/50">
      <span
        aria-hidden="true"
        className="block h-[3px] w-full"
        style={{ background: hue }}
      />

      {item.image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-frame-chrome">
          <Image
            src={item.image}
            alt={
              item.imageKind === "screenshot"
                ? `${item.title}, application screenshot`
                : `${item.title}, first page`
            }
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        /* A card with no thumbnail reads as an afterthought beside one that has
           it, so a document without cover art gets a typographic stand-in
           rather than an empty slot. */
        <DocCover title={item.outcome} kind={item.meta} />
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="sc flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: hue }}
          />
          <span>{domain.label}</span>
          <span aria-hidden="true" className="text-line">
            |
          </span>
          <span className="text-muted-2">{item.typeLabel}</span>
        </p>

        <h3 className="mt-2 font-serif text-xl leading-snug tracking-tight">
          <Link href={item.href} className="transition-colors hover:text-accent">
            {/* the whole card is not a link: it holds two destinations, and a
                nested anchor for the second one would be invalid */}
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {item.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted">{item.outcome}</p>

        {shown.length > 0 && (
          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4">
            {shown.map((m) => (
              <div key={m.label}>
                <dd className="tnum text-lg font-semibold leading-none tracking-tight text-foreground">
                  {m.value}
                </dd>
                <dt className="mt-1.5 text-[11px] leading-snug text-muted-2">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap gap-5 pt-1 text-sm font-medium">
          <Link href={item.href} className="lk relative z-10 text-accent">
            Case study →
          </Link>
          {item.external && (
            <a
              href={item.external.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lk relative z-10 text-muted"
            >
              {item.external.label} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
