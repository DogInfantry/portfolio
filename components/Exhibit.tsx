import BarSet from "@/components/charts/BarSet";
import DivergingBars from "@/components/charts/DivergingBars";
import DotMatrix from "@/components/charts/DotMatrix";
import Meter from "@/components/charts/Meter";
import type { FigureProps } from "@/data/figures";

/**
 * A card sized preview of a piece of work's own figure.
 *
 * Three of the selected cards used to carry a dark map each: a world map with
 * flight arcs, an India choropleth, and a dashboard that also contained a world
 * map. Three different pieces of analysis, one picture. A card that plots the
 * actual finding cannot collide with another card, because the findings do not
 * have the same shape.
 *
 * This is the same figure the case study renders, through the same primitives
 * in components/charts, so nothing is invented and check-figures already holds
 * every plotted number to a statement in the copy. It differs from
 * components/Figure.tsx only in chrome: no caption and no source line, because
 * at card width a caption is unreadable and the card's outcome line already
 * says what the work found.
 *
 * Density guard. Above six marks the per-row labels are dropped and only the
 * shape and the emphasised value remain. Eight labelled rows inside a 320px
 * card are illegible, and an illegible label is decoration. The fully labelled
 * version is one click away, which is the point of an index card.
 *
 * The whole thing is aria-hidden. A screen reader gets the title, the outcome
 * and the metric, which is more than it would get from a chart with no axis.
 */

function marks(figure: FigureProps["figure"]) {
  switch (figure.kind) {
    case "bars":
    case "diverging":
      return figure.data.length;
    case "matrix":
      return figure.rows.length;
    default:
      return 1;
  }
}

export default function Exhibit({ figure, domain }: FigureProps) {
  const dense = marks(figure) > 6;

  return (
    <div
      aria-hidden="true"
      className={`flex aspect-[16/10] w-full flex-col justify-center overflow-hidden bg-sunken px-5 ${
        dense ? "py-4" : "py-5"
      }`}
    >
      {/* `compact` collapses the label column and tightens the row rhythm; the
          primitives keep their marks and their emphasis rule either way. */}
      {figure.kind === "bars" && (
        <BarSet
          data={figure.data}
          domain={domain}
          unit={figure.unit}
          compact={dense}
        />
      )}
      {figure.kind === "diverging" && (
        <DivergingBars
          data={figure.data}
          domain={domain}
          unit={figure.unit}
          compact={dense}
        />
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
    </div>
  );
}
