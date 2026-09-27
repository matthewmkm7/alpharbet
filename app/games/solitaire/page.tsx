"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { drugs, type DrugEntry, type DrugCategory } from "@/data/drugs";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Only categories with enough cards to make sorting meaningful become lanes.
const LANE_CATEGORIES: DrugCategory[] = [
  "Opioid",
  "Stimulant",
  "Antibiotic",
  "Analgesic",
  "Benzodiazepine",
  "Antidepressant",
  "Statin",
];

type LaneState = {
  category: DrugCategory;
  deck: DrugEntry[];
  sorted: DrugEntry[];
};

function buildLanes(): LaneState[] {
  return LANE_CATEGORIES.map((category) => ({
    category,
    deck: shuffle(drugs.filter((d) => d.category === category)),
    sorted: [],
  }));
}

// Drag payload is just "slug|category" — plain text, no JSON parsing needed.
function dragPayload(drug: DrugEntry, category: DrugCategory) {
  return `${drug.slug}|${category}`;
}

export default function SolitairePage() {
  const [lanes, setLanes] = useState<LaneState[]>(() => buildLanes());
  const [wrongSlug, setWrongSlug] = useState<string | null>(null);
  const [draggingSlug, setDraggingSlug] = useState<string | null>(null);
  const [dropTargetLane, setDropTargetLane] = useState<DrugCategory | null>(null);

  const totalCards = useMemo(() => lanes.reduce((sum, l) => sum + l.deck.length + l.sorted.length, 0), [lanes]);
  const sortedCount = useMemo(() => lanes.reduce((sum, l) => sum + l.sorted.length, 0), [lanes]);
  const won = sortedCount === totalCards;

  function handlePick(laneCategory: DrugCategory, drug: DrugEntry) {
    setLanes((prev) =>
      prev.map((lane) => {
        if (lane.category !== laneCategory) return lane;
        const nextCorrect = [...lane.deck].sort((a, b) => a.molecularWeight - b.molecularWeight)[0];
        if (drug.slug === nextCorrect.slug) {
          setWrongSlug(null);
          return {
            ...lane,
            deck: lane.deck.filter((d) => d.slug !== drug.slug),
            sorted: [...lane.sorted, drug],
          };
        }
        setWrongSlug(drug.slug);
        setTimeout(() => setWrongSlug(null), 350);
        return lane;
      })
    );
  }

  function handleDragStart(e: React.DragEvent, drug: DrugEntry, category: DrugCategory) {
    e.dataTransfer.setData("text/plain", dragPayload(drug, category));
    e.dataTransfer.effectAllowed = "move";
    setDraggingSlug(drug.slug);
  }

  function handleDragEnd() {
    setDraggingSlug(null);
    setDropTargetLane(null);
  }

  function handleDragOverLane(e: React.DragEvent, laneCategory: DrugCategory) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dropTargetLane !== laneCategory) setDropTargetLane(laneCategory);
  }

  function handleDropOnLane(e: React.DragEvent, laneCategory: DrugCategory) {
    e.preventDefault();
    setDropTargetLane(null);
    const payload = e.dataTransfer.getData("text/plain");
    const [slug, fromCategory] = payload.split("|");
    if (!slug || fromCategory !== laneCategory) return; // a card can only be dropped into its own lane
    const drug = drugs.find((d) => d.slug === slug);
    if (!drug) return;
    handlePick(laneCategory, drug);
  }

  function reset() {
    setLanes(buildLanes());
    setWrongSlug(null);
    setDraggingSlug(null);
    setDropTargetLane(null);
  }

  return (
    <div className="solitaire-page">
      <div className="wrap">
        <div className="eyebrow-line mono">Game — Solitaire</div>
        <h1>Sort each class by molecular weight.</h1>
        <p className="solitaire-hint">
          Four classes, lightest to heaviest, one table. Drag a card into its lane&apos;s cleared
          pile in ascending order of molecular weight — get it wrong and it bounces back, no
          penalty. (Clicking a card works too.)
        </p>
        <div className="solitaire-status mono">
          {!won && `${sortedCount} of ${totalCards} sorted`}
        </div>
      </div>

      <div className="solitaire-arena">
        <div className="solitaire-table">
          {!won &&
            lanes.map((lane) => (
              <div
                className={`solitaire-lane${dropTargetLane === lane.category ? " is-drop-target" : ""}`}
                data-category={lane.category}
                key={lane.category}
                onDragOver={(e) => handleDragOverLane(e, lane.category)}
                onDragLeave={() => setDropTargetLane((cur) => (cur === lane.category ? null : cur))}
                onDrop={(e) => handleDropOnLane(e, lane.category)}
              >
                <div className="solitaire-lane-header">
                  <span className={`category-badge cat-${lane.category.toLowerCase()}`}>
                    {lane.category}
                  </span>
                  <span className="solitaire-lane-count mono">
                    {lane.sorted.length}/{lane.deck.length + lane.sorted.length}
                  </span>
                </div>

                <div className="solitaire-cards">
                  {lane.deck.map((drug) => (
                    <button
                      key={drug.slug}
                      type="button"
                      draggable
                      className={`solitaire-card${wrongSlug === drug.slug ? " is-wrong" : ""}${
                        draggingSlug === drug.slug ? " is-dragging" : ""
                      }`}
                      onClick={() => handlePick(lane.category, drug)}
                      onDragStart={(e) => handleDragStart(e, drug, lane.category)}
                      onDragEnd={handleDragEnd}
                    >
                      <span className="solitaire-card-name">{drug.name}</span>
                      <span className="solitaire-card-class mono">{drug.drugClass}</span>
                    </button>
                  ))}
                </div>

                {lane.sorted.length > 0 && (
                  <div className="solitaire-cards solitaire-cards-sorted">
                    {lane.sorted.map((drug) => (
                      <div key={drug.slug} className="solitaire-sorted-card">
                        <span className="solitaire-card-name">{drug.name}</span>
                        <span className="solitaire-card-class mono">{drug.molecularWeightLabel}</span>
                        <span className="solitaire-fact">{drug.history.split(".")[0]}.</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {won && (
        <div className="wrap">
          <div className="solitaire-win">
            <h2>Table cleared.</h2>
            <p>You sorted all {totalCards} compounds across {LANE_CATEGORIES.length} drug classes by molecular weight.</p>
            <button type="button" className="btn-primary" onClick={reset} style={{ marginRight: 12 }}>
              Play again
            </button>
            <Link href="/" className="btn-primary btn-link">
              Back home
            </Link>
            <Link href="/trends" className="btn-outline" style={{ marginLeft: 12 }}>
              See pricing trends
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
