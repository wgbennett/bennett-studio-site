# Bennett Studio — Marketing Site

The Bennett Studio marketing site. Vite + React + React Router + Tailwind +
Framer Motion. Studio-first: a landing page introduces the studio, and each app
has its own equal-weight page.

## Run

```bash
cd bennett-studio-site/site
npm install
npm run dev
```

Opens at http://localhost:5180

## Build

```bash
npm run build   # client build → SSR build → prerender; outputs to dist/
npm test        # /api/waitlist Pages Function tests
```

`build` runs three steps. `vite build` produces the client bundle;
`build:ssr` bundles `src/entry-server.jsx` for Node; `scripts/prerender.mjs`
renders every route in `PRERENDER_ROUTES` (`src/site-meta.js`) to real HTML and
writes `dist/<route>.html`. The client hydrates that markup, so first paint is
the finished page and crawlers never have to run JS.

To preview exactly what Cloudflare serves — asset precedence, `_redirects`,
`_headers` and `/api/*` Functions all included — use the real Pages runtime
rather than `vite preview`:

```bash
npm run build && npx wrangler pages dev dist
```

Adding a route means adding it to `src/App.jsx` **and** `ROUTE_META` in
`src/site-meta.js` — that table is where per-page `<title>`, description,
canonical and OG tags come from, for both the prerender and `usePageTitle`.
Anything not prerendered still works; it just falls back to a client render.

## Routes

- `/` — **Bennett Studio** landing: hero, the two-app band, about the maker,
  print carousel, beta signup.
- `/marginprint` — MarginPrint product deep-dive.
- `/marketday` — MarketDay product deep-dive.

Every route above is prerendered to a flat `dist/<route>.html`, which Cloudflare
Pages matches directly. Two non-obvious behaviours, both verified against
`wrangler pages dev` — read the comments in `public/_redirects` before touching
it:

- There is **no `/*` catch-all**, on purpose. Valid redirect rules are evaluated
  *before* static assets, so a `/* -> some-shell 200` line serves that one shell
  for the whole site and silently defeats the prerender. Deep links work via
  Pages' native index.html fallback instead (which is also why there must be no
  `404.html`).
- Output is flat `<route>.html`, not `<route>/index.html`, because Pages
  canonicalises a directory to a trailing slash and would 308 `/marginprint`
  → `/marginprint/`, disagreeing with the canonical tag and sitemap.

Unmatched paths therefore receive the prerendered landing markup, which is why
App.jsx's `*` route renders `<Landing />` and corrects the URL after mount
instead of returning `<Navigate>`. `/api/*` Pages Functions still resolve first.
`ScrollManager` handles scroll-to-top on route change and smooth scroll-to-hash
for in-page anchors.

> MarketDay copy is sourced from the `market-day` product README (offline-first
> booth companion; free tier built, paid upgrades coming soon). Real screenshots
> aren't wired in yet — the intro shows "screen coming" placeholders. Drop PNGs
> into `public/screenshots/` and swap them into `MarketDayIntro.jsx` when ready.

## Reference docs

- `../02-DESIGN-BRIEF.md` — site structure + aesthetic brief
- `../03-MARGINPRINT.md` — MarginPrint product brief

## Structure

```
src/
├── App.jsx                  # <Routes>: / · /marginprint · /marketday
├── main.jsx                 # BrowserRouter
├── pages/
│   ├── Landing.jsx          MarginPrintPage.jsx   MarketDayPage.jsx
├── components/
│   ├── SiteNav.jsx          # shared nav (overlay on hero / solid on app pages)
│   ├── ScrollManager.jsx    # router-aware scroll behaviour
│   ├── Hero.jsx             # studio landing hero
│   └── sections/            # Apps, About, PrintShowcase, Contact, Footer,
│                            #   MarginPrint* (deep-dive), MarketDay* (deep-dive)
└── ...
```
