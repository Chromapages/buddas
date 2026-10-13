# Restaurant link-in-bio template: frontend review and implementation plan

Date: 2026-10-12, America/Denver. Status: implemented locally; production verification and external integrations remain unverified.

## Requirements and boundaries

The user selected **a reusable link-in-bio template**, initially for **restaurants and food businesses**, and explicitly clarified **mobile only**. Budda's is the first real example. Preserve the recent two-location structured-data fixes and the working `/buddas` URL. Interpret the requested “play out improvements” as layout and customer-flow improvements.

Deliver a shared, branded restaurant page that an editor can configure through Sanity: identity, primary action, useful links, specials, locations, and a few optional content sections. Adding a second restaurant must require content entry rather than duplicating JSX. Keep the current Next.js/React/Tailwind/Sanity stack and installed dependencies.

Version 1 is a maintained template using the existing CMS, not a self-service SaaS. Accounts, billing, a drag-and-drop builder, arbitrary embeds, automatic social synchronization, an in-page checkout, and a bespoke analytics dashboard are outside this plan. Custom-domain automation is deferred; the existing configured base URL remains deployment configuration. These exclusions keep the first reusable version small and reviewable.

## Evidence and current frontend

Inspected the live local page, its accessibility tree, mobile-sized and desktop-sized views, and the active code. At desktop width, the content container remained 448 CSS pixels wide. The live page had no `h1`; its offscreen measurement copy was exposed to the accessibility tree. The current CMS supplied real Budda's links/promotions, while story/gallery/testimonials/catering still used local sample data. No fresh performance, contrast, or formal accessibility audit was run.

Line references are to the working tree on this date, including the previous structured-data changes.

