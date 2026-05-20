"use client";

import dynamic from "next/dynamic";
import type { MultiMapMarker } from "./leaflet-multi-map";

const LeafletMultiMap = dynamic(
  () => import("./leaflet-multi-map").then((m) => m.LeafletMultiMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[460px] w-full items-center justify-center bg-parchment text-muted">
        <span className="text-caption">Loading map…</span>
      </div>
    ),
  },
);

export function OpenHouseMap({ markers }: { markers: MultiMapMarker[] }) {
  return <LeafletMultiMap markers={markers} />;
}
