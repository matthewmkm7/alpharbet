import type { DrugCategory } from "./drugs";
import type { Source } from "./trends";

/**
 * Illness/condition content — real, cited public-health figures, same bar as
 * data/trends.ts (see its docstring): never invented numbers.
 *
 * "Geographic" here means real, published aggregate data (national and, where
 * a verified source exists, state-level) — not a live "conditions near you"
 * feature. No free source exists for that; see AGENTS.md for why.
 */

export type Illness = {
  slug: string;
  name: string;
  // Which of data/drugs.ts's DrugCategory values are used to treat this —
  // powers the "drugs used for this" list on the illness page.
  categories: DrugCategory[];
  summary: string;
  prevalence: { stat: string; source: Source };
  geographic?: { note: string; source: Source };
};

export const illnesses: Illness[] = [
  {
    slug: "type-2-diabetes",
    name: "Type 2 Diabetes",
    categories: ["Antidiabetic"],
    summary:
      "A chronic condition where the body doesn't use insulin properly, leading to high blood sugar. Managed with lifestyle changes and oral or injectable antidiabetic drugs.",
    prevalence: {
      stat: "29.1 million people in the US have diagnosed diabetes, including 28.8 million adults.",
      source: {
        title: "CDC — National Diabetes Statistics Report (2026)",
        url: "https://www.cdc.gov/diabetes/php/data-research/index.html",
      },
    },
    geographic: {
      note: "Diagnosed diabetes prevalence among adults varies from 7.7% in Vermont to 15.0% in West Virginia (national average: 10.3%) — many of the highest-prevalence states are in the South, the lowest in the Mountain West and New England.",
      source: {
        title: "Visual Capitalist, using CDC U.S. Diabetes Surveillance System data (2023)",
        url: "https://www.visualcapitalist.com/mapped-highest-diabetes-rates-by-state/",
      },
    },
  },
  {
    slug: "hypertension",
    name: "Hypertension (High Blood Pressure)",
    categories: ["ACE Inhibitor", "Beta Blocker", "Diuretic"],
    summary:
      "Persistently elevated blood pressure that raises the risk of heart attack and stroke. Several unrelated drug classes are used to lower it, often in combination.",
    prevalence: {
      stat: "48.1% of US adults — about 119.9 million people — have high blood pressure. Only about 1 in 4 (22.5%) have it under control.",
      source: {
        title: "CDC — High Blood Pressure Facts",
        url: "https://www.cdc.gov/high-blood-pressure/data-research/facts-stats/index.html",
      },
    },
  },
  {
    slug: "high-cholesterol",
    name: "High Cholesterol",
    categories: ["Statin"],
    summary:
      "Elevated LDL ('bad') cholesterol builds up in artery walls over time, raising cardiovascular risk. Statins are the first-line drug treatment.",
    prevalence: {
      stat: "About 25 million US adults have total cholesterol at or above 240 mg/dL, the CDC's 'high' threshold; 86 million are above the 200 mg/dL 'elevated' mark.",
      source: {
        title: "CDC — High Cholesterol Facts",
        url: "https://www.cdc.gov/cholesterol/data-research/facts-stats/index.html",
      },
    },
  },
  {
    slug: "depression",
    name: "Depression",
    categories: ["Antidepressant"],
    summary:
      "A mood disorder involving persistent sadness or loss of interest that interferes with daily life. Often treated with antidepressants, therapy, or both.",
    prevalence: {
      stat: "13.1% of people age 12+ had depression in the prior two weeks (Aug 2021–Aug 2023) — up from earlier years. Rates are highest among females, teens and young adults, and lower-income households.",
      source: {
        title: "CDC NCHS Data Brief No. 527 (2025)",
        url: "https://www.cdc.gov/nchs/products/databriefs/db527.htm",
      },
    },
    geographic: {
      note: "A separate CDC measure — the share of adults who report ever being diagnosed with depression — ranges from 12.7% in Hawaii to 26.4% in West Virginia (nationally, about 1 in 5 adults report an ever-diagnosis); higher rates cluster in Appalachian states alongside other chronic conditions.",
      source: {
        title: "Becker's Hospital Review, citing CDC state-level depression data",
        url: "https://www.beckershospitalreview.com/quality/public-health/depression-rates-by-state-cdc/",
      },
    },
  },
  {
    slug: "asthma",
    name: "Asthma",
    categories: ["Bronchodilator", "Corticosteroid"],
    summary:
      "A chronic airway condition causing wheezing, shortness of breath, and coughing. Managed with fast-acting bronchodilators for flare-ups and inhaled corticosteroids for long-term control.",
    prevalence: {
      stat: "8.9% of US adults — about 23 million people — currently have asthma.",
      source: {
        title: "CDC — Most Recent National Asthma Data",
        url: "https://www.cdc.gov/asthma-data/about/most-recent-asthma-data.html",
      },
    },
  },
  {
    slug: "antibiotic-resistant-infections",
    name: "Antibiotic-Resistant Infections",
    categories: ["Antibiotic"],
    summary:
      "Infections caused by bacteria that no longer respond to one or more antibiotics, making the right drug choice — and not overusing antibiotics — increasingly important.",
    prevalence: {
      stat: "More than 2.8 million antimicrobial-resistant infections occur in the US each year, causing over 35,000 deaths — rising to 3 million infections and 48,000 deaths when C. difficile is included.",
      source: {
        title: "CDC — Antimicrobial Resistance Threats Report (2019)",
        url: "https://www.cdc.gov/antimicrobial-resistance/about/index.html",
      },
    },
  },
];

export function getIllnessBySlug(slug: string): Illness | undefined {
  return illnesses.find((i) => i.slug === slug);
}

// Used on drug entry pages to link back to the condition(s) that drug class
// treats — the reverse direction of the categories field above.
export function getIllnessesForCategory(category: DrugCategory): Illness[] {
  return illnesses.filter((i) => i.categories.includes(category));
}
