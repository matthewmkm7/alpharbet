export type DrugCategory =
  | "Opioid"
  | "Stimulant"
  | "Antibiotic"
  | "Analgesic"
  | "Antidiabetic"
  | "Hormone";

export type DrugEntry = {
  slug: string;
  letter: string;
  name: string;
  practicalName: string;
  drugClass: string;
  category: DrugCategory;
  cid: number; // PubChem Compound ID — used to fetch structure data live
  formula: string;
  molecularWeight: number; // grams/mol, numeric for sorting in games
  molecularWeightLabel: string;
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
    category: "Antibiotic",
    cid: 33613,
    formula: "C16H19N3O5S",
    molecularWeight: 365.4,
    molecularWeightLabel: "365.4 g/mol",
    discovered: "Developed early 1970s by Beecham (UK); FDA approved 1974",
    mechanism:
      "Binds penicillin-binding proteins in the bacterial cell wall, blocking the final cross-linking step of peptidoglycan synthesis. Without a stable wall, growing bacteria rupture from their own internal pressure.",
    history:
      "A semisynthetic descendant of penicillin, amoxicillin was engineered to survive stomach acid and absorb better when taken orally than its predecessor, ampicillin — a small structural change that made it one of the most prescribed antibiotics in the world.",
    hazards:
      "Common allergen, with cross-reactivity risk in patients allergic to other penicillins and some cephalosporins. Can reduce the effectiveness of hormonal contraceptives. Overuse contributes to antibiotic resistance.",
  },
  {
    slug: "penicillin-g",
    letter: "P",
    name: "Penicillin G",
    practicalName: "Benzylpenicillin",
    drugClass: "Beta-lactam antibiotic",
    category: "Antibiotic",
    cid: 5904,
    formula: "C16H18N2O4S",
    molecularWeight: 334.39,
    molecularWeightLabel: "334.39 g/mol",
    discovered: "Discovered 1928 by Alexander Fleming; mass-produced for clinical use by 1943",
    mechanism:
      "Like amoxicillin, blocks the transpeptidase enzymes bacteria use to cross-link their cell wall — but penicillin G was the original molecule this entire drug class is built on.",
    history:
      "The discovery of penicillin is often called the single most transformative moment in modern medicine, turning bacterial infections that once killed routinely into treatable conditions almost overnight.",
    hazards:
      "Allergic reactions are relatively common. Breaks down in stomach acid, so it's typically given by injection rather than as a pill.",
  },
  {
    slug: "azithromycin",
    letter: "A",
    name: "Azithromycin",
    practicalName: "Zithromax · Z-Pack",
    drugClass: "Macrolide antibiotic",
    category: "Antibiotic",
    cid: 447043,
    formula: "C38H72N2O12",
    molecularWeight: 748.98,
    molecularWeightLabel: "748.98 g/mol",
    discovered: "Developed 1980 in Croatia; approved in the US in 1991",
    mechanism:
      "Binds the bacterial ribosome and blocks protein synthesis — a completely different point of attack than penicillin-class drugs, which target the cell wall instead.",
    history:
      "Prized for its unusually long half-life, azithromycin popularized the short, five-day treatment course — the classic 'Z-Pack' — at a time when most antibiotics required a week or more.",
    hazards:
      "Can cause GI upset. Carries a rare but serious risk of heart rhythm changes (QT prolongation) in susceptible patients.",
  },
  {
    slug: "aspirin",
    letter: "A",
    name: "Aspirin",
    practicalName: "Acetylsalicylic acid · Bayer",
    drugClass: "NSAID / antiplatelet",
    category: "Analgesic",
    cid: 2244,
    formula: "C9H8O4",
    molecularWeight: 180.16,
    molecularWeightLabel: "180.16 g/mol",
    discovered: "Synthesized 1897 by Felix Hoffmann at Bayer; marketed from 1899",
    mechanism:
      "Irreversibly inhibits the COX-1 and COX-2 enzymes, blocking prostaglandin synthesis. At low doses this mainly suppresses platelet aggregation; at higher doses it reduces pain, fever, and inflammation.",
    history:
      "One of the oldest synthetic drugs still in wide use, aspirin was derived from salicin, a compound found in willow bark used medicinally for centuries before its active ingredient was isolated and chemically stabilized.",
    hazards:
      "Raises the risk of gastrointestinal bleeding and ulcers. Linked to Reye's syndrome in children recovering from viral illness. Increases bleeding risk when combined with anticoagulants.",
  },
  {
    slug: "ibuprofen",
    letter: "I",
    name: "Ibuprofen",
    practicalName: "Advil · Motrin",
    drugClass: "NSAID",
    category: "Analgesic",
    cid: 3672,
    formula: "C13H18O2",
    molecularWeight: 206.28,
    molecularWeightLabel: "206.28 g/mol",
    discovered: "Developed 1960s by the Boots Group (UK); approved 1969",
    mechanism:
      "Reversibly inhibits COX-1 and COX-2 enzymes, reducing the prostaglandins that drive pain, fever, and inflammation — a shorter-acting, reversible cousin of aspirin's mechanism.",
    history:
      "Developed as a gentler alternative to aspirin for long-term arthritis treatment, ibuprofen went on to become one of the most widely used over-the-counter pain relievers worldwide.",
    hazards:
      "Can irritate the GI tract and raise ulcer risk with prolonged use. Associated with kidney strain, especially in dehydration. Higher doses carry increased cardiovascular risk.",
  },
  {
    slug: "paracetamol",
    letter: "P",
    name: "Paracetamol",
    practicalName: "Acetaminophen · Tylenol · Panadol",
    drugClass: "Analgesic / antipyretic",
    category: "Analgesic",
    cid: 1983,
    formula: "C8H9NO2",
    molecularWeight: 151.16,
    molecularWeightLabel: "151.16 g/mol",
    discovered: "First synthesized 1877; popularized clinically in the 1950s",
    mechanism:
      "Its exact mechanism is still debated, but it's thought to act centrally in the brain and spinal cord, modulating pain and fever pathways with far less effect on inflammation than NSAIDs like ibuprofen or aspirin.",
    history:
      "Despite being one of the most widely used medicines in the world, paracetamol's precise mechanism remained unclear for decades after it entered common use — a reminder that a drug can be trusted long before it's fully understood.",
    hazards:
      "Narrow safety margin — overdose is a leading cause of acute liver failure. Risk increases significantly when combined with alcohol or exceeding the recommended daily dose.",
  },
  {
    slug: "morphine",
    letter: "M",
    name: "Morphine",
    practicalName: "MS Contin",
    drugClass: "Opioid analgesic",
    category: "Opioid",
    cid: 5288826,
    formula: "C17H19NO3",
    molecularWeight: 285.34,
    molecularWeightLabel: "285.34 g/mol",
    discovered: "Isolated 1804 by Friedrich Sertürner — the first alkaloid ever isolated from a plant",
    mechanism:
      "Binds mu-opioid receptors in the central nervous system, mimicking the body's own endorphins to block pain signaling and produce sedation.",
    history:
      "Named after Morpheus, the Greek god of dreams, morphine's isolation from opium launched the entire field of alkaloid chemistry and remains the reference standard every other opioid painkiller is measured against.",
    hazards:
      "High potential for physical dependence. Can cause dangerous respiratory depression at excessive doses. Tolerance develops rapidly with repeated use.",
  },
  {
    slug: "codeine",
    letter: "C",
    name: "Codeine",
    practicalName: "Codeine phosphate",
    drugClass: "Opioid analgesic",
    category: "Opioid",
    cid: 5284371,
    formula: "C18H21NO3",
    molecularWeight: 299.36,
    molecularWeightLabel: "299.36 g/mol",
    discovered: "Isolated 1832 from opium; widely used medically by the mid-1800s",
    mechanism:
      "A comparatively weak opioid on its own, but the liver converts a portion of it into morphine — most of its pain relief actually comes from that conversion.",
    history:
      "Long valued as a gentler alternative to morphine for cough suppression and mild pain, though genetic differences in how people metabolize codeine can make its effects surprisingly unpredictable from person to person.",
    hazards:
      "Carries the same dependence risks as other opioids. Metabolism into morphine varies significantly between individuals, occasionally producing unexpectedly strong effects.",
  },
  {
    slug: "amphetamine",
    letter: "A",
    name: "Amphetamine",
    practicalName: "Benzedrine (historical)",
    drugClass: "Stimulant",
    category: "Stimulant",
    cid: 3007,
    formula: "C9H13N",
    molecularWeight: 135.21,
    molecularWeightLabel: "135.21 g/mol",
    discovered: "First synthesized 1887; marketed medically from the 1930s",
    mechanism:
      "Increases the release of dopamine and norepinephrine while blocking their reuptake in the brain, heightening alertness, focus, and energy.",
    history:
      "One of the first synthetic stimulants ever marketed as medicine, amphetamine went from an over-the-counter nasal inhaler in the 1930s to a tightly controlled prescription drug today, tracking a growing understanding of its dependence potential.",
    hazards:
      "Potential for dependence. Can strain the cardiovascular system through elevated heart rate and blood pressure. Overuse is linked to anxiety and sleep disruption.",
  },
  {
    slug: "methylphenidate",
    letter: "M",
    name: "Methylphenidate",
    practicalName: "Ritalin · Concerta",
    drugClass: "Stimulant",
    category: "Stimulant",
    cid: 4158,
    formula: "C14H19NO2",
    molecularWeight: 233.31,
    molecularWeightLabel: "233.31 g/mol",
    discovered: "First synthesized 1944; approved for medical use from 1955",
    mechanism:
      "Blocks the reuptake of dopamine and norepinephrine, producing effects similar to amphetamine through a different chemical structure and a somewhat more moderate profile.",
    history:
      "Became the primary medication for attention-deficit/hyperactivity disorder from the 1960s onward, fundamentally changing how the condition is diagnosed and managed.",
    hazards:
      "Potential for misuse and dependence. Can raise heart rate and blood pressure, and disrupt sleep if taken too late in the day.",
  },
  {
    slug: "metformin",
    letter: "M",
    name: "Metformin",
    practicalName: "Glucophage",
    drugClass: "Biguanide antidiabetic",
    category: "Antidiabetic",
    cid: 4091,
    formula: "C4H11N5",
    molecularWeight: 129.16,
    molecularWeightLabel: "129.16 g/mol",
    discovered: "Introduced clinically 1957 in France; FDA approved 1994",
    mechanism:
      "Reduces glucose production by the liver and improves the body's sensitivity to insulin, partly by activating an energy-sensing enzyme (AMPK) inside cells — without directly increasing insulin release.",
    history:
      "Derived from a compound found in the plant Galega officinalis, long used in folk medicine for symptoms resembling diabetes, metformin remains the first-line treatment for type 2 diabetes worldwide.",
    hazards:
      "Rare but serious risk of lactic acidosis, particularly in patients with kidney impairment. Commonly causes GI upset, especially when starting treatment.",
  },
  {
    slug: "insulin",
    letter: "I",
    name: "Insulin",
    practicalName: "Humulin · Novolin",
    drugClass: "Peptide hormone",
    category: "Hormone",
    cid: 70678557,
    formula: "C257H383N65O77S6",
    molecularWeight: 5808,
    molecularWeightLabel: "≈5,808 g/mol",
    discovered: "Discovered 1921 in Toronto by Banting and Best; first used clinically 1922",
    mechanism:
      "Binds the insulin receptor on cell surfaces, triggering glucose transporters to move to the cell membrane and pull glucose out of the bloodstream — the core signal the body uses to lower blood sugar after eating.",
    history:
      "The first hormone ever used therapeutically, insulin's discovery transformed type 1 diabetes from a near-certain death sentence into a manageable condition within a single year of its isolation.",
    hazards:
      "Overdose causes hypoglycemia, which can be life-threatening if untreated. Injection sites can develop lipodystrophy (fat tissue changes) with repeated use in the same spot.",
  },
];

export function getDrugBySlug(slug: string) {
  return drugs.find((d) => d.slug === slug);
}
