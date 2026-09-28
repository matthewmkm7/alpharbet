"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { drugs, type DrugEntry } from "@/data/drugs";
import { macroStats, spotlightFacts, categoryDrivers, sources } from "@/data/trends";
import nadacPricesRaw from "@/data/nadac-prices.json";

// Real per-drug pricing from CMS's NADAC dataset (see scripts/fetch-nadac-prices.mjs).
// This is what U.S. pharmacies pay to acquire the drug, not a retail price —
// the label below says so. Populated by running that script; empty until then.
type NadacPrice = { pricePerUnit: number; unit: string; effectiveDate: string; ndcDescription: string };
const nadacPrices = nadacPricesRaw as Record<string, NadacPrice>;

export default function TrendsClient({ initialSlug }: { initialSlug: string }) {
  const [slug, setSlug] = useState(initialSlug);
  const drug = useMemo<DrugEntry>(() => drugs.find((d) => d.slug === slug) ?? drugs[0], [slug]);
  const spotlight = spotlightFacts[drug.slug];
  const nadac = nadacPrices[drug.slug];

  // Purchasing efficiency calculator — real arithmetic on whatever the user enters.
  const [packagePrice, setPackagePrice] = useState("20");
  const [packageMg, setPackageMg] = useState("500");
  const [neededMg, setNeededMg] = useState("2000");

  const price = parseFloat(packagePrice) || 0;
  const mgPerPackage = parseFloat(packageMg) || 0;
  const mgNeeded = parseFloat(neededMg) || 0;
  const costPerMg = mgPerPackage > 0 ? price / mgPerPackage : 0;
  const packagesNeeded = mgPerPackage > 0 ? Math.ceil(mgNeeded / mgPerPackage) : 0;
  const totalCost = packagesNeeded * price;

  return (
    <div className="trends-page">
      <div className="wrap">
        <div className="eyebrow-line mono">Trends</div>
        <h1>What's actually happening with drug prices.</h1>
        <p className="trends-note mono">
          Real, cited figures — not invented numbers.{" "}
          <a href={sources[0].url} target="_blank" rel="noreferrer">
            Source: {sources[0].title}
          </a>
        </p>

        <div className="trends-stat-grid">
          {macroStats.map((stat) => (
            <div className="trends-stat-tile" key={stat.label}>
              <div className="trends-stat-value mono">{stat.value}</div>
              <div className="trends-stat-label">{stat.label}</div>
              <div className="trends-stat-note">{stat.note}</div>
            </div>
          ))}
        </div>

        <div className="trends-chart-card">
          <label className="mono" style={{ display: "block", marginBottom: 14, fontSize: "0.82rem" }}>
            Drug:{" "}
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              style={{ marginLeft: 8, padding: "6px 10px", borderRadius: 4, border: "1px solid var(--line)", background: "var(--bg)", color: "var(--text)" }}
            >
              {drugs.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name} ({d.category})
                </option>
              ))}
            </select>
          </label>

          {nadac && (
            <div className="trends-nadac">
              <span className="trends-nadac-value mono">
                ${nadac.pricePerUnit.toFixed(4)} / {nadac.unit}
              </span>
              <span className="trends-nadac-label">
                Current U.S. pharmacy acquisition cost (NADAC) for {nadac.ndcDescription.toLowerCase()}, as of{" "}
                {nadac.effectiveDate}. This is what pharmacies pay to stock it, not what a patient pays at the
                counter — insurance and coupons change that part.{" "}
                <a href="https://www.medicaid.gov/medicaid/nadac" target="_blank" rel="noreferrer">
                  How NADAC works
                </a>
              </span>
            </div>
          )}

          {spotlight ? (
            <div className="trends-spotlight">
              <p>{spotlight.fact}</p>
              <a href={spotlight.source.url} target="_blank" rel="noreferrer" className="mono">
                Source: {spotlight.source.title}
              </a>
            </div>
          ) : (
            <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>{categoryDrivers[drug.category]}</p>
          )}
        </div>

        <div className="trends-calc-card">
          <div className="eyebrow-line mono">Purchasing efficiency calculator</div>
          <p style={{ color: "var(--text-dim)", fontSize: "0.92rem" }}>
            Enter real numbers from a package you&apos;re comparing — this does the arithmetic for you.
          </p>
          <div className="trends-calc-row">
            <label>
              Package price ($)
              <input type="number" min="0" value={packagePrice} onChange={(e) => setPackagePrice(e.target.value)} />
            </label>
            <label>
              Package size (mg total)
              <input type="number" min="0" value={packageMg} onChange={(e) => setPackageMg(e.target.value)} />
            </label>
            <label>
              Quantity needed (mg)
              <input type="number" min="0" value={neededMg} onChange={(e) => setNeededMg(e.target.value)} />
            </label>
          </div>
          <div className="trends-calc-result mono">
            ${costPerMg.toFixed(4)} per mg · {packagesNeeded} package{packagesNeeded === 1 ? "" : "s"} · ${totalCost.toFixed(2)} total
          </div>
        </div>

        <div className="entry-side-card" style={{ maxWidth: 480 }}>
          <div className="eyebrow-line mono">Find it nearby</div>
          <p>Locate pharmacies and professionals near you.</p>
          <Link href="/tools" className="btn-primary btn-link">Find nearby</Link>
        </div>

        <div className="trends-sources">
          <div className="eyebrow-line mono">Sources</div>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p style={{ marginTop: 28 }}>
          <Link href={`/entries/${drug.slug}`} className="back-link mono">
            ← Back to {drug.name}
          </Link>
        </p>
      </div>
    </div>
  );
}
