import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { getDomain } from "@/data/domains";
import { site } from "@/data/site";
import { OgCard, OG_SIZE, DOMAIN_HEX } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";

/* Required by output: "export". The card is rendered from data/ at build time
   and touches no request-scoped API, so this is a statement of fact rather
   than a workaround. */
export const dynamic = "force-static";

/* A static alt rather than a per item one. generateImageMetadata would give
   each card its own alt text, but it adds a [__metadata_id__] route segment
   that output: "export" cannot statically resolve, which fails the whole
   build. This says what the card contains, which is the part a screen reader
   user needs before deciding whether to open the link. */
export const alt =
  "A social card for this case study: its subject and artefact type, the title, the question it answers, and its headline numbers.";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const type = p.live ? "Dashboard" : p.doc ? "Report" : "Repository";
  return new ImageResponse(
    (
      <OgCard
        hue={DOMAIN_HEX[p.domain]}
        kicker={`${getDomain(p.domain).label} · ${type}`}
        title={p.title}
        outcome={p.tagline}
        metrics={p.metrics}
        host={site.url.replace(/^https?:\/\//, "")}
      />
    ),
    size
  );
}
