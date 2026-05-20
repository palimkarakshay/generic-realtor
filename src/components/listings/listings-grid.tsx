import Link from "next/link";
import { ListingCard } from "@/components/listings/listing-card";
import { type Listing } from "@/lib/schemas";

export function ListingsGrid({
  listings,
  emptyMessage,
}: {
  listings: Listing[];
  emptyMessage: React.ReactNode;
}) {
  if (listings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-canvas-elevated p-8 text-center">
        <p className="text-body text-ink-soft">{emptyMessage}</p>
        <Link
          href="/contact"
          className="mt-4 inline-block text-body-sm text-ink underline hover:text-accent-deep"
        >
          Tell me what you&apos;re looking for →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <ListingCard key={l.slug} listing={l} />
      ))}
    </div>
  );
}
