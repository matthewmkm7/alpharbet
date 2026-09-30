import type { Metadata } from "next";
import Link from "next/link";
import { drugs } from "@/data/drugs";
import EntrySearch from "./entry-search";

export const metadata: Metadata = {
  title: "A–Z Drug Index",
  description:
    "Browse every drug covered on Alpharbet, A to Z — chemical structure, mechanism of action, history, and hazards for each one.",
};

// The full A–Z list used to live on the homepage — moved here so the
// homepage can stay a short, scannable directory instead of a wall of links.
function groupByLetter() {
  const groups = new Map<string, typeof drugs>();
  for (const drug of [...drugs].sort((a, b) => a.name.localeCompare(b.name))) {
    const group = groups.get(drug.letter) ?? [];
    group.push(drug);
    groups.set(drug.letter, group);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export default function EntriesIndexPage() {
  const letterGroups = groupByLetter();

  return (
    <div className="wrap index-page">
      <div className="eyebrow-line mono">Index</div>
      <h1>{drugs.length} entries, A–Z.</h1>
      <p className="solitaire-hint">Every compound on Alpharbet, grouped by first letter.</p>

      <EntrySearch />

      <div className="index-grid" style={{ marginTop: 32 }}>
        {letterGroups.map(([letter, group]) => (
          <div className="index-letter-group" key={letter}>
            <div className="index-letter mono">{letter}</div>
            <ul>
              {group.map((drug) => (
                <li key={drug.slug}>
                  <Link href={`/entries/${drug.slug}`}>{drug.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 40 }}>
        <Link href="/" className="back-link mono">
          ← Back home
        </Link>
      </p>
    </div>
  );
}
