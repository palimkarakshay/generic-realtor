"use client";

import { formatCAD } from "@/lib/utils";

interface PriceRangeSliderProps {
  /** Lower bound of the slider scale. */
  min: number;
  /** Upper bound of the slider scale. Treated as "any" when value.max >= max. */
  max: number;
  /** Step granularity. */
  step: number;
  value: { min: number; max: number };
  onChange: (next: { min: number; max: number }) => void;
  /** Display suffix, e.g. "/mo" for rentals. */
  suffix?: string;
}

/**
 * Two numeric inputs framed as a min/max pair. Deliberately simple —
 * an actual dual-thumb range slider can replace this without changing the
 * surrounding props.
 */
export function PriceRangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  suffix = "",
}: PriceRangeSliderProps) {
  const upperLabel = value.max >= max ? "any" : `${formatCAD(value.max)}${suffix}`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-caption text-muted">Price</p>
        <p className="text-body-sm text-ink tabular-nums">
          {formatCAD(value.min)}
          {suffix} – {upperLabel}
        </p>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="block">
          <span className="text-caption text-muted">Min</span>
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value.min}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (!Number.isFinite(next)) return;
              onChange({ min: Math.min(next, value.max), max: value.max });
            }}
            className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2 text-body text-ink outline-none focus:border-lake tabular-nums"
            aria-label="Minimum price"
          />
        </label>
        <label className="block">
          <span className="text-caption text-muted">Max</span>
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value.max}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (!Number.isFinite(next)) return;
              onChange({ min: value.min, max: Math.max(next, value.min) });
            }}
            className="mt-1 w-full rounded-md border border-border bg-canvas px-3 py-2 text-body text-ink outline-none focus:border-lake tabular-nums"
            aria-label="Maximum price"
          />
        </label>
      </div>
    </div>
  );
}
