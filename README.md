# United Karnakod — GSB Community Platform

A React single-page application for the GSB (Gaud Saraswat Brahmin) community of Karanakodam: community organizations, temple information, upcoming events, a service directory, and a live news ticker — all rendered from plain Excel workbooks rather than hand-edited source code.

**Live:** deployed on Vercel, auto-deployed on every push to `main`.

---

## Table of Contents

1. [Architecture at a Glance](#architecture-at-a-glance)
2. [Tech Stack](#tech-stack)
3. [The Excel-Driven Content Pipeline](#the-excel-driven-content-pipeline)
4. [Project Structure](#project-structure)
5. [Routes](#routes)
6. [Getting Started](#getting-started)
7. [Editing Site Content (No Code Required)](#editing-site-content-no-code-required)
8. [Adding a New Data Source](#adding-a-new-data-source)
9. [Deployment](#deployment)
10. [Favicon & App Icons](#favicon--app-icons)
11. [Known Gaps](#known-gaps)

---

## Architecture at a Glance

This is a fully static React SPA — there is no backend, no database, and no runtime API calls for content. Every page is a static bundle served from a CDN (Vercel). Content that would normally live in a database instead lives in versioned `.xlsx` workbooks, converted to static JS at **build time**:

```
data-sources/*.xlsx                    (source of truth — edited by hand in Excel)
        │
        ▼  npm start / npm run build  →  runs scripts/sync-data.js
src/data/generated*.js                 (auto-generated — never edit by hand)
        │
        ▼  imported by
src/data/{communities,events,communityServices,temples,news}.js
        │   (shape/derive the generated rows into what components expect —
        │    numbered-list parsing, date filtering, icon lookup, etc.)
        ▼
src/components/*  and  src/pages/*     (render only — no data-fetching logic)
```

This design means:
- **A content editor never touches JS.** They edit an Excel file, and the next build picks it up.
- **The generated files are deterministic and diffable** — `sync-data.js` only rewrites a generated file if its content actually changed, so unrelated builds don't produce noisy diffs.
- **Every data source degrades gracefully.** If a workbook is missing, the sync step logs it and leaves the previously generated file untouched — a missing spreadsheet never breaks a build.

## Tech Stack

| Concern | Choice |
|---|---|
| UI framework | React 18.2 |
| Routing | React Router DOM 6.20 (client-side, nested routes under `/community/*`) |
| Animation | Framer Motion 10.16 |
| Icons | react-icons 4.12 (`fa`, `gi` subsets) |
| Build tooling | Create React App / `react-scripts` 5.0.1 (Webpack 5, Babel, Jest under the hood) |
| Content source | Hand-rolled `.xlsx` reader (`scripts/lib/xlsxReader.js`) — zero runtime or build dependency on any spreadsheet library |
| Hosting | Vercel — static hosting + global CDN, SPA rewrite via `vercel.json` |
| Fonts | Playfair Display (headings) + Poppins (body), loaded from Google Fonts |
| Styling | Plain CSS with custom properties (`src/index.css`), no CSS-in-JS, no Tailwind |

There is no server, no environment variables, and no secrets required to run or build this project.

## The Excel-Driven Content Pipeline

Five workbooks in `data-sources/` currently drive the site. Each is registered as one entry in `scripts/sync-data.js`, which is the single place both the workbook filename and its column mapping are defined.

| Source (`data-sources/*.xlsx`) | Generated file | Feeds | Columns (Excel header → generated field) |
|---|---|---|---|
| `organization_details.xlsx` | `src/data/generatedOrganizations.js` | Community directory (`/community`) | `org_id`, `name`, `description`, `registration`, `location`, `official_contact_phone`, `official_email`, `organization_purpose`, `founded_on`, `board_members`, `member_description` |
| `upcoming_events.xlsx` | `src/data/generatedEvents.js` | Home page + `/events` calendar | `event_id`, `title`, `description`, `date`, `time`, `location`, `category` |
| `community_services.xlsx` | `src/data/generatedServices.js` | Service directory (`/services`) | `service_id`, `name`, `category`, `type`, `summary`, `services`, `location`, `availability`, `contact_phone`, `contact_email`, `featured`, `verified` |
| `temples.xlsx` | `src/data/generatedTemples.js` | Sacred Temples section + `/temples/:id` | `temple_id`, `slug`, `name`, `location`, `description`, `priests`, `poojas` |
| `news.xlsx` | `src/data/generatedNews.js` | Scrolling news ticker on the home page | `news_item` (one row per headline) |

Notes on conventions used across every source:

- **Multi-value columns** (`board_members`, `services`, `priests`, `poojas`, etc.) use a simple numbered format so a single Excel cell can hold a list: `1) First item 2) Second item 3) Third item`. This is parsed by the shared helper `src/data/lib/textLists.js`.
- **Boolean columns** (`featured`, `verified`) accept `yes` / `true` / `1` (case-insensitive) as true; anything else is false.
- **Dates** (`date`, `founded_on`) accept either a real Excel date cell or a plain `YYYY-MM-DD` string — `scripts/lib/xlsxReader.js#excelDate` handles both.
- **Events are date-filtered at render time, not at build time.** `src/data/events.js` compares each event's date against the visitor's current date on every page load, so an event silently drops off the "Upcoming Events" list the moment its date passes — no rebuild required for that part.
- **Unknown categories fall back gracefully.** Event categories and service categories that don't match a known icon/tab simply render with a default icon rather than breaking.

## Project Structure

```
gsb-community/
├── data-sources/                  # Source-of-truth Excel workbooks (see table above)
├── public/
│   ├── index.html                 # CRA shell + favicon/meta tags
│   ├── manifest.json              # Web app manifest (Android/PWA icons)
│   └── favicon*.png, favicon.ico, apple-touch-icon.png
├── scripts/
│   ├── sync-data.js                # Registry of every workbook → generated-file pairing
│   └── lib/
│       ├── xlsxReader.js           # Zero-dependency .xlsx parser (zip + shared strings + sheet XML)
│       └── syncWorkbook.js         # Generic "find workbook → map rows → write generated file" engine
├── src/
│   ├── assets/images/              # Photos, logos, org_<id>.jpeg logo files
│   ├── components/
│   │   ├── Navbar.js, Footer.js, Hero.js, Vision.js, NewsTicker.js
│   │   ├── Events.js, Temples.js, CommunityCard.js, PageAura.js
│   │   └── landing/                # Home-page-only sections (CommunitySpotlight, ServicesTeaser, SectionHeader)
│   ├── data/
│   │   ├── generated*.js           # AUTO-GENERATED — do not hand-edit, will be overwritten
│   │   ├── communities.js, events.js, communityServices.js, temples.js, news.js
│   │   │                           # ↑ shape generated rows into what components expect
│   │   ├── eventIcons.js, organizationLogos.js
│   │   └── lib/textLists.js        # Shared numbered-list / boolean parsing helpers
│   ├── pages/                      # One file per route (Home, About, Community, Services, Events, ...)
│   ├── App.js                      # Route table
│   ├── index.js                    # ReactDOM entry point
│   └── index.css                   # Global styles, CSS custom properties, responsive breakpoints
├── package.json
├── vercel.json                     # SPA rewrite rule for client-side routing
└── .gitignore
```

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | `Home` | Hero, news ticker, community spotlight, services teaser, events, temples |
| `/our-story` | `OurStory` | Story behind the community logo |
| `/about` | `About` | Mission / vision |
| `/community` | `CommunityList` | Full organization directory (Excel-driven) |
| `/community/:id` | `CommunityDetail` | One organization's full profile |
| `/services` | `Services` | Searchable, filterable service directory (Excel-driven) |
| `/events` | `Events` | Full events calendar (Excel-driven, date-filtered) |
| `/temples/:id` | `TempleDetail` | One temple's priests, poojas, description (Excel-driven) |
| `/gallery`, `/news`, `/get-involved`, `/contact` | — | Stub pages, see [Known Gaps](#known-gaps) |

## Getting Started

**Prerequisites:** Node.js 18 LTS or newer, npm.

```bash
git clone https://github.com/SreenathKamath/gsb-community.git
cd gsb-community
npm install
npm start
```

`npm start` runs a `prestart` hook (`node scripts/sync-data.js`) before launching the dev server, so the site always reflects whatever is currently in `data-sources/*.xlsx`. Open http://localhost:3000.

**Important:** the sync step only runs when `npm start` / `npm run build` is *invoked* — it does not watch the workbooks for changes. If you edit a workbook while the dev server is already running, restart it (`Ctrl+C`, then `npm start` again) to pick up the change.

```bash
npm run build     # production build → build/ (also runs the sync step first via `prebuild`)
```

## Editing Site Content (No Code Required)

To change what appears on the site — add an organization, retire an old event, update a service's phone number — you only need Excel (or Google Sheets, exported as `.xlsx`):

1. Open the relevant file in `data-sources/` (see the table in [The Excel-Driven Content Pipeline](#the-excel-driven-content-pipeline)).
2. Add, edit, or remove a row. Keep the header row's column names as they are.
3. Save the file.
4. Restart `npm start` (or deploy — see below) to regenerate the corresponding `src/data/generated*.js` file.

For organizations specifically, dropping a logo image named `org_<id>.jpeg` / `.png` / `.webp` / `.svg` into `src/assets/images/` will automatically be picked up as that organization's logo (matched by the numeric ID in the filename) — no code change needed there either.

## Adding a New Data Source

Because every workbook is registered in one place, adding a sixth data source doesn't require a new script file. Open `scripts/sync-data.js` and append one object to the `SOURCES` array:

```js
{
  key: "gallery",                                     // used in logs and CLI filtering
  candidateNames: ["gallery.xlsx"],                    // workbook filenames to look for in data-sources/
  outputPath: "src/data/generatedGallery.js",
  outputVarName: "generatedGallery",
  filter: (record) => record.photo_id || record.caption,
  map: (record) => ({
    photoId: clean(record.photo_id),
    caption: clean(record.caption)
  })
}
```

Then write a thin `src/data/gallery.js` that imports `generatedGallery` and shapes it into whatever your component needs — following the same pattern as `src/data/events.js` or `src/data/temples.js`.

You can sync a single source while iterating, without touching the others:

```bash
node scripts/sync-data.js gallery
```

## Deployment

Hosted on **Vercel**, connected directly to this GitHub repository:

- Every push to `main` triggers an automatic build (`npm run build`, which runs `prebuild` → `sync-data.js` → `react-scripts build`) and deploy.
- `vercel.json` provides the SPA rewrite (`/* → /index.html`) so client-side routes work on refresh/direct link.
- No environment variables or secrets are required for the build.

To verify a build locally before pushing (recommended for any change to `package.json`, `scripts/`, or `src/data/`):

```bash
npm run build
npx serve -s build
```

## Favicon & App Icons

A full icon set is generated from the community logo (`src/assets/images/lord123.png`) and lives in `public/`:

- `favicon.ico` (16/32/48px, multi-resolution) and standalone `favicon-16x16.png` / `favicon-32x32.png` for browser tabs and search-result favicons.
- `apple-touch-icon.png` (180×180) for iOS home-screen / Safari pinned tabs.
- `android-chrome-192x192.png` / `android-chrome-512x512.png`, referenced from `manifest.json`, for Android home-screen and PWA install prompts.

The small (16/32/48px) icons use a tighter crop of just the deity image — the full badge with its text ring loses legibility at browser-tab size, so the crop trades the outer text ring for a clearer subject at a glance. The larger icons (180px+) use the full badge, where the text stays readable.

## Known Gaps

- `/gallery`, `/news` (the dedicated page, not the home page ticker), `/get-involved`, and `/contact` are still placeholder "Coming Soon" pages.
- No automated tests exist yet (`react-scripts test` is wired up but unused).
- `data-sources/organization_details.xlsx` and the resulting `src/data/generatedOrganizations.js` contain real contact details (phone numbers, emails) for organization office-bearers. This is intentional and tracked in git for this project, but worth keeping in mind if this repository's visibility ever changes.
- `create-react-app` itself is a deprecated toolchain (no active security patches from its maintainers). Not urgent for a static community site, but a future migration to Vite would be a reasonable modernization.
