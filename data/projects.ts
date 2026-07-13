export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string;
  highlights: string[];
  stack: string[];
  live?: string;
  github?: string;
  screenshot?: string;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    slug: "debt-covenant-surveillance",
    title: "Dynamic Debt Covenant Surveillance Engine",
    tagline:
      "Translating credit agreements into programmatic surveillance models for private credit.",
    description:
      "An AST-safe covenant monitoring engine that flags leverage breaches, runs macro shock sensitivity matrices, and simulates cross-default cascade propagation before technical default — using live SEC 10-K/10-Q financials across a $263B monitored debt portfolio.",
    problem:
      "Private credit teams monitor covenants manually, spreadsheet by spreadsheet. Breaches surface after the fact, and cross-default clauses mean one breach can cascade through a capital structure before anyone models it.",
    approach:
      "Covenant formulas from real credit agreements are parsed into an AST-safe evaluator (no eval, no injection surface) and re-computed against live SEC 10-K/10-Q financials. A BFS pass over the intercompany guarantee graph simulates cross-default cascades, while a macro shock matrix stress-tests net leverage under rate and EBITDA scenarios.",
    highlights: [
      "9 issuers monitored across $263B of total debt — Charter, Walgreens, Altice, Bausch, Lumen and more",
      "AST-safe covenant evaluator: credit-agreement math as code, without eval() risk",
      "Cross-default cascade simulation via breadth-first search over guarantee networks",
      "Macro shock sensitivity matrix and covenant-headroom erosion trend detection",
    ],
    stack: ["Python", "NetworkX", "yfinance", "SEC EDGAR", "React"],
    live: "https://dynamic-debt-covenant-surveillance.vercel.app/",
    screenshot: "/screenshots/debt-covenant-surveillance.png",
  },
  {
    slug: "sellside-research-engine",
    title: "Sellside Research Engine",
    tagline:
      "An institutional-grade equity research dashboard — DCF to NLP tone scoring in one screen.",
    description:
      "A single-screen research terminal covering DCF and reverse-DCF valuation, football-field charts, multi-factor composite scoring, full risk metrics (VaR, Sharpe, Sortino, drawdown), and NLP-scored management commentary from earnings calls.",
    problem:
      "A sell-side initiation note takes days of fragmented work: valuation in Excel, comps in another tab, risk metrics somewhere else, and management tone read by gut feel.",
    approach:
      "SEC EDGAR fundamentals and Yahoo Finance market data feed a DCF engine with an inverted reverse-DCF layer — solving for the growth the market is pricing in and comparing it to consensus. A five-pillar composite (valuation, growth, quality, momentum, consensus) rolls up to a rating, and OpenAI-powered NLP scores management commentary tone, themes, and risk flags.",
    highlights: [
      "Reverse DCF implied-growth sensitivity grid: implied 8.4% vs consensus 11.2% → mispricing flag",
      "Full risk suite: VaR 95%, CVaR, beta, Sharpe, Sortino, max drawdown, vol regime detection",
      "NLP management-commentary scoring: tone, guidance extraction, key themes, risk flags",
      "Football-field valuation chart and multi-factor composite rating out of 100",
    ],
    stack: ["SEC EDGAR", "Yahoo Finance", "OpenAI NLP", "React", "Recharts"],
    live: "https://sellside-research-engine.vercel.app/",
    screenshot: "/screenshots/sellside-research-engine.png",
  },
  {
    slug: "capital-markets-intelligence",
    title: "Capital Markets Intelligence Platform",
    tagline:
      "IPO event studies, sovereign risk scoring, M&A screening, and yield-curve decomposition — zero API keys.",
    description:
      "A production-grade market intelligence platform modeled on Goldman Sachs GIR, J.P. Morgan, D.E. Shaw and PwC Deals workflows: six proprietary models across 501 trading days of open data, with cross-asset regime detection on top.",
    problem:
      "Institutional market intelligence is locked behind terminals and paid data feeds. The analytical frameworks themselves — regime scoring, curve decomposition, event studies — are reproducible with open data.",
    approach:
      "Six models built entirely on open data (no API keys): a cross-asset market regime score, yield-curve regime classification with slope decomposition, IPO day-1 event studies across 25 offerings, a 20-deal M&A pipeline screen, and macro-based sovereign risk scoring for 20 sovereigns and $326B of issuance.",
    highlights: [
      "Market regime score (–2 risk-off to +2 risk-on) tracked over rolling 60-day windows",
      "Yield curve 90-day trend with 3M/10Y/30Y decomposition and regime classification",
      "$483.5B M&A pipeline screened, 25 IPOs event-studied (avg day-1 pop 15.15%)",
      "Sovereign risk tiers across 20 countries from growth, inflation and debt/GDP data",
    ],
    stack: ["Open market data", "React", "Recharts", "Event-study models"],
    live: "https://capital-markets-intelligence.vercel.app/",
    screenshot: "/screenshots/capital-markets-intelligence.png",
  },
  {
    slug: "sustainable-finance-india",
    title: "India Sustainable Finance — Transition Dashboard",
    tagline:
      "Green bonds, SEBI/RBI frameworks, and transition finance for India's hard-to-abate sectors.",
    description:
      "A research dashboard mapping India's sustainable-finance transition: ₹65,100Cr of cumulative green bond issuance, a $118B annual capital need across six priority sectors, and the policy architecture (SEBI, RBI, NDC pathway) that shapes it.",
    problem:
      "India's net-zero-2070 pathway needs roughly $118B of annual transition capital, but the data on green bond issuance, ESG product flows, and policy frameworks is scattered across regulator PDFs and press releases.",
    approach:
      "Issuance timelines (sovereign, PSU, corporate, bank tranches), sector capital-need estimates, and SEBI/RBI policy frameworks are consolidated into one navigable dashboard — with an explicit synthetic-data disclosure and a versioned research roadmap tracked as open issues.",
    highlights: [
      "₹65,100Cr cumulative green bond issuance mapped 2015–2024 by issuer type",
      "Capital-need view: $118B/year across six hard-to-abate priority sectors",
      "Policy layer: SEBI disclosure regimes, RBI climate-risk guidance, India NDC pathway",
      "500 GW renewable target and 2070 net-zero scenario framing",
    ],
    stack: ["React", "Recharts", "Policy research", "Synthetic data"],
    live: "https://sustainable-finance-india-transitio.vercel.app/",
    screenshot: "/screenshots/sustainable-finance-india.png",
  },
  {
    slug: "india-lbo-screener",
    title: "India LBO Take-Private Screener",
    tagline:
      "The only public LBO screener for Indian take-privates — built the month the rules changed.",
    description:
      "India unlocked onshore leveraged buyouts in February 2026. This screener runs a full paper LBO on every NSE mid-cap with unused debt capacity, complete with Bull/Base/Bear scenario war rooms per target.",
    problem:
      "When India permitted onshore LBO financing in Feb 2026, no public tooling existed to screen which NSE mid-caps could actually support a leveraged take-private.",
    approach:
      "Every NSE mid-cap is put through a standardized paper LBO: debt capacity from existing leverage, entry/exit multiple assumptions, and IRR decomposition — then stress-tested through Bull/Base/Bear scenario war rooms to show which deals survive downside cases.",
    highlights: [
      "Full paper LBO on every NSE mid-cap with unused debt capacity",
      "Bull/Base/Bear scenario war rooms per target",
      "Built within weeks of the February 2026 regulatory unlock",
      "Open source on GitHub",
    ],
    stack: ["Python", "NSE data", "LBO modeling"],
    github: "https://github.com/DogInfantry/India-LBO-Take-Pv-Screener",
    screenshot:
      "https://opengraph.githubassets.com/1/DogInfantry/India-LBO-Take-Pv-Screener",
  },
  {
    slug: "el-nino",
    title: "El Niño",
    tagline: "Deployment being finalized — public link coming soon.",
    description: "",
    problem: "",
    approach: "",
    highlights: [],
    stack: [],
    comingSoon: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
