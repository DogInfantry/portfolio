/**
 * Prefix a path in `public/` with the deploy's base path.
 *
 * Next applies `basePath` to things it controls (the `_next` tree, the favicon,
 * `<Link>` hrefs) but not to paths an author writes by hand. Under the GitHub
 * Pages build that means `/screenshots/x.png` and `/research/y.pdf` resolve
 * against the domain root rather than `/portfolio/`, so every screenshot, every
 * document cover and every PDF on the site 404s.
 *
 * NEXT_PUBLIC_ variables are inlined at build time on both sides of the server
 * and client boundary, so this is a constant fold rather than a runtime lookup.
 * Outside Pages the base is empty and this returns its argument unchanged.
 *
 * Use it wherever a `public/` path reaches an `src` or an `href`. It is not
 * needed for `<Link>` to a route, and not for the absolute URLs in JSON-LD or
 * the sitemap, which are built from `site.url`.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return path.startsWith("/") ? `${BASE}${path}` : path;
}
