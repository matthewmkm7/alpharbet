import Link from "next/link";

const GAMES = [
  {
    label: "GAME 01",
    title: "Solitaire",
    body: "Sort compounds into sequence — by molar mass, by class, by potency — to clear the board.",
  },
  {
    label: "GAME 02",
    title: "Poker",
    body: "Compare drug stat-cards head to head — potency, molar mass, discovery era — and see what each reveal teaches you.",
  },
];

const AUDIENCE = [
  "Pharmacy students prepping for board exams",
  "Nursing students learning drug classes and interactions",
  "Pre-med and med students building a foundation early",
  "Anyone who's tried flashcards and wants something that sticks",
];

export default function Home() {
  return (
    <div className="wrap">
      <section className="page-intro">
        <h1>The A–Z reference for pharmacology.</h1>
        <p className="hero-sub">
          Real structures, real data, real history — built around games instead of flashcards.
        </p>
        <div className="page-intro-actions">
          <Link href="/games/solitaire" className="btn-primary">
            Play Solitaire
          </Link>
          <Link href="/trends" className="btn-outline">
            View Trends
          </Link>
        </div>
      </section>

      <hr className="divider" />

      <section id="games">
        <div className="section-head">
          <div className="eyebrow-line mono">Study through play</div>
          <h2>Games built around how drugs actually behave.</h2>
          <p>No new rules to learn — familiar games, restrung around pharmacology instead of chance.</p>
        </div>
        <div className="game-grid">
          {GAMES.map((game) => (
            <div className="game-card" key={game.label}>
              <div className="g-label mono">{game.label}</div>
              <h3>{game.title}</h3>
              <p>{game.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section id="audience">
        <div className="audience-band">
          <div>
            <div className="eyebrow-line mono">Who it&apos;s for</div>
            <h2>Built first for the people who have to know this cold.</h2>
            <p>
              Pharmacology is memorization-heavy by nature. Alpharbet starts with the students
              carrying the heaviest load of it.
            </p>
          </div>
          <ul className="audience-list">
            {AUDIENCE.map((item) => (
              <li key={item}>
                <span className="mark mono">→</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer>
        <div>Alpharbet® — built one entry at a time.</div>
        <div>A–Z, from Amoxicillin onward.</div>
      </footer>
    </div>
  );
}
