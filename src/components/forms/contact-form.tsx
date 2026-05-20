"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, type LeadInput } from "@/lib/schemas";
import { Turnstile } from "@/components/forms/turnstile";
import { siteConfig } from "@/lib/site-config";

const intentOptions: { value: LeadInput["intent"]; label: string }[] = [
  { value: "buying", label: "Buying a home" },
  { value: "renting", label: "Renting a place" },
  { value: "selling", label: "Selling my home" },
  { value: "valuation", label: "Free home valuation" },
  { value: "lease_out", label: "Leasing out my property" },
  { value: "general", label: "General question" },
];

export function ContactForm({
  defaultIntent,
  defaultListing,
  source,
}: {
  defaultIntent?: LeadInput["intent"];
  defaultListing?: string;
  source?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      intent: defaultIntent ?? "general",
      listingSlug: defaultListing,
      source,
      turnstileToken: "",
      consent: false,
    },
  });

  const onSubmit = async (values: LeadInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(data?.error ?? "Submission failed");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Try again, or email directly.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-success/30 bg-canvas-elevated p-8">
        <h2 className="font-display text-display-md text-ink">Got it. Thank you.</h2>
        <p className="mt-3 text-body text-ink-soft">
          I&apos;ll reply within one business day. If something&apos;s urgent in the meantime,
          call me at{" "}
          <a href={`tel:${siteConfig.realtor.phone}`} className="underline">
            {siteConfig.realtor.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Your name" error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          {...register("name")}
          className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-ink focus:border-accent focus:outline-none"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            {...register("email")}
            className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-ink focus:border-accent focus:outline-none"
          />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-ink focus:border-accent focus:outline-none"
          />
        </Field>
      </div>

      <Field label="What are you working on?" error={errors.intent?.message}>
        <select
          {...register("intent")}
          className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-ink focus:border-accent focus:outline-none"
        >
          {intentOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Tell me a bit more" error={errors.message?.message}>
        <textarea
          rows={6}
          {...register("message")}
          className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-ink focus:border-accent focus:outline-none"
          placeholder="What you're looking for, where you are in the process, any timeline that matters."
        />
      </Field>

      <label className="flex gap-3 text-body-sm text-ink-soft">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 size-4 accent-accent"
        />
        <span>
          I consent to {siteConfig.realtor.name} emailing me about my inquiry. I can unsubscribe at
          any time. ({" "}
          <a href="/privacy" className="underline">
            privacy policy
          </a>{" "}
          )
        </span>
      </label>
      {errors.consent ? (
        <p className="text-caption text-error">{errors.consent.message}</p>
      ) : null}

      <Turnstile onToken={(t) => setValue("turnstileToken", t, { shouldValidate: true })} />
      {errors.turnstileToken ? (
        <p className="text-caption text-error">{errors.turnstileToken.message}</p>
      ) : null}

      {serverError ? (
        <p className="rounded-md border border-error/40 bg-canvas px-3 py-2 text-body-sm text-error">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm text-canvas transition hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Sending…" : "Send it"}
      </button>

      <p className="text-caption text-muted">{siteConfig.compliance.casl}</p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-caption text-muted">{label}</span>
      {children}
      {error ? <p className="mt-1 text-caption text-error">{error}</p> : null}
    </label>
  );
}
