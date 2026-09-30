import pubchemProperties from "./pubchem-properties.json";

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
  sideEffects: string;
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
    sideEffects:
      "Commonly causes mild diarrhea, nausea, and a non-allergic skin rash, especially in children — most cases are mild and resolve after the course ends.",
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
    sideEffects:
      "Since it's usually given by injection, pain, redness, or swelling at the injection site is common; mild nausea and diarrhea occur less often.",
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
    sideEffects:
      "The most frequent complaints are stomach pain, mild diarrhea, and a temporary altered sense of taste; headache is also fairly common.",
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
    sideEffects:
      "Commonly causes stomach upset and heartburn even at doses well below those linked to ulcers; ringing in the ears (tinnitus) can signal too high a dose.",
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
    sideEffects:
      "Frequently causes mild stomach upset, heartburn, and headache; dizziness is also reported by some users.",
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
    sideEffects:
      "Well tolerated at normal doses, with few day-to-day side effects; occasional nausea or a mild rash has been reported.",
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
    sideEffects:
      "Commonly causes constipation, nausea, drowsiness, and itching — constipation in particular tends to persist throughout treatment rather than fading with continued use.",
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
    sideEffects:
      "Frequently causes constipation, nausea, drowsiness, and itching, similar to other opioids, though generally milder than with stronger opioids like morphine.",
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
    sideEffects:
      "Commonly causes decreased appetite, dry mouth, headache, and difficulty falling asleep.",
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
    sideEffects:
      "Frequently causes decreased appetite, stomach upset, headache, and trouble falling asleep, particularly early in treatment.",
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
    sideEffects:
      "Commonly causes diarrhea, nausea, and a metallic taste in the mouth, especially when starting treatment — symptoms that often ease once the body adjusts or the dose is taken with food.",
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
    sideEffects:
      "Common effects include weight gain and mild swelling; injection sites can also become red or itchy shortly after injection.",
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
    sideEffects:
      "Frequently causes drowsiness, muscle weakness, and impaired coordination, especially at the start of treatment or with higher doses.",
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
    sideEffects:
      "Commonly causes drowsiness, dizziness, and unsteadiness, particularly noticeable when starting treatment.",
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
    sideEffects:
      "Also commonly causes diarrhea, insomnia or drowsiness, and dry mouth, most pronounced in the first few weeks of treatment.",
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
    sideEffects:
      "Commonly causes nausea, insomnia, and decreased appetite, along with sexual side effects similar to other SSRIs.",
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
    sideEffects:
      "Commonly causes mild muscle aches and joint pain even without the rare breakdown risk noted above; headache and digestive upset are also reported.",
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
    sideEffects:
      "Frequently causes mild muscle aches, headache, and digestive upset such as constipation or gas.",
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
    sideEffects:
      "Aside from the cough noted above, commonly causes dizziness and fatigue, especially after the first dose.",
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
    sideEffects:
      "Commonly causes dizziness, headache, and fatigue, particularly when starting treatment.",
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
    sideEffects:
      "Can also cause cold hands and feet, dizziness, and vivid dreams or other sleep disturbances.",
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
    sideEffects:
      "Commonly causes fatigue, cold extremities, and vivid dreams; some patients also notice a slower resting heart rate.",
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
    sideEffects:
      "Aside from the bleeding risk noted above, minor bruising is common even at a properly managed dose; some patients also notice hair thinning with long-term use.",
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
    sideEffects:
      "Minor bruising and nosebleeds are relatively common even without a major bleeding event.",
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
    sideEffects:
      "Commonly causes headache, abdominal pain, and nausea; some patients notice diarrhea or gas.",
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
    sideEffects:
      "Commonly causes headache and mild abdominal discomfort, similar to omeprazole.",
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
    sideEffects:
      "Occasional mild drowsiness or dizziness has been reported, though most users notice no effects at all beyond allergy relief.",
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
    sideEffects:
      "Commonly causes dry mouth, blurred vision, and constipation, due to its broader effect on other neurotransmitter systems beyond histamine.",
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
    sideEffects:
      "Commonly causes drowsiness, dizziness, and increased prolactin levels, which can lead to menstrual changes or breast tenderness.",
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
    sideEffects:
      "Commonly causes drowsiness and dry mouth; some patients experience restlessness (akathisia) during treatment.",
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
    sideEffects:
      "Even short courses commonly cause increased appetite, mood changes, difficulty sleeping, and fluid retention.",
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
    sideEffects:
      "Shares prednisone's short-term effects — increased appetite, trouble sleeping, and mood swings — often more pronounced given its higher potency.",
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
    sideEffects:
      "Can also cause vomiting and headache; taking it with food reduces the nausea some people experience.",
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
    sideEffects:
      "Commonly causes nausea, headache, and mild diarrhea; topical forms can cause local skin irritation.",
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
    sideEffects:
      "Commonly causes increased urination, dizziness upon standing, and mild fatigue, especially when starting treatment.",
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
    sideEffects:
      "Commonly causes frequent urination and dizziness upon standing, particularly soon after a dose.",
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
    sideEffects:
      "Commonly causes a mild headache and throat or nasal irritation from the inhaled mist, along with occasional muscle cramps.",
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
    sideEffects:
      "Commonly causes headache, throat irritation, and mild tremor, similar to other beta-2 agonists but usually less pronounced given its longer, steadier release.",
  },

  {
    slug: "glipizide",
    letter: "G",
    name: "Glipizide",
    practicalName: "Glucotrol",
    drugClass: "Second-generation sulfonylurea",
    category: "Antidiabetic",
    cid: 3478,
    formula: "C21H27N5O4S",
    molecularWeight: 445.54,
    molecularWeightLabel: "445.54 g/mol",
    discovered: "Developed by Pfizer; FDA approved 1984",
    mechanism:
      "Binds sulfonylurea receptors on pancreatic beta cells, closing ATP-sensitive potassium channels. That depolarizes the cell and triggers calcium influx, which pushes stored insulin out of the cell — working only when the pancreas can still produce insulin.",
    history:
      "Part of a second generation of sulfonylureas that replaced earlier drugs like tolbutamide, offering a lower effective dose and fewer interactions with other medications.",
    hazards:
      "Can cause hypoglycemia, especially if a meal is skipped after dosing. Effectiveness fades over time in some patients as pancreatic beta-cell function declines.",
    sideEffects:
      "Can also cause mild nausea, stomach upset, and dizziness, particularly when starting treatment.",
  },
  {
    slug: "sitagliptin",
    letter: "S",
    name: "Sitagliptin",
    practicalName: "Januvia",
    drugClass: "DPP-4 inhibitor",
    category: "Antidiabetic",
    cid: 4369359,
    formula: "C16H15F6N5O",
    molecularWeight: 407.31,
    molecularWeightLabel: "407.31 g/mol",
    discovered: "Developed by Merck; FDA approved 2006",
    mechanism:
      "Blocks the enzyme DPP-4, which normally breaks down incretin hormones released after eating. With DPP-4 blocked, those hormones linger longer and prompt the pancreas to release more insulin only when blood sugar is high.",
    history:
      "One of the first drugs in its class, sitagliptin offered a once-daily pill with a lower hypoglycemia risk than older diabetes drugs, since its effect depends on the body's own after-meal signaling.",
    hazards:
      "Linked to joint pain in some patients and rare reports of pancreatitis. Dose must be adjusted for reduced kidney function.",
    sideEffects:
      "Generally well tolerated; the most common complaints are upper respiratory symptoms like a stuffy nose and sore throat, and mild headache.",
  },
  {
    slug: "levothyroxine",
    letter: "L",
    name: "Levothyroxine",
    practicalName: "Synthroid · Levoxyl",
    drugClass: "Synthetic thyroid hormone (T4)",
    category: "Hormone",
    cid: 5819,
    formula: "C15H11I4NO4",
    molecularWeight: 776.87,
    molecularWeightLabel: "776.87 g/mol",
    discovered: "First synthesized 1927; widely used from the 1950s onward",
    mechanism:
      "A synthetic version of thyroxine (T4), the body's own primary thyroid hormone. The body converts it to the more active T3 form, which enters cells and regulates metabolic rate, heart rate, and temperature by switching gene expression on and off.",
    history:
      "Before synthetic versions, hypothyroidism was treated with desiccated animal thyroid extract, which had inconsistent hormone content. A pure, synthetic, single-molecule version made dosing precise and predictable.",
    hazards:
      "Too high a dose mimics an overactive thyroid — rapid heartbeat, anxiety, weight loss — while too low a dose leaves hypothyroid symptoms untreated. Absorption is affected by food, calcium, and iron supplements.",
    sideEffects:
      "At a properly adjusted dose, side effects are uncommon; some people notice mild hair thinning in the first few months of treatment.",
  },
  {
    slug: "testosterone",
    letter: "T",
    name: "Testosterone",
    practicalName: "AndroGel · Depo-Testosterone",
    drugClass: "Androgen / anabolic steroid hormone",
    category: "Hormone",
    cid: 6013,
    formula: "C19H28O2",
    molecularWeight: 288.42,
    molecularWeightLabel: "288.42 g/mol",
    discovered: "First isolated and synthesized 1935",
    mechanism:
      "Binds androgen receptors inside cells, especially in muscle and reproductive tissue, where the hormone-receptor complex moves into the nucleus and switches on genes involved in muscle protein synthesis and male secondary sex characteristics.",
    history:
      "One of the first steroid hormones ever isolated and synthesized, testosterone's structure elucidation in the 1930s helped launch the field of steroid chemistry and earned its discoverers a share of a Nobel Prize.",
    hazards:
      "Exogenous use suppresses the body's own natural production. Non-prescribed high-dose use is associated with cardiovascular strain, liver stress with oral forms, and mood or behavioral changes.",
    sideEffects:
      "Common effects during treatment include acne, fluid retention, and an increased red blood cell count; injectable forms can also cause injection-site irritation.",
  },
  {
    slug: "oxycodone",
    letter: "O",
    name: "Oxycodone",
    practicalName: "OxyContin · Percocet (combined with paracetamol)",
    drugClass: "Semisynthetic opioid agonist",
    category: "Opioid",
    cid: 5284603,
    formula: "C18H21NO4",
    molecularWeight: 315.36,
    molecularWeightLabel: "315.36 g/mol",
    discovered: "First synthesized 1916 in Germany; introduced to the US market 1939",
    mechanism:
      "Binds mu-opioid receptors in the brain and spinal cord, the same receptor family targeted by morphine, blocking pain signal transmission and triggering the reward pathway that produces euphoria.",
    history:
      "Synthesized from thebaine, a minor opium alkaloid, oxycodone was developed to be a safer alternative to earlier opioids — a goal that a later extended-release reformulation, marketed heavily in the 1990s, is now widely cited as a major contributor to the U.S. opioid crisis.",
    hazards:
      "High potential for dependence and respiratory depression, especially when combined with alcohol or other sedatives. A leading contributor to opioid-related overdose deaths in recent decades.",
    sideEffects:
      "Commonly causes constipation, nausea, drowsiness, and itching — the same day-to-day tolerability profile shared by opioids generally.",
  },
  {
    slug: "caffeine",
    letter: "C",
    name: "Caffeine",
    practicalName: "found in coffee, tea, energy drinks; also sold as tablets",
    drugClass: "Xanthine stimulant",
    category: "Stimulant",
    cid: 2519,
    formula: "C8H10N4O2",
    molecularWeight: 194.19,
    molecularWeightLabel: "194.19 g/mol",
    discovered: "Isolated 1819 by German chemist Friedlieb Ferdinand Runge",
    mechanism:
      "Blocks adenosine receptors in the brain. Adenosine normally builds up through the day and promotes drowsiness — by occupying its receptors without activating them, caffeine keeps the brain's alertness signaling running.",
    history:
      "The world's most widely consumed psychoactive substance, caffeine's stimulant effect was documented in coffee and tea for centuries before Runge's 1819 isolation identified the specific compound responsible.",
    hazards:
      "High doses can cause anxiety, rapid heartbeat, and insomnia. Regular use produces mild physical dependence, and abrupt cessation commonly causes headaches.",
    sideEffects:
      "Moderate daily use can still cause mild jitteriness, increased urination, and stomach upset in sensitive individuals.",
  },
  {
    slug: "ciprofloxacin",
    letter: "C",
    name: "Ciprofloxacin",
    practicalName: "Cipro",
    drugClass: "Fluoroquinolone antibiotic",
    category: "Antibiotic",
    cid: 2764,
    formula: "C17H18FN3O3",
    molecularWeight: 331.34,
    molecularWeightLabel: "331.34 g/mol",
    discovered: "Developed by Bayer; FDA approved 1987",
    mechanism:
      "Inhibits bacterial DNA gyrase and topoisomerase IV, enzymes bacteria need to unwind and copy their DNA during replication. Without them, bacterial DNA becomes tangled and the cell cannot divide.",
    history:
      "One of the first widely used fluoroquinolones, ciprofloxacin broadened treatment options against gram-negative bacteria and became a standard stockpiled antibiotic for suspected anthrax exposure.",
    hazards:
      "Carries a boxed warning for tendon rupture and nerve damage risk, more common in older adults. Can prolong the heart's QT interval and interacts with dairy products, which block its absorption.",
    sideEffects:
      "Commonly causes nausea, diarrhea, and headache; some people also report dizziness or a mild rash.",
  },
  {
    slug: "naproxen",
    letter: "N",
    name: "Naproxen",
    practicalName: "Aleve · Naprosyn",
    drugClass: "NSAID (nonsteroidal anti-inflammatory drug)",
    category: "Analgesic",
    cid: 156391,
    formula: "C14H14O3",
    molecularWeight: 230.26,
    molecularWeightLabel: "230.26 g/mol",
    discovered: "Developed by Syntex; FDA approved 1976",
    mechanism:
      "Blocks cyclooxygenase (COX) enzymes, reducing production of prostaglandins — signaling molecules that sensitize nerve endings to pain and drive inflammation and fever.",
    history:
      "Naproxen's longer duration of action than earlier NSAIDs like ibuprofen made twice-daily dosing possible, and its 1994 switch to over-the-counter status made it one of the most accessible long-acting pain relievers.",
    hazards:
      "Long-term use raises the risk of stomach ulcers and gastrointestinal bleeding, along with cardiovascular risk and reduced kidney function, especially at high doses.",
    sideEffects:
      "Commonly causes heartburn, stomach upset, and headache, even without the more serious risks noted above.",
  },
  {
    slug: "alprazolam",
    letter: "A",
    name: "Alprazolam",
    practicalName: "Xanax",
    drugClass: "Short-acting benzodiazepine",
    category: "Benzodiazepine",
    cid: 2118,
    formula: "C17H13ClN4",
    molecularWeight: 308.77,
    molecularWeightLabel: "308.77 g/mol",
    discovered: "Developed by Upjohn; FDA approved 1981",
    mechanism:
      "Enhances the effect of GABA, the brain's main inhibitory neurotransmitter, at the GABA-A receptor. This increases chloride ion flow into neurons, making them less likely to fire and producing a calming, anti-anxiety effect.",
    history:
      "Originally developed as an antidepressant candidate, alprazolam's anti-anxiety and panic-disorder effects made it one of the most prescribed psychiatric medications by the late 1980s.",
    hazards:
      "High potential for dependence, especially with regular use beyond a few weeks. Abrupt discontinuation can cause dangerous withdrawal seizures. Sedative effects are amplified dangerously when combined with alcohol or opioids.",
    sideEffects:
      "Commonly causes drowsiness, light-headedness, and impaired coordination, most noticeable soon after each dose.",
  },
  {
    slug: "venlafaxine",
    letter: "V",
    name: "Venlafaxine",
    practicalName: "Effexor",
    drugClass: "SNRI (serotonin-norepinephrine reuptake inhibitor)",
    category: "Antidepressant",
    cid: 5656,
    formula: "C17H27NO2",
    molecularWeight: 277.4,
    molecularWeightLabel: "277.4 g/mol",
    discovered: "Developed by Wyeth; FDA approved 1993",
    mechanism:
      "Blocks the reuptake transporters for both serotonin and norepinephrine, leaving more of each neurotransmitter available in the synapse between neurons, which is thought to gradually improve mood regulation over several weeks.",
    history:
      "One of the first SNRIs approved, venlafaxine offered an alternative mechanism to the SSRIs that dominated antidepressant treatment through the 1990s.",
    hazards:
      "Discontinuation can cause a pronounced withdrawal syndrome — dizziness, 'brain zaps', irritability — if stopped abruptly. Can raise blood pressure at higher doses.",
    sideEffects:
      "Commonly causes nausea, dry mouth, and sweating, especially when starting treatment or increasing the dose.",
  },
  {
    slug: "rosuvastatin",
    letter: "R",
    name: "Rosuvastatin",
    practicalName: "Crestor",
    drugClass: "HMG-CoA reductase inhibitor (statin)",
    category: "Statin",
    cid: 446157,
    formula: "C22H28FN3O6S",
    molecularWeight: 481.54,
    molecularWeightLabel: "481.54 g/mol",
    discovered: "Developed by Shionogi, licensed to AstraZeneca; FDA approved 2003",
    mechanism:
      "Blocks HMG-CoA reductase, the rate-limiting enzyme the liver uses to manufacture cholesterol. With less cholesterol produced internally, liver cells pull more LDL cholesterol out of the bloodstream to compensate.",
    history:
      "Entering the market after atorvastatin and simvastatin were already established, rosuvastatin distinguished itself with greater LDL-lowering potency at lower doses.",
    hazards:
      "Can cause muscle pain and, rarely, a serious muscle-breakdown condition called rhabdomyolysis. Requires monitoring in patients with reduced kidney function, and dose limits differ by ethnicity due to blood-level differences.",
    sideEffects:
      "Commonly causes mild headache and digestive upset such as nausea or constipation.",
  },
  {
    slug: "cetirizine",
    letter: "C",
    name: "Cetirizine",
    practicalName: "Zyrtec",
    drugClass: "Second-generation antihistamine",
    category: "Antihistamine",
    cid: 2678,
    formula: "C21H25ClN2O3",
    molecularWeight: 388.89,
    molecularWeightLabel: "388.89 g/mol",
    discovered: "Developed by UCB; FDA approved 1995",
    mechanism:
      "Blocks H1 histamine receptors, preventing histamine — released during an allergic reaction — from triggering the itching, swelling, and mucus production that make up typical allergy symptoms.",
    history:
      "A metabolite of the older antihistamine hydroxyzine, cetirizine was designed to cross into the brain far less than first-generation antihistamines like diphenhydramine, cutting down drowsiness while keeping allergy relief.",
    hazards:
      "Can still cause mild drowsiness in some users despite being marketed as 'non-drowsy'. Rebound itching has been reported after stopping long-term daily use.",
    sideEffects:
      "Can also cause dry mouth and mild fatigue, generally less pronounced than with older, first-generation antihistamines.",
  },
  {
    slug: "olanzapine",
    letter: "O",
    name: "Olanzapine",
    practicalName: "Zyprexa",
    drugClass: "Atypical (second-generation) antipsychotic",
    category: "Antipsychotic",
    cid: 4585,
    formula: "C17H20N4S",
    molecularWeight: 312.43,
    molecularWeightLabel: "312.43 g/mol",
    discovered: "Developed by Eli Lilly; FDA approved 1996",
    mechanism:
      "Blocks dopamine D2 and serotonin 5-HT2A receptors in the brain, reducing the excess dopamine signaling linked to psychosis while its serotonin activity is thought to ease negative symptoms and reduce movement side effects compared to older antipsychotics.",
    history:
      "Part of a wave of 'atypical' antipsychotics that followed clozapine, olanzapine became one of the best-selling psychiatric drugs of the 2000s for its broad effectiveness against both positive and negative schizophrenia symptoms.",
    hazards:
      "Strongly associated with weight gain and metabolic changes, including increased risk of type 2 diabetes. Carries a boxed warning for increased mortality risk in older adults with dementia-related psychosis.",
    sideEffects:
      "Commonly causes drowsiness, dizziness, and constipation, on top of the appetite and metabolic changes noted above.",
  },
  {
    slug: "valacyclovir",
    letter: "V",
    name: "Valacyclovir",
    practicalName: "Valtrex",
    drugClass: "Antiviral prodrug (guanosine analog)",
    category: "Antiviral",
    cid: 135398513,
    formula: "C13H20N6O4",
    molecularWeight: 324.34,
    molecularWeightLabel: "324.34 g/mol",
    discovered: "Developed by GlaxoSmithKline; FDA approved 1995",
    mechanism:
      "Converted by the body into acyclovir, which viral enzymes mistake for a natural DNA building block. Once incorporated into replicating viral DNA, it stops the chain from extending further, halting the virus's ability to copy itself.",
    history:
      "A prodrug form of acyclovir, valacyclovir was designed purely to improve on its predecessor's poor oral absorption — the body converts it to the exact same active drug, just at much higher blood levels per dose.",
    hazards:
      "Can cause kidney problems, particularly at high doses or in dehydrated patients. Rare cases of a blood-clotting disorder have been reported in immunocompromised patients.",
    sideEffects:
      "Commonly causes headache and nausea; otherwise generally well tolerated.",
  },
  {
    slug: "atenolol",
    letter: "A",
    name: "Atenolol",
    practicalName: "Tenormin",
    drugClass: "Beta-1 selective blocker",
    category: "Beta Blocker",
    cid: 2249,
    formula: "C14H22N2O3",
    molecularWeight: 266.34,
    molecularWeightLabel: "266.34 g/mol",
    discovered: "Developed by ICI (later AstraZeneca); introduced 1976",
    mechanism:
      "Selectively blocks beta-1 adrenergic receptors, found mainly in the heart, reducing the response to adrenaline. This slows heart rate and lowers the force of each contraction, reducing blood pressure and the heart's oxygen demand.",
    history:
      "Developed as a more heart-selective alternative to propranolol, atenolol's reduced action on the lungs' beta-2 receptors made it a safer option for patients with asthma.",
    hazards:
      "Should not be stopped abruptly, since sudden withdrawal can trigger rebound high blood pressure or chest pain. Can mask the warning signs of low blood sugar in people with diabetes.",
    sideEffects:
      "Commonly causes fatigue, cold hands and feet, and mild dizziness, especially early in treatment.",
  },
  {
    slug: "formoterol",
    letter: "F",
    name: "Formoterol",
    practicalName: "Foradil · Perforomist",
    drugClass: "Long-acting beta-2 agonist (LABA)",
    category: "Bronchodilator",
    cid: 3410,
    formula: "C19H24N2O4",
    molecularWeight: 344.4,
    molecularWeightLabel: "344.4 g/mol",
    discovered: "Developed by Yamanouchi; introduced in Europe in the 1990s",
    mechanism:
      "Activates beta-2 adrenergic receptors on airway smooth muscle, triggering relaxation and widening the airways. Its longer-lasting chemical binding gives it up to 12 hours of effect compared to a few hours for short-acting versions.",
    history:
      "Formoterol's fast onset alongside its long duration set it apart from earlier long-acting bronchodilators like salmeterol, which act more slowly.",
    hazards:
      "Carries the same boxed warning as other LABAs against use alone in asthma, since long-acting beta agonists used without an inhaled corticosteroid have been linked to increased risk of severe asthma episodes.",
    sideEffects:
      "Commonly causes headache, tremor, and a fast heartbeat, similar to other beta-2 agonists.",
  },
  {
    slug: "hydrocortisone",
    letter: "H",
    name: "Hydrocortisone",
    practicalName: "Cortef · topical Cortizone",
    drugClass: "Corticosteroid (glucocorticoid)",
    category: "Corticosteroid",
    cid: 5754,
    formula: "C21H30O5",
    molecularWeight: 362.46,
    molecularWeightLabel: "362.46 g/mol",
    discovered: "First isolated from the adrenal cortex 1936; synthesized for medical use in the early 1950s",
    mechanism:
      "A synthetic form of the body's own cortisol. It binds glucocorticoid receptors inside cells, altering gene expression to suppress the production of inflammatory signaling molecules across the immune system.",
    history:
      "As the synthetic version of the body's own primary stress hormone, hydrocortisone's introduction gave doctors a way to replicate and control the immune-suppressing, anti-inflammatory effects the adrenal glands normally regulate naturally.",
    hazards:
      "Long-term systemic use can suppress the body's own cortisol production, weaken bones, and raise blood sugar. Topical overuse can thin the skin.",
    sideEffects:
      "Short-term oral or injected use commonly causes increased appetite and mild fluid retention; topical use can cause local stinging or irritation.",
  },
  {
    slug: "spironolactone",
    letter: "S",
    name: "Spironolactone",
    practicalName: "Aldactone",
    drugClass: "Potassium-sparing diuretic",
    category: "Diuretic",
    cid: 5833,
    formula: "C24H32O4S",
    molecularWeight: 416.6,
    molecularWeightLabel: "416.6 g/mol",
    discovered: "Developed by G.D. Searle; FDA approved 1960",
    mechanism:
      "Blocks aldosterone receptors in the kidney's collecting ducts, preventing the hormone aldosterone from telling the kidney to retain sodium and water and excrete potassium — the opposite effect of most other diuretics.",
    history:
      "Unlike the diuretics that came before it, spironolactone works by directly blocking a hormone receptor rather than acting on a kidney transporter, and it remains one of the few diuretics that doesn't waste potassium.",
    hazards:
      "Can cause dangerously high potassium levels, especially when combined with potassium supplements or ACE inhibitors. Long-term use has been linked to breast tenderness and enlargement due to its hormonal activity.",
    sideEffects:
      "Commonly causes stomach upset, dizziness, and fatigue, especially when starting treatment.",
  },
  {
    slug: "pantoprazole",
    letter: "P",
    name: "Pantoprazole",
    practicalName: "Protonix",
    drugClass: "Proton pump inhibitor",
    category: "PPI",
    cid: 4679,
    formula: "C16H15F2N3O4S",
    molecularWeight: 383.37,
    molecularWeightLabel: "383.37 g/mol",
    discovered: "Developed by Byk Gulden (later Nycomed); FDA approved 2000",
    mechanism:
      "Irreversibly binds the proton pump on stomach cells that produce acid, permanently disabling that specific pump. Acid production only resumes once the cell manufactures new pumps.",
    history:
      "Entering the PPI market after omeprazole's patent success, pantoprazole offered a similar mechanism with a somewhat different interaction profile, giving doctors an alternative when other PPIs interacted with a patient's other medications.",
    hazards:
      "Long-term use is associated with reduced calcium and vitamin B12 absorption, and an increased risk of certain gut infections due to reduced stomach acidity.",
    sideEffects:
      "Commonly causes headache, diarrhea, and abdominal pain.",
  },
  {
    slug: "rivaroxaban",
    letter: "R",
    name: "Rivaroxaban",
    practicalName: "Xarelto",
    drugClass: "Direct factor Xa inhibitor (DOAC)",
    category: "Anticoagulant",
    cid: 9875401,
    formula: "C19H18ClN3O5S",
    molecularWeight: 435.88,
    molecularWeightLabel: "435.88 g/mol",
    discovered: "Developed by Bayer; FDA approved 2011",
    mechanism:
      "Directly blocks factor Xa, a clotting-cascade enzyme that converts prothrombin into thrombin. Without active factor Xa, the final steps that form a stable clot slow down.",
    history:
      "Part of a new generation of oral anticoagulants that followed warfarin, rivaroxaban doesn't require the routine blood monitoring warfarin does, since its effect on clotting is far more predictable dose to dose.",
    hazards:
      "Bleeding is the main risk, and for years there was no dedicated reversal agent, unlike warfarin's vitamin K. Should not be stopped abruptly without medical guidance due to rebound clotting risk.",
    sideEffects:
      "Minor bruising and nosebleeds are common even without a major bleeding event.",
  },
  {
    slug: "ramipril",
    letter: "R",
    name: "Ramipril",
    practicalName: "Altace",
    drugClass: "ACE inhibitor",
    category: "ACE Inhibitor",
    cid: 5362129,
    formula: "C23H32N2O5",
    molecularWeight: 416.51,
    molecularWeightLabel: "416.51 g/mol",
    discovered: "Developed by Hoechst AG; FDA approved 1991",
    mechanism:
      "Blocks the angiotensin-converting enzyme (ACE), preventing the conversion of angiotensin I into angiotensin II, a hormone that narrows blood vessels and triggers sodium and water retention. With less angiotensin II, blood vessels relax and blood pressure falls.",
    history:
      "Later trials found ramipril reduced cardiovascular events even in patients without high blood pressure, broadening ACE inhibitors' use into general cardiovascular risk reduction beyond blood pressure control alone.",
    hazards:
      "Can cause a persistent dry cough and, rarely, a dangerous swelling reaction called angioedema. Not safe during pregnancy due to risk of fetal kidney damage.",
    sideEffects:
      "Commonly causes dizziness and fatigue, especially with the first few doses.",
  },
  {
    slug: "hydromorphone",
    letter: "H",
    name: "Hydromorphone",
    practicalName: "Dilaudid",
    drugClass: "Semisynthetic opioid agonist",
    category: "Opioid",
    cid: 5284570,
    formula: "C17H19NO3",
    molecularWeight: 285.34,
    molecularWeightLabel: "285.34 g/mol",
    discovered: "First synthesized 1924 in Germany",
    mechanism:
      "Binds mu-opioid receptors in the brain and spinal cord, blocking pain-signal transmission. It's structurally close to morphine but around five times more potent by weight, a difference that matters for dosing precision.",
    history:
      "Developed as a more potent, faster-acting alternative to morphine, hydromorphone became a standard option for severe pain in hospital settings where rapid, controllable relief is needed.",
    hazards:
      "Its higher potency-per-milligram than morphine raises the risk of accidental overdose if doses are confused between the two. Carries the same dependence and respiratory-depression risks as other strong opioids.",
    sideEffects:
      "Commonly causes constipation, nausea, drowsiness, and itching — the typical day-to-day profile shared by opioids.",
  },
  {
    slug: "modafinil",
    letter: "M",
    name: "Modafinil",
    practicalName: "Provigil",
    drugClass: "Wakefulness-promoting agent",
    category: "Stimulant",
    cid: 4236,
    formula: "C15H15NO2S",
    molecularWeight: 273.35,
    molecularWeightLabel: "273.35 g/mol",
    discovered: "Developed in France in the 1970s-80s; FDA approved 1998",
    mechanism:
      "Weakly inhibits dopamine reuptake and activates orexin-producing neurons in the hypothalamus, both of which are involved in staying awake — though unlike classic stimulants, its exact full mechanism is still debated.",
    history:
      "Originally developed to treat narcolepsy, modafinil's comparatively mild side-effect profile next to amphetamine-type stimulants led to wider off-label use for shift-work sleep problems and occasional non-medical 'cognitive enhancement' use.",
    hazards:
      "Can cause insomnia, headache, and anxiety. Rare but serious skin reactions have been reported. Lower abuse potential than classic stimulants, but not risk-free with long-term use.",
    sideEffects:
      "Nausea, dry mouth, and mild nervousness are also commonly reported.",
  },
  {
    slug: "dabigatran",
    letter: "D",
    name: "Dabigatran",
    practicalName: "Pradaxa",
    drugClass: "Direct thrombin inhibitor (DOAC)",
    category: "Anticoagulant",
    cid: 216210,
    formula: "C25H30N6O3",
    molecularWeight: 471.51,
    molecularWeightLabel: "471.51 g/mol",
    discovered: "Developed by Boehringer Ingelheim; FDA approved 2010",
    mechanism:
      "Directly binds and blocks thrombin, the enzyme that converts fibrinogen into the fibrin strands that form a blood clot's structural mesh. Blocking thrombin directly stops clot formation at one of its final steps.",
    history:
      "The first of the new oral anticoagulants to reach the U.S. market, dabigatran offered predictable dosing without warfarin's routine blood monitoring, and its reversal agent, approved years later, addressed one of the earliest DOACs' biggest early drawbacks.",
    hazards:
      "Bleeding is the primary risk, and effectiveness is highly sensitive to missed or doubled doses because of its short half-life. Requires dose adjustment in reduced kidney function, since it's cleared largely by the kidneys.",
    sideEffects:
      "Commonly causes stomach upset and heartburn-like discomfort, more often than with some other newer anticoagulants.",
  },
  {
    slug: "bupropion",
    letter: "B",
    name: "Bupropion",
    practicalName: "Wellbutrin · Zyban",
    drugClass: "NDRI (norepinephrine-dopamine reuptake inhibitor)",
    category: "Antidepressant",
    cid: 444,
    formula: "C13H18ClNO",
    molecularWeight: 239.74,
    molecularWeightLabel: "239.74 g/mol",
    discovered: "Developed by Burroughs Wellcome; FDA approved 1985",
    mechanism:
      "Blocks reuptake of norepinephrine and dopamine, leaving more of both neurotransmitters active in the brain's reward and alertness circuits — a distinct mechanism from the serotonin-focused SSRIs that dominate antidepressant treatment.",
    history:
      "Bupropion's stimulating, non-sedating profile and lack of typical SSRI sexual side effects made it a popular alternative or add-on antidepressant, and its separate brand name Zyban repurposed it as a smoking-cessation aid.",
    hazards:
      "Lowers the seizure threshold, so it's avoided in patients with a seizure history or eating disorders. Can worsen anxiety or insomnia in some patients despite easing depression in others.",
    sideEffects:
      "Commonly causes dry mouth, headache, and nausea; unlike many antidepressants it's less likely to cause sexual side effects or weight gain.",
  },
  {
    slug: "fexofenadine",
    letter: "F",
    name: "Fexofenadine",
    practicalName: "Allegra",
    drugClass: "Second-generation antihistamine",
    category: "Antihistamine",
    cid: 3348,
    formula: "C32H39NO4",
    molecularWeight: 501.65,
    molecularWeightLabel: "501.65 g/mol",
    discovered: "Developed by Sanofi; FDA approved 1996",
    mechanism:
      "Blocks H1 histamine receptors outside the brain, preventing histamine from triggering allergy symptoms, while its large, charged structure keeps it from crossing into the brain in meaningful amounts.",
    history:
      "Developed as a metabolite of the earlier antihistamine terfenadine after terfenadine itself was pulled from the market over rare heart-rhythm risks, fexofenadine kept the allergy relief without that danger.",
    hazards:
      "Considered one of the least sedating antihistamines, though fruit juices (notably grapefruit, orange, and apple) can reduce its absorption and effectiveness if taken together.",
    sideEffects:
      "Generally very well tolerated; headache and mild nausea are the most commonly reported side effects.",
  },
  {
    slug: "quetiapine",
    letter: "Q",
    name: "Quetiapine",
    practicalName: "Seroquel",
    drugClass: "Atypical (second-generation) antipsychotic",
    category: "Antipsychotic",
    cid: 5002,
    formula: "C21H25N3O2S",
    molecularWeight: 383.51,
    molecularWeightLabel: "383.51 g/mol",
    discovered: "Developed by AstraZeneca; FDA approved 1997",
    mechanism:
      "Blocks a broad range of receptors, most notably dopamine D2 and serotonin 5-HT2A, dampening the excess dopamine signaling linked to psychosis. Its strong antihistamine activity also produces a pronounced sedative effect at lower doses.",
    history:
      "Quetiapine's sedating properties at low doses led to widespread off-label use for insomnia and anxiety well beyond its original approval for schizophrenia and bipolar disorder.",
    hazards:
      "Associated with weight gain, drowsiness, and metabolic changes including increased diabetes risk. Carries the same boxed warning as other antipsychotics against use in dementia-related psychosis in older adults.",
    sideEffects:
      "Dry mouth and dizziness are also common, particularly when starting treatment or increasing the dose.",
  },
  {
    slug: "tenofovir",
    letter: "T",
    name: "Tenofovir",
    practicalName: "Viread (as disoproxil fumarate)",
    drugClass: "Nucleotide reverse transcriptase inhibitor",
    category: "Antiviral",
    cid: 464205,
    formula: "C9H14N5O4P",
    molecularWeight: 287.21,
    molecularWeightLabel: "287.21 g/mol",
    discovered: "Developed by Gilead Sciences; FDA approved 2001",
    mechanism:
      "Mimics a natural building block of viral DNA. Once incorporated by HIV's reverse transcriptase enzyme into a growing DNA strand, it lacks the chemical group needed to attach the next building block, halting the chain.",
    history:
      "A cornerstone of modern HIV treatment and prevention, tenofovir-based combination pills became central to both daily antiretroviral therapy and PrEP (pre-exposure prophylaxis) regimens that reduce HIV transmission risk.",
    hazards:
      "Long-term use has been linked to reduced kidney function and bone mineral density loss in some patients, requiring periodic monitoring.",
    sideEffects:
      "Commonly causes nausea, diarrhea, and headache, especially when starting treatment.",
  },
  {
    slug: "clonazepam",
    letter: "C",
    name: "Clonazepam",
    practicalName: "Klonopin",
    drugClass: "Long-acting benzodiazepine",
    category: "Benzodiazepine",
    cid: 2802,
    formula: "C15H10ClN3O3",
    molecularWeight: 315.71,
    molecularWeightLabel: "315.71 g/mol",
    discovered: "Developed by Roche; FDA approved 1975",
    mechanism:
      "Enhances GABA's inhibitory effect at the GABA-A receptor, increasing chloride ion flow into neurons and calming excessive electrical activity — useful for both seizure control and anxiety.",
    history:
      "Approved initially as an anticonvulsant, clonazepam's long duration of action made it a common choice for panic disorder as well, distinguishing it from shorter-acting benzodiazepines like alprazolam.",
    hazards:
      "Shares the same dependence and withdrawal-seizure risks as other benzodiazepines, with a longer half-life that can lead to next-day grogginess and slower clearance from the body in older adults.",
    sideEffects:
      "Commonly causes drowsiness, dizziness, and mild difficulty with coordination or short-term memory.",
  },
  {
    slug: "carvedilol",
    letter: "C",
    name: "Carvedilol",
    practicalName: "Coreg",
    drugClass: "Combined alpha/beta blocker",
    category: "Beta Blocker",
    cid: 2585,
    formula: "C24H26N2O4",
    molecularWeight: 406.47,
    molecularWeightLabel: "406.47 g/mol",
    discovered: "Developed by Boehringer Mannheim; FDA approved 1995",
    mechanism:
      "Blocks both beta and alpha-1 adrenergic receptors. The beta-blockade slows heart rate and reduces its workload, while the added alpha-1 blockade relaxes blood vessels — a combination that made it useful in heart failure, where older beta blockers had been avoided.",
    history:
      "Carvedilol was part of a shift in the 1990s toward using beta blockers to treat heart failure itself, after earlier medical opinion held that slowing an already-struggling heart would make things worse.",
    hazards:
      "Can cause dizziness or low blood pressure, especially with the first dose. Should not be stopped abruptly, since sudden withdrawal can trigger rebound chest pain or blood pressure spikes.",
    sideEffects:
      "Commonly causes fatigue and weight gain; some patients also notice diarrhea.",
  },
  {
    slug: "ipratropium",
    letter: "I",
    name: "Ipratropium",
    practicalName: "Atrovent",
    drugClass: "Short-acting anticholinergic bronchodilator",
    category: "Bronchodilator",
    cid: 657308,
    formula: "C20H30BrNO3",
    molecularWeight: 412.36,
    molecularWeightLabel: "412.36 g/mol",
    discovered: "Developed by Boehringer Ingelheim; introduced 1970s",
    mechanism:
      "Blocks acetylcholine's action on muscarinic receptors in airway smooth muscle. Acetylcholine normally signals the airway to constrict, so blocking it allows the muscle to relax and the airway to widen.",
    history:
      "Ipratropium worked through an entirely different receptor system than beta-agonist bronchodilators like albuterol, giving doctors a way to combine two mechanisms for a stronger effect in COPD and severe asthma.",
    hazards:
      "Can cause dry mouth and, less commonly, blurred vision if it contacts the eyes from a poorly aimed inhaler or nebulizer mist. Generally has fewer heart-related side effects than beta-agonist bronchodilators.",
    sideEffects:
      "Can also cause a mild cough or throat irritation from the inhaled spray, and occasionally headache.",
  },
  {
    slug: "fluticasone",
    letter: "F",
    name: "Fluticasone",
    practicalName: "Flonase · Flovent (as propionate)",
    drugClass: "Corticosteroid (glucocorticoid)",
    category: "Corticosteroid",
    cid: 62924,
    formula: "C25H31F3O5S",
    molecularWeight: 500.57,
    molecularWeightLabel: "500.57 g/mol",
    discovered: "Developed by Glaxo; introduced 1990s",
    mechanism:
      "Binds glucocorticoid receptors in airway and nasal tissue, switching off the genes that produce inflammatory signaling molecules. Delivered directly to the site of inflammation by inhaler or nasal spray, keeping most of its effect local.",
    history:
      "Fluticasone's high potency and low absorption into the bloodstream when inhaled made it a mainstay of daily asthma control and allergy treatment, where a systemic steroid's side effects would be an unacceptable tradeoff.",
    hazards:
      "Can cause oral thrush if the mouth isn't rinsed after inhaler use, and nasal irritation with spray forms. Long-term high-dose inhaled use still carries some risk of the systemic effects seen with oral steroids.",
    sideEffects:
      "Nasal forms commonly cause mild nosebleeds or dryness; inhaled forms can cause a hoarse voice.",
  },
  {
    slug: "chlorthalidone",
    letter: "C",
    name: "Chlorthalidone",
    practicalName: "Hygroton",
    drugClass: "Thiazide-like diuretic",
    category: "Diuretic",
    cid: 2732,
    formula: "C14H11ClN2O4S",
    molecularWeight: 338.76,
    molecularWeightLabel: "338.76 g/mol",
    discovered: "Developed by Ciba; FDA approved 1960",
    mechanism:
      "Blocks the sodium-chloride transporter in the kidney's distal tubule, reducing sodium reabsorption. More sodium and water pass into the urine, lowering overall blood volume and blood pressure.",
    history:
      "Chlorthalidone was the diuretic used in several of the largest blood-pressure outcome trials ever run, giving it an unusually strong evidence base despite being prescribed less often today than the similar drug hydrochlorothiazide.",
    hazards:
      "Can lower blood potassium and sodium levels, particularly in older adults, and may raise blood sugar and uric acid levels with long-term use.",
    sideEffects:
      "Commonly causes increased urination and dizziness upon standing, especially when starting treatment.",
  },
  {
    slug: "lansoprazole",
    letter: "L",
    name: "Lansoprazole",
    practicalName: "Prevacid",
    drugClass: "Proton pump inhibitor",
    category: "PPI",
    cid: 3883,
    formula: "C16H14F3N3O2S",
    molecularWeight: 369.36,
    molecularWeightLabel: "369.36 g/mol",
    discovered: "Developed by Takeda; FDA approved 1995",
    mechanism:
      "Irreversibly binds the stomach's acid-producing proton pump, permanently disabling it. New acid production resumes only once the stomach lining manufactures replacement pumps.",
    history:
      "Following omeprazole as the second major PPI to reach the U.S. market, lansoprazole's 1995 approval intensified competition in a drug class that would go on to become some of the best-selling medications in history.",
    hazards:
      "Long-term use is linked to reduced calcium, magnesium, and vitamin B12 absorption, along with an increased risk of certain gut infections due to lowered stomach acidity.",
    sideEffects:
      "Commonly causes headache, diarrhea, and abdominal pain, similar to other proton pump inhibitors.",
  },
  {
    slug: "pravastatin",
    letter: "P",
    name: "Pravastatin",
    practicalName: "Pravachol",
    drugClass: "HMG-CoA reductase inhibitor (statin)",
    category: "Statin",
    cid: 54687,
    formula: "C23H36O7",
    molecularWeight: 424.53,
    molecularWeightLabel: "424.53 g/mol",
    discovered: "Developed by Sankyo and Bristol-Myers Squibb; FDA approved 1991",
    mechanism:
      "Blocks HMG-CoA reductase, the enzyme the liver uses to manufacture cholesterol. With production reduced, liver cells increase their uptake of LDL cholesterol from the bloodstream to compensate.",
    history:
      "Pravastatin was notable for being processed by the liver through a different pathway than most other statins, giving it fewer drug interactions — a property that made it a common choice for patients on multiple medications.",
    hazards:
      "Can cause muscle pain and, rarely, the serious muscle-breakdown condition rhabdomyolysis, though generally considered to carry a somewhat lower interaction risk than statins that share metabolic pathways with more drugs.",
    sideEffects:
      "Commonly causes mild headache and digestive upset such as nausea or diarrhea.",
  },
  {
    slug: "captopril",
    letter: "C",
    name: "Captopril",
    practicalName: "Capoten",
    drugClass: "ACE inhibitor",
    category: "ACE Inhibitor",
    cid: 44093,
    formula: "C9H15NO3S",
    molecularWeight: 217.29,
    molecularWeightLabel: "217.29 g/mol",
    discovered: "Developed by Squibb; FDA approved 1981",
    mechanism:
      "Blocks the angiotensin-converting enzyme (ACE), stopping the conversion of angiotensin I into angiotensin II, a hormone that narrows blood vessels and promotes sodium and water retention.",
    history:
      "Captopril was the first ACE inhibitor ever approved, and its development is often cited as a landmark case of rational, structure-based drug design rather than trial-and-error discovery — it directly inspired the entire ACE inhibitor class that followed.",
    hazards:
      "Can cause a persistent dry cough and, rarely, dangerous swelling called angioedema. Its shorter duration of action means it's typically taken multiple times a day, unlike later ACE inhibitors.",
    sideEffects:
      "Commonly causes dizziness and a temporary loss of taste, an effect more distinctive to captopril than to later ACE inhibitors.",
  },
  {
    slug: "pioglitazone",
    letter: "P",
    name: "Pioglitazone",
    practicalName: "Actos",
    drugClass: "Thiazolidinedione (insulin sensitizer)",
    category: "Antidiabetic",
    cid: 4829,
    formula: "C19H20N2O3S",
    molecularWeight: 356.44,
    molecularWeightLabel: "356.44 g/mol",
    discovered: "Developed by Takeda; FDA approved 1999",
    mechanism:
      "Activates a nuclear receptor called PPAR-gamma in fat and muscle cells, changing gene expression in ways that make those tissues more responsive to insulin — rather than increasing insulin output like sulfonylureas do.",
    history:
      "Pioglitazone's insulin-sensitizing approach offered a mechanism distinct from older diabetes drugs, though a related drug in its class, troglitazone, was withdrawn over liver toxicity, which kept scrutiny on the whole thiazolidinedione class.",
    hazards:
      "Associated with fluid retention, weight gain, and an increased risk of heart failure symptoms in susceptible patients. Long-term use has also been linked to a modestly increased bladder cancer risk in some studies.",
    sideEffects:
      "Commonly causes mild headache and upper respiratory symptoms like a stuffy nose, on top of the fluid-related effects noted above.",
  },
  {
    slug: "estradiol",
    letter: "E",
    name: "Estradiol",
    practicalName: "Estrace · Climara",
    drugClass: "Estrogen hormone",
    category: "Hormone",
    cid: 5757,
    formula: "C18H24O2",
    molecularWeight: 272.38,
    molecularWeightLabel: "272.38 g/mol",
    discovered: "First isolated 1933; synthesized for medical use in the 1930s-40s",
    mechanism:
      "Binds estrogen receptors throughout the body, where the hormone-receptor complex enters the cell nucleus and switches on genes involved in reproductive tissue development, bone density maintenance, and other estrogen-driven processes.",
    history:
      "As the primary and most potent naturally occurring estrogen, estradiol's isolation in the 1930s was part of the same wave of steroid hormone research that identified testosterone, and it remains the reference estrogen used in modern hormone therapy.",
    hazards:
      "Long-term systemic use has been linked to increased risk of blood clots and, in some studies, certain hormone-sensitive cancers, which is why hormone therapy is generally prescribed at the lowest effective dose for the shortest needed duration.",
    sideEffects:
      "Commonly causes breast tenderness, nausea, headache, and bloating, especially when starting treatment.",
  },
  {
    slug: "doxycycline",
    letter: "D",
    name: "Doxycycline",
    practicalName: "Vibramycin · Doryx",
    drugClass: "Tetracycline antibiotic",
    category: "Antibiotic",
    cid: 590417,
    formula: "C22H24N2O8",
    molecularWeight: 444.44,
    molecularWeightLabel: "444.44 g/mol",
    discovered: "Developed by Pfizer; FDA approved 1967",
    mechanism:
      "Binds the bacterial 30S ribosomal subunit, blocking transfer RNA from docking during protein synthesis — without new proteins, bacteria can't grow or divide.",
    history:
      "A semisynthetic tetracycline with better absorption and a longer half-life than its predecessors, doxycycline became a mainstay for once- or twice-daily dosing and remains a first-line treatment for tick-borne illnesses like Lyme disease.",
    hazards:
      "Causes photosensitivity (increased sunburn risk) and can permanently discolor developing teeth, so it's avoided in young children and pregnancy. Should be taken with a full glass of water while upright, since it can irritate the esophagus.",
    sideEffects:
      "Commonly causes nausea and stomach upset, particularly if taken without food or enough water.",
  },
  {
    slug: "cephalexin",
    letter: "C",
    name: "Cephalexin",
    practicalName: "Keflex",
    drugClass: "First-generation cephalosporin antibiotic",
    category: "Antibiotic",
    cid: 27447,
    formula: "C16H17N3O4S",
    molecularWeight: 347.39,
    molecularWeightLabel: "347.39 g/mol",
    discovered: "Developed by Eli Lilly; FDA approved 1971",
    mechanism:
      "Like penicillins, blocks the transpeptidase enzymes bacteria use to cross-link peptidoglycan in their cell wall — structurally related to penicillin but built on a different core ring system.",
    history:
      "One of the first oral cephalosporins, cephalexin gave doctors a penicillin-class alternative for skin and urinary infections that could be taken as a pill rather than an injection.",
    hazards:
      "Can cause allergic reactions, with some cross-reactivity risk in patients with a penicillin allergy. Common side effects include GI upset and diarrhea.",
    sideEffects:
      "Can also cause a mild headache or dizziness; less commonly, a temporary change in taste.",
  },
  {
    slug: "vancomycin",
    letter: "V",
    name: "Vancomycin",
    practicalName: "Vancocin",
    drugClass: "Glycopeptide antibiotic",
    category: "Antibiotic",
    cid: 14969,
    formula: "C66H75Cl2N9O24",
    molecularWeight: 1449.27,
    molecularWeightLabel: "1449.27 g/mol",
    discovered: "Isolated 1953 from soil bacteria by Eli Lilly; FDA approved 1958",
    mechanism:
      "Binds directly to the building blocks of the bacterial cell wall, physically blocking the enzymes that would normally assemble them — a different point of attack than penicillin-class drugs, which target the enzymes instead of the building blocks.",
    history:
      "Isolated from a soil sample collected in Borneo, vancomycin became known as a 'drug of last resort' for serious infections resistant to other antibiotics, particularly MRSA (methicillin-resistant Staphylococcus aureus).",
    hazards:
      "Can cause kidney damage and hearing loss at high doses, so blood levels are closely monitored during treatment. Rapid IV infusion can trigger 'red man syndrome,' a histamine-release reaction causing flushing and low blood pressure.",
    sideEffects:
      "Commonly causes nausea and chills during infusion, along with mild irritation at the IV site.",
  },
  {
    slug: "metronidazole",
    letter: "M",
    name: "Metronidazole",
    practicalName: "Flagyl",
    drugClass: "Nitroimidazole antimicrobial",
    category: "Antibiotic",
    cid: 4173,
    formula: "C6H9N3O3",
    molecularWeight: 171.16,
    molecularWeightLabel: "171.16 g/mol",
    discovered: "Developed by Rhône-Poulenc; FDA approved 1963",
    mechanism:
      "Once inside a susceptible cell, its nitro group is chemically reduced into reactive compounds that break DNA strands — a process that only happens inside anaerobic bacteria and certain parasites, sparing human cells and aerobic bacteria.",
    history:
      "Originally developed to treat a parasitic infection, metronidazole's activity against anaerobic bacteria was discovered along the way, and it became a standard treatment for a wide range of anaerobic and parasitic infections.",
    hazards:
      "Causes a severe reaction (flushing, vomiting, rapid heartbeat) when combined with alcohol, so drinking is avoided during treatment and for a few days after. Can cause a metallic taste and, rarely, nerve damage with prolonged use.",
    sideEffects:
      "Commonly causes nausea, loss of appetite, and stomach upset, particularly during the first days of treatment.",
  },
  {
    slug: "empagliflozin",
    letter: "E",
    name: "Empagliflozin",
    practicalName: "Jardiance",
    drugClass: "SGLT2 inhibitor",
    category: "Antidiabetic",
    cid: 11949646,
    formula: "C23H27ClO7",
    molecularWeight: 450.91,
    molecularWeightLabel: "450.91 g/mol",
    discovered: "Developed by Boehringer Ingelheim; FDA approved 2014",
    mechanism:
      "Blocks SGLT2, a transporter in the kidney that normally reabsorbs glucose back into the blood — with it blocked, excess glucose is excreted in urine instead, lowering blood sugar independent of insulin.",
    history:
      "Part of a drug class that traces back to a compound found in apple tree bark, which first suggested that blocking glucose reabsorption in the kidney could treat diabetes. Empagliflozin also proved to reduce heart failure hospitalizations — an unexpected benefit that reshaped how the class is used.",
    hazards:
      "Increases risk of genital yeast infections and urinary tract infections, since more glucose ends up in urine. Carries a rare but serious risk of a dangerous drop in blood pH (ketoacidosis) even with normal blood sugar.",
    sideEffects:
      "Commonly causes increased urination and mild thirst, since its mechanism increases the amount of sugar and fluid passed in urine.",
  },
  {
    slug: "glyburide",
    letter: "G",
    name: "Glyburide",
    practicalName: "DiaBeta · Micronase (glibenclamide outside the US)",
    drugClass: "Sulfonylurea",
    category: "Antidiabetic",
    cid: 3488,
    formula: "C23H28ClN3O5S",
    molecularWeight: 494.0,
    molecularWeightLabel: "494.00 g/mol",
    discovered: "Developed by Hoechst; FDA approved 1984",
    mechanism:
      "Binds receptors on pancreatic beta cells that trigger insulin release, essentially prompting the pancreas to secrete more insulin regardless of current blood sugar levels.",
    history:
      "One of the most potent second-generation sulfonylureas, glyburide became a low-cost mainstay of type 2 diabetes treatment for decades before newer drug classes carrying less risk of dangerously low blood sugar became preferred first-line options.",
    hazards:
      "Highest risk of hypoglycemia (dangerously low blood sugar) among commonly used oral diabetes drugs, particularly in older adults or those with kidney problems. Can cause weight gain.",
    sideEffects:
      "Can also cause mild nausea and heartburn, particularly when starting treatment.",
  },
  {
    slug: "acarbose",
    letter: "A",
    name: "Acarbose",
    practicalName: "Precose · Glucobay",
    drugClass: "Alpha-glucosidase inhibitor",
    category: "Antidiabetic",
    cid: 444254,
    formula: "C25H43NO18",
    molecularWeight: 645.61,
    molecularWeightLabel: "645.61 g/mol",
    discovered: "Developed by Bayer; FDA approved 1995",
    mechanism:
      "Blocks alpha-glucosidase enzymes in the small intestine that normally break complex carbohydrates into absorbable sugars, so carbs pass through undigested for longer — blunting the after-meal blood sugar spike.",
    history:
      "Derived from a fermentation product of soil bacteria, acarbose works entirely within the gut rather than being absorbed into the bloodstream, making it one of the few diabetes drugs that acts locally rather than systemically.",
    hazards:
      "Causes prominent gas, bloating, and diarrhea, since undigested carbohydrates ferment in the colon — the main reason many patients discontinue it. Doesn't cause low blood sugar on its own, but if it occurs, must be treated with glucose rather than table sugar, since acarbose blocks the enzyme needed to break down sucrose.",
    sideEffects:
      "Occasionally causes mild abdominal discomfort beyond the gas and bloating noted above; rarely affects liver enzymes with long-term use.",
  },
  {
    slug: "canagliflozin",
    letter: "C",
    name: "Canagliflozin",
    practicalName: "Invokana",
    drugClass: "SGLT2 inhibitor",
    category: "Antidiabetic",
    cid: 24812758,
    formula: "C24H25FO5S",
    molecularWeight: 444.52,
    molecularWeightLabel: "444.52 g/mol",
    discovered: "Developed by Mitsubishi Tanabe / Janssen; FDA approved 2013",
    mechanism:
      "Like empagliflozin, blocks the SGLT2 transporter in the kidney that reabsorbs glucose, causing excess sugar to be excreted in urine rather than reabsorbed into the blood.",
    history:
      "The first SGLT2 inhibitor approved in the US, canagliflozin opened up an entirely new drug class for type 2 diabetes that works in the kidney rather than the pancreas or liver.",
    hazards:
      "Carries a boxed warning for increased risk of leg and foot amputations, along with the class-wide risks of genital infections and ketoacidosis. Can also increase fracture risk with long-term use.",
    sideEffects:
      "Commonly causes increased urination and mild dehydration-related symptoms like thirst or light-headedness.",
  },
];

