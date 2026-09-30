import type { Metadata } from "next";
import Link from "next/link";
import { drugs } from "@/data/drugs";

export const metadata: Metadata = {
  title: "Partner With Alpharbet",
  description:
    "Sponsor a listing on Alpharbet, an A–Z drug and pharmacology reference reaching healthcare professionals, students, and the general public.",
};

// Set once you have an email you want to receive partnership inquiries at —
// this is a business decision only you should make (which address, whether
// it's a dedicated one), so it isn't hardcoded. Leave blank and the page
// still explains the offer, just without a clickable contact button yet.
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_PARTNERSHIP_EMAIL;

export default function PartnersPage() {
  return (
    <div className="wrap entry-page">
      <Link href="/" className="back-link mono">
        ← Back home
      </Link>

      <div className="entry-header">
        <h1>Partner with Alpharbet.</h1>
        <div className="practical-name">A sponsored listing in front of people actively looking up drug information.</div>
      </div>

      <div className="entry-grid">
        <div className="entry-main">
          <section className="entry-block">
            <div className="eyebrow-line mono">Who sees it</div>
            <p>
              Alpharbet is an A–Z reference covering {drugs.length} drugs — structures, mechanisms, history,
              and pricing — used by healthcare professionals, pharmacy/nursing/pre-health students, and
              members of the general public looking up how a specific drug works. A listing reaches people
              with real intent on the page, not casual scrollers.
            </p>
          </section>

          <section className="entry-block">
            <div className="eyebrow-line mono">What a listing looks like</div>
            <p>
              A clearly labeled &ldquo;Sponsored&rdquo; card with your name, a one-line pitch you write
              yourself, and a link to your site — shown on drug entry pages and the pharmacy-finder tool.
              No ad network, no algorithm, no bidding — a direct placement, disclosed as sponsored, with
              wording you control.
            </p>
          </section>

          <section className="entry-block">
            <div className="eyebrow-line mono">Who this is a fit for</div>
            <p>
              Healthcare education programs and test-prep companies (NCLEX/PANCE/NAPLEX), tutoring and
              study-tool platforms, medical/pharmacy equipment and scrubs brands, telehealth and pharmacy
              services, and health-focused media (podcasts, newsletters, science communicators) reaching
              the same curious, health-literate audience.
            </p>
          </section>

          <section className="entry-block">
            <div className="eyebrow-line mono">How it works</div>
            <p>
              This isn&apos;t a self-serve checkout — reach out, we&apos;ll agree on pricing and placement
              directly, and your listing goes live once that&apos;s settled.
            </p>
            {CONTACT_EMAIL ? (
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Alpharbet%20Partnership`}
                className="btn-primary btn-link"
              >
                Email {CONTACT_EMAIL}
              </a>
            ) : (
              <p style={{ color: "var(--text-dim)" }}>Contact details coming soon.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
