import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leasing out a property in KW",
  description:
    "Help listing your Kitchener-Waterloo property for rent: comparable-rent estimate, tenant screening, and the Ontario landlord rules you actually need to know.",
};

const steps = [
  {
    n: "01",
    title: "Realistic comparable rents",
    body: "What similar units in your neighborhood are actually leasing for — not the wishful asking prices that sit empty for 4 months.",
  },
  {
    n: "02",
    title: "Photos and listing copy",
    body: "Honest representation that doesn't waste anyone's time. Bad photos waste your time more than the tenant's.",
  },
  {
    n: "03",
    title: "Tenant screening that's legal and effective",
    body: "Credit check, employment verification, references. What you can ask, what you can't, and why the rules exist.",
  },
  {
    n: "04",
    title: "The Ontario Standard Lease",
    body: "Use the right form. Add your specific terms in Section 15. Anything you put outside the standard form is likely unenforceable.",
  },
  {
    n: "05",
    title: "Move-in inspection + deposit handling",
    body: "First and last month's rent is the only legal deposit in Ontario. A documented walk-through saves you years of disputes.",
  },
];

export default function LeaseOutPage() {
  return (
    <>
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24">
          <p className="text-caption text-accent-deep">For landlords</p>
          <h1 className="mt-3 font-display text-display-xl text-ink">
            Leasing out your KW property
          </h1>
          <p className="mt-6 max-w-prose text-body-lg text-ink-soft">
            Realistic rent, careful tenant screening, and the Ontario Residential Tenancies Act
            basics — so you don&apos;t end up at the Landlord and Tenant Board six months in
            because of a clause that was never enforceable.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <h2 className="text-display-lg text-ink">How the process goes</h2>
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

      <section className="bg-canvas-elevated">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <h2 className="text-display-lg text-ink">Ontario landlord essentials</h2>
          <ul className="mt-6 space-y-5 text-body text-ink-soft">
            <li>
              <strong className="text-ink">Deposits are limited.</strong> You can collect first
              and last month&apos;s rent. You cannot collect security deposits, pet deposits,
              cleaning deposits, or key deposits in excess of the actual replacement cost.
            </li>
            <li>
              <strong className="text-ink">No-pets clauses are unenforceable.</strong> Once a
              lease is signed, you can&apos;t evict for pets alone (with rare exceptions). You
              can screen for pets before signing.
            </li>
            <li>
              <strong className="text-ink">Rent increases.</strong> For units first occupied
              before Nov 15, 2018, the annual provincial guideline caps your increase. Newer
              units are exempt.
            </li>
            <li>
              <strong className="text-ink">N4 / N12 / LTB.</strong> Evictions are paperwork-heavy
              and slow. An N4 (non-payment) takes 14 days minimum; an LTB hearing can take
              months. Screening upstream is far cheaper than evicting downstream.
            </li>
            <li>
              <strong className="text-ink">You owe a habitable home.</strong> Heat, hot water,
              working plumbing and electrical, working appliances if provided. The lease
              can&apos;t waive this.
            </li>
          </ul>
          <p className="mt-6 text-caption text-muted">
            General information, not legal advice. For specific situations, consult a paralegal
            or <a href="https://tribunalsontario.ca/ltb/" className="underline">tribunalsontario.ca/ltb</a>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="rounded-lg border border-border-subtle bg-canvas-elevated p-8 text-center">
          <h2 className="font-display text-display-md text-ink">
            How much rent could you ask?
          </h2>
          <p className="mt-3 text-body text-ink-soft">
            Send me your unit&apos;s details and I&apos;ll come back with a comparable-rent
            estimate — three recently-leased units in your neighborhood and a realistic asking
            range.
          </p>
          <Link
            href="/contact?intent=lease_out"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep"
          >
            Get a rent estimate
          </Link>
        </div>
      </section>
    </>
  );
}
