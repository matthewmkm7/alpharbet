import type { Metadata } from "next";
import Link from "next/link";
import { drugs } from "@/data/drugs";

export const metadata: Metadata = {
  title: "Partner With Alpharbet",
  description:
    "Sponsor a listing on Alpharbet, seen by pharmacy, nursing, and pre-med students studying with the site.",
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
        <div className="practical-name">A sponsored listing in front of students actually studying this material.</div>
      </div>

      <div className="entry-grid">
        <div className="entry-main">
          <section className="entry-block">
            <div className="eyebrow-line mono">Who sees it</div>
            <p>
              Alpharbet is a study reference covering {drugs.length} drugs, used by pharmacy, nursing, and
              pre-med students who are actively studying drug mechanisms, drug classes, and pharmacology —
              not casual browsers. A listing reaches people in study mode, on the exact pages about the
              subject matter your program or product relates to.
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
              Nursing and pharmacy programs recruiting students, NCLEX/PANCE/NAPLEX test-prep companies,
              tutoring services, study-tool platforms, and scrubs or equipment brands aimed at students
              entering the field.
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
