// Fetches real per-drug pricing from CMS's NADAC (National Average Drug
// Acquisition Cost) dataset — a free, public, no-API-key-required government
// dataset of what U.S. pharmacies actually pay to acquire each drug, updated
// weekly. See https://www.medicaid.gov/medicaid/nadac for the methodology.
//
// This is NOT the price a patient pays at the counter (insurance and coupons
// change that) — it's the pharmacy's acquisition cost. We say that plainly
// on the Trends page rather than implying it's a retail price.
//
// Run this yourself whenever you want fresher prices, or after adding a new
// drug to data/drugs.ts:
//   npm run fetch-nadac-prices
//
// The NADAC file is large (50+ MB) since it lists every NDC's weekly price
// history for the year, so this can take a little while to download and
// search through — that's expected, not a bug.

import { drugs } from "../data/drugs.ts";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const outPath = path.join(process.cwd(), "data", "nadac-prices.json");
const year = new Date().getFullYear();

// Finds this year's NADAC dataset and its CSV download link. CMS publishes a
// fresh dataset entry each calendar year (e.g. "NADAC ... 2026"), so we look
// it up by name each time rather than hardcoding a URL that changes weekly.
async function findDownloadUrl() {
  const searchUrl = `https://data.medicaid.gov/api/1/search?fulltext=NADAC%20${year}`;
  const res = await fetch(searchUrl);
  if (!res.ok) throw new Error(`Dataset search failed: HTTP ${res.status}`);
  const data = await res.json();
  const entries = Object.values(data.results ?? {});
  const wantedTitle = `NADAC (National Average Drug Acquisition Cost) ${year}`;
  const match = entries.find((entry) => entry.title === wantedTitle);
  const url = match?.distribution?.[0]?.downloadURL;
  if (!url) {
    throw new Error(
      `Could not find a dataset titled "${wantedTitle}" — data.medicaid.gov's catalog may have changed.`
    );
  }
  return url;
}

// A small hand-written CSV line parser — handles quoted fields that contain
// commas (NADAC's drug description field sometimes does). Good enough for
// this one file; not meant to be a general-purpose CSV library.
function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current);
  return fields;
}

async function main() {
  let downloadUrl;
  try {
    downloadUrl = await findDownloadUrl();
  } catch (err) {
    console.error("Could not locate this year's NADAC dataset:", err.message);
    console.error("Leaving data/nadac-prices.json unchanged.");
    return;
  }

  console.log(`Downloading ${downloadUrl}`);
  console.log("(This file is large — expect this to take a minute or two.)");
  let text;
  try {
    const res = await fetch(downloadUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    text = await res.text();
  } catch (err) {
    console.error("Could not download the NADAC file:", err.message);
    console.error("Leaving data/nadac-prices.json unchanged.");
    return;
  }

  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  const header = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const col = (name) => header.indexOf(name);
  const iDescription = col("ndc_description");
  const iPrice = col("nadac_per_unit");
  const iDate = col("effective_date");
  const iUnit = col("pricing_unit");

  if (iDescription === -1 || iPrice === -1 || iDate === -1 || iUnit === -1) {
    console.error("NADAC's column names have changed — this script needs updating to match.");
    console.error("Leaving data/nadac-prices.json unchanged.");
    return;
  }

  console.log(`Searching ${lines.length - 1} rows for matches against ${drugs.length} drugs...`);

  const prices = {};
  for (const drug of drugs) {
    const nameUpper = drug.name.toUpperCase();
    let best = null;

    for (let i = 1; i < lines.length; i++) {
      const fields = parseCsvLine(lines[i]);
      const description = fields[iDescription];
      // NADAC's descriptions start with the generic drug name (e.g.
      // "AMOXICILLIN 500MG CAP"), so a prefix match is a reasonable way to
      // find this drug without needing an NDC lookup step.
      if (!description || !description.toUpperCase().startsWith(nameUpper)) continue;

      const effectiveDate = fields[iDate];
      if (!best || effectiveDate > best.effectiveDate) {
        const pricePerUnit = parseFloat(fields[iPrice]);
        if (Number.isNaN(pricePerUnit)) continue;
        best = {
          pricePerUnit,
          unit: fields[iUnit],
          effectiveDate,
          ndcDescription: description,
        };
      }
    }

    if (best) {
      prices[drug.slug] = best;
      console.log(`  ${drug.name}: $${best.pricePerUnit}/${best.unit} (as of ${best.effectiveDate})`);
    } else {
      console.log(`  ${drug.name}: no match in NADAC data — skipped`);
    }
  }

  await writeFile(outPath, JSON.stringify(prices, null, 2) + "\n");
  console.log(`\nSaved ${Object.keys(prices).length} of ${drugs.length} drug prices to data/nadac-prices.json`);
}

main();