| Area | Current behavior and evidence | Implication |
| --- | --- | --- |
| Entry point | [page.tsx](/D:/WORK/buddas/buddas/src/app/buddas/page.tsx:325) renders `QSRLinkPage` and the sticky header. | Reuse these boundaries instead of building a separate frontend. |
| Layout | [QSRLinkPage.tsx](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:211) and [BuddasStickyHeader.tsx](/D:/WORK/buddas/buddas/src/components/BuddasStickyHeader.tsx:103) use `max-w-md` at all widths. | Good phone scanning; desktop space is not deliberately composed. A narrow bio page is valid, so widening is a design choice, not a compliance requirement. |
| Section order | [QSRLinkPage.tsx](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:245): specials, Menu/Review, quick links, story, gallery, testimonials, locations, catering, footer; [line 661](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:661) adds a fixed Order CTA. | Promotions and app links compete with ordering; locations require a substantial scroll unless the Directions shortcut is used. |
| Identity | The only `h1` is inside the optional brand header at [line 230](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:230); the active page disables that header at [page line 345](/D:/WORK/buddas/buddas/src/app/buddas/page.tsx:345). | Add one meaningful page heading without duplicating the logo/title presentation. |
| Visual system | [globals.css](/D:/WORK/buddas/buddas/src/app/globals.css:4) mixes cream/brown/mint legacy tokens with blue/gray Apple tokens. Several components reference undeclared custom radius tokens. [layout.tsx](/D:/WORK/buddas/buddas/src/app/layout.tsx:7) loads Outfit/Work Sans while the CSS uses SF/Inter/system stacks. | Consolidate palettes, typography, radius, spacing and focus styling; connect one font strategy. |
| Motion | [QSRLinkPage.tsx](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:181) starts a 4.5-second interval; [line 250](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:250) pauses for hover/touch. [globals.css](/D:/WORK/buddas/buddas/src/app/globals.css:179) reduces reveal animation only. | The carousel lacks persistent pause and keyboard navigation. Prefer manual cards in the template. |
| Fixed chrome | [BuddasStickyHeader.tsx](/D:/WORK/buddas/buddas/src/components/BuddasStickyHeader.tsx:51) swaps header content after 12px scroll; [line 202](/D:/WORK/buddas/buddas/src/components/BuddasStickyHeader.tsx:202) creates offscreen measurement replicas. [QSRLinkPage line 655](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:655) hides its extra footer spacer on larger widths while the Order CTA remains fixed. | Stabilize controls and remove duplicate accessible content. Account for bottom-bar height, focus visibility and safe areas. |
| Content truth | [page.tsx](/D:/WORK/buddas/buddas/src/app/buddas/page.tsx:255) always falls back for story/gallery/reviews/catering. [CMS schema](/D:/WORK/buddas/buddas/sanity/schemaTypes/landingPage.ts:9) supports only brand, main links, promos and link list. | Explicitly empty sections must stay empty. Sample quotes and stock photos must never become real production claims. |
| Destinations | [QSRLinkPage.tsx](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:115) validates some URLs, [header line 20](/D:/WORK/buddas/buddas/src/components/BuddasStickyHeader.tsx:20) uses a different policy, and [catering line 629](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:629) can render `#`. [line 374](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:374) can show developer instructions to visitors. | One URL policy, no dead anchors, no source-edit instructions on public pages. |
| Reuse | [queries.ts](/D:/WORK/buddas/buddas/sanity/lib/queries.ts:199) filters names matching `Budda*`; [location data](/D:/WORK/buddas/buddas/src/lib/restaurant-locations.ts:1) contains Budda's two branches. | Correct for the current page, but template profiles require stable slug/document selection and profile-owned locations. |
| SEO | [page metadata](/D:/WORK/buddas/buddas/src/app/buddas/page.tsx:25), [robots](/D:/WORK/buddas/buddas/src/app/robots.ts:6), [sitemap](/D:/WORK/buddas/buddas/src/app/sitemap.ts:6), and [JSON-LD IDs](/D:/WORK/buddas/buddas/src/components/JsonLd.tsx:43) still include Budda's paths/identity assumptions. | All metadata, assets, location IDs and policies must belong to the selected profile. |
| Preview/caching | [preview route](/D:/WORK/buddas/buddas/src/app/api/preview/route.ts:14) enables draft mode but the [page](/D:/WORK/buddas/buddas/src/app/buddas/page.tsx:241) checks a custom cookie. [revalidation](/D:/WORK/buddas/buddas/src/app/api/revalidate/route.ts:32) targets only `/buddas`. The page awaits the CMS before its later Suspense boundary. | Make draft/published selection and refresh target the same profile; do not claim the existing preview/skeleton fully covers CMS loading. |
| Analytics | [analytics.ts](/D:/WORK/buddas/buddas/src/lib/analytics.ts:43) only pushes when a `dataLayer` already exists; no provider loader is configured in this repository. Header does not call `trackShare`. | Existing hooks are a starting point, not demonstrated reporting. Measure real outbound interactions once collection is selected. |

### What already works and should be retained

Native anchors, phone links, CMS content validation, food promotion cards, readable large link rows, section anchors, Next Image sizing/lazy loading, native Web Share with a clipboard fallback, and server-rendered JSON-LD are useful foundations. The existing client page still renders initial HTML on the server; do not describe it as necessarily blank before hydration. Location data already feeds both visible cards and structured data.

`Toast`, `QRModal`, `StaticPromoSection`, `StaticPromoStrip`, and `BelowFoldSections` exist, but are not all wired into the active route. Check them before reuse: Toast needs announced feedback; QRModal needs dialog semantics/focus handling and brand-neutral URL/download values; StaticPromoSection currently ignores promo destinations; StaticPromoStrip is a client component despite its comment. Delete duplicate implementations only after confirming callers and preserving required behavior.

## Comparison with similar products

These are product-pattern comparisons based on the vendors' current public pages, not authenticated editor audits, price comparisons, or comparative performance benchmarks.

