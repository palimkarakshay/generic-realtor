import testimonialsJson from "@/content/testimonials/index.json";
import { testimonialSchema, type Testimonial } from "@/lib/schemas";

export const allTestimonials: Testimonial[] = (testimonialsJson as unknown[]).map((raw) =>
  testimonialSchema.parse(raw),
);
