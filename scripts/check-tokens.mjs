import { readFileSync } from "node:fs";

/**
 * Two assertions, both guarding duplication that cannot be removed.
 *
 * 1. Every domain key declared in data/domains.ts has exactly one --domain-<key>
 *    token in app/globals.css. Nothing checked this before, which is how the
 *    ninth hue came to be declared twice in one theme block and not at all in
 *    the other: a reader who toggled to dark on a light OS got the light purple
 *    on a dark card at 2.49:1, under the 3:1 the palette was validated to.
 *
 * 2. The light values repeated in components/OgCard.tsx match :root. Satori
 *    cannot read CSS, so the social card has to carry its own copy of the
 *    palette. Duplication that cannot be removed gets checked instead of
 *    trusted, which is the same instinct as scripts/check-figures.mjs.
 */

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const css = read("app/globals.css");
const domainsTs = read("data/domains.ts");
const ogTs = read("components/OgCard.tsx");

const errors = [];

/** light-dark(#aaa, #bbb) -> ["#aaa", "#bbb"] */
function tokens(source) {
  const out = new Map();
  const re = /--([a-z0-9-]+):\s*light-dark\(\s*(#[0-9a-f]{3,8})\s*,\s*(#[0-9a-f]{3,8})\s*\)/gi;
  for (const m of source.matchAll(re)) out.set(m[1], { light: m[2], dark: m[3] });
  return out;
}

const declared = tokens(css);

// 1. every domain key has a token, and every domain token has a key
const keys = [...domainsTs.matchAll(/^\s*key:\s*"([a-z-]+)"/gm)].map((m) => m[1]);
if (keys.length === 0) {
  errors.push("data/domains.ts: parsed zero domain keys, so this check proves nothing");
}
for (const key of keys) {
  const t = declared.get(`domain-${key}`);
  if (!t) {
    errors.push(`app/globals.css: no --domain-${key} for the "${key}" domain`);
    continue;
  }
  const count = (css.match(new RegExp(`--domain-${key}\\s*:`, "g")) ?? []).length;
  if (count !== 1) {
    errors.push(`app/globals.css: --domain-${key} declared ${count} times, expected 1`);
  }
}
for (const name of declared.keys()) {
  if (!name.startsWith("domain-")) continue;
  const key = name.slice("domain-".length);
  if (!keys.includes(key)) {
    errors.push(`app/globals.css: --${name} has no matching entry in data/domains.ts`);
  }
}

// 2. the social card palette matches the light theme
const ogHex = (name) => {
  const m = ogTs.match(new RegExp(`\\b${name}:\\s*"(#[0-9a-f]{3,8})"`, "i"));
  return m?.[1]?.toLowerCase();
};
const ogDomainHex = (key) => {
  const m = ogTs.match(new RegExp(`"?${key}"?:\\s*"(#[0-9a-f]{3,8})"`, "i"));
  return m?.[1]?.toLowerCase();
};

for (const [cssName, ogName] of [
  ["background", "background"],
  ["foreground", "foreground"],
  ["muted", "muted"],
  ["muted-2", "muted2"],
  ["accent", "accent"],
  ["line", "line"],
]) {
  const want = declared.get(cssName)?.light?.toLowerCase();
  const got = ogHex(ogName);
  if (want && got && want !== got) {
    errors.push(`components/OgCard.tsx: OG.${ogName} is ${got}, but --${cssName} light is ${want}`);
  }
}
for (const key of keys) {
  const want = declared.get(`domain-${key}`)?.light?.toLowerCase();
  const got = ogDomainHex(key);
  if (!got) {
    errors.push(`components/OgCard.tsx: DOMAIN_HEX has no "${key}"`);
  } else if (want && want !== got) {
    errors.push(`components/OgCard.tsx: DOMAIN_HEX.${key} is ${got}, but --domain-${key} light is ${want}`);
  }
}

if (errors.length) {
  console.error("Token check failed:\n" + errors.map((e) => `  ${e}`).join("\n"));
  process.exit(1);
}
console.log(`Token check passed: ${keys.length} domains, palette matches the social card.`);
