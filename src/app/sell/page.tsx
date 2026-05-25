import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site-config";
import { pollinationsImage } from "@/lib/utils";

const heroImage = pollinationsImage(
  "Cinematic real estate listing photograph, late golden hour, a beautifully maintained two-storey red brick detached family home in Westmount Kitchener Ontario, neat green lawn with a freshly placed agent For Sale sign, warm front porch light just turning on, mature trees framing the house, soft long shadows, hyperreal architectural detail, 35mm look, photoreal, no text on signs, no watermark, no logo",
  { seed: 2033, width: 1800, height: 720, model: "flux" },
);

export const metadata: Metadata = {
  title: "Selling in Kitchener-Waterloo",
  description:
    "Sell your home in Kitchener, Waterloo, or Cambridge. Free home valuation, pricing strategy, marketing, and full representation through close.",
};

const steps = [
  {
    n: "01",
    title: "First conversation",
    body: "We walk through your home, talk about timing, talk about price. You decide whether we're a good fit before anything is signed.",
  },
  {
    n: "02",
    title: "Comparable Market Analysis",
    body: "A written CMA using actual KW sale data from the last 60 days. You'll see the high, the low, and where your home lands.",
  },
  {
    n: "03",
    title: "Prep work",
    body: "What to fix, what to leave alone, what to declutter. Most homes need less than you think — staging recommendations are practical, not glossy.",
  },
  {
    n: "04",
    title: "Listing, photography, marketing",
    body: "Professional photos, a written listing that respects the buyer's intelligence, MLS, social, neighborhood mailers where it makes sense.",
  },
  {
    n: "05",
    title: "Offers, negotiation, close",
    body: "Every line of every offer explained. You make the decisions; I handle the back-and-forth and the paperwork through close.",
  },
];

export default function SellPage() {
  return (
    <>
      <PageHero
        src={heroImage}
        alt="A Kitchener brick family home with a For Sale sign on the front lawn"
      />

      <section
        aria-labelledby="sell-hero-heading"
        className="border-b border-border-subtle bg-canvas-elevated"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
            <div>
              <p className="text-caption text-moss">For sellers</p>
              <h1
                id="sell-hero-heading"
                className="mt-3 font-display text-display-xl text-ink"
              >
                What&apos;s your KW home worth this week?
              </h1>
              <p className="mt-6 max-w-prose text-body-lg text-ink-soft">
                Send your address and a few details. I&apos;ll come back with a CMA — three
                comparable recent sales and a realistic price range.
              </p>
              <ul className="mt-6 space-y-2 text-body text-ink-soft">
                <li className="flex gap-2">
                  <span aria-hidden className="text-moss">·</span>
                  Free. Usually back within two business days.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-moss">·</span>
                  Written report emailed to you — not a sales call.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-moss">·</span>
                  No obligation to list.
                </li>
              </ul>
            </div>

            <div>
              <ContactForm defaultIntent="valuation" source="sell-hero" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <h2 className="text-display-lg text-ink">How it goes, start to close</h2>
        <ol className="mt-10 space-y-10">
          {steps.map((s) => (
            <li key={s.n} className="grid gap-4 md:grid-cols-[5rem_1fr]">
              <p className="font-display text-display-md text-accent-deep">{s.n}</p>
              <div>
                <h3 className="font-display text-display-sm text-ink">{s.title}</h3>
                <p className="mt-2 text-body text-ink-soft">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h2 className="text-display-lg text-ink">A note on commission</h2>
        <p className="mt-3 text-body text-ink-soft">
          KW seller commissions typically run 4–5% of the sale price (split between listing and
          buyer&apos;s agent, plus HST). It covers pricing strategy, marketing, showings,
          paperwork, negotiation, and the legal representation that comes with the listing.
        </p>
        <p className="mt-3 text-body text-ink-soft">
          Happy to walk through exactly what the commission covers, line by line, on the first
          call. No hidden fees, no surprise add-ons.
        </p>
      </section>

      <section className="bg-canvas-elevated">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <div className="rounded-lg border border-border-subtle bg-canvas p-8 text-center">
            <h2 className="font-display text-display-md text-ink">Not ready yet?</h2>
            <p className="mt-3 text-body text-ink-soft">
              Send your address anyway. You&apos;ll get a written valuation in your inbox to keep
              for when the timing is right — six months, two years, or whenever.
            </p>
            <Link
              href={`mailto:${siteConfig.realtor.email}`}
              className="mt-6 inline-block text-body-sm text-ink underline hover:text-accent-deep"
            >
              Email me directly →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
