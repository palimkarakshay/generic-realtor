"use client";

interface ChipOption<T extends string | number> {
  value: T;
  label: string;
}

interface FilterChipsProps<T extends string | number> {
  /** Display label shown above the chips. */
  label: string;
  options: ChipOption<T>[];
  value: T[];
  onChange: (next: T[]) => void;
  /** ARIA group label — defaults to `label` if omitted. */
  ariaLabel?: string;
}

export function FilterChips<T extends string | number>({
  label,
  options,
  value,
  onChange,
  ariaLabel,
}: FilterChipsProps<T>) {
  const toggle = (v: T) => {
    if (value.includes(v)) onChange(value.filter((x) => x !== v));
    else onChange([...value, v]);
  };

  return (
    <div>
      <p className="text-caption text-muted">{label}</p>
      <div
        className="mt-2 flex flex-wrap gap-2"
        role="group"
        aria-label={ariaLabel ?? label}
      >
        {options.map((o) => {
          const active = value.includes(o.value);
          return (
            <button
              key={String(o.value)}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(o.value)}
              className={
                "rounded-full px-3 py-1.5 text-body-sm transition " +
                (active
                  ? "bg-ink text-canvas"
                  : "bg-canvas text-ink-soft ring-1 ring-border hover:ring-ink")
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
