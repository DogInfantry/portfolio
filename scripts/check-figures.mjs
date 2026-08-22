/**
 * Provenance check for every chart on the site.
 *
 * The site makes one promise about its figures: every number plotted is a
 * number already stated in the surrounding copy. That promise is easy to keep
 * by hand today and easy to break in six months, so it is checked here instead
 * of trusted.
 *
 * For each figure, every numeric token in a plotted value must also appear in
 * that item's own prose (highlights, findings, summary, metrics, tagline). A
 * figure that plots a number nobody wrote down fails the run.
 *
 *   node scripts/check-figures.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * The data files are TypeScript, so rather than adding a compile step this
 * reads them as text and pulls out the two things the check needs: the prose
 * of each entry, and the figures attached to it. Entries are split on the
 * top-level `slug:` key, which every project and document has exactly one of.
 */
function entries(file) {
  const src = readFileSync(join(root, "data", file), "utf8");
  const parts = src.split(/\n  \{\n    slug: "/).slice(1);
  return parts.map((p) => ({
    slug: p.slice(0, p.indexOf('"')),
    text: p,
  }));
}

/** numeric tokens, keeping decimals and comma groups together */
const numbers = (s) => s.match(/\d[\d,]*(?:\.\d+)?/g) ?? [];

/**
 * Plotted values, taken from the `display` strings inside each figure block.
 * `display` is what the reader actually sees next to the mark, so it is the
 * right thing to hold to account.
 */
function plotted(text) {
  const figuresAt = text.indexOf("figures: [");
  if (figuresAt === -1) return [];
  const region = text.slice(figuresAt);
  const out = [];
  for (const m of region.matchAll(/display: "([^"]+)"/g)) out.push(m[1]);
  return out;
}

/** the entry's prose, with the figure block removed so it cannot vouch for itself */
function prose(text) {
  const figuresAt = text.indexOf("figures: [");
  if (figuresAt === -1) return text;
  return text.slice(0, figuresAt) + text.slice(text.indexOf("],", figuresAt));
}

let failures = 0;
let checked = 0;

for (const file of ["projects.ts", "research.ts"]) {
  for (const { slug, text } of entries(file)) {
    const values = plotted(text);
    if (values.length === 0) continue;

    // a figure without a source line is a failure on its own
    const region = text.slice(text.indexOf("figures: ["));
    const captions = [...region.matchAll(/caption:/g)].length;
    const sources = [...region.matchAll(/source:/g)].length;
    if (captions !== sources) {
      console.error(`FAIL ${slug}: ${captions} captions but ${sources} sources`);
      failures++;
    }

    const copy = prose(text);
    for (const value of values) {
      for (const n of numbers(value)) {
        checked++;
        // "1.40" is printed with the trailing zero but stored as 1.4, so the
        // trimmed form counts as a match too
        const trimmed = n.includes(".")
          ? n.replace(/0+$/, "").replace(/\.$/, "")
          : n;
        if (!copy.includes(n) && !copy.includes(trimmed)) {
          console.error(
            `FAIL ${slug}: plots "${value}" but ${n} appears nowhere in its own copy`
          );
          failures++;
        }
      }
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} figure(s) plot numbers not stated in the copy.`);
  process.exit(1);
}
console.log(`OK: ${checked} plotted numbers, all traced to the copy.`);
