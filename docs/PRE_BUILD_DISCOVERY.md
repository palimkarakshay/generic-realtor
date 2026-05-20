# Pre-build discovery questionnaire

The developer should walk through this with the realtor in a 30–45 minute call before writing a single line of code. The answers go directly into `src/lib/site-config.ts` and inform the first batch of content.

## Section 1: Identity

1. Full legal name, as it appears on RECO registration.
2. Preferred public name (if different — e.g. "Sam" vs "Samuel").
3. Pronouns (they/them, she/her, he/him, etc.).
4. Job title — Sales Representative or Broker?
5. RECO registration number.
6. Year licensed (or expected licensing date if pre-license).
7. Best headshot you currently have. (If none, schedule a $200 session with a local photographer — it's the highest-ROI photo you'll spend money on.)

## Section 2: Brokerage

1. Brokerage name (exact legal form, e.g. "TODO Realty Inc., Brokerage").
2. Brokerage address.
3. Brokerage phone.
4. Brokerage RECO number.
5. Brokerage logo (PNG with transparent background, ideally).
6. Any brokerage-specific rules about your personal site? (Some require disclaimers or specific positioning.)

## Section 3: Contact + scheduling

1. Email for forwarding (`hello@yourdomain.ca` → which Gmail?).
2. Cell phone for the public site.
3. Calendly URL (free tier is fine).

## Section 4: Personal voice + bio

Long bios always feel performative. We want yours to feel like a slightly more careful version of how you'd actually introduce yourself.

1. Why did you get into real estate? (1 sentence.)
2. What do you wish more realtors did differently? (1–2 sentences.)
3. What's your hidden specialty / overqualification? (Often grows into your niche.)
4. What languages do you speak well enough to do business in?
5. What service areas do you actually work? (Be honest. Don't list "all of southern Ontario" if 80% of your time is in KW.)

## Section 5: Initial listings + content

1. Do you have any active listings to ship with? (If not, that's fine — the empty state copy is designed for it.)
2. Do you have any past clients who'd give a testimonial we can publish? (If not, fine — we don't publish a fake one.)
3. Do you have a photographer you work with? (If not, the developer can recommend KW-area pros.)
4. Do you have any neighborhood expertise to capture first? (Pick the 1–2 you know best — we'll write those guides fully. The others stay as placeholders until you do deals there.)

## Section 6: Compliance + brand

1. Do you have any past RECO / TRESA / advertising complaints we should know about? (Affects what we can claim.)
2. Are you a member of any board (KWAR, OREA)? Membership numbers?
3. Anything you specifically can't claim? (No "#1 in KW", obviously. Anything else?)
4. Brand color preference — we use a warm terracotta + moss palette by default; happy to adjust to your taste, but the warmth is intentional and works against the generic-realtor-blue trap.

## Section 7: Tools the realtor already has

1. Email client (we assume Gmail; flag if anything else).
2. Phone & SMS (we assume iPhone or Android with Gmail push notifications).
3. Calendar (Google Calendar assumed).
4. Anything paid you're already on (Lone Wolf, FUB, BoldTrail, Sierra, IDX widgets)? — we want to NOT replace these accidentally.

## Section 8: Budget and expectations

1. Realistic monthly budget for site + lead-gen tools? (Anchor: this site costs ~$15–25/yr in domain. Anything else is opt-in.)
2. Time per week you can spend on the site? (Realistic answer: 1–2 hours for the first month, then ~30 min/wk maintenance.)
3. Pace expectations: how many leads/month would feel like a win in the first 3 months? (This calibrates whether we need to lean into IDX / paid acquisition later.)

## Outputs of this conversation

The developer should leave the call with:
- All fields needed to populate `siteConfig`
- A list of TODO tokens that will be replaced before launch
- Photos / logos collected (or a deadline for them)
- A first content commitment (1–2 neighborhood guides + a CMA inquiry funnel)
- A launch date target
