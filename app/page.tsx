import Link from "next/link";
import { drugs } from "@/data/drugs";

const GAMES = [
  {
    label: "GAME 01",
    title: "Solitaire",
    body: "Sort compounds into sequence — by molar mass, by class, by potency — to clear the board.",
    href: "/games/solitaire",
  },
  {
    label: "GAME 02",
    title: "Poker",
    body: "Compare drug stat-cards head to head — molecular weight, years on the market — and see what each reveal teaches you.",
    href: "/games/poker",
  },
];

// Group entries by their starting letter for the index below.
function groupByLetter() {
  const groups = new Map<string, typeof drugs>();
  for (const drug of [...drugs].sort((a, b) => a.name.localeCompare(b.name))) {
    const group = groups.get(drug.letter) ?? [];
    group.push(drug);
    groups.set(drug.letter, group);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export default function Home() {
  const letterGroups = groupByLetter();

  return (
    <div className="wrap">
      <section className="page-intro">
        <h1>
          The A–Z reference for <span className="phar-gradient">pharmacology</span>.
        </h1>
        <p className="hero-sub">Real structures, real data, real history — through games, not flashcards.</p>
        <div className="page-intro-actions">
          <Link href="/games/solitaire" className="btn-primary">
            Play Solitaire
          </Link>
          <Link href="/trends" className="btn-outline">
            View Trends
          </Link>
        </div>
      </section>

      <div className="section-divider" />

      <section id="games">
        <div className="section-head">
          <h2>Games built around how drugs actually behave.</h2>
        </div>
        <div className="game-grid">
          {GAMES.map((game) => (
            <Link href={game.href} className={`game-card game-card-${game.href.split("/").pop()}`} key={game.label}>
              <div className="g-label mono">{game.label}</div>
              <h3>{game.title}</h3>
              <p>{game.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section id="index">
        <div className="section-head">
          <h2>{drugs.length} entries and counting.</h2>
        </div>
        <div className="index-grid">
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
      </section>

      <footer>
        <div>Alpharbet</div>
        <div>{drugs.length} entries, A–Z</div>
      </footer>
    </div>
  );
}
