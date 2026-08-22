import { domainVar, type DomainKey } from "@/data/domains";
import type { FigureDatum } from "@/data/figures";

/**
 * Horizontal magnitude bars, emphasis-styled: the mark carrying the story wears
 * the domain hue, the rest are neutral context. Plain HTML rather than SVG, so
 * long labels wrap and values never clip at narrow widths.
 *
 * Every bar is directly labelled because these figures run to four marks at
 * most; the "label selectively" rule guards against dense series, not this.
 */
export default function BarSet({
  data,
  domain,
  unit = "",
}: {
  data: FigureDatum[];
  domain: DomainKey;
  unit?: string;
}) {
  const max = Math.max(...data.map((d) => d.range?.[1] ?? d.value));
  const pct = (n: number) => `${(n / max) * 100}%`;

  return (
    <div className="flex flex-col gap-3">
      {data.map((d) => {
        const hue = d.emphasis ? domainVar(domain) : "var(--mark-neutral)";
        const low = d.range ? d.range[0] : d.value;
        const high = d.range ? d.range[1] : d.value;
        const value = d.display ?? `${d.value}${unit}`;
        return (
          <div
            key={d.label}
            className="grid items-center gap-x-3 gap-y-1 sm:grid-cols-[minmax(0,10rem)_1fr_auto]"
          >
            <p className="text-xs leading-snug text-muted sm:text-[13px]">
              {d.label}
            </p>
            <div
              className="relative h-3.5 w-full rounded-[2px] bg-grid"
              title={`${d.label}: ${value}`}
            >
              {/* An interval draws a wash to the high end and a solid arm to the
                  low end, so the bar never asserts a point estimate the source
                  did not give. Without a range the two coincide. */}
              <span
                className="absolute inset-y-0 left-0 rounded-r-[4px] opacity-35"
                style={{
                  width: pct(high),
                  background: hue,
                }}
              />
              <span
                className="absolute inset-y-0 left-0 rounded-r-[4px]"
                style={{
                  width: pct(low),
                  background: hue,
                }}
              />
            </div>
            <p className="tnum text-[13px] font-semibold text-foreground">
              {value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
