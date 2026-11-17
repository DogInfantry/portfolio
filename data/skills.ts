/**
 * Skills as recruiters search for them, each tied to the work that shows it.
 *
 * One list feeds the About cards, the hero keyword line and the Person
 * schema's knowsAbout, so what a reader sees and what a crawler reads match.
 * Proof slugs are checked at build time in app/page.tsx.
 */
export type Skill = { name: string; proof: { slug: string; label: string }[] };
export type SkillGroup = { title: string; skills: Skill[] };

const p = (slug: string, label: string) => ({ slug, label });

const WIDEBODY = p("india-widebody-window", "India's Wide-Body Window");
const FSPULSE = p("india-fs-pulse", "India FS Pulse");
const GROUND = p("datacentre-capacity-audit", "Ground Truth");
const SUN = p("sun-pharma-network-review", "Sun Pharma network review");
const CIPLA = p("cipla-point-of-care-diagnostics", "Cipla diagnostics case");
const MAHA = p("maha-navonmesh-tgc-2026", "Maha Navonmesh");
const INDUSIND = p("indusind-protect", "IndusInd Protect");
const AIRTEL = p("bharti-airtel-initiation", "Bharti Airtel");
const NEPHRO = p("nephroplus-initiation", "NephroPlus");
const MONTHLY = p("india-markets-monthly-oct-2026", "India Markets Monthly");
const ENGINE = p("sellside-research-engine", "Sellside Research Engine");
const OPTIONS = p("regulating-retail-options-boom", "Retail options paper");
const ENSO = p("enso-macro-risk-desk", "ENSO Macro Risk Desk");
const SIGNALS = p("signals-before-storms", "Signals Before Storms");
const UPTAKE = p("awareness-without-uptake", "Awareness Without Uptake");

export const skillGroups: SkillGroup[] = [
  {
    title: "Strategy",
    skills: [
      { name: "Market sizing and market entry", proof: [WIDEBODY] },
      { name: "Industry and value chain economics", proof: [FSPULSE, GROUND, SUN] },
      { name: "Competitive benchmarking", proof: [INDUSIND, GROUND] },
      { name: "Business case development", proof: [CIPLA, MAHA] },
      { name: "Go-to-market strategy", proof: [INDUSIND] },
      { name: "Hypothesis-driven problem solving", proof: [WIDEBODY, SIGNALS] },
    ],
  },
  {
    title: "Finance and valuation",
    skills: [
      { name: "Financial modelling", proof: [CIPLA, AIRTEL] },
      { name: "DCF and reverse DCF valuation", proof: [AIRTEL, ENGINE] },
      { name: "Comparable company analysis", proof: [NEPHRO, AIRTEL] },
      { name: "Scenario and sensitivity analysis", proof: [AIRTEL, MONTHLY, SUN] },
      { name: "Equity research and investment thesis", proof: [AIRTEL, NEPHRO] },
    ],
  },
  {
    title: "Research methods",
    skills: [
      { name: "Causal inference (difference-in-differences)", proof: [OPTIONS, ENSO] },
      { name: "Backtesting", proof: [SIGNALS] },
      { name: "Primary research: surveys and interviews", proof: [UPTAKE, INDUSIND] },
      { name: "Macro and markets analysis", proof: [MONTHLY] },
    ],
  },
];

/** Stated by Anklesh, not inferred from the work. */
export const tools = [
  "Excel",
  "PowerPoint",
  "SQL",
  "Power BI / Tableau",
  "Python",
  "DuckDB",
  "Git",
  "AI tools and LLMs",
];

/** The short line under the hero: the phrases a recruiter types first. */
export const headlineSkills = [
  "Financial modelling",
  "Valuation",
  "Market sizing",
  "Equity research",
  "Competitive analysis",
  "Excel",
  "SQL",
  "Python",
];

/** About skills that cite a given piece, in About order. */
export function skillsFor(slug: string) {
  return skillGroups.flatMap((g) =>
    g.skills.filter((s) => s.proof.some((p) => p.slug === slug)).map((s) => s.name)
  );
}

export const knowsAbout = [
  ...skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
  ...tools,
];
