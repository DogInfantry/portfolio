import type { DomainKey } from "./domains";
import type { Figure } from "./figures";

export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  /** subject area; the human label and the colour both come from data/domains.ts */
  domain: DomainKey;
  /** one contextualized coverage fact, phrased as what the tool does */
  fact: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string;
  highlights: string[];
  metrics: Metric[];
  stack: string[];
  live?: string;
  github?: string;
  screenshot?: string;
  /** PDF path, for case studies whose artefact is a deck rather than an app */
  doc?: string;
  docLabel?: string;
  /** preview image for doc-backed work; rendered plain, without browser chrome */
  cover?: string;
  /**
   * Card-only image. The best thing to put on an index card is often not the
   * best thing to put at the top of the case study: a chart from the analysis
   * sells the work in a grid, while the case study still wants the screenshot
   * of the running app. Set this when the two should differ.
   */
  thumbnail?: string;
  /**
   * Charts for the case-study page. Every figure plots numbers already stated
   * in this file, and its required source field names the statement it came
   * from. Work whose copy states only counts carries no figure and leans on
   * metrics instead, rather than inventing a series to fill the space.
   */
  figures?: Figure[];
};

export const projects: Project[] = [
  {
    slug: "india-widebody-window",
    domain: "product",
    fact: "sizes a 100-aircraft deployment decision",
    title: "India's Wide-Body Window",
    tagline:
      "Where should Indian carriers deploy their next 100 long-haul aircraft, and can the India-Gulf corridor absorb them?",
    description:
      "A commercial aviation market-entry case built for a network and fleet strategy decision: where 60 A350-900s on firm order go first, and what to do with 40 unconverted purchase rights, against Air India's 80 wide-bodies, on a horizon through 2030. Evidence from DGCA, Eurostat, IATA and World Bank, every figure computed in the repository and none typed by hand, with no PowerPoint and no Excel anywhere in the pipeline.",
    problem:
      "The India-Gulf corridor carries half of India's international traffic and is four times the size of the entire direct Europe market, which makes it the obvious place to put a wide-body. The obvious answer turns out to be wrong, and the reasons only surface once the corridor's yield, its remaining treaty room and its sector lengths are computed rather than assumed.",
    approach:
      "Traffic, capacity and yield are rebuilt from DGCA sector data, then set against the firm order book to ask what the fleet can actually be deployed on. Yield headroom is computed per corridor against IndiGo's achieved revenue per RPK, remaining bilateral entitlement is measured against the aircraft on order, and 2030 demand is projected three separate ways and reported as a band rather than an average. The case ran on the opposite recommendation until three independent lines of evidence overturned it, and that reversal is written up in a pivot log rather than quietly amended.",
    highlights: [
      "The answer: compete with the Gulf hubs, do not fly more aircraft to them. Europe first, North America second, Gulf capacity roughly flat",
      "Yield headroom by corridor, 2025: North America +31.5%, Oceania +29.5%, Europe +21.3%, Africa +16.9%, Southeast Asia +11.2%, East Asia +8.9%, South Asia -1.9%, Gulf -4.3%. The Gulf is the only corridor that cannot cover its own cost at IndiGo's achieved 5.06 INR per RPK",
      "About 8.5M passengers a year are not going to the Gulf at all, they are connecting through Dubai, Doha or Abu Dhabi to somewhere else, a figure bounded below at 7.84M by IATA",
      "The remaining treaty room at the two Gulf points with a published entitlement would absorb about 4% of the aircraft on firm order, against an order book that adds 78% to Indian carrier international capacity",
      "IndiGo's average international stage length is 2,643 km against Air India's 5,316 km, so the fleet has to fly longer sectors before the wide-body economics work at all",
      "India international passengers in 2030 projected at 96M to 109M by three methods, reported as a band and never as an average",
      "The opening view was reclaim the Gulf corridor first. It was overturned by the evidence, and that reversal plus nine others is documented in a pivot log rather than quietly amended",
    ],
    metrics: [
      { value: "78.0M", label: "India international sector passengers, 2025" },
      { value: "8.5M", label: "a year connecting through a Gulf hub to elsewhere" },
      { value: "4%", label: "of the order book Gulf treaty room could absorb" },
    ],
    stack: ["Python", "DGCA / Eurostat / IATA data", "Next.js", "Scrollytelling", "GitHub Actions"],
    live: "https://india-widebody-window.vercel.app",
    github: "https://github.com/DogInfantry/india-widebody-window",
    thumbnail: "/screenshots/india-widebody-window-map.png",
    figures: [
      {
        kind: "diverging",
        unit: "%",
        caption:
          "Yield headroom by corridor against IndiGo's achieved 5.06 INR per RPK, 2025. The Gulf carries 50.9% of India's international traffic and is the only corridor in the book with negative headroom, which is what turns the obvious deployment into the wrong one.",
        source:
          "Highlight 2 above, computed in the repository from DGCA sector data",
        data: [
          { label: "North America", value: 31.5, display: "+31.5%" },
          { label: "Oceania", value: 29.5, display: "+29.5%" },
          { label: "Europe", value: 21.3, display: "+21.3%" },
          { label: "Africa", value: 16.9, display: "+16.9%" },
          { label: "Southeast Asia", value: 11.2, display: "+11.2%" },
          { label: "East Asia", value: 8.9, display: "+8.9%" },
          { label: "South Asia", value: -1.9, display: "-1.9%" },
          { label: "Gulf", value: -4.3, display: "-4.3%", emphasis: true },
        ],
      },
    ],
  },
  {
    slug: "india-fs-pulse",
    domain: "market-structure",
    fact: "traces every figure to a committed dataset",
    title: "India FS Pulse",
    tagline:
      "Who captures the value in India's UPI, when the busiest half of the network is priced at zero?",
    description:
      "A reproducible research portfolio on Indian financial services: payments economics, bank margins, market structure and wealth. A Python pipeline over seven public sources feeds seven analysis modules and a static site, refreshed monthly by CI. Every figure, every exhibit and the machine-readable summary trace to a committed dataset and a dated source, and none of it is typed in by hand.",
    problem:
      "India built the world's largest real-time payments network and priced the busy half of it at zero. Who actually captures the value is asserted constantly and computed rarely, because the answer needs payments data, bank financials, market-share filings and fund data joined together and kept current.",
    approach:
      "Seven public sources, PhonePe Pulse, NPCI, Yahoo Finance, AMFI and the World Bank among them, are pulled into a committed dataset and rebuilt monthly by GitHub Actions. Modules compute the merchant against person-to-person split, the growth bridge back to 2018, app concentration against the NPCI cap, a private against public bank margin decomposition, and a state-level merchant map. The site is generated from the same pipeline, so a claim on the page and the number behind it cannot drift apart.",
    highlights: [
      "The finding: in 2026 Q2 merchant payments were 63.9% of all UPI transactions but only 23.0% of the rupees moved. Person to person is the mirror image at 30.8% of transactions and 71.2% of value",
      "The merchant leg is the only one a merchant discount rate could ever be charged on, and under zero-MDR it earns nothing: 50.7 million merchants, 487 transactions each per quarter, and Rs 0 of payment revenue. At 30bps the same leg would have been worth Rs 3,144 crore a quarter",
      "Merchant payments account for 64% of all volume growth since 2018 Q1, so the unmonetised leg is also the one carrying the network's expansion",
      "App concentration against policy: PhonePe holds 45.9% of national UPI volume and Google Pay 32.3%, both above the 30% cap, and roughly 4.3 billion transactions a month would have to change app for that cap to bind",
      "Private against public bank net interest margin gap of 114 bps, decomposed into 59 bps of pricing and 56 bps of funding, against a five year price return of +293% for public banks and +18% for private on median",
      "The fund shelf carries 14,288 schemes against 3,353 distinct strategies, a 4.3x wrapper ratio",
      "UPI transactions per banked adult per month reached 14.9, up from 4.0 in 2021",
    ],
    metrics: [
      { value: "63.9% / 23.0%", label: "merchant share of UPI transactions against value" },
      { value: "Rs 3,144 Cr", label: "a quarter that 30bps would have earned on that leg" },
      { value: "114 bps", label: "private against public bank margin gap" },
    ],
    stack: ["Python", "PhonePe Pulse / NPCI / AMFI", "DuckDB", "GitHub Actions", "Static site"],
    live: "https://india-fs-pulse.vercel.app",
    thumbnail: "/screenshots/india-fs-pulse-map.png",
    github: "https://github.com/DogInfantry/india-fs-pulse",
    screenshot: "/screenshots/india-fs-pulse.png",
    figures: [
      {
        kind: "bars",
        unit: "%",
        caption:
          "The monetisation gap, 2026 Q2. The merchant leg is the only one a merchant discount rate could be charged on, and it carries most of the transactions and little of the value. Person to person is the mirror image, and it is the leg nobody could charge for anyway.",
        source:
          "Highlight 1 above: merchant 63.9% of transactions and 23.0% of value, person to person 30.8% and 71.2%",
        data: [
          { label: "Merchant, share of transactions", value: 63.9, display: "63.9%", emphasis: true },
          { label: "Merchant, share of value", value: 23, display: "23.0%", emphasis: true },
          { label: "Person to person, transactions", value: 30.8, display: "30.8%" },
          { label: "Person to person, value", value: 71.2, display: "71.2%" },
        ],
      },
      {
        kind: "bars",
        unit: "%",
        caption:
          "Both leading apps sit above the 30% share cap NPCI set for UPI. The cap has been deferred rather than enforced, and the gap between the rule and the market is what makes it hard to enforce.",
        source:
          "Highlight 4 above: PhonePe 45.9%, Google Pay 32.3%, against the 30% cap",
        data: [
          { label: "PhonePe", value: 45.9, display: "45.9%", emphasis: true },
          { label: "Google Pay", value: 32.3, display: "32.3%", emphasis: true },
          { label: "NPCI share cap", value: 30, display: "30%" },
        ],
      },
    ],
  },
  {
    slug: "sellside-research-engine",
    fact: "computes 8 risk metrics per ticker",
    title: "Sellside Research Engine",
    domain: "equities",
    tagline:
      "An institutional-grade equity research dashboard: DCF to NLP tone scoring in one screen.",
    description:
      "A single-screen research terminal covering DCF and reverse-DCF valuation, football-field charts, multi-factor composite scoring, full risk metrics (VaR, Sharpe, Sortino, drawdown), and NLP-scored management commentary from earnings calls.",
    problem:
      "A sell-side initiation note takes days of fragmented work: valuation in Excel, comps in another tab, risk metrics somewhere else, and management tone read by gut feel.",
    approach:
      "SEC EDGAR fundamentals and Yahoo Finance market data feed a DCF engine with an inverted reverse-DCF layer that solves for the growth the market is pricing in and compares it to consensus. A five-pillar composite (valuation, growth, quality, momentum, consensus) rolls up to a rating, and OpenAI-powered NLP scores management commentary tone, themes, and risk flags.",
    highlights: [
      "Reverse DCF implied-growth sensitivity grid: implied 8.4% vs consensus 11.2% → mispricing flag",
      "Full risk suite: VaR 95%, CVaR, beta, Sharpe, Sortino, max drawdown, vol regime detection",
      "NLP management-commentary scoring: tone, guidance extraction, key themes, risk flags",
      "Football-field valuation chart and multi-factor composite rating out of 100",
    ],
    metrics: [
      { value: "5", label: "factor pillars in composite" },
      { value: "8", label: "risk metrics computed" },
      { value: "8.4%", label: "implied growth vs 11.2% consensus" },
    ],
    figures: [
      {
        kind: "bars",
        unit: "%",
        caption:
          "Reverse DCF inverts the valuation: instead of discounting a growth assumption, it solves for the growth rate the current price already implies, then sets that against sell-side consensus. The gap is what raises the mispricing flag.",
        source:
          "Highlight 1 above: reverse DCF implied growth 8.4% against consensus 11.2%",
        data: [
          { label: "Consensus growth", value: 11.2, display: "11.2%" },
          {
            label: "Market-implied growth",
            value: 8.4,
            display: "8.4%",
            emphasis: true,
          },
        ],
      },
    ],
    stack: ["SEC EDGAR", "Yahoo Finance", "OpenAI NLP", "React", "Recharts"],
    live: "https://sellside-research-engine.vercel.app/",
    screenshot: "/screenshots/sellside-research-engine.png",
  },
  {
    slug: "capital-markets-intelligence",
    fact: "event-studies 25 IPOs on open data",
    title: "Capital Markets Intelligence Platform",
    domain: "macro",
    tagline:
      "IPO event studies, sovereign risk scoring, M&A screening, and yield-curve decomposition, with zero API keys.",
    description:
      "A production-grade market intelligence platform modeled on Goldman Sachs GIR, J.P. Morgan, D.E. Shaw and PwC Deals workflows: six proprietary models across 501 trading days of open data, with cross-asset regime detection on top.",
    problem:
      "Institutional market intelligence is locked behind terminals and paid data feeds. The analytical frameworks themselves (regime scoring, curve decomposition, event studies) are reproducible with open data.",
    approach:
      "Six models built entirely on open data (no API keys): a cross-asset market regime score, yield-curve regime classification with slope decomposition, IPO day-1 event studies across 25 offerings, a 20-deal M&A pipeline screen, and macro-based sovereign risk scoring for 20 sovereigns and $326B of issuance.",
    highlights: [
      "Market regime score (–2 risk-off to +2 risk-on) tracked over rolling 60-day windows",
      "Yield curve 90-day trend with 3M/10Y/30Y decomposition and regime classification",
      "$483.5B M&A pipeline screened, 25 IPOs event-studied (avg day-1 pop 15.15%)",
      "Sovereign risk tiers across 20 countries from growth, inflation and debt/GDP data",
    ],
    metrics: [
      { value: "$483.5B", label: "M&A pipeline screened" },
      { value: "25", label: "IPOs event-studied" },
      { value: "20", label: "sovereigns risk-scored" },
    ],
    stack: ["Open market data", "React", "Recharts", "Event-study models"],
    live: "https://capital-markets-intelligence.vercel.app/",
    screenshot: "/screenshots/capital-markets-intelligence.png",
  },
  {
    slug: "enso-macro-risk-desk",
    fact: "causal-tests 6 headline ENSO trades",
    title: "ENSO Macro Risk Desk",
    domain: "climate",
    tagline:
      "When the ENSO cycle shifts, which commodity exposures are causally real, and which are spurious?",
    description:
      "A live commodity risk desk built around the El Niño–Southern Oscillation: Niño-3.4 ONI tracking with a SARIMA+LSTM forecast cone, country-level exposure indices, and, the core idea, Granger + CCM causal testing of every headline ENSO→commodity trade.",
    problem:
      "Every El Niño advisory triggers the same headline trades: long palm oil, long cocoa, short wheat. Most of those links never survive causal testing; desks reposition on correlations that are confounded or spurious.",
    approach:
      "NOAA CPC ONI data feeds a live desk: a 24-month ONI trajectory with a 12-month ensemble forecast cone (SARIMA+LSTM, 90% band), an ENSO exposure index across producing countries, and an in-repo Granger + CCM engine that stress-tests each ONI→commodity-price link on linearly-detrended series. A misattribution guard flags which trades are MODERATE, WEAK, or confounded.",
    highlights: [
      "Causal verdict: of six headline ENSO→price links, none test strongly causal (max CCM ρ 0.32)",
      "Live Niño-3.4 ONI gauge with NOAA CPC advisory status and 12-month forecast cone",
      "Exposure leaderboard: Indonesia palm oil, Côte d'Ivoire cocoa, Australia wheat and more",
      "Region deep-dives where the clean ENSO signal actually lives: climate & production data",
    ],
    metrics: [
      { value: "6", label: "headline links causal-tested" },
      { value: "11", label: "exposed regions ranked" },
      { value: "90%", label: "forecast cone band (SARIMA+LSTM)" },
    ],
    figures: [
      {
        kind: "meter",
        value: 0.32,
        max: 1,
        display: "0.32",
        scaleNote: "strongest of six tested links",
        caption:
          "Convergent cross-mapping strength for the strongest of the six headline ENSO to commodity-price links. Cross-map skill runs from 0 to 1 by construction, and none of the six clears the bar for a strong causal reading, so the desk fails its own headline trades rather than repeating them.",
        source:
          "Highlight 1 above: of six headline links, none test strongly causal, max CCM rho 0.32",
      },
    ],
    stack: ["Python", "Granger / CCM", "SARIMA + LSTM", "NOAA CPC data", "Docker"],
    live: "https://doginfantry-enso-macro-risk-desk.hf.space/",
    screenshot: "/screenshots/enso-macro-risk-desk.png",
  },
  {
    slug: "debt-covenant-surveillance",
    fact: "monitors $263B of issuer debt",
    title: "Dynamic Debt Covenant Surveillance Engine",
    domain: "credit",
    tagline:
      "Translating credit agreements into programmatic surveillance models for private credit.",
    description:
      "An AST-safe covenant monitoring engine that flags leverage breaches, runs macro shock sensitivity matrices, and simulates cross-default cascade propagation before technical default, using live SEC 10-K/10-Q financials across a $263B monitored debt portfolio.",
    problem:
      "Private credit teams monitor covenants manually, spreadsheet by spreadsheet. Breaches surface after the fact, and cross-default clauses mean one breach can cascade through a capital structure before anyone models it.",
    approach:
      "Covenant formulas from real credit agreements are parsed into an AST-safe evaluator (no eval, no injection surface) and re-computed against live SEC 10-K/10-Q financials. A BFS pass over the intercompany guarantee graph simulates cross-default cascades, while a macro shock matrix stress-tests net leverage under rate and EBITDA scenarios.",
    highlights: [
      "9 issuers monitored across $263B of total debt: Charter, Walgreens, Altice, Bausch, Lumen and more",
      "AST-safe covenant evaluator: credit-agreement math as code, without eval() risk",
      "Cross-default cascade simulation via breadth-first search over guarantee networks",
      "Macro shock sensitivity matrix and covenant-headroom erosion trend detection",
    ],
    metrics: [
      { value: "$263B", label: "debt monitored" },
      { value: "9", label: "issuers tracked live" },
      { value: "5", label: "covenants in breach" },
    ],
    stack: ["Python", "NetworkX", "yfinance", "SEC EDGAR", "React"],
    live: "https://dynamic-debt-covenant-surveillance.vercel.app/",
    screenshot: "/screenshots/debt-covenant-surveillance.png",
  },
  {
    slug: "sustainable-finance-india",
    fact: "maps ₹65,100Cr of green issuance",
    title: "India Sustainable Finance: Transition Dashboard",
    domain: "sustainable",
    tagline:
      "Green bonds, SEBI/RBI frameworks, and transition finance for India's hard-to-abate sectors.",
    description:
      "A research dashboard mapping India's sustainable-finance transition: ₹65,100Cr of cumulative green bond issuance, a $118B annual capital need across six priority sectors, and the policy architecture (SEBI, RBI, NDC pathway) that shapes it.",
    problem:
      "India's net-zero-2070 pathway needs roughly $118B of annual transition capital, but the data on green bond issuance, ESG product flows, and policy frameworks is scattered across regulator PDFs and press releases.",
    approach:
      "Issuance timelines (sovereign, PSU, corporate, bank tranches), sector capital-need estimates, and SEBI/RBI policy frameworks are consolidated into one navigable dashboard, with an explicit synthetic-data disclosure and a versioned research roadmap tracked as open issues.",
    highlights: [
      "₹65,100Cr cumulative green bond issuance mapped 2015–2024 by issuer type",
      "Capital-need view: $118B/year across six hard-to-abate priority sectors",
      "Policy layer: SEBI disclosure regimes, RBI climate-risk guidance, India NDC pathway",
      "500 GW renewable target and 2070 net-zero scenario framing",
    ],
    metrics: [
      { value: "₹65,100Cr", label: "green bond issuance mapped" },
      { value: "$118B", label: "annual capital need" },
      { value: "6", label: "priority sectors" },
    ],
    stack: ["React", "Recharts", "Policy research", "Synthetic data"],
    live: "https://sustainable-finance-india-transitio.vercel.app/",
    screenshot: "/screenshots/sustainable-finance-india.png",
  },
  {
    slug: "signals-before-storms",
    fact: "grades 8 books over 1,814 out-of-sample days",
    title: "Signals Before Storms",
    domain: "quant",
    tagline:
      "An HMM regime overlay, graded honestly: the model worked, the strategy did not.",
    description:
      "A regime-switching tactical asset allocation engine that detects Bull, Bear and Crisis states with a 3-state Gaussian HMM, then reallocates across equity, cash and gold via per-regime convex optimization. Validated with a leak-proof expanding walk-forward backtest on India (primary) and the US (robustness), and published as a rigorous negative result with a diagnosis rather than as a winning strategy.",
    problem:
      "Regime-switching overlays are a standard pitch: detect the crisis state, de-risk, outperform. Most public backtests report a Sharpe ratio and stop, without leak-proofing the pipeline, costing the benchmark on the same terms, or asking whether the regime label predicts direction at all.",
    approach:
      "Causal features (momentum, realized volatility, VIX) feed an HMM refit inside every walk-forward fold, decoded with a forward filter rather than whole-sequence Viterbi, with train-only scaling and a one-day execution lag, each defence pinned by a unit test. Per-regime convex programs set the weights, every book (strategy and benchmark alike) runs through the same 7.5 bps cost engine, and the scorecard is deflated at an openly stated 7-trial count with paired bootstrap confidence intervals.",
    highlights: [
      "The finding: volatility orders perfectly with the regime label and return orders backwards, on both universes. Crisis-labelled days annualize +18.4% against Bull at +10.2%, so de-risking on the crisis label sells the rebound as reliably as it dodges the crash",
      "Paired difference testing rather than overlapping intervals: every book's Sharpe gap against 60/40 and equal weight spans zero, so the noise reading is earned rather than assumed",
      "What the overlay does buy is drawdown, -6.2% against -23.7% for 60/40 on India, and that protection does not reproduce on the US, where a two-line volatility-threshold ablation beats the HMM outright (0.958 vs 0.542 Sharpe)",
      "Effective sample size counted in episodes, not days: the 261-day crisis label is 14 episodes, and this check retracted the project's own apparent discovery, documented rather than quietly dropped",
      "Extended to 11 markets in a detection-only live monitor: volatility ranks the states in 11 of 11, return in 2 of 11, which sharpens the negative result instead of confirming it",
      "Vendor data guarded, not trusted: two bad Yahoo prints in GOLDBEES.NS inflate gold's return standard deviation from 0.011 to 0.139 and poison every Indian covariance if left alone",
    ],
    metrics: [
      { value: "1,814", label: "out-of-sample days graded" },
      { value: "-6.2%", label: "max drawdown vs -23.7% for 60/40" },
      { value: "11 of 11", label: "markets ordered by volatility, 2 by return" },
    ],
    figures: [
      {
        kind: "bars",
        unit: "%",
        caption:
          "Annualized return by regime label. Volatility orders the states correctly, return orders them backwards, so de-risking on the crisis label sells the rebound about as reliably as it dodges the crash. This is the finding, and it is the reason the project is published as a negative result.",
        source:
          "Highlight 1 above: crisis-labelled days annualize +18.4% against bull at +10.2%",
        data: [
          {
            label: "Crisis-labelled days",
            value: 18.4,
            display: "+18.4%",
            emphasis: true,
          },
          { label: "Bull-labelled days", value: 10.2, display: "+10.2%" },
        ],
      },
      {
        kind: "matrix",
        total: 11,
        rows: [
          { label: "Volatility orders the regime states", hit: 11 },
          { label: "Return orders the regime states", hit: 2 },
        ],
        caption:
          "Extending detection to 11 markets sharpens the negative result rather than rescuing it. The regime label is a volatility detector; it is not a return predictor.",
        source:
          "Highlight 5 above: volatility ranks the states in 11 of 11 markets, return in 2 of 11",
      },
    ],
    stack: [
      "Python",
      "hmmlearn",
      "cvxpy",
      "Walk-forward backtest",
      "yfinance",
    ],
    live: "https://signals-before-storms.vercel.app/",
    github: "https://github.com/DogInfantry/Signals-Before-Storms",
    screenshot: "/screenshots/signals-before-storms.png",
  },
  {
    slug: "indusind-protect",
    fact: "RICE-ranks 5 features against 5 competitors",
    title: "IndusInd Protect: Bancassurance Product Case Study",
    domain: "product",
    tagline:
      "Turning insurance inside a bank's app from a one-time transaction into an ongoing protection service.",
    description:
      "A product case study for IndusInd Protect, an in-app insurance layer covering discovery and comparison, unified policy management, digital claims, and AI-assisted support. Built from primary and secondary research through personas, RICE prioritization, user flows, a clickable prototype, and a phased go-to-market plan.",
    problem:
      "The retail insurance experience is fragmented. Customers struggle to understand what they are covered for, manage policies scattered across channels, track renewals, and navigate claims. Engagement effectively stops at purchase, so insurance feels like a one-time transaction rather than an ongoing protection service.",
    approach:
      "In-depth interviews and a 60-respondent survey across age, income, and digital-savviness segments mapped the friction, and a benchmark of five competitors (PolicyBazaar, Acko, Digit, ICICI Lombard, SBI General) located the white space: none pairs banking data with insurance in one view, and post-purchase trust weakens at exactly the moment claims begin. Three personas set the brief, RICE scoring replaced gut feeling in ranking the feature set, and the winning journeys were mapped into wireframes and a clickable prototype. A go-to-market plan sequences the rollout along the technology adoption lifecycle.",
    highlights: [
      "Product vision: make protection something customers feel every month, not something they buy once and forget, by turning the bank's existing knowledge of their life into proactive coverage",
      "Positioning built on the asset digital-only insurers cannot copy: branch relationship managers reframed as a named claims concierge tied to the existing banking relationship",
      "RICE ranking put a centralized policy repository with 1-click renewals first at 15.0, well ahead of the conversational AI assistant at 1.40, inverting the obvious AI-first instinct",
      "Life-event triggers (vehicle loan, home purchase, upcoming travel) generate pre-filled quotes, removing the search and form-filling steps entirely",
      "Gamified Protection Score and Policy Health Check surface coverage gaps rather than waiting for the customer to discover them",
      "Omnichannel claims: AI assistant for routine queries, escalation to a named relationship manager for the final mile, with real-time status tracking",
      "42-month go-to-market split into an initiation stage (launch, validate, build trust) and an expansion stage (scale markets, strengthen distribution, drive mass adoption)",
    ],
    metrics: [
      { value: "5", label: "competitors benchmarked" },
      { value: "3", label: "personas from 60+ survey responses" },
      { value: "15.0", label: "top RICE score: 1-click renewals" },
    ],
    figures: [
      {
        kind: "bars",
        caption:
          "RICE scoring inverted the obvious AI-first instinct. A centralized policy repository with 1-click renewals outranked the conversational assistant by an order of magnitude, which is why the roadmap leads with plumbing rather than with the feature that demos well.",
        source:
          "Highlight 3 above: 1-click renewals scored 15.0, the conversational AI assistant 1.40",
        data: [
          {
            label: "Policy repository, 1-click renewals",
            value: 15,
            display: "15.0",
            emphasis: true,
          },
          { label: "Conversational AI assistant", value: 1.4, display: "1.40" },
        ],
      },
    ],
    stack: [
      "Primary & secondary research",
      "Personas & problem statements",
      "RICE prioritization",
      "Wireframes & prototype",
      "GTM strategy",
    ],
    doc: "/research/indusind-protect-case-study.pdf",
    docLabel: "Case deck (12 pp)",
    cover: "/research/covers/indusind-protect-case-study.png",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
