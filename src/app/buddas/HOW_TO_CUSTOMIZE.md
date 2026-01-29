# How to Customize

This landing page is designed to be easily editable without touching complex code.

## 1. Updating Links & Text
Open `src/app/buddas/page.tsx`.
Look for the `DATA CONFIGURATION` section at the top of the component.

- **URLS**: Update the values in the `URLS` object.
- **BRAND**: Change the name, tagline, or logo URL.

## 2. Managing Specials (Carousel)
In `src/app/buddas/page.tsx`, find the `PROMOS` array.
Each item represents a card in the swipeable carousel.

```javascript
{
  title: "Item Name",
  subtitle: "Short description...",
  badge: "NEW", // Optional badge (e.g. NEW, POPULAR)
  imageUrl: "...", // Optional image URL
}
```

## 3. Deployment
When ready, run:
```bash
npm run build
```
Then deploy to Vercel or your preferred host.

## 4. Google Review Link
To get your specific Google Review link:
1. Go to your Google Business Profile.
2. Search for "Get more reviews".
3. Copy the link provided there.
4. Paste it into `URLS.googleReview`.
