import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import MoleculeBackground from "./molecule-background";

export const metadata: Metadata = {
  title: "Alpharbet — The A–Z of drugs, made to stick",
};

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
