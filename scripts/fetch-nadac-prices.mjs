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
// for the year, so this can take a little while to download and search
// through — that's expected, not a bug.
//
// Writes two files:
//   data/nadac-prices.json         — each drug's most recent price snapshot
//   data/nadac-price-history.json  — each drug's full weekly price history
//                                     this year, for the Trends "compare over
//                                     time" chart

import { drugs } from "../data/drugs.ts";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const pricesOutPath = path.join(process.cwd(), "data", "nadac-prices.json");
const historyOutPath = path.join(process.cwd(), "data", "nadac-price-history.json");
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

// NADAC dates come as "12/17/2025" — convert to "2025-12-17" so history
// points sort correctly as plain strings and format nicely in the UI.
function toIsoDate(mdy) {
  const match = mdy.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const [, month, day, yearStr] = match;
  return `${yearStr}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
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
  // Normalize headers so "NDC Description" and "ndc_description" both match —
  // the CSV's actual header style isn't guaranteed to match the data
  // dictionary's machine-readable field names exactly.
  const normalize = (h) =>
    h
      .replace(/^﻿/, "") // strip a possible byte-order-mark on the first header
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, "_");
  const header = parseCsvLine(lines[0]).map(normalize);
  const col = (name) => header.indexOf(name);
  const iDescription = col("ndc_description");
  const iPrice = col("nadac_per_unit");
  const iDate = col("effective_date");
  const iUnit = col("pricing_unit");
  const iNdc = col("ndc");

  if (iDescription === -1 || iPrice === -1 || iDate === -1 || iUnit === -1 || iNdc === -1) {
    console.error("Couldn't find the expected columns in this file. Here's what it actually has:");
    console.error(header.map((h, i) => `  [${i}] ${h}`).join("\n"));
    console.error("Leaving data/nadac-prices.json and data/nadac-price-history.json unchanged — send this list back so the script can be fixed.");
    return;
  }

  console.log(`Searching ${lines.length - 1} rows for matches against ${drugs.length} drugs...`);

  // One pass over every row. NADAC lists the same NDC (a specific package of
  // a specific drug) once per week, so a drug like amoxicillin shows up under
  // several different NDCs (different strengths/forms). We group hits by
  // drug -> NDC, so we can later pick whichever single NDC has the most
  // weekly data points — that's the one worth graphing as "the" price history
  // for that drug, rather than mixing different products' prices together.
  const upperNames = drugs.map((d) => d.name.toUpperCase());
  const hitsByDrug = drugs.map(() => new Map()); // index-aligned with `drugs`; ndc -> rows[]

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);
    const description = fields[iDescription];
    if (!description) continue;
    const upperDescription = description.toUpperCase();

    for (let d = 0; d < drugs.length; d++) {
      if (!upperDescription.startsWith(upperNames[d])) continue;

      const price = parseFloat(fields[iPrice]);
      const isoDate = toIsoDate(fields[iDate]);
      if (Number.isNaN(price) || !isoDate) break;

      const ndc = fields[iNdc];
      const byNdc = hitsByDrug[d];
      const rows = byNdc.get(ndc) ?? [];
      rows.push({ date: isoDate, price, unit: fields[iUnit], description });
      byNdc.set(ndc, rows);
      break; // a description matches at most one of our drugs
    }
  }

  const prices = {};
  const history = {};

  drugs.forEach((drug, d) => {
    const byNdc = hitsByDrug[d];
    if (byNdc.size === 0) {
      console.log(`  ${drug.name}: no match in NADAC data — skipped`);
      return;
    }

    // Pick the NDC with the most weekly data points for this drug.
    let bestRows = null;
    for (const rows of byNdc.values()) {
      if (!bestRows || rows.length > bestRows.length) bestRows = rows;
    }

    // Collapse to one point per date (in case a date appears twice) and sort oldest-first.
    const byDate = new Map();
    for (const row of bestRows) byDate.set(row.date, row);
    const sorted = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
    const latest = sorted[sorted.length - 1];

    prices[drug.slug] = {
      pricePerUnit: latest.price,
      unit: latest.unit,
      effectiveDate: latest.date,
      ndcDescription: latest.description,
    };
    history[drug.slug] = sorted.map((row) => ({ date: row.date, price: row.price }));

    console.log(`  ${drug.name}: $${latest.price}/${latest.unit} (as of ${latest.date}, ${sorted.length} data points)`);
  });

  await writeFile(pricesOutPath, JSON.stringify(prices, null, 2) + "\n");
  await writeFile(historyOutPath, JSON.stringify(history, null, 2) + "\n");
  console.log(
    `\nSaved ${Object.keys(prices).length} of ${drugs.length} drug prices to data/nadac-prices.json`
  );
  console.log(`Saved price history for the same drugs to data/nadac-price-history.json`);
}

main();
