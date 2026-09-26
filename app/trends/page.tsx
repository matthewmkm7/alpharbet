import { drugs } from "@/data/drugs";
import TrendsClient from "./trends-client";

export default async function TrendsPage({
  searchParams,
}: {
  searchParams: Promise<{ drug?: string }>;
}) {
  const { drug } = await searchParams;
  const initialSlug = drugs.find((d) => d.slug === drug)?.slug ?? drugs[0].slug;
  return <TrendsClient initialSlug={initialSlug} />;
}
