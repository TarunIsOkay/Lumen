# Contributing to Lumen

Thanks for stopping by. Lumen is a real SaaS skeleton — the bar is high and the process is light.

## Quick start

```bash
npm ci
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

## Conventions

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). They power auto-generated release notes.
- **Branches:** `feat/<slug>`, `fix/<slug>` from `main`. One PR per concern.
- **PRs:** Use the template. Include mobile + desktop screenshots for UI changes.

## Where to help

- Issues labeled `good first issue` or `help wanted`
- Discussions → Ideas (upvote before building)
- Roadmap is the Projects board: **Lumen Roadmap**

## Security

Never commit `.env`, tokens, or `service_role` keys. See [SECURITY.md](./SECURITY.md).
