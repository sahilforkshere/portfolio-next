# Deploying to Vercel

## Prerequisites

- A [GitHub](https://github.com) account (you already have one)
- A [Vercel](https://vercel.com) account — sign up free with your GitHub

---

## Step 1 — Push the project to GitHub

```bash
# Inside /Users/sahil/Documents/portfolio-next
git init
git add .
git commit -m "initial portfolio commit"

# Create a new repo on github.com (name it: portfolio-next)
# Then link and push:
git remote add origin https://github.com/sahilforkshere/portfolio-next.git
git branch -M main
git push -u origin main
```

---

## Step 2 — Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select **sahilforkshere/portfolio-next**
4. Vercel auto-detects Next.js — no framework config needed
5. Click **Deploy**

That's it. First deploy takes ~60 seconds.

---

## Step 3 — Set your custom domain (optional)

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `sahilpal.dev`)
3. Add the two DNS records shown to your domain registrar
4. HTTPS is provisioned automatically

---

## Environment variables

This project currently has **no required environment variables**.

If you later add Formspree / EmailJS for the contact form:

1. Vercel dashboard → **Settings → Environment Variables**
2. Add `NEXT_PUBLIC_FORMSPREE_ID` (or similar)
3. Redeploy — Vercel picks up new env vars automatically

---

## Automatic redeploys

Every `git push` to `main` triggers a new production deploy.
Pull requests get a unique preview URL automatically.

```bash
# Normal workflow after initial setup:
git add .
git commit -m "update portfolio"
git push          # → Vercel deploys in ~45 seconds
```

---

## Build checks (run locally before pushing)

```bash
npm run build     # must pass with 0 errors
npm run lint      # must pass
```

Fix any TypeScript or ESLint errors before pushing — Vercel will fail the deploy if `npm run build` fails.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails with `window is not defined` | Wrap the code in `useEffect` or use `dynamic({ ssr: false })` |
| Images not loading | Use `next/image` or add the domain to `next.config.js` `images.domains` |
| Three.js bundle too large | Already handled via `dynamic({ ssr: false })` — Vercel splits it automatically |
| Contact form not sending | Wire up [Formspree](https://formspree.io) or [Resend](https://resend.com) and add the env var |
