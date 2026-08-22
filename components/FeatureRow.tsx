import Image from "next/image";
import Link from "next/link";
import BrowserFrame from "@/components/BrowserFrame";
import DocCover from "@/components/DocCover";
import { domainVar, getDomain } from "@/data/domains";
import type { WorkItem } from "@/data/work";

/**
 * The large lead treatment, used only for the curated trio on the home page.
 *
 * It takes a WorkItem rather than a Project so a paper can lead the page as
 * easily as an app can; the artefact type only decides how the preview is
 * framed, not whether the item is allowed to be featured.
 */
export default function FeatureRow({
  item,
  index,
}: {
  item: WorkItem;
  index: number;
}) {
  const flip = index % 2 === 1;
  const domain = getDomain(item.domain);
  const hue = domainVar(item.domain);

  return (
    <div>
      {/* index rule */}
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line pt-3">
        <p className="sc tnum flex items-center gap-2 text-muted">
          No. {String(index + 1).padStart(2, "0")}
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: hue }}
          />
          <span>{domain.label}</span>
          <span aria-hidden="true" className="text-line">
            |
          </span>
          <span className="text-muted-2">{item.typeLabel}</span>
        </p>
        <p className="sc tnum hidden text-muted-2 sm:block">{item.meta}</p>
      </div>

      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className={flip ? "md:order-2" : ""}>
          {item.imageKind === "screenshot" && item.image ? (
            <BrowserFrame
              src={item.image}
              alt={`${item.title}, application screenshot`}
              url={item.external?.href}
              href={item.external?.href}
              priority={index === 0}
            />
          ) : item.image ? (
            <a
              href={item.external?.href ?? item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-sm border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <Image
                src={item.image}
                alt={`${item.title}, first page`}
                width={1200}
                height={675}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </a>
          ) : (
            <Link href={item.href} className="block">
              <DocCover title={item.outcome} kind={item.meta} />
            </Link>
          )}
        </div>

        <div className={flip ? "md:order-1" : ""}>
          <h3 className="font-serif text-2xl leading-snug tracking-tight sm:text-3xl">
            <Link
              href={item.href}
              className="transition-colors hover:text-accent"
            >
              {item.title}
            </Link>
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{item.outcome}</p>

          {item.metrics.length > 0 && (
            <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-5">
              {item.metrics.slice(0, 3).map((m) => (
                <div key={m.label}>
                  <dd className="tnum text-xl font-semibold leading-none tracking-tight text-foreground">
                    {m.value}
                  </dd>
                  <dt className="mt-2 text-[11px] leading-snug text-muted-2">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 flex gap-6 text-sm font-medium">
            <Link href={item.href} className="lk text-accent">
              Case study →
            </Link>
            {item.external && (
              <a
                href={item.external.href}
                target="_blank"
                rel="noopener noreferrer"
                className="lk text-muted"
              >
                {item.external.label} ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
