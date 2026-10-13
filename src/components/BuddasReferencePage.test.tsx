import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { BuddasReferencePage } from "./BuddasReferencePage";
import { buddasProfile } from "../lib/buddas-profile";
import { PromoStrip } from "./PromoStrip";

test("reference page prioritizes real actions, preserves branch anchors, and uses the published Facebook fallback", () => {
  const html = renderToStaticMarkup(<BuddasReferencePage profile={{ ...buddasProfile,
    promos: [{ id: "bento", title: "Bento deal", imageUrl: "/buddas/hawaiian-plate.jpg", url: "https://buddashawaiian.com/menu" }],
    linkList: [{ id: "unsafe", label: "Facebook", icon: "facebook", url: "javascript:alert(1)" }],
  }} canonicalUrl="https://buddashawaiian.com/buddas" />);
  const headings = ["Order Online", "Featured at Budda", "Budda Rolls Online", "Our Locations"];
  headings.slice(1).forEach((heading, index) => assert.ok(html.indexOf(headings[index]) < html.indexOf(heading)));
  assert.ok(html.includes('href="https://buddashawaiian.com/menu"'));
  for (const location of buddasProfile.locations) {
    assert.ok(html.includes(`id="${location.id}"`));
    assert.ok(html.includes(`href="tel:${location.telephone}"`));
  }
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes('href="https://www.facebook.com/BuddasBakery"'));
  const webstore = html.match(/<section\b[^>]*aria-label="Budda Rolls online store"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(webstore);
  assert.ok(webstore.includes("Coming soon"));
  assert.ok(webstore.includes("delivery nationwide"));
  assert.ok(webstore.includes("budda-rolls.webp"));
  assert.ok(!/<(?:a|button)\b/.test(webstore));
  for (const absent of ["javascript:", 'href="#"', "mobile-primary", "Guest reviews", "Fan Favorites"]) assert.ok(!html.includes(absent), absent);
});

test("explicitly disabled primary leaves menu and location actions available", () => {
  const html = renderToStaticMarkup(<BuddasReferencePage profile={{ ...buddasProfile, primaryAction: null }} canonicalUrl="https://buddashawaiian.com/buddas" />);
  assert.ok(!html.includes("Order Online"));
  assert.ok(html.includes("View Menu"));
  assert.ok(html.includes("Find Locations"));
});

test("dedicated Bento art is restricted to the matching nine-dollar offer", () => {
  for (const title of ["$9 Bento Deal", "$12 Bento Deal", "Family plate"]) {
    const html = renderToStaticMarkup(<BuddasReferencePage profile={{ ...buddasProfile,
      promos: [{ id: "offer", title, imageUrl: "/buddas/hawaiian-plate.jpg" }],
    }} canonicalUrl="https://buddashawaiian.com/buddas" />);
    assert.equal(html.includes("bento-reference.png"), title === "$9 Bento Deal");
  }
});

test("icon-only social links preserve destinations and accessible platform names", () => {
  const html = renderToStaticMarkup(<BuddasReferencePage profile={{ ...buddasProfile,
    linkList: [{ id: "fb", label: "Follow us on Facebook", icon: "facebook", url: "https://www.facebook.com/verified-profile" },
      { id: "tt", label: "Follow us on TikTok", icon: "tiktok", url: "https://www.tiktok.com/@buddas" }],
  }} canonicalUrl="https://buddashawaiian.com/buddas" />);
  assert.ok(html.includes('href="https://www.facebook.com/verified-profile"'));
  assert.ok(html.includes('href="https://www.tiktok.com/@buddas"'));
  assert.ok(!html.includes("BuddasBakery"));
  assert.ok(!html.includes("Follow us on TikTok"));
  for (const platform of ["Facebook", "TikTok"]) {
    const link = html.match(new RegExp(`<a\\b[^>]*aria-label="${platform}"[^>]*>([\\s\\S]*?)</a>`));
    assert.ok(link, platform);
    assert.ok(link[0].includes('class="reference-social-link"'));
    assert.ok(link[1].startsWith("<svg"));
    assert.ok(!link[1].includes(platform));
  }
});

test("reference promotions expose manual navigation and reject unsafe specials destinations", () => {
  const html = renderToStaticMarkup(<PromoStrip count={2} title="Featured at Budda’s" seeAllUrl="javascript:alert(1)" compact><div>First deal</div><div>Second deal</div></PromoStrip>);
  for (const label of ["Previous promotion", "Next promotion", "Show promotion 1", "Show promotion 2"]) assert.ok(html.includes(label));
  assert.ok(html.includes('aria-current="true"'));
  assert.ok(!html.includes("javascript:"));
});

test("promotion and location carousels have independent controls and unique targets", () => {
  const html = renderToStaticMarkup(<BuddasReferencePage profile={{ ...buddasProfile,
    promos: [{ id: "first", title: "First special" }, { id: "second", title: "Second special" }],
  }} canonicalUrl="https://buddashawaiian.com/buddas" />);
  const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.includes("promotions"));
  assert.ok(ids.includes("location-cards"));
  for (const [label, target] of [["Next promotion", "promotions"], ["Next location", "location-cards"], ["Show location 2", "location-cards"]]) {
    const button = html.match(new RegExp(`<button\\b[^>]*aria-label="${label}"[^>]*>`))?.[0];
    assert.ok(button?.includes(`aria-controls="${target}"`), label);
  }
  for (const location of buddasProfile.locations) {
    assert.ok(ids.includes(location.id));
    assert.ok(html.includes(`href="tel:${location.telephone}"`));
    assert.ok(html.includes(`aria-label="Directions to ${location.name}"`));
  }
});
