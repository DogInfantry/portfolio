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

const capabilities = [
  {
    label: "Strategy",
    text: "Market sizing, market entry, industry and competitive analysis, financial modelling",
  },
  {
    label: "Valuation",
    text: "DCF and reverse DCF, sum of the parts, scenario valuation, comparables",
  },
  {
    label: "Methods and tools",
    text: "Python, difference-in-differences and event studies, Granger and CCM causal tests, public data pipelines, Git",
  },
];

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
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 leading-relaxed text-muted">
            <p>
              I work on strategy and investment research, and hold an MBA from
              IIM Bodh Gaya.
            </p>
            <p>
              The strategy cases each start from a decision: where Indian
              carriers should deploy their next 100 long-haul aircraft, who
              earns the value in India&apos;s UPI network, and how much of
              India&apos;s announced data centre capacity is switched on. They
              are worked from public data and published with the code, so the
              numbers can be checked.
            </p>
            <p>
              The investment research includes initiations of coverage on
              NephroPlus and on Bharti Airtel, which sets out in advance the
              event that would change its rating, a sample India markets note,
              and two SSRN working papers: one estimates what SEBI&apos;s
              2024–25 index derivatives curbs did to retail participation, the
              other asks why rural households who know about a benefit still do
              not receive it.
            </p>
            <p>
              Two pieces report results against their own starting hypothesis.
              In the regime-switching study the model worked and the strategy
              did not. The aviation case reversed its recommendation partway
              through and records why.
            </p>
          </div>

          <dl className="space-y-6">
            {capabilities.map((c) => (
              <div key={c.label} className="border-t border-line pt-4">
                <dt className="sc text-accent">{c.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {c.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
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
