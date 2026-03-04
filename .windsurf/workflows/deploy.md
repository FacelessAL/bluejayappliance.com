---
description: How to deploy the site to Vercel production
---

## Deploy to Vercel Production

This project uses **Vercel CLI** for deployments — NOT auto-deploy from GitHub.

After committing and pushing changes to master, you MUST also deploy via CLI:

// turbo
1. Run `npx vercel --prod` from the project root to deploy to production

The production URL is: https://bluejayappliance.vercel.app

**IMPORTANT:** Pushing to GitHub alone does NOT trigger a Vercel deploy. You must always run the CLI command after pushing.
