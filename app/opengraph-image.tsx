import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { work } from "@/data/work";
import { OgCard, OG_SIZE, OG } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${site.name}. ${site.role}.`;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        hue={OG.accent}
        kicker="Investment research · Strategy"
        title="Strategy, finance and research, live and explorable."
        outcome="Market entry cases, payments economics, covenant surveillance and derivatives regulation, published as dashboards you can open and papers you can read."
        metrics={[
          { value: `${work.length}`, label: "pieces of published work" },
          { value: "2", label: "working papers on SSRN" },
        ]}
        host={site.url.replace(/^https?:\/\//, "")}
      />
    ),
    size
  );
}
