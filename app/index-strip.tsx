"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { drugs } from "@/data/drugs";

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export default function IndexStrip() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const litLetters = Array.from(new Set(drugs.map((d) => d.letter)));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveLetter(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const entriesForLetter = activeLetter ? drugs.filter((d) => d.letter === activeLetter) : [];

  return (
    <>
      <div className="index-strip">
        <div className="index-strip-inner">
          <Link href="/" className="wordmark">
            Alpharbet<sup>®</sup>
          </Link>
          <div className="az-row">
            {LETTERS.map((letter) => (
              <button
                key={letter}
                type="button"
                className={litLetters.includes(letter) ? "lit" : ""}
                onClick={() => setActiveLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
          <Link href="/#join" className="nav-cta">
            Join the waitlist
          </Link>
        </div>
      </div>

      {activeLetter && (
        <div className="letter-panel-backdrop" onClick={() => setActiveLetter(null)}>
          <div className="letter-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="letter-panel-close"
              onClick={() => setActiveLetter(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="letter-panel-letter">{activeLetter}</div>
            {entriesForLetter.length > 0 ? (
              <ul>
                {entriesForLetter.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/entries/${d.slug}`} onClick={() => setActiveLetter(null)}>
                      <span className="letter-panel-name">{d.name}</span>
                      <span className="letter-panel-class mono">{d.drugClass}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="letter-panel-empty mono">
                No entries yet for {activeLetter} — check back soon.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
