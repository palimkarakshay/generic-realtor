import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { OpenHouseCalendar } from "@/components/open-houses/open-house-calendar";
import type { MultiMapMarker } from "@/components/open-houses/leaflet-multi-map";
import { upcomingOpenHouseInstances } from "@/lib/listings";
import { siteConfig } from "@/lib/site-config";
import { formatCAD, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Open houses in Kitchener-Waterloo",
  description: `Upcoming open houses with ${siteConfig.realtor.name}. Calendar + map of every visit on the schedule.`,
};

const OpenHouseMap = dynamic(
  () => import("@/components/open-houses/open-house-map").then((m) => m.OpenHouseMap),
  {
    loading: () => (
      <div className="flex h-[460px] w-full items-center justify-center bg-parchment text-muted">
        <span className="text-caption">Loading map…</span>
      </div>
    ),
  },
);

export default function OpenHousesPage() {
  const instances = upcomingOpenHouseInstances();

  const markers: MultiMapMarker[] = instances
    .filter((i) => i.listing.lat !== undefined && i.listing.lng !== undefined)
    .map((i) => ({
      lat: i.listing.lat!,
      lng: i.listing.lng!,
      slug: i.listing.slug,
      title: i.listing.title,
      address: `${i.listing.address}, ${i.listing.city}`,
      price:
        i.listing.listingType === "sale"
          ? formatCAD(i.listing.price)
          : `${formatCAD(i.listing.monthlyRent)}/mo`,
      when: `${formatDate(i.open.date, { weekday: "short", month: "short", day: "numeric" })} · ${i.open.startTime}–${i.open.endTime}`,
    }));

  return (
    <article>
      <section className="bg-ink text-canvas">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <p className="text-caption uppercase text-accent">Visit in person</p>
          <h1 className="mt-3 font-display text-display-xl text-canvas md:text-display-2xl">
            Open houses
          </h1>
          <p className="mt-4 max-w-prose text-body-lg text-canvas/85">
            Every upcoming open house on the schedule. No appointment needed — drop in, look around,
            ask questions.
          </p>
        </div>
      </section>

      {instances.length === 0 ? (
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <h2 className="text-display-md text-ink">Nothing scheduled this week</h2>
          <p className="mt-3 max-w-prose text-body-lg text-ink-soft">
            New open houses get posted as listings firm up. For now, private showings are available
            for anything on the{" "}
            <Link href="/listings" className="underline">
              listings page
            </Link>
            .
          </p>
        </section>
      ) : (
        <>
          {markers.length > 0 ? (
            <section className="border-b border-border-subtle">
              <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
                <h2 className="text-display-md text-ink">Map view</h2>
                <p className="mt-2 text-body text-ink-soft">
                  {markers.length} pin{markers.length === 1 ? "" : "s"} across {siteConfig.realtor.serviceAreas.slice(0, 3).join(" · ")}.
                </p>
                <div className="mt-6 overflow-hidden rounded-lg border border-border-subtle">
                  <OpenHouseMap markers={markers} />
                </div>
              </div>
            </section>
          ) : null}

          <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="text-display-md text-ink">The schedule</h2>
            <p className="mt-2 text-body text-ink-soft">
              Grouped by day. Use &quot;Add to calendar&quot; to drop a visit into your phone.
            </p>
            <div className="mt-10">
              <OpenHouseCalendar instances={instances} />
            </div>
          </section>
        </>
      )}
    </article>
  );
}
