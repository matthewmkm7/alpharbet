import type { Metadata } from "next";
import { drugs } from "@/data/drugs";
import TrendsClient from "./trends-client";

export const metadata: Metadata = {
  title: "Drug Pricing Trends",
  description:
    "Real, cited NADAC pricing data on prescription drugs — see how prices have shifted over time and calculate purchasing costs.",
};

export default async function TrendsPage({
  searchParams,
}: {
  searchParams: Promise<{ drug?: string }>;
}) {
  const { drug } = await searchParams;
  const initialSlug = drugs.find((d) => d.slug === drug)?.slug ?? drugs[0].slug;
  return <TrendsClient initialSlug={initialSlug} />;
}
