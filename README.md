# Anklesh Rawat — Portfolio

Investment research, strategy, and publications. Next.js 16 + Tailwind 4, deployed on Vercel.

## Editing content

All content lives in `data/`. No CMS.

- **Site-wide facts** (canonical URL, email, social links): `data/site.ts`. `metadataBase`, the sitemap, robots.txt, JSON-LD, and every visible contact link read from here, so changing an email or domain is a one-line edit.
- **Subject taxonomy**: `data/domains.ts`. Nine domains, each with a label and a colour. Projects and research both key off it, so a piece of work is filed once and appears everywhere: the filter chips, the card rail, the chart marks. Adding a domain means adding an entry here **and** a matching `--domain-<key>` pair in `app/globals.css` (see the palette note below).
- **Projects**: `data/projects.ts`. A project needs a `domain` and either a `live` URL, a `github` URL, or a `doc` (PDF path) as its artefact. With a `screenshot` it renders in a browser frame; without one, a `doc`-backed project falls back to a typographic `DocCover`.
- **Research and publications**: `data/research.ts`. Drop the PDF in `public/research/` and add an entry with a `domain`. A cover PNG in `public/research/covers/` is optional. Adding a `publication` block (venue, URL, authors, abstract, keywords, JEL codes) promotes the entry into the Publications group and switches its structured data from `Report` to `ScholarlyArticle`.
- **The merged index**: `data/work.ts` flattens projects and research into one `WorkItem[]` for `/work`, `/research` and the home page, and defines the `groups` the index is split into. The first group is curated by an explicit `slugs` list, because what someone should look at first is an editorial call rather than a property of the artefact; the rest claim by artefact type. `groupItems()` assigns each item to the first group that claims it, so nothing appears twice. It derives everything from the two files above, so nothing is maintained twice. `featuredSlugs` picks the three items the home page leads with.
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

Both themes are driven entirely by the custom properties at the top of `app/globals.css`. There are no `dark:` variants anywhere, because every component paints with tokens (`bg-background`, `text-muted`, `border-line`, and so on). Dark mode is the same block redefined under two scopes: a `prefers-color-scheme` media query for the OS setting, and `:root[data-theme="dark"]` for the in-page toggle, which must win in both directions.

An inline script in the root layout's `<head>` stamps `data-theme` on `<html>` before first paint, so a stored preference never flashes. `components/ThemeToggle.tsx` holds no React state; which icon shows is decided by CSS from that attribute, which is why there is nothing for hydration to disagree about.

**The categorical palette is validated, not chosen by eye.** The nine `--domain-*` hues passed a lightness-band, chroma-floor, colour-vision-separation, normal-vision-separation and contrast check as an *ordered set*, against this site's own surfaces, in both themes. Reordering the array in `data/domains.ts` or editing a hex invalidates that result. Re-run the check before changing either.

## Discovery layer

- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` from the data files.
- `public/llms.txt` is a hand-maintained summary for AI crawlers. Update it when adding a project or paper.
- JSON-LD is emitted via `components/JsonLd.tsx`: `Person` in the root layout, `ScholarlyArticle`/`Report` on research pages, `SoftwareApplication`/`CreativeWork` on project pages, plus `BreadcrumbList` on both.
- The `/work` index filters through `window.location` and `history.pushState` rather than `useSearchParams`. That hook forces a Suspense boundary which partial prerendering postpones, and a postponed boundary leaves the cards out of the prerendered HTML. Reading the URL after mount keeps all of them in the static markup.

## Development

```bash
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint
npm run check:figures   # assert every plotted number is stated in the copy
```
