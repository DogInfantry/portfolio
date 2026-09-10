import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { getDomain } from "@/data/domains";
import { site } from "@/data/site";
import { OgCard, OG_SIZE, DOMAIN_HEX } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* alt is a static export and cannot read params, so the per item text comes
   through generateImageMetadata instead. A shared link is often the only thing
   a screen reader user gets before deciding to open the page. */
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  return [{ id: "card", size, contentType, alt: p ? `${p.title}. ${p.tagline}` : site.name }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const type = p.live ? "Live app" : p.doc ? "Deck" : "Code";
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
