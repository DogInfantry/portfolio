import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getResearchDoc, research } from "@/data/research";
import { getDomain } from "@/data/domains";
import { site } from "@/data/site";
import { OgCard, OG_SIZE, DOMAIN_HEX } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return research.map((d) => ({ slug: d.slug }));
}

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const d = getResearchDoc(params.slug);
  return [{ id: "card", size, contentType, alt: d ? `${d.title}. ${d.subtitle}` : site.name }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getResearchDoc(slug);
  if (!d) notFound();
  return new ImageResponse(
    (
      <OgCard
        hue={DOMAIN_HEX[d.domain]}
        kicker={`${getDomain(d.domain).label} · ${d.publication ? "Paper" : "Deck"}`}
        title={d.title}
        outcome={d.subtitle}
        metrics={d.metrics ?? [{ value: `${d.pages} pp`, label: d.kind }]}
        host={site.url.replace(/^https?:\/\//, "")}
      />
    ),
    size
  );
}
