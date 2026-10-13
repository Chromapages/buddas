# Budda's supplied-reference redesign

Status: implemented and manually reviewed at 320, 390 and 425px. Final visual verdict 91/100; evidence and accepted adaptations are in `design-qa.md`. Automated checks were not run under the standing workspace restriction.
Reference: `C:/Users/ericb/AppData/Local/Temp/codex-clipboard-b7e07929-0084-4212-b5ed-e190b1e0d7f9.png` (851 × 1848 pixels, measured from the supplied file).

## Scope and visual truth

Match this supplied design on the existing mobile-only `/buddas` page. Keep the shared restaurant template and profile routes intact. The reference supersedes the earlier generic layout for Budda's: use a food-led hero, deep teal/green actions, off-white paper, image-led featured cards, food favorites, compact branch cards, catering strip, separate store badges and social buttons, and a simple legal footer. Do not reproduce the operating-system home indicator as website content.

The reference has no declared CSS viewport/density. Use its section order, proportions, palette and imagery as visual truth, with readable 390–480px phone content and at least 44px standalone controls. Within the phone frame, locations may form two compact cards on wider phones but stack on narrow phones; no desktop grid or viewport expansion. Preserve valid destinations, verified Utah contact details and location schema. Use 2026 in the copyright footer.

## Asset inventory

- Hero artwork: turquoise Budda's identity on cream, warm food photography on the right, rolls on an oval plate, small handwritten marketing accents. Reuse supplied/native brand assets where suitable; generate missing promotional artwork from this exact reference with imagegen.
- Featured artwork: the existing CMS $9 Bento promotion, plus other current promotions; keep actual provided artwork and image text together instead of recreating posters with CSS.
- Favorites: food thumbnails for Budda Rolls, Loco Moco and Hawaiian Plates. Prefer real official source photos; reference-inspired generated artwork is promotional illustration, not evidence of the menu or actual storefront.
- Branch photos: use real user-supplied/source storefront images where available. Do not generate fictitious premises and label them actual stores. If a storefront image cannot be sourced, show a verified branch without a fake photo.
- Decorative leaves/flower are image assets if used, not hand-drawn SVG/CSS art. Standard interface icons come from installed icon libraries; reuse working Share/QR behavior.

## Implementation sequence

1. Inspect active components/data and authoritative assets. Save this plan before edits. Add a focused regression case for reference section order, working real links, branch IDs and no invented Facebook destination before implementation; do not execute tests under the standing workspace restriction.
2. Prepare the above-fold artwork and sourced thumbnails in `public/buddas/`, retaining the provenance of each. Asset work is independent of the server UI and can run in parallel.
3. Add a Budda-specific server presentation using the existing `TrackedLink`, `PromoImage`, `PromoStrip` and Share/QR header. Route only Budda's through it; keep other restaurant profiles unchanged. Extend the promotion strip minimally for the reference heading, optional specials link and accessible current-slide controls.
4. Scope visual changes to a Budda reference class in `globals.css`: teal text, soft cream, fine warm borders, small rounded white buttons, photo proportions and tighter vertical rhythm. Keep the 480px maximum mobile frame, focus rings, reduced-motion support, safe navigation and real HTML interactions. Remove the redundant floating Order bar on this presentation to match the supplied reference; retain the prominent hero action.
5. Present Order/Menu/Locations, featured specials and favorites first. Group current CMS catering, iPhone/Android and social/review links into reference sections rather than the generic list. Use Facebook only if a valid actual destination is provided. Populate branch facts from the existing profile; never alter verified addresses, phone numbers or hours to chase image fidelity.
6. Inspect `/buddas` and the sparse non-Budda example in the in-app browser. Check mobile overflow, promotion controls, section anchors and QR/Escape focus. Compare the reference and current capture in the same review input, save `design-qa.md` and the visual-verdict record, fix substantive differences, and repeat. Keep the dev server running on 3010 with Webpack.

## Files and responsibilities

- Parent: integration in `RestaurantProfilePage.tsx`, brand-specific presentation/data/assets, regression case, plan/provenance and QA.
- Bounded UI agent: `BuddasReferencePage.tsx`, scoped CSS, minimal `PromoStrip.tsx` changes if assigned; preserve other agents' edits and the generic template.
- Bounded asset agent: generated hero asset only; no source edits, browser or deployment.
- Asset researcher: inspect real official food/storefront sources and current CMS assets; no live CMS changes.

## Completion evidence and limits

The page must render all available reference sections in the intended order with functional real actions, two distinct branch IDs matching JSON-LD, and no document overflow at phone widths. Header Share/QR remains functional; the generic bakery example retains its own identity and sparse layout. Visual QA compares matching mobile state/density and records accepted deviations such as genuine logo/storefront availability.

No new dependencies, live CMS writes, environment changes, deployment or commits. Do not run build/lint/typecheck/tests/static analysis unless directly asked to run `npm run build`. Browser observation and source review are the authorized verification here. Generated food artwork is illustrative; actual merchant facts and destinations come from existing content and official sources.
