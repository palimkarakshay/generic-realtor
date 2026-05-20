import type { Metadata } from "next";
import Link from "next/link";
import { neighborhoods } from "@/lib/neighborhoods";

export const metadata: Metadata = {
  title: "Kitchener-Waterloo neighborhoods",
  description:
    "Honest, on-the-ground notes about each KW neighborhood I serve — the pace, the price band, and the quirks.",
};

export default function NeighborhoodsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <header className="max-w-2xl">
        <h1 className="font-display text-display-xl text-ink">Neighborhoods</h1>
        <p className="mt-4 text-body-lg text-ink-soft">
          The KW region isn&apos;t one market — it&apos;s a dozen. What pulls you to Uptown
          Waterloo is the opposite of what pulls someone to Doon South. These are short, honest
          notes on each.
        </p>
      </header>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {neighborhoods.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/neighborhoods/${n.slug}`}
              className="block h-full rounded-lg border border-border-subtle bg-canvas-elevated p-6 transition hover:border-accent hover:shadow-sm"
            >
              <h2 className="font-display text-display-sm text-ink">{n.name}</h2>
              <p className="mt-3 text-body-sm text-ink-soft">
                Read about the vibe, what to expect for prices, and what surprised me.
              </p>
              <p className="mt-4 text-caption text-accent-deep">Read more →</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
