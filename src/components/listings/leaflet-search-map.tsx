"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import type { Listing } from "@/lib/schemas";
import { formatCAD } from "@/lib/utils";

const tealPin = L.divIcon({
  className: "leaflet-inline-icon",
  html: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.27 0 0 6.05 0 13.52 0 23.69 14 40 14 40s14-16.31 14-26.48C28 6.05 21.73 0 14 0z" fill="#0fb39a"/>
    <circle cx="14" cy="13.5" r="5" fill="#ffffff"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -34],
});

const coralPin = L.divIcon({
  className: "leaflet-inline-icon",
  html: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.27 0 0 6.05 0 13.52 0 23.69 14 40 14 40s14-16.31 14-26.48C28 6.05 21.73 0 14 0z" fill="#ff6b4a"/>
    <circle cx="14" cy="13.5" r="5" fill="#ffffff"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -34],
});

const KW_CENTER: [number, number] = [43.46, -80.5];

function FitToMarkers({ listings }: { listings: Listing[] }) {
  const map = useMap();
  useEffect(() => {
    const valid = listings.filter((l) => l.lat !== undefined && l.lng !== undefined);
    if (valid.length === 0) {
      map.setView(KW_CENTER, 11);
      return;
    }
    if (valid.length === 1) {
      map.setView([valid[0].lat!, valid[0].lng!], 13);
      return;
    }
    const bounds = L.latLngBounds(
      valid.map((l) => [l.lat!, l.lng!] as [number, number]),
    );
    map.fitBounds(bounds.pad(0.2));
  }, [map, listings]);
  return null;
}

export function LeafletSearchMap({
  listings,
  height = 520,
}: {
  listings: Listing[];
  height?: number;
}) {
  return (
    <MapContainer
      center={KW_CENTER}
      zoom={11}
      scrollWheelZoom={false}
      style={{ height, width: "100%" }}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToMarkers listings={listings} />
      {listings
        .filter((l) => l.lat !== undefined && l.lng !== undefined)
        .map((l) => {
          const isSale = l.listingType === "sale";
          const price = isSale
            ? formatCAD(l.price)
            : `${formatCAD(l.monthlyRent)}/mo`;
          return (
            <Marker
              key={l.slug}
              position={[l.lat!, l.lng!]}
              icon={isSale ? tealPin : coralPin}
            >
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <strong>{price}</strong>
                  <br />
                  {l.address}, {l.city}
                  <br />
                  <small>
                    {l.beds} bd · {l.baths} ba
                    {l.sqft ? ` · ${l.sqft.toLocaleString()} sqft` : ""}
                  </small>
                  <br />
                  <a href={`/listings/${l.slug}`}>View listing →</a>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
}
