import Link from "next/link";

/**
 * The four entry-point pillars: Buy / Rent / Sell / Lease-out.
 * Used on the home page and as a footer-of-page upsell on the contact page.
 */

const pillars: {
  href: string;
  title: string;
  intent: string;
  blurb: string;
  cta: string;
}[] = [
  {
    href: "/buy",
    title: "Buying",
    intent: "Looking for a place to call yours",
    blurb:
      "First place, forever place, or the in-between place. Mortgage math, neighborhoods, the questions the listing photos don't answer.",
    cta: "Start browsing",
  },
  {
    href: "/rent",
    title: "Renting",
    intent: "Looking for a place to live this year",
    blurb:
      "Rentals in Kitchener-Waterloo with the lease terms, utilities, and pet policies up front — not buried in a PDF.",
    cta: "See rentals",
  },
  {
    href: "/sell",
    title: "Selling",
    intent: "Ready to list the home you have",
    blurb:
      "A current valuation, an honest pricing strategy, and a marketing plan that doesn't oversell. No pressure to list before you're ready.",
    cta: "Get a valuation",
  },
  {
    href: "/lease-out",
    title: "Leasing out",
    intent: "You own it, you want a great tenant in it",
    blurb:
      "Realistic rent, careful tenant screening, and the Ontario RTA basics so you don't end up at the LTB six months in.",
    cta: "Start the process",
  },
];

export function FourPillars() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8" aria-labelledby="pillars-heading">
      <h2 id="pillars-heading" className="text-display-lg text-ink">
        Where are you in the picture?
      </h2>
      <p className="mt-3 max-w-prose text-body-lg text-ink-soft">
        The first question I ask anyone is what side of the market they&apos;re on. The answer changes
        almost every piece of advice that follows.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {pillars.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group block rounded-lg border border-border-subtle bg-canvas-elevated p-7 transition hover:border-accent hover:shadow-sm"
          >
            <p className="text-caption text-accent-deep">{p.intent}</p>
            <h3 className="mt-2 text-display-md text-ink">{p.title}</h3>
            <p className="mt-3 text-body text-ink-soft">{p.blurb}</p>
            <p className="mt-5 inline-flex items-center gap-1 text-body-sm text-ink transition group-hover:text-accent-deep">
              {p.cta} <span aria-hidden>→</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
