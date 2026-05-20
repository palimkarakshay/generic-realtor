"use client";

import { useMemo, useState } from "react";
import { rentAffordability } from "@/lib/finance";
import { formatCAD } from "@/lib/utils";

const verdictCopy: Record<
  ReturnType<typeof rentAffordability>["verdict"],
  { label: string; color: string; note: string }
> = {
  comfortable: {
    label: "Comfortable",
    color: "text-success",
    note: "Below 30% of gross income — generally considered sustainable.",
  },
  tight: {
    label: "Tight",
    color: "text-warning",
    note: "30–35% of gross — workable if you have minimal other debt.",
  },
  stretched: {
    label: "Stretched",
    color: "text-accent",
    note: "35–40% of gross — risky if anything else changes.",
  },
  unaffordable: {
    label: "Unaffordable",
    color: "text-error",
    note: "Over 40% — most landlords won't approve, and you shouldn't be approved.",
  },
};

export function RentAffordabilityCalculator() {
  const [grossAnnual, setGrossAnnual] = useState(75_000);
  const [targetRent, setTargetRent] = useState(2_200);

  const { ratio, verdict, maxRecommended } = useMemo(
    () =>
      rentAffordability({
        grossMonthlyIncome: grossAnnual / 12,
        targetMonthlyRent: targetRent,
      }),
    [grossAnnual, targetRent],
  );
  const v = verdictCopy[verdict];

  return (
    <div className="rounded-xl bg-canvas-elevated p-6 shadow-sm ring-1 ring-border-subtle sm:p-8">
      <h3 className="font-display text-display-sm text-ink">Rent affordability check</h3>
      <p className="mt-2 text-body-sm text-muted">
        The 30%-of-gross-income rule is a starting point, not a final answer. It doesn&apos;t
        account for student loans, transit costs, or savings goals — but it&apos;s what most
        landlords are quietly checking.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-caption text-muted">Your gross annual income</span>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 focus-within:border-lake">
            <input
              type="number"
              value={grossAnnual}
              onChange={(e) => setGrossAnnual(Number(e.target.value))}
              min={0}
              step={1_000}
              className="w-full bg-transparent text-body text-ink outline-none tabular-nums"
            />
            <span className="text-caption text-muted">CAD</span>
          </div>
          <p className="mt-1 text-caption text-muted">
            Before taxes. Combined if you&apos;ll be on the lease together.
          </p>
        </label>

        <label className="block">
          <span className="text-caption text-muted">Target monthly rent</span>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 focus-within:border-lake">
            <input
              type="number"
              value={targetRent}
              onChange={(e) => setTargetRent(Number(e.target.value))}
              min={0}
              step={50}
              className="w-full bg-transparent text-body text-ink outline-none tabular-nums"
            />
            <span className="text-caption text-muted">CAD/mo</span>
          </div>
        </label>
      </div>

      <dl className="mt-8 grid gap-4 border-t border-border-subtle pt-6 sm:grid-cols-3">
        <div>
          <dt className="text-caption text-muted">Ratio of gross income</dt>
          <dd className="mt-1 font-display text-display-sm text-ink tabular-nums">
            {(ratio * 100).toFixed(1)}%
          </dd>
        </div>
        <div>
          <dt className="text-caption text-muted">Recommended max (30%)</dt>
          <dd className="mt-1 font-display text-display-sm text-ink tabular-nums">
            {formatCAD(maxRecommended)}/mo
          </dd>
        </div>
        <div>
          <dt className="text-caption text-muted">Verdict</dt>
          <dd className={`mt-1 font-display text-display-md ${v.color}`}>{v.label}</dd>
        </div>
      </dl>
      <p className="mt-3 text-body-sm text-ink-soft">{v.note}</p>
    </div>
  );
}
