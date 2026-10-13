# Order Online CTA animation

Make the top ordering link more prominent with a gold stroke traveling around its rounded border.

- [x] Review the existing CTA, color tokens, focus treatment, and reduced-motion rule; calculate contrast for the declared text, stroke, and focus colors.
- [x] Add an order-specific class in `BuddasReferencePage.tsx`; keep its destination, accessible name, and analytics unchanged.
- [x] Add a masked conic-gradient border in `globals.css`, plus hover, active, focus, reduced-motion, and unsupported-browser treatments.
- [x] Run the existing 30 code checks and whitespace checks; deploy and verify the published markup and compiled styles. Browser checks remain deferred at the user's request.

## Design decisions

Use only the existing accent, focus, highlight, foreground, shadow, and radius tokens. The 2px decorative stroke is an explicit exception to the spacing grid: a narrow border, not layout spacing. Its thickness is defined once on the CTA for maintenance.

A CSS pseudo-element keeps the full anchor clickable and adds no accessible content or dependency. A registered angle property moves a conic-gradient highlight; a mask limits it to the perimeter. Browsers without conic-gradient or mask support retain the static gold border. Smooth angle interpolation requires registered custom properties; rendering is reserved for the final browser pass. SVG path geometry and JavaScript animation were considered; CSS avoids resizing logic and runtime state for this decorative effect.

Two 2.4-second laps stop after 4.8 seconds, avoiding an indefinitely moving element alongside page content (WCAG 2.2 SC 2.2.2). Hover or keyboard focus replays the same finite animation. Reduced-motion preferences disable it, and forced-colors mode retains a system-colored border and the native page focus treatment. Text remains white over the existing green; the focus outline is independent of the decorative stroke (SC 1.4.3, 1.4.11, and 2.4.7).

Assumptions: this is decorative emphasis on the existing ordering action, with no new destination, data, security exposure, or loading/disabled link behavior. No dependencies, network calls, or layout changes are needed. The same CSS serves every viewport; rendered behavior and target dimensions will be checked in the user's final browser pass.

Done when the public demo contains the scoped treatment, the code checks and build pass, and motion fallbacks are present. This treatment is for the primary ordering action; other links retain their existing styles.

Validation: all 30 code checks and the Vercel production build passed. HTTP checks confirmed the public ordering link and compiled animation/fallback styles. Declared white text contrast is 8.92:1 on the default green and 11.79:1 on hover; the gold stroke is 6.59:1 on the default green. Rendered motion, focus, and dimensions remain unverified until the final browser pass.
