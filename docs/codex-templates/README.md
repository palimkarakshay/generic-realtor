# Codex auto-review + Claude Opus auto-fix -- house standard

This folder is the **canonical, copy-me template** for the automated
code-review setup used across this owner's repositories. Codex (OpenAI
`gpt-5.5`) reviews the code; Claude Opus (`claude-opus-4-7`) applies the
fixes. When you bootstrap a NEW repo, copy these three workflows into
`.github/workflows/` and follow the checklist below.

## What the three workflows do

| File | Trigger | What it does |
|------|---------|--------------|
| `codex-review.yml` | every PR (`pull_request`) + manual | Sends the PR diff to the OpenAI API, posts a structured review comment (`## Suggested fixes` / `## Verdict`), labels the PR `codex-reviewed` / `codex-blockers`. Comment-only. |
| `codex-pr-fix.yml` | a Codex review comment on a PR (`issue_comment`) + manual | Claude Opus applies the mechanical `## Suggested fixes`, runs the repo's verification, and **pushes commits directly to the PR branch**. Skips PRs labelled `human-only`. |
| `codex-sweep.yml` | weekly cron (Mon 06:00 UTC) + manual | Reviews the WHOLE codebase, then Claude applies fixes on a `codex/auto-fixes` branch and opens/updates one rolling PR (never commits to the default branch). |

The review step calls the OpenAI Chat Completions API directly (branded
"Codex review"), matching the lumivara-site / cca-f-prep convention. The
trigger string `Posted by codex-review.yml` in the review comment is what
`codex-pr-fix.yml` keys off -- keep it.

## How to add this to a NEW repo

1. Copy `codex-review.yml`, `codex-sweep.yml`, `codex-pr-fix.yml` into
   `.github/workflows/`.
2. In `codex-pr-fix.yml` and `codex-sweep.yml`, replace the `>>> EDIT`
   verification command with this repo's build/test/lint (e.g.
   `npm ci && npm run lint && npm run type-check && npm run test`, or
   `pip install -r requirements.txt && pytest -q`). Add an
   `actions/setup-python` step too if it's a Python repo.
3. In `codex-sweep.yml`, set `EXTS` to this repo's source extensions.
4. Add repo secrets (Settings -> Secrets and variables -> Actions):
   - `OPENAI_API_KEY` (and optional `OPENAI_API_KEY_BACKUP`) -- Codex review.
   - `CLAUDE_CODE_OAUTH_TOKEN` -- Claude Opus auto-fix.
5. Settings -> Actions -> General: set workflow permissions to **Read and
   write**, and enable **Allow GitHub Actions to create and approve pull
   requests** (required by the weekly sweep's rolling PR).
6. Merge the workflows to the **default branch** -- `pull_request`,
   `schedule`, and `issue_comment` workflows only run from the default
   branch.

Reference instantiations live in the owner's repos: `generic-realtor`
(single Next.js app), `mirror-mirror` (Python + React monorepo),
`cca-f-prep` (Next.js app under `web/`). `lumivara-site` runs a more
advanced multi-provider variant.

## Notes / limitations

- Per-PR fixes push directly to the PR branch. The weekly sweep's fixes
  go to a rolling PR for review, never straight to the default branch.
- Commits pushed by the default `GITHUB_TOKEN` do not re-trigger other
  workflows, so a fix commit won't auto-fire a fresh review unless you
  wire a PAT. Acceptable for v1.
- PR diffs / repo source are wrapped in `<UNTRUSTED_DIFF>` /
  `<UNTRUSTED_SOURCE>` guards so the model treats them as evidence, not
  instructions.
