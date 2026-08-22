import type { DomainKey } from "@/data/domains";

/**
 * One plotted mark.
 *
 * `value` is always a non-negative magnitude, because every figure on this site
 * plots a size rather than a signed position. Where the underlying number is a
 * decline, `display` carries the signed string ("-37 to -43%") and the caption
 * says what is being measured. Keeping the sign in the label rather than the
 * geometry avoids a bar that grows downward from an axis nobody drew.
 */
export type FigureDatum = {
  label: string;
  value: number;
  /** interval estimate: the bar fills to range[0], a wash extends to range[1] */
  range?: [number, number];
  /** the one mark the figure is about; everything else renders in neutral gray */
  emphasis?: boolean;
  /** printed value; falls back to the number plus the figure's unit */
  display?: string;
};

/**
 * Every variant requires `caption` and `source`. That is deliberate: no figure
 * on this site can ship without stating what it plots and where the number came
 * from, and the type is what enforces it.
 */
export type Figure =
  | {
      kind: "bars";
      caption: string;
      source: string;
      unit?: string;
      data: FigureDatum[];
    }
  | {
      /**
       * Signed values around a zero baseline. Used where the sign is the
       * finding rather than an incidental property of the number, so plotting
       * magnitudes would hide the point.
       */
      kind: "diverging";
      caption: string;
      source: string;
      unit?: string;
      data: FigureDatum[];
    }
  | {
      kind: "meter";
      caption: string;
      source: string;
      value: number;
      max: number;
      display: string;
      scaleNote: string;
    }
  | {
      kind: "matrix";
      caption: string;
      source: string;
      total: number;
      rows: { label: string; hit: number }[];
    };

export type FigureProps = { figure: Figure; domain: DomainKey };
