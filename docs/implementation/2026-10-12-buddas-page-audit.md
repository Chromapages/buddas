# Budda's page audit — October 12, 2026

## Result and scope

Six targeted issues repaired across layout, keyboard access, link names and policy pages. No further layout/interaction defects were observed in the states below. This is a focused frontend audit, not a guarantee that every browser, integration or legal requirement has been checked.

All screenshot evidence was captured and inspected during this run. The saved plan is `.omx/plans/2026-10-12-buddas-page-audit.md`. No live CMS changes, dependencies, deployment or new JavaScript behavior.

## 1. Main page — healthy in reviewed states

Observed 320/360/390/420/480px phone widths: no document or measured text-container overflow, all nine images loaded, no visible Budda control below 44×44px, and the hero retains its 8px gap. Header, favorites, branch cards, catering, app/social rows and footer wrap as intended. At 1280px the page remains capped at 480px.

One H1, ordered H2/H3 sections, no blank/placeholder links, and one JSON-LD graph with two distinct Utah restaurants were observed. Branch anchors, storefront URLs, phone numbers and menu fields still agree with the current cards.

![Main page after audit](/C:/Users/ericb/.codex/visualizations/2026/10/12/01a13194-fe43-75d2-9c92-a1116aaac75a/audit-page-final-390.png)

## 2. Promotions and favorites — repaired

The promotion focus outline needed 7px clearance but the scroller provided only 4px. Added 8px padding with compensating margins and matching scroll padding. Final keyboard observation measured 8px top, bottom and left clearance; the whole outline is visible. Dot 3 reached Promotion 3 of 3; Next reached 2 of 3; dot 1 restored the first slide. No autoplay was introduced.

Favorite links previously announced each name twice through alt text and visible labels. Explicit anchor labels now announce Budda Rolls, Loco Moco and Hawaiian Plates once; image descriptions remain present.

![Promotion keyboard focus after repair](/C:/Users/ericb/.codex/visualizations/2026/10/12/01a13194-fe43-75d2-9c92-a1116aaac75a/audit-focus-final.png)

## 3. QR and sharing — repaired; partial sharing review

At 320×568px, the QR image was 202px tall inside a forced 280px box, hiding Copy link initially. The existing QR box is now a responsive square capped at 280px. Its height matches the 202px image, both actions fit initially, and dialog scroll height matches its client height. Copy produced Link copied.; Escape restored focus to the QR trigger. The canonical URL and downloadable QR filename remain correct. No private clipboard content was read, native share transmission performed, or QR file downloaded.

![QR actions after repair](/C:/Users/ericb/.codex/visualizations/2026/10/12/01a13194-fe43-75d2-9c92-a1116aaac75a/audit-qr-after.png)

## 4. Locations, destinations and policies — corrected; content review remains

Find Locations reached its heading with about 90px clearance. Both branches retain their separate directions and call destinations. The [official menu](https://buddashawaiian.com/menu), [catering page](https://buddashawaiian.com/catering), [App Store listing](https://apps.apple.com/us/app/buddas-bakery-breakfast/id6758130475) and [Google Play listing](https://play.google.com/store/apps/details?id=com.owner.buddasbakerybreakfast) resolved to Budda's content. Social/review URLs were inspected on the page; login-dependent destinations, calls and navigation apps were not exercised.

Terms incorrectly named Hawaii and Honolulu. Following the user's Utah clarification, changed the governing-law sentence to Utah and removed the unsupported Honolulu court venue. Both policies now link the general email published by the [official restaurant site](https://buddashawaiian.com/), buddasbakery@gmail.com, and show October 12, 2026 as their update date. Their return links measured 20px high; both now measure 44px. Both policy routes render without overflow at 320px; Back to Budda's returned to `/buddas`. This does not establish legal approval.

![Utah Terms after correction](/C:/Users/ericb/.codex/visualizations/2026/10/12/01a13194-fe43-75d2-9c92-a1116aaac75a/audit-terms-after.png)

![Privacy contact and navigation after correction](/C:/Users/ericb/.codex/visualizations/2026/10/12/01a13194-fe43-75d2-9c92-a1116aaac75a/audit-privacy-after.png)

## Changes and simplifications

Changed `src/app/globals.css` (existing QR box and Budda scroller), `src/components/BuddasReferencePage.tsx` (favorite link labels), and `src/app/terms/page.tsx` / `src/app/privacy/page.tsx` (policy facts, date and return-link hit areas). Reused existing layout and native dialog behavior. No new abstractions or JS logic; no tests were added for these CSS, declarative-label and copy changes.

## Limits and merchant decisions

The poster says Available all day, while the official menu shows $9 Breakfast/Lunch/Dinner deals with specific time windows. The $9 price exists, but the broader availability claim needs merchant confirmation before changing published CMS content or reference artwork. Hero/Bento imagery remains illustrative, and storefront crops remain low resolution. No asset replacement was requested in this audit.

Build, automated tests, lint, typecheck and static analysis were not run under the workspace restriction. Browser logs contained no warning/error entries in the reviewed Budda states. Full WCAG, user text-spacing overrides, assistive-technology testing, real devices, deployed performance, Search Console, legal approval, checkout, installs and live integrations were not checked.

A legacy `time-utils.ts` helper mentions Honolulu but has no callers in the current page; it was not refactored. Current branch data uses Utah schedules and America/Denver.
