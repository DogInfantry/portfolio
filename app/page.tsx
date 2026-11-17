import Link from "next/link";
import { site } from "@/data/site";
import { groupItems, toIndexRows, work } from "@/data/work";
import WorkFeature from "@/components/WorkFeature";
import WorkRows from "@/components/WorkRows";

/**
 * Home is three lanes, each with one lead piece and a short list under it.
 *
 * It used to show six "selected" cards and then every other piece in three
 * tables sorted by file format. A reader could not tell which kind of role the
 * work was for, nor what to open first, and twenty-two pieces at equal weight
 * read as a pile. Now the first screen offers three doors, each lane leads with
 * one piece stated as question, conclusion and number, and the older work lives
 * at the end of /work.
 */
const all = groupItems(work);
const lanes = all.filter((g) => !g.compact);
const earlier = all.find((g) => g.compact);
const featured = lanes.reduce((n, g) => n + g.items.length, 0);

/**
 * About is evidence, not adjectives.
 *
 * It used to be four grey paragraphs that restated the lanes above, beside
 * three comma lists of skills nobody could check. Every claim below now names
 * the piece that shows it. A slug that does not exist fails the build in `ref`,
 * so a renamed or removed piece cannot leave a dead claim behind.
 */
const bySlug = new Map(work.map((w) => [w.slug, w]));
function ref(slug: string, label: string) {
  const item = bySlug.get(slug);
  if (!item) throw new Error(`About links to unknown work: ${slug}`);
  return { href: item.href, label };
}

const AIRTEL = ref("bharti-airtel-initiation", "Bharti Airtel initiation");
const NEPHRO = ref("nephroplus-initiation", "NephroPlus initiation");
const WIDEBODY = ref("india-widebody-window", "India's Wide-Body Window");
const FSPULSE = ref("india-fs-pulse", "India FS Pulse");
const GROUND = ref("datacentre-capacity-audit", "Ground Truth");
const SIGNALS = ref("signals-before-storms", "Signals Before Storms");

const practices = [
  {
    title: "The test is stated before the result",
    text: "Both equity initiations print the rule that would change the rating. For Bharti Airtel it is the Jio Platforms price band: a midpoint above US$147 bn makes it a BUY.",
    refs: [AIRTEL, NEPHRO],
  },
  {
    title: "Results against the hypothesis are published",
    text: "In the regime-switching study the model worked and the strategy did not. The aviation case began with the opposite recommendation and records the reversal in a pivot log.",
    refs: [SIGNALS, WIDEBODY],
  },
  {
    title: "Each number has a source",
    text: "The payments case traces every figure to a committed dataset. The data centre audit cites each company figure by printed page, and its build fails if a published claim stops being true.",
    refs: [FSPULSE, GROUND],
  },
];

const skills = [
  {
    skill: "Market sizing and market entry",
    detail:
      "Demand to 2030 projected by three methods and reported as a band; yield headroom computed corridor by corridor.",
    refs: [WIDEBODY],
  },
  {
    skill: "Industry economics",
    detail:
      "Who earns the value in a payments network whose busiest half is priced at zero; announced capacity checked against filed documents.",
    refs: [FSPULSE, GROUND],
  },
  {
    skill: "Business case and financial modelling",
    detail:
      "Revenue, margin, breakeven and capital for a new business line; a state programme costed against its budget earmark.",
    refs: [
      ref("cipla-point-of-care-diagnostics", "Cipla diagnostics case"),
      ref("maha-navonmesh-tgc-2026", "Maha Navonmesh"),
    ],
  },
  {
    skill: "Equity valuation",
    detail:
      "DCF and reverse DCF, valuation by part, peer multiples, Monte Carlo, and weighted outcomes with a price target.",
    refs: [AIRTEL, NEPHRO],
  },
  {
    skill: "Macro and markets",
    detail:
      "Rates, FX, flows and the balance of payments, with three scenarios and five dated range calls.",
    refs: [ref("india-markets-monthly-oct-2026", "India Markets Monthly")],
  },
  {
    skill: "Causal inference",
    detail:
      "Difference-in-differences with a within-market control; Granger and CCM tests of commodity links.",
    refs: [
      ref("regulating-retail-options-boom", "Retail options paper"),
      ref("enso-macro-risk-desk", "ENSO Macro Risk Desk"),
    ],
  },
  {
    skill: "Backtesting",
    detail:
      "Walk-forward tests with transaction costs, a deflated scorecard and bootstrap confidence intervals.",
    refs: [SIGNALS],
  },
  {
    skill: "Primary research",
    detail:
      "A survey of 51 rural households across four social protection schemes, measured in one round.",
    refs: [ref("awareness-without-uptake", "Awareness Without Uptake")],
  },
  {
    skill: "Tools",
    detail:
      "Python, DuckDB, Git and GitHub Actions, used for data pipelines that rebuild each month.",
    refs: [FSPULSE],
  },
];

