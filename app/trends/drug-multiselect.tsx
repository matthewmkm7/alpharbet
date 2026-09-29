"use client";

import { useEffect, useRef, useState } from "react";
import type { DrugEntry } from "@/data/drugs";

type Selection = { slug: string; colorIndex: number };

// A proper dropdown panel for picking which drugs to compare — a row of 80+
// pill buttons doesn't scale, and a plain multi-select <select> is a poor
// experience for anything over a handful of options. This gives the trigger
// button + searchable panel pattern used for the same job elsewhere on the
// site (see site-header.tsx's search overlay).
export default function DrugMultiselect({
  options,
  selections,
  maxSelections,
  colorVars,
  onToggle,
}: {
  options: DrugEntry[];
  selections: Selection[];
  maxSelections: number;
  colorVars: string[];
  onToggle: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const trimmed = query.trim().toLowerCase();
  const filtered = trimmed
    ? options.filter((d) => d.name.toLowerCase().includes(trimmed) || d.category.toLowerCase().includes(trimmed))
    : options;

  return (
    <div className="drug-multiselect" ref={rootRef}>
      <div className="drug-multiselect-chips">
        {selections.map((sel) => {
          const drug = options.find((d) => d.slug === sel.slug);
          if (!drug) return null;
          return (
            <span className="drug-multiselect-chip" key={sel.slug} style={{ borderColor: `var(${colorVars[sel.colorIndex]})` }}>
              <span className="price-compare-dot" style={{ background: `var(${colorVars[sel.colorIndex]})` }} />
              {drug.name}
              <button type="button" aria-label={`Remove ${drug.name}`} onClick={() => onToggle(drug.slug)}>
                ×
              </button>
            </span>
          );
        })}
        <button type="button" className="drug-multiselect-trigger" onClick={() => setOpen((o) => !o)}>
          {selections.length === 0 ? "Add a drug to compare" : "Add another"} ({selections.length}/{maxSelections}) ▾
        </button>
      </div>

      {open && (
        <div className="drug-multiselect-panel">
          <input
            autoFocus
            type="text"
            className="drug-multiselect-input"
            placeholder="Search by name or drug class…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="drug-multiselect-list">
            {filtered.length === 0 && <div className="entry-search-empty mono">No matches.</div>}
            {filtered.map((drug) => {
              const sel = selections.find((s) => s.slug === drug.slug);
              const disabled = !sel && selections.length >= maxSelections;
              return (
                <label key={drug.slug} className={`drug-multiselect-item${disabled ? " is-disabled" : ""}`}>
                  <input
                    type="checkbox"
                    checked={!!sel}
                    disabled={disabled}
                    onChange={() => onToggle(drug.slug)}
                  />
                  <span className="search-result-name">{drug.name}</span>
                  <span className="search-result-class mono">{drug.category}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
