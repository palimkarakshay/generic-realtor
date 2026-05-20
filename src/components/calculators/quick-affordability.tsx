"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { maxAffordablePurchasePrice, rentAffordability } from "@/lib/finance";
import { formatCAD } from "@/lib/utils";

/**
 * Homepage tri-card affordability snapshot. Each card is interactive in-page
 * (no submit, no nav) so the visitor gets a real number before they even
 * scroll. Deep "Learn more" links push toward the educational pages with
 * full calculators.
 */
export function QuickAffordability() {
  return (
    <section
      aria-labelledby="affordability-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8"
    >
      <h2
        id="affordability-heading"
        className="font-display text-display-lg text-ink"
      >
        What can you afford?
      </h2>
      <p className="mt-3 max-w-prose text-body-lg text-ink-soft">
        Three answers, computed in your browser — nothing sent anywhere. Get a
        ballpark before we ever talk.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <RenterCard />
        <BuyerCard />
        <SellerCard />
      </div>
    </section>
  );
}

/* ── Renter card ───────────────────────────────────────────────────────── */

function RenterCard() {
  const id = useId();
  const [income, setIncome] = useState(75_000);
  const safeIncome = Number.isFinite(income) && income > 0 ? income : 0;
  const { maxRecommended } = rentAffordability({
    grossMonthlyIncome: safeIncome / 12,
    targetMonthlyRent: 0,
  });

  return (
    <article className="rounded-2xl bg-canvas-elevated p-6 shadow-sm ring-1 ring-lake-soft">
      <p className="text-caption text-lake-deep">For renters</p>
      <h3 className="mt-2 font-display text-display-sm text-ink">
        How much rent fits?
      </h3>

      <label className="mt-5 block">
        <span className="text-caption text-muted">Gross annual income</span>
        <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 focus-within:border-lake">
          <span className="text-caption text-muted">$</span>
          <input
            id={`${id}-income`}
            type="number"
            min={0}
            step={1_000}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full bg-transparent text-body text-ink outline-none tabular-nums"
            aria-label="Gross annual income"
          />
          <span className="text-caption text-muted">CAD</span>
        </div>
      </label>

      <dl className="mt-6 border-t border-border-subtle pt-5">
        <dt className="text-caption text-muted">Max comfortable rent (30% rule)</dt>
        <dd className="mt-1 font-display text-display-md text-lake-deep tabular-nums">
          {formatCAD(Number.isFinite(maxRecommended) ? maxRecommended : 0, {
            decimals: 0,
          })}
          <span className="text-body text-ink-soft">/mo</span>
        </dd>
      </dl>

      <Link
        href="/rent"
        className="mt-5 inline-flex items-center gap-1 text-body-sm text-ink transition hover:text-lake-deep"
      >
        See KW rentals →
      </Link>
    </article>
  );
}

/* ── Buyer card ────────────────────────────────────────────────────────── */

function BuyerCard() {
  const id = useId();
  const [income, setIncome] = useState(120_000);
  const [down, setDown] = useState(80_000);
  const [rate, setRate] = useState(5.04);

  const maxPrice = maxAffordablePurchasePrice({
    grossAnnualIncome: Number.isFinite(income) ? Math.max(0, income) : 0,
    downPayment: Number.isFinite(down) ? Math.max(0, down) : 0,
    annualRatePct: Number.isFinite(rate) ? Math.max(0, rate) : 0,
    amortizationYears: 25,
  });

  return (
    <article className="rounded-2xl bg-canvas-elevated p-6 shadow-sm ring-1 ring-accent-soft">
      <p className="text-caption text-accent-deep">For buyers</p>
      <h3 className="mt-2 font-display text-display-sm text-ink">
        Max purchase price?
      </h3>

      <div className="mt-5 grid gap-3">
        <label className="block">
          <span className="text-caption text-muted">Gross annual income</span>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 focus-within:border-accent">
            <span className="text-caption text-muted">$</span>
            <input
              id={`${id}-income`}
              type="number"
              min={0}
              step={1_000}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full bg-transparent text-body text-ink outline-none tabular-nums"
              aria-label="Gross annual income"
            />
          </div>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-caption text-muted">Down payment</span>
            <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 focus-within:border-accent">
              <span className="text-caption text-muted">$</span>
              <input
                id={`${id}-down`}
                type="number"
                min={0}
                step={1_000}
                value={down}
                onChange={(e) => setDown(Number(e.target.value))}
                className="w-full bg-transparent text-body text-ink outline-none tabular-nums"
                aria-label="Down payment"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-caption text-muted">Rate</span>
            <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 focus-within:border-accent">
              <input
                id={`${id}-rate`}
                type="number"
                min={0}
                max={20}
                step={0.05}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full bg-transparent text-body text-ink outline-none tabular-nums"
                aria-label="Mortgage interest rate"
              />
              <span className="text-caption text-muted">%</span>
            </div>
          </label>
        </div>
      </div>

      <dl className="mt-6 border-t border-border-subtle pt-5">
        <dt className="text-caption text-muted">Max purchase price (32% GDS)</dt>
        <dd className="mt-1 font-display text-display-md text-accent-deep tabular-nums">
          {formatCAD(Number.isFinite(maxPrice) ? maxPrice : 0, { decimals: 0 })}
        </dd>
      </dl>

      <Link
        href="/buy"
        className="mt-5 inline-flex items-center gap-1 text-body-sm text-ink transition hover:text-accent-deep"
      >
        Full mortgage + LTT calculator →
      </Link>
    </article>
  );
}

/* ── Seller card ───────────────────────────────────────────────────────── */

function SellerCard() {
  return (
    <article className="flex flex-col rounded-2xl bg-canvas-elevated p-6 shadow-sm ring-1 ring-moss-soft">
      <p className="text-caption text-moss">For homeowners</p>
      <h3 className="mt-2 font-display text-display-sm text-ink">
        What&apos;s your home worth?
      </h3>
      <p className="mt-3 text-body-sm text-ink-soft">
        No instant-AVM gimmicks. A real valuation looks at recent sold comps
        within a few blocks, what your home actually has that the comps
        don&apos;t, and what the market this week is willing to pay.
      </p>

      <ul className="mt-5 space-y-2 text-body-sm text-ink-soft">
        <li className="flex gap-2">
          <span aria-hidden className="text-moss">·</span>
          <span>30-minute walkthrough, no commitment</span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden className="text-moss">·</span>
          <span>Written CMA emailed within 48 hours</span>
        </li>
        <li className="flex gap-2">
          <span aria-hidden className="text-moss">·</span>
          <span>Honest range, including &quot;hold and wait&quot;</span>
        </li>
      </ul>

      <Link
        href="/contact?intent=valuation"
        className="mt-auto inline-flex items-center justify-center gap-1 rounded-full bg-ink px-4 py-2.5 text-sm text-canvas transition hover:bg-moss"
      >
        Request a valuation
      </Link>
    </article>
  );
}
