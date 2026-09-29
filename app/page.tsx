import Link from "next/link";
import { drugs } from "@/data/drugs";

// One card per other page on the site, so the homepage doubles as a directory.
// Solitaire and Poker share a single "Games" card (see GAME_LINKS) instead of
// each getting their own, since they're two variants of the same idea.
const GAME_LINKS = [
  { title: "Solitaire", href: "/games/solitaire" },
  { title: "Poker", href: "/games/poker" },
];

const SITE_CARDS = [
  {
    label: "BROWSE",
    title: "Index",
    body: "Every compound, A to Z — jump straight to the one you need.",
    href: "/entries",
  },
  {
    label: "PAST",
    title: "History",
    body: "How today's drugs got here — origins and discovery, one compound at a time.",
    href: "/history",
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

export default function Home() {
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
          <h2>Explore the site.</h2>
        </div>
        <div className="site-card-grid">
          <div className="site-card">
            <div className="g-label mono">PLAY</div>
            <h3>Games</h3>
            <p>Two ways to study through play — sort compounds by class, or go head to head on their stats.</p>
            <div className="site-card-subnav">
              {GAME_LINKS.map((game) => (
                <Link href={game.href} className="site-card-sublink" key={game.title}>
                  {game.title}
                </Link>
              ))}
            </div>
          </div>
          {SITE_CARDS.map((card) => (
            <Link href={card.href} className="site-card" key={card.title}>
              <div className="g-label mono">{card.label}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </Link>
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
