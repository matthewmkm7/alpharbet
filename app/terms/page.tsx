import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Alpharbet",
};

export default function TermsPage() {
  return (
    <div className="wrap legal-page">
      <Link href="/" className="back-link mono">
        ← Back home
      </Link>
      <div className="eyebrow-line mono">Legal</div>
      <h1>Terms of Service</h1>
      <p className="legal-updated mono">Last updated: September 29, 2026</p>

      <h2>Using Alpharbet</h2>
      <p>
        By using this site, you agree to these terms. Alpharbet is a reference and game platform for
        pharmacology, open to anyone — healthcare professionals, students, and the general public.
        It is not medical advice; see the <Link href="/disclaimer">Medical Disclaimer</Link> for what
        that means.
      </p>

      <h2>Accuracy of information</h2>
      <p>
        Chemical, historical, and pricing data on this site is sourced from places like PubChem and
        public government pricing datasets, and is provided &quot;as is.&quot; We work to keep it correct, but
        drug information changes, and errors are possible. Don&apos;t rely on this site as your only source
        for anything clinical — verify against current, professional references.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Don&apos;t scrape, mass-download, or automate requests against the site in a way that disrupts it.</li>
        <li>Don&apos;t use the site&apos;s content or games to make real medical, prescribing, or dosing decisions.</li>
        <li>Don&apos;t attempt to misuse the pharmacy finder or other tools to target or harm a specific person.</li>
      </ul>

      <h2>Ownership</h2>
      <p>
        The Alpharbet name, design, and game mechanics belong to Alpharbet. Underlying chemical data is
        sourced from public databases such as PubChem, which remain the property of their original
        providers.
      </p>

      <h2>No warranty, limited liability</h2>
      <p>
        Alpharbet is provided without warranties of any kind. To the extent the law allows, Alpharbet
        and its creator aren&apos;t liable for damages arising from your use of the site, including
        decisions made based on its content.
      </p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms as the site grows. Continued use after a change means you accept it.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href="mailto:matthewkaturamu2@gmail.com">matthewkaturamu2@gmail.com</a>
      </p>
    </div>
  );
}
