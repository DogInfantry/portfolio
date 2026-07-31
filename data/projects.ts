export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
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
};

export const projects: Project[] = [
  {
    slug: "sellside-research-engine",
    fact: "computes 8 risk metrics per ticker",
    title: "Sellside Research Engine",
    category: "Equities",
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
    stack: ["SEC EDGAR", "Yahoo Finance", "OpenAI NLP", "React", "Recharts"],
    live: "https://sellside-research-engine.vercel.app/",
    screenshot: "/screenshots/sellside-research-engine.png",
  },
  {
    slug: "capital-markets-intelligence",
    fact: "event-studies 25 IPOs on open data",
    title: "Capital Markets Intelligence Platform",
    category: "Macro & Markets",
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
    category: "Climate Macro",
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
    stack: ["Python", "Granger / CCM", "SARIMA + LSTM", "NOAA CPC data", "Docker"],
    live: "https://doginfantry-enso-macro-risk-desk.hf.space/",
    screenshot: "/screenshots/enso-macro-risk-desk.png",
  },
  {
    slug: "debt-covenant-surveillance",
    fact: "monitors $263B of issuer debt",
    title: "Dynamic Debt Covenant Surveillance Engine",
    category: "Credit",
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
    category: "Sustainable Finance",
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
    slug: "indusind-protect",
    fact: "maps 4 user journeys end to end",
    title: "IndusInd Protect: Bancassurance Product Case Study",
    category: "Product & Strategy",
    tagline:
      "Turning insurance inside a bank's app from a one-time transaction into an ongoing protection service.",
    description:
      "A product case study for IndusInd Protect, an in-app insurance layer covering discovery and comparison, unified policy management, digital claims, and AI-assisted support. Built from primary and secondary research through personas, prioritization, user flows, a clickable prototype, and a phased go-to-market plan.",
    problem:
      "The retail insurance experience is fragmented. Customers struggle to understand what they are covered for, manage policies scattered across channels, track renewals, and navigate claims. Engagement effectively stops at purchase, so insurance feels like a one-time transaction rather than an ongoing protection service.",
    approach:
      "Primary survey work and secondary research framed the gap, then a competitor benchmark across the three routes customers actually use (bank branch and agent, direct insurer app, aggregator app) located the white space: a bank sits on the trust and the relationship manager that digital-only insurers lack. Personas and problem statements set the brief, a RICE-style matrix ranked the feature set, and four user journeys were mapped end to end into wireframes and a clickable prototype. A go-to-market plan sequences the rollout along the technology adoption lifecycle.",
    highlights: [
      "Positioning built on the asset digital-only insurers cannot copy: branch relationship managers reframed as a named claims concierge tied to the existing banking relationship",
      "Life-event triggers (vehicle loan, home purchase, upcoming travel) generate pre-filled recommendations and quotes, removing the search and form-filling steps entirely",
      "Gamified Policy Health Check and Protection Score surface coverage gaps rather than waiting for the customer to discover them",
      "Unified Policies tab consolidates sum insured, premium, claim settlement ratio, renewal alerts, and one-click renewal across health, motor, and home",
      "Omnichannel claims: AI assistant for routine queries, escalation to a relationship manager for the final mile, with real-time status tracking",
      "42-month go-to-market split into an initiation stage (launch, validate, build trust) and an expansion stage (scale markets, strengthen distribution, drive mass adoption)",
    ],
    metrics: [
      { value: "4", label: "user journeys mapped end to end" },
      { value: "3", label: "competing channels benchmarked" },
      { value: "42", label: "month go-to-market roadmap" },
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
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
