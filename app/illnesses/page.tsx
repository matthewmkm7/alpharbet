import type { Metadata } from "next";
import Link from "next/link";
import { illnesses } from "@/data/illnesses";

export const metadata: Metadata = {
  title: "Illnesses & Conditions",
  description:
    "Real, cited prevalence data on common illnesses and the drug classes used to treat them.",
};

export default function IllnessesHubPage() {
  return (
    <div className="wrap history-hub-page">
      <div className="eyebrow-line mono">Illnesses</div>
      <h1>Conditions, and what treats them.</h1>
      <p className="solitaire-hint">
        Real, cited prevalence data for the conditions behind the drugs in the index — pick one to see
        which drug classes are used for it.
      </p>

      <div className="history-hub-list">
        {illnesses.map((illness) => (
          <Link href={`/illnesses/${illness.slug}`} className="history-hub-card" key={illness.slug}>
            <div className="history-hub-name">{illness.name}</div>
            <p className="history-hub-excerpt">{illness.summary}</p>
            <div className="history-hub-fact mono">{illness.prevalence.stat}</div>
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
