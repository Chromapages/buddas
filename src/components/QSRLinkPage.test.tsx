import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { QSRLinkPage } from "./QSRLinkPage";
import type { RestaurantProfile } from "../lib/profile-types";

const bakery: RestaurantProfile = {
  slug: "bakery", canonicalPath: "/bakery", theme: "neutral",
  brand: { name: "Small Bakery" }, mainLinks: { menuUrl: "https://bakery.test/menu" },
  promos: [], linkList: [], locations: [], galleryImages: [], testimonials: [],
};

test("sparse profile renders identity and usable menu without fabricated sections", () => {
  const html = renderToStaticMarkup(<QSRLinkPage profile={bakery} canonicalUrl="https://bakery.test/bakery" />);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(html.includes("Small Bakery"));
  assert.ok(html.includes('href="https://bakery.test/menu"'));
  for (const absent of ["Budda", "Today&#x27;s specials", "Guest reviews", 'href="#"', "Catering", 'id="locations"']) {
    assert.ok(!html.includes(absent), absent);
  }
});

test("branch actions retain separate destinations and unsafe links are omitted", () => {
  const profile: RestaurantProfile = { ...bakery, mainLinks: {},
    linkList: [{ id: "unsafe", label: "Unsafe link", url: "javascript:alert(1)" }],
    locations: ["North", "South"].map((name) => ({
      id: name.toLowerCase(), name, address: { streetAddress: `${name} Street`, addressLocality: "City", addressRegion: "UT", postalCode: "84000", addressCountry: "US" },
      openingHoursSpecification: [], orderUrl: `https://bakery.test/order/${name.toLowerCase()}`,
    })),
  };
  const html = renderToStaticMarkup(<QSRLinkPage profile={profile} canonicalUrl="https://bakery.test/bakery" />);
  assert.ok(html.includes('href="https://bakery.test/order/north"'));
  assert.ok(html.includes('href="https://bakery.test/order/south"'));
  assert.ok(html.includes("Order from North"));
  assert.ok(html.includes("Order from South"));
  assert.ok(!html.includes("Unsafe link"));
  assert.ok(!html.includes("Open now"));
});

test("identity-only profile omits empty action and footer landmarks", () => {
  const html = renderToStaticMarkup(<QSRLinkPage profile={{ ...bakery, mainLinks: {}, footer: {} }} canonicalUrl="https://bakery.test/bakery" />);
  assert.ok(!html.includes("Restaurant actions"));
  assert.ok(!html.includes("Legal"));
  assert.ok(!html.includes("mobile-primary"));
});

test("shared ordering/menu destination retains both explicit labels", () => {
  const html = renderToStaticMarkup(<QSRLinkPage profile={{ ...bakery, mainLinks: { orderUrl: "https://bakery.test/menu", menuUrl: "https://bakery.test/menu" } }} canonicalUrl="https://bakery.test/bakery" />);
  assert.ok(html.includes("Order online"));
  assert.ok(html.includes("View menu"));
});

test("disabled primary stays disabled while secondary menu remains available", () => {
  const html = renderToStaticMarkup(<QSRLinkPage profile={{ ...bakery, primaryAction: null }} canonicalUrl="https://bakery.test/bakery" />);
  assert.ok(html.includes("View menu"));
  assert.ok(!html.includes("primary-link"));
  assert.ok(!html.includes("mobile-primary"));
});

test("draft and demo states are visible and branch anchors/phones are readable", () => {
  const profile: RestaurantProfile = { ...bakery, isDemo: true, locations: [{
    id: "north", name: "North", telephone: "+18017010617", timezone: "America/Denver",
    address: { streetAddress: "North Street", addressLocality: "City", addressRegion: "UT", postalCode: "84000", addressCountry: "US" },
    openingHoursSpecification: [{ dayOfWeek: ["Monday"], opens: "08:00", closes: "20:00" }],
  }] };
  const html = renderToStaticMarkup(<QSRLinkPage profile={profile} canonicalUrl="https://bakery.test/bakery" preview />);
  assert.ok(html.includes("Draft preview"));
  assert.ok(html.includes("Demo template"));
  assert.ok(html.includes('href="/api/exit-preview?slug=bakery"'));
  assert.ok(html.includes('id="north"'));
  assert.ok(html.includes('href="tel:+18017010617"'));
  assert.ok(html.includes("(801) 701-0617"));
  assert.ok(html.includes("America/Denver"));
});

