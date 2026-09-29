import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Alpharbet",
};

export default function PrivacyPage() {
  return (
    <div className="wrap legal-page">
      <Link href="/" className="back-link mono">
        ← Back home
      </Link>
      <div className="eyebrow-line mono">Legal</div>
      <h1>Privacy Policy</h1>
      <p className="legal-updated mono">Last updated: September 29, 2026</p>

      <h2>What this page is</h2>
      <p>
        Alpharbet doesn&apos;t have user accounts, and we don&apos;t run our own tracking or analytics. This
        page explains the few places data does move when you use the site, and where it goes.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Nothing, by default.</strong> Browsing the entries, playing Solitaire or Poker, and
          reading Trends doesn&apos;t send any information about you anywhere.
        </li>
        <li>
          <strong>Your location, only if you use the pharmacy/professional finder (/tools).</strong> Your
          browser asks your permission first. If you allow it, your coordinates are sent directly to
          Google&apos;s Places API to find nearby results — we don&apos;t store your location on our end.
        </li>
        <li>
          <strong>Your light/dark theme choice</strong> is saved in your own browser (localStorage) so it
          stays set next time you visit. It never leaves your device.
        </li>
      </ul>

      <h2>Third-party services we use</h2>
      <p>Some pages call outside services to work. Each handles data under its own privacy policy:</p>
      <ul>
        <li>Google Places API and Google Maps — powers the pharmacy/professional finder.</li>
        <li>PubChem (National Institutes of Health) — supplies chemical structure and formula data.</li>
        <li>Frankfurter (European Central Bank data) and CoinGecko — supply currency conversion rates on Trends.</li>
      </ul>

      <h2>Children&apos;s privacy</h2>
      <p>
        Alpharbet is built for pharmacy, nursing, and pre-med students, and isn&apos;t directed at children.
        We don&apos;t knowingly collect information from anyone under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If what the site collects or how it&apos;s used changes — for example, if we ever add accounts or
        analytics — we&apos;ll update this page and change the date above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <a href="mailto:matthewkaturamu2@gmail.com">matthewkaturamu2@gmail.com</a>
      </p>
    </div>
  );
}
