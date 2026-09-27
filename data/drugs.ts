export type DrugCategory =
  | "Opioid"
  | "Stimulant"
  | "Antibiotic"
  | "Analgesic"
  | "Antidiabetic"
  | "Hormone"
  | "Benzodiazepine"
  | "Antidepressant"
  | "Statin"
  | "ACE Inhibitor"
  | "Beta Blocker"
  | "Anticoagulant"
  | "PPI"
  | "Antihistamine"
  | "Antipsychotic"
  | "Corticosteroid"
  | "Antiviral"
  | "Diuretic"
  | "Bronchodilator";

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
  {
    slug: "diazepam",
    letter: "D",
    name: "Diazepam",
    practicalName: "Valium",
    drugClass: "Benzodiazepine",
    category: "Benzodiazepine",
    cid: 3016,
    formula: "C16H13ClN2O",
    molecularWeight: 284.74,
    molecularWeightLabel: "284.74 g/mol",
    discovered: "Synthesized 1959 by Leo Sternbach at Hoffmann-La Roche; approved 1963",
    mechanism:
      "Enhances the effect of GABA, the brain's main calming neurotransmitter, by binding a site on the GABA-A receptor. This makes the receptor more responsive, producing sedation, muscle relaxation, and reduced anxiety.",
    history:
      "Diazepam followed close behind the first benzodiazepine, chlordiazepoxide, and quickly became one of the best-selling drugs of the 20th century as safer alternative to older sedatives like barbiturates.",
    hazards:
      "Long-term use carries a real risk of physical dependence and difficult withdrawal. Combining it with alcohol or opioids significantly increases the risk of dangerous respiratory depression.",
  },
  {
    slug: "lorazepam",
    letter: "L",
    name: "Lorazepam",
    practicalName: "Ativan",
    drugClass: "Benzodiazepine",
    category: "Benzodiazepine",
    cid: 3958,
    formula: "C15H10Cl2N2O2",
    molecularWeight: 321.16,
    molecularWeightLabel: "321.16 g/mol",
    discovered: "Developed 1971 by Wyeth; approved for use in 1977",
    mechanism:
      "Works the same way as diazepam — boosting GABA-A receptor activity — but is metabolized more simply by the liver, which makes its effects more predictable in patients with liver impairment.",
    history:
      "Became a preferred option in hospital settings partly because its straightforward metabolism means it interacts with fewer other medications than older benzodiazepines.",
    hazards:
      "Shares the dependence and withdrawal risks common to the benzodiazepine class. Sedation and memory impairment are more pronounced at higher doses.",
  },
  {
    slug: "sertraline",
    letter: "S",
    name: "Sertraline",
    practicalName: "Zoloft",
    drugClass: "SSRI antidepressant",
    category: "Antidepressant",
    cid: 68617,
    formula: "C17H17Cl2N",
    molecularWeight: 306.23,
    molecularWeightLabel: "306.23 g/mol",
    discovered: "Developed by Pfizer; FDA approved 1991",
    mechanism:
      "Blocks the reuptake transporter for serotonin, leaving more of it available in the synapse between neurons. The mood-related effects build gradually as the brain adapts, typically over several weeks.",
    history:
      "Part of the wave of SSRIs that reshaped depression treatment starting in the late 1980s, offering a notably safer overdose profile than the older tricyclic antidepressants they largely replaced.",
    hazards:
      "Common side effects include nausea and sexual dysfunction. Carries an FDA boxed warning for increased suicidal thinking in young people during early treatment. Abruptly stopping can cause withdrawal-like symptoms.",
  },
  {
    slug: "fluoxetine",
    letter: "F",
    name: "Fluoxetine",
    practicalName: "Prozac",
    drugClass: "SSRI antidepressant",
    category: "Antidepressant",
    cid: 3386,
    formula: "C17H18F3NO",
    molecularWeight: 309.33,
    molecularWeightLabel: "309.33 g/mol",
    discovered: "Developed by Eli Lilly; FDA approved 1987",
    mechanism:
      "Like sertraline, blocks serotonin reuptake — but its very long half-life means it clears the body slowly, which can soften withdrawal effects when treatment stops.",
    history:
      "The first SSRI to reach the US market, fluoxetine's arrival is widely credited with normalizing depression treatment and dramatically expanding how many people sought care for it.",
    hazards:
      "Same boxed warning as other SSRIs for suicidal thinking in younger patients. Its long half-life means side effects can persist for weeks after stopping.",
  },
  {
    slug: "atorvastatin",
    letter: "A",
    name: "Atorvastatin",
    practicalName: "Lipitor",
    drugClass: "Statin",
    category: "Statin",
    cid: 60823,
    formula: "C33H35FN2O5",
    molecularWeight: 558.64,
    molecularWeightLabel: "558.64 g/mol",
    discovered: "Developed by Warner-Lambert (later Pfizer); FDA approved 1996",
    mechanism:
      "Blocks HMG-CoA reductase, the liver enzyme that controls the rate-limiting step of cholesterol production, which in turn prompts liver cells to pull more LDL cholesterol out of the bloodstream.",
    history:
      "Went on to become the best-selling drug in pharmaceutical history for a period, on the strength of large trials showing it reduced heart attacks and strokes in a wide range of patients.",
    hazards:
      "Can cause muscle pain and, rarely, serious muscle breakdown (rhabdomyolysis). Requires liver-function monitoring, and interacts with several other common medications.",
  },
  {
    slug: "simvastatin",
    letter: "S",
    name: "Simvastatin",
    practicalName: "Zocor",
    drugClass: "Statin",
    category: "Statin",
    cid: 54454,
    formula: "C25H38O5",
    molecularWeight: 418.57,
    molecularWeightLabel: "418.57 g/mol",
    discovered: "Developed by Merck; FDA approved 1991",
    mechanism:
      "Works the same way as atorvastatin, inhibiting HMG-CoA reductase, but is given as an inactive prodrug that the liver converts into its active form after absorption.",
    history:
      "One of the earliest statins to demonstrate a clear survival benefit in large clinical trials, helping establish cholesterol-lowering drugs as a mainstay of heart disease prevention.",
    hazards:
      "Same muscle-related and liver-monitoring concerns as other statins, with a particularly notable interaction risk when combined with grapefruit juice.",
  },
  {
    slug: "lisinopril",
    letter: "L",
    name: "Lisinopril",
    practicalName: "Zestril · Prinivil",
    drugClass: "ACE inhibitor",
    category: "ACE Inhibitor",
    cid: 5362119,
    formula: "C21H31N3O5",
    molecularWeight: 405.49,
    molecularWeightLabel: "405.49 g/mol",
    discovered: "Developed by Merck; FDA approved 1987",
    mechanism:
      "Blocks the angiotensin-converting enzyme (ACE) that produces angiotensin II, a hormone that narrows blood vessels. With less angiotensin II around, vessels relax and blood pressure drops.",
    history:
      "Part of the ACE inhibitor class that followed captopril, the first drug of its kind, lisinopril became a first-line treatment for high blood pressure and heart failure because it only needs to be taken once a day.",
    hazards:
      "Can cause a persistent dry cough in some patients. Carries a rare but serious risk of angioedema (rapid tissue swelling). Not recommended during pregnancy due to risk to fetal development.",
  },
  {
    slug: "enalapril",
    letter: "E",
    name: "Enalapril",
    practicalName: "Vasotec",
    drugClass: "ACE inhibitor",
    category: "ACE Inhibitor",
    cid: 5388962,
    formula: "C20H28N2O5",
    molecularWeight: 376.45,
    molecularWeightLabel: "376.45 g/mol",
    discovered: "Developed by Merck; FDA approved 1985",
    mechanism:
      "A prodrug that the liver converts into enalaprilat, the active form that blocks ACE the same way lisinopril does, reducing angiotensin II and relaxing blood vessels.",
    history:
      "One of the earliest ACE inhibitors to reach the market, enalapril helped establish the class as a mainstay for hypertension and heart failure treatment through the 1980s.",
    hazards:
      "Shares the dry cough and angioedema risks common to ACE inhibitors. Requires kidney-function monitoring, particularly when starting treatment.",
  },
  {
    slug: "metoprolol",
    letter: "M",
    name: "Metoprolol",
    practicalName: "Lopressor · Toprol-XL",
    drugClass: "Beta blocker",
    category: "Beta Blocker",
    cid: 4171,
    formula: "C15H25NO3",
    molecularWeight: 267.36,
    molecularWeightLabel: "267.36 g/mol",
    discovered: "Developed by Hässle (Sweden, later AstraZeneca); approved 1978",
    mechanism:
      "Selectively blocks beta-1 adrenergic receptors, mainly found in the heart, reducing heart rate and the force of each contraction — lowering blood pressure and the heart's workload.",
    history:
      "Metoprolol's selectivity for heart-specific beta-1 receptors, rather than the beta-2 receptors found in the lungs, made it a safer option than earlier beta blockers for patients with respiratory conditions like asthma.",
    hazards:
      "Can cause fatigue and slow heart rate (bradycardia). Stopping abruptly after long-term use can trigger a rebound spike in heart rate and blood pressure, so tapering is important.",
  },
  {
    slug: "propranolol",
    letter: "P",
    name: "Propranolol",
    practicalName: "Inderal",
    drugClass: "Beta blocker",
    category: "Beta Blocker",
    cid: 4946,
    formula: "C16H21NO2",
    molecularWeight: 259.34,
    molecularWeightLabel: "259.34 g/mol",
    discovered: "Developed 1964 by Sir James Black; approved 1967",
    mechanism:
      "Blocks both beta-1 and beta-2 adrenergic receptors non-selectively, reducing heart rate and blood pressure while also affecting the lungs and blood vessels elsewhere in the body.",
    history:
      "The first successful beta blocker ever developed, propranolol's invention is considered one of the most significant contributions to cardiovascular medicine — its creator, James Black, later won a Nobel Prize partly for this work.",
    hazards:
      "Because it isn't heart-selective, it can worsen asthma and other breathing conditions. Also masks the warning signs of low blood sugar in people with diabetes.",
  },
  {
    slug: "warfarin",
    letter: "W",
    name: "Warfarin",
    practicalName: "Coumadin",
    drugClass: "Anticoagulant",
    category: "Anticoagulant",
    cid: 6691,
    formula: "C19H16O4",
    molecularWeight: 308.33,
    molecularWeightLabel: "308.33 g/mol",
    discovered: "Discovered 1948 at the Wisconsin Alumni Research Foundation; approved for medical use 1954",
    mechanism:
      "Blocks an enzyme the liver needs to recycle vitamin K, which in turn is required to produce several blood-clotting factors. Less active vitamin K means a slower, more controlled clotting response.",
    history:
      "Originally developed and sold as a rat poison, warfarin was found to be safely dosable in humans and became the dominant oral anticoagulant for over 50 years, despite requiring regular blood tests to keep its effect in a safe range.",
    hazards:
      "Narrow therapeutic window — too little fails to prevent clots, too much causes dangerous bleeding. Interacts with a huge range of foods and other medications, especially anything affecting vitamin K intake.",
  },
  {
    slug: "apixaban",
    letter: "A",
    name: "Apixaban",
    practicalName: "Eliquis",
    drugClass: "Anticoagulant",
    category: "Anticoagulant",
    cid: 10182969,
    formula: "C25H25N5O4",
    molecularWeight: 459.5,
    molecularWeightLabel: "459.5 g/mol",
    discovered: "Developed by Bristol-Myers Squibb and Pfizer; FDA approved 2012",
    mechanism:
      "Directly inhibits Factor Xa, a specific clotting-cascade enzyme, rather than acting broadly on vitamin K like warfarin — giving it a more predictable effect without routine blood monitoring.",
    history:
      "Part of a newer generation of anticoagulants designed to sidestep warfarin's monitoring requirements and unpredictable food interactions, apixaban has become one of the most widely prescribed blood thinners.",
    hazards:
      "Still carries a real bleeding risk, including rare but serious internal bleeding. Unlike warfarin, it has no simple at-home test to check its blood level.",
  },
  {
    slug: "omeprazole",
    letter: "O",
    name: "Omeprazole",
    practicalName: "Prilosec",
    drugClass: "Proton pump inhibitor",
    category: "PPI",
    cid: 4594,
    formula: "C17H19N3O3S",
    molecularWeight: 345.42,
    molecularWeightLabel: "345.42 g/mol",
    discovered: "Developed by AB Hässle (Sweden); FDA approved 1989",
    mechanism:
      "Irreversibly blocks the proton pump in stomach lining cells that produces gastric acid, cutting acid output more completely and for longer than older acid-reducing drugs.",
    history:
      "The first proton pump inhibitor to reach the market, omeprazole transformed treatment of ulcers and acid reflux and became one of the best-selling drugs in the world through the 1990s and 2000s.",
    hazards:
      "Long-term use is associated with reduced absorption of vitamin B12, magnesium, and calcium, and a modestly increased risk of certain infections and bone fractures.",
  },
  {
    slug: "esomeprazole",
    letter: "E",
    name: "Esomeprazole",
    practicalName: "Nexium",
    drugClass: "Proton pump inhibitor",
    category: "PPI",
    cid: 9579578,
    formula: "C17H19N3O3S",
    molecularWeight: 345.42,
    molecularWeightLabel: "345.42 g/mol",
    discovered: "Developed by AstraZeneca; FDA approved 2001",
    mechanism:
      "Works identically to omeprazole — it's actually the single active mirror-image molecule (isomer) that omeprazole is a 50/50 mixture of, isolated for slightly more consistent absorption.",
    history:
      "Esomeprazole was developed largely as omeprazole's patent protection was expiring, a common pharmaceutical strategy of refining an existing drug into a new patentable version — sometimes called an 'evergreening' drug.",
    hazards:
      "Shares the same long-term nutrient-absorption and infection-risk concerns as omeprazole and other proton pump inhibitors.",
  },
  {
    slug: "loratadine",
    letter: "L",
    name: "Loratadine",
    practicalName: "Claritin",
    drugClass: "Antihistamine",
    category: "Antihistamine",
    cid: 3957,
    formula: "C22H23ClN2O2",
    molecularWeight: 382.88,
    molecularWeightLabel: "382.88 g/mol",
    discovered: "Developed by Schering-Plough; FDA approved 1993",
    mechanism:
      "Blocks H1 histamine receptors, preventing histamine — released during an allergic reaction — from triggering the sneezing, itching, and swelling of typical allergy symptoms.",
    history:
      "Designed specifically to cross into the brain far less than older antihistamines like diphenhydramine, loratadine helped define the 'non-drowsy' generation of allergy medication.",
    hazards:
      "Generally well-tolerated. Rare side effects include headache and dry mouth; drowsiness is much less common than with first-generation antihistamines.",
  },
  {
    slug: "diphenhydramine",
    letter: "D",
    name: "Diphenhydramine",
    practicalName: "Benadryl",
    drugClass: "Antihistamine",
    category: "Antihistamine",
    cid: 3100,
    formula: "C17H21NO",
    molecularWeight: 255.35,
    molecularWeightLabel: "255.35 g/mol",
    discovered: "Discovered 1943 by George Rieveschl; approved for medical use 1946",
    mechanism:
      "Blocks H1 histamine receptors like loratadine, but crosses easily into the brain, where it also blocks other signaling pathways — which is why it causes noticeable drowsiness.",
    history:
      "One of the first antihistamines ever developed, diphenhydramine's sedating side effect was so pronounced that it was later repurposed and marketed separately as an over-the-counter sleep aid.",
    hazards:
      "Causes significant drowsiness and impaired coordination — a real concern for driving or operating machinery. Older adults are especially sensitive to its effects on memory and confusion.",
  },
  {
    slug: "risperidone",
    letter: "R",
    name: "Risperidone",
    practicalName: "Risperdal",
    drugClass: "Antipsychotic",
    category: "Antipsychotic",
    cid: 5073,
    formula: "C23H27FN4O2",
    molecularWeight: 410.49,
    molecularWeightLabel: "410.49 g/mol",
    discovered: "Developed by Janssen Pharmaceutica; FDA approved 1993",
    mechanism:
      "Blocks both dopamine and serotonin receptors in the brain, a combination that helps manage symptoms of schizophrenia and bipolar disorder with a somewhat different side-effect profile than older antipsychotics.",
    history:
      "Part of the 'atypical' or second-generation antipsychotics that emerged from research trying to reduce the movement-related side effects common with earlier drugs in the class.",
    hazards:
      "Can cause weight gain and metabolic changes like elevated blood sugar. Still carries some risk of movement disorders, though generally less than first-generation antipsychotics.",
  },
  {
    slug: "haloperidol",
    letter: "H",
    name: "Haloperidol",
    practicalName: "Haldol",
    drugClass: "Antipsychotic",
    category: "Antipsychotic",
    cid: 3559,
    formula: "C21H23ClFNO2",
    molecularWeight: 375.86,
    molecularWeightLabel: "375.86 g/mol",
    discovered: "Discovered 1958 by Paul Janssen; approved for medical use in the early 1960s",
    mechanism:
      "Strongly blocks dopamine receptors in the brain, reducing the excess dopamine signaling linked to hallucinations and delusions in conditions like schizophrenia.",
    history:
      "One of the earliest and most widely used first-generation ('typical') antipsychotics, haloperidol remains in use today, particularly in acute settings, despite newer alternatives.",
    hazards:
      "Higher risk of movement-related side effects (tremor, rigidity) than newer antipsychotics, including a rare but serious risk of persistent involuntary movements with long-term use.",
  },
  {
    slug: "prednisone",
    letter: "P",
    name: "Prednisone",
    practicalName: "Deltasone",
    drugClass: "Corticosteroid",
    category: "Corticosteroid",
    cid: 5865,
    formula: "C21H26O5",
    molecularWeight: 358.43,
    molecularWeightLabel: "358.43 g/mol",
    discovered: "Developed by Schering Corporation; approved for medical use 1955",
    mechanism:
      "A synthetic version of cortisol that the liver converts into its active form, prednisolone. It broadly suppresses the immune system and reduces inflammation across the body.",
    history:
      "Following the discovery of cortisone's anti-inflammatory effects in the late 1940s, prednisone was developed as a more potent, longer-acting synthetic alternative and became a cornerstone treatment for autoimmune and inflammatory conditions.",
    hazards:
      "Long-term use is linked to bone density loss, weight gain, elevated blood sugar, and increased infection risk. Must typically be tapered off gradually rather than stopped abruptly.",
  },
  {
    slug: "dexamethasone",
    letter: "D",
    name: "Dexamethasone",
    practicalName: "Decadron",
    drugClass: "Corticosteroid",
    category: "Corticosteroid",
    cid: 5743,
    formula: "C22H29FO5",
    molecularWeight: 392.46,
    molecularWeightLabel: "392.46 g/mol",
    discovered: "Developed by Merck; approved for medical use 1958",
    mechanism:
      "Works like prednisone but is significantly more potent gram-for-gram and longer-lasting, making it useful in situations needing a strong, sustained anti-inflammatory effect.",
    history:
      "Gained global public attention during the COVID-19 pandemic when a large UK trial found it reduced deaths in critically ill, oxygen-dependent patients — one of the first treatments shown to do so.",
    hazards:
      "Shares the same long-term risks as other corticosteroids — bone loss, elevated blood sugar, and immune suppression — often at lower doses than prednisone due to its higher potency.",
  },
  {
    slug: "oseltamivir",
    letter: "O",
    name: "Oseltamivir",
    practicalName: "Tamiflu",
    drugClass: "Antiviral",
    category: "Antiviral",
    cid: 65028,
    formula: "C16H28N2O4",
    molecularWeight: 312.4,
    molecularWeightLabel: "312.4 g/mol",
    discovered: "Developed by Gilead Sciences, licensed to Roche; FDA approved 1999",
    mechanism:
      "Blocks neuraminidase, an enzyme the influenza virus needs to break free from infected cells and spread further through the body — slowing the infection rather than clearing it instantly.",
    history:
      "Originally synthesized from shikimic acid extracted from Chinese star anise, oseltamivir became a globally stockpiled antiviral during pandemic flu preparedness efforts in the 2000s.",
    hazards:
      "Most effective when started within the first two days of symptoms. Common side effects include nausea; rare neuropsychiatric effects have been reported, mostly in children.",
  },
  {
    slug: "acyclovir",
    letter: "A",
    name: "Acyclovir",
    practicalName: "Zovirax",
    drugClass: "Antiviral",
    category: "Antiviral",
    cid: 2022,
    formula: "C8H11N5O3",
    molecularWeight: 225.2,
    molecularWeightLabel: "225.2 g/mol",
    discovered: "Discovered in the 1970s by Gertrude Elion; FDA approved 1982",
    mechanism:
      "Gets converted into its active form only inside cells infected by herpesviruses, where it then blocks the viral enzyme needed to copy the virus's DNA — largely sparing healthy, uninfected cells.",
    history:
      "Its selective activity against infected cells was considered a landmark in antiviral design, and its discoverer, Gertrude Elion, later won the Nobel Prize in Physiology or Medicine partly for this work.",
    hazards:
      "Generally well-tolerated; can occasionally affect kidney function, especially at high doses or in patients with existing kidney impairment.",
  },
  {
    slug: "hydrochlorothiazide",
    letter: "H",
    name: "Hydrochlorothiazide",
    practicalName: "Microzide",
    drugClass: "Thiazide diuretic",
    category: "Diuretic",
    cid: 3639,
    formula: "C7H8ClN3O4S2",
    molecularWeight: 297.74,
    molecularWeightLabel: "297.74 g/mol",
    discovered: "Developed by Merck; approved for medical use 1959",
    mechanism:
      "Blocks sodium reabsorption in the kidneys, causing more sodium — and the water that follows it — to be excreted in urine, which lowers blood volume and blood pressure.",
    history:
      "One of the first practical oral diuretics, hydrochlorothiazide became a foundational blood pressure medication and remains one of the most commonly prescribed drugs in the world today.",
    hazards:
      "Can cause electrolyte imbalances, particularly low potassium and sodium. Increases sensitivity to sunlight and can raise blood sugar and uric acid levels.",
  },
  {
    slug: "furosemide",
    letter: "F",
    name: "Furosemide",
    practicalName: "Lasix",
    drugClass: "Loop diuretic",
    category: "Diuretic",
    cid: 3440,
    formula: "C12H11ClN2O5S",
    molecularWeight: 330.74,
    molecularWeightLabel: "330.74 g/mol",
    discovered: "Developed by Hoechst AG; approved for medical use 1966",
    mechanism:
      "Blocks sodium and chloride reabsorption in the loop of Henle, a section of the kidney's filtering system, producing a much stronger and faster diuretic effect than thiazides like hydrochlorothiazide.",
    history:
      "Its rapid, powerful effect made furosemide the go-to diuretic for emergency fluid overload situations, such as acute heart failure, where a slower-acting thiazide wouldn't act quickly enough.",
    hazards:
      "Can cause significant electrolyte loss and dehydration if not monitored. Rapid fluid loss can also affect blood pressure and kidney function.",
  },
  {
    slug: "albuterol",
    letter: "A",
    name: "Albuterol",
    practicalName: "Salbutamol · Ventolin",
    drugClass: "Short-acting beta-2 agonist",
    category: "Bronchodilator",
    cid: 2083,
    formula: "C13H21NO3",
    molecularWeight: 239.31,
    molecularWeightLabel: "239.31 g/mol",
    discovered: "Developed in the UK; approved for use 1968",
    mechanism:
      "Activates beta-2 adrenergic receptors in the smooth muscle lining the airways, causing them to relax and open up — providing fast relief during an asthma flare-up or bronchospasm.",
    history:
      "Its selectivity for beta-2 (airway) receptors over beta-1 (heart) receptors made it a much safer rescue inhaler than earlier bronchodilators, which often caused unwanted heart-racing side effects.",
    hazards:
      "Overuse can cause tremor, rapid heartbeat, and jitteriness. Relying on it too frequently is generally a sign that a person's underlying asthma isn't well controlled.",
  },
  {
    slug: "salmeterol",
    letter: "S",
    name: "Salmeterol",
    practicalName: "Serevent",
    drugClass: "Long-acting beta-2 agonist",
    category: "Bronchodilator",
    cid: 5152,
    formula: "C25H37NO4",
    molecularWeight: 415.57,
    molecularWeightLabel: "415.57 g/mol",
    discovered: "Developed by Allen & Hanburys (GlaxoSmithKline); approved for use 1994",
    mechanism:
      "Activates the same beta-2 receptors as albuterol, but its longer molecular tail anchors it in the airway tissue, giving it an effect that lasts around 12 hours instead of a few.",
    history:
      "Designed for long-term asthma and COPD control rather than emergency relief, salmeterol is typically paired with an inhaled corticosteroid rather than used as a standalone rescue inhaler.",
    hazards:
      "Carries a boxed warning against use as a standalone asthma treatment, since long-acting beta agonists used alone have been linked to an increased risk of severe asthma episodes.",
  },

];

export function getDrugBySlug(slug: string) {
  return drugs.find((d) => d.slug === slug);
}
