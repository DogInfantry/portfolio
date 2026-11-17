import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { work } from "@/data/work";
import { OgCard, OG_SIZE, OG } from "@/components/OgCard";

export const size = OG_SIZE;
/* Required by output: "export". The card is rendered from data/ at build
   time and touches no request-scoped API, so this is a statement of fact. */
export const dynamic = "force-static";

export const contentType = "image/png";
export const alt =
  "The full work index: strategy cases, investment research, working papers and earlier work.";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        hue={OG.accent}
        kicker="The index"
        title="Every piece of work, in one place"
        outcome="Strategy cases, investment research, working papers and earlier work. Filter by subject or by form, or read it all as one table."
        metrics={[
          { value: `${work.length}`, label: "pieces across nine subjects" },
          { value: `${work.filter((w) => w.type === "app").length}`, label: "open as interactive analyses" },
        ]}
        host={`${site.url.replace(/^https?:\/\//, "")}/work`}
      />
    ),
    size
  );
}
