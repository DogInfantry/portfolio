import Link from "next/link";
import WorkCard from "@/components/WorkCard";
import { groupItems, work, type WorkItem } from "@/data/work";

/**
 * The grouped card grid, rendered on the server.
 *
 * Grouping is the point: a flat grid reads as a pile. The groups are the three
 * lanes from data/work.ts, then earlier work as a plain list.
 *
 * This is a server component and it is passed into the client index as
 * children, so the cards and their images never enter the client graph. The
 * client only sets `hidden` on an article, and the empty group rule in
 * globals.css collapses a section once every card in it is hidden.
 */
export default function WorkCards({
  items = work,
  headingLevel = 2,
}: {
  items?: WorkItem[];
  headingLevel?: 2 | 3;
}) {
  const sections = groupItems(items);
  const Heading = `h${headingLevel}` as const;

  return (
    <div className="wi-cards flex flex-col gap-16">
      {sections.map((g) => (
        <section
          key={g.key}
          id={g.key}
          data-group={g.key}
          className="scroll-mt-24"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
            <Heading className="font-serif text-2xl tracking-tight">
              {g.title}
            </Heading>
            <p className="sc tnum text-muted-2" data-group-count>
              {g.items.length} {g.items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {g.blurb}
          </p>
          {g.compact ? (
            /* Earlier work is a list, not a shelf: a title, a line and the
               format. Each row is still an article with data-slug, which is
               all the client index needs to filter and count it. */
            <div className="mt-6 border-t border-line">
              {g.items.map((item) => (
                <article
                  key={item.slug}
                  data-slug={item.slug}
                  className="grid gap-x-6 gap-y-1 border-b border-line py-3 sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <Link
                      href={item.href}
                      className="font-serif text-base leading-snug tracking-tight transition-colors hover:text-accent"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm leading-snug text-muted">
                      {item.outcome}
                    </p>
                  </div>
                  <p className="sc text-muted-2 sm:pt-1 sm:text-right">
                    {item.typeLabel}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((item) => (
                <WorkCard
                  key={item.slug}
                  item={item}
                  headingLevel={headingLevel === 2 ? 3 : 4}
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
