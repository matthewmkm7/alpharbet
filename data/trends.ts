import type { DrugCategory } from "./drugs";

/**
 * Trends content. The macro stats and spotlight facts below are real, cited
 * figures — not invented data. See CLAUDE.md hard rules: never present made-up
 * numbers as real market data.
 */

export type Source = { title: string; url: string };

export type MacroStat = {
  value: string;
  label: string;
  note: string;
};

export const macroStats: MacroStat[] = [
  {
    value: "−1.4%",
    label: "Avg. brand-name drug price change, 2024",
    note: "The first year-over-year decline in the report's 20-year history.",
  },
  {
    value: "~$13,000",
    label: "Avg. annual cost of a brand-name drug, 2024",
    note: "Across the widely-used drugs the report tracks for older Americans.",
  },
  {
    value: "3 in 4",
    label: "Brand-name drugs that still rose in price in 2024",
    note: "The average decline masks a lot of individual increases.",
  },
];

// Per-drug callouts, keyed by slug — used when the selected drug has a specific,
// real, cited fact worth surfacing instead of just the category-level note.
export const spotlightFacts: Record<string, { fact: string; source: Source }> = {
  insulin: {
    fact: "Insulin was one of the specific drug types credited with driving 2024's overall price decline, alongside asthma inhalers — after years of public and political pressure over insulin affordability.",
    source: {
      title: "AARP Rx Price Watch Report, 2026",
      url: "https://www.aarp.org/press/releases/2026-02-12-rx-price-watch-report.html",
    },
  },
  atorvastatin: {
    fact: "Generic atorvastatin is widely available for around $4 a month under long-running pharmacy discount-generic programs — a direct result of patent expiry opening the drug up to heavy generic competition.",
    source: { title: "GoodRx — Atorvastatin pricing", url: "https://www.goodrx.com/atorvastatin" },
  },
  simvastatin: {
    fact: "Like atorvastatin, simvastatin has been off-patent for years and is commonly stocked in $4-generic pharmacy programs, making the statin class one of the cheapest drug categories on this site.",
    source: { title: "GoodRx — statins pricing", url: "https://www.goodrx.com/classes/statins" },
  },
};

export const categoryDrivers: Record<DrugCategory, string> = {
  Opioid: "Prices in this class tend to track scheduling changes and manufacturer supply agreements.",
  Stimulant: "Pricing here is sensitive to annual DEA production quotas, which cap total supply.",
  Antibiotic: "Generally low-cost and generic; prices move mostly with raw-material and manufacturing costs.",
  Analgesic: "Widely available OTC options keep this class among the most price-stable.",
  Antidiabetic: "Insulin aside, older oral antidiabetics like metformin are long-generic and inexpensive.",
  Hormone: "Biologic and hormone therapies often carry higher costs tied to manufacturing complexity.",
  Benzodiazepine: "A mature, mostly generic class — pricing is relatively flat and driven by manufacturing costs.",
  Antidepressant: "Long-established generics keep this class affordable; newer extended-release versions cost more.",
  Statin: "One of the clearest examples of patent expiry driving prices down as generics enter the market.",
  "ACE Inhibitor": "A long-generic class — among the cheapest options for treating high blood pressure.",
  "Beta Blocker": "Decades off-patent; consistently one of the least expensive cardiovascular drug classes.",
  Anticoagulant: "Split between cheap, established warfarin and pricier newer options like apixaban that skip routine blood monitoring.",
  PPI: "Heavy OTC and generic competition keeps this class inexpensive despite huge prescription volumes.",
  Antihistamine: "Widely available over the counter; some of the least expensive drugs on this site.",
  Antipsychotic: "Newer ('atypical') options can cost more than older generics, largely due to patent status.",
  Corticosteroid: "Long-generic and inexpensive, though potency (not price) varies a lot within the class.",
  Antiviral: "Pricing varies widely — some antivirals are cheap generics, others remain costly and brand-only.",
  Diuretic: "Among the oldest and cheapest drug classes still in wide clinical use.",
  Bronchodilator: "Inhaler pricing has drawn public scrutiny in recent years despite the drugs themselves being long-generic.",
};

export const sources: Source[] = [
  {
    title: "AARP Rx Price Watch Report — Trends in Retail Prices of Brand-Name Prescription Drugs (2026)",
    url: "https://www.aarp.org/press/releases/2026-02-12-rx-price-watch-report.html",
  },
  { title: "GoodRx — Atorvastatin pricing", url: "https://www.goodrx.com/atorvastatin" },
];
