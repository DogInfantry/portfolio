import Link from "next/link";
import { groupItems, toIndexRows, work } from "@/data/work";
import WorkRows from "@/components/WorkRows";

/**
 * Both dynamic routes call notFound(), and until now that dropped the reader on
 * the framework default. An old external link to a renamed slug is the likeliest
 * way a stranger reaches a dead URL here, so the page hands them the complete
 * inventory rather than a shrug. The root layout already supplies the nav and
 * the footer; only the body was missing.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <p className="sc kicker">404</p>
      <h1 className="mt-4 font-serif text-display">
        That page has moved, or never existed
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        Nothing lives at this address. Here is everything that does. You can
        also start from{" "}
        <Link href="/" className="lk text-accent">
          the front page
        </Link>{" "}
        or open{" "}
        <Link href="/work" className="lk text-accent">
          the filterable index
        </Link>
        .
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {groupItems(work).map((g) => (
          <div key={g.key}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
              <h2 className="font-serif text-2xl tracking-tight">{g.title}</h2>
              <p className="sc tnum text-muted-2">
                {g.items.length} {g.items.length === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="mt-4">
              <WorkRows rows={toIndexRows(g.items)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
