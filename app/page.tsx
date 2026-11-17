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

/** lane numeral: 01, 02, 03 */
const num = (i: number) => String(i + 1).padStart(2, "0");

/** "3 interactive analyses · 3 reports", counted from the lane's own items */
function formats(items: { typeLabel: string }[]) {
  const counts = new Map<string, number>();
  for (const { typeLabel } of items)
    counts.set(typeLabel, (counts.get(typeLabel) ?? 0) + 1);
  return [...counts]
    .map(([label, n]) => {
      const l = label.toLowerCase();
      const plural = l.endsWith("analysis") ? l.replace(/analysis$/, "analyses") : `${l}s`;
      return `${n} ${n === 1 ? l : plural}`;
    })
    .join(" · ");
}

/** short name for the lane's piece list: the part of the title before a colon */
const short = (title: string) => title.split(":")[0];

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
      <section className="pb-12 pt-8 sm:pb-16 sm:pt-12">
        {/* Masthead line: what the site covers and the degree, set like the
            dateline of a journal issue across the full width. */}
        <div
          className="enter sc flex flex-wrap justify-between gap-x-6 gap-y-1 border-t-4 border-foreground pt-3 text-muted"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <span>{site.role}</span>
          <span>{site.education}</span>
        </div>
        <div className="mt-10 grid gap-12 sm:mt-14 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
        <h1
          className="enter font-serif text-masthead"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {site.name}
        </h1>
        <p
          className="enter mt-6 max-w-xl font-serif text-xl italic leading-snug sm:text-2xl"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <span className="text-accent">
            Strategy cases, equity initiations and working papers,
          </span>{" "}
          each built from public data and each ending in a recommendation with
          the numbers behind it.
        </p>
        <p
          className="enter mt-4 max-w-xl leading-relaxed text-muted"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          Open to roles in strategy, consulting and investment research.
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
          className="enter sc mt-8 max-w-xl leading-loose text-muted-2"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {headlineSkills.join(" · ")}
        </p>
        </div>

        {/* Contents: one row per lane, with the finding its lead piece
            reached, so a reader can pick a lane before scrolling. */}
        <nav
          aria-label="Contents"
          className="enter lg:border-l lg:border-line-strong lg:pl-10"
          style={{ "--i": 5 } as React.CSSProperties}
        >
          <p className="sc border-b border-line-strong pb-3 text-muted">
            Contents
          </p>
          <ol>
            {lanes.map((g, i) => (
              <li key={g.key} className="border-b border-line">
                <a
                  href={`#${g.key}`}
                  className="group grid grid-cols-[3.25rem_1fr] gap-x-3 py-5"
                >
                  <span className="tnum font-serif text-4xl font-light leading-none text-accent">
                    {num(i)}
                  </span>
                  <span>
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-xl leading-snug tracking-tight transition-colors group-hover:text-accent">
                        {g.title}
                      </span>
                      <span className="sc tnum shrink-0 text-muted-2">
                        {g.items.length} <span aria-hidden="true">↓</span>
                      </span>
                    </span>
                    {g.finding && (
                      <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-muted">
                        {g.finding}
                      </span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        </div>
      </section>

      {/* #work and #projects are kept on the first lane so older links and
          bookmarks still land on the work. Spans do not inherit the section's
          scroll margin, so they carry their own. */}
      {lanes.map((g, i) => (
        <section
          key={g.key}
          id={g.key}
          className="scroll-mt-24 border-t-2 border-foreground pb-12 pt-8 sm:pb-16 sm:pt-10"
        >
          {i === 0 && (
            <>
              <span id="work" className="vh scroll-mt-24" />
              <span id="projects" className="vh scroll-mt-24" />
            </>
          )}
          {/* Chapter opener: numeral and title on the left, what the lane
              covers and what is in it on the right. */}
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <div>
              <span
                aria-hidden="true"
                className="tnum block font-serif text-5xl font-light leading-none text-accent"
              >
                {num(i)}
              </span>
              <h2 className="mt-4 max-w-md font-serif text-chapter">{g.title}</h2>
            </div>
            <div className="lg:pt-2">
              <p className="text-lg leading-relaxed">{g.blurb}</p>
              <div className="mt-6 border-t border-line pt-4">
                <p className="sc text-muted-2">
                  Inside <span className="tnum ml-2 text-muted">{formats(g.items)}</span>
                </p>
                <p className="mt-2 leading-relaxed">
                  {g.items.map((item, j) => (
                    <span key={item.slug}>
                      {j > 0 && <span aria-hidden="true" className="text-muted-2"> · </span>}
                      <a href={`#${item.slug}`} className="lk text-accent">
                        {short(item.title)}
                      </a>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* Running head. Sticky inside its own section, so it rides under the
              nav only while this lane is on screen and the next lane's head
              takes over. CSS only, nothing animates. */}
          <div className="sticky top-14 z-40 -mx-5 mt-10 border-y border-line bg-background/90 px-5 backdrop-blur">
            <div className="sc tnum flex h-10 items-center justify-between gap-4">
              <span>
                <span className="text-accent">{num(i)}</span>
                <span className="ml-2">{g.title.split(" and ")[0]}</span>
                <span className="ml-2 hidden text-muted-2 sm:inline">
                  · {g.items.length} pieces
                </span>
              </span>
              <span className="hidden gap-5 text-muted md:flex">
                {lanes.map((o, k) =>
                  k === i ? null : (
                    <a key={o.key} href={`#${o.key}`} className="transition-colors hover:text-accent">
                      {num(k)} {o.title.split(" and ")[0]} {k > i ? "↓" : "↑"}
                    </a>
                  )
                )}
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {g.items.map((item, j) => (
              <div
                key={item.slug}
                id={item.slug}
                className={`scroll-mt-28 ${span(j, g.items.length)}`}
              >
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
