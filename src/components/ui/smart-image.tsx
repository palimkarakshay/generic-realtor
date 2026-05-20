"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Image with graceful onError fallback. Used everywhere external image URLs
 * (Pollinations, etc.) can fail or be slow on first generation. Instead of
 * the browser's broken-image icon, shows the alt text on a parchment block.
 *
 * Client component (uses state for the error flag). Safe to drop into any
 * server component as a child.
 */
export function SmartImage({ src, alt, className, ...rest }: SmartImageProps) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-parchment p-4 text-center",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <span className="text-caption text-muted">{alt}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={className}
      {...rest}
    />
  );
}
