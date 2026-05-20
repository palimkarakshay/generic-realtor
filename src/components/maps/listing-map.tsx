"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./leaflet-map").then((m) => m.LeafletMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] w-full items-center justify-center bg-parchment text-muted">
      <span className="text-caption">Loading map…</span>
    </div>
  ),
});

export function ListingMap(props: { lat: number; lng: number; label?: string }) {
  return <LeafletMap {...props} />;
}
