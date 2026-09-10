import { domainVar, type DomainKey } from "@/data/domains";

/**
 * n-of-m cells per row. At counts this small a waffle reads the ratio faster
 * than a bar does, and it keeps the denominator visible rather than implied.
 */
export default function DotMatrix({
  total,
  rows,
  domain,
}: {
  total: number;
  rows: { label: string; hit: number }[];
  domain: DomainKey;
}) {
  return (
    <div className="flex flex-col gap-4">
      {rows.map((row) => (
        <div key={row.label}>
          <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-small text-muted">
            <span>{row.label}</span>
            <span className="tnum font-semibold text-foreground">
              {row.hit} of {total}
            </span>
          </p>
          <div
            className="mt-2 flex flex-wrap gap-1"
          >
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-[2px]"
                style={{
                  background: i < row.hit ? domainVar(domain) : "var(--grid)",
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
