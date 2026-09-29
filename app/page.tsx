import Link from "next/link";

// One card per other page on the site, so the homepage doubles as a directory.
// Solitaire and Poker share a single "Games" card (see GAME_LINKS) instead of
// each getting their own, since they're two variants of the same idea.
const GAME_LINKS = [
  { title: "Solitaire", href: "/games/solitaire" },
  { title: "Poker", href: "/games/poker" },
];

// Order matches how the founder wants the directory read: Index first, then
// Illnesses, Trends, Tools, History — Games (below) comes last since it's its
// own block.
const SITE_CARDS = [
  { label: "BROWSE", title: "Index", body: "Every compound, A–Z.", href: "/entries" },
  { label: "LEARN", title: "Illnesses", body: "What each drug class treats.", href: "/illnesses" },
  { label: "DATA", title: "Trends", body: "Real price data, over time.", href: "/trends" },
  { label: "FIND", title: "Tools", body: "Pharmacies near you.", href: "/tools" },
  { label: "PAST", title: "History", body: "Where each drug came from.", href: "/history" },
];

export default function Home() {
  return (
    <div className="wrap">
      <section className="page-intro">
        <h1>
          The A–Z reference for <span className="phar-gradient">pharmacology</span>.
        </h1>
        <p className="hero-sub">Built around games, not flashcards.</p>
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
        <div className="site-card-grid">
          {SITE_CARDS.map((card) => (
            <Link href={card.href} className="site-card" key={card.title}>
              <div className="g-label mono">{card.label}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </Link>
          ))}
          <div className="site-card">
            <div className="g-label mono">PLAY</div>
            <h3>Games</h3>
            <p>Solitaire and Poker, pharmacology style.</p>
            <div className="site-card-subnav">
              {GAME_LINKS.map((game) => (
                <Link href={game.href} className="site-card-sublink" key={game.title}>
                  {game.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
