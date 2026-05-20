"use client";

import { useMemo, useState } from "react";
import { firstTimeBuyerLTTRebate, ontarioLTT } from "@/lib/finance";
import { formatCAD } from "@/lib/utils";

export function LTTCalculator({ defaultPrice = 750_000 }: { defaultPrice?: number }) {
  const [price, setPrice] = useState(defaultPrice);
  const [firstTime, setFirstTime] = useState(false);

  const ltt = useMemo(() => ontarioLTT(price), [price]);
  const rebate = firstTime ? firstTimeBuyerLTTRebate(ltt) : 0;
  const net = ltt - rebate;

  return (
    <div className="rounded-xl bg-canvas-elevated p-6 shadow-sm ring-1 ring-border-subtle sm:p-8">
      <h3 className="font-display text-display-sm text-ink">Ontario Land Transfer Tax</h3>
      <p className="mt-2 text-body-sm text-muted">
        Ontario&apos;s provincial LTT on a residential purchase. Toronto&apos;s additional
        municipal LTT is not included — this site is for Kitchener-Waterloo.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-caption text-muted">Purchase price</span>
          <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 focus-within:border-lake">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min={0}
              step={5_000}
              className="w-full bg-transparent text-body text-ink outline-none tabular-nums"
            />
            <span className="text-caption text-muted">CAD</span>
          </div>
        </label>

        <label className="mt-6 flex items-center gap-3 sm:mt-0 sm:items-end">
          <input
            type="checkbox"
            checked={firstTime}
            onChange={(e) => setFirstTime(e.target.checked)}
            className="size-4 accent-accent"
          />
          <span className="text-body-sm text-ink-soft">
            First-time homebuyer (up to $4,000 rebate)
          </span>
        </label>
      </div>

      <dl className="mt-8 grid gap-4 border-t border-border-subtle pt-6 sm:grid-cols-3">
        <div>
          <dt className="text-caption text-muted">Ontario LTT</dt>
          <dd className="mt-1 font-display text-display-sm text-ink tabular-nums">{formatCAD(ltt)}</dd>
        </div>
        <div>
          <dt className="text-caption text-muted">First-time rebate</dt>
          <dd className="mt-1 font-display text-display-sm text-success tabular-nums">
            -{formatCAD(rebate)}
          </dd>
        </div>
        <div>
          <dt className="text-caption text-muted">Net LTT owing</dt>
          <dd className="mt-1 font-display text-display-md text-lake-deep tabular-nums">{formatCAD(net)}</dd>
        </div>
      </dl>
    </div>
  );
}
