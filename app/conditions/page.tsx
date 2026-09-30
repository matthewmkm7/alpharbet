import type { Metadata } from "next";
import Link from "next/link";
import { conditions } from "@/data/conditions";

export const metadata: Metadata = {
  title: "Conditions",
  description:
    "Symptoms, treatment approaches, and real, cited prevalence data for common conditions and the drug classes used to treat them.",
};

export default function ConditionsHubPage() {
  return (
    <div className="wrap history-hub-page">
      <div className="eyebrow-line mono">Conditions</div>
      <h1>Conditions, and what treats them.</h1>
      <p className="solitaire-hint">
        Symptoms, treatment approaches, and real, cited prevalence data for the conditions behind the
        drugs in the index — pick one to see which drug classes are used for it.
      </p>

      <div className="history-hub-list">
        {conditions.map((condition) => (
          <Link href={`/conditions/${condition.slug}`} className="history-hub-card" key={condition.slug}>
            <div className="history-hub-name">{condition.name}</div>
            <p className="history-hub-excerpt">{condition.summary}</p>
            <div className="history-hub-fact mono">{condition.prevalence.stat}</div>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: 40 }}>
        <Link href="/" className="back-link mono">
          ← Back home
        </Link>
      </p>
    </div>
  );
}
