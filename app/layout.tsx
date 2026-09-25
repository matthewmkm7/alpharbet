import type { Metadata } from "next";
import "./globals.css";
import IndexStrip from "./index-strip";

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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <IndexStrip />
        {children}
      </body>
    </html>
  );
}
