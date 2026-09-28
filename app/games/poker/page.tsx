"use client";

import { useState } from "react";
import Link from "next/link";
import { drugs, categorySlug, type DrugEntry, type DrugCategory } from "@/data/drugs";
import { GAME_ROUNDS } from "@/data/rounds";

type Stat = "weight" | "age";

const STAT_LABELS: Record<Stat, string> = {
  weight: "Molecular weight (g/mol)",
  age: "Years on the market",
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Pulls the first four-digit year mentioned in a drug's "discovered" text —
// covers "discovered", "synthesized", "developed", and "approved" phrasing alike.
function yearsOnMarket(drug: DrugEntry): number {
  const match = drug.discovered.match(/\d{4}/);
  const year = match ? parseInt(match[0], 10) : new Date().getFullYear();
  return new Date().getFullYear() - year;
}

function statValue(drug: DrugEntry, stat: Stat): number {
  return stat === "weight" ? drug.molecularWeight : yearsOnMarket(drug);
}

// Each round deals only from that round's 4 drug classes — a standardized,
// evenly-sized pool (every class now has exactly 4 entries) instead of
// shuffling the entire 76-drug catalog into one long, shapeless match.
function dealDecks(categories: DrugCategory[]) {
  const pool = drugs.filter((d) => categories.includes(d.category));
  const shuffled = shuffle(pool);
  const mid = Math.ceil(shuffled.length / 2);
  return { player: shuffled.slice(0, mid), computer: shuffled.slice(mid) };
}

// A small fanned stack of card-backs standing in for "cards remaining" —
// caps at 4 layers so a deck of 8 doesn't turn into a wall of divs.
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

type RoundResult = {
  stat: Stat;
  playerCard: DrugEntry;
  computerCard: DrugEntry;
  winner: "player" | "computer" | "tie";
  fact: string;
};

export default function PokerPage() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [decks, setDecks] = useState(() => dealDecks(GAME_ROUNDS[0].categories));
  const [result, setResult] = useState<RoundResult | null>(null);
  const [handNumber, setHandNumber] = useState(1);
  const [matchScore, setMatchScore] = useState({ player: 0, computer: 0, ties: 0 });
  const [matchComplete, setMatchComplete] = useState(false);

  const round = GAME_ROUNDS[roundIndex];
  const isFinalRound = roundIndex === GAME_ROUNDS.length - 1;

  const playerCard = decks.player[0];
  const computerCard = decks.computer[0];
  const roundOver = decks.player.length === 0 || decks.computer.length === 0;
  const playerWonRound = roundOver && decks.computer.length === 0 && decks.player.length > 0;
  const computerWonRound = roundOver && decks.player.length === 0 && decks.computer.length > 0;

  function playStat(stat: Stat) {
    if (!playerCard || !computerCard || result) return;

    const playerValue = statValue(playerCard, stat);
    const computerValue = statValue(computerCard, stat);
    const winner: "player" | "computer" | "tie" =
      playerValue === computerValue ? "tie" : playerValue > computerValue ? "player" : "computer";

    // The "reveal" is always a mechanism-of-action or historical fact — never a
    // toxicity or dosage detail, per the site's hard content rules.
    const revealSource = winner === "computer" ? computerCard : playerCard;
    const fact = revealSource.history.split(".")[0] + ".";

    setResult({ stat, playerCard, computerCard, winner, fact });
  }

  function nextHand() {
    if (!result) return;
    setDecks((prev) => {
      const playerRest = prev.player.slice(1);
      const computerRest = prev.computer.slice(1);
      if (result.winner === "player") {
        return { player: [...playerRest, result.playerCard, result.computerCard], computer: computerRest };
      }
      if (result.winner === "computer") {
        return { player: playerRest, computer: [...computerRest, result.computerCard, result.playerCard] };
      }
      // Tie: each card returns to the bottom of its own deck — no shared pot to keep things simple.
      return { player: [...playerRest, result.playerCard], computer: [...computerRest, result.computerCard] };
    });
    setResult(null);
    setHandNumber((n) => n + 1);
  }

  function nextRound() {
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
    setDecks(dealDecks(GAME_ROUNDS[next].categories));
    setResult(null);
    setHandNumber(1);
  }

  function playAgain() {
    setRoundIndex(0);
    setDecks(dealDecks(GAME_ROUNDS[0].categories));
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
          Pick a stat from your top card. Highest value wins both cards. No betting, no bluffing —
          just the numbers, and a fact about whichever drug comes out on top. Each round deals from
          four related drug classes; clear the opponent&apos;s hand to win the round.
        </p>
        {!matchComplete && (
          <div className="solitaire-status mono">
            Round {roundIndex + 1} of {GAME_ROUNDS.length} — {round.title}
            {!roundOver && ` · Hand ${handNumber}`}
          </div>
        )}
      </div>

      {!matchComplete && !roundOver && playerCard && computerCard && (
        <div className="poker-table-wrap">
          <div className="poker-table">
            <div className="poker-decks-row">
              <DeckStack count={decks.player.length} label="You" />
              <div className="poker-round-badge mono">
                Match {matchScore.player}–{matchScore.computer}
              </div>
              <DeckStack count={decks.computer.length} label="Opponent" />
            </div>

            <div className="poker-face-off">
              <div className="poker-slot">
                <div className="poker-slot-label mono">Your card</div>
                <div
                  className={`poker-card${
                    result ? (result.winner === "player" ? " is-winner" : result.winner === "computer" ? " is-loser" : "") : ""
                  }`}
                >
                  <span className={`category-badge cat-${categorySlug(playerCard.category)}`}>
                    {playerCard.category}
                  </span>
                  <span className="solitaire-card-name poker-card-name">{playerCard.name}</span>
                  <span className="solitaire-card-class mono">{playerCard.drugClass}</span>
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
                        <span className="mono">{statValue(playerCard, stat).toFixed(stat === "weight" ? 1 : 0)}</span>
                      </button>
                    ))}
                  </div>
                </div>
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
                    <span className={`category-badge cat-${categorySlug(computerCard.category)}`}>
                      {computerCard.category}
                    </span>
                    <span className="solitaire-card-name poker-card-name">{computerCard.name}</span>
                    <span className="solitaire-card-class mono">{computerCard.drugClass}</span>
                    <div className="poker-stats">
                      {(Object.keys(STAT_LABELS) as Stat[]).map((stat) => (
                        <div key={stat} className={`poker-stat-row${stat === result.stat ? " is-battled" : ""}`}>
                          <span>{STAT_LABELS[stat]}</span>
                          <span className="mono">{statValue(computerCard, stat).toFixed(stat === "weight" ? 1 : 0)}</span>
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
                    ? "Tie — both cards return to their decks."
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
          </div>
        </div>
      )}

      {!matchComplete && roundOver && (
        <div className="wrap">
          <div className="solitaire-win solitaire-round-win">
            <h2>{playerWonRound ? `You cleared "${round.title}".` : `Opponent cleared "${round.title}".`}</h2>
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
