# Budda's redesigned-page structured data review

Reviewed 2026-10-12. Scope: the published local `/buddas` render and both visible Utah locations. No live CMS edits or deployment.

## Strategy and eligibility

Schema Eligibility & Impact Index before edits: **91/100 — Strong Candidate**. Content alignment 22/25, Google type eligibility 23/25, completeness/accuracy 18/20, technical correctness 14/15, maintenance 9/10, spam risk 5/5. This is a diagnostic assessment, not a ranking or rich-result guarantee. Restaurant is the appropriate LocalBusiness subtype; each physical branch remains a distinct entity in one JSON-LD graph.

Official references checked:

- [Google LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business): required name/address, branch-specific URLs, phone with country code, cuisine, menu and opening hours. Both short weekday names and schema.org weekday URLs are accepted. Google currently documents `menu`.
- [Schema.org Restaurant](https://schema.org/Restaurant): `hasMenu` supersedes `menu`. Emit both from the same validated destination for compatibility.
- [Budda's official website](https://buddashawaiian.com/): the two addresses, phones and weekly schedules agree with the current page and shared location data.

## Findings and fixes

- Both Restaurant images previously referenced the shared CMS logo, although the redesigned page displays separate storefront photos. `RestaurantProfilePage.tsx` now uses the matching photo from `buddasDesign.locationImages` for Budda's. The brand logo stays in the separate `logo` property. Generated hero/Bento images are excluded from business images. Unknown branch IDs receive no invented photo.
- The live CMS profile lacked a description. The redesigned hero copy now lives once in `buddasDesign.description`, used unchanged by the image's accessible description and each Restaurant's JSON-LD description. Other profiles retain their own tagline.
- `JsonLd.tsx` emits `hasMenu` only when the existing validated `menu` URL survives serialization. Google-compatible `menu` remains. Unsafe or missing menu URLs produce neither property.

Reused the existing data, renderer, URL serialization and script escaping. No schema package, new helper abstraction, duplicate graph or unrelated UI change.

## Both location records

| Branch | Address | Phone | Weekly hours (Mountain Time) |
| --- | --- | --- | --- |
| Pleasant Grove | 205 East 700 South, Pleasant Grove, UT 84062, US | +18017010617 | Mon–Sat 08:00–20:00; Sun 08:00–14:00 |
| Salt Lake City | 1465 S State St #12, Salt Lake City, UT 84115, US | +13852027184 | Mon–Thu 08:00–19:40; Fri–Sat 08:00–21:30; Sun 08:00–14:00 |

The entities retain canonical IDs/URLs ending `#pleasant-grove` and `#salt-lake-city`, real directions URLs, Hawaiian cuisine and the visible TikTok/Instagram/Facebook identities. Required name and complete PostalAddress fields are present. Preview/demo suppression remains in place.

## Placement and implementation evidence

`RestaurantProfilePage.tsx` supplies the graph to the existing server-rendered `JsonLd` component, which inserts one `script[type="application/ld+json"]` with ID `restaurant-schema`. The exact reviewed output is saved in [2026-10-12-buddas-structured-data.json](2026-10-12-buddas-structured-data.json); this is a local review snapshot, not the live content source.

Changed source: `src/components/RestaurantProfilePage.tsx`, `src/components/JsonLd.tsx`, `src/components/JsonLd.test.tsx`, `src/components/BuddasReferencePage.tsx`, `src/lib/buddas-design.ts`.

Authored regression coverage for distinct branch photos versus logo/illustrative artwork, description serialization, relative menu URL resolution, and unsafe-menu omission from both properties. Existing JSON escaping and cross-profile identity cases remain.

## Validation status

- Manually inspected the reloaded browser DOM: one parseable JSON-LD graph, two Restaurant entities, both branch anchors and image paths match visible cards, hero accessible description equals schema description, both menu properties agree, and both weekly schedules match the official source.
- Browser warning/error log was empty after the changes.
- Google Rich Results Test, Schema.org Validator, Search Console, build, tests, lint, typecheck and static analysis were **not run**, following the workspace instruction that requires an explicit `npm run build` request. No deployed Google validation or rich-result eligibility result is claimed.

## Remaining limits

Storefront photos are low-resolution user-supplied reference crops and are not independently verified as current premises. Their public-origin URLs become available with deployment; localhost review does not establish deployed crawlability. Verified coordinates and a full price range are not available in the profile, so `geo` and `priceRange` remain omitted. A single $9 promotion is insufficient to infer the restaurant's price range. No self-serving ratings, fabricated reviews, promotion offers, FAQ or carousel schema were introduced.
