import Link from "next/link";
import WaitlistForm from "./waitlist-form";

const INSIDE_ITEMS = [
  {
    idx: "01",
    title: "Names, chemical and practical",
    body: "The formal name next to what it's actually called on the shelf and in the ward.",
  },
  {
    idx: "02",
    title: "Interactive 3D structure",
    body: "Rotate the molecule. Watch it change across different states, not just a flat diagram.",
  },
  {
    idx: "03",
    title: "Chemical data, animated",
    body: "Formula and key data brought to life with short animations instead of a static table.",
  },
  {
    idx: "04",
    title: "How it works in the body",
    body: "Mechanism of action and pathway, shown step by step rather than buried in a paragraph.",
  },
  {
    idx: "05",
    title: "History and discovery",
    body: "Where it came from, who found it, and how its use has changed — then versus now.",
  },
  {
    idx: "06",
    title: "Hazards and usage notes",
    body: "What to watch for, plainly stated, in the same place as everything else.",
  },
];

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
    <>
      <div className="wrap">
        <section className="hero">
          <div>
            <div className="eyebrow-line mono">Pharmacology, from A to Z</div>
            <h1>Every drug has a story. We turn it into one you&apos;ll actually remember.</h1>
            <p className="hero-sub">
              Alpharbet is an interactive index of drugs and compounds — real structures, real
              data, real history — built around games instead of flashcards. Made for the people
              who have to know this cold.
            </p>
            <WaitlistForm idSuffix="" />
          </div>

          <Link href="/entries/amoxicillin" className="card-mock card-mock-link">
            <div className="card-tab">Aa</div>
            <div className="letter">A</div>
            <h3>Amoxicillin</h3>
            <div className="practical-name">Amoxil · Trimox — aminopenicillin antibiotic</div>
            <div className="structure-box">
              <svg width="150" height="90" viewBox="0 0 150 90" fill="none">
                <circle cx="30" cy="45" r="7" stroke="#5FC8BA" strokeWidth="2" />
                <circle cx="60" cy="25" r="7" stroke="#E8A33D" strokeWidth="2" />
                <circle cx="60" cy="65" r="7" stroke="#E8A33D" strokeWidth="2" />
                <circle cx="95" cy="45" r="7" stroke="#5FC8BA" strokeWidth="2" />
                <circle cx="125" cy="20" r="7" stroke="#F3EFE6" strokeWidth="2" />
                <circle cx="125" cy="70" r="7" stroke="#F3EFE6" strokeWidth="2" />
                <line x1="37" y1="45" x2="53" y2="28" stroke="#F3EFE6" strokeWidth="1.5" />
                <line x1="37" y1="45" x2="53" y2="62" stroke="#F3EFE6" strokeWidth="1.5" />
                <line x1="67" y1="25" x2="88" y2="42" stroke="#F3EFE6" strokeWidth="1.5" />
                <line x1="67" y1="65" x2="88" y2="48" stroke="#F3EFE6" strokeWidth="1.5" />
                <line x1="102" y1="42" x2="118" y2="24" stroke="#F3EFE6" strokeWidth="1.5" />
                <line x1="102" y1="48" x2="118" y2="66" stroke="#F3EFE6" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="formula mono">C₁₆H₁₉N₃O₅S</div>
            <div className="card-tags">
              <span>Penicillin class</span>
              <span>Discovered 1970s</span>
              <span>Interactive 3D</span>
            </div>
          </Link>
        </section>

        <hr className="divider" />

        <section id="inside">
          <div className="section-head">
            <div className="eyebrow-line mono">What&apos;s in every entry</div>
            <h2>One index. Six ways to actually learn it.</h2>
            <p>
              Every compound in Alpharbet gets the same full treatment — so studying one drug
              looks the same as studying the next.
            </p>
          </div>
          <div className="inside-list">
            {INSIDE_ITEMS.map((item) => (
              <div className="inside-row" key={item.idx}>
                <div className="idx">{item.idx}</div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            ))}
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

        <section className="final-cta" id="join">
          <div className="eyebrow-line mono" style={{ justifyContent: "center", display: "flex" }}>
            Early access
          </div>
          <h2>Be one of the first through the index.</h2>
          <p>
            We&apos;re building the first 26 entries now. Join the waitlist and we&apos;ll bring
            you in as soon as it&apos;s ready to study from.
          </p>
          <WaitlistForm idSuffix="2" />
        </section>

        <footer>
          <div>Alpharbet® — built one entry at a time.</div>
          <div>A–Z, from Amoxicillin onward.</div>
        </footer>
      </div>
    </>
  );
}
