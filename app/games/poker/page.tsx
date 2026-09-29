"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { drugs, categorySlug, atomCount, type DrugEntry, type DrugCategory } from "@/data/drugs";
import { GAME_ROUNDS } from "@/data/rounds";

type Stat = "weight" | "age" | "atoms";

const STAT_LABELS: Record<Stat, string> = {
  weight: "Molecular weight (g/mol)",
  age: "Years since discovery",
  atoms: "Total atom count",
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Pulls the FIRST four-digit year mentioned in a drug's "discovered" text.
// That's usually the discovery/synthesis year, not when it reached market —
// for a drug like codeine ("synthesized 1887; marketed from the 1930s") those
// are ~40 years apart, so this stat is labeled "years since discovery", not
// "years on market", to describe what it actually measures.
function yearsSinceDiscovery(drug: DrugEntry): number {
  const match = drug.discovered.match(/\d{4}/);
  const year = match ? parseInt(match[0], 10) : new Date().getFullYear();
  return new Date().getFullYear() - year;
}

function statValue(drug: DrugEntry, stat: Stat): number {
  if (stat === "weight") return drug.molecularWeight;
  if (stat === "age") return yearsSinceDiscovery(drug);
  return atomCount(drug.formula);
}

function formatStat(drug: DrugEntry, stat: Stat): string {
  return statValue(drug, stat).toFixed(stat === "weight" ? 1 : 0);
}

// Each round deals only from that round's drug classes, split into two equal
// hands. Both hands are dealt face-up to the player — the computer's hand is
// just kept hidden in the UI, not reordered or special in any way, so which
// of its remaining cards gets revealed each hand is a genuine random pick,
// not a fixed "next in a deck" order.
function dealHands(categories: DrugCategory[]) {
  const pool = drugs.filter((d) => categories.includes(d.category));
  const shuffled = shuffle(pool);
  const mid = Math.ceil(shuffled.length / 2);
  return { player: shuffled.slice(0, mid), computer: shuffled.slice(mid) };
}

function DeckStack({ count, label }: { count: number; label: string }) {
  const layers = Math.max(1, Math.min(4, count));
  return (
    <div className="deck-stack" aria-label={`${label}: ${count} cards`}>
      <div className="deck-stack-cards" style={{ "--layers": layers } as React.CSSProperties}>
        {Array.from({ length: layers }).map((_, i) => (
          <div key={i} className="deck-stack-card" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="deck-stack-count mono">{count}</div>
      <div className="deck-stack-label mono">{label}</div>
    </div>
  );
}

function CardBack() {
  return (
    <div className="poker-card-back">
      <div className="poker-card-back-pattern" />
      <span className="poker-card-back-mark mono">A</span>
    </div>
  );
}

type HandResult = {
  stat: Stat;
  playerCard: DrugEntry;
  computerCard: DrugEntry;
  winner: "player" | "computer" | "tie";
  fact: string;
};

export default function PokerPage() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [hands, setHands] = useState(() => dealHands(GAME_ROUNDS[0].categories));
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [result, setResult] = useState<HandResult | null>(null);
  const [handNumber, setHandNumber] = useState(1);
  const [exchangeWins, setExchangeWins] = useState({ player: 0, computer: 0 });
  const [matchScore, setMatchScore] = useState({ player: 0, computer: 0, ties: 0 });
  const [matchComplete, setMatchComplete] = useState(false);

  const round = GAME_ROUNDS[roundIndex];
  const isFinalRound = roundIndex === GAME_ROUNDS.length - 1;
  const roundOver = hands.player.length === 0 || hands.computer.length === 0;

  const selectedCard = useMemo(
    () => hands.player.find((d) => d.slug === selectedSlug) ?? null,
    [hands.player, selectedSlug]
  );

  function selectCard(slug: string) {
    if (result) return; // can't swap cards mid-reveal
    setSelectedSlug((cur) => (cur === slug ? null : slug));
  }

  function playStat(stat: Stat) {
    if (!selectedCard || result || hands.computer.length === 0) return;

    // The computer doesn't get to see which stat you picked before choosing
    // its card — it plays a genuinely random card from what it has left,
    // same as you'd have no way to peek at its hand either.
    const computerCard = hands.computer[Math.floor(Math.random() * hands.computer.length)];

    const playerValue = statValue(selectedCard, stat);
    const computerValue = statValue(computerCard, stat);
    const winner: "player" | "computer" | "tie" =
      playerValue === computerValue ? "tie" : playerValue > computerValue ? "player" : "computer";

    // The "reveal" is always a mechanism-of-action or historical fact — never a
    // toxicity or dosage detail, per the site's hard content rules.
    const revealSource = winner === "computer" ? computerCard : selectedCard;
    const fact = revealSource.history.split(".")[0] + ".";

    setResult({ stat, playerCard: selectedCard, computerCard, winner, fact });
    setExchangeWins((prev) => ({
      player: prev.player + (winner === "player" ? 1 : 0),
      computer: prev.computer + (winner === "computer" ? 1 : 0),
    }));
  }

  function nextHand() {
    if (!result) return;
    setHands((prev) => ({
      player: prev.player.filter((d) => d.slug !== result.playerCard.slug),
      computer: prev.computer.filter((d) => d.slug !== result.computerCard.slug),
    }));
    setSelectedSlug(null);
    setResult(null);
    setHandNumber((n) => n + 1);
  }

  function nextRound() {
    const playerWonRound = exchangeWins.player > exchangeWins.computer;
    const computerWonRound = exchangeWins.computer > exchangeWins.player;
    setMatchScore((prev) => ({
      player: prev.player + (playerWonRound ? 1 : 0),
      computer: prev.computer + (computerWonRound ? 1 : 0),
      ties: prev.ties + (!playerWonRound && !computerWonRound ? 1 : 0),
    }));
    if (isFinalRound) {
      setMatchComplete(true);
      return;
    }
    const next = roundIndex + 1;
    setRoundIndex(next);
    setHands(dealHands(GAME_ROUNDS[next].categories));
    setExchangeWins({ player: 0, computer: 0 });
    setSelectedSlug(null);
    setResult(null);
    setHandNumber(1);
  }

  function playAgain() {
    setRoundIndex(0);
    setHands(dealHands(GAME_ROUNDS[0].categories));
    setExchangeWins({ player: 0, computer: 0 });
    setSelectedSlug(null);
    setResult(null);
    setHandNumber(1);
    setMatchScore({ player: 0, computer: 0, ties: 0 });
    setMatchComplete(false);
  }

  return (
    <div className="poker-page">
      <div className="wrap">
        <div className="eyebrow-line mono">Game — Poker</div>
        <h1>Top Trumps, restrung around pharmacology.</h1>
        <p className="solitaire-hint">
          Your whole hand is face-up — pick any card, then pick which of its three stats to battle
          on. The computer plays a random card from its hidden hand in response. Highest value wins
          both cards&apos; place in the tally; whoever wins more hands in a round takes it. No betting,
          no bluffing — just the numbers, and a fact about whichever drug comes out on top.
        </p>
        {!matchComplete && (
          <div className="solitaire-status mono">
            Round {roundIndex + 1} of {GAME_ROUNDS.length} — {round.title}
            {!roundOver && ` · Hand ${handNumber} · You ${exchangeWins.player}–${exchangeWins.computer} computer`}
          </div>
        )}
      </div>

      {!matchComplete && !roundOver && (
        <div className="poker-table-wrap">
          <div className="poker-table">
            <div className="poker-decks-row">
              <DeckStack count={hands.player.length} label="You" />
              <div className="poker-round-badge mono">
                Match {matchScore.player}–{matchScore.computer}
              </div>
              <DeckStack count={hands.computer.length} label="Opponent" />
            </div>

            <div className="poker-face-off">
              <div className="poker-slot">
                <div className="poker-slot-label mono">Your card</div>
                {selectedCard ? (
                  <div
                    className={`poker-card${
                      result ? (result.winner === "player" ? " is-winner" : result.winner === "computer" ? " is-loser" : "") : ""
                    }`}
                  >
                    <span className={`category-badge cat-${categorySlug(selectedCard.category)}`}>
                      {selectedCard.category}
                    </span>
                    <span className="solitaire-card-name poker-card-name">{selectedCard.name}</span>
                    <span className="solitaire-card-class mono">{selectedCard.drugClass}</span>
                    <div className="poker-stats">
                      {(Object.keys(STAT_LABELS) as Stat[]).map((stat) => (
                        <button
                          key={stat}
                          type="button"
                          className={`poker-stat-btn${result?.stat === stat ? " is-battled" : ""}`}
                          disabled={!!result}
                          onClick={() => playStat(stat)}
                        >
                          <span>{STAT_LABELS[stat]}</span>
                          <span className="mono">{formatStat(selectedCard, stat)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="poker-card is-hidden">
                    <div className="poker-card-back" style={{ background: "transparent", border: "2px dashed rgba(232,163,61,0.35)", boxShadow: "none" }}>
                      <span className="poker-card-back-mark mono" style={{ fontSize: "0.85rem", color: "rgba(253,252,249,0.5)" }}>
                        Pick a card below
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="poker-vs mono">VS</div>

              <div className="poker-slot">
                <div className="poker-slot-label mono">Opponent&apos;s card</div>
                {result ? (
                  <div
                    className={`poker-card poker-flip-in${
                      result.winner === "computer" ? " is-winner" : result.winner === "player" ? " is-loser" : ""
                    }`}
                  >
                    <span className={`category-badge cat-${categorySlug(result.computerCard.category)}`}>
                      {result.computerCard.category}
                    </span>
                    <span className="solitaire-card-name poker-card-name">{result.computerCard.name}</span>
                    <span className="solitaire-card-class mono">{result.computerCard.drugClass}</span>
                    <div className="poker-stats">
                      {(Object.keys(STAT_LABELS) as Stat[]).map((stat) => (
                        <div key={stat} className={`poker-stat-row${stat === result.stat ? " is-battled" : ""}`}>
                          <span>{STAT_LABELS[stat]}</span>
                          <span className="mono">{formatStat(result.computerCard, stat)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="poker-card is-hidden">
                    <CardBack />
                  </div>
                )}
              </div>
            </div>

            {result && (
              <div className="poker-result">
                <div className={`poker-result-headline${result.winner !== "tie" ? ` is-${result.winner}` : ""}`}>
                  {result.winner === "tie"
                    ? "Tie — no point either way."
                    : result.winner === "player"
                      ? "You win this hand."
                      : "Opponent wins this hand."}
                </div>
                <p className="poker-fact">
                  <span className="eyebrow-line mono">Reveal</span> {result.fact}
                </p>
                <button type="button" className="btn-primary" onClick={nextHand}>
                  Next hand
                </button>
              </div>
            )}

            {!selectedCard && !result && (
              <div className="poker-hand">
                <div className="poker-hand-label mono">Your hand — pick a card to play</div>
                <div className="poker-hand-list">
                  {hands.player.map((drug) => (
                    <button
                      key={drug.slug}
                      type="button"
                      className="poker-hand-card"
                      onClick={() => selectCard(drug.slug)}
                    >
                      <span className={`category-badge cat-${categorySlug(drug.category)}`}>{drug.category}</span>
                      <span className="solitaire-card-name">{drug.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!matchComplete && roundOver && (
        <div className="wrap">
          <div className="solitaire-win solitaire-round-win">
            <h2>
              {exchangeWins.player > exchangeWins.computer
                ? `You won "${round.title}" ${exchangeWins.player}–${exchangeWins.computer}.`
                : exchangeWins.computer > exchangeWins.player
                  ? `Opponent won "${round.title}" ${exchangeWins.computer}–${exchangeWins.player}.`
                  : `"${round.title}" tied ${exchangeWins.player}–${exchangeWins.computer}.`}
            </h2>
            <p>
              {isFinalRound
                ? "That was the last round of the match."
                : `Next up: ${GAME_ROUNDS[roundIndex + 1].title}.`}
            </p>
            <button type="button" className="btn-primary" onClick={nextRound}>
              {isFinalRound ? "See match result" : "Next round"}
            </button>
          </div>
        </div>
      )}

      {matchComplete && (
        <div className="wrap">
          <div className="solitaire-win">
            <h2>
              {matchScore.player > matchScore.computer
                ? "You won the match."
                : matchScore.player < matchScore.computer
                  ? "Opponent won the match."
                  : "The match ended in a tie."}
            </h2>
            <p>
              Final score across all {GAME_ROUNDS.length} rounds: you {matchScore.player} — opponent{" "}
              {matchScore.computer}
              {matchScore.ties > 0 ? ` (${matchScore.ties} tied)` : ""}.
            </p>
            <button type="button" className="btn-primary" onClick={playAgain} style={{ marginRight: 12 }}>
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
