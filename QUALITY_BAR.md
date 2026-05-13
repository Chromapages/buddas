# QUALITY_BAR.md

Project: Budda's Hawaiian Bakery & Grill (linktree-style QSR site)
Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Sanity CMS
Deployment: Vercel
Owner: Chromapages
Last Updated: 2026-05-13

---

## 1. Commands Table

| Command       | Script                         | Flags                          |
|---------------|--------------------------------|--------------------------------|
| Dev server    | `npm run dev`                  | —                              |
| Build         | `npm run build`                | —                              |
| Start         | `npm run start`                | —                              |
| Lint          | `npm run lint`                 | `--fix`                        |
| Type check    | `npx tsc --noEmit`             | —                              |

> No test framework configured. See §6 for setup requirements before merging.

---

## 2. Code Style Rules

### Typing Policy
- Use explicit return types on all exported functions and page components
- No `any` — use `unknown` and narrow accordingly
- Prefer `type` over `interface` for plain data shapes

```tsx
// Correct
export async function generateMetadata(): Promise<Metadata> { ... }

// Wrong — implicit any on params
export default function Page({ params }: { params: { slug: string } }) { ... }
```

### Naming Conventions
| Entity            | Convention                        | Example                        |
|-------------------|-----------------------------------|-------------------------------|
| Pages             | lowercase-kebab                   | `privacy/page.tsx`            |
| Components        | PascalCase                        | `QRModal.tsx`                 |
| Utilities/lib     | camelCase                         | `image-utils.ts`, `cn.ts`     |
| Sanity schemas    | camelCase                         | `landingPage.ts`              |
| Environment vars   | UPPER_SNAKE                       | `NEXT_PUBLIC_SANITY_PROJECT_ID` |
| CSS classes       | Tailwind utility pattern          | `flex items-center gap-2`     |

### Max File / Function Length
- Max 300 lines per file
- Max 80 lines per function (excluding page components)

### Export Conventions
- One component per file (default export preferred)
- Utilities can use named exports
- Barrel `index.ts` re-exports allowed for schema types

### Import Ordering
1. React / Next.js built-ins
2. Third-party packages
3. `@/` aliases (lib, components, sanity)
4. Relative imports (`../../`)
5. Type imports (`import type { ... }`)

```tsx
// Correct order
import { useState } from "react";
import { Metadata } from "next";
import { clsx } from "clsx";
import { client } from "@/sanity/lib/client";
import { landingPageQuery } from "@/sanity/lib/queries";
import type { LandingPageData } from "@/sanity/lib/queries";
```

### React Compiler
- Babel plugin `babel-plugin-react-compiler` is enabled
- Components must be pure — no side effects without `use` hooks
- Avoid direct mutation in render paths

---

## 3. Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes (revalidate, preview, exit-preview)
│   ├── buddas/                   # Main landing page
│   ├── privacy/                  # Privacy policy page
│   ├── terms/                    # Terms of service page
│   ├── layout.tsx                # Root layout with fonts and providers
│   ├── page.tsx                  # Root redirect
│   ├── globals.css               # Global styles + Tailwind
│   ├── robots.ts                 # robots.txt generation
│   └── sitemap.ts                # sitemap.xml generation
├── components/                   # Shared UI components
│   ├── BuddasStickyHeader.tsx    # Sticky nav header
│   ├── JsonLd.tsx                # Structured data (Restaurant schema)
│   ├── QRModal.tsx               # QR code display modal
│   ├── QSRLinkPage.tsx           # Link grid section
│   ├── SkeletonComponents.tsx    # Loading skeletons
│   └── Toast.tsx                 # Toast notifications
├── lib/                          # Utilities and config
│   ├── analytics.ts              # Google Analytics wrapper
│   ├── cn.ts                     # clsx + tailwind-merge helper
│   ├── image-utils.ts            # Image URL validation
│   ├── seo-utils.ts              # OG image URL builder
│   └── time-utils.ts             # Business hours logic (isBuddaOpen)
└── sanity/                       # Sanity CMS integration
    ├── env.ts                    # Environment variable setup
    ├── structure.ts              # Sanity Studio structure
    ├── lib/
    │   ├── client.ts             # Sanity client singleton
    │   ├── image.ts              # image URL builder
    │   ├── live.ts               # Live query subscription
    │   └── queries.ts            # GROQ queries + TypeScript types
    └── schemaTypes/
        ├── index.ts              # Schema registration
        └── landingPage.ts        # Landing page document schema
