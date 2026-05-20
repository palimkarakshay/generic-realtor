import Link from "next/link";

/**
 * Four entry points, ordered Rent → Buy → Sell → Lease-out to match
 * KW visitor priority (student/young-professional rentals dominate first
 * contact). Color-coded by tone so the eye can navigate at a glance.
 */

type Tone = "accent" | "moss" | "ink";

const pillars: {
  href: string;
  title: string;
  intent: string;
  blurb: string;
  cta: string;
  tone: Tone;
}[] = [
  {
    href: "/rent",
    title: "Renting",
    intent: "Looking for a place to live this year",
    blurb:
      "Rentals across KW with lease terms, utilities, and pet policies surfaced up front — not buried in a PDF.",
    cta: "See rentals",
    tone: "moss",
  },
  {
    href: "/buy",
    title: "Buying",
    intent: "Looking for a place to call yours",
    blurb:
      "First place, forever place, or the in-between place. Mortgage math, neighborhoods, the questions the listing photos don't answer.",
    cta: "Start browsing",
    tone: "accent",
  },
  {
    href: "/sell",
    title: "Selling",
    intent: "Ready to list the home you have",
    blurb:
      "A current valuation, an honest pricing strategy, and a marketing plan that doesn't oversell. No pressure to list before you're ready.",
    cta: "Get a valuation",
    tone: "moss",
  },
  {
    href: "/lease-out",
    title: "Leasing out",
    intent: "You own it, you want a great tenant in it",
    blurb:
      "Realistic rent, careful tenant screening, and the Ontario RTA basics so you don't end up at the LTB six months in.",
    cta: "Start the process",
    tone: "ink",
  },
];

const toneClasses: Record<Tone, { intent: string; ring: string; hoverRing: string; cta: string }> = {
  accent: {
    intent: "text-accent-deep",
    ring: "ring-accent-soft",
    hoverRing: "hover:ring-accent",
    cta: "group-hover:text-accent-deep",
  },
  moss: {
    intent: "text-moss",
    ring: "ring-moss-soft",
    hoverRing: "hover:ring-moss",
    cta: "group-hover:text-moss",
  },
  ink: {
    intent: "text-ink-soft",
    ring: "ring-border",
    hoverRing: "hover:ring-ink",
    cta: "group-hover:text-ink",
  },
};

export function FourPillars() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" aria-labelledby="pillars-heading">
      <h2 id="pillars-heading" className="text-display-lg text-ink">
        Where are you in the picture?
      </h2>
      <p className="mt-3 max-w-prose text-body-lg text-ink-soft">
        The first question I ask anyone is what side of the market they&apos;re on. The answer
        changes almost every piece of advice that follows.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {pillars.map((p) => {
          const tone = toneClasses[p.tone];
          return (
            <Link
              key={p.href}
              href={p.href}
              className={`group block rounded-xl bg-canvas-elevated p-7 shadow-sm ring-1 transition hover:shadow-lg ${tone.ring} ${tone.hoverRing}`}
            >
              <p className={`text-caption ${tone.intent}`}>{p.intent}</p>
              <h3 className="mt-2 text-display-md text-ink">{p.title}</h3>
              <p className="mt-3 text-body text-ink-soft">{p.blurb}</p>
              <p
                className={`mt-5 inline-flex items-center gap-1 text-body-sm text-ink transition ${tone.cta}`}
              >
                {p.cta} <span aria-hidden>→</span>
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