export function getDrugBySlug(slug: string) {
  return drugs.find((d) => d.slug === slug);
}

// Turns "ACE Inhibitor" into "ace-inhibitor" so it can be used as a CSS class
// suffix (category-badge.cat-ace-inhibitor) without hand-slugging every name.
export function categorySlug(category: DrugCategory): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// Total atom count parsed straight from the real chemical formula (e.g.
// "C22H24N2O8" -> 22+24+2+8 = 56) — used as a Poker battling stat that's
// genuinely distinct from molecular weight and years-on-market: it's about
// structural size/complexity, not mass or history, and it's computed from
// data we already have rather than a new invented number.
export function atomCount(formula: string): number {
  const matches = formula.match(/[A-Z][a-z]?\d*/g) ?? [];
  return matches.reduce((sum, part) => {
    const count = part.match(/\d+/);
    return sum + (count ? parseInt(count[0], 10) : 1);
  }, 0);
}

// Extra real PubChem properties (IUPAC name, lipophilicity, polar surface
// area, hydrogen-bond counts, rotatable bonds, SMILES) — populated by
// scripts/fetch-chem-data.mjs, which the founder runs from their own
// Terminal since this sandbox can't reach PubChem's network. Starts as {}
// until that script has been run, so every consumer of this must treat a
// missing entry as "not fetched yet," not as an error.
export type PubChemProperties = {
  iupacName: string | null;
  xLogP: number | null;
  tpsa: number | null;
  hBondDonorCount: number | null;
  hBondAcceptorCount: number | null;
  rotatableBondCount: number | null;
  canonicalSmiles: string | null;
};

export function getChemProperties(slug: string): PubChemProperties | undefined {
  return (pubchemProperties as Record<string, PubChemProperties>)[slug];
}
