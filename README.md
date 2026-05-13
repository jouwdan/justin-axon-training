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
│           └── seed/         # One-time data seeding endpoint
├── collections/              # Payload collection definitions
│   ├── Pages.ts
│   ├── TrainingAreas.ts
│   ├── Testimonials.ts
│   ├── Media.ts
│   ├── Users.ts
│   └── ContactSubmissions.ts
├── globals/                  # Payload global definitions
│   ├── SiteSettings.ts
│   └── Navigation.ts
├── components/
│   ├── page-blocks-renderer.tsx   # Client component — renders all page blocks + live preview
│   ├── payload-page-renderer.tsx  # Server component — fetches data, passes to renderer
│   ├── header.tsx
│   └── footer.tsx
├── lib/
│   ├── seed-data.ts          # Seed content for all pages
│   └── site-data.ts          # Helper to fetch globals (settings, nav)
└── payload.config.ts         # Payload configuration
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
| Contact Submissions | `contact-submissions` | Read-only form submissions from the website |

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
| Contact Section | Contact form + contact details sidebar |
| Steps | Numbered step-by-step process block |

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

After creating the admin user, seed all pages, training areas, testimonials, navigation and site settings:

```
GET http://localhost:3000/api/seed?secret=<your-PAYLOAD_SECRET>
```

This is an upsert — safe to run multiple times. It will not re-create training areas or testimonials if they already exist.

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

- **Pages** — edit any page by clicking it, then expand blocks in the Layout section. Use the Live Preview button (top right) to see changes before saving.
- **Training Areas** — add or edit sectors. Slug is auto-generated from the title on creation.
- **Testimonials** — mark testimonials as Featured to give them visual prominence on the testimonials page.
- **Site Settings** — logo, contact details, availability text, footer description.
- **Navigation** — header menu items and footer link columns.
