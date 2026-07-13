export type ResearchDoc = {
  slug: string;
  title: string;
  subtitle: string;
  /** honest provenance label shown in the meta line */
  kind: string;
  pages: number;
  sizeMB: string;
  cover: string;
  file: string;
  summary: string;
};

// To publish a new document: drop the PDF in public/research/,
// add a cover PNG in public/research/covers/, and add an entry here.
// PPTs: export to PDF first — browsers cannot render .pptx natively.
export const research: ResearchDoc[] = [
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
      "Maps the mid-market decarbonisation gap in Indian steel — the 200+ producers holding 45% of capacity behind the tier-1 integrated players — against the 300 MT 2030 target, critical-mineral supply chains, green-steel economics, and the financial governance needed to fund the transition.",
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
      "100M+ AA-linked accounts created data liquidity, yet a ₹20–25L Cr MSME credit gap persists. Proposes a white-label Technology Service Provider layer that turns raw Account Aggregator data — GST filings, UPI inflow velocity, seasonal cash flow — into probabilistic credit scores with zero balance-sheet risk.",
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
];
