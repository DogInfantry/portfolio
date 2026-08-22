import { projects, type Metric } from "./projects";
import { research } from "./research";
import type { DomainKey } from "./domains";

/**
 * Projects and research, flattened into one shape.
 *
 * The two collections were previously presented as separate sections, which
 * made a reader looking for, say, credit work check two places and find the
 * paper in neither. They are different artefacts of the same practice, so the
 * index treats them as one list and lets the artefact type be a filter rather
 * than a page boundary.
 */
export type ArtifactType = "app" | "paper" | "deck" | "code";

export const artifactTypes: { key: ArtifactType; label: string }[] = [
  { key: "app", label: "Live app" },
  { key: "paper", label: "Paper" },
  { key: "deck", label: "Deck" },
  { key: "code", label: "Code" },
];

export type WorkItem = {
  slug: string;
  href: string;
  title: string;
  /** one line on what it does or what it found */
  outcome: string;
  domain: DomainKey;
  type: ArtifactType;
  typeLabel: string;
  /** the artefact itself, off-site */
  external?: { href: string; label: string };
  metrics: Metric[];
  image?: string;
  /** screenshots get browser chrome, document covers are shown plain */
  imageKind: "screenshot" | "cover";
  /** short provenance line under the title */
  meta: string;
};

const fromProjects: WorkItem[] = projects.map((p) => {
  const type: ArtifactType = p.live ? "app" : p.doc ? "deck" : "code";
  const external = p.live
    ? { href: p.live, label: "Live" }
    : p.github
      ? { href: p.github, label: "GitHub" }
      : p.doc
        ? { href: p.doc, label: "Deck" }
        : undefined;
  return {
    slug: p.slug,
    href: `/projects/${p.slug}`,
    title: p.title,
    outcome: p.tagline,
    domain: p.domain,
    type,
    typeLabel: type === "app" ? "Live app" : type === "deck" ? "Deck" : "Code",
    external,
    metrics: p.metrics,
    image: p.screenshot ?? p.cover,
    imageKind: p.screenshot ? "screenshot" : "cover",
    meta: p.fact,
  };
});

const fromResearch: WorkItem[] = research.map((d) => ({
  slug: d.slug,
  href: `/research/${d.slug}`,
  title: d.title,
  outcome: d.subtitle,
  domain: d.domain,
  type: d.publication ? "paper" : "deck",
  typeLabel: d.publication ? "Paper" : "Deck",
  external: d.publication
    ? { href: d.publication.url, label: "SSRN" }
    : { href: d.file, label: "PDF" },
  metrics: d.metrics ?? [],
  image: d.cover,
  imageKind: "cover",
  meta: `${d.kind} · ${d.pages} pp`,
}));

export const work: WorkItem[] = [...fromProjects, ...fromResearch];

/**
 * The index is grouped rather than flat.
 *
 * A single grid of thirteen cards reads as a pile: a recruiter cannot tell a
 * peer-reviewable working paper from a weekend repo without opening both. These
 * groups are the distinction that actually matters to a reader deciding what to
 * spend time on, so they are headings on the page rather than a filter they
 * have to think to apply.
 */
export const groups: {
  key: string;
  title: string;
  blurb: string;
  types: ArtifactType[];
}[] = [
  {
    key: "decks",
    title: "Decks and case studies",
    blurb:
      "Consulting-style work delivered as a document: research, prioritization, and a recommendation someone could act on.",
    types: ["deck"],
  },
  {
    key: "papers",
    title: "Published research",
    blurb:
      "Working papers with an abstract, a stated design, and results that survive being wrong. Hosted on SSRN, open to read.",
    types: ["paper"],
  },
  {
    key: "builds",
    title: "Live apps and code",
    blurb:
      "Analysis published as something you can open and click through, with the repository behind it.",
    types: ["app", "code"],
  },
];

/**
 * The three-item lead. Chosen for range rather than recency, one from each
 * group: a commercial strategy case, a live credit tool reading SEC filings, and
 * a working paper.
 */
export const featuredSlugs = [
  "india-widebody-window",
  "debt-covenant-surveillance",
  "regulating-retail-options-boom",
] as const;

export const featured = featuredSlugs
  .map((slug) => work.find((w) => w.slug === slug))
  .filter((w): w is WorkItem => Boolean(w));

/** Domains that actually have work behind them, in the palette's slot order. */
export function activeDomains(items: WorkItem[] = work) {
  return new Set(items.map((w) => w.domain));
}
