"use client";

import { useState } from "react";
import Link from "next/link";
import { drugs } from "@/data/drugs";

// A live search box, sitting above the full A–Z list, so finding one
// specific drug doesn't mean scanning 80+ entries by eye.
export default function EntrySearch() {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? drugs.filter((d) => d.name.toLowerCase().includes(trimmed) || d.practicalName.toLowerCase().includes(trimmed))
    : [];

  return (
    <div className="entry-search">
      <input
        type="text"
        className="entry-search-input"
        placeholder="Search by name…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {trimmed && (
        <div className="entry-search-panel">
          {results.length > 0 ? (
            <ul>
              {results.map((d) => (
                <li key={d.slug}>
                  <Link href={`/entries/${d.slug}`}>
                    <span className="search-result-name">{d.name}</span>
                    <span className="search-result-class mono">{d.drugClass}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="entry-search-empty mono">No matches — try another spelling.</div>
          )}
        </div>
      )}
    </div>
  );
}
