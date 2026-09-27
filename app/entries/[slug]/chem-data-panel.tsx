import type { CSSProperties } from "react";
import type { DrugEntry } from "@/data/drugs";

// Fixed, well-known reference molecules for scale — not from the catalog,
// so every entry page has the same two anchor points to compare against.
const REFERENCES = [
  { name: "Water (H₂O)", weight: 18.02 },
  { name: "Caffeine", weight: 194.19 },
];

// Cap the visual scale so one huge outlier (e.g. Insulin, ~5,808 g/mol)
// doesn't compress every small-molecule bar down to a sliver.
const SCALE_CAP = 650;

function barWidth(weight: number): number {
  return Math.min(100, (Math.min(weight, SCALE_CAP) / SCALE_CAP) * 100);
}

export default function ChemDataPanel({ drug }: { drug: DrugEntry }) {
  const isOffScale = drug.molecularWeight > SCALE_CAP;
  const bars = [
    { name: drug.name, weight: drug.molecularWeight, isSubject: true },
    ...REFERENCES,
  ].sort((a, b) => b.weight - a.weight);

  return (
    <section className="entry-block">
      <div className="eyebrow-line mono">Chemical data</div>
      <div className="chem-stat-row">
        <div className="chem-stat">
          <div className="chem-stat-value mono">{drug.formula}</div>
          <div className="chem-stat-label">Formula</div>
        </div>
        <div className="chem-stat">
          <div className="chem-stat-value mono">{drug.molecularWeightLabel}</div>
          <div className="chem-stat-label">Molecular weight</div>
        </div>
        <div className="chem-stat">
          <div className="chem-stat-value mono">{drug.category}</div>
          <div className="chem-stat-label">Category</div>
        </div>
      </div>

      <div className="chem-scale">
        <div className="chem-scale-label mono">Molecular weight, compared</div>
        {bars.map((bar) => (
          <div className="chem-scale-row" key={bar.name}>
            <span className="chem-scale-name">{bar.name}</span>
            <div className="chem-scale-track">
              <div
                className={`chem-scale-fill${"isSubject" in bar && bar.isSubject ? " is-subject" : ""}`}
                style={{ "--target-width": `${barWidth(bar.weight)}%` } as CSSProperties}
              />
            </div>
            <span className="chem-scale-value mono">{bar.weight.toFixed(1)}</span>
          </div>
        ))}
        {isOffScale && (
          <div className="chem-scale-note mono">
            {drug.name}&apos;s actual weight ({drug.molecularWeightLabel}) is far off this chart&apos;s
            scale — its bar is capped for readability.
          </div>
        )}
      </div>
    </section>
  );
}
