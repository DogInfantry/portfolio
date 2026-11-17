import Link from "next/link";
import { site } from "@/data/site";
import { groupItems, work } from "@/data/work";
import { headlineSkills, skillGroups, tools } from "@/data/skills";
import JsonLd from "@/components/JsonLd";
import WorkCard from "@/components/WorkCard";

/**
 * Home is three lanes, each a grid of full cards.
 *
 * The lane's first piece is the lead and takes the full width with the lane's
 * finding. Every other piece is a full card with its image, question, answer
 * and number. An earlier version showed the rest as 56px table rows, which
 * made four fifths of the work look like footnotes. Older work lives at the
 * end of /work.
 */
const all = groupItems(work);
const lanes = all.filter((g) => !g.compact);
const earlier = all.find((g) => g.compact);

/**
 * Column spans that close every row of a lane grid.
 *
 * The lead takes a full row. The rest run in rows of three on lg and two on
 * md, and the last card stretches to fill its row, so a lane never ends on an
 * empty cell. A stretched card switches to an image-left layout through its
 * own container query.
 */
const MD = { 1: "", 2: "md:col-span-2" } as const;
const LG = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" } as const;
function span(i: number, n: number) {
  if (i === 0) return "md:col-span-2 lg:col-span-3";
  if (i !== n - 1) return "";
  const md = (n - 1) % 2 === 1 ? 2 : 1;
  const tail = (n - 1) % 3;
  const lg = tail === 0 ? 1 : ((4 - tail) as 2 | 3);
  return `${MD[md]} ${md === 2 || lg > 1 ? LG[lg] : ""}`;
}

/**
 * About is evidence, not adjectives. Every skill names the piece that shows
 * it, and a slug that does not exist fails the build here, so a renamed or
 * removed piece cannot leave a dead claim behind.
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

const skillCards = skillGroups.map((g) => ({
  ...g,
  skills: g.skills.map((k) => ({
    ...k,
    refs: k.proof.map((pr) => ref(pr.slug, pr.label)),
  })),
}));

const quickFacts = [
  { k: "Looking for", v: "Roles in strategy, consulting and investment research" },
  { k: "Education", v: site.education },
  { k: "Focus", v: "Commercial strategy, equity research and Indian markets" },
  { k: "Published", v: "Two working papers on SSRN" },
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

const button =
  "rounded-sm border border-line-strong bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent";
const card =
  "rounded-md border border-line-strong bg-card p-5 shadow-[var(--raise)]";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      {/* The home page is the profile; the Person itself is in the root
          layout, so this points at it rather than repeating it. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: site.url,
          mainEntity: { "@id": `${site.url}/#person` },
        }}
      />
      {/* Hero.
          Name, then what the work is and what role it is for, then the two
          things a reader does next: look at the work or get in touch. The
          keyword line is the short form of the skills in About.

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
          Strategy cases, equity initiations and working papers, each built
          from public data and each ending in a recommendation with the numbers
          behind it. Open to roles in strategy, consulting and investment
          research.
        </p>
        <div
          className="enter mt-8 flex flex-wrap items-center gap-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <a
            href="#work"
            className="rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
          >
            See the work <span aria-hidden="true">↓</span>
          </a>
          <a href={`mailto:${site.email}`} className={button}>
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={button}
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p
          className="enter sc mt-6 max-w-3xl leading-loose text-muted-2"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {headlineSkills.join(" · ")}
        </p>
        <nav
          aria-label="Work, by group"
          className="enter mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-3"
          style={{ "--i": 5 } as React.CSSProperties}
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
              <span className="mt-1 block text-sm leading-snug text-muted">
                Starts with {g.items[0].title}
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
      {lanes.map((g, i) => (
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
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{g.blurb}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {g.items.map((item, j) => (
              <div key={item.slug} className={span(j, g.items.length)}>
                <WorkCard
                  item={item}
                  lead={j === 0}
                  finding={j === 0 ? g.finding : undefined}
                  eager={i === 0 && j === 0}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

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

      {/* About.
          A statement and the quick facts a reader or an answer engine looks
          for first, then skills grouped the way job descriptions group them,
          each linked to the piece that shows it, then how the work is done. */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-line py-12 sm:py-16"
      >
        <h2 className="font-serif text-display">About</h2>
        <div className="mt-8 grid gap-x-12 gap-y-10 lg:grid-cols-[1.6fr_1fr]">
          <p className="max-w-3xl font-serif text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
            I work on strategy and investment research. Most pieces here start
            from a decision someone has to make and end with a recommendation,
            the numbers behind it, and the source of each number.
          </p>
          <dl className="grid content-start gap-y-4 border-t border-line-strong pt-4 text-sm">
            {quickFacts.map((f) => (
              <div key={f.k} className="grid grid-cols-[7rem_1fr] gap-x-4">
                <dt className="sc pt-0.5 text-muted-2">{f.k}</dt>
                <dd className="leading-relaxed">{f.v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[7rem_1fr] gap-x-4">
              <dt className="sc pt-0.5 text-muted-2">Contact</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="lk text-accent">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <h3 className="mt-16 font-serif text-2xl tracking-tight">
          Skills, and where each is shown
        </h3>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {skillCards.map((g) => (
            <div key={g.title} className={card}>
              <h4 className="font-serif text-lg tracking-tight">{g.title}</h4>
              <ul className="mt-4 space-y-4">
                {g.skills.map((k) => (
                  <li key={k.name}>
                    <p className="text-sm font-medium leading-snug text-foreground">
                      {k.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      <Refs refs={k.refs} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className={card}>
            <h4 className="font-serif text-lg tracking-tight">Tools</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.map((t) => (
                <li
                  key={t}
                  className="rounded-sm border border-line bg-sunken px-2.5 py-1 text-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="mt-16 font-serif text-2xl tracking-tight">
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
