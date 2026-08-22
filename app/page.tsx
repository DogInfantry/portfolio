import Link from "next/link";
import { site } from "@/data/site";
import { work } from "@/data/work";
import Reveal from "@/components/Reveal";
import WorkIndex from "@/components/WorkIndex";

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

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* Hero.
          Deliberately just a name, a claim and two ways to act on it. An
          earlier version stacked a chart, a derived counts line and a row of
          four headline numbers here, which meant the first screen had to be
          studied before it could be understood. The work itself is the
          evidence, and it starts one scroll below. */}
      <section className="py-16 sm:py-24">
        <Reveal>
          <p className="sc text-accent">Anklesh Rawat · {site.education}</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            Strategy, finance and research,{" "}
            <em className="text-accent">live and explorable.</em>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Commercial strategy, corporate finance, investment research and
            quantitative work. Market entry cases, payments economics, covenant
            surveillance, derivatives regulation. The kind of analysis that
            usually ends its life inside a slide deck or a terminal, published
            here as dashboards you can open, papers you can read, and
            repositories you can check line by line.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="rounded-sm bg-accent px-6 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              See the work
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="rounded-sm border border-line bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </section>

      {/* The work, in labelled groups. The #projects id is kept so older links
          and the nav entry still land here. */}
      <section id="work" className="scroll-mt-24 border-t border-line py-14">
        <span id="projects" className="sr-only" />
        <Reveal>
          <p className="sc kicker">The work</p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight">
            {work.length} pieces, in four groups
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Selected work first, then papers, then live apps with their code,
            then longer-form reports and decks. Filter by subject to narrow
            within the groups.
          </p>
        </Reveal>
        <div className="mt-10">
          <WorkIndex />
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 border-t border-line py-14">
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
                pricing, a causal-tested ENSO commodity desk, an open-data trail
                for who captures the value in India&apos;s payments network.
              </p>
              <p>
                The same instinct runs through the written work: two working
                papers on SSRN, one estimating what SEBI&apos;s 2024–25 index
                derivatives curbs did to retail participation, the other asking
                why rural households who already know about a benefit still do
                not receive it.
              </p>
              <p>
                It also runs through what gets published when the answer is no.
                The regime-switching study here is a negative result with a
                diagnosis attached, and the aviation case reversed its own
                recommendation mid-way and wrote down why, because a portfolio
                of only wins says nothing about how someone handles a loss.
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
      <section id="contact" className="scroll-mt-24 py-14 pb-20">
        <Reveal>
          <div className="rounded-md border border-line bg-accent-soft/60 px-6 py-14 text-center">
            <p className="sc kicker">Contact</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight">
              Let&apos;s talk
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Open to roles and collaborations across strategy, finance,
              investment and policy research, and quantitative work.
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
