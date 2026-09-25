// One-time (or re-run-as-needed) script: downloads each drug's 3D structure
// from PubChem ONCE and saves it locally, so the live site never depends on
// PubChem being reachable at page-load time.
//
// Run this yourself after adding a new drug to data/drugs.ts:
//   npm run fetch-structures

import { drugs } from "../data/drugs.ts";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const outDir = path.join(process.cwd(), "public", "structures");
await mkdir(outDir, { recursive: true });

for (const drug of drugs) {
  const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${drug.cid}/record/SDF/?record_type=3d`;
  console.log(`Fetching ${drug.name} (CID ${drug.cid})...`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const sdf = await res.text();
    const outPath = path.join(outDir, `${drug.slug}.sdf`);
    await writeFile(outPath, sdf);
    console.log(`  saved -> public/structures/${drug.slug}.sdf`);
  } catch (err) {
    console.error(`  FAILED for ${drug.name}:`, err.message);
  }
  // Be polite to PubChem's servers — small delay between requests
  await new Promise((r) => setTimeout(r, 300));
}

console.log("Done.");
