import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { conditions, getConditionBySlug } from "@/data/conditions";
import { drugs, categorySlug } from "@/data/drugs";

export function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) return {};
  const description = `${condition.summary} ${condition.prevalence.stat}`.slice(0, 160);
  return {
    title: condition.name,
    description,
    openGraph: { title: `${condition.name} — Alpharbet`, description },
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = getConditionBySlug(slug);
  if (!condition) notFound();

  const treatingDrugs = drugs.filter((d) => condition.categories.includes(d.category));

  return (
    <div className="wrap entry-page">
      <Link href="/conditions" className="back-link mono">
        ← Back to Conditions
      </Link>

      <div className="entry-header">
        <h1>{condition.name}</h1>
        <div className="practical-name">{condition.summary}</div>
      </div>

      <div className="entry-grid">
        <div className="entry-main">
          <section className="entry-block">
            <div className="eyebrow-line mono">Symptoms</div>
            <ul className="condition-symptom-list">
              {condition.symptoms.map((symptom) => (
                <li key={symptom}>{symptom}</li>
              ))}
            </ul>
          </section>

          <section className="entry-block">
            <div className="eyebrow-line mono">Treatment</div>
            <p>{condition.treatment}</p>
          </section>

          <section className="entry-block">
            <div className="eyebrow-line mono">How common it is</div>
            <p>{condition.prevalence.stat}</p>
            <div className="entry-fact">
              Source:{" "}
              <a href={condition.prevalence.source.url} target="_blank" rel="noreferrer">
                {condition.prevalence.source.title}
              </a>
            </div>
          </section>

          {condition.geographic && (
            <section className="entry-block">
              <div className="eyebrow-line mono">Where it varies</div>
              <p>{condition.geographic.note}</p>
              <div className="entry-fact">
                Source:{" "}
                <a href={condition.geographic.source.url} target="_blank" rel="noreferrer">
                  {condition.geographic.source.title}
                </a>
              </div>
            </section>
          )}

          <section className="entry-block">
            <div className="eyebrow-line mono">Drugs used to treat it</div>
            <div className="condition-drug-list">
              {treatingDrugs.map((drug) => (
                <Link href={`/entries/${drug.slug}`} className="condition-drug-card" key={drug.slug}>
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
            <p>See how well you know the drugs used for {condition.name.toLowerCase()}.</p>
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
