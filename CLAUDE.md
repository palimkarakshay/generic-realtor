# generic-realtor

Next.js (React 19 / TypeScript) marketing site, built on the shared KW
marketing-site stack (Next.js + shadcn/ui + Resend + Cloudflare Turnstile +
Vercel + Decap CMS).

## Automated code review (Codex) + auto-fix (Claude Opus) -- house standard

This repo uses a standard two-tool pipeline: **Codex (OpenAI `gpt-5.5`)
reviews code**, **Claude Opus (`claude-opus-4-7`) applies the fixes**. It
ships as three workflows in `.github/workflows/`:

- `codex-review.yml` -- reviews every PR diff, posts a structured review.
- `codex-pr-fix.yml` -- Claude applies the review's fixes, pushes to the PR branch.
- `codex-sweep.yml` -- weekly full-codebase review -> Claude fixes -> rolling PR.

Required repo secrets: `OPENAI_API_KEY` (+ optional `OPENAI_API_KEY_BACKUP`)
and `CLAUDE_CODE_OAUTH_TOKEN`. Also enable Actions "Read and write" +
"Allow GitHub Actions to create and approve pull requests". These triggers
only run from the default branch.

**When creating a NEW repo under this owner, copy this pipeline.** The
canonical, copy-me templates and full setup checklist live in
[`docs/codex-templates/`](docs/codex-templates/README.md). Use
`generic-realtor` (single app) or `mirror-mirror` (Python+JS monorepo) as
reference instantiations.

## MCP servers — one-line use policy

`.mcp.json` wires the shared MCP servers. Reach for the right server instead of
guessing or hand-rolling:

- **context7** — pull current, version-accurate docs for any library/framework/API before you write or upgrade code against it; never code an API from memory.
- **shadcn** — add/update shadcn/ui components through the MCP (keep `components.json` authoritative) rather than hand-writing primitives.
- **playwright** — drive a real browser for end-to-end checks, screenshots, and responsive / AODA-accessibility verification before calling any UI change done.
- **vercel** — inspect deployments, build logs, env vars, and domains; diagnose a failed deploy from its logs instead of guessing.
- **sentry** — triage runtime errors and confirm a change cleared (not introduced) issues; read the stack trace before debugging blind.
- **cloudflare** — manage the site's DNS, Turnstile, and Email Routing through the MCP; verify records there, not by hand.
- **resend** — send and verify transactional email during lead-path testing; the key comes from `RESEND_API_KEY` — never hard-code it.
- **github** — do all branch / PR / review / CI work through the GitHub MCP.
