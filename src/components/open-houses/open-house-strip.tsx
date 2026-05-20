import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { listingsWithUpcomingOpenHouses } from "@/lib/listings";
import { formatCAD, formatDate } from "@/lib/utils";

export function OpenHouseStrip({ limit = 4 }: { limit?: number } = {}) {
  const items = listingsWithUpcomingOpenHouses().slice(0, limit);
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="open-houses-strip" className="bg-moss/5">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="text-caption uppercase text-moss">Open houses</p>
            <h2 id="open-houses-strip" className="mt-2 text-display-lg text-ink">
              Coming up — walk through with me
            </h2>
          </div>
          <Link
            href="/open-houses"
            className="text-body-sm text-ink underline-offset-4 hover:text-accent-deep hover:underline"
          >
            Full calendar + map →
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ listing, next }) => {
            const price =
              listing.listingType === "sale"
                ? formatCAD(listing.price)
                : `${formatCAD(listing.monthlyRent)}/mo`;
            const photo = listing.photos[0];
            return (
              <li key={`${listing.slug}-${next.date}`}>
                <Link
                  href={`/listings/${listing.slug}`}
                  className="group block h-full overflow-hidden rounded-lg border border-border-subtle bg-canvas transition hover:border-moss hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-parchment">
                    {photo ? (
                      <SmartImage
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                      />
                    ) : null}
                    <span className="absolute left-3 top-3 rounded-full bg-moss px-2.5 py-1 text-caption font-medium uppercase text-canvas">
                      {formatDate(next.date, { weekday: "short", month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="font-display text-display-sm text-ink">{price}</p>
                    <p className="mt-1 text-body-sm text-ink-soft">
                      {listing.address}, {listing.city}
                    </p>
                    <p className="mt-2 text-caption uppercase text-muted">
                      {next.startTime}–{next.endTime}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
