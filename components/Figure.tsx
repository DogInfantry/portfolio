import BarSet from "@/components/charts/BarSet";
import DivergingBars from "@/components/charts/DivergingBars";
import DotMatrix from "@/components/charts/DotMatrix";
import Meter from "@/components/charts/Meter";
import type { FigureProps } from "@/data/figures";

/**
 * Renders a figure with its caption and its source line.
 *
 * The source line is not decoration. Every number plotted anywhere on this site
 * is one already stated in the project or research copy, and this line says
 * which statement it came from, so a reader can check the chart against the
 * prose without leaving the page.
 */
export default function Figure({ figure, domain }: FigureProps) {
  return (
    <figure className="rounded-md border border-line bg-card px-5 py-6 sm:px-7 sm:py-7">
      {figure.kind === "bars" && (
        <BarSet data={figure.data} domain={domain} unit={figure.unit} />
      )}
      {figure.kind === "diverging" && (
        <DivergingBars data={figure.data} domain={domain} unit={figure.unit} />
      )}
      {figure.kind === "meter" && (
        <Meter
          value={figure.value}
          max={figure.max}
          display={figure.display}
          scaleNote={figure.scaleNote}
          domain={domain}
        />
      )}
      {figure.kind === "matrix" && (
        <DotMatrix total={figure.total} rows={figure.rows} domain={domain} />
      )}
      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="text-small leading-relaxed text-muted">
          {figure.caption}
        </p>
        <p className="sc mt-2 text-muted-2">Source: {figure.source}</p>
      </figcaption>
    </figure>
  );
}
