# Budda's whole-page audit and repair plan

Scope: the current local Budda page, including the header, hero actions, promotions, favorites, two branches, catering, apps, socials, footer and QR flow. This audit uses screenshots and DOM observations from this run, plus targeted source review. No deployment, CMS edits, new dependencies or unrelated refactor.

## Captured baseline

Phone widths 320/360/390/420/480px show no document overflow, no overflow in the observed text containers, all nine images loaded, 8px hero clearance and no visible page control below 44×44px. Current 320px and 480px screenshots were inspected. Locations scroll to their anchor with about 90px clearance.

## Confirmed findings

1. QR on a 320×568px phone: the image renders at 202px while its box forces 280px height. This 78px excess pushes Copy link below the initial dialog view. Make the QR box a responsive square capped at its existing 280px width.
2. Keyboard focus on promotion cards: the 3px outline plus 4px offset needs 7px clearance; the horizontal scroller has only 4px padding and clips the outline. Use 8px padding and compensating margins in the Budda-scoped scroller so card alignment is retained.
3. Favorite links repeat each label through image alt text and visible text, confirmed by the current accessibility tree. Give each link the same single accessible label as its visible label, retaining the image's alt description.

## Repair boundaries and verification

Change only the existing QR sizing rule, the Budda promotion-scroller inset, and the favorite anchor label. These are CSS and declarative accessibility attributes; no new non-trivial code or unit test is needed. Recheck small-phone QR actions, copy feedback, Escape/focus restoration, complete promotion focus outline, carousel dots/arrows, branch anchors, control sizes, semantic names and current structured data. Save accepted final screenshots and notes. Do not run build/tests/lint/typecheck/static analysis under the workspace instruction.

User clarification: both businesses are in Utah. Correct the Terms' governing-law reference to Utah and remove the unsupported Honolulu court sentence. Update both policies' contact links to the published general business email, buddasbakery@gmail.com, and their revision date to October 12, 2026. The policy Back to Budda's navigation link measured 20px high; extend its hit height to 44px on both routes. Do not claim the policy text has received legal review.
