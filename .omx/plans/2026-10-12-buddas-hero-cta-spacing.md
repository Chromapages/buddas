# Budda's hero CTA spacing adjustment

Plan saved before implementation.

## Scope

Move the top Order Online action down by 8px from the hero image. Change only `.buddas-reference .reference-actions` in `src/app/globals.css`. Normal document flow moves the entire hero action group and following content down together; this preserves the existing spacing between Order Online, View Menu and Find Locations.

## Button review

- Share/QR: retain their header alignment, 8px gap and accessible names.
- Hero actions: add an 8px image-to-action gap; retain the 8px secondary-row gap and existing hit areas.
- Promotions: retain independent arrows/dots, 44px hit areas and manual scroll behavior.
- Favorites: retain natural label wrapping and card padding.
- Locations: retain 12px details-to-actions clearance, 8px button gaps, aligned wide-phone action rows and narrow-phone stacking.
- Catering/app/social groups: retain existing inset and group spacing, balanced headings and wrap behavior.
- Legal links: retain 44×44px minimum hit areas and footer safe-area padding.

The previous complete spacing pass established a consistent 8/12/16/24px rhythm. Do not compensate for the new hero gap by shrinking downstream section margins or moving buttons with transforms. Do not alter link destinations, structured data, typography, images or other profile themes.

## Verification

Observe the actual hero-to-CTA gap at 320, 390, 425 and 480px. Confirm document overflow remains absent, all visible buttons/links keep their hit areas, and spacing between action groups remains unchanged. Save a mobile screenshot and visual verdict. This reversible one-property CSS adjustment needs no new unit test; build/tests/lint/typecheck/static analysis remain unrun under the workspace instruction.

## Completed

Changed one CSS property: hero action margin-top from 0 to 8px. Browser observations at 320/390/425/480px measured exactly 8px between hero and action group; secondary-row spacing remains 8px, section margins remain 24px (12px after carousel navigation), document width stays within the viewport, and no visible Budda link/button is below 44×44px. Browser warning/error log was empty.

Final screenshot: `C:/Users/ericb/.codex/visualizations/2026/10/12/01a13194-fe43-75d2-9c92-a1116aaac75a/buddas-cta-after.png`. Final visual verdict: pass, 95/100 for the requested small clearance adjustment. Build/tests were not run under the workspace instruction. No new tests were needed for the reversible one-property CSS edit; this was a focused browser review, not a renewed full accessibility audit.
