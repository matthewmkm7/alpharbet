import Link from "next/link";
import { notFound } from "next/navigation";
import { drugs, getDrugBySlug } from "@/data/drugs";

export function generateStaticParams() {
  return drugs.map((d) => ({ slug: d.slug }));
}

// History gets its own page rather than sitting inline on the entry page —
// per the engagement-loop design principle, a history entry should end with
// a direct challenge into a game on that drug, not just link out to one from
// the side.
export default async function HistoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const drug = getDrugBySlug(slug);
  if (!drug) notFound();

  return (
    <div className="wrap entry-page">
      <Link href={`/entries/${drug.slug}`} className="back-link mono">
        ← Back to {drug.name}
      </Link>

      <div className="entry-header">
        <div className="letter">{drug.letter}</div>
        <h1>{drug.name}</h1>
        <div className="practical-name">History and discovery</div>
      </div>

      <section className="entry-block history-body">
        <p>{drug.history}</p>
        <div className="entry-fact mono">{drug.discovered}</div>
      </section>

      <div className="entry-side-card history-challenge">
        <div className="eyebrow-line mono">Now put it to the test</div>
        <p>You know where {drug.name} came from — see if you can sort it against the rest of its class.</p>
        <Link href="/games/solitaire" className="btn-primary btn-link">Play Solitaire</Link>
      </div>
    </div>
  );
}
