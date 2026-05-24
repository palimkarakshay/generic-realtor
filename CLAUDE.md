# generic-realtor

Next.js (React 19 / TypeScript) marketing site.

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
