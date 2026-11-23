# Loago Kevin Montsho ("Mov") — Personal Portfolio (`loagomov.blancsociety.co.uk`)

Dual-mode personal portfolio web application for **Loago Kevin Montsho ("Mov")** engineered with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, optimized for **Cloudflare Workers** deployment via OpenNext.

---

## 1. Dual-Mode Architecture

The entire portfolio is backed by a single shared TypeScript data source (`src/data/portfolio.ts`), ensuring zero content divergence between modes:

1. **Standard Editorial View (`/`):**
   - High-craft, immediately scannable landing page strictly inheriting the typography, color palette, spacing rhythm, and card border treatments of `blancsociety.co.uk`.
   - Features hero status badge ("Seeking Jan–Jun 2027 Attachment · Gaborone, Botswana"), flagship lakehouses, ventures, technical skills inventory, and direct contact form.
   - Sleek floating macOS notification pill in the bottom-right corner inviting visitors to launch Desktop Mode (`⌘D`).

2. **Interactive macOS Desktop View (`/os`):**
   - Custom desktop environment with tactile Blanc Society visual DNA (deep dark canvas, subtle accent gradient mesh, grain overlay, and light/dark wallpaper toggle).
   - Responsive Stage Manager sheet fallback on viewports `< 768px`.
   - Full keyboard navigation: `⌘D` to toggle between Standard and Desktop views, `⌘K` for Spotlight command search.

---

## 2. In-OS Applications

- **Finder (`Projects`):** Categorized sidebar (All Projects, Data & ML, Web & Product, Academic), stack tags (Databricks, PySpark, Delta Lake, Next.js, PyTorch), and Quick Look preview pane with architecture pipelines.
- **Safari (`In-OS Browser & GitHub Repo Viewer`):** Multi-tab browser that bypasses `X-Frame-Options: DENY` by custom rendering GitHub repos. Includes live GitHub REST API edge caching, interactive file/folder tree explorer, code inspector, and rendered `README.md`.
- **About Mov (`About This Mac`):** System specs card featuring BSc Business Intelligence & Data Analytics at BAC / University of Sunderland, Lean Six Sigma Yellow Belt, and TWS Foundry squad leadership.
- **Notes (`Research & Poetry`):** Two-folder sidebar separating Technical & Market Notes (Delta Medallion, Swin ViT, low-bandwidth LMS architecture) from Creative Writing / Poetry.
- **Mail (`Contact`):** Pre-addressed compose client wired to **Resend** via `/api/contact`, triggering an authentic macOS top-right push banner notification upon delivery.
- **Terminal (`CLI`):** Interactive zsh shell (`loago@mov-macbook ~ %`) supporting `help`, `whoami`, `ls projects`, `cat <slug>`, `skills`, `open safari <repo>`, `contact`, `theme`, `date`, `clear`, and easter egg `sudo`.
- **Trash (`Easter Egg`):** Humorous archived drafts (`final_final_v2_really_final.ipynb`, etc.) with reasons for disposal.
- **Audio Mini-Player:** Web Audio API synthesized 114 BPM Amapiano / Deep House drum and Rhodes loop with live equalizer visualizer.

---

## 3. Scripts & Cloudflare Deployment

```bash
# Start local development server
npm run dev

# Run TypeScript typecheck
npx tsc --noEmit

# Production Next.js build
npm run build:next

# Cloudflare OpenNext production build
npm run build

# Cloudflare preview
npm run preview

# Deploy to Cloudflare Workers (loagomov.blancsociety.co.uk)
npm run deploy
```
