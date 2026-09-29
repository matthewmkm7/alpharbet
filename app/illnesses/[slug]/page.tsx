import Link from "next/link";
import { notFound } from "next/navigation";
import { illnesses, getIllnessBySlug } from "@/data/illnesses";
import { drugs, categorySlug } from "@/data/drugs";

export function generateStaticParams() {
  return illnesses.map((i) => ({ slug: i.slug }));
}

export default async function IllnessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const illness = getIllnessBySlug(slug);
  if (!illness) notFound();

  const treatments = drugs.filter((d) => illness.categories.includes(d.category));

  return (
    <div className="wrap entry-page">
      <Link href="/illnesses" className="back-link mono">
        ← Back to Illnesses
      </Link>

      <div className="entry-header">
        <h1>{illness.name}</h1>
        <div className="practical-name">{illness.summary}</div>
      </div>

      <div className="entry-grid">
        <div className="entry-main">
          <section className="entry-block">
            <div className="eyebrow-line mono">How common it is</div>
            <p>{illness.prevalence.stat}</p>
            <div className="entry-fact">
              Source:{" "}
              <a href={illness.prevalence.source.url} target="_blank" rel="noreferrer">
                {illness.prevalence.source.title}
              </a>
            </div>
          </section>

          {illness.geographic && (
            <section className="entry-block">
              <div className="eyebrow-line mono">Where it varies</div>
              <p>{illness.geographic.note}</p>
              <div className="entry-fact">
                Source:{" "}
                <a href={illness.geographic.source.url} target="_blank" rel="noreferrer">
                  {illness.geographic.source.title}
                </a>
              </div>
            </section>
          )}

          <section className="entry-block">
            <div className="eyebrow-line mono">Drugs used to treat it</div>
            <div className="illness-drug-list">
              {treatments.map((drug) => (
                <Link href={`/entries/${drug.slug}`} className="illness-drug-card" key={drug.slug}>
                  <span className={`category-badge cat-${categorySlug(drug.category)}`}>
                    {drug.category}
                  </span>
                  <span className="solitaire-card-name">{drug.name}</span>
                  <span className="solitaire-card-class mono">{drug.drugClass}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="entry-side">
          <div className="entry-side-card">
            <div className="eyebrow-line mono">Test what you know</div>
            <p>See how well you know the drugs used for {illness.name.toLowerCase()}.</p>
            <Link href="/games/solitaire" className="btn-primary btn-link">
              Play Solitaire
            </Link>
          </div>
          <div className="entry-side-card">
            <div className="eyebrow-line mono">Market view</div>
            <p>See how pricing has shifted for these drug classes.</p>
            <Link href="/trends" className="btn-primary btn-link">
              View trends
            </Link>
          </div>
          <div className="entry-side-card">
            <div className="eyebrow-line mono">Find it nearby</div>
            <p>Locate pharmacies and professionals near you.</p>
            <Link href="/tools" className="btn-primary btn-link">
              Find nearby
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
