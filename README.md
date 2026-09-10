# Anklesh Rawat — Portfolio

Investment research, strategy, and publications. Next.js 16 + Tailwind 4, deployed on Vercel.

## Editing content

All content lives in `data/`. No CMS.

- **Site-wide facts** (canonical URL, email, social links): `data/site.ts`. `metadataBase`, the sitemap, robots.txt, JSON-LD, and every visible contact link read from here, so changing an email or domain is a one-line edit.
- **Subject taxonomy**: `data/domains.ts`. Nine domains, each with a label and a colour. Projects and research both key off it, so a piece of work is filed once and appears everywhere: the facet matrix, the card rule, the chart marks. Adding a domain means adding an entry here **and** a matching `--domain-<key>: light-dark(light, dark)` declaration in `app/globals.css` (see the palette note below). `npm run check:tokens` fails the build if you forget one.
- **Projects**: `data/projects.ts`. A project needs a `domain` and either a `live` URL, a `github` URL, or a `doc` (PDF path) as its artefact. With a `screenshot` it renders in a browser frame; without one, a `doc`-backed project falls back to a typographic `DocCover`.
- **Research and publications**: `data/research.ts`. Drop the PDF in `public/research/` and add an entry with a `domain`. A cover PNG in `public/research/covers/` is optional. Adding a `publication` block (venue, URL, authors, abstract, keywords, JEL codes) promotes the entry into the Publications group and switches its structured data from `Report` to `ScholarlyArticle`.
- **The merged index**: `data/work.ts` flattens projects and research into one `WorkItem[]` for `/work`, `/research` and the home page, and defines the `groups` the index is split into. The first group is curated by an explicit `slugs` list, because what someone should look at first is an editorial call rather than a property of the artefact; the rest claim by artefact type. `groupItems()` assigns each item to the first group that claims it, so nothing appears twice. It derives everything from the two files above, so nothing is maintained twice. The home page leads with the first group and lists the rest as rows; `toIndexRows()` builds the slim view model the client index receives.
- PPTs: export to PDF first, since browsers cannot render `.pptx` natively.

Every research entry automatically gets an indexable page at `/research/<slug>` and a sitemap row. Nothing else needs touching.

## Charts

Figures live in the data files as a `figures?: Figure[]` field on a project or a research document, and render through `components/Figure.tsx` into one of four primitives in `components/charts/`: `BarSet` (magnitude, with an optional interval), `DivergingBars` (signed values around a zero baseline, for when the sign is the finding), `Meter` (one value on a definitional scale), `DotMatrix` (n of m). `StatTiles` renders a `metrics[]` row and is not a chart.

Two rules hold this together:

1. **Every number plotted is one already stated in the copy.** No invented series, no fabricated time series. Work whose copy states only counts gets stat tiles instead of a chart, rather than a chart padded with numbers nobody wrote down.
2. **`caption` and `source` are required on every figure variant.** The type enforces it. `source` names the highlight or finding the numbers came from, so a reader can check the chart against the prose on the same page.

Data marks carry no entrance animation. An earlier version scaled bars in from zero width, which made the resting state of a mark invisible and the correct state dependent on the animation actually advancing; anywhere it did not, every chart silently read as zero.

There is no charting library. These are three to twelve point series rendered as plain HTML in server components; a library would add weight and a client boundary for nothing.

## Theme

Both themes are driven entirely by the custom properties at the top of `app/globals.css`. There are no `dark:` variants anywhere, because every component paints with tokens (`bg-background`, `text-muted`, `border-line`, and so on).

**Every token is declared exactly once**, through `light-dark()`. The theme is then chosen by `color-scheme` alone: bare `:root` is `light dark` and follows the OS, `:root[data-theme="light"]` and `:root[data-theme="dark"]` pin it. Lightning CSS polyfills `light-dark()` at build time into a `--lightningcss-light` / `--lightningcss-dark` toggle plus a `prefers-color-scheme` media query, so it works in older browsers too.

