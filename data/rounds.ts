import type { DrugCategory } from "./drugs";

// Both games are organized into standardized "rounds" — a curated set of 4
// drug classes at a time, grouped so the classes in a round relate to each
// other (same body system or use case). This keeps each round's card count
// even (every category now has exactly 4 entries: 4 classes x 4 cards = 16
// cards per round) and keeps the board from ever showing all 19 classes at
// once, which was the source of the "awkward, cluttered" feedback earlier.
//
// Rounds rotate in order and wrap back to the first after the last one.

export type GameRound = {
  title: string;
  categories: DrugCategory[];
};

export const GAME_ROUNDS: GameRound[] = [
  {
    title: "Pain & Mind",
    categories: ["Opioid", "Analgesic", "Benzodiazepine", "Antidepressant"],
  },
  {
    title: "Infection & Defense",
    categories: ["Antibiotic", "Antiviral", "Anticoagulant", "Antihistamine"],
  },
  {
    title: "Metabolic & Hormonal",
    categories: ["Antidiabetic", "Hormone", "Statin", "ACE Inhibitor"],
  },
  {
    title: "Heart & Lungs",
    categories: ["Beta Blocker", "Diuretic", "Bronchodilator", "Corticosteroid"],
  },
  {
    title: "Brain & Gut",
    categories: ["Antipsychotic", "Stimulant", "PPI"],
  },
];
