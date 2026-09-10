import { domainVar, type DomainKey } from "@/data/domains";
import type { FigureDatum } from "@/data/figures";

/**
 * Horizontal magnitude bars, emphasis-styled: the mark carrying the story wears
 * the domain hue, the rest are neutral context. Plain HTML rather than SVG, so
 * long labels wrap and values never clip at narrow widths.
 *
 * Every bar is directly labelled because these figures run to four marks at
 * most; the "label selectively" rule guards against dense series, not this.
 *
 * `compact` is the card preview mode used by components/Exhibit.tsx. It drops
 * the label column, because eight labelled rows inside a 320px card are
 * illegible and an illegible label is decoration. The marks and the emphasis
 * rule are unchanged, so the shape a reader sees on the card is the shape they
 * get on the case study.
 */
export default function BarSet({
  data,
  domain,
  unit = "",
  compact = false,
}: {
  data: FigureDatum[];
  domain: DomainKey;
  unit?: string;
  compact?: boolean;
}) {
  const max = Math.max(...data.map((d) => d.range?.[1] ?? d.value));
  const pct = (n: number) => `${(n / max) * 100}%`;

  return (
    <div className={`flex flex-col ${compact ? "gap-1.5" : "gap-3"}`}>
      {data.map((d) => {
        const hue = d.emphasis ? domainVar(domain) : "var(--mark-neutral)";
        const low = d.range ? d.range[0] : d.value;
        const high = d.range ? d.range[1] : d.value;
        const value = d.display ?? `${d.value}${unit}`;
        return (
          <div
            key={d.label}
            className={
              compact
                ? "grid grid-cols-[1fr_auto] items-center gap-x-2"
                : "grid items-center gap-x-3 gap-y-1 sm:grid-cols-[minmax(0,10rem)_1fr_auto]"
            }
          >
            {!compact && (
              <p className="text-small leading-snug text-muted">{d.label}</p>
            )}
            {/* no title attribute: it duplicated the value already printed
                beside the bar, and title is unreachable by keyboard and by
                touch, so it was cost without reach */}
            <div
              className={`relative w-full rounded-[2px] bg-grid ${
                compact ? "h-2.5" : "h-3.5"
              }`}
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
            {/* Weight is the second channel. Emphasis was carried by hue alone,
                which is the one place on this site where colour was load
                bearing: --mark-neutral against a warm domain hue is close for a
                deuteranope and there was nothing else to read. */}
            <p
              className={`tnum text-small ${
                d.emphasis
                  ? "font-semibold text-foreground"
                  : "font-normal text-muted"
              }`}
            >
              {value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
