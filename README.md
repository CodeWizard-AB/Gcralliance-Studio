# Gcralliance-Studio

> **Content Management Studio for the Global Cardiovascular Research Alliance website**
> Built with [Sanity](https://www.sanity.io/) v5 — the structured content platform powering all editorial content across the GCRA website.

---

## Table of Contents

- [Overview](#overview)
- [What This Studio Manages](#what-this-studio-manages)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Schema Reference](#schema-reference)
- [Studio Navigation Guide](#studio-navigation-guide)
- [Content Workflow](#content-workflow)
- [ISR Revalidation & Webhooks](#isr-revalidation--webhooks)
- [ImageKit Media Integration](#imagekit-media-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

---

## Overview

This repository is the **Sanity Studio** for the Global Cardiovascular Research Alliance (GCRA) website. It is a standalone content management interface that runs inside the Next.js frontend at `/studio` — meaning editors access it directly on the live website domain without needing a separate login or URL.

The Studio gives non-technical team members full control over all website content — research publications, events, blog posts, ambassador profiles, team members, and page-level content — through a structured, user-friendly editing interface. No developer is needed for routine content updates.

The frontend website (separate repository) consumes all content from this Studio via the [Sanity Content Lake](https://www.sanity.io/docs/datastore) using GROQ queries over the Sanity CDN API.

---

## What This Studio Manages

| Content Type              | Description                                           | URL on Website                  |
| ------------------------- | ----------------------------------------------------- | ------------------------------- |
| **Home Page**             | Hero, stats strip, mission section, CTA banners       | `/`                             |
| **About Page**            | Mission, vision, values, history timeline, partners   | `/about`                        |
| **Membership Page**       | Tiers, training modules, testimonials, FAQ            | `/membership`                   |
| **Research Publications** | Peer-reviewed papers, abstracts, PDFs, authors        | `/research`, `/research/[slug]` |
| **Events**                | Conferences, workshops, webinars, registration links  | `/events`, `/events/[slug]`     |
| **Blog Posts**            | Articles, research spotlights, community news         | `/blog`, `/blog/[slug]`         |
| **Ambassadors**           | Country ambassadors with map coordinates              | `/ambassadors`                  |
| **Team Members**          | Leadership and staff profiles                         | `/about`                        |
| **Authors**               | Blog post author profiles                             | `/blog/[slug]`                  |
| **Categories**            | Taxonomy for blog and research                        | Filters on `/blog`, `/research` |
| **Site Settings**         | Org name, contact details, social links, SEO defaults | Global (all pages)              |
| **Navigation**            | Navbar links, footer columns, CTA button              | Global (all pages)              |

---

## Project Structure

```
Gcralliance-Studio/
│
├── sanity.config.ts              # Root Studio configuration — registers all schemas,
│                                 # plugins, and desk structure
│
├── sanity/
│   ├── structure/
│   │   └── index.ts              # Custom Studio sidebar navigation structure
│   │
│   ├── schemas/
│   │   ├── _shared.ts            # Shared field helpers and reusable object types
│   │   │                         # (CTA, SEO, StatItem, Testimonial, FAQ, etc.)
│   │   │
│   │   ├── documents/
│   │   │   ├── index.ts          # All document schemas:
│   │   │   │                     # post, research, event, ambassador,
│   │   │   │                     # teamMember, category, author
│   │   │   └── singletons.ts     # Singleton page schemas:
│   │   │                         # homePage, aboutPage, membershipPage,
│   │   │                         # siteSettings, navigationSettings
│   │   │
│   │   └── objects/              # (Optional) standalone object schema files
│   │
│   └── lib/
│       └── fetch.ts              # Server-side Sanity fetch helper with cache tags
│
├── src/
│   ├── app/
│   │   ├── studio/
│   │   │   └── [[...tool]]/
│   │   │       └── page.tsx      # Next.js route that serves the Studio at /studio
│   │   │
│   │   └── api/
│   │       └── sanity/
│   │           └── revalidate/
│   │               └── route.ts  # Webhook endpoint for ISR cache revalidation
│   │
│   └── lib/
│       └── sanity/
│           └── index.ts          # Sanity client instances + all GROQ queries
│                                 # consumed by the Next.js frontend
│
├── .env.example                  # Template for required environment variables
├── .env.local                    # Local secrets — git-ignored, never commit
└── package.json
```

---

## Prerequisites

Before setting up, ensure you have:

- **Node.js** `v18.17.0` or later — check with `node --version`
- **pnpm** `v8` or later — install with `npm install -g pnpm`
- A **Sanity account** — create one free at [sanity.io](https://www.sanity.io/)
- Access to the **GCRA Sanity project** — request from the project lead
- **Git** installed and configured

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/Gcralliance-Studio.git
cd Gcralliance-Studio
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local` and add the required values — see [Environment Variables](#environment-variables) for details.

### 4. Add CORS origin in Sanity

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select the **GCRA** project
3. Navigate to **API → CORS Origins**
4. Click **Add CORS origin**
5. Add `http://localhost:3000` with **Allow credentials: ✓**

### 5. Start the development server

```bash
pnpm dev
```

The Studio is available at: **http://localhost:3000/studio**

Log in with your Sanity account. On first run, you will be prompted to authenticate via the browser.

---

## Environment Variables

Create a `.env.local` file in the project root. These variables are required for the Studio and frontend to work:

```env
# ── Sanity (PUBLIC — safe in browser) ────────────────────────────────────────
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production

# ── Sanity (PRIVATE — server only, never commit) ──────────────────────────────
# Viewer token — for draft previews
# Get from: sanity.io/manage → API → Tokens → Add API token (Viewer)
SANITY_API_READ_TOKEN=sk...

# Editor token — for server-side content writes
# Get from: sanity.io/manage → API → Tokens → Add API token (Editor)
SANITY_API_TOKEN=sk...

# Webhook secret — used to validate incoming revalidation webhooks
# Generate: openssl rand -base64 32
SANITY_WEBHOOK_SECRET=your_random_secret_here

# ── App ───────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEPLOY_ENV=development
```

> ⚠️ **Important:** `.env.local` is listed in `.gitignore` and must **never** be committed to Git. Share credentials securely with team members via a password manager.

To get your **Project ID**:

- Go to [sanity.io/manage](https://www.sanity.io/manage) → select the GCRA project → the Project ID is shown at the top

To generate **API tokens**:

- Go to [sanity.io/manage](https://www.sanity.io/manage) → GCRA project → **API → Tokens → Add API token**

---

## Available Scripts

| Script           | Command           | Description                              |
| ---------------- | ----------------- | ---------------------------------------- |
| Start dev server | `pnpm dev`        | Starts Next.js with Studio at `/studio`  |
| Build            | `pnpm build`      | Production build                         |
| Start production | `pnpm start`      | Serves the production build              |
| Lint             | `pnpm lint`       | ESLint check across all files            |
| Type check       | `pnpm type-check` | TypeScript compilation check (no output) |

---

## Schema Reference

### Document Types

These are the main content types editors create and manage in the Studio. Each document type has its own list view in the Studio sidebar.

#### `post` — Blog Post

| Field           | Type                     | Required | Notes                              |
| --------------- | ------------------------ | -------- | ---------------------------------- |
| `title`         | String                   | ✓        | Post headline                      |
| `slug`          | Slug                     | ✓        | Auto-generated from title          |
| `status`        | Select                   | ✓        | `draft` or `published`             |
| `publishedAt`   | Datetime                 |          | Set when publishing                |
| `author`        | Reference → `author`     | ✓        |                                    |
| `categories`    | Reference[] → `category` |          |                                    |
| `tags`          | String[]                 |          | Tag array                          |
| `excerpt`       | Text                     |          | Max 200 chars — used in card views |
| `featuredImage` | Image                    |          | With alt text                      |
| `body`          | Portable Text            | ✓        | Supports images and callout blocks |
| `readingTime`   | Number                   |          | Minutes — auto-estimated if blank  |
| `relatedPosts`  | Reference[] → `post`     |          | Max 3                              |
| `seo`           | SEO object               |          | Meta title, description, OG image  |

#### `research` — Research Publication

| Field             | Type                     | Required | Notes                                 |
| ----------------- | ------------------------ | -------- | ------------------------------------- |
| `title`           | String                   | ✓        | Full publication title                |
| `slug`            | Slug                     | ✓        | Auto-generated                        |
| `researchStatus`  | Select                   | ✓        | `ongoing` or `completed`              |
| `categories`      | Reference[] → `category` |          |                                       |
| `authors`         | ResearchAuthor[]         | ✓        | Name, institution, corresponding flag |
| `abstract`        | Text                     | ✓        | 300–500 words                         |
| `keyFindings`     | String[]                 |          | 3–5 plain-language findings           |
| `pdfFile`         | File                     |          | Full paper PDF upload                 |
| `pageCount`       | Number                   |          |                                       |
| `journal`         | String                   |          | Journal / publication name            |
| `doi`             | String                   |          | e.g. `10.1234/example.2024`           |
| `citation`        | Text                     |          | APA format citation                   |
| `relatedResearch` | Reference[] → `research` |          | Max 3                                 |
| `seo`             | SEO object               |          |                                       |

#### `event` — Event

| Field                   | Type          | Required | Notes                                               |
| ----------------------- | ------------- | -------- | --------------------------------------------------- |
| `title`                 | String        | ✓        |                                                     |
| `slug`                  | Slug          | ✓        |                                                     |
| `eventType`             | Select        | ✓        | conference, workshop, webinar, regional, onboarding |
| `startDate`             | Datetime      | ✓        |                                                     |
| `endDate`               | Datetime      |          |                                                     |
| `timezone`              | String        |          | e.g. `GMT`, `WAT`, `EST`                            |
| `isOnline`              | Boolean       |          | Hides location fields when checked                  |
| `location`              | Object        |          | venueName, city, country, address                   |
| `shortDescription`      | Text          |          | Max 150 chars — used in cards                       |
| `description`           | Portable Text | ✓        | Full event description                              |
| `speakers`              | Speaker[]     |          | Name, title, photo, bio                             |
| `registrationUrl`       | URL           |          | Calendly or custom form URL                         |
| `isMembersOnly`         | Boolean       |          |                                                     |
| `isFree`                | Boolean       |          |                                                     |
| `travelGrantsAvailable` | Boolean       |          |                                                     |

#### `ambassador` — Ambassador

| Field             | Type    | Required | Notes                                      |
| ----------------- | ------- | -------- | ------------------------------------------ |
| `name`            | String  | ✓        |                                            |
| `photo`           | Image   | ✓        | Used in map popup and directory card       |
| `role`            | String  |          | e.g. Country Ambassador                    |
| `bio`             | Text    |          | Max 150 words                              |
| `contactEmail`    | String  |          | Displayed publicly                         |
| `country`         | String  | ✓        |                                            |
| `region`          | Select  | ✓        | West Africa, East Africa, South Asia, etc. |
| `coordinates`     | Object  |          | `lat` and `lng` — used for Mapbox map pin  |
| `ambassadorSince` | Date    |          |                                            |
| `isActive`        | Boolean |          | Uncheck to hide without deleting           |
| `displayOrder`    | Number  |          | Lower = appears first in directory         |

#### `teamMember` — Team Member

| Field          | Type    | Required | Notes                                                        |
| -------------- | ------- | -------- | ------------------------------------------------------------ |
| `name`         | String  | ✓        |                                                              |
| `title`        | String  | ✓        | Job title                                                    |
| `department`   | Select  |          | Leadership, Research, Programmes, Operations, Communications |
| `bio`          | Text    |          | Max 200 words — shown on About page                          |
| `photo`        | Image   | ✓        | Headshot                                                     |
| `email`        | String  |          |                                                              |
| `location`     | String  |          | e.g. London, UK                                              |
| `linkedin`     | URL     |          |                                                              |
| `displayOrder` | Number  |          | Lower = appears first                                        |
| `isVisible`    | Boolean |          | Uncheck to hide from website                                 |

#### `category` — Category

Used to tag blog posts, research publications, and events for filtering.

| Field   | Type   | Notes                                             |
| ------- | ------ | ------------------------------------------------- |
| `name`  | String | e.g. Epidemiology                                 |
| `slug`  | Slug   | Auto-generated                                    |
| `type`  | Select | `posts`, `research`, `events`, `all`              |
| `color` | Select | `blue`, `green`, `purple`, `amber`, `red`, `teal` |

#### `author` — Blog Author

| Field      | Type   | Notes                                  |
| ---------- | ------ | -------------------------------------- |
| `name`     | String | Full name                              |
| `slug`     | Slug   | Auto-generated                         |
| `photo`    | Image  | Profile photo                          |
| `title`    | String | e.g. Senior Epidemiologist, LSHTM      |
| `bio`      | Text   | Max 100 words — shown below blog posts |
| `linkedin` | URL    |                                        |
| `twitter`  | URL    |                                        |

---

### Singleton Documents

These documents exist exactly **once** in the dataset. They are accessed directly from the Pages and Settings sections in the Studio sidebar — not as a list.

| Singleton            | Studio Location          | Controls                                                                               |
| -------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| `homePage`           | Pages → Home Page        | Hero, stats, featured research, mission section, membership banner, newsletter section |
| `aboutPage`          | Pages → About Page       | Hero, mission & vision, core values, history timeline, partners, join CTA              |
| `membershipPage`     | Pages → Membership Page  | Hero, tier cards, training modules, testimonials, FAQ, apply CTA                       |
| `siteSettings`       | Settings → Site Settings | Org name, contact details, office addresses, social links, default SEO                 |
| `navigationSettings` | Settings → Navigation    | Navbar links, dropdowns, footer columns, footer tagline, legal links                   |

---

### Reusable Object Types

These are building blocks used inside documents and singletons. They do not appear as their own list in the Studio.

| Object           | Used in                      | Description                                               |
| ---------------- | ---------------------------- | --------------------------------------------------------- |
| `cta`            | homePage, navigationSettings | Button label, URL, variant, new tab toggle                |
| `seo`            | All document types           | Meta title, meta description, OG image, noIndex           |
| `statItem`       | homePage                     | Value, label, sub-label (e.g. "2,400+ / Active Members")  |
| `timelineItem`   | aboutPage                    | Year, title, description for the history timeline         |
| `partner`        | aboutPage                    | Name, logo, URL, partnership type                         |
| `testimonial`    | membershipPage               | Quote, attribution, member since, photo                   |
| `faqItem`        | membershipPage               | Question and answer                                       |
| `membershipTier` | membershipPage               | Name, description, features list, eligibility, CTA        |
| `trainingModule` | membershipPage               | Title, description, duration, availability, platform      |
| `socialLinks`    | siteSettings                 | LinkedIn, Twitter/X, Facebook, YouTube, ResearchGate URLs |
| `office`         | siteSettings                 | Office name, address, isPrimary flag                      |
| `speaker`        | event                        | Name, title, photo, bio                                   |
| `researchAuthor` | research                     | Name, institution, isCorresponding flag                   |
| `calloutBlock`   | post, event (rich text)      | Type (info/warning/success/danger) and text               |

---

## Studio Navigation Guide

The Studio sidebar is organised into logical sections for editors:

```
GCRA Content
│
├── 📄 Pages
│   ├── 🏠 Home Page        — edit hero, stats, mission section, banners
│   ├── ℹ️  About Page       — edit mission, team section, timeline, partners
│   └── 👥 Membership Page  — edit tiers, training modules, FAQ
│
├── ✍️  Blog Posts           — create and manage blog articles
├── 🔬 Research Publications — manage research publications and PDFs
├── 📅 Events               — create and manage events
│
├── 🌍 Ambassadors          — manage ambassador profiles and map coordinates
├── 👤 Team Members         — manage leadership and staff profiles
├── 🖊️  Authors              — manage blog author profiles
│
├── 🏷️  Categories           — manage blog, research, and event categories
│
└── ⚙️  Settings
    ├── 🌐 Site Settings     — org details, contact info, social links
    └── 🧭 Navigation        — navbar links, footer columns
```

---

## Content Workflow

### Publishing a blog post

1. Open **Blog Posts** in the sidebar
2. Click **New Blog Post** (top right)
3. Fill in: Title → click **Generate** on the slug field → select an Author → set Categories
4. Write the Excerpt (max 200 chars — this appears in card views and as the default meta description)
5. Upload a Featured Image and fill in the Alt Text field
6. Write the article in the Body field
7. Scroll to **SEO** and fill in a custom meta title and description if needed
8. Change Status from `Draft` to `Published`
9. Set the Published Date
10. Click **Publish** (top right)

The website will automatically update within 60 seconds via the webhook revalidation system.

### Adding a research publication

1. Open **Research Publications** → **New Research Publication**
2. Fill in Title, Abstract, and Key Findings
3. Add all Authors (mark the corresponding author)
4. Upload the PDF in the **Full Paper** field
5. Set Research Status (`Ongoing` or `Completed`)
6. Set Categories
7. Add DOI and journal name if available
8. Set Status to `Published` and click **Publish**

### Adding a new event

1. Open **Events** → **New Event**
2. Fill in Title, Event Type, Start Date/Time, and Timezone
3. Toggle **Online Event** if applicable — the location fields will hide automatically
4. Fill in Short Description (shown in cards) and Full Description (shown on detail page)
5. Add Speakers if applicable
6. Paste the Registration URL (Calendly link or custom form)
7. Set Status to `Published` and click **Publish**

### Updating navigation links

1. Go to **Settings → Navigation**
2. Edit the **Main Navigation Links** array to add, remove, or reorder links
3. Add dropdown items to any link by expanding it and adding Dropdown Items
4. Update the **Footer Link Columns** array for footer navigation
5. Click **Publish**

---

## ISR Revalidation & Webhooks

The website uses **Incremental Static Regeneration (ISR)** with on-demand revalidation. When you publish or update content in the Studio, a Sanity webhook automatically triggers a cache flush on the Next.js frontend so the updated content appears on the live site within seconds — without a full redeploy.

### How it works

```
Editor publishes in Studio
        ↓
Sanity sends POST request to webhook URL
        ↓
/api/sanity/revalidate validates the request secret
        ↓
Next.js calls revalidateTag('posts') / revalidatePath('/blog')
        ↓
Affected pages rebuild in the background
        ↓
Updated content served to visitors
```

### Cache tags per document type

| Document Type        | Cache Tags Invalidated    |
| -------------------- | ------------------------- |
| `post`               | `posts`, `blog`           |
| `research`           | `research`                |
| `event`              | `events`                  |
| `ambassador`         | `ambassadors`             |
| `teamMember`         | `team`, `about`           |
| `homePage`           | `home`                    |
| `aboutPage`          | `about`                   |
| `membershipPage`     | `membership`              |
| `siteSettings`       | `site-settings`, `layout` |
| `navigationSettings` | `navigation`, `layout`    |

### Setting up the webhook (production)

1. Go to [sanity.io/manage](https://www.sanity.io/manage) → GCRA project → **API → Webhooks**
2. Click **Create webhook**
3. Configure:
   - **Name:** ISR Revalidation
   - **URL:** `https://yourdomain.com/api/sanity/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** _(leave blank — triggers on all document types)_
   - **Projection:** _(leave blank)_
   - **HTTP method:** POST
   - **HTTP Headers:** _(none needed)_
   - **Secret:** paste the value of `SANITY_WEBHOOK_SECRET` from your environment variables
4. Click **Save**

---

## ImageKit Media Integration

All images uploaded through the Studio are stored in **ImageKit** and delivered via their global CDN. ImageKit handles resizing, format conversion (WebP/AVIF), and optimisation automatically via URL transforms — no image processing happens on the server.

### ImageKit folder structure

All Studio uploads are routed to the following folder hierarchy based on the `Media Type` field:

```
ghro/
├── production/          ← live website uploads
│   ├── site/            ← logos, favicons, OG images
│   │   ├── logos/
│   │   └── og/
│   ├── team/            ← staff and leadership headshots
│   ├── ambassadors/     ← ambassador photos, organised by region
│   │   ├── west-africa/
│   │   ├── east-africa/
│   │   └── ...
│   ├── blog/            ← blog post thumbnails and hero images
│   │   ├── 2025/
│   │   └── 2024/
│   ├── research/        ← research publication cover images
│   ├── events/          ← event banners and speaker photos
│   │   └── banners/
│   ├── partners/        ← partner and affiliate logos
│   └── membership/      ← membership tier and testimonial images
│
├── staging/             ← preview/staging environment uploads
└── dev/                 ← local development uploads
```

> ⚠️ **Note:** Research PDFs and application documents are **not** stored in ImageKit. PDFs upload directly to AWS S3 (HIPAA-eligible storage with a Business Associate Agreement). Only images go through ImageKit.

### Naming convention

All folder names and filenames use:

- **Lowercase only**
- **Hyphens instead of spaces** — `west-africa/` not `West Africa/`
- **No special characters**
- **Descriptive names** — `helena-whitmore.jpg` not `IMG_4521.jpg`

---

## Deployment

The Studio is deployed as part of the Next.js website on **Vercel**. There is no separate Studio deployment — it is served from the same origin as the frontend at `/studio`.

### Production deployment

Deployments are triggered automatically on every merge to `main` via the GitHub Actions CI/CD pipeline.

Before deploying to production:

1. Ensure all required environment variables are set in the **Vercel dashboard** (not just `.env.local`)
2. Confirm the production domain is added to **CORS Origins** in [sanity.io/manage](https://www.sanity.io/manage)
3. Confirm the production webhook URL is configured (see [ISR Revalidation](#isr-revalidation--webhooks))

### Required Vercel environment variables

Set these in **Vercel Dashboard → Project → Settings → Environment Variables**:

| Variable                        | Environment                                    |
| ------------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Production, Preview, Development               |
| `NEXT_PUBLIC_SANITY_DATASET`    | Production, Preview, Development               |
| `SANITY_API_READ_TOKEN`         | Production, Preview                            |
| `SANITY_API_TOKEN`              | Production                                     |
| `SANITY_WEBHOOK_SECRET`         | Production                                     |
| `NEXT_PUBLIC_APP_URL`           | Production, Preview                            |
| `NEXT_PUBLIC_DEPLOY_ENV`        | Production (`production`), Preview (`staging`) |

---

## Contributing

### Branch strategy

| Branch                  | Purpose                                   |
| ----------------------- | ----------------------------------------- |
| `main`                  | Production — auto-deploys to live site    |
| `dev`                   | Active development — merges go here first |
| `feature/schema-name`   | Schema additions and changes              |
| `fix/issue-description` | Bug fixes                                 |

### Making schema changes

Schema changes affect the data structure that editors work with. Follow this process:

1. **Create a feature branch** from `dev`:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/add-webinar-schema
   ```

2. **Make your changes** to the relevant schema files in `sanity/schemas/`

3. **Test locally** — start `pnpm dev` and verify the Studio renders correctly with no console errors

4. **Check for breaking changes** — if you are removing or renaming a field that already has data in production, coordinate with the content team before merging to avoid data loss

5. **Open a Pull Request** to `dev` with a clear description of what changed and why

6. **After merge to `main`** — if you added new field types or changed field names, notify the content team so they can update any existing documents

### Code style

- All schema files use TypeScript with Sanity's `defineType` and `defineField` helpers
- Field descriptions should be written in plain English for editors — not developers
- Every image field must include a nested `alt` text field for WCAG compliance
- Preview functions should return a meaningful `title` and `subtitle` so editors can identify documents in list views

---

## Troubleshooting

### Studio shows blank page at `/studio`

1. Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly in `.env.local`
2. Check that `http://localhost:3000` is added to CORS Origins at sanity.io/manage with **Allow credentials: ✓**
3. Open browser DevTools → Console and check for network errors
4. Try a hard refresh: `Ctrl+Shift+R` / `Cmd+Shift+R`

### "Unauthorized" error in Studio

1. Log out of [sanity.io](https://www.sanity.io) in your browser and log back in
2. Ensure your Sanity account has access to the GCRA project — ask the project lead to add you
3. Re-add `localhost:3000` to CORS Origins if it was accidentally removed

### Images not loading on the frontend

1. Confirm `cdn.sanity.io` is added to `next.config.ts` under `images.remotePatterns`
2. Check that the image field includes the `asset->` projection in the GROQ query
3. For ImageKit images, confirm the `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` env var is set

### Webhook not triggering page updates

1. Check that `SANITY_WEBHOOK_SECRET` in `.env.local` matches the secret set in the Sanity dashboard webhook
2. Check Vercel function logs for errors at `/api/sanity/revalidate`
3. Confirm the webhook URL in Sanity uses `https://` — not `http://`
4. Test the webhook manually: Sanity dashboard → API → Webhooks → click the webhook → **Test**

### Content published but website not updating

1. ISR revalidation can take up to 60 seconds — wait and hard refresh
2. Check the webhook is configured and enabled (green dot in Sanity dashboard)
3. If revalidation is still not working, trigger a manual Vercel redeploy as a fallback

### TypeScript errors in schema files

1. Run `pnpm type-check` to see all errors at once
2. Ensure all `defineField` calls have a `name` and `type` — these are required
3. For reference fields, confirm the target document type slug is spelled correctly in `to: [{ type: 'post' }]`

---

## License

This repository is private and proprietary. All rights reserved — Global Cardiovascular Research Alliance © 2025.

---

_Maintained by the GCRA engineering team. For content questions, contact the editorial team. For technical issues, open an issue in this repository._
