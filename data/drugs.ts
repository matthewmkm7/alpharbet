export type DrugEntry = {
  slug: string;
  letter: string;
  name: string;
  practicalName: string;
  drugClass: string;
  cid: number; // PubChem Compound ID — used to fetch structure data live
  formula: string;
  molecularWeight: string;
  discovered: string;
  mechanism: string;
  history: string;
  hazards: string;
};

export const drugs: DrugEntry[] = [
  {
    slug: "amoxicillin",
    letter: "A",
    name: "Amoxicillin",
    practicalName: "Amoxil · Trimox",
    drugClass: "Aminopenicillin antibiotic",
    cid: 33613,
    formula: "C16H19N3O5S",
    molecularWeight: "365.4 g/mol",
    discovered: "Developed early 1970s by Beecham (UK); FDA approved 1974",
    mechanism:
      "Binds penicillin-binding proteins in the bacterial cell wall, blocking the final cross-linking step of peptidoglycan synthesis. Without a stable wall, growing bacteria rupture from their own internal pressure.",
    history:
      "A semisynthetic descendant of penicillin, amoxicillin was engineered to survive stomach acid and absorb better when taken orally than its predecessor, ampicillin — a small structural change that made it one of the most prescribed antibiotics in the world.",
    hazards:
      "Common allergen, with cross-reactivity risk in patients allergic to other penicillins and some cephalosporins. Can reduce the effectiveness of hormonal contraceptives. Overuse contributes to antibiotic resistance.",
  },
];

export function getDrugBySlug(slug: string) {
  return drugs.find((d) => d.slug === slug);
}
