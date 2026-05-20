"use client";

import { useMemo, useState } from "react";
import {
  cmhcPremium,
  minimumDownPayment,
  monthlyMortgagePayment,
} from "@/lib/finance";
import { formatCAD } from "@/lib/utils";

export function MortgageCalculator({ defaultPrice = 750_000 }: { defaultPrice?: number }) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(Math.round(defaultPrice * 0.10));
  const [rate, setRate] = useState(5.04);
  const [amortYears, setAmortYears] = useState(25);

  const minDown = useMemo(() => minimumDownPayment(price), [price]);
  const insurance = useMemo(() => cmhcPremium({ price, downPayment }), [price, downPayment]);
  const principal = useMemo(
    () => Math.max(price - downPayment, 0) + insurance,
    [price, downPayment, insurance],
  );
  const monthly = useMemo(
    () => monthlyMortgagePayment({ principal, annualRatePct: rate, amortizationYears: amortYears }),
    [principal, rate, amortYears],
  );
  const shortDown = downPayment < minDown;

  return (
    <div className="rounded-lg border border-border-subtle bg-canvas-elevated p-6 sm:p-8">
      <h3 className="font-display text-display-sm text-ink">Mortgage estimator</h3>
      <p className="mt-2 text-body-sm text-muted">
        Educational. Real rates depend on the lender, term, your credit, and the date. Always
        confirm with a mortgage broker.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          label="Home price"
          suffix="CAD"
          value={price}
          onChange={setPrice}
          min={50_000}
          step={5_000}
        />
        <Field
          label="Down payment"
          suffix="CAD"
          value={downPayment}
          onChange={setDownPayment}
          min={0}
          step={1_000}
          hint={`Minimum: ${formatCAD(minDown)}`}
          error={shortDown ? "Below CMHC minimum — not insurable" : undefined}
        />
        <Field
          label="Interest rate"
          suffix="%"
          value={rate}
          onChange={setRate}
          min={0}
          max={20}
          step={0.05}
          decimals={2}
        />
        <Field
          label="Amortization"
          suffix="years"
          value={amortYears}
          onChange={setAmortYears}
          min={5}
          max={30}
          step={1}
        />
      </div>

      <dl className="mt-8 grid gap-4 border-t border-border-subtle pt-6 sm:grid-cols-3">
        <Stat label="Estimated monthly payment" value={formatCAD(monthly, { decimals: 0 })} primary />
        <Stat label="Mortgage principal" value={formatCAD(principal)} />
        <Stat
          label="CMHC insurance"
          value={insurance > 0 ? formatCAD(insurance) : "Not insured"}
        />
      </dl>

      <p className="mt-6 text-caption text-muted">
        Assumes a fixed-rate mortgage compounded semi-annually (Canadian convention). Property
        tax, condo fees, and utilities are not included.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  suffix,
  hint,
  error,
  min,
  max,
  step = 1,
  decimals = 0,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  suffix?: string;
  hint?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  decimals?: number;
}) {
  return (
    <label className="block">
      <span className="text-caption text-muted">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-md border border-border bg-canvas px-3 py-2 focus-within:border-accent">
        <input
          type="number"
          value={Number.isFinite(value) ? value.toFixed(decimals) : ""}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="w-full bg-transparent text-body text-ink outline-none"
        />
        {suffix ? <span className="text-caption text-muted">{suffix}</span> : null}
      </div>
      {error ? (
        <p className="mt-1 text-caption text-error">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-caption text-muted">{hint}</p>
      ) : null}
    </label>
  );
}

function Stat({
  label,
  value,
  primary,
}: {
  label: string;
  value: string;
  primary?: boolean;
}) {
  return (
    <div>
      <dt className="text-caption text-muted">{label}</dt>
      <dd
        className={
          primary
            ? "mt-1 font-display text-display-md text-accent-deep"
            : "mt-1 font-display text-display-sm text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}
