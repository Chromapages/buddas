# Customize Budda's page

Use the **Landing Page** document in the existing Sanity Studio. The page is now an example of the shared restaurant template.

- Keep the profile slug `buddas`; `/buddas` stays canonical and `/p/buddas` redirects to it.
- Update actual brand text/logo, ordering/menu links, promotions and grouped secondary links in Sanity.
- Add Pleasant Grove and Salt Lake City to Locations with stable IDs `pleasant-grove` and `salt-lake-city`, complete addresses, phones, local timezone and verified weekly hours/actions.
- Until branch fields exist, verified local data keeps both location cards and JSON-LD available. Setting Locations to an empty array intentionally removes the cards.
- Empty optional story/gallery/catering/review sections stay empty. Reviews need original source links; no sample testimonials are published.
- Configure primary action or leave it absent to use ordering/menu. Disable it intentionally to remove the hero/bottom action.
- Warm/Neutral themes use the same accessible layout. Sharing and QR use the public canonical URL.
- Preview uses the protected draft route described in the repository README; publishing refreshes only the intended profile.

See the repository README for onboarding another restaurant, required server settings and verification limits. There are no `URLS`, `BRAND` or `PROMOS` constants to edit in the route anymore.
