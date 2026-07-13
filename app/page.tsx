import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

const skills = [
  "DCF & Reverse DCF",
  "LBO Modeling",
  "Credit Analysis",
  "Covenant Analysis",
  "Risk Metrics (VaR / Sharpe)",
  "Python",
  "React",
  "SEC EDGAR",
  "NLP for Finance",
  "Sustainable Finance",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="flex flex-col gap-6 py-24 sm:py-32">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Investment Research & Quantitative Tools
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.1] tracking-tight sm:text-6xl">
            Anklesh Rawat
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            MBA, IIM Bodh Gaya. I build production-grade tools that turn
            institutional finance workflows — covenant surveillance, equity
            research, LBO screening, market intelligence — into live, open
            software.
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
              className="rounded-full border border-line px-6 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-20 py-16">
        <Reveal>
          <h2 className="font-serif text-3xl tracking-tight">Projects</h2>
          <p className="mt-2 max-w-xl text-muted">
            Live platforms and open-source tools across credit, equities,
            capital markets, and sustainable finance.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 100}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 py-16">
        <Reveal>
          <h2 className="font-serif text-3xl tracking-tight">About</h2>
          <div className="mt-6 grid gap-10 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                I work at the intersection of investment research and software.
                Rather than writing about frameworks, I ship them: a covenant
                surveillance engine reading live SEC filings, a sell-side
                research terminal with reverse-DCF pricing, an LBO screener
                built the month India unlocked onshore leveraged buyouts.
              </p>
              <p>
                My interest is in taking workflows that live inside terminals
                and spreadsheets at institutional desks and rebuilding them as
                transparent, reproducible, open tools.
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
                    className="rounded-full border border-line px-3 py-1 text-sm text-muted"
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
          <div className="rounded-2xl border border-line bg-card px-8 py-12 text-center shadow-sm">
            <h2 className="font-serif text-3xl tracking-tight">
              Let&apos;s talk
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Open to roles and collaborations in investment research, credit,
              and quantitative tooling.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
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
