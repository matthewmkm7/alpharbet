import Link from "next/link";
import { notFound } from "next/navigation";
import { drugs, getDrugBySlug } from "@/data/drugs";
import { getIllnessesForCategory } from "@/data/illnesses";
import MoleculeViewer from "./molecule-viewer";
import ChemDataPanel from "./chem-data-panel";

export function generateStaticParams() {
  return drugs.map((d) => ({ slug: d.slug }));
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const drug = getDrugBySlug(slug);
  if (!drug) notFound();
  // Only some categories have a matching illness page so far (see
  // data/illnesses.ts) — the card below only renders when one exists.
  const relatedIllness = getIllnessesForCategory(drug.category)[0];

  return (
    <div className="wrap entry-page">
      <Link href="/" className="back-link mono">
        ← Back home
      </Link>

      <div className="entry-header">
        <div className="letter">{drug.letter}</div>
        <h1>{drug.name}</h1>
        <div className="practical-name">
          {drug.practicalName} — {drug.drugClass}
        </div>
      </div>

      <div className="entry-grid">
        <div className="entry-main">
          <section className="entry-block">
            <div className="eyebrow-line mono">Interactive structure</div>
            <MoleculeViewer cid={drug.cid} slug={drug.slug} name={drug.name} />
            <div className="formula mono entry-formula">
              {drug.formula} · {drug.molecularWeightLabel}
            </div>
          </section>

          <ChemDataPanel drug={drug} />

          <section className="entry-block">
            <div className="eyebrow-line mono">How it works in the body</div>
            <p>{drug.mechanism}</p>
          </section>

          <section className="entry-block">
            <div className="eyebrow-line mono">Hazards and usage notes</div>
            <p>{drug.hazards}</p>
          </section>
        </div>

        <aside className="entry-side">
          {relatedIllness && (
            <div className="entry-side-card">
              <div className="eyebrow-line mono">Related condition</div>
              <p>See real prevalence data for {relatedIllness.name.toLowerCase()}.</p>
              <Link href={`/illnesses/${relatedIllness.slug}`} className="btn-primary btn-link">
                View {relatedIllness.name}
              </Link>
            </div>
          )}
          <div className="entry-side-card">
            <div className="eyebrow-line mono">History and discovery</div>
            <p>Where {drug.name} came from, and how its use has changed since.</p>
            <Link href={`/entries/${drug.slug}/history`} className="btn-primary btn-link">Read the history</Link>
          </div>
          <div className="entry-side-card">
            <div className="eyebrow-line mono">Test what you know</div>
            <p>Think you&apos;ve got {drug.name} down cold?</p>
            <Link href="/games/solitaire" className="btn-primary btn-link">Play Solitaire</Link>
          </div>
          <div className="entry-side-card">
            <div className="eyebrow-line mono">Market view</div>
            <p>See how {drug.name}&apos;s pricing has shifted over time.</p>
            <Link href={`/trends?drug=${drug.slug}`} className="btn-primary btn-link">View trends</Link>
          </div>
          <div className="entry-side-card">
            <div className="eyebrow-line mono">Find it nearby</div>
            <p>Locate pharmacies and professionals near you.</p>
            <Link href="/tools" className="btn-primary btn-link">Find nearby</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