type Ref = { href: string; label: string };
function Refs({ refs }: { refs: Ref[] }) {
  return (
    <>
      {refs.map((r, i) => (
        <span key={r.href}>
          {i > 0 && ", "}
          <Link href={r.href} className="lk text-accent">
            {r.label}
          </Link>
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero.
          The name is the headline and the line under it says what the work is.
          The three links are the page's table of contents: a reader hiring for
          strategy and one hiring for research want different things, and this
          lets each go straight there.

          The entry animation is CSS. Nothing here sets opacity to 0 outside a
          keyframe, so a failed or slow bundle cannot leave the page blank. */}
      <section className="pb-10 pt-12 sm:pb-14 sm:pt-20">
        <h1
          className="enter max-w-3xl font-serif text-hero"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          {site.name}
        </h1>
        <p
          className="enter mt-4 max-w-2xl font-serif text-xl italic leading-snug text-accent sm:text-2xl"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Strategy and investment research. {site.education}.
        </p>
        <p
          className="enter mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {featured} pieces of work in three groups. Each group opens with one
          piece and what it concluded. Every chart on the site names its source.
        </p>
        <nav
          aria-label="Work, by group"
          className="enter mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          {lanes.map((g) => (
            <a
              key={g.key}
              href={`#${g.key}`}
              className="group block border-t border-line-strong pt-4 transition-colors hover:border-accent"
            >
              <span className="block font-serif text-xl leading-snug tracking-tight transition-colors group-hover:text-accent">
                {g.title}
              </span>
              <span className="sc tnum mt-2 block text-muted-2">
                {g.items.length} pieces <span aria-hidden="true">↓</span>
              </span>
            </a>
          ))}
        </nav>
      </section>

      {/* #work and #projects are kept on the first lane so older links and
          bookmarks still land on the work. Spans do not inherit the section's
          scroll margin, so they carry their own. */}
      {lanes.map((g, i) => {
        const [lead, ...rest] = g.items;
        return (
          <section
            key={g.key}
            id={g.key}
            className="scroll-mt-24 border-t border-line py-12 sm:py-16"
          >
            {i === 0 && (
              <>
                <span id="work" className="vh scroll-mt-24" />
                <span id="projects" className="vh scroll-mt-24" />
              </>
            )}
            <h2 className="font-serif text-display">{g.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">
              {g.blurb}
            </p>
            <div className="mt-8">
              <WorkFeature item={lead} finding={g.finding} eager={i === 0} />
            </div>
            {rest.length > 0 && (
              <div className="mt-8">
                <WorkRows rows={toIndexRows(rest)} quietHead={i > 0} />
              </div>
            )}
          </section>
        );
      })}

      {earlier && (
        <p
          id="index"
          className="scroll-mt-24 border-t border-line py-8 text-sm text-muted"
        >
          {earlier.items.length} earlier pieces are listed at the end of{" "}
          <Link href="/work#earlier" className="lk text-accent">
            the full index
          </Link>
          , which can also be filtered by subject and searched.
        </p>
      )}

      {/* About */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-line py-12 sm:py-16"
      >
        <h2 className="font-serif text-display">About</h2>
        <p className="mt-8 max-w-3xl font-serif text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
          I work on strategy and investment research. Most pieces here start
          from a decision someone has to make and end with a recommendation,
          the numbers behind it, and the source of each number.
        </p>

        <h3 className="mt-14 font-serif text-2xl tracking-tight">
          How the work is done
        </h3>
        <div className="mt-6 grid gap-x-8 gap-y-8 md:grid-cols-3">
          {practices.map((p) => (
            <div key={p.title} className="border-t border-line-strong pt-4">
              <h4 className="font-serif text-xl leading-snug tracking-tight">
                {p.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {p.text}
              </p>
              <p className="mt-3 text-sm">
                <Refs refs={p.refs} />
              </p>
            </div>
          ))}
        </div>

        <h3 className="mt-14 font-serif text-2xl tracking-tight">
          Skills, and where each is shown
        </h3>
        <dl className="mt-6 border-t border-line-strong">
          {skills.map((k) => (
            <div
              key={k.skill}
              className="grid gap-x-8 gap-y-1 border-b border-line py-4 md:grid-cols-[14rem_1fr_15rem]"
            >
              <dt className="font-medium text-foreground">{k.skill}</dt>
              <dd className="text-sm leading-relaxed text-muted">
                {k.detail}
              </dd>
              <dd className="text-sm leading-relaxed max-md:mt-1">
                <Refs refs={k.refs} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 py-12 pb-20 sm:py-16 sm:pb-24"
      >
        <div className="rounded-md border border-line-strong bg-accent-soft/60 px-6 py-16 text-center">
          <h2 className="font-serif text-display">Contact</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Open to roles in strategy, consulting and investment research.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              {site.email}
            </a>
            {[
              { href: site.linkedin, label: "LinkedIn" },
              { href: site.ssrn, label: "SSRN" },
              { href: site.github, label: "GitHub" },
              { href: site.orcid, label: "ORCID" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-line-strong bg-card px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
