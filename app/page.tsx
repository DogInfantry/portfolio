import Link from "next/link";
import { site } from "@/data/site";
import { groupItems, toIndexRows, work } from "@/data/work";
import WorkCard from "@/components/WorkCard";
import WorkRows from "@/components/WorkRows";

/**
 * Home leads with five and lists the other eleven.
 *
 * It used to render the whole index, which is exactly what /work renders, so
 * two URLs did the same job, the curated first group was buried under a chip
 * row that invited fiddling before reading, and the page ran about three
 * thousand pixels of cards before the reader reached a sentence about the
 * person. Eleven rows is roughly seven hundred pixels, everything stays one
 * click away, and the whole body of work fits on one screen, which a card grid
 * never allows.
 */
const [selected, ...rest] = groupItems(work);

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
          evidence, and it starts one scroll below.

          The entry animation is CSS. It used to be a client component that set
          opacity to 0 as a base rule and relied on an IntersectionObserver to
          undo it, so a failed or slow bundle left this page blank. Nothing here
          sets opacity to 0 outside a keyframe now. */}
      <section className="py-16 sm:py-24">
        <p className="sc enter text-accent" style={{ "--i": 0 } as React.CSSProperties}>
          Anklesh Rawat · {site.education}
        </p>
        <h1
          className="enter mt-6 max-w-3xl font-serif text-hero"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Strategy, finance and research,{" "}
          <em className="text-accent">live and explorable.</em>
        </h1>
        <p
          className="enter mt-6 max-w-2xl text-lg leading-relaxed text-muted"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          Commercial strategy, corporate finance, investment research and
          quantitative work. Market entry cases, payments economics, covenant
          surveillance, derivatives regulation. The kind of analysis that
          usually ends its life inside a slide deck or a terminal, published
          here as dashboards you can open, papers you can read, and repositories
          you can check line by line.
        </p>
        <div
          className="enter mt-8 flex flex-wrap gap-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Link
            href="#work"
            className="rounded-sm bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
          >
            Read the selected work
          </Link>
          <Link
            href="/work"
            className="rounded-sm border border-line-strong bg-card px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Full index
          </Link>
        </div>
      </section>

      {/* The work, in labelled groups. The #projects id is kept so older links
          and the nav entry still land here, and it carries its own scroll
          margin because a span does not inherit the section's. */}
      <section
        id="work"
        className="scroll-mt-24 border-t border-line py-12 sm:py-16"
      >
        <span id="projects" className="vh scroll-mt-24" />
        <p className="sc kicker rise">Start here</p>
        <h2 className="rise mt-4 font-serif text-display">{selected.title}</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {selected.blurb}
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {selected.items.map((item) => (
            <WorkCard key={item.slug} item={item} headingLevel={3} />
          ))}
        </div>
      </section>

      <section
        id="index"
        className="scroll-mt-24 border-t border-line py-12 sm:py-16"
      >
        <p className="sc kicker rise">The rest of the shelf</p>
        <h2 className="rise mt-4 font-serif text-display">Everything else</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {work.length - selected.items.length} more pieces, grouped by what the
          artefact is. Every row opens a case page.
        </p>
        <div className="mt-12 flex flex-col gap-12">
          {rest.map((g) => (
            <div key={g.key}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
                <h3 className="font-serif text-2xl tracking-tight">
                  {g.title}
                </h3>
                <p className="sc tnum text-muted-2">
                  {g.items.length} {g.items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <div className="mt-4">
                <WorkRows rows={toIndexRows(g.items)} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Filter by subject, search across titles and stacks, or see all{" "}
          {work.length} side by side in{" "}
          <Link href="/work" className="lk text-accent">
            the full index
          </Link>
          .
        </p>
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-line py-12 sm:py-16"
      >
        <p className="sc kicker rise">Background</p>
        <h2 className="rise mt-4 font-serif text-display">About</h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
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
              reading SEC filings, a research terminal with reverse-DCF pricing,
              a causal-tested ENSO commodity desk, an open-data trail for who
              captures the value in India&apos;s payments network.
            </p>
            <p>
              The same instinct runs through the written work: two working
              papers on SSRN, one estimating what SEBI&apos;s 2024–25 index
              derivatives curbs did to retail participation, the other asking
              why rural households who already know about a benefit still do not
              receive it.
            </p>
            <p>
              It also runs through what gets published when the answer is no.
              The regime-switching study here is a negative result with a
              diagnosis attached, and the aviation case reversed its own
              recommendation mid-way and wrote down why, because a portfolio of
              only wins says nothing about how someone handles a loss.
            </p>
          </div>

          <div className="space-y-8">
            {capabilities.map((group) => (
              <div key={group.label}>
                <h3 className="sc text-accent">{group.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-sm border border-line bg-card px-3 py-1 text-xs text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 py-12 pb-20 sm:py-16 sm:pb-24"
      >
        <div className="rounded-md border border-line-strong bg-accent-soft/60 px-6 py-16 text-center">
          <p className="sc kicker">Contact</p>
          <h2 className="mt-4 font-serif text-display">Let&apos;s talk</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Open to roles and collaborations across strategy, finance,
            investment and policy research, and quantitative work.
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
