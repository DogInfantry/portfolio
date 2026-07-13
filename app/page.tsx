import Link from "next/link";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import FeatureRow from "@/components/FeatureRow";
import Reveal from "@/components/Reveal";

const domains = [
  "Credit",
  "Equities",
  "Macro & Markets",
  "Private Equity",
  "Climate Macro",
  "Sustainable Finance",
];

const capabilities = [
  {
    label: "Strategy & Consulting",
    items: [
      "Market Sizing & TAM",
      "Industry & Competitive Analysis",
      "Financial Modeling",
      "Structured Problem-Solving",
      "Policy & RegTech Analysis",
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
      "Causal Inference (Granger / CCM)",
      "NLP for Finance",
      "SEC EDGAR / Data Pipelines",
      "Sustainable Finance",
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
      <section className="relative py-20 sm:py-28">
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
                ["Focus", "Investment research"],
                ["Education", "MBA, IIM Bodh Gaya"],
                ["Contact", "ankleshrawat5@duck.com"],
                ["Code", "github.com/DogInfantry"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-line py-3">
                  <dt className="sc text-muted">{k}</dt>
                  <dd className="mt-1 break-words text-foreground">{v}</dd>
                </div>
              ))}
              <div className="border-t border-line" />
            </dl>
          </Reveal>
        </div>
        {/* domain index strip */}
        <Reveal delay={350}>
          <p className="sc mt-14 border-t border-line pt-4 leading-relaxed text-muted">
            {domains.join("  ·  ")}
          </p>
        </Reveal>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-24 py-16">
        <Reveal>
          <p className="sc text-accent">Selected work</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight">Projects</h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-20">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <FeatureRow project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Research strip */}
      <section className="scroll-mt-24 py-16">
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-line pt-3">
            <p className="sc text-muted">Selected research</p>
            <Link href="/research" className="lk text-sm font-medium text-accent">
              All research →
            </Link>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {research.map((doc) => (
              <a
                key={doc.slug}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 border-t border-line py-16">
        <Reveal>
          <p className="sc text-accent">Background</p>
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
          </div>

          {/* capability matrix */}
          <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
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
      <section id="contact" className="scroll-mt-24 py-16 pb-28">
        <Reveal>
          <div className="border-y border-line py-14 text-center">
            <p className="sc text-accent">Contact</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight">
              Let&apos;s talk
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Open to roles and collaborations in investment research, credit,
              and quantitative tooling.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:ankleshrawat5@duck.com"
                className="rounded-sm bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                ankleshrawat5@duck.com
              </a>
              <a
                href="https://github.com/DogInfantry"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-line px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
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
