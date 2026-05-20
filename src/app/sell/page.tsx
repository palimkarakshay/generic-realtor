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
    "Honest help selling your home in Kitchener, Waterloo, or Cambridge. Current valuation, pricing strategy, and a marketing plan that doesn't oversell.",
};

const steps = [
  {
    n: "01",
    title: "First conversation, no commitment",
    body: "We walk through your home together, talk about timing, talk about price. You decide if I'm the right person to work with.",
  },
  {
    n: "02",
    title: "A current valuation, not a wishful one",
    body: "Comparable Market Analysis using actual KW sale data from the last 60 days. I'll show you the high, the low, and where I think your home lands.",
  },
  {
    n: "03",
    title: "Prep work that pays for itself",
    body: "What to fix, what to leave alone, what to declutter. Most homes need surprisingly little — overspending on staging is the most common waste.",
  },
  {
    n: "04",
    title: "Listing, photography, marketing",
    body: "Pro photos, a written listing that respects the buyer's intelligence, MLS, social, neighborhood letters where it makes sense. No drone shots for the sake of drone shots.",
  },
  {
    n: "05",
    title: "Offers, negotiation, close",
    body: "I explain every line of every offer. You make the decision; I do the back-and-forth. We close.",
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
                Send me your address and a few details. I&apos;ll come back with a real CMA —
                three comparable recent sales, an honest price range, and zero obligation.
              </p>
              <ul className="mt-6 space-y-2 text-body text-ink-soft">
                <li className="flex gap-2">
                  <span aria-hidden className="text-moss">·</span>
                  Free. Takes me a couple business days.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-moss">·</span>
                  Written CMA emailed back to you, not a sales call.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-moss">·</span>
                  No follow-up if you tell me you&apos;re not ready.
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
          buyer&apos;s agent, plus HST). What you&apos;re paying for: pricing strategy, marketing,
          showings, paperwork, negotiation, and the legal liability of representing you. Cheap
          commission means cheap effort on at least one of those.
        </p>
        <p className="mt-3 text-body text-ink-soft">
          I&apos;m happy to walk through what my commission specifically buys, line by line, on
          the first call. No hidden fees, no surprise add-ons.
        </p>
      </section>

      <section className="bg-canvas-elevated">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <div className="rounded-lg border border-border-subtle bg-canvas p-8 text-center">
            <h2 className="font-display text-display-md text-ink">Not ready yet?</h2>
            <p className="mt-3 text-body text-ink-soft">
              That&apos;s the most common situation. Send me your address anyway — I&apos;ll do
              the math and put it in your inbox. When you&apos;re ready in 6 months or 2 years
              or never, you&apos;ll have the number.
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
