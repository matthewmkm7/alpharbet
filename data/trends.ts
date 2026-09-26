import type { DrugCategory } from "./drugs";

/**
 * Illustrative pricing-trend data ONLY.
 *
 * These are sample index values (not real historical prices) used to show what
 * the Trends chart looks like before real pricing-source data is wired in.
 * Never present these numbers as actual market prices — see CLAUDE.md hard rules.
 */
export type TrendPoint = {
  period: string; // e.g. "Q1 2024"
  index: number; // relative price index, illustrative only, 0-100 scale
};

export const ILLUSTRATIVE_NOTE =
  "Illustrative sample data — not real historical pricing. Live market data isn't wired in yet.";

export const trendsByCategory: Record<DrugCategory, TrendPoint[]> = {
  Opioid: [
    { period: "Q1", index: 58 },
    { period: "Q2", index: 61 },
    { period: "Q3", index: 64 },
    { period: "Q4", index: 63 },
    { period: "Q5", index: 67 },
    { period: "Q6", index: 70 },
  ],
  Stimulant: [
    { period: "Q1", index: 44 },
    { period: "Q2", index: 47 },
    { period: "Q3", index: 45 },
    { period: "Q4", index: 50 },
    { period: "Q5", index: 53 },
    { period: "Q6", index: 55 },
  ],
  Antibiotic: [
    { period: "Q1", index: 30 },
    { period: "Q2", index: 29 },
    { period: "Q3", index: 31 },
    { period: "Q4", index: 33 },
    { period: "Q5", index: 32 },
    { period: "Q6", index: 34 },
  ],
  Analgesic: [
    { period: "Q1", index: 22 },
    { period: "Q2", index: 23 },
    { period: "Q3", index: 24 },
    { period: "Q4", index: 24 },
    { period: "Q5", index: 26 },
    { period: "Q6", index: 27 },
  ],
  Antidiabetic: [
    { period: "Q1", index: 51 },
    { period: "Q2", index: 54 },
    { period: "Q3", index: 57 },
    { period: "Q4", index: 60 },
    { period: "Q5", index: 62 },
    { period: "Q6", index: 65 },
  ],
  Hormone: [
    { period: "Q1", index: 68 },
    { period: "Q2", index: 70 },
    { period: "Q3", index: 71 },
    { period: "Q4", index: 74 },
    { period: "Q5", index: 76 },
    { period: "Q6", index: 78 },
  ],
};

export const categoryDrivers: Record<DrugCategory, string> = {
  Opioid: "Prices in this class tend to track scheduling changes and manufacturer supply agreements.",
  Stimulant: "Pricing here is sensitive to annual DEA production quotas, which cap total supply.",
  Antibiotic: "Generally low-cost and generic; prices move mostly with raw-material and manufacturing costs.",
  Analgesic: "Widely available OTC options keep this class among the most price-stable.",
  Antidiabetic: "Newer formulations and insulin-analogue patents can push this class higher than older generics.",
  Hormone: "Biologic and hormone therapies often carry higher costs tied to manufacturing complexity.",
};
