# Restaurant template implementation

Implemented locally on 2026-10-12. No deployment or commit was made. Existing unrelated untracked Lighthouse/OMX files were preserved.

Mobile-only clarification applied: removed the desktop breakpoint/grid, capped the entire page/header/footer/bottom action at 480px, retained the single stacked layout and fixed-action clearance, and removed the alternate larger-window heading size. Changed `globals.css`, `QSRLinkPage.tsx`, README, this report, the plan and visual review record. Browser observation at 390px confirmed the phone view; at 1280px the content remained a 480px block with a visible 480px bottom action and 92px clearance.

## Result

- One typed, validated profile model and shared server renderer for restaurants and food businesses. `/buddas` remains canonical; `/p/[slug]` supports additional CMS profiles; `/p/buddas` redirects permanently.
- An additive Sanity schema controls identity, theme, primary action, grouped links, promotions, locations, real source-linked reviews, optional story/gallery/catering, SEO and footer. Disabled content and explicit empty arrays stay absent.
- Coherent Outfit/Work Sans typography, warm/neutral surfaces, a clear primary order/menu action, single mobile column, persistent safe-area action and keyboard-visible focus. The user's mobile-only clarification supersedes the initial desktop branch layout.
- Manual promotions replace autoplay; stable Share/QR controls replace scroll-swapped header copies. QR loads lazily, uses the canonical URL, and has native dialog keyboard behavior. Image errors retain useful text and layout.
- Profile-owned metadata, schema IDs, sitemap and safe draft/publication routes. Published reads use Next's cache rather than a second Sanity CDN cache so publication invalidation can fetch fresh content.
- Existing Budda's two-location data remains the legacy missing-field fallback. No sample food/gallery/review/story/catering claims are automatically published. Other profiles never receive Budda's identity, locations or policies.
- Optional analytics hooks have stable profile/link/branch/placement fields and cannot interrupt navigation. No collector, tracking cookies, paid service or new dependency was added.

## Simplifications

The active page now composes server sections instead of one large client module. Removed duplicated URL policies, autoplay timers, offscreen header measurements, fake analytics initialization, redundant raw-image preload and unused section/skeleton alternatives. Kept small client components only for interaction, tracking and image-error state. Generic profiles resolve before streaming so missing profiles and canonical redirects retain proper HTTP status codes.

## Local evidence

| Observation | Result |
| --- | --- |
| `/buddas` | HTTP 200; one JSON-LD block with Pleasant Grove and Salt Lake City restaurant entries and stable anchors |
| `/examples/bakery` | HTTP 200, visible demo label, `noindex, nofollow`, one h1; no invented location, restaurant schema, review or primary bar |
| `/p/no-such-restaurant` | HTTP 404 |
| `/p/buddas` | HTTP 308 with Location `/buddas` |
| `/api/preview` without a secret | HTTP 401 |
| `/api/revalidate` GET | HTTP 405 |
| `/sitemap.xml` and `/robots.txt` | HTTP 200; profile-derived public URLs and no example sitemap entry |
| Mobile/narrow views | One meaningful h1; primary action before promotions; no document overflow at the observed 320/390 viewport settings |
| Wider windows | Same mobile column capped at 480px, with the bottom action retained; no desktop grid or alternate layout |
| QR dialog | Canonical public URL encoded, image generated, initial close-button focus; Escape closes and restores QR opener focus |

Manual source review fixes incorporated: formatted phone numbers remain callable; branch IDs cannot collide with reserved page fragments; invalid/disabled primary actions cannot resurrect a fallback; authenticated removal events can invalidate the old profile; legal pages have working skip targets and corrected Utah locality.

Visible CMS hours are generated from the same validated weekly rows as JSON-LD, with friendly timezone names. Editorial hour text is used only when structured hours are absent.

## Changed files

### Content, routing and metadata

