import type { DrugEntry } from "@/data/drugs";

export default function ChemDataPanel({ drug }: { drug: DrugEntry }) {
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
    </section>
  );
}
