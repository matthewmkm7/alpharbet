import Link from "next/link";

// Both card games land here from the single "Games" nav link (see
// site-header.tsx) — mirrors the homepage's combined Games card so there's a
// real page for that nav entry to point at, instead of picking one game and
// burying the other.
const GAMES = [
  {
    title: "Solitaire",
    href: "/games/solitaire",
    body: "Sort compounds into sequence by molar mass, drug class, or potency to clear the board.",
  },
  {
    title: "Poker",
    href: "/games/poker",
    body: "Top Trumps-style stat comparison — highest value wins the hand, no betting or bluffing.",
  },
];

export default function GamesPage() {
  return (
    <div className="wrap">
      <section className="page-intro">
        <h1>Games</h1>
        <p className="hero-sub">Two ways to study, both built around drug data.</p>
      </section>

      <div className="section-divider" />

      <section style={{ marginTop: 44 }}>
        <div className="site-card-grid">
          {GAMES.map((game) => (
            <Link href={game.href} className="site-card" key={game.title}>
              <div className="g-label mono">PLAY</div>
              <h3>{game.title}</h3>
              <p>{game.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
