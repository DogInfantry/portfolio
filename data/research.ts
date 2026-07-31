/** formal publication metadata; present only for work published at a venue */
export type Publication = {
  venue: string;
  url: string;
  authors: string[];
  date: string;
  abstract: string;
  keywords: string[];
  jel: string[];
};

export type ResearchDoc = {
  slug: string;
  title: string;
  subtitle: string;
  /** honest provenance label shown in the meta line */
  kind: string;
  pages: number;
  sizeMB: string;
  /** optional: falls back to the typographic DocCover when absent */
  cover?: string;
  file: string;
  summary: string;
  publication?: Publication;
  /** headline results, listed on the detail page */
  findings?: string[];
};

// To publish a new document: drop the PDF in public/research/ and add an entry
// here. A cover PNG in public/research/covers/ is optional; without one the
// entry renders a typographic DocCover instead.
// PPTs: export to PDF first, since browsers cannot render .pptx natively.
export const research: ResearchDoc[] = [
  {
    slug: "regulating-retail-options-boom",
    title: "Regulating the Retail Options Boom",
    subtitle: "Evidence from India's 2024–25 equity index derivatives reforms",
    kind: "SSRN working paper",
    pages: 34,
    sizeMB: "0.5 MB",
    file: "/research/regulating-retail-options-boom.pdf",
    summary:
      "A difference-in-differences evaluation of SEBI's 2024–25 index derivatives curbs, using untargeted stock options as a within-market control across a 48-month NSE and BSE panel. Index-options notional turnover fell 37–43% below its counterfactual path, premium turnover fell far less, and the smallest retail traders exited hardest.",
    publication: {
      venue: "SSRN Working Paper",
      url: "https://papers.ssrn.com/abstract=7135161",
      authors: ["Anklesh Rawat", "Shreshtha Rawat"],
      date: "July 2026",
      abstract:
        "Between October 2024 and April 2025 the Securities and Exchange Board of India (SEBI) rolled out the most aggressive package of retail derivatives curbs attempted in a major market: a package spanning weekly-expiry rationalization, a threefold increase in minimum contract size, and tighter margining and position monitoring. We assemble a 48-month panel of exchange-level turnover (April 2022 to March 2026, NSE and BSE combined) from SEBI Monthly Bulletin annexure tables and combine it with cohort-level participation data from SEBI's own studies to provide early causal evidence on the reforms. Using stock options (untargeted by the reforms) as a within-market control, a trend-adjusted difference-in-differences design implies that index-options notional turnover fell 37–43% below its counterfactual path in the six months following the first wave, while premium turnover fell far less (−13% year on year), consistent with a compositional shift away from deep out-of-the-money weekly contracts. Participation effects were large and fell hardest on the smallest traders, the mechanical incidence of a minimum contract size: unique traders fell 20% year on year, with declines of 25–36 log points concentrated in the smallest turnover cohorts (difference-in-differences estimate −47 log points, permutation-robust). We find no evidence of substitution into the cash market, which contracted alongside; substitution into products outside our panel cannot be ruled out. Aggregate turnover effects attenuate by FY2026 as activity migrated across exchanges, adapted to larger contracts, and, from January 2026, faced a rule-driven downward recalibration of lot sizes; participation effects persist through the latest available data.",
      keywords: [
        "derivatives regulation",
        "retail investors",
        "index options",
        "options trading",
        "investor protection",
        "SEBI",
        "difference-in-differences",
        "event study",
        "market microstructure",
        "India",
      ],
      jel: ["G14", "G18", "G28", "G12", "G41"],
    },
    findings: [
      "Index-options notional turnover fell 37–43% below its counterfactual path over the six months after the first reform wave; roughly a third of the raw decline reflects the concurrent market-wide contraction rather than the curbs",
      "Premium turnover fell only 13% year on year against 29% for notional, and the premium-to-notional ratio reversed a multi-year slide: the reforms changed the composition of activity more than its economic size",
      "Unique individual traders fell 20% year on year, with 25–36 log-point declines concentrated in the smallest turnover cohorts (cohort-level DiD −46.8 log points, p = 0.001)",
      "No detectable substitution into the cash market: cash average daily turnover fell 9.6% year on year, statistically indistinguishable from other untargeted segments",
      "Aggregate turnover effects proved transitory, recovering within five quarters through exchange migration and the January 2026 lot-size recalibration, while the participation contraction did not reverse",
    ],
  },
  {
    slug: "india-strategic-metals-transition",
    title: "India's Critical Minerals & Green Steel Transition",
    subtitle:
      "A strategic roadmap for securing the energy-transition value chain",
    kind: "Independent research",
    pages: 14,
    sizeMB: "16 MB",
    cover: "/research/covers/india-strategic-metals-transition.png",
    file: "/research/india-strategic-metals-transition.pdf",
    summary:
      "Maps the mid-market decarbonisation gap in Indian steel (the 200+ producers holding 45% of capacity behind the tier-1 integrated players) against the 300 MT 2030 target, critical-mineral supply chains, green-steel economics, and the financial governance needed to fund the transition.",
  },
  {
    slug: "msme-credit",
    title: "Bridging India's MSME Credit Gap",
    subtitle:
      "Account Aggregator rails, the analytical last mile, and a DPI-native RegTech execution layer",
    kind: "PolicyPreneur B-Plan Challenge · Team Dstonks",
    pages: 6,
    sizeMB: "1 MB",
    cover: "/research/covers/msme-credit.png",
    file: "/research/msme-credit.pdf",
    summary:
      "100M+ AA-linked accounts created data liquidity, yet a ₹20–25L Cr MSME credit gap persists. Proposes a white-label Technology Service Provider layer that turns raw Account Aggregator data (GST filings, UPI inflow velocity, seasonal cash flow) into probabilistic credit scores with zero balance-sheet risk.",
  },
  {
    slug: "esg-value-and-resilience",
    title: "The ESG Advantage",
    subtitle: "Forging resilience and value at RPG Life Sciences",
    kind: "Independent research",
    pages: 14,
    sizeMB: "15 MB",
    cover: "/research/covers/esg-value-and-resilience.png",
    file: "/research/esg-value-and-resilience.pdf",
    summary:
      "An ESG value case on a listed Indian pharma compounding +707% against peers while macro carbon pressure rises: quantifies a ₹5.65 Cr annual carbon-tax exposure, maps strategic materiality, and frames how to decouple financial performance from environmental impact.",
  },
  {
    slug: "river-as-a-service",
    title: "River-as-a-Service: Intelligence & Enforcement",
    subtitle:
      "From service vendor to strategic river manager, on a software-driven ecosystem",
    kind: "Independent research",
    pages: 17,
    sizeMB: "2 MB",
    cover: "/research/covers/river-as-a-service.png",
    file: "/research/river-as-a-service.pdf",
    summary:
      "A strategy roadmap for shifting river management from a hardware-centric, availability-based vendor model to a software-driven ecosystem. Diagnoses the misaligned incentives of the 'hardware trap', proposes a hybrid-intelligence contract with governance and green financing on a hub-and-spoke structure, and lays out a five-year implementation path targeting a 15% Water Quality Index gain.",
  },
  {
    slug: "eurusd-currency-analysis",
    title: "EUR/USD: Reading the Majors",
    subtitle:
      "Currency movements, trading patterns, and signals in the euro/dollar pair",
    kind: "Independent research",
    pages: 106,
    sizeMB: "10 MB",
    cover: "/research/covers/eurusd-currency-analysis.png",
    file: "/research/eurusd-currency-analysis.pdf",
    summary:
      "A concise analysis of EUR/USD currency movements: highlighting the key trading patterns and signal-based insights that shape decision-making in the forex market.",
  },
];

export function getResearchDoc(slug: string) {
  return research.find((d) => d.slug === slug);
}
