import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allListings, getListingBySlug, getRelatedListings } from "@/lib/listings";
import { MortgageCalculator } from "@/components/calculators/mortgage-calculator";
import { ListingCard } from "@/components/listings/listing-card";
import { ListingMap } from "@/components/maps/listing-map";
import { JsonLd } from "@/components/layout/jsonld";
import { breadcrumbLD, listingLD } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site-config";
import { formatCAD, formatNumber, daysSince } from "@/lib/utils";
import { SmartImage } from "@/components/ui/smart-image";

export async function generateStaticParams() {
  return allListings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return { title: "Listing not found" };

  const price =
    listing.listingType === "sale"
      ? formatCAD(listing.price)
      : `${formatCAD(listing.monthlyRent)}/mo`;

  return {
    title: `${listing.address} — ${price}`,
    description: listing.description.slice(0, 160),
    openGraph: {
      title: `${listing.address} — ${price}`,
      description: listing.description.slice(0, 200),
      images: listing.photos.length > 0 ? [{ url: listing.photos[0].src }] : undefined,
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const related = getRelatedListings(slug);
  const dom = listing.listedAt ? daysSince(listing.listedAt) : null;
  const isSale = listing.listingType === "sale";

  return (
    <article className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-16">
      <JsonLd data={listingLD(listing)} />
      <JsonLd
        data={breadcrumbLD([
          { name: "Home", url: siteConfig.site.url },
          { name: "Listings", url: `${siteConfig.site.url}/listings` },
          { name: listing.address, url: `${siteConfig.site.url}/listings/${listing.slug}` },
        ])}
      />
      {/* Photo strip */}
      <div className="grid gap-2 overflow-hidden rounded-lg md:grid-cols-3">
        {listing.photos.slice(0, 3).map((p, i) => (
          <SmartImage
            key={i}
            src={p.src}
            alt={p.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={
              i === 0
                ? "aspect-[4/3] w-full object-cover md:col-span-2 md:aspect-auto"
                : "aspect-[4/3] w-full object-cover"
            }
          />
        ))}
        {listing.photos.length === 0 ? (
          <div className="flex aspect-[16/9] w-full items-center justify-center bg-parchment text-muted md:col-span-3">
            <span className="text-caption">Photos coming soon</span>
          </div>
        ) : null}
      </div>

      {/* Header */}
      <header className="mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-caption text-accent-deep">
            {isSale ? "For sale" : "For rent"}
            {listing.status !== "active" ? ` · ${listing.status.toUpperCase()}` : ""}
            {dom !== null && dom > 0 ? ` · ${dom} days on market` : ""}
          </p>
          <h1 className="mt-2 font-display text-display-xl text-ink">{listing.address}</h1>
          <p className="mt-1 text-body-lg text-ink-soft">
            {listing.city}, {listing.province}
            {listing.postalCode ? ` ${listing.postalCode}` : ""}
          </p>
          <p className="mt-6 font-display text-display-xl text-accent-deep">
            {isSale ? formatCAD(listing.price) : `${formatCAD(listing.monthlyRent)}/mo`}
          </p>
        </div>

        <aside className="rounded-lg border border-border-subtle bg-canvas-elevated p-6">
          <p className="text-caption text-muted">Interested?</p>
          <p className="mt-2 text-body-sm text-ink-soft">
            Send a note and I&apos;ll get back same day with answers and to schedule a showing.
          </p>
          <Link
            href={`/contact?intent=listing-inquiry&listing=${listing.slug}`}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
          >
            {isSale ? "Book a showing" : "Apply / inquire"}
          </Link>
          <a
            href={`tel:${siteConfig.realtor.phone}`}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink px-5 py-3 text-sm text-ink transition hover:border-accent-deep hover:text-accent-deep"
          >
            Call {siteConfig.realtor.phone}
          </a>
        </aside>
      </header>

      {/* Facts strip — adapts to listing type */}
      <section className="mt-10 grid grid-cols-2 gap-4 rounded-lg border border-border-subtle bg-canvas-elevated p-6 sm:grid-cols-4">
        <Fact label="Bedrooms" value={String(listing.beds)} />
        <Fact label="Bathrooms" value={String(listing.baths)} />
        {listing.sqft ? <Fact label="Interior sqft" value={formatNumber(listing.sqft)} /> : null}
        <Fact
          label="Property type"
          value={listing.propertyType.replace("-", " ")}
          capitalize
        />

        {isSale ? (
          <>
            {listing.lotSizeSqft ? (
              <Fact label="Lot size" value={`${formatNumber(listing.lotSizeSqft)} sqft`} />
            ) : null}
            {listing.yearBuilt ? <Fact label="Year built" value={String(listing.yearBuilt)} /> : null}
          </>
        ) : (
          <>
            <Fact label="Lease term" value={listing.leaseTerm.replace("-", " ")} capitalize />
            <Fact label="Furnished" value={listing.furnished} capitalize />
            <Fact label="Pets" value={listing.petsAllowed.replace("-", " ")} capitalize />
            <Fact label="Parking" value={listing.parkingIncluded ? "Included" : "Not included"} />
            {listing.availableFrom ? (
              <Fact label="Available from" value={listing.availableFrom} />
            ) : null}
          </>
        )}
      </section>

      {/* Description */}
      <section className="mt-12 max-w-prose">
        <h2 className="text-display-md text-ink">About this {isSale ? "home" : "rental"}</h2>
        <p className="mt-4 text-body-lg text-ink-soft">{listing.description}</p>

        {listing.features.length > 0 ? (
          <>
            <h3 className="mt-10 font-display text-display-sm text-ink">Features</h3>
            <ul className="mt-4 grid list-disc gap-1 pl-5 text-body text-ink-soft sm:grid-cols-2">
              {listing.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </>
        ) : null}

        {!isSale ? (
          <>
            <h3 className="mt-10 font-display text-display-sm text-ink">Utilities</h3>
            <p className="mt-3 text-body text-ink-soft">
              {listing.utilitiesIncluded.includes("none")
                ? "Tenant pays all utilities."
                : `Included: ${listing.utilitiesIncluded.join(", ")}.`}
            </p>
            <p className="mt-4 text-caption text-muted">
              This listing is governed by the Ontario Residential Tenancies Act and uses the
              Ontario Standard Lease. See <Link href="/rent" className="underline">renter basics</Link>{" "}
              for what to expect.
            </p>
          </>
        ) : null}
      </section>

      {/* Map */}
      {listing.lat !== undefined && listing.lng !== undefined ? (
        <section className="mt-12">
          <h2 className="text-display-md text-ink">Where it is</h2>
          <div className="mt-4 overflow-hidden rounded-lg border border-border-subtle">
            <ListingMap lat={listing.lat} lng={listing.lng} label={listing.address} />
          </div>
        </section>
      ) : null}

      {/* Mortgage calc for sale listings */}
      {isSale ? (
        <section className="mt-12">
          <h2 className="text-display-md text-ink">Run the numbers</h2>
          <div className="mt-4">
            <MortgageCalculator defaultPrice={listing.price} />
          </div>
        </section>
      ) : null}

      {/* Related */}
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="text-display-md text-ink">Other {isSale ? "homes" : "rentals"} on the market</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <ListingCard key={r.slug} listing={r} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Brokerage disclosure */}
      <p className="mt-16 text-caption text-muted">
        Listing brokerage: {listing.brokerage ?? siteConfig.brokerage.name}. RECO #
        {siteConfig.brokerage.recoNumber}. Information believed accurate; verify directly before
        making any decision.
      </p>
    </article>
  );
}

function Fact({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div>
      <dt className="text-caption text-muted">{label}</dt>
      <dd
        className={
          "mt-1 font-display text-body-lg text-ink" + (capitalize ? " capitalize" : "")
        }
      >
        {value}
      </dd>
    </div>
  );
}
