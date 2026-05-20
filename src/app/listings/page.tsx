import type { Metadata } from "next";
import Link from "next/link";
import { ListingCard } from "@/components/listings/listing-card";
import {
  activeSaleListings,
  activeRentListings,
  soldListings,
  leasedListings,
} from "@/lib/listings";

export const metadata: Metadata = {
  title: "All listings",
  description: "Everything currently on the market and recently sold/leased in Kitchener-Waterloo.",
};

export default function ListingsIndexPage() {
  const showRecentlySold = soldListings.length > 0;
  const showRecentlyLeased = leasedListings.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <header className="max-w-3xl">
        <h1 className="font-display text-display-xl text-ink">Listings</h1>
        <p className="mt-4 text-body-lg text-ink-soft">
          What&apos;s on the market right now. For-sale and for-rent are listed side by side so
          you can compare — use the section headers if you only want one.
        </p>
      </header>

      <Section
        id="for-sale"
        heading="For sale"
        items={activeSaleListings}
        empty="No active for-sale listings right now."
      />

      <Section
        id="for-rent"
        heading="For rent"
        items={activeRentListings}
        empty="No active rentals right now."
      />

      {showRecentlySold ? (
        <Section id="recently-sold" heading="Recently sold" items={soldListings} empty="" />
      ) : null}

      {showRecentlyLeased ? (
        <Section
          id="recently-leased"
          heading="Recently leased"
          items={leasedListings}
          empty=""
        />
      ) : null}

      {!showRecentlySold && !showRecentlyLeased ? (
        <section className="mt-16 rounded-lg border border-dashed border-border-subtle p-6 text-body-sm text-muted">
          A &quot;recently sold&quot; and &quot;recently leased&quot; showcase will appear here once I&apos;ve closed
          deals. For a brand-new realtor, an empty section says more than a manufactured one.
        </section>
      ) : null}
    </div>
  );
}

function Section({
  id,
  heading,
  items,
  empty,
}: {
  id: string;
  heading: string;
  items: Parameters<typeof ListingCard>[0]["listing"][];
  empty: string;
}) {
  return (
    <section id={id} className="mt-16">
      <h2 className="text-display-lg text-ink">{heading}</h2>
      {items.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((l) => (
            <ListingCard key={l.slug} listing={l} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-body text-ink-soft">
          {empty}{" "}
          <Link href="/contact" className="underline">
            Tell me what you&apos;re looking for →
          </Link>
        </p>
      )}
    </section>
  );
}
