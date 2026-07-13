import { projects } from "@/data/projects";
import FeatureRow from "@/components/FeatureRow";
import StatBand, { type Stat } from "@/components/StatBand";
import Reveal from "@/components/Reveal";

const stats: Stat[] = [
  { value: 263, prefix: "$", suffix: "B", label: "debt under live covenant surveillance" },
  { value: 6, label: "production platforms shipped" },
  { value: 25, label: "IPOs event-studied on open data" },
  { value: 65100, prefix: "₹", suffix: "Cr", label: "green bond issuance mapped" },
];

const skills = [
  "DCF & Reverse DCF",
  "LBO Modeling",
  "Credit Analysis",
  "Covenant Analysis",
  "Causal Inference (Granger / CCM)",
  "Risk Metrics (VaR / Sharpe)",
  "Python",
  "React",
  "SEC EDGAR",
  "NLP for Finance",
  "Sustainable Finance",
];

function HeroMotif() {
  return (
    <svg
      className="motif pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 w-full text-accent"
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,220 C120,210 180,150 300,160 C420,170 480,90 600,110 C720,130 780,60 900,80 C1020,100 1100,40 1200,55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <path
        d="M0,240 C150,235 220,190 340,200 C460,210 540,150 660,165 C780,180 860,120 980,135 C1080,147 1140,100 1200,110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M0,200 C100,190 200,120 320,135 C440,150 520,55 640,80 C760,105 840,25 960,50 C1060,70 1130,15 1200,30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.12"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="relative flex flex-col gap-6 py-24 sm:py-32">
        <HeroMotif />
        <Reveal>
          <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
            Investment Research & Quantitative Tools
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.08] tracking-tight sm:text-7xl">
            Anklesh Rawat
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            MBA, IIM Bodh Gaya. I take workflows that live inside terminals and
            spreadsheets at institutional desks —{" "}
            <em className="font-serif text-foreground">
              covenant surveillance, equity research, LBO screening, climate
              macro
            </em>{" "}
            — and ship them as live, open software.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex gap-4 pt-2">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              View projects
            </a>
            <a
              href="mailto:ankleshrawat5@duck.com"
              className="rounded-full border border-line bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <Reveal>
        <StatBand stats={stats} />
      </Reveal>

      {/* Projects */}
      <section id="projects" className="scroll-mt-20 py-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Selected work
          </p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight">Projects</h2>
          <p className="mt-3 max-w-xl text-muted">
            Six production platforms across credit, equities, macro, private
            equity, climate, and sustainable finance.
          </p>
        </Reveal>
        <div className="mt-14 flex flex-col gap-20">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <FeatureRow project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 border-t border-line py-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Background
          </p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight">About</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                I work at the intersection of investment research and software.
                Rather than writing about frameworks, I ship them: a covenant
                surveillance engine reading live SEC filings, a sell-side
                research terminal with reverse-DCF pricing, a causal-tested
                ENSO commodity risk desk, an LBO screener built the month India
                unlocked onshore leveraged buyouts.
              </p>
              <p>
                The common thread — institutional workflows made transparent,
                reproducible, and open.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-accent">
                Toolkit
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-card px-3 py-1 text-sm text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 py-16 pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-card px-8 py-14 text-center shadow-sm">
            <h2 className="font-serif text-4xl tracking-tight">
              Let&apos;s talk
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Open to roles and collaborations in investment research, credit,
              and quantitative tooling.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:ankleshrawat5@duck.com"
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                ankleshrawat5@duck.com
              </a>
              <a
                href="https://github.com/DogInfantry"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
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
