import Link from "next/link";
import { drugs } from "@/data/drugs";

// One card per other page on the site, so the homepage doubles as a directory.
const SITE_CARDS = [
  {
    label: "PLAY",
    title: "Solitaire",
    body: "Sort compounds into sequence — by molar mass, by class, by potency — to clear the board.",
    href: "/games/solitaire",
  },
  {
    label: "PLAY",
    title: "Poker",
    body: "Compare drug stat-cards head to head — molecular weight, years on the market — and see what each reveal teaches you.",
    href: "/games/poker",
  },
  {
    label: "DATA",
    title: "Trends",
    body: "Real acquisition-cost data, plotted over time — pick a few drugs and compare how their prices have moved.",
    href: "/trends",
  },
  {
    label: "FIND",
    title: "Tools",
    body: "Locate pharmacies and professionals near you, right from your own location.",
    href: "/tools",
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

      <section id="explore">
        <div className="section-head">
          <h2>Everything the index leads to.</h2>
        </div>
        <div className="site-card-grid">
          {SITE_CARDS.map((card) => (
            <Link href={card.href} className="site-card" key={card.title}>
              <div className="g-label mono">{card.label}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
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
