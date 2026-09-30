// One-time (or re-run-as-needed) script: pulls extra real chemical properties
// from PubChem for every drug in data/drugs.ts, in large batches (PubChem
// lets you ask for many CIDs in one request), and saves them locally so the
// live site never depends on PubChem being reachable at page-load time.
//
// The AI sandbox that built this can't reach pubchem.ncbi.nlm.nih.gov's
// network directly (same restriction as the NADAC pricing script) — run this
// yourself, from your own Terminal (not through Claude/Cowork):
//   npm run fetch-chem-data
// Re-run any time you add new drugs to data/drugs.ts.

import { drugs } from "../data/drugs.ts";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const outPath = path.join(process.cwd(), "data", "pubchem-properties.json");

// Real, documented PubChem PUG REST properties — nothing invented here.
// XLogP = lipophilicity (how well it crosses fatty membranes/the blood-brain
// barrier); TPSA = topological polar surface area (also a strong predictor
// of absorption/blood-brain-barrier crossing); HBondDonor/AcceptorCount and
// RotatableBondCount are standard "drug-likeness" (Lipinski) descriptors
// pharmacy students are taught to read.
const PROPERTIES = [
  "IUPACName",
  "XLogP",
  "TPSA",
  "HBondDonorCount",
  "HBondAcceptorCount",
  "RotatableBondCount",
  "CanonicalSMILES",
].join(",");

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const results = {};
// 40 CIDs per request keeps the URL well under PubChem's length limits while
// still cutting ~84 drugs down to ~3 requests instead of 84.
const batches = chunk(drugs, 40);

for (const [i, batch] of batches.entries()) {
  const cids = batch.map((d) => d.cid).join(",");
  const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cids}/property/${PROPERTIES}/JSON`;
  console.log(`Fetching batch ${i + 1}/${batches.length} (${batch.length} drugs)...`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const props = data.PropertyTable?.Properties ?? [];
    for (const drug of batch) {
      const match = props.find((p) => p.CID === drug.cid);
      if (match) {
        results[drug.slug] = {
          iupacName: match.IUPACName ?? null,
          xLogP: match.XLogP ?? null,
          tpsa: match.TPSA ?? null,
          hBondDonorCount: match.HBondDonorCount ?? null,
          hBondAcceptorCount: match.HBondAcceptorCount ?? null,
          rotatableBondCount: match.RotatableBondCount ?? null,
          canonicalSmiles: match.CanonicalSMILES ?? null,
        };
      } else {
        console.error(`  no PubChem match for ${drug.name} (CID ${drug.cid})`);
      }
    }
  } catch (err) {
    console.error(`  FAILED batch ${i + 1}:`, err.message);
  }
  // Be polite to PubChem's servers — small delay between requests
  await new Promise((r) => setTimeout(r, 400));
}

await writeFile(outPath, JSON.stringify(results, null, 2) + "\n");
console.log(`Done. Wrote ${Object.keys(results).length}/${drugs.length} drugs to data/pubchem-properties.json`);
