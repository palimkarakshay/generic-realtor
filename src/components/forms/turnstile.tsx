"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: { sitekey: string; callback: (token: string) => void; theme?: string },
      ) => string;
      reset: (id: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile (no-CAPTCHA bot check). Free, no credit card.
 * Renders a transparent challenge and writes the token into `onToken`.
 *
 * In dev (no site key), this no-ops and emits a fake token so forms still submit.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      onToken("dev-no-turnstile");
      return;
    }
    if (!ref.current) return;

    const tryRender = () => {
      if (window.turnstile && ref.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: onToken,
          theme: "light",
        });
        return true;
      }
      return false;
    };

    if (tryRender()) return;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => tryRender();
    document.head.appendChild(script);
  }, [siteKey, onToken]);

  if (!siteKey) {
    return (
      <p className="text-caption text-muted">
        Bot protection: not configured for development (set
        <code className="mx-1">NEXT_PUBLIC_TURNSTILE_SITE_KEY</code>
        to enable).
      </p>
    );
  }

  return <div ref={ref} className="my-3" />;
}
