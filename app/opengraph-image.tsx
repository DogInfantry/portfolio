import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { work } from "@/data/work";
import { OgCard, OG_SIZE, OG } from "@/components/OgCard";

export const size = OG_SIZE;
/* Required by output: "export". The card is rendered from data/ at build
   time and touches no request-scoped API, so this is a statement of fact. */
export const dynamic = "force-static";

export const contentType = "image/png";
export const alt = `${site.name}. ${site.role}.`;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        hue={OG.accent}
        kicker="Strategy · Investment research"
        title="Strategy cases and investment research"
        outcome="Cases on aviation fleet deployment, payments economics and data centre capacity, equity initiations on Bharti Airtel and NephroPlus, and two working papers."
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
