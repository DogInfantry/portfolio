import { ImageResponse } from "next/og";
import { research } from "@/data/research";
import { site } from "@/data/site";
import { OgCard, OG_SIZE, OG } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Research and publications: working papers, reports and policy work.";

const papers = research.filter((d) => d.publication).length;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        hue={OG.accent}
        kicker="Publications & research"
        title="Research, with the design stated and the results reported either way"
        outcome="Working papers on SSRN, plus longer-form strategy roadmaps, policy proposals and company deep-dives. Every item has a summary page and an open PDF."
        metrics={[
          { value: `${papers}`, label: "working papers on SSRN" },
          { value: `${research.length}`, label: "documents in total" },
        ]}
        host={`${site.url.replace(/^https?:\/\//, "")}/research`}
      />
    ),
    size
  );
}
