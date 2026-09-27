"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { drugs, type DrugEntry } from "@/data/drugs";

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

function dealDecks() {
  const shuffled = shuffle(drugs);
  const mid = Math.ceil(shuffled.length / 2);
  return { player: shuffled.slice(0, mid), computer: shuffled.slice(mid) };
}

type RoundResult = {
  stat: Stat;
  playerCard: DrugEntry;
  computerCard: DrugEntry;
  winner: "player" | "computer" | "tie";
  fact: string;
};

export default function PokerPage() {
  const [decks, setDecks] = useState(() => dealDecks());
  const [result, setResult] = useState<RoundResult | null>(null);
  const [round, setRound] = useState(1);

  const playerCard = decks.player[0];
  const computerCard = decks.computer[0];
  const gameOver = decks.player.length === 0 || decks.computer.length === 0;
  const playerWonGame = decks.computer.length === 0 && decks.player.length > 0;

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

  function nextRound() {
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
    setRound((r) => r + 1);
  }

  function playAgain() {
    setDecks(dealDecks());
    setResult(null);
    setRound(1);
  }

  return (
    <div className="poker-page">
      <div className="wrap">
        <div className="eyebrow-line mono">Game — Poker</div>
        <h1>Top Trumps, restrung around pharmacology.</h1>
        <p className="solitaire-hint">
          Pick a stat from your top card. Highest value wins both cards. No betting, no bluffing —
          just the numbers, and a fact about whichever drug comes out on top.
        </p>
        {!gameOver && (
          <div className="solitaire-status mono">
            Round {round} · You hold {decks.player.length} · Opponent holds {decks.computer.length}
          </div>
        )}
      </div>

      {!gameOver && playerCard && computerCard && (
        <div className="wrap poker-arena">
          <div className="poker-face-off">
            <div className="poker-slot">
              <div className="poker-slot-label mono">Your card</div>
              <div className="poker-card">
                <span className="solitaire-card-name">{playerCard.name}</span>
                <span className="solitaire-card-class mono">{playerCard.drugClass}</span>
                <div className="poker-stats">
                  {(Object.keys(STAT_LABELS) as Stat[]).map((stat) => (
                    <button
                      key={stat}
                      type="button"
                      className="poker-stat-btn"
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
              <div className={`poker-card${result ? "" : " is-hidden"}`}>
                {result ? (
                  <>
                    <span className="solitaire-card-name">{computerCard.name}</span>
                    <span className="solitaire-card-class mono">{computerCard.drugClass}</span>
                    <div className="poker-stats">
                      {(Object.keys(STAT_LABELS) as Stat[]).map((stat) => (
                        <div key={stat} className={`poker-stat-row${stat === result.stat ? " is-battled" : ""}`}>
                          <span>{STAT_LABELS[stat]}</span>
                          <span className="mono">{statValue(computerCard, stat).toFixed(stat === "weight" ? 1 : 0)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="poker-card-back mono">face down</div>
                )}
              </div>
            </div>
          </div>

          {result && (
            <div className="poker-result">
              <div className="poker-result-headline">
                {result.winner === "tie"
                  ? "Tie — both cards return to their decks."
                  : result.winner === "player"
                    ? "You win this round."
                    : "Opponent wins this round."}
              </div>
              <p className="poker-fact">
                <span className="eyebrow-line mono">Reveal</span> {result.fact}
              </p>
              <button type="button" className="btn-primary" onClick={nextRound}>
                Next round
              </button>
            </div>
          )}
        </div>
      )}

      {gameOver && (
        <div className="wrap">
          <div className="solitaire-win">
            <h2>{playerWonGame ? "You cleared the deck." : "Opponent cleared the deck."}</h2>
            <p>
              {playerWonGame
                ? "Every card ended up in your pile — game over."
                : "The opponent ended up with every card this time."}
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
