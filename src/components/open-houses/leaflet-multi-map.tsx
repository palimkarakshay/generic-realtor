"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const inlineIcon = L.divIcon({
  className: "leaflet-inline-icon",
  html: `<svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.27 0 0 6.05 0 13.52 0 23.69 14 40 14 40s14-16.31 14-26.48C28 6.05 21.73 0 14 0z" fill="#0fb39a"/>
    <circle cx="14" cy="13.5" r="5" fill="#ffffff"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -34],
});

export type MultiMapMarker = {
  lat: number;
  lng: number;
  slug: string;
  title: string;
  address: string;
  price: string;
  when: string;
};

export function LeafletMultiMap({ markers }: { markers: MultiMapMarker[] }) {
  if (markers.length === 0) return null;

  const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]));
  // Single-marker fallback: bounds.pad doesn't expand a single point, so we
  // give Leaflet a sensible default zoom in that case via fallbackCenter.
  const single = markers.length === 1 ? markers[0] : null;

  return (
    <MapContainer
      bounds={single ? undefined : bounds.pad(0.2)}
      center={single ? [single.lat, single.lng] : undefined}
      zoom={single ? 13 : undefined}
      scrollWheelZoom={false}
      style={{ height: 460, width: "100%" }}
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => (
        <Marker key={`${m.slug}-${m.when}`} position={[m.lat, m.lng]} icon={inlineIcon}>
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong>{m.price}</strong>
              <br />
              {m.address}
              <br />
              <small>{m.when}</small>
              <br />
              <a href={`/listings/${m.slug}`}>View listing →</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
