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
  const headings = ["Order Online", "Featured at Budda", "Fan Favorites", "Our Locations"];
  headings.slice(1).forEach((heading, index) => assert.ok(html.indexOf(headings[index]) < html.indexOf(heading)));
  assert.ok(html.includes('href="https://buddashawaiian.com/menu"'));
  for (const location of buddasProfile.locations) {
    assert.ok(html.includes(`id="${location.id}"`));
    assert.ok(html.includes(`href="tel:${location.telephone}"`));
  }
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes('href="https://www.facebook.com/BuddasBakery"'));
  for (const absent of ["javascript:", 'href="#"', "mobile-primary", "Guest reviews"]) assert.ok(!html.includes(absent), absent);
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

test("valid CMS Facebook destination takes precedence and compact social labels preserve destinations", () => {
  const html = renderToStaticMarkup(<BuddasReferencePage profile={{ ...buddasProfile,
    linkList: [{ id: "fb", label: "Follow us on Facebook", icon: "facebook", url: "https://www.facebook.com/verified-profile" },
      { id: "tt", label: "Follow us on TikTok", icon: "tiktok", url: "https://www.tiktok.com/@buddas" }],
  }} canonicalUrl="https://buddashawaiian.com/buddas" />);
  assert.ok(html.includes('href="https://www.facebook.com/verified-profile"'));
  assert.ok(html.includes('href="https://www.tiktok.com/@buddas"'));
  assert.ok(!html.includes("BuddasBakery"));
  assert.ok(!html.includes("Follow us on TikTok"));
});

test("reference promotions expose manual navigation and reject unsafe specials destinations", () => {
  const html = renderToStaticMarkup(<PromoStrip count={2} title="Featured at Budda’s" seeAllUrl="javascript:alert(1)" compact><div>First deal</div><div>Second deal</div></PromoStrip>);
  for (const label of ["Previous promotion", "Next promotion", "Show promotion 1", "Show promotion 2"]) assert.ok(html.includes(label));
  assert.ok(html.includes('aria-current="true"'));
  assert.ok(!html.includes("javascript:"));
});
