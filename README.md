# Justin Axon Training & Consultancy — Website

Website for Justin Axon Training & Consultancy Ltd. Built on PayloadCMS with a Next.js frontend, deployed on Vercel with Neon for the database and Resend for transactional email.

---

## Infrastructure overview

| Concern | Service | Notes |
|---|---|---|
| Domain registrar | Namecheap | `justinaxontraining.co.uk` |
| DNS | Vercel DNS | Nameservers pointed to Vercel from Namecheap |
| Hosting | Vercel | Automatic deployments from `main` branch |
| Database | Neon (PostgreSQL) | Provisioned via the Vercel–Neon integration |
| File storage | Vercel Blob | Media uploads (images) stored here |
| Email | Resend | Contact form notifications + transactional mail |

### Domain setup

1. Domain is registered on **Namecheap**.
2. In Namecheap → Domain → Nameservers, the nameservers are set to Vercel's (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`).
3. DNS records are managed entirely inside the **Vercel dashboard** (Domains tab).
4. Vercel handles the SSL certificate automatically once DNS has propagated.

### Database setup (Neon)

Neon is connected via the **Vercel Postgres** integration in the Vercel dashboard (`Storage` → `Neon`). This provisions a Neon project and automatically injects `DATABASE_URL` (and its variants) into the Vercel environment.

The Payload adapter (`@payloadcms/db-vercel-postgres`) reads `DATABASE_URL` or `POSTGRES_URL`.

Schema migrations run automatically at deploy time via the `ci` script (`payload migrate && next build`). In local development, schema changes are pushed directly with `push: true` (set in `payload.config.ts` for non-production environments).

### Email setup (Resend)

