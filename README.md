# Generic Realtor Marketing Site

A free, open-source marketing website template for brand-new realtors in Ontario (built around Kitchener-Waterloo by default). Runs on free tiers only — the realtor's only recurring cost is the domain (~$15–25/yr).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** + **shadcn/ui** (base-nova style)
- **MDX** + `next-mdx-remote` for insights / neighborhoods
- **Resend** for transactional email (free tier: 100/day)
- **Vercel** for hosting (Hobby plan — free, used for the demo)
- **Cloudflare Turnstile** for bot protection (free)
- **Cloudflare Email Routing** for vanity email (free)
- **Leaflet + OpenStreetMap** for maps (free, no API key, no credit card)
- **Decap CMS** at `/admin` for self-editing (free, open source)
- **Zod** for runtime content validation

## Four entry points

The site is split so visitors don't filter through irrelevant content:

| Path | Audience |
|---|---|
| `/buy` | Buying a home |
| `/rent` | Renting a place |
| `/sell` | Selling their home |
| `/lease-out` | Listing a property to rent out |

Listings carry a `listingType: 'sale' \| 'rent'` field; the same listing template renders different fact strips and CTAs based on this.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev                  # http://localhost:3000
```

## Deploy

### Demo: Vercel free (Hobby) tier

```bash
npx vercel deploy
```

Or connect the GitHub repo at vercel.com/new — Vercel auto-detects Next.js, no configuration needed. First deploy takes ~90 seconds; subsequent pushes redeploy automatically.

Add the env vars from `.env.example` to the Vercel project settings before promoting the preview to production.

### Important: commercial-use caveat

Vercel's **Hobby plan is for non-commercial use only**. It's perfect for a developer's demo or a hobbyist's site, but the realtor's actual production site (which is a commercial use) needs one of:

- **Vercel Pro** — $20/mo per seat. Easiest upgrade path.
- **Netlify Free** — explicitly permits commercial use on the free tier.
- **Cloudflare Pages** — free + commercial-OK, but Next.js SSR requires the `@cloudflare/next-on-pages` adapter and converting the API route + dynamic routes to the edge runtime.

For the initial demo we ship on Vercel Hobby; when the realtor signs off and wants to put it on their own domain commercially, follow `docs/OPERATOR_ONBOARDING.md` for the migration path.

## What's intentionally NOT included (v1)

These are the "upgrade-path" features — add as the realtor grows revenue. See the implementation plan for triggers.

- Twilio SMS speed-to-lead
- Follow Up Boss CRM
- Make.com social automation
- Google Reviews API integration
- 3rd-party IDX widget
- Hand-drawn SVG / custom illustrations

## License

MIT
