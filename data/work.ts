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
  { key: "app", label: "Interactive analysis" },
  { key: "paper", label: "Working paper" },
  { key: "deck", label: "Report" },
  { key: "code", label: "Repository" },
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
  /** what the work concluded, in one sentence, quoted from its first finding */
  answer?: string;
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

/**
 * The first sentence of an item's first finding, as the card's answer line.
 * Findings are written claim first, so the opening sentence is the conclusion;
 * the "The answer:" style lead-ins are dropped because the card already says so.
 */
export function firstSentence(text?: string) {
  if (!text) return undefined;
  const cut = text.indexOf(". ");
  const s = (cut === -1 ? text : text.slice(0, cut + 1)).replace(
    /^The (answer|finding|headline): /,
    ""
  );
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const haystack = (...parts: (string | readonly string[] | undefined)[]) =>
  parts
    .flat()
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

/**
 * The one place a project's format is named. The label says how the work is
 * read, not how it was built: an analysis the reader can click through is an
 * "Interactive analysis", and the Python behind it is listed under Tools on its
 * own page. "Dashboard" on ten items made casework read as software builds.
 */
export function projectTypeLabel(p: { live?: string; doc?: string }) {
  return p.live ? "Interactive analysis" : p.doc ? "Report" : "Repository";
}

const fromProjects: WorkItem[] = projects.map((p) => {
  const type: ArtifactType = p.live ? "app" : p.doc ? "deck" : "code";
  const typeLabel = projectTypeLabel(p);
  const external = p.live
    ? { href: p.live, label: "Live" }
    : p.github
      ? { href: p.github, label: "GitHub" }
      : p.doc
        ? { href: asset(p.doc), label: "PDF" }
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
    answer: firstSentence(p.highlights[0]),
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
  typeLabel: d.publication ? "Working paper" : "Report",
  external: d.publication
    ? { href: d.publication.url, label: "SSRN" }
    : { href: asset(d.file), label: "PDF" },
  metrics: d.metrics ?? [],
  image: d.cover,
  imageKind: "cover",
  meta: `${d.kind} · ${d.pages} pp`,
  answer: firstSentence(d.findings?.[0]),
  search: haystack(
    d.title,
    d.subtitle,
    d.kind,
    getDomain(d.domain).label,
    d.publication ? "Working paper" : "Report",
    d.publication?.keywords,
    d.publication?.jel,
    d.publication?.venue
  ),
}));

export const work: WorkItem[] = [...fromProjects, ...fromResearch];

/**
 * The index is grouped by what a reader is hiring for, not by file format.
 *
 * It used to be "Selected work" and then Dashboards, Reports and Working
 * papers. That sorted by artefact, so a reader could not tell which kind of
 * role the work was for, and every piece carried the same weight. The three
 * lanes below are curated by hand and ordered: the first slug in each is the
 * lane's lead piece, shown large on the home page with its `finding`.
 *
 * The last group has no slugs and takes whatever no lane claimed, so a new item
 * that nobody has placed yet still shows up in the index instead of vanishing.
 */
export type Group = {
  key: string;
  title: string;
  blurb: string;
  /** explicit, ordered membership; a group without it takes the remainder */
  slugs?: string[];
  /** what the lead piece concluded, quoted from that item's own copy */
  finding?: string;
  /** rendered as a plain list rather than cards */
  compact?: boolean;
};

export const groups: Group[] = [
  {
    key: "strategy",
    title: "Strategy cases",
    blurb:
      "Business and public-sector decisions worked from public data: where to deploy a fleet, how a drug maker resets its US network before a tariff, what an insurance commission cap leaves of a distributor, who earns the value in UPI, how much announced data centre capacity exists, and whether a new business line pays back.",
    slugs: [
      "india-widebody-window",
      "sun-pharma-network-review",
      "pb-fintech-commission-caps",
      "maha-navonmesh-tgc-2026",
      "india-fs-pulse",
      "datacentre-capacity-audit",
      "cipla-point-of-care-diagnostics",
    ],
    finding:
      "Compete with the Gulf hubs, do not fly more aircraft to them. Europe first, North America second, Gulf capacity roughly flat.",
  },
  {
    key: "research",
    title: "Investment research",
    blurb:
      "Two equity initiations, each with a rating, a target and the test that would change it, a sample monthly markets note, and a DCF and reverse DCF valuation tool.",
    slugs: [
      "bharti-airtel-initiation",
      "nephroplus-initiation",
      "india-markets-monthly-oct-2026",
      "sellside-research-engine",
    ],
    finding:
      "HOLD, with a 12-month target of Rs 1,946. At Rs 1,833 the market already prices India ARPU growth of 9.5% a year to FY31, against 5.7% in the forecast.",
  },
  {
    key: "papers",
    title: "Working papers and quant studies",
    blurb:
      "Two working papers on SSRN and two quantitative studies. Each states its design up front and reports the result whether or not it supports the hypothesis.",
    slugs: [
      "regulating-retail-options-boom",
      "awareness-without-uptake",
      "enso-macro-risk-desk",
      "signals-before-storms",
    ],
    finding:
      "Index-options notional turnover fell 37–43% below its counterfactual path, premium turnover fell far less, and the smallest retail traders exited hardest.",
  },
  {
    key: "earlier",
    title: "Earlier work",
    blurb: "Older decks and analyses, kept for reference.",
    compact: true,
  },
];

/**
 * Assign every item to the first group that claims it, so a piece of work
 * appears exactly once. Empty groups drop out, which is what keeps a filtered
 * view, or the research-only index, from showing a heading over nothing.
 */
export function groupItems(items: WorkItem[]) {
  const taken = new Set<string>();
  return groups
    .map((g) => {
      const picked = g.slugs
        ? g.slugs
            .map((slug) => items.find((w) => w.slug === slug))
            .filter((w): w is WorkItem => Boolean(w))
        : items.filter((w) => !taken.has(w.slug));
      for (const w of picked) taken.add(w.slug);
      return { ...g, items: picked };
    })
    .filter((g) => g.items.length > 0);
}

/**
 * A case page's one-line answer: the lane's curated finding for a lane lead,
 * otherwise the first sentence of the piece's first finding.
 */
export function answerFor(slug: string, firstFinding?: string) {
  return (
    groups.find((g) => g.slugs?.[0] === slug)?.finding ??
    firstSentence(firstFinding)
  );
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
  /**
   * Cover or screenshot for the row plate.
   *
   * Five reports have real first-page art sitting in public/research/covers and
   * the row tables never showed it, which made a document look like a bare line
   * of text next to a card that had a face. Items with no image get a glyph
   * plate instead, so the column is never a run of empty cells.
   */
  thumb?: string;
  /** covers are contained on the plate, screenshots fill it */
  thumbKind: "screenshot" | "cover" | "figure";
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
    // a row plate is 56px, where a chart is illegible, so a card that plots its
    // figure falls back to the glyph plate here rather than to a tiny exhibit
    thumb: w.image,
    thumbKind: w.imageKind,
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
