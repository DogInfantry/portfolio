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
  /** screenshots get browser chrome; covers and figures are shown plain */
  imageKind: "screenshot" | "cover" | "figure";
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
    image: p.thumbnail ?? p.screenshot ?? p.cover,
    imageKind: p.thumbnail ? "figure" : p.screenshot ? "screenshot" : "cover",
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
 * The index is grouped and ordered, not flat.
 *
 * A single grid of sixteen cards reads as a pile: a reader cannot tell a
 * working paper from a weekend repo without opening both. The first group is
 * curated by hand because "what should someone look at first" is an editorial
 * judgement and not a property of the artefact. The rest fall out by what the
 * artefact is.
 */
export type Group = {
  key: string;
  title: string;
  blurb: string;
  /** explicit, ordered membership; wins over `types` */
  slugs?: string[];
  types?: ArtifactType[];
};

export const groups: Group[] = [
  {
    key: "selected",
    title: "Selected work",
    blurb:
      "Start here. Two commercial strategy cases, a causal-testing commodity desk, a product case study, and a quant study published as a negative result.",
    slugs: [
      "india-widebody-window",
      "india-fs-pulse",
      "enso-macro-risk-desk",
      "indusind-protect",
      "signals-before-storms",
    ],
  },
  {
    key: "papers",
    title: "Working papers",
    blurb:
      "Research on SSRN, each with an abstract, a stated design, and results reported whether or not they flatter the hypothesis.",
    types: ["paper"],
  },
  {
    key: "builds",
    title: "Live apps and code",
    blurb:
      "Analysis published as something you can open and click through, with the repository behind it.",
    types: ["app", "code"],
  },
  {
    key: "documents",
    title: "Reports and decks",
    blurb:
      "Longer-form strategy and policy work delivered as a document. Each one opens as a PDF.",
    types: ["deck"],
  },
];

/**
 * Assign every item to the first group that claims it, so a piece of work
 * appears exactly once no matter how many groups could hold it. Empty groups
 * drop out, which is what keeps a filtered view from showing a heading over
 * nothing.
 */
export function groupItems(items: WorkItem[]) {
  const taken = new Set<string>();
  return groups
    .map((g) => {
      const picked = g.slugs
        ? g.slugs
            .map((slug) => items.find((w) => w.slug === slug))
            .filter((w): w is WorkItem => Boolean(w))
        : items.filter(
            (w) => !taken.has(w.slug) && (g.types?.includes(w.type) ?? false)
          );
      for (const w of picked) taken.add(w.slug);
      return { ...g, items: picked };
    })
    .filter((g) => g.items.length > 0);
}

/** Domains that actually have work behind them, in the palette's slot order. */
export function activeDomains(items: WorkItem[] = work) {
  return new Set(items.map((w) => w.domain));
}
