"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    // 3Dmol.js ships no official TypeScript types, so this stays untyped.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $3Dmol: any;
  }
}

export default function MoleculeViewer({
  cid,
  slug,
  name,
}: {
  cid: number;
  slug: string;
  name: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || !containerRef.current) return;

    let cancelled = false;

    async function loadSdf() {
      // Prefer the locally cached copy (see scripts/fetch-structures.mjs) —
      // falls back to a live PubChem fetch only if that file doesn't exist yet.
      const localRes = await fetch(`/structures/${slug}.sdf`);
      if (localRes.ok) return localRes.text();

      const liveRes = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/SDF/?record_type=3d`
      );
      if (!liveRes.ok) throw new Error("structure fetch failed");
      return liveRes.text();
    }

    async function render() {
      try {
        const sdf = await loadSdf();
        if (cancelled || !containerRef.current) return;

        const viewer = window.$3Dmol.createViewer(containerRef.current, {
          backgroundColor: "#10192E",
        });
        viewer.addModel(sdf, "sdf");
        viewer.setStyle({}, { stick: { radius: 0.15 }, sphere: { scale: 0.25 } });
        viewer.zoomTo();
        viewer.render();
        viewer.spin("y", 0.4);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [scriptReady, cid, slug]);

  return (
    <div className="molecule-viewer-wrap">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.4.2/3Dmol-min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="molecule-viewer" aria-label={`Interactive 3D structure of ${name}`} />
      {status === "loading" && <div className="molecule-viewer-status">Loading structure…</div>}
      {status === "error" && (
        <div className="molecule-viewer-status">
          Couldn&apos;t load the live 3D structure right now.
        </div>
      )}
    </div>
  );
}
