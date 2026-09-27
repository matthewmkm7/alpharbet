import { NextRequest, NextResponse } from "next/server";

// The Google Places API key lives server-side only (never exposed to the
// browser) — set GOOGLE_PLACES_API_KEY in .env.local. See .env.local.example.
type GooglePlaceResult = {
  place_id: string;
  name: string;
  vicinity?: string;
  rating?: number;
  opening_hours?: { open_now?: boolean };
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Pharmacy search isn't set up yet — the site owner needs to add a Google Places API key." },
      { status: 503 }
    );
  }
  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing location." }, { status: 400 });
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
  url.searchParams.set("location", `${lat},${lng}`);
  url.searchParams.set("radius", "8000"); // ~5 miles
  url.searchParams.set("type", "pharmacy");
  url.searchParams.set("key", apiKey);

  let data: { results?: GooglePlaceResult[]; status?: string; error_message?: string };
  try {
    const res = await fetch(url.toString());
    data = await res.json();
  } catch {
    return NextResponse.json({ error: "Couldn't reach the pharmacy search service." }, { status: 502 });
  }

  if (data.status && data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    return NextResponse.json({ error: data.error_message ?? `Search failed (${data.status}).` }, { status: 502 });
  }

  const results = (data.results ?? []).slice(0, 12).map((place) => ({
    name: place.name,
    address: place.vicinity ?? "Address unavailable",
    rating: place.rating ?? null,
    isOpenNow: place.opening_hours?.open_now ?? null,
    mapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
  }));

  return NextResponse.json({ results });
}