- [Sanity schema](/D:/WORK/buddas/buddas/sanity/schemaTypes/landingPage.ts)
- [Queries and validation](/D:/WORK/buddas/buddas/sanity/lib/queries.ts)
- [Profile types](/D:/WORK/buddas/buddas/src/lib/profile-types.ts)
- [URL validation](/D:/WORK/buddas/buddas/src/lib/url-utils.ts)
- [Profile route policy](/D:/WORK/buddas/buddas/src/lib/profile-routes.ts)
- [Profile loading](/D:/WORK/buddas/buddas/src/lib/restaurant-profiles.ts)
- [Verified fallback and demo fixtures](/D:/WORK/buddas/buddas/src/lib/buddas-profile.ts)
- [Profile metadata](/D:/WORK/buddas/buddas/src/lib/profile-metadata.ts)
- [SEO URL helper](/D:/WORK/buddas/buddas/src/lib/seo-utils.ts)
- [Image validation](/D:/WORK/buddas/buddas/src/lib/image-utils.ts)
- [Weekly hours formatting](/D:/WORK/buddas/buddas/src/lib/location-hours.ts)
- [Budda's route](/D:/WORK/buddas/buddas/src/app/buddas/page.tsx)
- [Additional profile route](/D:/WORK/buddas/buddas/src/app/p/[slug]/page.tsx)
- [Sparse bakery example](/D:/WORK/buddas/buddas/src/app/examples/bakery/page.tsx)
- [Preview](/D:/WORK/buddas/buddas/src/app/api/preview/route.ts)
- [Exit preview](/D:/WORK/buddas/buddas/src/app/api/exit-preview/route.ts)
- [Publishing webhook](/D:/WORK/buddas/buddas/src/app/api/revalidate/route.ts)
- [Sitemap](/D:/WORK/buddas/buddas/src/app/sitemap.ts)
- [Robots](/D:/WORK/buddas/buddas/src/app/robots.ts)

### Frontend and interactions

- [Page composition](/D:/WORK/buddas/buddas/src/components/RestaurantProfilePage.tsx)
- [Restaurant layout](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx)
- [Share/QR header](/D:/WORK/buddas/buddas/src/components/BuddasStickyHeader.tsx)
- [Manual promotion strip](/D:/WORK/buddas/buddas/src/components/PromoStrip.tsx)
- [Image fallback](/D:/WORK/buddas/buddas/src/components/PromoImage.tsx)
- [Tracked anchor](/D:/WORK/buddas/buddas/src/components/TrackedLink.tsx)
- [JSON-LD](/D:/WORK/buddas/buddas/src/components/JsonLd.tsx)
- [QR dialog](/D:/WORK/buddas/buddas/src/components/QRModal.tsx)
- [Feedback](/D:/WORK/buddas/buddas/src/components/Toast.tsx)
- [Analytics hooks](/D:/WORK/buddas/buddas/src/lib/analytics.ts)
- [Styles](/D:/WORK/buddas/buddas/src/app/globals.css)
- [Root layout](/D:/WORK/buddas/buddas/src/app/layout.tsx)
- [Not-found page](/D:/WORK/buddas/buddas/src/app/not-found.tsx)
- [Unavailable page](/D:/WORK/buddas/buddas/src/app/error.tsx)
- [Privacy page](/D:/WORK/buddas/buddas/src/app/privacy/page.tsx)
- [Terms page](/D:/WORK/buddas/buddas/src/app/terms/page.tsx)

### Regression cases, documentation and review record

- [CMS/URL/media cases](/D:/WORK/buddas/buddas/src/lib/profile-data.test.ts)
- [Route cases](/D:/WORK/buddas/buddas/src/lib/profile-routes.test.ts)
- [Weekly hours cases](/D:/WORK/buddas/buddas/src/lib/location-hours.test.ts)
- [Metadata cases](/D:/WORK/buddas/buddas/src/lib/profile-metadata.test.ts)
- [Optional analytics cases](/D:/WORK/buddas/buddas/src/lib/analytics.test.ts)
- [UI cases](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.test.tsx)
- [JSON-LD cases](/D:/WORK/buddas/buddas/src/components/JsonLd.test.tsx)
- [Endpoint authentication cases](/D:/WORK/buddas/buddas/src/app/api/profile-access.test.ts)
- [README/onboarding](/D:/WORK/buddas/buddas/README.md)
- [Budda's customization](/D:/WORK/buddas/buddas/src/app/buddas/HOW_TO_CUSTOMIZE.md)
- [Plan and implementation record](/D:/WORK/buddas/buddas/.omx/plans/2026-10-12-restaurant-link-in-bio-ui-plan.md)
- [Visual review state](/D:/WORK/buddas/buddas/.omx/state/restaurant-template/ralph-progress.json)

Deleted confirmed unused alternatives from `D:/WORK/buddas/buddas/src/components/`: `BelowFoldSections.tsx`, `StaticPromoSection.tsx`, `StaticPromoStrip.tsx`, `SkeletonComponents.tsx`. The earlier verified `src/lib/restaurant-locations.ts` is reused without altering its facts.

## Remaining checks and risks

No tests, build, lint, typecheck or static-analysis commands were run because the workspace instruction requires an explicit `npm run build` request. Regression cases exist but the repository has no configured TSX test execution path. Production deployment must wait for authorized verification and an appropriate existing-tool test execution path.

Real draft-token access, a live Sanity publish/delete webhook and an analytics collector were not configured or exercised. No live CMS record was migrated; existing Budda's data remains compatible while the new slug/branch fields can be populated through the editor. Editors need a stable slug and verified branch destinations/hours for new restaurants.

Formal WCAG conformance, 200%/400% zoom, real mobile-browser safe areas, real-device QR scanning/download and production Core Web Vitals are not certified by this local review. Holiday exceptions are not automatically inferred. Current contact/hours fallbacks must be updated when the business changes them. Existing legal policy substance was preserved; only presentation metadata, navigation and incorrect locality were corrected.