```

### Environment Variables
- Accessed via `sanity/env.ts` or `process.env` — never inline in components
- Public vars use `NEXT_PUBLIC_` prefix
- Sensitive vars (project IDs, tokens) stay server-side only

### API Calls
- All Sanity GROQ queries go through `sanity/lib/client.ts`
- No raw `fetch` in components — wrap in a query function

### Types
- Types live alongside their query in `sanity/lib/queries.ts`
- Shared types can be imported from there via `@/sanity/lib/queries`

---

## 4. Three-Tier Boundary System

### Always Do
- Run `npm run lint -- --fix` before committing
- Run `npx tsc --noEmit` — zero type errors required
- All Sanity queries must have TypeScript result types
- `metadata` export on every page and layout
- `alt` text on all `<img>` tags
- Structured data (JsonLd) on restaurant pages
- Security headers in `next.config.ts` (CSP, X-Frame, etc.)
- Input validation on API routes (type-safe params)
- Sanity token validation on preview routes

### Ask First
- Adding new npm packages (run `npm audit` first)
- Changing `next.config.ts` headers or CSP
- Adding new Next.js image domains to `remotePatterns`
- Modifying schema types in `sanity/schemaTypes/`
- Adding new environment variables

### Never Do
- Commit `.env.local` or any file with live secrets
- `console.log` in production code — use structured logging via `analytics.ts`
- Bypass lint or type errors to "get it deployed"
- Directly mutate `params` or `searchParams` objects
- Use `'unsafe-inline'` in CSP beyond what `next.config.ts` already sets
- Add `?secret=` bypass without team approval

---

## 5. Testing Standards

> ⚠️ No test framework is currently configured. This is a gap — add one before merging features.

### Required Test Types
- **Unit** — utility functions (`cn.ts`, `time-utils.ts`, `seo-utils.ts`)
- **Integration** — API routes (`src/app/api/`)
- **E2E** — critical user flows (loading /buddas page, QR modal open)

### Framework to Add
Vitest + React Testing Library (aligned with Next.js + TypeScript stack)

### Coverage Threshold
- Block merge below **70%** line coverage
- Critical paths (API routes, auth flows) require **90%+**

### New Test Requirement
A test must be written when:
- Adding a new utility function in `src/lib/`
- Adding a new API route
- Adding a new component with conditional logic
- Modifying business hours logic (`time-utils.ts`)

### Test Colocation
- Tests live next to the file they test: `lib/cn.ts` → `lib/cn.test.ts`
- E2E tests in `tests/` or `e2e/` at project root

### Commands (when framework added)
```bash
npm run test           # Run all tests
npm run test -- --coverage  # Coverage report
npm run test -- --watch    # Watch mode
```

---

## 6. Defect Definitions (Three-Tier Severity)

### Critical — Zero Tolerance (Blocks Deploy)
- Exposed API key or Sanity token in client-side code
- Missing auth check on preview API route
- CSP bypass or XSS injection vector in user input
- Data loss risk (cache invalidation breaking content)
- Production crash with no error boundary
- Broken /buddas page (main customer flow)

### Major — Blocks Merge
- Feature output doesn't match spec (missing links, wrong hours)
- TypeScript `any` without explicit justification comment
- `npx tsc --noEmit` exits non-zero
- `npm run lint` reports errors (excluding warned rules)
- Coverage below 70% (when test framework is added)
- Missing `alt` on images contributing to Lighthouse accessibility < 90
- Unhandled promise rejection in API routes
- Adding a package without running `npm audit`
- Performance budget regression (LCP > 2.5s)

### Minor — Non-blocking (Track and Fix)
- Naming convention violation (file/component naming)
- Missing JSDoc on exported utility functions
- `console.log` remaining in non-dev code
- Formatting inconsistency (run `npm run lint -- --fix` to fix)
- Missing `loading="lazy"` on non-critical images
- Duplicate imports (auto-fixable via lint)

---

## 7. Performance Budget

| Metric                 | Threshold          | Block Merge If Exceeded |
|------------------------|--------------------|-------------------------|
| Lighthouse Performance | ≥ 90               | Yes                     |
| Lighthouse Accessibility | ≥ 90             | Yes                     |
| First Contentful Paint | < 1.8s             | Yes                     |
| Largest Contentful Paint | < 2.5s           | Yes                     |
| Total Blocking Time    | < 200ms            | Yes                     |
| Cumulative Layout Shift | < 0.1             | Yes                     |
| JS Bundle (gzipped)    | < 150KB            | Yes                     |
| API response p95       | < 500ms            | Yes                     |
| Build time (warn)      | > 120s             | Alert only              |

> Measured on mobile emulation via Lighthouse CI or WebPageTest.

---

## 8. Reliability Targets (SLOs) — Production

| SLO                      | Target          | Window  |
|--------------------------|-----------------|---------|
| Availability             | 99.9%           | 30 days |
| API /buddas page p95     | < 500ms         | Rolling |
| Error rate (5xx / req)   | < 0.1%          | 30 days |
| Error budget             | 43.2 min/month  | 30 days |

### Error Budget Freeze Rule
- If error budget exceeds 50% within a 7-day window, all deploys halt until review
- SEV-3 incident is opened; on-call is paged

---

## 9. Observability Requirements — Production

### Structured Logging
All server-side logs must include:
```
timestamp, level, service, traceId, userId, path, method, statusCode
```
No `console.log` in production — use the analytics wrapper or a structured logger.

### Distributed Tracing
- OpenTelemetry traces on all API routes
- TraceId propagated via response headers (`X-Trace-Id`)
- Sanity query duration tracked as custom span

### Required Health Endpoints
- `GET /healthz` — returns `{ status: "ok" }` with 200
- `GET /readyz` — checks Sanity connectivity before returning 200

### Metrics to Track
- Request rate (req/min)
- Error rate (5xx as % of total)
- Latency histograms (p50, p90, p95)
- Sanity API quota usage

### Alert Thresholds
| Alert                  | Threshold                         | Action              |
|------------------------|-----------------------------------|---------------------|
| Error rate spike       | > 1% 5xx for 5 min               | Page on-call        |
| Latency degradation    | p95 > 1s for 10 min              | Page on-call        |
| Build failure          | Any CI failure                    | Notify via Slack    |

---

## 10. Incident Response — Production

### SEV Levels
| SEV   | Definition                                      | Response SLA |
|-------|-------------------------------------------------|--------------|
| SEV-1 | Site down or complete data loss                | 15 min       |
| SEV-2 | Core feature broken (orders, menu not loading) | 30 min       |
| SEV-3 | Minor degradation, non-critical bug             | 4 hours      |

### Runbook: /buddas Page Down
1. **Symptoms** — Users report blank page or 500 on `/buddas`
2. **Blast radius** — All organic/social traffic loses ordering capability
3. **Diagnosis**
   - Check Vercel deploy status
   - Check Sanity project status (sanity.io/status)
   - Verify GROQ queries in Sanity Vision
   - Check Next.js error logs in Vercel
4. **Recovery**
   - Revert to previous deploy if build error
   - Disable Sanity live preview if query loop causing load
   - Roll back to last known good sanity dataset if data corruption
5. **Escalation** — Page on-call → open SEV-1 Slack thread → notify stakeholders

---

## 11. Deployment Standards — Production

### Feature Flags
- User-facing changes to menu, hours, or links must be tested via Sanity preview first
- No hard-coded content changes without Sanity-backed workflow

### Rollback (RTO)
- Target: < 5 minutes to previous deploy
- Vercel dashboard: immediate rollback to any prior deployment
- Sanity content: revert via Sanity dataset restore (last 30 days)

### Zero-Downtime Deploy
- Vercel handles this automatically for Next.js
- Ensure `next.config.ts` `headers()` doesn't introduce 500 during deploy

### Database / Schema Migrations
- Sanity schema changes must be backward-compatible
- Never delete a field from a Sanity schema without migration plan
- Test schema changes in draft mode before publishing

---

## 12. Dependency & Supply Chain

### CVE Audit
```bash
npm audit
```
- Zero high/critical CVEs allowed in direct dependencies
- If found: update immediately, or open security ticket with urgency label

### Lockfile
- `package-lock.json` must be committed on every dependency change
- Never run `npm install` without committing the lockfile update

### Version Pinning
- Production deps use `^` for minor/patch flexibility
- Dev deps (ESLint, TypeScript) use exact `major.minor.patch` pinning
- Sanity packages: pin minor version (`11.6.12`, not `^11`)

### License Audit
- No GPL-3.0 or copyleft deps in production bundle
- Check new packages via `npm ls --depth=0` and review LICENSE files

### Third-Party SLA Documentation
- Vercel: documented at vercel.com/legal
- Sanity: documented at sanity.io/legal

---

## 13. Git Workflow

### Branch Naming
- Feature: `feat/description`
- Bug fix: `fix/description`
- Chore: `chore/description`

### Commit Messages
Conventional Commits format:
```
feat(buddas): add QR modal for store links
fix(layout): correct metadata description length
chore(deps): update sanity to 11.6.12
```

### PR Requirements
- CI must be green (lint + type check)
- At least one reviewer
- PR description must link to relevant context (Slack thread, issue, etc.)
- No force pushes to main

---

## 14. Definition of Done

Task is complete when ALL items pass:

1. Feature works per spec — content renders correctly on `/buddas`
2. `npm run lint` exits with zero errors
3. `npx tsc --noEmit` exits with zero errors
4. All images have `alt` text; accessibility score ≥ 90
5. Metadata exported and matches page content
6. No secrets or tokens in client-side code
7. Sanity queries have TypeScript result types
8. `npm run build` completes without errors
9. Performance budget met (LCP < 2.5s, Lighthouse Perf ≥ 90)
10. PR reviewed and approved
11. Agent self-audit completed (checklist below)

---

## 15. Agent Self-Audit

After completing any task, run this checklist before handoff:

1. **Commands** — Do build, lint, and type check all pass?
2. **Defects** — Were any Critical or Major defects introduced? How resolved?
3. **Boundaries** — Were all Always Do / Ask First / Never Do rules respected?
4. **Tests** — Are new tests written for all new logic? (when framework added)
5. **Performance** — Are all budget thresholds still met?
6. **Observability** — Are new code paths logged and traced? (production)
7. **Security** — Are inputs validated? No secrets committed?
8. **Spec alignment** — Does the output match the feature spec exactly?

Report format:
- [item] — passed
- [item] — deferred, reason: [reason], ticket: [ref]
- [item] — FAILED, action taken: [description]

Do not mark a task complete until all Critical items are resolved.

---

## Lessons Learned
<!-- Add gotchas, footguns, and non-obvious decisions here as discovered -->
- [2026-05-13] General: Sanity live queries (`sanity/lib/live.ts`) can cause heavy load during development — use `use effect` + revalidate instead of subscribing in production
- [2026-05-13] CSP: The `unsafe-inline` in `next.config.ts` CSP is required for Next.js to function — do not remove it without understanding the blast radius
- [2026-05-13] Images: Unsplash images must use `images.unsplash.com` in `remotePatterns` — direct CDN URLs from Sanity must use `cdn.sanity.io`
- [2026-05-13] Testing: No test framework is currently configured — this is a priority gap before shipping any non-trivial feature