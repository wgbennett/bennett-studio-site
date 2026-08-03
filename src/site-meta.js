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
    ogImageAlt: 'A 3D printer running on a workshop bench, over the words “The business side, handled.”',
  },
  '/marginprint': {
    title: 'MarginPrint — mission control for 3D-print sellers · Bennett Studio',
    description:
      'MarginPrint is a mobile-first operations app for small 3D-print shops: a production queue, true per-print costs, quoting, and profit tracking. Works offline, no account needed. Free to start.',
    ogImage: 'og-marginprint.png',
    ogImageAlt: 'A 3D printer hot-end mid-print, over the words “MarginPrint runs the shop.”',
  },
  '/marketday': {
    title: 'MarketDay — the offline-first booth companion · Bennett Studio',
    description:
      'MarketDay runs your market booth offline: pack lists, one-tap sales, and a show summary that tells you which shows actually made money. Free to start, no account needed.',
    ogImage: 'og-marketday.png',
    ogImageAlt: 'A market stall of handmade goods, over the words “MarketDay works the booth.”',
  },
  '/benchstock': {
    title: 'BenchStock — true cost & materials for makers · Bennett Studio',
    description:
      'BenchStock tracks your materials and tells you what an item really costs to make — stock levels, reorder points, and landed cost. Mobile-first and offline. Free to start.',
    ogImage: 'og-benchstock.png',
    ogImageAlt: 'A wall of labelled index drawers, over the words “BenchStock knows the cost.”',
  },
  '/maker-books': {
    title: 'MakerBooks — bookkeeping & tax readiness for makers · Bennett Studio',
    description:
      'MakerBooks is bookkeeping built for makers: income and expenses in, a Schedule C view out, ready before tax season. No spreadsheets, works offline. Free to start.',
    ogImage: 'og-makerbooks.png',
    ogImageAlt: 'A notebook and figures on a desk, over the words “MakerBooks keeps the books.”',
  },
}

// Routes that get their own prerendered HTML file. Redirect-only routes
// (/makerbooks) and the catch-all are deliberately excluded — they should keep
// falling through to the SPA shell via public/_redirects.
export const PRERENDER_ROUTES = Object.keys(ROUTE_META)

export function metaFor(path) {
  return ROUTE_META[path] ?? ROUTE_META['/']
}
