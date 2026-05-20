# Generic Realtor Marketing Site

A free, open-source marketing website template for brand-new realtors in Ontario (built around Kitchener-Waterloo by default). Runs on free tiers only — the realtor's only recurring cost is the domain (~$15–25/yr).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** + **shadcn/ui** (base-nova style)
- **MDX** for content (insights, neighborhoods)
- **Resend** for transactional email (free tier: 100/day)
- **Cloudflare Pages** for hosting (free, unlimited bandwidth)
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

Deploys to Cloudflare Pages with zero configuration. Connect the GitHub repo in the Cloudflare Pages dashboard, point at the `main` branch, build command `npm run build`, output directory `.next`.

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
