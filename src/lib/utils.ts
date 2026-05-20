import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCAD(amount: number, opts?: { decimals?: number }): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: opts?.decimals ?? 0,
    maximumFractionDigits: opts?.decimals ?? 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-CA").format(n);
}

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  });
}

export function daysSince(iso: string): number {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}

/**
 * Build a Pollinations AI image URL. Free, no API key, deterministic given the
 * same prompt + seed. Used for demo listing photos and the realtor headshot
 * until real photography is shot.
 *
 * Each unique URL triggers a one-time generation on the Pollinations server;
 * Pollinations caches results so subsequent requests are fast.
 */
export function pollinationsImage(prompt: string, opts?: {
  width?: number;
  height?: number;
  seed?: number;
  model?: "flux" | "turbo";
}): string {
  const { width = 1200, height = 900, seed = 1, model = "flux" } = opts ?? {};
  const encoded = encodeURIComponent(prompt.trim());
  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=true`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
