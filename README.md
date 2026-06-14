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
npm run build   # outputs to dist/
npm test        # /api/waitlist Pages Function tests
```

## Routes

- `/` — **Bennett Studio** landing: hero, the two-app band, about the maker,
  print carousel, beta signup.
- `/marginprint` — MarginPrint product deep-dive.
- `/marketday` — MarketDay product deep-dive.

Client-side routing (React Router, `BrowserRouter`). `public/_redirects` gives
Cloudflare Pages an SPA fallback (`/* /index.html 200`); `/api/*` Pages
Functions still resolve first. `ScrollManager` handles scroll-to-top on route
change and smooth scroll-to-hash for in-page anchors.

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
