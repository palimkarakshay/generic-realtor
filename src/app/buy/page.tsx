import type { Metadata } from "next";
import Link from "next/link";
import { ListingsGrid } from "@/components/listings/listings-grid";
import { MortgageCalculator } from "@/components/calculators/mortgage-calculator";
import { LTTCalculator } from "@/components/calculators/ltt-calculator";
import { PageHero } from "@/components/layout/page-hero";
import { activeSaleListings } from "@/lib/listings";
import { siteConfig } from "@/lib/site-config";
import { pollinationsImage } from "@/lib/utils";

const heroImage = pollinationsImage(
  "Cinematic editorial real estate photograph, 35mm film look, warm Kodak Portra color grading, young diverse couple walking up the front steps of a red brick century home in Kitchener Ontario at golden hour, candid moment looking at each other smiling, mature maple trees in the background, shallow depth of field, soft natural lighting, photoreal, no text, no watermark, no logo",
  { seed: 2011, width: 1800, height: 720, model: "flux" },
);

export const metadata: Metadata = {
  title: "Buying in Kitchener-Waterloo",
  description:
    "Search homes for sale in Kitchener, Waterloo, and Cambridge. Mortgage math, Ontario land transfer tax, neighborhood guides, and a conversation when you're ready.",
};

export default function BuyPage() {
  return (
    <>
      <PageHero src={heroImage} alt="Young couple touring a Kitchener home with their agent" />
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24">
          <p className="text-caption text-accent-deep">For buyers</p>
          <h1 className="mt-3 font-display text-display-xl text-ink">
            Buying a place in Kitchener-Waterloo
          </h1>
          <p className="mt-6 max-w-prose text-body-lg text-ink-soft">
            First-time, upsize, downsize, or investment — whatever brings you to the buyer side, the
            process is the same: search, view, evaluate, negotiate, close.
          </p>
          <p className="mt-4 max-w-prose text-body text-ink-soft">
            Below: active for-sale listings, the Ontario mortgage and land-transfer-tax math, and
            the neighborhoods covered.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8" aria-labelledby="buy-listings">
        <h2 id="buy-listings" className="text-display-lg text-ink">
          Current for-sale listings
        </h2>
        <p className="mt-2 max-w-prose text-body text-ink-soft">
          Don&apos;t see what you&apos;re looking for? Tell me what you need and I&apos;ll watch
          the market for you.
        </p>

        <div className="mt-8">
          <ListingsGrid
            listings={activeSaleListings}
            emptyMessage={<>No active for-sale listings right now.</>}
          />
        </div>
      </section>

      <section className="bg-canvas-elevated">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="text-display-lg text-ink">The math</h2>
          <p className="mt-2 max-w-prose text-body text-ink-soft">
            What buying a house in Ontario actually costs, beyond the sticker price.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <MortgageCalculator />
            <LTTCalculator />
          </div>

          <div className="mt-8 rounded-lg border border-accent-soft bg-canvas p-6">
            <p className="font-display text-display-sm text-ink">First-time buyer in Ontario?</p>
            <ul className="mt-3 space-y-2 text-body-sm text-ink-soft">
              <li>
                <strong className="text-ink">Provincial LTT rebate:</strong> up to $4,000
                refunded on closing.
              </li>
              <li>
                <strong className="text-ink">RRSP Home Buyers&apos; Plan:</strong> withdraw up
                to $60,000 ($120,000 per couple) tax-free, repay over 15 years.
              </li>
              <li>
                <strong className="text-ink">Tax-Free First Home Savings Account (FHSA):</strong>
                {" "}
                contribute up to $40,000 lifetime, tax-deductible going in, tax-free coming out.
              </li>
            </ul>
            <p className="mt-3 text-caption text-muted">
              Not financial advice — confirm details with your bank or mortgage broker.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="text-display-lg text-ink">Neighborhoods covered</h2>
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

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8" aria-labelledby="buy-cta">
        <div className="rounded-lg border border-border-subtle bg-canvas-elevated p-8 text-center">
          <h2 id="buy-cta" className="font-display text-display-md text-ink">
            Ready to start the conversation?
          </h2>
          <p className="mt-3 text-body text-ink-soft">
            Let&apos;s talk about what you&apos;re looking for, what you can afford, and the right
            time to make a move.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact?intent=buying"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
            >
              Send a note
            </Link>
            <Link
              href={siteConfig.calendly.url}
              className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 text-sm text-ink transition hover:border-accent-deep hover:text-accent-deep"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
