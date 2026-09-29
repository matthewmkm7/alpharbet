"use client";

import { useState } from "react";
import Link from "next/link";

type PharmacyResult = {
  name: string;
  address: string;
  rating: number | null;
  isOpenNow: boolean | null;
  mapsUrl: string;
};

type SearchState =
  | { status: "idle" }
  | { status: "locating" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; results: PharmacyResult[] };

// Set at build time from NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY — this one is
// meant to be public (it's restricted by HTTP referrer in Google Cloud
// Console instead), unlike the server-only GOOGLE_PLACES_API_KEY used above.
const MAPS_EMBED_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

export default function ToolsPage() {
  const [state, setState] = useState<SearchState>({ status: "idle" });
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  function findNearby() {
    if (!("geolocation" in navigator)) {
      setState({ status: "error", message: "Your browser doesn't support location lookup." });
      return;
    }
    setState({ status: "locating" });
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setState({ status: "loading" });
        try {
          const res = await fetch(`/api/pharmacy-search?lat=${latitude}&lng=${longitude}`);
          const data = await res.json();
          if (!res.ok) {
            setState({ status: "error", message: data.error ?? "Search failed." });
            return;
          }
          setState({ status: "done", results: data.results });
        } catch {
          setState({ status: "error", message: "Something went wrong reaching the search service." });
        }
      },
      () => {
        setState({ status: "error", message: "Location access was denied — allow it in your browser to find pharmacies nearby." });
      }
    );
  }

  return (
    <div className="tools-page">
      <div className="wrap">
        <div className="eyebrow-line mono">Tools</div>
        <h1>Find a pharmacy near you.</h1>
        <p className="solitaire-hint">
          Uses your browser's location, once you allow it — nothing is stored or sent anywhere else.
        </p>

        <button type="button" className="btn-primary" onClick={findNearby} disabled={state.status === "locating" || state.status === "loading"}>
          {state.status === "locating"
            ? "Getting your location…"
            : state.status === "loading"
              ? "Searching…"
              : "Find pharmacies near me"}
        </button>

        {state.status === "error" && <p className="tools-error">{state.message}</p>}

        {coords && (
          <div className="tools-map">
            {MAPS_EMBED_KEY ? (
              <iframe
                className="tools-map-frame"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of nearby pharmacies"
                src={`https://www.google.com/maps/embed/v1/search?key=${MAPS_EMBED_KEY}&q=pharmacy&center=${coords.lat},${coords.lng}&zoom=14`}
              />
            ) : (
              <p className="tools-map-missing">
                Map view isn&apos;t set up yet — the site owner needs to add a Google Maps Embed API
                key (see .env.local.example). The list below still works.
              </p>
            )}
          </div>
        )}

        {state.status === "done" && (
          <div className="tools-results">
            {state.results.length === 0 ? (
              <p style={{ color: "var(--text-dim)" }}>No pharmacies found nearby.</p>
            ) : (
              state.results.map((place) => (
                <a href={place.mapsUrl} target="_blank" rel="noreferrer" className="tools-result-card" key={place.name + place.address}>
                  <div className="tools-result-name">{place.name}</div>
                  <div className="tools-result-address">{place.address}</div>
                  <div className="tools-result-meta mono">
                    {place.rating !== null && <span>★ {place.rating}</span>}
                    {place.isOpenNow !== null && (
                      <span className={place.isOpenNow ? "is-open" : "is-closed"}>
                        {place.isOpenNow ? "Open now" : "Closed now"}
                      </span>
                    )}
                  </div>
                </a>
              ))
            )}
          </div>
        )}

        <p style={{ marginTop: 32 }}>
          <Link href="/" className="back-link mono">
            ← Back home
          </Link>
        </p>
      </div>
    </div>
  );
}
