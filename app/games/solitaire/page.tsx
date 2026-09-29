"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { drugs, categorySlug, type DrugEntry, type DrugCategory } from "@/data/drugs";
import { GAME_ROUNDS } from "@/data/rounds";

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type Difficulty = "medium" | "hard";

type LaneState = {
  category: DrugCategory;
  deck: DrugEntry[];
  sorted: DrugEntry[];
};

function buildLanes(categories: DrugCategory[]): LaneState[] {
  return categories.map((category) => ({
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
  const [roundIndex, setRoundIndex] = useState(0);
  const [lanes, setLanes] = useState<LaneState[]>(() => buildLanes(GAME_ROUNDS[0].categories));
  // Medium shows each card's name and drug class, same as always. Hard hides
  // both and shows only the chemical formula — you have to judge molecular
  // weight from the formula itself instead of recognizing the drug by name,
  // which is a genuinely harder (and more chemistry-based) skill. Switching
  // mid-round reshuffles the current round rather than leaving it half-solved
  // under the old rules.
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [wrongSlug, setWrongSlug] = useState<string | null>(null);
  const [draggingSlug, setDraggingSlug] = useState<string | null>(null);
  const [dropTargetLane, setDropTargetLane] = useState<DrugCategory | null>(null);
  const [matchComplete, setMatchComplete] = useState(false);

  const round = GAME_ROUNDS[roundIndex];
  const isFinalRound = roundIndex === GAME_ROUNDS.length - 1;

  const totalCards = useMemo(() => lanes.reduce((sum, l) => sum + l.deck.length + l.sorted.length, 0), [lanes]);
  const sortedCount = useMemo(() => lanes.reduce((sum, l) => sum + l.sorted.length, 0), [lanes]);
  const roundCleared = sortedCount === totalCards;

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

  function nextRound() {
    if (isFinalRound) {
      setMatchComplete(true);
      return;
    }
    const next = roundIndex + 1;
    setRoundIndex(next);
    setLanes(buildLanes(GAME_ROUNDS[next].categories));
    setWrongSlug(null);
    setDraggingSlug(null);
    setDropTargetLane(null);
  }

  function changeDifficulty(next: Difficulty) {
    if (next === difficulty) return;
    setDifficulty(next);
    setLanes(buildLanes(round.categories));
    setWrongSlug(null);
    setDraggingSlug(null);
    setDropTargetLane(null);
  }

  function reset() {
    setRoundIndex(0);
    setLanes(buildLanes(GAME_ROUNDS[0].categories));
    setWrongSlug(null);
    setDraggingSlug(null);
    setDropTargetLane(null);
    setMatchComplete(false);
  }

  return (
    <div className="solitaire-page">
      <div className="wrap">
        <div className="eyebrow-line mono">Game — Solitaire</div>
        <h1>Sort each class by molecular weight.</h1>
        <p className="solitaire-hint">
          Four drug classes on the table at a time, lightest to heaviest, one round. Drag a card
          into its lane&apos;s cleared pile in ascending order of molecular weight — get it wrong
          and it bounces back, no penalty. Clear all four lanes to advance to the next round.
          (Clicking a card works too.) On Hard, cards show only their formula — you're judging
          weight from the chemistry, not the name.
        </p>
        <div className="difficulty-toggle">
          <span className="difficulty-toggle-label mono">Difficulty:</span>
          <button
            type="button"
            className={`difficulty-btn${difficulty === "medium" ? " is-active" : ""}`}
            onClick={() => changeDifficulty("medium")}
          >
            Medium — labeled cards
          </button>
          <button
            type="button"
            className={`difficulty-btn${difficulty === "hard" ? " is-active" : ""}`}
            onClick={() => changeDifficulty("hard")}
          >
            Hard — formula only
          </button>
        </div>
        {!matchComplete && (
          <div className="solitaire-status mono">
            Round {roundIndex + 1} of {GAME_ROUNDS.length} — {round.title}
            {!roundCleared && ` · ${sortedCount} of ${totalCards} sorted`}
          </div>
        )}
      </div>

      {!matchComplete && (
        <div className="solitaire-arena">
          <div className="solitaire-table">
            {lanes.map((lane) => (
              <div
                className={`solitaire-lane${dropTargetLane === lane.category ? " is-drop-target" : ""}`}
                data-category={lane.category}
                key={lane.category}
                onDragOver={(e) => handleDragOverLane(e, lane.category)}
                onDragLeave={() => setDropTargetLane((cur) => (cur === lane.category ? null : cur))}
                onDrop={(e) => handleDropOnLane(e, lane.category)}
              >
                <div className="solitaire-lane-header">
                  <span
                    className={`category-dot cat-${categorySlug(lane.category)}`}
                    aria-label={lane.category}
                    title={lane.category}
                  />
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
                      {difficulty === "medium" ? (
                        <>
                          <span className="solitaire-card-name">{drug.name}</span>
                          <span className="solitaire-card-class mono">{drug.drugClass}</span>
                        </>
                      ) : (
                        <span className="solitaire-card-formula mono">{drug.formula}</span>
                      )}
                    </button>
                  ))}
                </div>

                {lane.sorted.length > 0 && (
                  <div className="solitaire-cards-sorted">
                    {lane.sorted.map((drug, i) => (
                      <div key={drug.slug} className="solitaire-sorted-card">
                        <span className="solitaire-sorted-index mono">{i + 1}</span>
                        <span className="solitaire-card-name">{drug.name}</span>
                        <span className="solitaire-card-class mono">{drug.molecularWeightLabel}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {roundCleared && (
            <div className="wrap">
              <div className="solitaire-win solitaire-round-win">
                <h2>{isFinalRound ? "Final round cleared." : "Round cleared."}</h2>
                <p>
                  {isFinalRound
                    ? `You sorted every drug class across all ${GAME_ROUNDS.length} rounds.`
                    : `You sorted all of "${round.title}" by molecular weight. Next up: ${GAME_ROUNDS[roundIndex + 1].title}.`}
                </p>
                <button type="button" className="btn-primary" onClick={nextRound}>
                  {isFinalRound ? "Finish" : "Next round"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {matchComplete && (
        <div className="wrap">
          <div className="solitaire-win">
            <h2>Every class, sorted.</h2>
            <p>
              You cleared all {GAME_ROUNDS.length} rounds across {GAME_ROUNDS.reduce((n, r) => n + r.categories.length, 0)} drug classes.
            </p>
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
