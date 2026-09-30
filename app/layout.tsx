import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import MoleculeBackground from "./molecule-background";

// Set once the site has a real domain (see .env.local.example) — search
// engines and link previews (Slack, iMessage, Twitter/X) use this to turn a
// relative path into a real, shareable URL. Falls back to a placeholder so
// the build never breaks, but previews/sitemap won't be fully correct until
// it's set to the real domain.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alpharbet.example.com";
const SITE_TITLE = "Alpharbet — The A–Z of drugs, made to stick";
const SITE_DESCRIPTION =
  "An A–Z reference for drugs and pharmaceutical compounds — real chemical structures, mechanism-of-action breakdowns, and pricing data, wrapped in interactive games. For healthcare professionals, students, and anyone curious how drugs actually work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s · Alpharbet" },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Alpharbet",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Only loads if NEXT_PUBLIC_ADSENSE_CLIENT_ID is set in Vercel — see
// .env.local.example. Until then this renders nothing, same "degrade
// gracefully with no key" pattern as the Tools page's Google API keys.
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- intentional: App Router root layout is the documented place for this */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <MoleculeBackground />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
