import type { DrugCategory } from "./drugs";
import type { Source } from "./trends";

/**
 * Condition content — real, cited public-health figures for prevalence/
 * geographic data (same bar as data/trends.ts — never invented numbers).
 * symptoms/treatment are standard, well-established medical knowledge (the
 * same "write it straight, no citation needed" bar as drugs.ts's mechanism/
 * history/hazards fields) rather than numeric claims that need a source.
 *
 * "Geographic" here means real, published aggregate data (national and,
 * where a verified source exists, state-level) — not a live "conditions
 * near you" feature. No free source exists for that; see AGENTS.md for why.
 */

export type Condition = {
  slug: string;
  name: string;
  // Which of data/drugs.ts's DrugCategory values are used to treat this —
  // powers the "drugs used for this" list on the condition page.
  categories: DrugCategory[];
  summary: string;
  // What it commonly feels like / presents as. Kept short and recognizable
  // rather than an exhaustive clinical list — informational level only, per
  // AGENTS.md's Hard rules (this is a symptom overview, not a diagnostic
  // tool, and the page says so).
  symptoms: string[];
  // How it's typically managed — drug classes AND non-drug approaches
  // (lifestyle, monitoring) where relevant, since real treatment usually
  // isn't drugs alone. No dosing information — see Hard rules.
  treatment: string;
  prevalence: { stat: string; source: Source };
  geographic?: { note: string; source: Source };
};

export const conditions: Condition[] = [
  {
    slug: "type-2-diabetes",
    name: "Type 2 Diabetes",
    categories: ["Antidiabetic"],
    summary:
      "A chronic condition where the body doesn't use insulin properly, leading to high blood sugar. Managed with lifestyle changes and oral or injectable antidiabetic drugs.",
    symptoms: [
      "Increased thirst and frequent urination",
      "Fatigue",
      "Blurred vision",
      "Slow-healing sores or frequent infections",
      "Unintended weight loss",
      "Often no noticeable symptoms in early stages — many cases are found on routine blood work",
    ],
    treatment:
      "First-line management combines lifestyle changes (diet, weight management, physical activity) with oral antidiabetic drugs like metformin; if blood sugar isn't controlled, other oral agents or injectable medications (including insulin) are added. Regular blood sugar monitoring guides treatment adjustments over time.",
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
    symptoms: [
      "Usually no symptoms at all — often called a \"silent\" condition, found through routine blood pressure checks",
      "Severely elevated blood pressure can cause headache, shortness of breath, or nosebleeds, but this is uncommon and not a reliable way to detect it",
    ],
    treatment:
      "Lifestyle changes (reducing sodium intake, regular exercise, limiting alcohol, weight management) are first-line for milder cases. Drug treatment often combines classes with different mechanisms — ACE inhibitors, beta blockers, and diuretics are among the most common — since combining classes at moderate levels tends to control blood pressure better than one drug alone.",
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
    symptoms: [
      "No symptoms — high cholesterol is detected almost exclusively through a blood test (a lipid panel), not how someone feels",
      "Very high, often genetic forms can cause visible fatty deposits around the eyes or in tendons, but this is rare",
    ],
    treatment:
      "Diet and exercise changes are recommended first or alongside medication. Statins are the first-line drug treatment for most people who need one, working by reducing how much cholesterol the liver produces; other drug classes are used when statins aren't tolerated or aren't enough on their own.",
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
    symptoms: [
      "Persistent sad, empty, or hopeless mood",
      "Loss of interest or pleasure in activities once enjoyed",
      "Changes in sleep (too much or too little) and appetite",
      "Fatigue or low energy",
      "Difficulty concentrating or making decisions",
      "Feelings of worthlessness or excessive guilt",
    ],
    treatment:
      "Antidepressants (often paired with psychotherapy, such as cognitive behavioral therapy) are the most common medical treatment; different antidepressant classes work through different mechanisms, and finding an effective one can take some trial and adjustment under a provider's guidance. Mild cases are sometimes managed with therapy and lifestyle support alone.",
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
    symptoms: [
      "Wheezing (a whistling sound when breathing)",
      "Shortness of breath",
      "Chest tightness",
      "Coughing, especially at night or early morning, or triggered by exercise/cold air",
      "Symptoms come and go in flare-ups rather than being constant",
    ],
    treatment:
      "Two treatment roles, usually combined: fast-acting ('rescue') bronchodilators relieve symptoms during a flare-up, while inhaled corticosteroids are taken regularly to reduce airway inflammation and prevent flare-ups from happening in the first place. Identifying and avoiding personal triggers (allergens, smoke, exercise in cold air) is part of standard management alongside medication.",
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
    symptoms: [
      "Symptoms match whatever infection is present (fever, localized pain/swelling, etc.) — resistance itself has no distinct symptom",
      "The main warning sign is an infection that doesn't improve, or gets worse, after a course of antibiotics that would normally treat it",
    ],
    treatment:
      "Treatment depends on identifying which antibiotics the specific bacteria still respond to, usually via a lab culture, then switching to an effective drug class — sometimes a combination. Prevention matters as much as treatment: only using antibiotics when actually needed, and completing prescribed courses, slows the development of new resistance.",
    prevalence: {
      stat: "More than 2.8 million antimicrobial-resistant infections occur in the US each year, causing over 35,000 deaths — rising to 3 million infections and 48,000 deaths when C. difficile is included.",
      source: {
        title: "CDC — Antimicrobial Resistance Threats Report (2019)",
        url: "https://www.cdc.gov/antimicrobial-resistance/about/index.html",
      },
    },
  },
];

export function getConditionBySlug(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}

// Used on drug entry pages to link back to the condition(s) that drug class
// treats — the reverse direction of the categories field above.
export function getConditionsForCategory(category: DrugCategory): Condition[] {
  return conditions.filter((c) => c.categories.includes(category));
}
