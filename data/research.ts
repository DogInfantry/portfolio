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
    slug: "bharti-airtel-initiation",
    domain: "equities",
    title: "Bharti Airtel: Initiation of Coverage",
    subtitle:
      "India's best telecom franchise, close to a fair price. Valued part by part, initiated 8 Oct 2026",
    kind: "Independent equity research",
    pages: 15,
    sizeMB: "0.6 MB",
    cover: "/research/covers/bharti-airtel-initiation.png",
    file: "/research/bharti-airtel-initiation.pdf",
    summary:
      "A sell-side style initiation on Bharti Airtel, valued part by part: India mobile, Airtel Africa (79.11% owned), Indus Towers and Bharti Hexacom. The franchise leads Indian telecom on price per customer, margin and returns, but at Rs 1,833 the market already prices India ARPU growth of 9.5% a year to FY31, against 5.7% in the forecast. Three dated outcomes, weighted 30% / 43% / 27%, give a 12-month target of Rs 1,946, 6.2% above the price and inside the HOLD band. Written in the style of the CFA Institute Research Challenge; not an entry, not reviewed by CFA Institute, and not investment advice.",
    metrics: [
      {
        value: "HOLD · Rs 1,946",
        label: "12-month target, 6.2% above the 7 Oct 2026 price",
      },
      { value: "Rs 1,338", label: "DCF by part, 27.0% below the price" },
      {
        value: "7.8%",
        label: "expected total return, including the FY27 dividend",
      },
    ],
    findings: [
      "India mobile is the best franchise in the market. ARPU of Rs 263.9 a month is 22% above Jio's, and in FY26 the segment earned a 60.2% EBITDA margin and 18.7% after tax on its net segment assets, against an India WACC of 9.96%",
      "The price needs more tariff repair than the forecast allows. Run through the model, Rs 1,833 requires India ARPU to grow 9.5% a year to FY31, the equivalent of 1.1 more tariff steps the size of July 2024's. The forecast already includes one repair, 5% in FY28 and 3% in FY29, and grows ARPU 5.7% a year; management guides to 4% or 5% from mix",
      "The rule that changes the call is printed in advance. A Jio Platforms price band midpoint above US$147 bn makes Bharti a BUY; one below US$121 bn takes the target to Rs 1,720, still a HOLD. The Q1 FY28 results, due by 14 Aug 2027, are the second dated test",
      "HOLD holds across the weights. Bear is Rs 1,709 at 30%, base Rs 1,947 at 43%, bull Rs 2,209 at 27%. SELL is out of reach at any pair of weights, and BUY needs a bull weight of 61% with no bear",
      "The gap to the street is the multiple, not the forecast. Consensus from 34 analysts is a Buy at Rs 2,317. FY28E EBITDA sits close to Motilal Oswal's, the only full public forecast, and EPS 8.0% below it",
    ],
    figures: [
      {
        kind: "bars",
        caption:
          "The three outcomes for 7 Oct 2027 against the price, in rupees a share. Each is a multiple of India EBIT tied to a dated event. Weighted, they give the target, 6.2% above the price and inside the HOLD band of -10% to +15%; the base case of Rs 1,947 sits on the target and is left off.",
        source: "Finding 4 and the metrics above; the report's Figure 1",
        data: [
          { label: "Bear, 30%", value: 1709, display: "Rs 1,709" },
          { label: "Price, 7 Oct 2026", value: 1833, display: "Rs 1,833" },
          {
            label: "Target, 12 months",
            value: 1946,
            display: "Rs 1,946",
            emphasis: true,
          },
          { label: "Bull, 27%", value: 2209, display: "Rs 2,209" },
        ],
      },
      {
        kind: "bars",
        caption:
          "Three answers to what a share is worth. The DCF by part, at an India WACC of 9.96%, sits 27.0% below the price and the street sits above it. The gap to the DCF is a view on the cost of capital rather than on the forecast, which is why the target weights dated outcomes instead.",
        source:
          "Metrics above and finding 5; consensus from MarketScreener, 34 analysts, 6 Oct 2026",
        data: [
          { label: "DCF by part, today", value: 1338, display: "Rs 1,338" },
          {
            label: "Target, 12 months",
            value: 1946,
            display: "Rs 1,946",
            emphasis: true,
          },
          { label: "Consensus, 34 analysts", value: 2317, display: "Rs 2,317" },
        ],
      },
    ],
  },
  {
    slug: "nephroplus-initiation",
    domain: "equities",
    title: "NephroPlus: Initiation of Coverage",
    subtitle:
      "India's largest dialysis chain: a growth stock's multiple on prices the government sets",
    kind: "Independent equity research",
    pages: 15,
    sizeMB: "0.6 MB",
    cover: "/research/covers/nephroplus-initiation.png",
    file: "/research/nephroplus-initiation.pdf",
    summary:
      "HOLD, with a 12-month target of Rs 605, 6.8% below the 1 Oct close of Rs 649, on India's largest dialysis chain. The market pays a growth stock's multiple, but 76.5% of patients are on public insurance and published scheme and tender rates reproduce about nine tenths of an Indian session. The network runs 550 clinics for 38,262 patients, with 45% of revenue abroad. Built from clinic-level returns, a DCF, peer multiples and a Monte Carlo; the DCF puts intrinsic value at Rs 365, three outcomes for September 2027 set the target, and the report keeps the two numbers apart. An independent student exercise in the format of the CFA Institute Research Challenge; not investment advice.",
    metrics: [
      {
        value: "HOLD · Rs 605",
        label: "12-month target, 6.8% below the 1 Oct 2026 close",
      },
      { value: "Rs 365", label: "DCF value today, 44% below the price" },
      {
        value: "9.3%",
        label: "after-tax return on a captive clinic, against a 10.9% cost of capital",
      },
    ],
    findings: [
      "Government payers set the price. India realisation went from Rs 1,787 in FY25 to Rs 1,802 in Q1FY27, so the rise in group realisation is mix rather than pricing power",
      "Indian growth barely clears its cost of capital. A captive clinic earns 9.3% after tax against 10.9% and a PPP clinic 2.3%. FY27 free cash flow is Rs 5 cr after acquisitions; on I-Sec's definition, which leaves them out, the report gets Rs 74 cr against I-Sec's Rs 118 cr",
      "Cheap on EBITDA, dear on EBIT. Against six Indian hospital chains the stock trades at 26.2x EV/EBITDA against 30.1x and 44.0x EV/EBIT against 38.7x, with the heaviest depreciation in the set at 9.1% of revenue",
      "The DCF and the target answer different questions. Only 157 of 10,000 Monte Carlo draws reach the price, yet a simple version of the same DCF puts seven listed peers at 17% to 36% of market value, so the gap is partly about the lens. It enters the target once, as the bear case",
      "The rule that changes the call is stated. Bear Rs 405 at 35%, base Rs 660 at 45%, bull Rs 829 at 20%. SELL needs 43% on the bear, and at the 15 Sep price of Rs 735 the call would have been a SELL. Investing.com consensus is Rs 848 from 4 analysts. Q2FY27 results, due by 14 November, are the first test",
    ],
    figures: [
      {
        kind: "bars",
        caption:
          "Where every number sits, in rupees a share. The DCF is intrinsic value today; the three outcomes are for September 2027 and, weighted, give the target, 6.8% below the price and inside the HOLD band of -10% to +15%. The base case sits above the price and the target below it because the bear case carries 35%.",
        source: "The metrics above and findings 4 and 5; the report's Figure 1",
        data: [
          { label: "DCF value, today", value: 365, display: "Rs 365" },
          { label: "Bear, 35%", value: 405, display: "Rs 405" },
          {
            label: "Target, 12 months",
            value: 605,
            display: "Rs 605",
            emphasis: true,
          },
          { label: "Price, 1 Oct 2026", value: 649, display: "Rs 649" },
          { label: "Base, 45%", value: 660, display: "Rs 660" },
          { label: "Bull, 20%", value: 829, display: "Rs 829" },
          { label: "Consensus, 4 analysts", value: 848, display: "Rs 848" },
        ],
      },
    ],
  },
  {
    slug: "india-markets-monthly-oct-2026",
    domain: "macro",
    title: "India Markets Monthly: Bonds Have Stopped Hedging Equities",
    subtitle:
      "October 2026 sample desk note on rates, FX, flows and external funding",
    kind: "Illustrative work sample",
    pages: 14,
    sizeMB: "0.5 MB",
    cover: "/research/covers/india-markets-monthly-oct-2026.png",
    file: "/research/india-markets-monthly-oct-2026.pdf",
    summary:
      "A sample monthly note, written from public data as a bank research desk would write it: Indian bonds have stopped cushioning falls in equities. The correlation of daily returns between the Nifty 50 and the 10 year G-sec index is 0.45 this year against 0.07 in 2025, and the bond index fell on all 5 days since July when the Nifty fell more than 1%. The note covers rates, FX, flows and the balance of payments, sets three oil-led scenarios to March 2027 and ends with five dated range calls for 30 November. The bank is illustrative and the desk forecasts are marked as drafts; not investment research or advice.",
    metrics: [
      {
        value: "0.07 to 0.45",
        label: "Nifty and G-sec return correlation, 2025 to 2026",
      },
      {
        value: "$136.4 bn",
        label: "raised by the RBI swap window, over three times the desk's deficit estimate",
      },
      {
        value: "1.0% / 1.5%",
        label: "FY27 current account deficit, desk against IMF",
      },
    ],
    findings: [
      "Bonds no longer cushion falls in equities. Across the 5 falls since July the Nifty 50 averaged -1.64% a day and the G-sec index -0.41%",
      "The deficit is an oil bill. Outside oil India earns a current account surplus of about $95 bn a year, and each $10 on Brent adds about $14.7 bn. The desk sees 1.0% of GDP for FY27 against the IMF's 1.5%",
      "The RBI is tightening with the rate and with liquidity. The repo rate rose 25 bps to 5.50% on 7 October. The desk expects one more hike, to 5.75% in December, while one year OIS at 6.25% prices more",
      "The balance of payments is funded with borrowed dollars. The swap window's $136.4 bn compares with a base deficit of $42.0 bn, a downside of $74.1 bn, the IMF's $60.9 bn and the 2013 window's $26.0 bn. Net forward sales reached $200.1 bn, 27% of reserves, with repayments running from 2029 to 2031",
      "Oil decides the path to March 2027. Base 55%, upside 20%, downside 25% puts USD/INR at 97.5, 94.5 and 101.5 and the 10 year G-sec at 7.25%, 6.85% and 7.85%",
    ],
    figures: [
      {
        kind: "bars",
        caption:
          "What the RBI's swap window raised to 31 August against the FY27 deficit it has to fund, in US$ bn. The window covers even the desk's downside, which is why the note calls the balance of payments funded, and it does so with borrowed dollars that come due from 2029.",
        source: "Finding 4; the report's slide 11, from RBI and IMF data",
        data: [
          {
            label: "Swap window, to 31 Aug",
            value: 136.4,
            display: "$136.4 bn",
            emphasis: true,
          },
          { label: "Desk downside deficit", value: 74.1, display: "$74.1 bn" },
          { label: "IMF deficit, 1.5% of GDP", value: 60.9, display: "$60.9 bn" },
          { label: "Desk base deficit", value: 42.0, display: "$42.0 bn" },
          { label: "2013 FCNR(B) window", value: 26.0, display: "$26.0 bn" },
        ],
      },
    ],
  },
  {
    slug: "maha-navonmesh-tgc-2026",
    domain: "policy",
    title: "Maha Navonmesh: Wiring Maharashtra's Innovation Money",
    subtitle:
      "One pipeline to test, buy and scale deep tech by 2035, on money already earmarked",
    kind: "The Governance Challenge 2026 · submission",
    pages: 30,
    sizeMB: "1.3 MB",
    cover: "/research/covers/maha-navonmesh-tgc-2026.png",
    file: "/research/maha-navonmesh-tgc-2026.pdf",
    summary:
      "A solution deck for The Governance Challenge 2026: Maharashtra earmarks about ₹2,920 Cr a year for innovation, 234 times the ₹12.5 Cr reaching startups as pilot orders. The proposed mission connects that money into one pipeline with six levers, one per lifecycle stage, run through MSInS and MITRA with no new agency or tax. It costs ₹1,125 Cr a year at full run, 52% of the 0.5% departmental earmark, and is applied to all six challenge sectors. Budget figures are sourced; model inputs and scores are labelled as assumptions or the author's assessment.",
    metrics: [
      {
        value: "234x",
        label: "the ₹2,920 Cr earmark against the ₹12.5 Cr reaching startups as pilot orders",
      },
      {
        value: "₹1,125 Cr",
        label: "proposed yearly cost at full run, 52% of the 0.5% earmark",
      },
      {
        value: "90% / 25%",
        label: "political salience against system capacity, on the Governance Matrix",
      },
    ],
    findings: [
      "The money exists but has no route. The 0.5% departmental rule gives ₹2,155 Cr and the 3.5% district plan share ₹765 Cr, and pilot orders take 0.4% of that pool",
      "State instruments stop short of buying. Across nine instruments since 2025, stage scores out of 18 are Conceive 5, Research 8, Test 4, Fund 7, Adopt 2 and Scale 3, and pilots stop at ₹25 lakh with the next order needing a fresh tender",
      "The state has will without capacity. It scores 90% on political salience and 25% on system capacity, a Shooting Star on Samagra's Governance Matrix, and the six levers move capacity from 3 to 11 points of 12",
      "Pilot to Purchase is the central rule. Phases run to ₹25 lakh, ₹1.5 Cr and ₹25 Cr, with no fresh tender for the last if verified KPIs are met. 300 feasibility awards lead to 30 scale orders a year, 10% end to end against 58 of 548 (10.6%) at iDEX",
      "The plan is tested against its own limits. With every cost assumption high it runs ₹1,580 Cr, 73% of the earmark. Four of five feasibility tests pass outright; delivery at scale passes only once DGCA and CDSCO agreements are signed",
    ],
    figures: [
      {
        kind: "bars",
        caption:
          "How well nine state instruments cover each lifecycle stage, scored out of 18 from the policy texts. Research and funding are best covered; buying what has been tested scores lowest. The scores measure what the texts say rather than what is spent, and are the author's assessment on a stated rule.",
        source: "Finding 2; the deck's slide 4",
        data: [
          { label: "Conceive", value: 5, display: "5 of 18" },
          { label: "Research", value: 8, display: "8 of 18" },
          { label: "Test", value: 4, display: "4 of 18" },
          { label: "Fund", value: 7, display: "7 of 18" },
          { label: "Adopt", value: 2, display: "2 of 18", emphasis: true },
          { label: "Scale", value: 3, display: "3 of 18" },
        ],
      },
    ],
  },
  {
    slug: "cipla-point-of-care-diagnostics",
    domain: "product",
    title: "Cipla: A Point of Care Diagnostics Business",
    subtitle:
      "Turning prescriber reach into test and treat, on ₹954 Cr of capital, 10% of net cash",
    kind: "Cipla Ascend Season 2 · Round 1 submission",
    pages: 5,
    sizeMB: "0.5 MB",
    cover: "/research/covers/cipla-point-of-care-diagnostics.png",
    file: "/research/cipla-point-of-care-diagnostics.pdf",
    summary:
      "A Round 1 case submission for Cipla Ascend Season 2, recommending that Cipla build a point of care diagnostics business on its prescriber reach. The base case reaches ₹615 Cr of FY32 revenue (range ₹307 to 1,048 Cr) at a 19% EBITDA margin, with breakeven in FY30, on ₹954 Cr of capital over five years. Judgement scores and model inputs are labelled assumptions, and the plan starts with a 50 clinic pilot to replace them with measured values.",
    metrics: [
      {
        value: "₹615 Cr",
        label: "FY32 revenue, base case, on labelled assumptions",
      },
      { value: "19%", label: "FY32 EBITDA margin, breakeven in FY30" },
      { value: "26 of 30", label: "point of care kits in a five segment screen" },
    ],
    findings: [
      "Point of care is where a pharma channel wins. On six criteria it scores 26 of 30, against 20 for lung clinics, 17 for path labs, 13 for multispecialty hospitals and 10 for implants and consumables",
      "India is the engine. In Q2 FY27 India grew 12% while group revenue fell 2% and North America fell 19%, and net cash of ₹9,823 Cr covers the five year plan 10.3 times",
      "The base case stays below listed peers. Its 19% margin compares with Molbio at 22.2%, Metropolis at 24.4% and Dr Lal PathLabs at 28.3%, with cartridges reaching 63% of revenue and ₹187 Cr a year of pharma revenue pulled through by FY32",
      "Idle analysers are the risk to manage first. Molbio's utilisation is 42.3%, so analysers are placed only where clinics commit to 3 tests a day",
      "Capital is released through gates. A 50 clinic pilot reads out by March 2027, 4,000 analysers at 3.5 tests a day are due by FY29, and any acquisition waits until after breakeven",
    ],
    figures: [
      {
        kind: "bars",
        caption:
          "Five healthcare segments scored on growth, margin, capital needs, channel fit, price freedom and pharma pull, out of 30. The scores are judgement readings of the evidence rather than survey data.",
        source: "Finding 1; the deck's first slide after the title",
        data: [
          {
            label: "Point of care kits",
            value: 26,
            display: "26 of 30",
            emphasis: true,
          },
          { label: "Lung clinics", value: 20, display: "20 of 30" },
          { label: "Path labs", value: 17, display: "17 of 30" },
          { label: "Multispecialty hospitals", value: 13, display: "13 of 30" },
          { label: "Implants and consumables", value: 10, display: "10 of 30" },
        ],
      },
    ],
  },
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
