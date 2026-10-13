# Budda's mobile spacing review

Plan saved before CSS edits. Scope: existing `.buddas-reference` styles in `src/app/globals.css`; preserve links, data, sections, schema, assets and the shared restaurant renderer.

Baseline at 390px: outer gutters 20px, ordinary section margins 20px, favorites margin 6px, catering margin 18px, card/control gaps 6–10px. Legal controls are 44px tall but only 26–31px wide. Narrow content gutters differ from the header/footer.

Use a coherent 4px spacing scale: 8px related controls, 12px card/content gaps, 16px card padding, 24px section separation. Keep the reference's 20px wide-phone gutters, align all narrow-phone gutters at 16px, preserve compact poster navigation and 44px minimum controls. Let content wrap naturally instead of imposing text heights. No JavaScript, dependencies, component refactor or CSS-only unit tests are needed.

Standards checked: [W3C target size (enhanced, AAA)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html), [320px reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [user-adjustable text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), and [Vercel interface guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). The chosen spacing scale is a design judgment; WCAG does not prescribe section margins.

Verification plan: compare reference/baseline/final captures, observe 320/390/425/480px phone layouts, inspect gaps and control dimensions, check wrapping/overflow and carousel focus. Do not run build/tests/lint/typecheck/static analysis under the standing workspace restriction.

## Completed changes and evidence

Only product source changed: `src/app/globals.css` (Budda-scoped rules). Used existing flex/grid, wrapping and spacing values; no scripts, new components, dependencies or data changes.

- Ordinary section separation is 24px; the carousel-to-favorites gap is 12px because the 44px carousel navigation already provides visual space.
- Card gaps/detail gaps are 12px, related controls are 8px apart, and standard location/catering insets are 16px. Wider two-column location cards use 12px insets to preserve usable text width.
- Heading-to-content gaps, app/social groups and footer spacing now follow the same scale. Catering headings balance wrapped lines; favorite labels retain natural wrapping.
- Header/content/footer align to 16px gutters at 320px and 20px on wider phones. Legal links now have at least 44px width as well as height; footer retains safe-area padding.

Manual browser observations at **320, 390, 425 and 480px**: document width did not exceed viewport width; no visible Budda link/button was below 44×44px. Branches stack on narrow phones, form two columns on wider phones and their action rows align. Visual captures showed no text clipping or overlapping content. Next promotion changed the live position to 2 of 3; the first dot restored 1 of 3. Keyboard Tab focused Find Locations with a 3px outline and 4px offset. The final browser warning/error log was empty.

Before/after 390px screenshots are saved in `C:/Users/ericb/.codex/visualizations/2026/10/12/01a13194-fe43-75d2-9c92-a1116aaac75a/` as `buddas-spacing-before-390.png` and `buddas-spacing-after-390.png`. Additional width captures use `buddas-spacing-after-{320,425,480}.png`. Final visual verdict: 93/100, pass for the spacing refinement; this is a manual design assessment, not a formal accessibility certification.

Guideline findings resolved in `src/app/globals.css`: uneven related spacing, inconsistent narrow gutters, small legal target widths, and the catering heading widow. Functional components, validated destinations and structured data remain unchanged.

Build, lint, typecheck, static analysis and automated tests were not run under the workspace restriction. No unit tests were added for these reversible CSS-only edits. Formal WCAG conformance, real-device safe-area behavior, user text-spacing overrides and production performance remain unchecked. Page height increased slightly to give content consistent breathing room.
