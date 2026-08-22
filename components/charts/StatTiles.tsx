import type { Metric } from "@/data/projects";
import { domainVar, type DomainKey } from "@/data/domains";

/**
 * A row of headline numbers. A handful of standalone values is a KPI row, not a
 * chart, so there is no plot here on purpose.
 *
 * The value sits in the sans face rather than the site's display serif, and in
 * foreground ink rather than the accent: at these sizes data should read as
 * data, and identity is carried by the coloured rule beside it instead of by
 * colouring the text.
 */
export default function StatTiles({
  metrics,
  domain,
  className = "",
}: {
  metrics: Metric[];
  domain: DomainKey;
  className?: string;
}) {
  return (
    <dl className={`grid gap-x-6 gap-y-7 sm:grid-cols-3 ${className}`}>
      {metrics.map((m) => (
        <div key={m.label}>
          <span
            aria-hidden="true"
            className="block h-0.5 w-8 rounded-full"
            style={{ background: domainVar(domain) }}
          />
          <dd className="mt-3 text-2xl font-semibold leading-none tracking-tight text-foreground sm:text-[28px]">
            {m.value}
          </dd>
          <dt className="mt-2 text-[13px] leading-snug text-muted">
            {m.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
