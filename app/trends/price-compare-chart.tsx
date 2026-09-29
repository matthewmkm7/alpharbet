"use client";

import { useMemo, useState } from "react";
import { drugs } from "@/data/drugs";
import historyRaw from "@/data/nadac-price-history.json";
import DrugMultiselect from "./drug-multiselect";

type HistoryPoint = { date: string; price: number };
const history = historyRaw as Record<string, HistoryPoint[]>;

// The site's validated 6-color chart palette (see app/globals.css — checked
// against both the light and dark backgrounds with the data-viz skill's
// validator). Each selected drug gets one of these slots.
const SERIES_COLOR_VARS = ["--series-1", "--series-2", "--series-3", "--series-4", "--series-5", "--series-6"];
const MAX_SERIES = SERIES_COLOR_VARS.length;

type Selection = { slug: string; colorIndex: number };

const CHART_WIDTH = 720;
const CHART_HEIGHT = 300;
const MARGIN = { top: 16, right: 16, bottom: 12, left: 40 };

// Plots each selected drug's NADAC price history over time so they can be
// compared on one chart. Prices are indexed to each drug's own first data
// point (= 100) rather than plotted in raw dollars, because different drugs
// are priced per different units (per tablet, per mL, etc.) — raw dollar
// values aren't comparable across them, but "how much has it moved" is.
export default function PriceCompareChart({ formatPrice }: { formatPrice: (usd: number) => string }) {
  const comparable = useMemo(() => drugs.filter((d) => (history[d.slug]?.length ?? 0) >= 2), []);

  // Starts empty — the picker below is entirely the user's choice, not a
  // default we've made for them.
  const [selections, setSelections] = useState<Selection[]>([]);
  const [hover, setHover] = useState<{ slug: string; point: HistoryPoint; x: number; y: number } | null>(null);

  function toggleDrug(slug: string) {
    setSelections((prev) => {
      const already = prev.find((s) => s.slug === slug);
      if (already) return prev.filter((s) => s.slug !== slug);
      if (prev.length >= MAX_SERIES) return prev;
      // Assign the lowest color slot not currently in use. This way,
      // deselecting one drug never recolors the others — a color stays tied
      // to the drug that has it, not to its position in the selection list.
      const used = new Set(prev.map((s) => s.colorIndex));
      let colorIndex = 0;
      while (used.has(colorIndex)) colorIndex++;
      return [...prev, { slug, colorIndex }];
    });
    setHover(null);
  }

  if (comparable.length === 0) {
    return (
      <p style={{ color: "var(--text-dim)", fontSize: "0.92rem" }}>
        No price history yet — run <code className="mono">npm run fetch-nadac-prices</code> to
        populate it.
      </p>
    );
  }

  const series = selections.map((sel) => {
    const drug = drugs.find((d) => d.slug === sel.slug)!;
    const points = history[sel.slug];
    const base = points[0].price;
    return {
      ...sel,
      drug,
      indexed: points.map((p) => ({ date: p.date, value: (p.price / base) * 100, raw: p })),
    };
  });

  const allDates = series.flatMap((s) => s.indexed.map((p) => p.date));
  const allValues = series.flatMap((s) => s.indexed.map((p) => p.value));
  const minDate = allDates.length ? allDates.reduce((a, b) => (a < b ? a : b)) : "";
  const maxDate = allDates.length ? allDates.reduce((a, b) => (a > b ? a : b)) : "";
  const dateSpan = Math.max(1, Date.parse(maxDate) - Date.parse(minDate || maxDate));

  const minValue = allValues.length ? Math.min(100, ...allValues) : 90;
  const maxValue = allValues.length ? Math.max(100, ...allValues) : 110;
  const pad = Math.max(2, (maxValue - minValue) * 0.15);
  const yMin = Math.floor(minValue - pad);
  const yMax = Math.ceil(maxValue + pad);

  const plotW = CHART_WIDTH - MARGIN.left - MARGIN.right;
  const plotH = CHART_HEIGHT - MARGIN.top - MARGIN.bottom;
  const xFor = (date: string) => MARGIN.left + ((Date.parse(date) - Date.parse(minDate)) / dateSpan) * plotW;
  const yFor = (value: number) => MARGIN.top + (1 - (value - yMin) / (yMax - yMin)) * plotH;
  const yTicks = [yMin, Math.round((yMin + yMax) / 2), yMax];

  return (
    <div className="price-compare">
      <DrugMultiselect
        options={comparable}
        selections={selections}
        maxSelections={MAX_SERIES}
        colorVars={SERIES_COLOR_VARS}
        onToggle={toggleDrug}
      />

      {selections.length === 0 ? (
        <p style={{ color: "var(--text-dim)", fontSize: "0.92rem", marginTop: 12 }}>
          Pick up to {MAX_SERIES} drugs above to compare how their acquisition cost has moved over time.
        </p>
      ) : (
        <>
          <svg
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="price-compare-svg"
            role="img"
            aria-label="Indexed acquisition price over time for the selected drugs"
          >
            {yTicks.map((t) => (
              <line key={`grid-${t}`} x1={MARGIN.left} x2={CHART_WIDTH - MARGIN.right} y1={yFor(t)} y2={yFor(t)} className="price-compare-grid" />
            ))}
            {yTicks.map((t) => (
              <text key={`label-${t}`} x={MARGIN.left - 8} y={yFor(t)} className="price-compare-axis-label mono" textAnchor="end" dominantBaseline="middle">
                {t}
              </text>
            ))}
            {/* 100 = this drug's own starting price — the reference line for "no change". */}
            <line x1={MARGIN.left} x2={CHART_WIDTH - MARGIN.right} y1={yFor(100)} y2={yFor(100)} className="price-compare-baseline" />

            {series.map((s) => {
              const colorVar = SERIES_COLOR_VARS[s.colorIndex];
              const path = s.indexed.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.date)} ${yFor(p.value)}`).join(" ");
              return (
                <g key={s.slug}>
                  <path d={path} fill="none" stroke={`var(${colorVar})`} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                  {s.indexed.map((p) => (
                    <circle
                      key={p.date}
                      cx={xFor(p.date)}
                      cy={yFor(p.value)}
                      r={4}
                      fill={`var(${colorVar})`}
                      stroke="var(--bg-elevated)"
                      strokeWidth={2}
                      onMouseEnter={() => setHover({ slug: s.slug, point: p.raw, x: xFor(p.date), y: yFor(p.value) })}
                      onMouseLeave={() => setHover((cur) => (cur?.slug === s.slug && cur.point === p.raw ? null : cur))}
                    />
                  ))}
                </g>
              );
            })}

            {hover && (
              <g>
                <rect x={Math.min(Math.max(hover.x - 55, 2), CHART_WIDTH - 112)} y={Math.max(hover.y - 40, 2)} width={110} height={32} rx={4} className="price-compare-tooltip-bg" />
                <text x={Math.min(Math.max(hover.x, 57), CHART_WIDTH - 57)} y={Math.max(hover.y - 26, 16)} textAnchor="middle" className="price-compare-tooltip-text mono">
                  {hover.point.date}
                </text>
                <text x={Math.min(Math.max(hover.x, 57), CHART_WIDTH - 57)} y={Math.max(hover.y - 12, 30)} textAnchor="middle" className="price-compare-tooltip-text mono">
                  {formatPrice(hover.point.price)}
                </text>
              </g>
            )}
          </svg>

          <div className="price-compare-legend">
            {series.map((s) => (
              <span key={s.slug} className="price-compare-legend-item">
                <span className="price-compare-dot" style={{ background: `var(${SERIES_COLOR_VARS[s.colorIndex]})` }} />
                {s.drug.name}
              </span>
            ))}
          </div>
          <p className="price-compare-note mono">
            Indexed to each drug&apos;s first available price = 100, so trends are comparable across
            drugs priced in different units. Hover a point for the real price on that date.
          </p>
        </>
      )}
    </div>
  );
}
