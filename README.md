# Anklesh Rawat — Portfolio

Investment research, strategy, and publications. Next.js 16 + Tailwind 4, deployed on Vercel.

## Editing content

All content lives in `data/`. No CMS.

- **Site-wide facts** (canonical URL, email, social links): `data/site.ts`. `metadataBase`, the sitemap, robots.txt, JSON-LD, and every visible contact link read from here, so changing an email or domain is a one-line edit.
- **Projects**: `data/projects.ts`. A project needs either a `live` URL, a `github` URL, or a `doc` (PDF path) as its artefact. With a `screenshot` it renders in a browser frame; without one, a `doc`-backed project falls back to a typographic `DocCover`.
- **Research and publications**: `data/research.ts`. Drop the PDF in `public/research/` and add an entry. A cover PNG in `public/research/covers/` is optional; entries without one render a `DocCover` instead. Adding a `publication` block (venue, URL, authors, abstract, keywords, JEL codes) promotes the entry into the Publications group and switches its structured data from `Report` to `ScholarlyArticle`.
- PPTs: export to PDF first, since browsers cannot render `.pptx` natively.

Every research entry automatically gets an indexable page at `/research/<slug>` and a sitemap row. Nothing else needs touching.

## Discovery layer

- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt` from the data files.
- `public/llms.txt` is a hand-maintained summary for AI crawlers. Update it when adding a project or paper.
- JSON-LD is emitted via `components/JsonLd.tsx`: `Person` in the root layout, `ScholarlyArticle`/`Report` on research pages, `SoftwareApplication`/`CreativeWork` on project pages, plus `BreadcrumbList` on both.

## Development

```bash
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint
```
