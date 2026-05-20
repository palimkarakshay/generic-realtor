import type { Testimonial } from "@/lib/schemas";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border-subtle bg-canvas-elevated p-6">
      <blockquote className="font-display text-body-lg text-ink">
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
