import Link from "next/link";

export const metadata = {
  title: "Medical Disclaimer — Alpharbet",
};

export default function DisclaimerPage() {
  return (
    <div className="wrap legal-page">
      <Link href="/" className="back-link mono">
        ← Back home
      </Link>
      <div className="eyebrow-line mono">Legal</div>
      <h1>Medical Disclaimer</h1>
      <p className="legal-updated mono">Last updated: September 29, 2026</p>

      <h2>Educational use only</h2>
      <p>
        Everything on Alpharbet — drug entries, mechanisms, history, hazards, games, and pricing trends
        — is built for studying pharmacology. None of it is medical advice, and none of it is meant to
        diagnose, treat, cure, or prevent any condition.
      </p>

      <h2>Not a substitute for a professional</h2>
      <p>
        Nothing here replaces the judgment of a licensed doctor, pharmacist, or other healthcare
        provider. If you or someone else needs guidance about an actual medication — dosing, side
        effects, interactions, or anything else — talk to a professional or your pharmacy, not this
        site. Using Alpharbet doesn&apos;t create a doctor-patient (or pharmacist-patient) relationship of
        any kind.
      </p>

      <h2>Data may be incomplete or out of date</h2>
      <p>
        Hazard information is kept at an informational level, not a clinical one, and pricing data
        reflects a snapshot in time from public sources — it won&apos;t match what you&apos;d pay at a specific
        pharmacy today. Always check current, authoritative sources (like a pharmacist or your
        prescribing information) before making any real decision involving medication.
      </p>

      <h2>In an emergency</h2>
      <p>
        If you think someone has taken too much of a medication, is having a severe reaction, or is in
        any medical emergency, contact emergency services or a poison control center immediately —
        don&apos;t look for that information here.
      </p>

      <h2>Questions</h2>
      <p>
        Questions about this disclaimer: <a href="mailto:matthewkaturamu2@gmail.com">matthewkaturamu2@gmail.com</a>
      </p>
    </div>
  );
}
