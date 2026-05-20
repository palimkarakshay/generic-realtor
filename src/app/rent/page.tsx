import type { Metadata } from "next";
import Link from "next/link";
import { ListingsGrid } from "@/components/listings/listings-grid";
import { RentAffordabilityCalculator } from "@/components/calculators/rent-affordability";
import { PageHero } from "@/components/layout/page-hero";
import { activeRentListings } from "@/lib/listings";
import { siteConfig } from "@/lib/site-config";
import { pollinationsImage } from "@/lib/utils";

const heroImage = pollinationsImage(
  "Quiet Uptown Waterloo Ontario apartment building exterior with mature trees, brick facade, afternoon daylight, residential street, photograph",
  { seed: 202, width: 1800, height: 600 },
);

export const metadata: Metadata = {
  title: "Renting in Kitchener-Waterloo",
  description:
    "Rental listings in Kitchener, Waterloo, and Cambridge with the lease terms, utilities, and pet policies up front. Plus the Ontario tenant rules you actually need to know.",
};

export default function RentPage() {
  return (
    <>
      <PageHero src={heroImage} alt="Apartment building exterior in Uptown Waterloo" />
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24">
          <p className="text-caption text-accent-deep">For renters</p>
          <h1 className="mt-3 font-display text-display-xl text-ink">
            Renting in Kitchener-Waterloo
          </h1>
          <p className="mt-6 max-w-prose text-body-lg text-ink-soft">
            A rental should disclose what it costs, what utilities you&apos;ll pay on top, and
            what the landlord&apos;s pet policy is — before you fill out a form. The listings
            below try to do that.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8" aria-labelledby="rent-listings">
        <h2 id="rent-listings" className="text-display-lg text-ink">
          Current rentals
        </h2>
        <div className="mt-8">
          <ListingsGrid
            listings={activeRentListings}
            emptyMessage={
              <>
                No active rentals right now. I can keep an ear out for what you&apos;re looking
                for — KW rentals move fast and most don&apos;t even reach a public listing.
              </>
            }
          />
        </div>
      </section>

      <section className="bg-canvas-elevated">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="text-display-lg text-ink">Can you afford it?</h2>
          <p className="mt-2 max-w-prose text-body text-ink-soft">
            The 30%-of-gross-income rule, made visible. Most KW landlords screen for this before
            anything else.
          </p>
          <div className="mt-8">
            <RentAffordabilityCalculator />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h2 className="text-display-lg text-ink">Ontario renter basics</h2>
        <p className="mt-2 text-body text-ink-soft">
          Things to know before you sign a lease in Ontario.
        </p>
        <ul className="mt-6 space-y-5 text-body text-ink-soft">
          <li>
            <strong className="text-ink">First and last month&apos;s rent is the only legal deposit.</strong>{" "}
            Security deposits, pet deposits, &quot;cleaning fees&quot; — none of those are legal in
            Ontario. A landlord asking for one is a red flag.
          </li>
          <li>
            <strong className="text-ink">Pets — landlords cannot ban them in a signed lease.</strong>{" "}
            They can refuse you before you sign. After signing, a no-pets clause is unenforceable
            (with limited exceptions). This is in the Residential Tenancies Act.
          </li>
          <li>
            <strong className="text-ink">Rent increases are capped (in most buildings).</strong>{" "}
            For units occupied before Nov 15, 2018, the annual rent-increase guideline (set
            yearly by the province) is the maximum. Newer units are not capped.
          </li>
          <li>
            <strong className="text-ink">The Landlord and Tenant Board (LTB)</strong> is where
            both sides go when things break down. Knowing it exists matters.
          </li>
          <li>
            <strong className="text-ink">Use the Ontario Standard Lease.</strong> It&apos;s the
            government-issued form. If a landlord won&apos;t use it, ask why.
          </li>
        </ul>
        <p className="mt-6 text-caption text-muted">
          This is general information, not legal advice. For specifics talk to a paralegal or
          consult <a href="https://tribunalsontario.ca/ltb/" className="underline">tribunalsontario.ca/ltb</a>.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="text-display-lg text-ink">Neighborhoods to consider</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {siteConfig.neighborhoods.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/neighborhoods/${n.slug}`}
                className="block rounded-md border border-border-subtle bg-canvas-elevated px-4 py-3 text-body-sm text-ink-soft transition hover:border-accent hover:text-accent-deep"
              >
                {n.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="rounded-lg border border-border-subtle bg-canvas-elevated p-8 text-center">
          <h2 className="font-display text-display-md text-ink">
            Looking for something specific?
          </h2>
          <p className="mt-3 text-body text-ink-soft">
            Send me what you&apos;re looking for — budget, neighborhood, pets, move-in date — and
            I&apos;ll let you know when something fits.
          </p>
          <Link
            href="/contact?intent=renting"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
          >
            Send me your wishlist
          </Link>
        </div>
      </section>
    </>
  );
}
