import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { work } from "@/data/work";
import { OgCard, OG_SIZE, OG } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "The full work index: live apps, working papers, decks and code.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        hue={OG.accent}
        kicker="The index"
        title="Every piece of work, in one place"
        outcome="Live analytical apps, working papers, strategy decks and open code. Filter by subject or by artefact, or read the whole shelf as one table."
        metrics={[
          { value: `${work.length}`, label: "pieces across nine subjects" },
          { value: `${work.filter((w) => w.type === "app").length}`, label: "of them open as live apps" },
        ]}
        host={`${site.url.replace(/^https?:\/\//, "")}/work`}
      />
    ),
    size
  );
}
