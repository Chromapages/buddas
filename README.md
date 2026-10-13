# Restaurant link pages

A reusable, mobile-only restaurant link-in-bio template built with Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Sanity. Budda's uses a presentation based on the supplied visual reference; additional restaurants use the shared renderer and profile schema. Every viewport keeps the phone layout capped at 480px; wider browser windows center it.

## Local development

```powershell
npm run dev -- --port 3010 --webpack
```

Open http://localhost:3010/buddas. Webpack avoids the Turbopack/Tailwind resolution problem observed in this checkout. `/p/buddas` permanently redirects to `/buddas`; other restaurants use `/p/<slug>`. `/examples/bakery` is a visibly labeled, noindex sparse example.

## Configure a restaurant

In your existing Sanity Studio, create a **Landing Page** document:

1. Give it a unique, stable lowercase **Profile URL slug** such as `neighborhood-bakery`. Keep Budda's slug `buddas`.
2. Enter the actual business name, logo, brief description, cuisines and one of the accessible Warm/Neutral themes.
3. Add ordering/menu/review destinations and the primary action. If primary action is absent, ordering then menu is used; disabling a configured primary action hides it.
4. Add and reorder useful links. Set Group to organize catering, rewards, apps or social links. Disabled and invalid entries do not render.
5. Add each real branch with a stable ID, complete address, phone with country code, timezone and weekly hours. Branch ordering, menus, reviews and maps are separate destinations.
6. Add optional promotions, story, gallery, catering or actual source-linked testimonials. Empty sections stay empty; business facts and reviews are never fabricated. Budda's custom presentation additionally uses reference-inspired promotional illustration, documented in `public/buddas/generated-artwork.md`.
7. Add profile-specific SEO and footer/legal links where supplied. Never link another restaurant to Budda's policies by default.
8. Publish, then visit `/p/<slug>`. No JSX copy is needed. The Publicly available setting can unpublish the route.

Existing Budda's documents without a slug remain supported by the legacy query. Its verified local contact fallback supplies two branches only until CMS branch fields are present. An explicit empty branch list removes them. Missing legacy footer fields preserve its existing policy links. Other profiles never receive Budda's fallback content. Assign a slug when next editing the document.

### Server configuration

Use the existing Sanity project/dataset configuration. Set `NEXT_PUBLIC_BASE_URL` to the public origin used for canonical URLs, sharing, QR codes, sitemap and structured data. Keep it an origin without a profile path. The default remains `https://buddashawaiian.com` for this installation.

Draft preview requires a server-only `SANITY_API_READ_TOKEN` with draft read access and `SANITY_PREVIEW_SECRET`. Enter preview through `/api/preview?secret=<secret>&slug=<slug>`. The route validates the profile before enabling Next draft mode, fetches the drafts perspective without CDN caching, labels the page and disables indexing/analytics. Exit preview returns to the selected profile's canonical route. Do not put read tokens in `NEXT_PUBLIC_*` variables or distribute secret-bearing preview links.

For a Sanity webhook, set `REVALIDATE_SECRET` and send a POST to `/api/revalidate?secret=<secret>`. JSON may include a slug string, a Sanity `{ "current": "your-slug" }` slug object, or `_id`; a `slug` query parameter is also supported. The route resolves document IDs or validates explicit slugs, refreshes only the canonical profile path and sitemap, and rejects arbitrary paths. Include the previous slug in deletion events so the old page can be invalidated after its document disappears. Existing no-body calls target Budda's. Keep webhook secrets private.

## Frontend behavior

- Identity and primary action come before specials and secondary links.
- The shared template stays in one mobile column with a persistent bottom action and safe-area clearance. Budda's reference presentation uses hero ordering, three favorite cards and compact branch cards on wider phones, stacking branches below 420px. Both stay within the same 480px phone frame.
- Promotions use manual CSS scroll snap and labeled buttons. No automatic movement.
- Static sections render on the server. Small client components handle tracked links, sharing, image errors, promotions and the lazy QR dialog.
- Share/copy/QR use the canonical profile URL, independent of the current scroll fragment or preview query. Native dialog manages keyboard focus and Escape.
- Theme choices share coherent tokens and the already installed Outfit/Work Sans fonts. Supported links are validated at the content boundary and again where used.
- Images accept exact HTTPS `cdn.sanity.io`/`images.unsplash.com` hosts or safe local paths, matching Next Image/CSP configuration. Use actual Sanity uploads rather than remote stock fallbacks.

## Analytics

The template emits optional events into an existing `window.dataLayer` with stable `profile`, `link_id`, `location` and `placement` fields. It does not install a tracking service, set tracking cookies or send events to a new provider. Navigation works if analytics is unavailable. Configure your selected collector and required CSP/privacy settings separately before interpreting these hooks as reporting.

Events include ordering, menu, locations, directions, calls, reviews, catering, links, sharing and QR opening. Outbound clicks do not prove completed orders. Preview and demo traffic are excluded. Sensitive URLs and personal information are not included in event payloads.

## Verification and limits

Focused regression cases are saved next to profile helpers, CMS normalization, analytics and UI/JSON-LD. They were authored before cleanup, but **no tests, build, lint or typecheck ran** under the workspace instruction requiring an explicit `npm run build` request. This checkout has no configured TSX test runner; use approved existing tooling to execute those cases before a production release, without adding a dependency unless requested.

Manual browser review covers the real Budda's page, sparse example, primary-action hierarchy, phone layout, heading structure, carousel and QR focus. Wider-window observation checks that the mobile layout is retained; it is not a separate desktop design. Production Core Web Vitals, a formal WCAG audit, live draft credentials, webhook publication and analytics collector verification remain separate deployment checks. Do not infer those results from localhost or historical Lighthouse files.

See `.omx/plans/2026-10-12-restaurant-link-in-bio-ui-plan.md` for the reusable template scope. Budda's supplied-reference plan is `.omx/plans/2026-10-12-buddas-reference-redesign.md`; final mobile captures, behavior evidence, changed files and asset limitations are recorded in `design-qa.md`. Version 1 is a reusable CMS template, not an account/billing/checkout platform.
