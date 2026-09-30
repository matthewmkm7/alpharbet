import type { MetadataRoute } from "next";
import { drugs } from "@/data/drugs";
import { illnesses } from "@/data/illnesses";

// Tells search engines every page that exists on the site so they can crawl
// and index it. This matters for monetization because both AdSense approval
// and affiliate clicks depend on organic (search-engine) traffic finding
// these pages at all — a site with no sitemap can still get indexed
// eventually, but a lot slower and less completely.
//
// Set NEXT_PUBLIC_SITE_URL once the site has a real domain (see
// .env.local.example) — until then this falls back to a placeholder so the
// build doesn't break, but the URLs in the sitemap won't be real yet.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alpharbet.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/entries`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/illnesses`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/history`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/games`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/games/solitaire`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/games/poker`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/trends`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/tools`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const entryPages: MetadataRoute.Sitemap = drugs.flatMap((drug) => [
    { url: `${SITE_URL}/entries/${drug.slug}`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/entries/${drug.slug}/history`, changeFrequency: "yearly", priority: 0.5 },
  ]);

  const illnessPages: MetadataRoute.Sitemap = illnesses.map((illness) => ({
    url: `${SITE_URL}/illnesses/${illness.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...entryPages, ...illnessPages];
}
