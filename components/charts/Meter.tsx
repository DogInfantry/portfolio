import { domainVar, type DomainKey } from "@/data/domains";

/**
 * A single value against a definitional scale. Used where the copy states one
 * measurement and the scale's bounds come from the statistic itself rather than
 * from a threshold nobody published.
 */
export default function Meter({
  value,
  max,
  display,
  scaleNote,
  domain,
}: {
  value: number;
  max: number;
  display: string;
  scaleNote: string;
  domain: DomainKey;
}) {
  return (
    <div>
      <p className="text-2xl font-semibold tracking-tight text-foreground">
        {display}
      </p>
      <div
        className="mt-3 h-3.5 w-full rounded-[2px] bg-grid"
        title={`${display} of ${max}`}
      >
        <div
          className="h-full rounded-r-[4px]"
          style={{
            width: `${(value / max) * 100}%`,
            background: domainVar(domain),
          }}
        />
      </div>
      <p className="tnum mt-2 flex justify-between text-[11px] text-muted-2">
        <span>0</span>
        <span>{scaleNote}</span>
        <span>{max}</span>
      </p>
    </div>
  );
}