1. Account at [resend.com](https://resend.com).
2. The sending domain (`justinaxontraining.co.uk`) is verified — Resend provides DNS records (DKIM/SPF/DMARC) that are added in the Vercel DNS dashboard.
3. `RESEND_API_KEY` is added to Vercel environment variables.
4. `EMAIL_FROM` should match a verified Resend domain (e.g. `noreply@justinaxontraining.co.uk`).
5. `CONTACT_NOTIFY_EMAIL` is the address that receives contact form submissions.

---

## Tech stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| CMS | PayloadCMS | 3.84.1 |
| Language | TypeScript | 5.7.3 |
| Styling | Tailwind CSS v4 | 4.2.x |
| UI components | shadcn/ui (Radix primitives) | — |
| Rich text | Lexical (`@payloadcms/richtext-lexical`) | 3.84.1 |
| Live preview | `@payloadcms/live-preview-react` | 3.84.1 |
| Forms | `@payloadcms/plugin-form-builder` | 3.84.1 |
| SEO | `@payloadcms/plugin-seo` | 3.84.1 |
| Package manager | pnpm | — |
| Runtime | React 19, Node.js ≥ 20 | — |

---

## Project structure

```
/
├── app/
│   ├── (frontend)/          # Public-facing website
│   │   ├── page.tsx          # Homepage (/)
│   │   ├── [...slug]/        # All other CMS pages
│   │   ├── training/[slug]/  # Individual training area pages
│   │   └── layout.tsx        # Root layout (font, footer, analytics)
│   └── (payload)/
│       ├── admin/            # PayloadCMS admin panel (/admin)
│       └── api/
│           └── seed/         # Initial data seeding endpoint
├── collections/              # Payload collection definitions
│   ├── Pages.ts
│   ├── TrainingAreas.ts
│   ├── Testimonials.ts
│   ├── Media.ts
│   └── Users.ts
├── globals/                  # Payload global definitions
│   ├── SiteSettings.ts
│   └── Navigation.ts
├── components/
│   ├── page-blocks-renderer.tsx   # Client component — renders all page blocks + live preview
│   ├── payload-page-renderer.tsx  # Server component — fetches data, passes to renderer
│   ├── contact-form.tsx           # Dynamic form renderer — driven by the CMS form definition
│   ├── header.tsx
│   └── footer.tsx
├── lib/
│   ├── seed-data.ts          # Seed content for all pages
│   └── site-data.ts          # Helper to fetch globals (settings, nav)
└── payload.config.ts         # Payload configuration (plugins, collections, email)
```

---

## Content model

### Collections

| Collection | Slug | Purpose |
|---|---|---|
| Pages | `pages` | All website pages, built from flexible blocks |
| Training Areas | `training-areas` | Each sector/audience Justin trains (Early Years, Primary, etc.) |
| Testimonials | `testimonials` | Client testimonials with `featured` flag |
| Media | `media` | Image uploads (stored on Vercel Blob) |
| Users | `users` | Admin panel users |
| Forms | `forms` | Contact form definition (created by the form builder plugin) |
| Form Submissions | `form-submissions` | Enquiries from the website contact form |

> `Forms` and `Form Submissions` are created automatically by `@payloadcms/plugin-form-builder`. The contact form definition is seeded via the seed endpoint. An email notification is sent to `CONTACT_NOTIFY_EMAIL` on every new submission.

### Globals

| Global | Slug | Purpose |
|---|---|---|
| Site Settings | `site-settings` | Logo, contact details, footer description, availability text, feedback form URL |
| Navigation | `navigation` | Header menu (with nested dropdowns) and footer link columns |

### Page blocks

Pages are built by combining blocks in the CMS. Available blocks:

| Block | Purpose |
|---|---|
| Hero | Full-width banner with background image, heading, buttons |
| Content Section | Heading + rich text body (H2–H4, bold, italic, lists, links) |
| Profile Intro | Side-by-side photo + rich text bio |
| Card Grid | Grid of icon cards with rich text body and optional links |
| Bullet List | Icon-prefixed list with optional pull-quote |
| Quote | Standalone pull-quote block |
| Call To Action | Centred heading + buttons section |
| Training Areas Feed | Auto-populated feed from the Training Areas collection |
| Testimonials Feed | Auto-populated feed from the Testimonials collection |
| Pricing Table | Pricing categories with items and additional costs |
| Contact Section | Contact form (linked to a CMS form) + contact details sidebar |
| Steps | Numbered step-by-step process block |

### SEO

Every page in the `pages` collection has a **SEO** tab powered by `@payloadcms/plugin-seo`. Fields:

- **Meta Title** — overrides the page title in search results (50–60 characters recommended). An auto-generate button fills it from the page title.
- **Meta Description** — shown in search results (140–160 characters). Fill this manually.
- **Meta Image** — optional OG image for social sharing; uses the Media collection.

The SEO tab also shows a live search-result preview as you type.

---

## Local development

### Prerequisites

- Node.js ≥ 20
- pnpm (`npm i -g pnpm`)
- A Neon database (or any PostgreSQL connection string)

### 1. Clone and install

```bash
git clone <repo-url>
cd just-axon-training
pnpm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon) |
| `PAYLOAD_SECRET` | Random secret ≥ 32 characters — used to sign JWTs |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for media uploads |
| `RESEND_API_KEY` | Resend API key |
| `EMAIL_FROM` | Verified sending address (e.g. `noreply@justinaxontraining.co.uk`) |
| `CONTACT_NOTIFY_EMAIL` | Address that receives contact form notifications |
| `NEXT_PUBLIC_SERVER_URL` | Full URL of the site (e.g. `http://localhost:3000` locally) |

### 3. Run the dev server

```bash
pnpm dev
```

- Website: [http://localhost:3000](http://localhost:3000)
- Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

On first run, Payload will push the database schema automatically (development only).

### 4. Create the first admin user

Visit `/admin` and follow the on-screen prompt to create the initial user.

### 5. Seed content

After creating the admin user, seed all pages, training areas, testimonials, navigation, site settings, and the contact form:

```
GET http://localhost:3000/api/seed?secret=<your-PAYLOAD_SECRET>
```

The seed endpoint is **create-only** — it never overwrites data that already exists in the database. Each section reports whether it was created or skipped. It is safe to run multiple times and safe to run against the production database.

The response JSON includes a `results` object showing what happened per section, e.g.:

```json
{
  "success": true,
  "results": {
    "trainingAreas": "Created 24",
    "testimonials": "Created 8",
    "siteSettings": "Created",
    "pages": "Created 7, skipped 0",
    "navigation": "Created",
    "contactForm": "Created"
  }
}
```

---

## CMS scripts

```bash
pnpm generate:types       # Regenerate payload-types.ts after schema changes
pnpm generate:importmap   # Regenerate the admin UI import map (run if richtext fields disappear)
pnpm migrate:create       # Create a new migration file
pnpm migrate              # Run pending migrations
```

Run `generate:types` and `generate:importmap` whenever collection/block schemas change, then restart the dev server.

---

## Contact form

The contact form is fully CMS-driven. Here is the end-to-end flow:

1. In the admin, a **Contact Section** block has a **Form** relation field. Select the "Contact Enquiry Form" (created by the seed) to link it.
2. The page is fetched server-side at depth 2, so the full form document — including its field definitions — is embedded in the block data passed to the client.
3. `components/contact-form.tsx` reads `form.fields` from the block and renders each field dynamically: `text`/`email` → Input, `textarea` → Textarea, `select` → Radix Select. Fields with `width: 50` are paired into a two-column grid.
4. On submit, the component POSTs directly to `POST /api/form-submissions` (the Payload REST endpoint created by the plugin) with `{ form: formId, submissionData: [{field, value}] }`.
5. A `formSubmissionOverrides.hooks.afterChange` hook in `payload.config.ts` fires and sends an email notification to `CONTACT_NOTIFY_EMAIL` via Resend.
6. All submissions are visible in the admin panel under **Form Submissions**.

**Managing form fields:** Edit the "Contact Enquiry Form" in the admin under **Forms**. Add, remove, or reorder fields and they will appear on the website immediately on next page load — no code changes needed.

**Existing installations:** If the contact page already existed before this feature was added, the Form relation on the Contact Section block will be empty. Go to Pages → Contact → Contact Section block → select "Contact Enquiry Form" → save.

---

## Deployment

### Automatic deploys

Vercel deploys automatically on every push to `main`. The build command is:

```bash
payload migrate && next build
```

This runs any pending database migrations before building, so schema changes are always applied before the new code goes live.

### Environment variables in Vercel

Set the same variables from `.env.example` in the Vercel project settings (`Settings` → `Environment Variables`). The Neon integration injects `DATABASE_URL` automatically — you do not need to copy it manually.

Set `NEXT_PUBLIC_SERVER_URL` to the production domain (`https://justinaxontraining.co.uk`) so live preview and email links resolve correctly.

### First deploy checklist

- [ ] Neon integration added in Vercel Storage tab
- [ ] All environment variables set in Vercel
- [ ] Domain added in Vercel Domains tab and nameservers updated in Namecheap
- [ ] Resend domain DNS records (DKIM/SPF/DMARC) added in Vercel DNS
- [ ] Deploy successful — visit `/admin` to create first user
- [ ] Seed content via `/api/seed?secret=<PAYLOAD_SECRET>`

---

## Making content changes

All content is managed through the admin panel at `/admin`. Key areas:

- **Pages** — edit any page by clicking it, then expand blocks in the Layout section. Use the Live Preview button (top right) to see changes before saving. Each page also has an **SEO** tab for meta title, description, and social image.
- **Training Areas** — add or edit sectors. Slug is auto-generated from the title on creation.
- **Testimonials** — mark testimonials as Featured to give them visual prominence on the testimonials page.
- **Forms** — edit the "Contact Enquiry Form" to add, remove, or reorder fields on the contact page. Changes are reflected immediately on the live site.
- **Form Submissions** — read-only view of all contact enquiries submitted via the website.
- **Site Settings** — logo, contact details, availability text, footer description.
- **Navigation** — header menu items and footer link columns.
