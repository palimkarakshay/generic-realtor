import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import type { OpenHouseInstance } from "@/lib/listings";
import { formatCAD, formatDate } from "@/lib/utils";
import { buildOpenHouseICS, icsDataUri } from "@/lib/open-house-ics";

export function OpenHouseCalendar({ instances }: { instances: OpenHouseInstance[] }) {
  if (instances.length === 0) return null;

  const grouped = new Map<string, OpenHouseInstance[]>();
  for (const inst of instances) {
    const key = inst.open.date;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(inst);
  }
  const dates = Array.from(grouped.keys()).sort();

  return (
    <div className="space-y-12">
      {dates.map((date) => {
        const dayInstances = grouped.get(date)!;
        return (
          <section key={date} aria-labelledby={`oh-day-${date}`}>
            <h3
              id={`oh-day-${date}`}
              className="font-display text-display-md text-ink"
            >
              {formatDate(date, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <ul className="mt-5 grid gap-4">
              {dayInstances.map(({ listing, open }) => {
                const price =
                  listing.listingType === "sale"
                    ? formatCAD(listing.price)
                    : `${formatCAD(listing.monthlyRent)}/mo`;
                const photo = listing.photos[0];
                const ics = buildOpenHouseICS({
                  open,
                  uid: `${listing.listingId}-${open.date}-${open.startTime}@rileyavery`,
                  title: listing.title,
                  address: `${listing.address}, ${listing.city}`,
                });
                return (
                  <li
                    key={`${listing.slug}-${open.startTime}`}
                    className="grid gap-4 rounded-lg border border-border-subtle bg-canvas-elevated p-4 sm:grid-cols-[140px_1fr_auto] sm:items-center"
                  >
                    <Link
                      href={`/listings/${listing.slug}`}
                      className="relative block aspect-[4/3] overflow-hidden rounded-md bg-parchment sm:aspect-[4/3]"
                    >
                      {photo ? (
                        <SmartImage
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </Link>
                    <div>
                      <p className="text-caption uppercase text-moss">
                        {open.startTime}–{open.endTime}
                      </p>
                      <Link
                        href={`/listings/${listing.slug}`}
                        className="mt-1 block font-display text-body-lg text-ink hover:text-accent-deep"
                      >
                        {price} · {listing.address}
                      </Link>
                      <p className="text-body-sm text-ink-soft">{listing.city}</p>
                      {open.notes ? (
                        <p className="mt-2 text-body-sm text-muted">{open.notes}</p>
                      ) : null}
                    </div>
                    <a
                      href={icsDataUri(ics)}
                      download={`${listing.slug}-${open.date}.ics`}
                      className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-moss px-4 py-2 text-sm text-moss transition hover:bg-moss hover:text-canvas sm:self-center"
                    >
                      Add to calendar
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
