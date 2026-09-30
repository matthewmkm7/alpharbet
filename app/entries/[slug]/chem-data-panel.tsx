import { getChemProperties, type DrugEntry } from "@/data/drugs";

export default function ChemDataPanel({ drug }: { drug: DrugEntry }) {
  // Only present once the founder has run `npm run fetch-chem-data` locally
  // (this sandbox can't reach PubChem's network) — degrades to just the
  // three original stats until then, same pattern as every other
  // "needs a script run locally" piece of data on this site.
  const props = getChemProperties(drug.slug);

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
        {props?.xLogP !== null && props?.xLogP !== undefined && (
          <div className="chem-stat">
            <div className="chem-stat-value mono">{props.xLogP}</div>
            <div className="chem-stat-label">Lipophilicity (XLogP)</div>
          </div>
        )}
        {props?.tpsa !== null && props?.tpsa !== undefined && (
          <div className="chem-stat">
            <div className="chem-stat-value mono">{props.tpsa} Å²</div>
            <div className="chem-stat-label">Polar surface area</div>
          </div>
        )}
        {props?.hBondDonorCount !== null && props?.hBondDonorCount !== undefined && (
          <div className="chem-stat">
            <div className="chem-stat-value mono">
              {props.hBondDonorCount} / {props.hBondAcceptorCount}
            </div>
            <div className="chem-stat-label">H-bond donors / acceptors</div>
          </div>
        )}
        {props?.rotatableBondCount !== null && props?.rotatableBondCount !== undefined && (
          <div className="chem-stat">
            <div className="chem-stat-value mono">{props.rotatableBondCount}</div>
            <div className="chem-stat-label">Rotatable bonds</div>
          </div>
        )}
      </div>
      {props?.iupacName && (
        <div className="chem-iupac mono">IUPAC name: {props.iupacName}</div>
      )}
    </section>
  );
}
