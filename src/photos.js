// The one place that says which photograph belongs to which hero.
//
// A slug maps to null until its source lands in ../photo-assets/ AND
// `npm run photos` has produced the graded WebP. Null is a supported state, not
// a broken one — PhotoBackdrop renders a designed placeholder for it, so the
// site ships and reads correctly with none of these filled in.
//
// TO TURN ONE ON: drop the source in photo-assets/ (names and search terms are
// in photo-assets/README.md), run `npm run photos`, then swap the null here for
// the object below it. Two edits, no component changes.
//
// Alt text is written here rather than at the call site because it describes
// the PHOTOGRAPH, and the photograph is what this file owns. Each hero also
// carries its own headline in real text, so these images are decorative
// support — keep the alt short and concrete, and never restate the headline.

export const PHOTOS = {
  // Landing hero.
  // home: { src: '/photos/hero-workshop.webp', alt: 'A maker’s workbench under warm light, a print in progress.' },
  home: null,

  // marginprint: { src: '/photos/app-marginprint.webp', alt: 'A 3D printer nozzle laying down a layer, close up.' },
  marginprint: null,

  // marketday: { src: '/photos/app-marketday.webp', alt: 'A craft market stall laid out with handmade goods.' },
  marketday: null,

  // benchstock: { src: '/photos/app-benchstock.webp', alt: 'Shelves of filament spools and workshop supplies.' },
  benchstock: null,

  // makerbooks: { src: '/photos/app-makerbooks.webp', alt: 'Receipts and a notebook on a desk in warm light.' },
  makerbooks: null,
}
