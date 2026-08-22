import { domainVar, type DomainKey } from "@/data/domains";
import type { FigureDatum } from "@/data/figures";

/**
 * Signed bars around a zero baseline.
 *
 * The other primitives plot magnitudes, which is right when the sign is
 * incidental. Here the sign is the finding: one corridor being the only
 * negative one is the whole reason the recommendation goes the way it does, and
 * a magnitude chart would bury it as just another short bar.
 */
export default function DivergingBars({
  data,
  domain,
  unit = "",
}: {
  data: FigureDatum[];
  domain: DomainKey;
  unit?: string;
}) {
  const values = data.map((d) => d.value);
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const span = max - min || 1;
  const zero = ((0 - min) / span) * 100;

  return (
    <div className="flex flex-col gap-3">
      {data.map((d) => {
        const hue = d.emphasis ? domainVar(domain) : "var(--mark-neutral)";
        const pos = ((d.value - min) / span) * 100;
        const left = Math.min(zero, pos);
        const width = Math.abs(pos - zero);
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
              <span
                aria-hidden="true"
                className="absolute inset-y-[-3px] w-px bg-axis"
                style={{ left: `${zero}%` }}
              />
              <span
                className="absolute inset-y-0"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  background: hue,
                  borderRadius: d.value < 0 ? "4px 0 0 4px" : "0 4px 4px 0",
                }}
              />
            </div>
            <p className="tnum text-[13px] font-semibold text-foreground">
              {value}
            </p>
          </div>
        );
      })}
      <p className="sc mt-1 text-muted-2">
        Zero marks the baseline. Bars left of it are negative.
      </p>
    </div>
  );
}
