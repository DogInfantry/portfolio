import type { DomainKey } from "./domains";

/**
 * The CSS variable holding a domain's hue for the active theme.
 *
 * This lives in its own module because the client components import it, and the
 * import above is type only, so it is erased at build. Importing the same
 * helper from data/domains.ts would pull that whole module, and with it the
 * labels and blurbs, into the client graph for the sake of one template string.
 */
export function domainVar(key: DomainKey) {
  return `var(--domain-${key})`;
}
