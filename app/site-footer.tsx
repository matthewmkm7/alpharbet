import Link from "next/link";
import { drugs } from "@/data/drugs";

// A persistent, site-wide footer (rendered once from layout.tsx, not per-page)
// so the legal pages are reachable from anywhere on the site — not just the
// homepage, where a one-off footer used to live.
const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function SiteFooter() {
  return (
    <footer>
      <div className="wrap site-footer-inner">
        <div className="site-footer-brand">
          <div>Alpharbet</div>
          <div className="site-footer-meta">
            {drugs.length} entries, A–Z · Educational use only — not medical advice
          </div>
        </div>
        <nav className="site-footer-links">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
