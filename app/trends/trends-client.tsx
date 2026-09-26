"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { drugs, type DrugEntry } from "@/data/drugs";
import { trendsByCategory, categoryDrivers, ILLUSTRATIVE_NOTE } from "@/data/trends";

function TrendChart({ points }: { points: { period: string; index: number }[] }) {
  const width = 560;
  const height = 200;
  const pad = 28;
  const max = 100;

  const stepX = (width - pad * 2) / (points.length - 1);
  const coords = points.map((p, i) => ({
    x: pad + i * stepX,
    y: height - pad - (p.index / max) * (height - pad * 2),
  }));
  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Illustrative price index trend">
      {/* baseline grid */}
      {[0, 25, 50, 75, 100].map((mark) => {
        const y = height - pad - (mark / max) * (height - pad * 2);
        return (
          <line key={mark} x1={pad} y1={y} x2={width - pad} y2={y} stroke="var(--line)" strokeWidth={1} />
        );
      })}
      <path d={path} fill="none" stroke="var(--accent-green)" strokeWidth={2.5} />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={4} fill="var(--accent-magenta)" />
      ))}
      {points.map((p, i) => (
        <text key={p.period} x={coords[i].x} y={height - 6} fontSize={11} textAnchor="middle" fill="var(--text-faint)">
          {p.period}
        </text>
      ))}
    </svg>
  );
}

export default function TrendsClient({ initialSlug }: { initialSlug: string }) {
  const [slug, setSlug] = useState(initialSlug);
  const drug = useMemo<DrugEntry>(() => drugs.find((d) => d.slug === slug) ?? drugs[0], [slug]);
  const points = trendsByCategory[drug.category];

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
        <h1>Pricing trends by drug class.</h1>
        <p className="trends-note mono">{ILLUSTRATIVE_NOTE}</p>

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
          <TrendChart points={points} />
          <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginTop: 10 }}>
            {categoryDrivers[drug.category]}
          </p>
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
          <span className="btn-primary btn-disabled">Find nearby — coming soon</span>
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
