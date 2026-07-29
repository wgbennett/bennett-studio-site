// Per-route head metadata — the single source of truth for titles and
// descriptions.
//
// Two consumers:
//   • scripts/prerender.mjs bakes these into each route's static index.html at
//     build time, so crawlers and link unfurlers see the real per-page title,
//     description, canonical and OG tags instead of the studio landing's.
//   • usePageTitle() applies the same title client-side on soft navigations.
//
// Keeping both on one table is the point: before prerendering, the titles
// lived inline in each page component and the OG tags only existed in
// index.html, so they drifted.

export const SITE_ORIGIN = 'https://bennettstudio.dev'

const STUDIO_DESCRIPTION =
  'Bennett Studio builds focused, mobile-first software for people who sell what they make. Four apps available now: MarginPrint for 3D-print shops, MarketDay for selling in person, BenchStock for materials, and MakerBooks for the numbers.'

// Keyed by route path exactly as declared in App.jsx.
export const ROUTE_META = {
  '/': {
    title: 'Bennett Studio — independent software for makers',
    description: STUDIO_DESCRIPTION,
    ogTitle: 'Bennett Studio — software for makers',
    ogImage: 'og.png',
    ogImageAlt: 'Bennett Studio — four mobile-first apps for people who sell what they make.',
  },
  '/marginprint': {
    title: 'MarginPrint — mission control for 3D-print sellers · Bennett Studio',
    description:
      'MarginPrint is a mobile-first operations app for small 3D-print shops: a production queue, true per-print costs, quoting, and profit tracking. Works offline, no account needed. Free to start.',
    ogImage: 'og-marginprint.png',
    ogImageAlt: 'MarginPrint — the production queue and profit breakdown on a phone.',
  },
  '/marketday': {
    title: 'MarketDay — the offline-first booth companion · Bennett Studio',
    description:
      'MarketDay runs your market booth offline: pack lists, one-tap sales, and a show summary that tells you which shows actually made money. Free to start, no account needed.',
    ogImage: 'og-marketday.png',
    ogImageAlt: 'MarketDay — the quick-sale grid and show summary on a phone.',
  },
  '/benchstock': {
    title: 'BenchStock — true cost & materials for makers · Bennett Studio',
    description:
      'BenchStock tracks your materials and tells you what an item really costs to make — stock levels, reorder points, and landed cost. Mobile-first and offline. Free to start.',
    ogImage: 'og-benchstock.png',
    ogImageAlt: 'BenchStock — the materials list and cost dashboard on a phone.',
  },
  '/maker-books': {
    title: 'MakerBooks — bookkeeping & tax readiness for makers · Bennett Studio',
    description:
      'MakerBooks is bookkeeping built for makers: income and expenses in, a Schedule C view out, ready before tax season. No spreadsheets, works offline. Free to start.',
    ogImage: 'og-makerbooks.png',
    ogImageAlt: 'MakerBooks — the profit dashboard and Schedule C view on a phone.',
  },
}

// Routes that get their own prerendered HTML file. Redirect-only routes
// (/makerbooks) and the catch-all are deliberately excluded — they should keep
// falling through to the SPA shell via public/_redirects.
export const PRERENDER_ROUTES = Object.keys(ROUTE_META)

export function metaFor(path) {
  return ROUTE_META[path] ?? ROUTE_META['/']
}
