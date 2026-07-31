import Link from "next/link";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import { site } from "@/data/site";
import FeatureRow from "@/components/FeatureRow";
import Reveal from "@/components/Reveal";

const domains = [
  "Credit",
  "Equities",
  "Macro & Markets",
  "Market Structure",
  "Private Equity",
  "Climate Macro",
  "Sustainable Finance",
  "Product & Strategy",
];

const papers = research.filter((d) => d.publication);
const reports = research.filter((d) => !d.publication);

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

function HeroMotif() {
  return (
    <svg
      className="motif pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 w-full text-accent"
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,220 C120,210 180,150 300,160 C420,170 480,90 600,110 C720,130 780,60 900,80 C1020,100 1100,40 1200,55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.22"
      />
      <path
        d="M0,240 C150,235 220,190 340,200 C460,210 540,150 660,165 C780,180 860,120 980,135 C1080,147 1140,100 1200,110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.12"
      />
      <path
        d="M0,200 C100,190 200,120 320,135 C440,150 520,55 640,80 C760,105 840,25 960,50 C1060,70 1130,15 1200,30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.08"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="relative py-14 sm:py-20">
        <HeroMotif />
        <div className="grid gap-10 md:grid-cols-[1fr_240px]">
          <div>
            <Reveal>
              <p className="sc text-accent">
                Portfolio · Anklesh Rawat · MBA, IIM Bodh Gaya
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.06] tracking-tight sm:text-7xl">
                Investment research,{" "}
                <em className="text-accent">live and explorable.</em>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                Covenant surveillance, equity research, capital-markets
                intelligence, climate macro: analysis that usually stays locked
                in terminals and spreadsheets, published as live dashboards
                anyone can open.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex gap-4">
                <a
                  href="#projects"
                  className="rounded-sm bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  View projects
                </a>
                <Link
                  href="/research"
                  className="rounded-sm border border-line bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  Read research
                </Link>
              </div>
            </Reveal>
          </div>
          {/* meta column */}
          <Reveal delay={200}>
            <dl className="hidden self-center text-sm md:block">
              {[
                { k: "Focus", v: "Research · Valuation · Product Strategy" },
                { k: "Education", v: site.education },
                {
                  k: "Published",
                  v: "SSRN working paper, 2026",
                  href: site.ssrn,
                },
                { k: "Contact", v: site.email, href: `mailto:${site.email}` },
                { k: "Code", v: "github.com/DogInfantry", href: site.github },
                {
                  k: "LinkedIn",
                  v: "in/anklesh-rawat-00508a1aa",
                  href: site.linkedin,
                },
              ].map(({ k, v, href }) => (
                <div key={k} className="border-t border-line py-3">
                  <dt className="sc text-muted">{k}</dt>
                  <dd className="mt-1 break-words text-foreground">
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="lk transition-colors hover:text-accent"
                      >
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
              <div className="border-t border-line" />
            </dl>
          </Reveal>
        </div>
        {/* domain index strip */}
        <Reveal delay={350}>
          <p className="sc mt-10 border-t border-line pt-4 leading-relaxed text-muted">
            {domains.join("  ·  ")}
          </p>
        </Reveal>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-24 py-12">
        <Reveal>
          <p className="sc kicker">Selected work</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight">Projects</h2>
        </Reveal>
        <div className="mt-10 flex flex-col gap-14">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug}>
              <FeatureRow project={p} index={i} />
            </Reveal>
          ))}
        </div>
        {/* compact index for the remaining projects */}
        <Reveal>
          <div className="mt-14">
            {projects.slice(3).map((p, i) => {
              const n = i + 4;
              const externalHref = p.live ?? p.github ?? p.doc;
              return (
                <div
                  key={p.slug}
                  className="grid items-baseline gap-2 border-t border-line py-5 md:grid-cols-[150px_1fr_auto] md:gap-6"
                >
                  <p className="sc tnum flex items-center gap-2 text-muted">
                    No. {String(n).padStart(2, "0")}
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    <span className="text-accent">{p.category}</span>
                  </p>
                  <div>
                    <h3 className="font-serif text-xl leading-snug tracking-tight">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="transition-colors hover:text-accent"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="sc mt-1 hidden text-muted/70 sm:block">
                      {p.fact}
                    </p>
                  </div>
                  <div className="flex gap-5 text-sm font-medium">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="lk text-accent"
                    >
                      Case study →
                    </Link>
                    {externalHref && (
                      <a
                        href={externalHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lk text-muted"
                      >
                        {p.live ? "Live ↗" : p.github ? "GitHub ↗" : "Deck ↗"}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="border-t border-line" />
          </div>
        </Reveal>
      </section>

      {/* Publications */}
      {papers.length > 0 && (
        <section id="publications" className="scroll-mt-24 py-12">
          <Reveal>
            <p className="sc kicker">Peer-facing work</p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight">
              Publications
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-10">
            {papers.map((doc) => {
              const pub = doc.publication!;
              return (
                <Reveal key={doc.slug}>
                  <article className="rounded-md border border-line bg-card px-6 py-7 sm:px-8 sm:py-9">
                    <p className="sc tnum flex flex-wrap items-center gap-x-2 text-muted">
                      <span className="kicker">SSRN</span>
                      <span>{pub.date}</span>
                      <span>·</span>
                      <span>{doc.pages} pp</span>
                      <span>·</span>
                      <span>JEL {pub.jel.join(" · ")}</span>
                    </p>
                    <h3 className="mt-4 font-serif text-2xl leading-snug tracking-tight sm:text-3xl">
                      <Link
                        href={`/research/${doc.slug}`}
                        className="transition-colors hover:text-accent"
                      >
                        {doc.title}
                      </Link>
                    </h3>
                    <p className="mt-2 font-serif italic leading-relaxed text-muted">
                      {doc.subtitle}
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      {pub.authors.join(" · ")}
                    </p>
                    <p className="mt-5 max-w-2xl leading-relaxed text-muted">
                      {doc.summary}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-6 text-sm font-medium">
                      <Link
                        href={`/research/${doc.slug}`}
                        className="lk text-accent"
                      >
                        Abstract &amp; findings →
                      </Link>
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lk text-muted"
                      >
                        SSRN ↗
                      </a>
                      <a
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lk text-muted"
                      >
                        PDF ↗
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Research strip */}
      <section className="scroll-mt-24 py-12">
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-line pt-3">
            <p className="sc text-muted">Selected research</p>
            <Link href="/research" className="lk text-sm font-medium text-accent">
              All research →
            </Link>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {reports.slice(-3).map((doc) => (
              <Link
                key={doc.slug}
                href={`/research/${doc.slug}`}
                className="group block"
              >
                <figure className="overflow-hidden rounded-sm border border-line bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_28px_rgba(28,37,48,0.12)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={doc.cover}
                    alt={`${doc.title}, first page`}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover object-top"
                  />
                </figure>
                <p className="sc tnum mt-3 text-muted">
                  {doc.kind} · {doc.pages} pp
                </p>
                <h3 className="mt-1 font-serif text-lg leading-snug tracking-tight transition-colors group-hover:text-accent">
                  {doc.title}
                </h3>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 border-t border-line py-12">
        <Reveal>
          <p className="sc kicker">Background</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight">About</h2>
          <div className="mt-8 max-w-2xl space-y-4 leading-relaxed text-muted">
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
              a causal-tested ENSO commodity desk, a capital-markets
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
          </div>

          {/* capability matrix */}
          <div className="mt-8 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
            {capabilities.map((group) => (
              <div key={group.label}>
                <h3 className="sc text-accent">{group.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {group.items.map((s) => (
                    <li key={s} className="border-b border-line pb-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className="rounded-sm bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {site.email}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-line bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                LinkedIn ↗
              </a>
              <a
                href={site.ssrn}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-line bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                SSRN ↗
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-line bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
