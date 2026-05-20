import type { Testimonial } from "@/lib/schemas";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border-subtle bg-canvas-elevated p-6">
      {testimonial.draft ? (
        <span className="self-start rounded-full border border-warning/40 px-2.5 py-0.5 text-caption uppercase text-warning">
          Draft
        </span>
      ) : null}
      <blockquote className="mt-4 font-display text-body-lg text-ink">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-border-subtle pt-4 text-body-sm text-ink-soft">
        <p className="font-display text-ink">{testimonial.author}</p>
        <p className="text-caption uppercase text-muted">
          {testimonial.relation}
          {testimonial.location ? ` · ${testimonial.location}` : ""}
        </p>
      </figcaption>
    </figure>
  );
}
