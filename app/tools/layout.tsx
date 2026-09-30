import type { Metadata } from "next";
import type { ReactNode } from "react";

// tools/page.tsx is a client component ("use client", for the geolocation
// button), and a client component can't export `metadata` itself — this
// sibling layout is the standard Next.js way to give that route its own
// title/description anyway.
export const metadata: Metadata = {
  title: "Find a Pharmacy",
  description: "Find pharmacies and professionals near you.",
};

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return children;
}
