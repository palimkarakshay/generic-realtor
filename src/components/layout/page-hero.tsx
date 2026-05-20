import { SmartImage } from "@/components/ui/smart-image";

/**
 * Full-bleed hero image strip for the top of pillar pages and neighborhood
 * detail pages. The page's H1 + intro live below this strip, not on top of it
 * (we avoid text-over-image on a brand-new realtor's site — readability over
 * drama).
 */
export function PageHero({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="border-b border-border-subtle">
      <SmartImage
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className="aspect-[21/9] w-full object-cover md:aspect-[3/1]"
      />
      {caption ? (
        <figcaption className="mx-auto max-w-6xl px-5 py-2 text-caption text-muted sm:px-8">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
