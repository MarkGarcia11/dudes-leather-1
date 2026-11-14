# Dudes Leather — Indian Trail, NC

Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion + Lenis + Drizzle/PostgreSQL.

## What was scraped from dudes-leather.com
- **177 products** (names, SKUs, brands, prices, sizes, descriptions, feature lists, every product photo) → `src/data/products.json`
- **All images** → `public/images/` (these ship with the project, so they deploy with it on GitHub/Vercel as-is):
  - `public/images/products/` – 489 product photos (WebP, max 1100px)
  - `public/images/gallery/` – the 25 photos from the old Gallery page
  - `public/images/site/` – hero, About, Contact and brand photos (+ friendly-named copies, `logo.png`)
- **Written content**: FAQ (the one real answer from the old site), About tagline, contact email, address, Facebook link.
  The old site's Home/About pages still contained template text (Lorem Ipsum, "Client Name"), which was deliberately **not** copied. Draft copy is marked `TODO: confirm with owner`.
- Old URLs redirect: `/product-page/*` → `/product/*`, `/category/*` → `/shop/<category>`, `/faqs` → `/faq`.

## Edit the basics
- `src/config/site.ts` — name, phone, email, hours, claims flag, shipping, tax, categories.
- `src/data/content.ts` — FAQ, timeline, values, testimonials (add real ones here), gallery captions.
- `src/lib/catalog.ts` — the only file that reads product data (swap for Shopify/Supabase later).

## Environment variables (all optional)
`DATABASE_URL` (required), `STRIPE_SECRET_KEY` (live card/Apple Pay/Google Pay checkout), `RESEND_API_KEY` + `MAIL_TO` + `MAIL_FROM` (form emails), `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_SITE_URL`.

## Run
`npm install && npx drizzle-kit push && npm run dev`
