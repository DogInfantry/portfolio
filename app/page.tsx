import Link from "next/link";
import { getProject, projects } from "@/data/projects";
import { research } from "@/data/research";
import { site } from "@/data/site";
import { featured, work } from "@/data/work";
import FeatureRow from "@/components/FeatureRow";
import Figure from "@/components/Figure";
import Reveal from "@/components/Reveal";
import WorkIndex from "@/components/WorkIndex";

/**
 * Counts are derived rather than written down, so the hero cannot drift out of
 * step with the data files the way a hand-typed "6 projects" would.
 */
const counts = {
  projects: projects.length,
  research: research.length,
  papers: research.filter((d) => d.publication).length,
  liveApps: projects.filter((p) => p.live).length,
};

/**
 * The proof strip. Four numbers the work actually produced, each linking to the
 * page that shows how it was arrived at. Every figure here is one already
 * stated in data/projects.ts or data/research.ts.
 */
const proof = [
  {
    value: "$263B",
    label: "of issuer debt under live covenant surveillance",
    href: "/projects/debt-covenant-surveillance",
  },
  {
    value: "1,814",
    label: "out-of-sample days graded in a leak-proof backtest",
    href: "/projects/signals-before-storms",
  },
  {
    value: "37–43%",
    label: "estimated fall in index-options turnover after the SEBI curbs",
    href: "/research/regulating-retail-options-boom",
  },
  {
    value: "25",
    label: "IPOs event-studied on open data, with no paid feeds",
    href: "/projects/capital-markets-intelligence",
  },
];

const capabilities = [
  {
    label: "Strategy & Consulting",
    items: [
      "Market Sizing & TAM",
      "Industry & Competitive Analysis",
      "Financial Modeling",
      "Structured Problem-Solving",
      "Product Strategy & Roadmapping",
      "User Research & Personas",
    ],
  },
  {
    label: "Investment & Valuation",
    items: [
      "DCF & Reverse DCF",
      "LBO Modeling",
      "Credit & Covenant Analysis",
      "Comparable Analysis",
      "Risk Metrics (VaR / Sharpe)",
    ],
  },
  {
    label: "Quantitative & Technical",
    items: [
      "Python",
      "Causal Inference (DiD / Event Study)",
      "Causal Inference (Granger / CCM)",
      "NLP for Finance",
      "SEC EDGAR / Data Pipelines",
      "Policy & RegTech Analysis",
    ],
  },
];

// The hero chart is a real result, not an ornament: the regime finding that got
// this project published as a negative result rather than as a winning strategy.
const heroProject = getProject("signals-before-storms");
const heroFigure = heroProject?.figures?.[0];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero */}
      <section className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <div>
            <Reveal>
              <p className="sc text-accent">Anklesh Rawat · {site.education}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
                Investment research,{" "}
                <em className="text-accent">live and explorable.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Covenant surveillance, payments economics, aviation strategy,
                derivatives regulation. Analysis that usually stays locked in
                terminals and slide decks, published as live dashboards anyone
                can open, working papers anyone can read, and graded honestly
                when it does not work.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/work"
                  className="rounded-sm bg-accent px-6 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
                >
                  Browse the work
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-sm border border-line bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  Get in touch
                </a>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <p className="sc tnum mt-8 border-t border-line pt-4 text-muted-2">
                {counts.projects} projects · {counts.liveApps} live apps ·{" "}
                {counts.research} research documents · {counts.papers} SSRN
                working papers
              </p>
            </Reveal>
          </div>

          {heroFigure && heroProject && (
            <Reveal delay={200}>
              <Figure figure={heroFigure} domain={heroProject.domain} />
              <p className="mt-3 text-sm leading-relaxed text-muted-2">
                An example of the standard. This one says the strategy did not
                work.{" "}
                <Link
                  href={`/projects/${heroProject.slug}`}
                  className="lk text-accent"
                >
                  Read why it was published anyway
                </Link>
              </p>
            </Reveal>
          )}
        </div>

        {/* Proof strip: four numbers before any scrolling is required. */}
        <Reveal delay={120}>
          <dl className="mt-14 grid gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((p) => (
              <div key={p.value}>
                <dd className="tnum text-3xl font-semibold leading-none tracking-tight text-foreground">
                  {p.value}
                </dd>
                <dt className="mt-2.5 text-[13px] leading-snug text-muted">
                  {p.label}
                </dt>
                <Link
                  href={p.href}
                  className="lk mt-2.5 inline-block text-xs font-medium text-accent"
                >
                  See how →
                </Link>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Start here */}
      <section className="scroll-mt-24 py-12">
        <Reveal>
          <p className="sc kicker">Start here</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight">
            Three that show the range
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            One from each group: a commercial strategy case with a stated
            recommendation, a live credit tool reading SEC filings, and a
            working paper on SSRN. Everything else is in{" "}
            <Link href="/work" className="lk text-accent">
              the full index
            </Link>
            .
          </p>
        </Reveal>
        <div className="mt-12 flex flex-col gap-14">
          {featured.map((item, i) => (
            <FeatureRow key={item.slug} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Everything, filterable. The id is kept so older links to #projects and
          the nav entry both still land here. */}
      <section id="projects" className="scroll-mt-24 py-12">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="sc kicker">All work</p>
              <h2 className="mt-3 font-serif text-4xl tracking-tight">
                Everything, grouped
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {work.length} pieces in three groups: decks and case studies,
                published research, and live apps with their code. Filter by
                subject to narrow within them.
              </p>
            </div>
            <Link href="/work" className="lk text-sm font-medium text-accent">
              Open the full index →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10">
          <WorkIndex />
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 border-t border-line py-12">
        <Reveal>
          <p className="sc kicker">Background</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight">About</h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                I&apos;m a finance and strategy generalist (MBA, IIM Bodh Gaya)
                working across investment research, management-consulting-style
                problem-solving, and financial analysis. My work spans credit,
                equities, macro, private equity, and sustainable finance.
              </p>
              <p>
                The difference is that it doesn&apos;t stop at a memo or a deck.
                Each analysis becomes something you can open: a covenant monitor
                reading SEC filings, a research terminal with reverse-DCF
                pricing, a causal-tested ENSO commodity desk, a capital-markets
                intelligence platform. Alongside that sits strategy work like the
                green-steel transition roadmap and MSME credit case in the
                research section.
              </p>
              <p>
                The same instinct runs through the written work: a working paper
                on SSRN estimating what SEBI&apos;s 2024–25 index derivatives
                curbs actually did to retail participation, and a bancassurance
                product case study taking IndusInd Protect from user research to
                prioritization, flows, and go-to-market.
              </p>
              <p>
                It also runs through what gets published when the answer is no.
                The regime-switching study here is a negative result with a
                diagnosis attached, because a portfolio of only wins says
                nothing about how someone handles a loss.
              </p>
            </div>

            <div className="space-y-7">
              {capabilities.map((group) => (
                <div key={group.label}>
                  <h3 className="sc text-accent">{group.label}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-sm border border-line bg-card px-2.5 py-1 text-xs text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 py-12 pb-16">
        <Reveal>
          <div className="rounded-md border border-line bg-accent-soft/60 px-6 py-14 text-center">
            <p className="sc kicker">Contact</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight">
              Let&apos;s talk
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Open to roles and collaborations in investment research, credit,
              and quantitative tooling.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="rounded-sm bg-accent px-6 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
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
                  className="rounded-sm border border-line bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
