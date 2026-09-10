import { projects, type Metric } from "./projects";
import { research } from "./research";
import { asset } from "./asset";
import { domains, getDomain, type DomainKey } from "./domains";

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
  /**
   * Lowercased haystack for the index search box. Derived here, never authored.
   *
   * It carries the fields the index does not render: `stack`, and a paper's
   * keywords and JEL codes. That is the whole case for having a search box at
   * all, because browser find already covers every title and outcome on screen,
   * and it does not cover "cvxpy", "SEC EDGAR" or "difference-in-differences",
   * which are exactly what a recruiter or a researcher types.
   *
   * Long prose is excluded on purpose. The retail options abstract alone is
   * 2.4KB, and those matches are already reachable by browser find on the case
   * study page once it is open.
   */
  search: string;
};

const haystack = (...parts: (string | readonly string[] | undefined)[]) =>
  parts
    .flat()
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const fromProjects: WorkItem[] = projects.map((p) => {
  const type: ArtifactType = p.live ? "app" : p.doc ? "deck" : "code";
  const typeLabel =
    type === "app" ? "Live app" : type === "deck" ? "Deck" : "Code";
  const external = p.live
    ? { href: p.live, label: "Live" }
    : p.github
      ? { href: p.github, label: "GitHub" }
      : p.doc
        ? { href: asset(p.doc), label: "Deck" }
        : undefined;
  return {
    slug: p.slug,
    href: `/projects/${p.slug}`,
    title: p.title,
    outcome: p.tagline,
    domain: p.domain,
    type,
    typeLabel,
    external,
    metrics: p.metrics,
    image: p.thumbnail ?? p.screenshot ?? p.cover,
    imageKind: p.thumbnail ? "figure" : p.screenshot ? "screenshot" : "cover",
    meta: p.fact,
    search: haystack(
      p.title,
      p.tagline,
      p.fact,
      getDomain(p.domain).label,
      typeLabel,
      p.stack
    ),
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
    : { href: asset(d.file), label: "PDF" },
  metrics: d.metrics ?? [],
  image: d.cover,
  imageKind: "cover",
  meta: `${d.kind} · ${d.pages} pp`,
  search: haystack(
    d.title,
    d.subtitle,
    d.kind,
    getDomain(d.domain).label,
    d.publication ? "Paper" : "Deck",
    d.publication?.keywords,
    d.publication?.jel,
    d.publication?.venue
  ),
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

export function isArtifactType(v: string | null): v is ArtifactType {
  return artifactTypes.some((t) => t.key === v);
}

/**
 * The slim view model that crosses the server to client boundary.
 *
 * WorkIndex used to `import { work }` at module scope, which dragged
 * data/projects.ts and data/research.ts into the client chunk: roughly 50KB of
 * descriptions, approaches, highlights and abstracts that the index never
 * renders, none of it tree shakeable because the arrays are consumed whole.
 *
 * The index needs the fields below and nothing else, so the server component
 * computes them and passes them down. About 5KB raw across sixteen items, and
 * the two data modules leave the client graph entirely. The cards themselves
 * stay server rendered; the client only decides which of them are hidden.
 */
export type IndexRow = {
  slug: string;
  href: string;
  title: string;
  outcome: string;
  domain: DomainKey;
  domainLabel: string;
  type: ArtifactType;
  typeLabel: string;
  /** the single strongest number, or null where the work states only counts */
  evidence: Metric | null;
  meta: string;
  external?: { href: string; label: string };
  search: string;
};

export function toIndexRows(items: WorkItem[] = work): IndexRow[] {
  return items.map((w) => ({
    slug: w.slug,
    href: w.href,
    title: w.title,
    outcome: w.outcome,
    domain: w.domain,
    domainLabel: getDomain(w.domain).label,
    type: w.type,
    typeLabel: w.typeLabel,
    evidence: w.metrics[0] ?? null,
    meta: w.meta,
    external: w.external,
    search: w.search,
  }));
}

/** Labels only. Keeps data/domains.ts out of the client graph too. */
export type DomainOption = { key: DomainKey; label: string };

/**
 * Everything the client index needs, computed on the server.
 *
 * Facet values with nothing behind them are dropped rather than rendered
 * disabled, because the taxonomy has nine subjects and four artefact types
 * while `code` currently has zero members: `fromProjects` only emits it when a
 * project has neither a live URL nor a document, and every project has one. A
 * type column with no items in it is a dead control, not a fuller picture.
 */
export function indexProps(items: WorkItem[] = work) {
  const presentDomains = new Set(items.map((w) => w.domain));
  const presentTypes = new Set(items.map((w) => w.type));
  return {
    rows: toIndexRows(items),
    domains: domains
      .filter((d) => presentDomains.has(d.key))
      .map((d) => ({ key: d.key, label: d.label })) as DomainOption[],
    types: artifactTypes.filter((t) => presentTypes.has(t.key)),
  };
}