This replaced an arrangement that repeated the whole dark palette verbatim under two selectors. The copies had already drifted: `--domain-policy` was declared twice in one and not at all in the other, so pressing the toggle to dark on a light OS rendered Public Policy at 2.49:1 against the card, under the 3:1 the palette was validated to. One declaration per token makes that unrepresentable, and it also means a reader with JavaScript disabled still gets their OS theme.

The inline script in the root layout's `<head>` now only stamps an explicit stored choice, and also stamps `?view=table` for the work index so a deep link paints the right view before first paint. `components/ThemeToggle.tsx` holds no React state; which icon and which announced label show is decided by CSS from `data-theme`, which is why there is nothing for hydration to disagree about.

Shadows are not colours, so `light-dark()` cannot carry them. `--raise` and `--shadow-lift` keep one geometry across themes and swap two edge colours: light gets a drop shadow and a transparent inner edge, dark gets an inner highlight and a transparent drop. Black shadows on `#0f1216` are invisible, which is why the dark theme previously had no elevation at all.

**The categorical palette is validated, not chosen by eye.** The nine `--domain-*` hues passed a lightness-band, chroma-floor, colour-vision-separation, normal-vision-separation and contrast check as an *ordered set*, against this site's own surfaces, in both themes. Reordering the array in `data/domains.ts` or editing a hex invalidates that result. Re-run the check before changing either. `npm run check:tokens` asserts that every domain key has exactly one token and that the social card's copy of the light palette still matches.

## The work index

`components/WorkIndex.tsx` is the client shell: search, facets, view switch, sort and the live count. It **imports nothing from `data/`**. It used to `import { work }`, which dragged `data/projects.ts` and `data/research.ts` into the client chunk, roughly 50KB of descriptions, approaches, highlights and abstracts that no card renders. The server passes a slim `IndexRow[]` view model instead, and the cards arrive as server-rendered children that the shell only hides and shows.

- `components/WorkFacets.tsx` is the subject-by-form matrix. It is the filter control and the portfolio overview at once, which is the only reason it earns its place: a chart that is also the navigation is not decoration. Row and column headers filter; cells inform. Below `sm` it degrades to a wrapping chip row through CSS alone.
- `components/WorkRows.tsx` is the table. With an `onSort` callback it is the sortable table view; without one it is a plain server-rendered table, which is what the home page and `app/not-found.tsx` use.
- `components/WorkCards.tsx` renders the grouped card grid on the server.
- Search covers what the index does not render: `stack`, and a paper's keywords and JEL codes. Browser find already covers every title and outcome on screen. Long prose is excluded on purpose.
- Both views are in the prerendered HTML and CSS picks between them, so a deep link never flashes and print gets the compact table.
- Sorting exposes `featured`, `title`, `domain` and `type`. Not date: fourteen of sixteen items have none, and inventing recency is what this site is positioned against.

## Discovery layer

- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` from the data files.
- `public/llms.txt` is a hand-maintained summary for AI crawlers. Update it when adding a project or paper.
- Open Graph cards are generated per route at build time from `components/OgCard.tsx`, so all sixteen pieces of work no longer share one image. `next/og` bundles Geist, the site's own sans face, so the cards need no font assets. Twitter falls back to the Open Graph image automatically, so there are no `twitter-image` files.
- JSON-LD is emitted via `components/JsonLd.tsx`: `Person` in the root layout, `ScholarlyArticle`/`Report` on research pages, `SoftwareApplication`/`CreativeWork` on project pages, plus `BreadcrumbList` on both.
- The `/work` index filters through `window.location` and `history.pushState` rather than `useSearchParams`. That hook forces a Suspense boundary which partial prerendering postpones, and a postponed boundary leaves the cards out of the prerendered HTML. Reading the URL after mount keeps all of them in the static markup.

## Development

```bash
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint
npm run check:figures   # assert every plotted number is stated in the copy
npm run check:tokens    # assert the palette is complete and the OG card matches it
```