| Reference | Pattern worth adopting | Restaurant-template application |
| --- | --- | --- |
| [Linktree](https://linktr.ee/) | Recognizable identity, clear prioritized links, customization, QR sharing and engagement reporting. Linktree suggests 3–7 links for conversion-oriented profiles, while acknowledging other purposes need more. | Start with 3–5 primary restaurant tasks and a secondary group. Treat this as a default recommendation, not a hard link limit. |
| [Beacons](https://beacons.ai/i/app-pages/link-in-bio) | Configurable content blocks and branding beyond a plain list. | A small set of restaurant sections with visibility controls; omit empty blocks. No arbitrary block engine or commerce suite. |
| [Carrd](https://carrd.com/) | Responsive one-page composition and reusable starting templates. | Readable single-column composition, optional content, and consistent phone navigation. |
| [Lnk.Bio](https://lnk.bio/) | Prioritization, link groups, QR codes and campaign-oriented publishing. | Group ordering/menu/visiting separately from socials/apps; use an existing QR capability after accessibility repair. Promotion scheduling is a later addition only if actual editorial use warrants it. |

Recommendation: combine the fast navigation of a link hub with verified restaurant details and restrained optional sections. Brand identity comes from actual logo, accent colors, food photography and copy; do not require every restaurant to imitate Apple's styling.

## Proposed layout and customer flows

### Default phone order

1. Brand logo, restaurant name as `h1`, brief food/location description, consistently available Share action.
2. Clearly dominant primary action: Order online when configured; otherwise View menu or the actual configured primary destination. Menu remains a secondary action if ordering is primary.
3. Compact Locations shortcut and location summary. For one location, show useful address/hours/contact directly. For multiple branches, lead to plainly labeled cards with their own destinations rather than silently choosing a branch.
4. One optional featured special, then manual scroll-snap promotion cards if there are more. Essential price/description remains HTML text, even if artwork contains text.
5. Secondary link groups: catering/reservations/rewards as present; app downloads and social links below restaurant tasks.
6. Optional verified story/gallery/reviews, then full location information and a compact footer. No fake placeholder sections and no reviews attributed to Google/Yelp without real content/source.
7. One bottom primary action aligned to the mobile frame at every viewport width, with safe-area and footer clearance. Do not render it when its destination is absent.

### Wider viewing windows

Keep the same single mobile column at every viewport width, capped at 480px. Wider windows center the phone frame; there is no desktop grid, side panel, alternate type scale or desktop breakpoint. Locations remain stacked below the core content, and the primary bottom action retains its safe-area clearance.

### User journeys and verification

| Journey | Expected behavior |
| --- | --- |
| Social bio → order | Restaurant identity and primary action appear in the first 390×844 view without requiring a promotion swipe. Where an external ordering service asks for location, label that handoff clearly. |
| Social bio → visit | Locations shortcut reaches location details in one activation. Directions/call actions are labeled for the correct branch. |
| Multi-location → order/review | Actions use the selected card's destination. A shared provider URL is permitted only if its location-selection flow is verified; do not assume a shared link targets both branches correctly. |
| Share → return visitor | Share/copy/QR use the stable canonical profile URL by default, not localhost, preview credentials, arbitrary tracking parameters or the current scrolled fragment. Failed clipboard access has readable feedback; canceling native share is not presented as an error. |
| Editor → publish | Select a profile by unique slug/document identity; edit link order/content/theme in Sanity; preview the exact draft; publish refreshes the matching public page only. |

## Standards and project targets

These distinguish published standards from our chosen product defaults.

| Area | Standard or target | How it applies |
| --- | --- | --- |
| Accessibility | Aim for WCAG 2.2 AA, including keyboard operation, named controls, meaningful landmarks/headings, visible focus and focus not entirely obscured by fixed UI. | One useful `h1` is our page convention, not a standalone WCAG mandate. Include a skip link and mark/remove measurement-only replicas. |
| Targets | WCAG 2.2 AA 2.5.8 requires 24×24 CSS pixels or specified exceptions; use **44×44px** as the product target for standalone actions. | Share, directions, carousel controls and branch actions must be comfortable on phones. Do not falsely call 44px the AA minimum. |
| Contrast | At least 4.5:1 for normal text, 3:1 for qualifying large text, and applicable 3:1 non-text contrast for UI indicators. | Validate every supported palette, focused/hover states and text on images; use a stable overlay where needed. |
| Reflow | No loss of content/functionality at 200% text scaling and 320 CSS-pixel reflow; assess 400% zoom at the appropriate desktop viewport. | Long names, addresses and translated content wrap; fixed bars do not obscure focus or final footer links. |
| Motion | Prefer no automatic carousel rotation. If it exists, provide persistent pause/start, keyboard navigation, focus/hover pause and reduced-motion support. | Native CSS scroll snap plus labeled controls is smaller and easier to use. Do not assume reveal-animation CSS handles JS autoplay. |
| Feedback | Announced nonblocking success/error state; keyboard-safe dialogs. | Reuse repaired Toast; QR opens with dialog semantics, Escape close, contained focus and focus restoration. |
| Performance | Core Web Vitals: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile, segmented by mobile/desktop. | Field measurements after rollout establish these; localhost timings and Lighthouse scores do not prove field compliance. Use production-like lab measurements before release. |
| Content/SEO | Visible business facts and structured data agree; URLs/images are crawlable; each profile owns its title/canonical/social image/location IDs. | No invented rating, branch, price range or opening status. Preserve distinct restaurant entries for real branches. |
| Trust boundaries | A shared, context-aware destination policy rejects dangerous protocols while permitting supported HTTPS/local/fragment/telephone/email destinations. | Validate promo, header, catering and quick-link destinations equally. Match image host/protocol rules to Next Image/CSP; do not use an unsafe hostname suffix check. |
| Measurement | Track views and meaningful actions with profile, stable link ID, branch and placement; separate total clicks from unique sessions with a click. | An outbound Order click is a proxy, not a completed order. Do not impose an unsupported universal conversion-rate target. |

Sources: [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/), [target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), [WAI carousel guidance](https://www.w3.org/WAI/tutorials/carousels/), [Core Web Vitals](https://web.dev/articles/vitals), [Google LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business), [structured-data content policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [Linktree analytics definitions](https://linktr.ee/help/en/articles/5434178-understanding-your-insights).

## Implementation batches and acceptance criteria

Dependencies: A → B → C; D follows C. E and F can use the stable data/layout contract after B/C and converge before G. Keep shared-file edits sequential. Review each batch separately; no new dependencies without an explicit request.

### A — Establish truthful content and protect current behavior (P0)

Files: [page.tsx](/D:/WORK/buddas/buddas/src/app/buddas/page.tsx:78), [QSRLinkPage](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:115), [header](/D:/WORK/buddas/buddas/src/components/BuddasStickyHeader.tsx:20), [image helper](/D:/WORK/buddas/buddas/src/lib/image-utils.ts:18), existing [JSON-LD regression case](/D:/WORK/buddas/buddas/src/components/JsonLd.test.tsx:1).

- Inventory live destination URLs and verified assets; keep recent structured-data changes intact. Hide unavailable actions rather than exposing `#` or source-edit copy.
- Before any cleanup, write focused behavior cases for destination validation, explicit empty sections, one/two branches, and the current JSON-LD/escaping contract. Use installed tooling; do not add a framework just for these cases. Record that the current TSX test execution path is not configured before claiming automated coverage.
- Reuse one URL policy at the existing content boundary. Preserve phone/email/local-anchor support by context. Correct image-domain/protocol checks and define a failed-image presentation.
- Remove attributed sample reviews and misleading stock/demo content from production output; retain explicit labeled demo fixtures for template evaluation, isolated from public routes.

Acceptance: zero public bare `href="#"`, placeholder or developer-instruction actions; valid section fragments such as `#locations` remain permitted; verified Budda's destinations retained; missing optional content produces no fabricated cards; dangerous destinations do not become clickable; existing two-location schema remains intact.

### B — Make restaurant data reusable (P0/P1)

Files: [Sanity schema](/D:/WORK/buddas/buddas/sanity/schemaTypes/landingPage.ts:1), [queries/validation](/D:/WORK/buddas/buddas/sanity/lib/queries.ts:77), [page](/D:/WORK/buddas/buddas/src/app/buddas/page.tsx:203), [location fixture](/D:/WORK/buddas/buddas/src/lib/restaurant-locations.ts:1), [preview](/D:/WORK/buddas/buddas/src/app/api/preview/route.ts:1), [revalidation](/D:/WORK/buddas/buddas/src/app/api/revalidate/route.ts:1).

- Extend the existing landing-page document with unique stable slug, primary-action label/destination, restricted brand-theme values, ordered links/groups and optional restaurant sections. Add profile-owned branches with structured address, phone, timezone, weekly hours and supported action destinations.
- Use a small fixed set of typed sections; no generic plugin registry or arbitrary component JSON. Empty/disabled remains empty/disabled. Validate asset URLs and nested CMS objects at the boundary rather than broad casting.
- Replace name-prefix selection with exact slug/document selection. Keep `/buddas` as Budda's canonical route through the shared renderer; use `/p/[slug]` for additional profiles to avoid reserved/legal/API paths. Redirect `/p/buddas` permanently to `/buddas`; it must not render a second copy. Each profile has exactly one canonical route used by metadata, sharing, QR and JSON-LD identities. Unknown or unpublished profiles return 404 rather than Budda's content.
- Add fields without deleting existing CMS documents. Migrate the existing Budda's record/location fixture through a reviewed, reversible mapping. No external CMS writes during this planning task.
- Align actual draft-mode state, draft content fetch and preview redirect with the selected slug. Preview stays access-controlled and out of indexable public output; webhook refresh is restricted to verified matching profile paths.

Acceptance: two distinct restaurant fixtures render through the same code without brand leaks; `/p/buddas` redirects to `/buddas`; a bakery-only profile needs no app/catering/story fields; one- and two-location profiles work; unknown profile is 404; preview shows only its intended draft; updating one profile does not switch another profile's content.

### C — Establish one visual system and useful layout (P1)

Files: [globals.css](/D:/WORK/buddas/buddas/src/app/globals.css:1), [layout.tsx](/D:/WORK/buddas/buddas/src/app/layout.tsx:7), [QSRLinkPage](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:211), [header](/D:/WORK/buddas/buddas/src/components/BuddasStickyHeader.tsx:103), affected [skeleton components](/D:/WORK/buddas/buddas/src/components/SkeletonComponents.tsx:1).

- Map all components to one semantic token set: canvas, surface, text, muted text, primary action, focus and border. Retain a warm Budda's palette where appropriate; brand accents belong to profile data within accessible defaults. No need for a large theme catalog.
- Use the existing loaded font family if it serves the design, or remove its unused network load; keep one consistent type scale. Define the actual required radii/spacing and delete redundant token aliases once callers migrate.
- Implement the proposed phone hierarchy at every viewport width. Give the primary action the strongest emphasis; reviews/socials/apps are visually secondary. Keep long restaurant names readable.
- Generalize the existing header behavior and props rather than copying it for each restaurant. Prefer stable markup/CSS positioning to duplicate header measurement trees and scroll-driven replacement.

Acceptance: all used tokens resolve; header, link rows, cards and footer share one visual language; title and primary action visible at 390×844; no clipping at 320px; wider windows retain the same mobile column and bottom action; skeleton geometry matches the actual initial layout.

### D — Repair interaction and accessibility (P1)

Files: [QSRLinkPage](/D:/WORK/buddas/buddas/src/components/QSRLinkPage.tsx:181), [header](/D:/WORK/buddas/buddas/src/components/BuddasStickyHeader.tsx:51), [Toast](/D:/WORK/buddas/buddas/src/components/Toast.tsx:16), [global styles](/D:/WORK/buddas/buddas/src/app/globals.css:179).

- Keep manual scroll-snap promotions, remove autoplay by default, and add discoverable labeled navigation only where multiple cards require it. No new slider dependency.
- Add meaningful heading/landmark structure, skip link, visible focus, appropriate icon labels and text rating equivalents if verified reviews exist. Hide/delete measurement-only replicas.
- Use one consistent mobile primary-action bar; ensure the final content, controls, focus outline and anchor targets clear it and any sticky header, including safe areas. The bottom action remains part of the mobile frame even when viewed in a wider browser window.
- Make absent/invalid actions truly noninteractive or omit them. Replace blocking `alert` share feedback with the existing Toast after live-region repair; handle clipboard failure and native-share cancellation separately.

Acceptance: complete page usable by keyboard; focused elements never disappear on scroll or sit behind chrome; 44px product target for standalone controls; applicable contrast requirements measured; no JS autoplay with reduced motion; a no-JS visitor can still follow core links; feedback is announced without stealing focus.

### E — Connect profile SEO and measure performance (P1/P2)

Files: [page fetch/preload](/D:/WORK/buddas/buddas/src/app/buddas/page.tsx:203), [JSON-LD](/D:/WORK/buddas/buddas/src/components/JsonLd.tsx:43), [SEO helpers](/D:/WORK/buddas/buddas/src/lib/seo-utils.ts:5), [sitemap](/D:/WORK/buddas/buddas/src/app/sitemap.ts:1), [robots](/D:/WORK/buddas/buddas/src/app/robots.ts:1), [image/config policy](/D:/WORK/buddas/buddas/next.config.ts:18), [existing section components](/D:/WORK/buddas/buddas/src/components/BelowFoldSections.tsx:1).

- Generate title/description/canonical/share image and each location's `@id` from profile data and canonical routing. Branch schema matches visible facts. Do not carry Budda's names, logo, maps, social handles or policies into another profile.
- Keep static identity/links/sections in server-rendered HTML; narrow interactive client boundaries where a measured reduction justifies it. Inspect existing alternatives before reusing/deleting them; do not introduce layers merely to meet file-length targets.
- Capture a production-like baseline before removing duplicate preloads or changing cache/streaming boundaries. Make the loading boundary cover the actual async fetch if streaming is required. Preserve draft isolation and safe published caching.
- Size/compress real images; use one priority path for the leading image and lazy loading for optional lower sections. Confirm browser-safe blur generation. Account for tenant assets through controlled image hosts/CSP, not unrestricted remote images.

Acceptance: correct metadata and distinct location IDs for both fixtures; no draft pages in sitemap; essential content usable without hydration; no duplicate unnecessary leading-image request; failed image has a graceful layout; production-like results recorded and field CWV collection planned. Do not claim a field pass from a single local run.

### F — Make publishing and sharing measurable (P2)

Files: [analytics](/D:/WORK/buddas/buddas/src/lib/analytics.ts:43), [header sharing](/D:/WORK/buddas/buddas/src/components/BuddasStickyHeader.tsx:72), [QRModal](/D:/WORK/buddas/buddas/src/components/QRModal.tsx:27), [Toast](/D:/WORK/buddas/buddas/src/components/Toast.tsx:16), [CSP](/D:/WORK/buddas/buddas/next.config.ts:5).

- Retain existing event helpers; supply stable profile/link/branch/placement IDs and wire missing directions, calls, catering and sharing. Choose/configure a collection destination before claiming reports; adjust only necessary CSP domains. Analytics stays optional and never blocks navigation.
- Document total clicks, sessions with an action, per-link/branch activity and time to first meaningful action. Exclude preview/demo/local traffic from production interpretation. Ordering-provider completion is a separate integration requirement, not assumed from clicks.
- Wire the installed QR capability for the profile's canonical URL after accessible dialog/focus/download cleanup. Download name and theme are brand-neutral; remove the unnecessary canvas prerequisite if only data-URL download is required.
- Respect the selected provider's privacy controls; do not send personal data or full sensitive query strings in event payloads. This plan does not prescribe jurisdiction-specific legal requirements or automatically add trackers.

Acceptance: events appear once with the correct profile/branch in the selected destination's debugger; navigation works if analytics fails; share/copy/QR agree on the canonical URL; QR opens/closes with keyboard, restores focus and downloads a scannable profile code.

### G — Verify the reusable product and document editing (release gate)

Files: existing [customization guide](/D:/WORK/buddas/buddas/src/app/buddas/HOW_TO_CUSTOMIZE.md:1), [README](/D:/WORK/buddas/buddas/README.md:1), relevant focused regression fixtures and the existing [quality bar](/D:/WORK/buddas/buddas/QUALITY_BAR.md:1).

- Rewrite outdated source-edit instructions around actual Sanity fields, profile URLs, publishing/preview and content validation. Supply a complete restaurant example plus a sparse bakery example; label demos and exclude them from public indexing.
- Complete the acceptance matrix below. Review each theme/content state, not only the ideal Budda's example.
- Remove only confirmed duplicate/dead props and components after behavior protection; keep distinct intentionally supported states. No dependency additions.

Acceptance: a new restaurant is onboarded with CMS data only; reviewers can reproduce the checks and know which metrics remain unmeasured; `/buddas` and existing two-location schema continue to work; documentation matches the actual editor and runtime.

## Acceptance and verification matrix

| Scenario | Proof to collect |
| --- | --- |
| Sparse bakery, no apps/photos/reviews/catering | No empty shells, broken actions or Budda's fallback identity; one visible title/primary destination. |
| Single restaurant location | Address, local timezone/hours, directions/call/order are consistent in UI and JSON-LD. |
| Two branches with different hours/destinations | Each branch retains its own stable ID and action URLs; no global misleading Open/Closed claim. |
| Explicit empty/disabled CMS sections | Omission stays omitted, including empty link/promotions arrays; demo content is not resurrected. |
| Invalid URL, nested CMS value, missing image | Safe omission/fallback without unsafe navigation, crash or misleading content. |
| 320, 390, 768 and 1280px; long names/addresses | No horizontal document overflow, readable action hierarchy and unchanged mobile layout in wider windows. |
| Keyboard and assistive technology | Logical reading/focus order, meaningful headings/names, no duplicate measurement content, announced feedback; dialogs close/restore focus. |
| 200% text; 400% zoom; reduced motion; safe areas | Content and focused controls remain reachable; no autoplay; top/bottom chrome does not obscure actions. |
| Published versus draft/unknown slug | Profile isolation, protected correct draft preview, unknown/unpublished route 404, no preview cache/index leak. |
| JavaScript disabled, analytics unavailable, slow CMS | Core links and identity still usable; no analytics-dependent navigation; honest loading/unavailable states. |
| Production-like load and post-release field usage | Record LCP/CLS/interaction evidence and asset requests before/after; field p75 targets tracked per device once enough traffic exists. |
| Shared/QR profile URL | Stable intended public URL without local host or preview parameters; correct scan/copy/download; the Budda's alias redirects and never generates a second schema identity. |

Verification commands remain subject to the workspace instruction: **do not run lint, typecheck, tests or static analysis unless directly asked to run `npm run build`**. This planning task runs none. Browser observation, source inspection and official-source research establish current evidence; they do not establish full conformance. During implementation, add meaningful regression cases before cleanup, and execute the authorized checks only when the user supplies the required verification request. Independent manual review and the release matrix remain necessary even after automated checks are authorized.

## Risks, mitigations and sequencing decisions

- **Content migration:** keep current fields and `/buddas` during a reversible additive migration; preview both restaurant fixtures before public rollout. Never mutate unrelated CMS documents through name-prefix assumptions.
- **Different location destinations/hours:** require editorial verification, timezone-aware data and branch labeling. Keep “Hours vary by location” unless accurate per-branch current status is implemented; holiday overrides are deferred until supplied.
- **Theme accessibility:** restrict initial palette/font choices and validate supported combinations. Free-form CSS/HTML/theme code is outside version 1.
- **Feature growth:** optional typed sections and the existing CMS provide sufficient flexibility; no builder, checkout or account system is needed to prove reuse.
- **Analytics dependency:** collector selection is unresolved. Instrument only after that choice and preserve the links when collection is absent; do not present outbound clicks as sales.
- **Legacy components:** preserve behavior/error handling while consolidating. The older May Apple redesign document is background, not a mandate for every template's branding.
- **Rendering regressions:** establish lab baseline before server/client/cache changes and check preview isolation. Existing historical Lighthouse files are not evidence for this new template.
- **SEO expectations:** accurate structured data helps interpretation; search appearance and rich results are not guaranteed. Validate public deployed URLs after rollout.

A smaller internal review milestone is batches A–D: truthful content, profile ownership, consistent layout and accessible interactions. It is not a public release gate. Profile-specific SEO/schema/canonical ownership, sitemap/draft exclusion from E, and onboarding/release verification from G must be complete before any public rollout. Analytics and QR work in F are optional enhancements and may follow release. The renderer can stay shared without any SaaS infrastructure.

## Review record

Independent plan review completed; the three requested corrections were incorporated: a single canonical route per profile, an explicit public-release gate including SEO and onboarding verification, and distinguishing dead bare hash links from valid section fragments. This is a plan-quality review, not authorization to implement. No application source was changed while creating this plan.

## Implementation record — 2026-10-12

The user subsequently authorized implementation. Batches A–G now have local implementations: shared typed profile/CMS validation; additive editor schema; canonical profile routing and disabled/draft handling; server composition with a consistent responsive theme; manual promotions and keyboard-safe sharing/QR; safe optional analytics hooks; profile-owned SEO/schema/sitemap; truthful optional sections; and updated onboarding documentation. The existing Budda's branches and `/buddas` URL remain intact. Legacy branch/footer compatibility avoids mutating the live CMS during this work.

Deleted four confirmed unused alternative section/skeleton implementations, removed fake sample content, autoplay/header replicas, inert analytics initialization and raw-image preloading. Generic profile routes deliberately resolve before streaming: an eager loading boundary caused absent profiles and redirects to return HTTP 200, so it was removed to preserve proper 404/308 responses. Verified local responses: `/buddas` 200 with one JSON-LD graph and two distinct restaurant entries; sparse demo 200/noindex without restaurant schema or a primary bar; unknown profile 404; `/p/buddas` 308 to `/buddas`; preview without secret 401; revalidation GET 405. Mobile widths and desktop composition were inspected; QR generated the canonical URL, Escape closed it and restored the opener's focus. Independent manual source review corrections were incorporated for formatted phones, reserved location anchors, removal-webhook invalidation and legal-page skip targets/locality.

Regression cases were authored but not executed. No build, lint, typecheck, test or static-analysis commands ran. No dependencies were added, no live CMS document or environment secret was changed, and no deployment/commit was performed. Real draft-token operation, a live publication webhook, connected analytics, formal WCAG evaluation, production Core Web Vitals and TSX regression execution remain release checks. See [implementation report](/D:/WORK/buddas/buddas/docs/implementation/2026-10-12-restaurant-template.md) for the complete file inventory and evidence.

