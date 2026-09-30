import { sponsors } from "@/data/sponsors";

// The display half of the institution/company-listing revenue stream — the
// sales side (finding a partner, agreeing a price) happens over email via
// /partners, not in code. Renders nothing until data/sponsors.ts has at
// least one entry, same degrade-gracefully pattern as every other
// monetization piece on the site. Shown clearly labeled "Sponsored" (not
// mixed in with the site's own recommendations) and every sponsor listed
// gets shown, since there will only ever be a handful at a time.
export default function SponsorSpot() {
  if (sponsors.length === 0) return null;
  return (
    <div className="entry-side-card sponsor-spot">
      <div className="eyebrow-line mono">Sponsored</div>
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="sponsor-item">
          <p>{sponsor.tagline}</p>
          <a href={sponsor.url} target="_blank" rel="noreferrer sponsored" className="btn-primary btn-link">
            {sponsor.name}
          </a>
        </div>
      ))}
    </div>
  );
}
