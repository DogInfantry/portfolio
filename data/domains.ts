/**
 * The subject taxonomy. One entry per domain actually present in the work, in a
 * fixed slot order.
 *
 * The order is not cosmetic: these eight hues were chosen as a categorical
 * palette and validated as an ordered set (lightness band, chroma floor,
 * adjacent-pair colour-vision separation, normal-vision separation, and contrast
 * against both surfaces). Reordering the array or editing a hex invalidates that
 * result, so re-run the check before changing either.
 *
 * The hue is exposed as a CSS variable rather than a literal so light and dark
 * steps swap in one place; see the --domain-* tokens in app/globals.css.
 */
export const domains = [
  {
    key: "credit",
    label: "Credit",
    blurb: "Covenant surveillance, private credit, MSME lending",
  },
  {
    key: "macro",
    label: "Macro & Markets",
    blurb: "Capital markets, sovereign risk, currencies",
  },
  {
    key: "equities",
    label: "Equities",
    blurb: "Valuation, comparables, sell-side research workflow",
  },
  {
    key: "product",
    label: "Product & Strategy",
    blurb: "Product cases, prioritization, go-to-market, roadmaps",
  },
  {
    key: "quant",
    label: "Quant Research",
    blurb: "Regime models, backtests, causal testing",
  },
  {
    key: "sustainable",
    label: "Sustainable Finance",
    blurb: "Green issuance, transition capital, ESG value cases",
  },
  {
    key: "climate",
    label: "Climate Macro",
    blurb: "ENSO cycles, commodity exposure, physical risk",
  },
  {
    key: "market-structure",
    label: "Market Structure",
    blurb: "Derivatives regulation, microstructure, policy evaluation",
  },
  {
    key: "policy",
    label: "Public Policy",
    blurb: "Social protection delivery, administrative burden, take-up",
  },
] as const;

export type DomainKey = (typeof domains)[number]["key"];

const byKey = new Map(domains.map((d) => [d.key, d]));

export function getDomain(key: DomainKey) {
  // every key is present by construction; the non-null assertion keeps callers
  // free of a null check they can never hit
  return byKey.get(key)!;
}

/** The CSS variable holding this domain's hue for the active theme. */
export function domainVar(key: DomainKey) {
  return `var(--domain-${key})`;
}
