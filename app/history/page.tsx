import Link from "next/link";
import { drugs } from "@/data/drugs";

// Keeps a full history paragraph scannable across the whole catalog — cut to a
// clean sentence break rather than mid-word.
function truncate(text: string, max = 150) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export default function HistoryHubPage() {
  const sorted = [...drugs].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="wrap history-hub-page">
      <div className="eyebrow-line mono">History</div>
      <h1>Where today&apos;s drugs came from.</h1>
      <p className="solitaire-hint">
        Origins and discovery for every compound in the index — pick one for the full story.
      </p>

      <div className="history-hub-list">
        {sorted.map((drug) => (
          <Link href={`/entries/${drug.slug}/history`} className="history-hub-card" key={drug.slug}>
            <div className="history-hub-name">{drug.name}</div>
            <p className="history-hub-excerpt">{truncate(drug.history)}</p>
            <div className="history-hub-fact mono">{drug.discovered}</div>
          </Link>
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
