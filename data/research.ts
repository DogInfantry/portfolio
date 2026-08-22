import type { DomainKey } from "./domains";
import type { Figure } from "./figures";
import type { Metric } from "./projects";

/** formal publication metadata; present only for work published at a venue */
export type Publication = {
  venue: string;
  url: string;
  authors: string[];
  date: string;
  abstract: string;
  keywords: string[];
  /** present only where the venue or the author assigned them */
  jel?: string[];
};

export type ResearchDoc = {
  slug: string;
  title: string;
  subtitle: string;
  /** subject area; shares the taxonomy and the colour with projects */
  domain: DomainKey;
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
  /** headline numbers, shown on the card and above the summary */
  metrics?: Metric[];
  /** charts; same rule as projects, every number is one already stated here */
  figures?: Figure[];
};

// To publish a new document: drop the PDF in public/research/ and add an entry
// here. A cover PNG in public/research/covers/ is optional; without one the
// entry renders a typographic DocCover instead.
// PPTs: export to PDF first, since browsers cannot render .pptx natively.
export const research: ResearchDoc[] = [
  {
    slug: "regulating-retail-options-boom",
    domain: "market-structure",
    title: "Regulating the Retail Options Boom",
    subtitle: "Evidence from India's 2024–25 equity index derivatives reforms",
    kind: "SSRN working paper",
    pages: 34,
    sizeMB: "0.5 MB",
    file: "/research/regulating-retail-options-boom.pdf",
    summary:
      "A difference-in-differences evaluation of SEBI's 2024–25 index derivatives curbs, using untargeted stock options as a within-market control across a 48-month NSE and BSE panel. Index-options notional turnover fell 37–43% below its counterfactual path, premium turnover fell far less, and the smallest retail traders exited hardest.",
    metrics: [
      { value: "37–43%", label: "index-options notional below counterfactual" },
      { value: "-20%", label: "unique individual traders, year on year" },
      { value: "48", label: "months of NSE and BSE panel data" },
    ],
    figures: [
      {
        kind: "bars",
        unit: "%",
        caption:
          "Decline by segment after the first reform wave. The index-options notional figure is measured against its counterfactual path; the other three are year-on-year changes over the same window, so the bases differ and the chart is a comparison of magnitudes rather than of like with like. The targeted segment moved most, and premium turnover moved far less than notional, which is the compositional shift the paper argues for.",
        source:
          "Findings 1, 2 and 4 below, plus the participation result in finding 3",
        data: [
          {
            label: "Index-options notional turnover",
            value: 40,
            range: [37, 43],
            display: "-37 to -43%",
            emphasis: true,
          },
          { label: "Unique individual traders", value: 20, display: "-20%" },
          { label: "Premium turnover", value: 13, display: "-13%" },
          { label: "Cash market daily turnover", value: 9.6, display: "-9.6%" },
        ],
      },
      {
        kind: "bars",
        caption:
          "Participation decline by trader size. A minimum contract size falls mechanically hardest on the smallest traders, and the cohort-level difference-in-differences estimate is larger than any raw cohort decline, which is what separates the reform's effect from the market-wide contraction running alongside it.",
        source:
          "Finding 3 below: 25 to 36 log-point declines in the smallest cohorts, cohort-level DiD -46.8 log points, p = 0.001",
        data: [
          {
            label: "Cohort-level DiD estimate",
            value: 46.8,
            display: "-46.8 log pts",
            emphasis: true,
          },
          {
            label: "Smallest turnover cohorts",
            value: 30.5,
            range: [25, 36],
            display: "-25 to -36 log pts",
          },
        ],
      },
    ],
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
    slug: "awareness-without-uptake",
    domain: "policy",
    title: "Awareness Without Uptake",
    subtitle:
      "Administrative burden and delivery architecture across four co-located social protection schemes in rural India",
    kind: "SSRN working paper",
    pages: 19,
    sizeMB: "0.3 MB",
    file: "/research/awareness-without-uptake.pdf",
    summary:
      "Four government schemes, measured in the same 51 households in one round, so poverty, literacy and distance are held constant by construction. Awareness is high and flat. What varies is conversion into actual receipt, and it varies with where enrolment has to be completed rather than with how well the scheme is known.",
    publication: {
      venue: "SSRN Working Paper",
      url: "https://papers.ssrn.com/abstract=7239538",
      authors: ["Anklesh Rawat"],
      date: "August 2026",
      abstract:
        "Background. Under-utilisation of targeted entitlements in rural India is routinely attributed to information deficits, and the information campaign is the default policy response. That attribution is difficult to test, because utilisation is almost always studied one scheme at a time and compared across populations, which confounds the delivery architecture of a scheme with the characteristics of the people receiving it. This study asks what constrains utilisation once awareness is close to universal. Methods. Cross-sectional household survey in Bodh Gaya block, Gaya district, Bihar, January 2025, in a village saturated by a resident community intermediary. Fifty-one households reported awareness and utilisation of four co-located schemes: JEEViKA (livelihoods), PDS (food), ICDS (child nutrition) and AB-PM-JAY (hospital insurance). Measuring all four schemes in the same households in a single round holds demand side characteristics such as poverty, literacy and distance constant by construction, so that remaining variation is attributable to how each scheme is administered. We define entitlement conversion as utilisation divided by awareness, a descriptive diagnostic of the compliance costs a household faces after it knows a benefit exists, and report 95% Wilson score intervals with bootstrap intervals for the ratio. Results. Awareness was high and comparatively flat, from 64.7% (PDS; 95% CI 51.0–76.4) to 100% (JEEViKA; 93.0–100.0). Conversion varied far more. The three schemes obtained at a point inside the village converted at 0.79 to 0.98. AB-PM-JAY, which requires documented enrolment at an office outside the village, converted at 0.42 (0.26–0.58) despite being better known than PDS; receipt of this scheme is episodic and partly reflects need for inpatient care, which we address in the limitations. Among 26 households not receiving benefits, the barriers reported most often were procedural complexity (69.2%) and administrative distance (57.7%); lack of information ranked third (30.8%) and none attributed exclusion to the intermediary. Ninety-four per cent named the resident JEEViKA worker as their information source for all four schemes, including three she does not administer. Conclusions. Where a resident intermediary has achieved near-universal reach, the observed loss occurs after the household knows a scheme and before it obtains the benefit, and is associated with where enrolment must be completed and what documents it requires rather than with how well the scheme is known. The design cannot identify why awareness is high, so this speaks to the current margin rather than to campaign effectiveness. Comparing schemes within households converts a question about populations into a question about architectures, which is the object policy can act on.",
      keywords: [
        "social protection",
        "administrative burden",
        "benefit take-up",
        "compliance costs",
        "delivery architecture",
        "public service delivery",
        "Ayushman Bharat PM-JAY",
        "Public Distribution System",
        "community health workers",
        "rural India",
      ],
    },
    metrics: [
      {
        value: "0.42",
        label: "AB-PM-JAY conversion, against 0.79 to 0.98 in-village",
      },
      {
        value: "69.2%",
        label: "named procedural complexity, against 30.8% naming information",
      },
      { value: "4", label: "schemes measured in the same 51 households" },
    ],
    findings: [
      "Awareness was high and comparatively flat across all four schemes, from 64.7% for PDS to 100% for JEEViKA. Conversion of that awareness into actual receipt varied far more",
      "The three schemes obtainable at a point inside the village converted at 0.79 to 0.98. AB-PM-JAY, which requires documented enrolment at an office outside it, converted at 0.42 despite being better known than PDS",
      "Among the 26 households receiving no benefit, procedural complexity (69.2%) and administrative distance (57.7%) were the barriers named most often; lack of information ranked third at 30.8%, and none attributed exclusion to the intermediary",
      "94% named the same resident JEEViKA worker as their information source for all four schemes, including the three she does not administer",
      "Measuring four schemes in the same households holds poverty, literacy and distance constant by construction, so the remaining variation is attributable to how each scheme is administered rather than to who is receiving it",
    ],
    figures: [
      {
        kind: "bars",
        caption:
          "Entitlement conversion, utilisation divided by awareness, for four co-located schemes measured in the same 51 households. The scheme requiring documented enrolment at an office outside the village converts at roughly half the rate of the three obtainable inside it, despite being better known than one of them.",
        source:
          "Findings 1 and 2 below: in-village schemes convert at 0.79 to 0.98, AB-PM-JAY at 0.42",
        data: [
          {
            label: "Schemes obtained inside the village",
            value: 0.885,
            range: [0.79, 0.98],
            display: "0.79 to 0.98",
          },
          {
            label: "AB-PM-JAY, enrolment outside the village",
            value: 0.42,
            display: "0.42",
            emphasis: true,
          },
        ],
      },
      {
        kind: "bars",
        unit: "%",
        caption:
          "Barriers named by the 26 households receiving no benefit from any of the four schemes. The information deficit that the default policy response targets ranks third. These items were asked of households receiving nothing rather than scheme by scheme, so they describe friction in this setting rather than in any one scheme.",
        source:
          "Finding 3 below: procedural complexity 69.2%, administrative distance 57.7%, lack of information 30.8%",
        data: [
          {
            label: "Procedural complexity",
            value: 69.2,
            display: "69.2%",
            emphasis: true,
          },
          { label: "Administrative distance", value: 57.7, display: "57.7%" },
          { label: "Lack of information", value: 30.8, display: "30.8%" },
        ],
      },
    ],
  },
  {
    slug: "india-strategic-metals-transition",
    domain: "sustainable",
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
    metrics: [
      { value: "300 MT", label: "2030 steel capacity target" },
      { value: "200+", label: "mid-market producers mapped" },
      { value: "45%", label: "of capacity outside the tier-1 players" },
    ],
  },
  {
    slug: "msme-credit",
    domain: "credit",
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
    metrics: [
      { value: "₹20–25L Cr", label: "MSME credit gap" },
      { value: "100M+", label: "Account Aggregator linked accounts" },
    ],
  },
  {
    slug: "esg-value-and-resilience",
    domain: "sustainable",
    title: "The ESG Advantage",
    subtitle: "Forging resilience and value at RPG Life Sciences",
    kind: "Independent research",
    pages: 14,
    sizeMB: "15 MB",
    cover: "/research/covers/esg-value-and-resilience.png",
    file: "/research/esg-value-and-resilience.pdf",
    summary:
      "An ESG value case on a listed Indian pharma compounding +707% against peers while macro carbon pressure rises: quantifies a ₹5.65 Cr annual carbon-tax exposure, maps strategic materiality, and frames how to decouple financial performance from environmental impact.",
    metrics: [
      { value: "+707%", label: "share performance against peers" },
      { value: "₹5.65 Cr", label: "annual carbon-tax exposure quantified" },
    ],
  },
  {
    slug: "river-as-a-service",
    domain: "product",
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
    metrics: [
      { value: "15%", label: "targeted Water Quality Index gain" },
      { value: "5 years", label: "implementation path" },
    ],
  },
  {
    slug: "eurusd-currency-analysis",
    domain: "macro",
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
