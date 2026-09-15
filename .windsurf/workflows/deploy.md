---
description: How to deploy the site to Vercel production
---

## Deploy to Vercel Production

This project is **Git-connected to Vercel**. Every push to `main` on GitHub
(`FacelessAL/bluejayappliance.com`) automatically builds and deploys to production.
You do NOT need to run `vercel --prod`.

Production URL: https://www.bluejayappliance.com
(non-www 301-redirects to www; preview deploys are `noindex`)

## Workflow

// turbo
1. `git pull --ff-only origin main` — ALWAYS pull first. A GitHub Action ("BlueJay Bot")
   commits to `main` roughly twice a week to auto-publish blog articles
   (`src/data/articles.json`). If you skip this step your push will be rejected.
2. Make your changes.
3. `npm run lint` and `npx tsc --noEmit` — catch errors before Vercel does.
4. `npx next build` — confirm the production build succeeds locally.
5. `git add -A && git commit -m "..."`
6. `git push origin main` — this IS the deploy. Vercel picks it up within seconds.
7. Verify at https://www.bluejayappliance.com (build takes ~25s).
   Check status with `vercel ls bluejayappliance --prod` or the Vercel dashboard.

## Notes

- **Do not run `npm run generate`.** `intake-config.json` is stale (e.g. reviewCount 50 vs 89).
  `src/data/business.json` is hand-maintained and is the source of truth.
- Business hours live in `business.json` → `hours[]`. They feed the Contact page,
  the Resources article sidebar, and the JSON-LD schema. Edit them in one place only.
- Review count/rating live in `business.json` → `reviewCount` / `rating`.
- Blog articles are pre-written in `src/data/articles.json` with `published: false`.
  The bot flips them to `true` on schedule; do not publish them by hand unless intended.
- The local `.vercel/` link may be stale under a different Vercel login. That's fine —
  it isn't needed for deploys. Use `vercel api /v9/projects/bluejayappliance` if you
  need project metadata.
