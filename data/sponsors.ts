export type Sponsor = {
  id: string;
  name: string;
  // A one-line pitch the sponsor provides themselves (this is their ad copy,
  // not a claim Alpharbet is making) — e.g. "NCLEX prep built by working RNs."
  tagline: string;
  url: string;
};

// Empty by default — this is the direct-sold institution/company listing
// revenue stream (see /partners for the pitch page to send prospects). It
// earns nothing until you've actually closed a paying deal with someone.
// Once you have, add an object here by hand:
//   { id: "acme-nclex", name: "Acme NCLEX Prep", tagline: "...", url: "https://..." }
// No other code changes needed — SponsorSpot (app/sponsor-spot.tsx) picks
// this up automatically wherever it's placed.
export const sponsors: Sponsor[] = [];
