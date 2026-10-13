import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { JsonLd } from "./JsonLd";
import { restaurantLocations } from "../lib/restaurant-locations";
import { getAbsoluteUrl } from "../lib/seo-utils";
import { buddasDesign } from "../lib/buddas-design";

test("other restaurant identities use their own canonical page", () => {
  const html = renderToStaticMarkup(<JsonLd canonicalUrl="https://example.com/p/bakery" data={[{
    id: "main", name: "Neighborhood Bakery", image: "/bakery-logo.svg", menu: "/menu",
  }]} />);
  const graph = JSON.parse(html.match(/<script[^>]*>([\s\S]*?)<\/script>/)![1])["@graph"];
  assert.equal(graph[0]["@id"], "https://example.com/p/bakery#main");
  assert.equal(graph[0].image, "https://example.com/bakery-logo.svg");
  assert.equal(graph[0].menu, "https://example.com/menu");
  assert.equal(graph[0].hasMenu, graph[0].menu);
  assert.ok(!html.includes("buddas"));
});

test("restaurant graph keeps both locations distinct and embeds JSON safely", () => {
  const name = "Budda's </script><script>alert(1)</script>";
  const html = renderToStaticMarkup(<JsonLd data={restaurantLocations.map((location, index) => ({
    ...location,
    name,
    image: "/BUDDAHAWAIIANLOGO.svg",
    menu: index === 0 ? "#" : "javascript:alert(1)",
    hasMap: location.directionsUrl,
    sameAs: ["javascript:alert(1)", "https://www.instagram.com/example"],
  }))} />);
  const payload = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(payload);
  assert.ok(!payload.includes("<"));
  const graph = JSON.parse(payload)["@graph"];
  assert.equal(graph.length, 2);
  assert.equal(new Set(graph.map((item: { "@id": string }) => item["@id"])).size, 2);
  graph.forEach((item: Record<string, unknown>, index: number) => {
    assert.equal(item["@type"], "Restaurant");
    assert.equal(item.name, name);
    assert.equal(item.image, getAbsoluteUrl("/BUDDAHAWAIIANLOGO.svg"));
    assert.equal(item.telephone, restaurantLocations[index].telephone);
    assert.deepEqual(item.address, { "@type": "PostalAddress", ...restaurantLocations[index].address });
    assert.deepEqual(item.openingHoursSpecification, restaurantLocations[index].openingHoursSpecification.map((hours) => ({
      "@type": "OpeningHoursSpecification", ...hours,
    })));
    assert.ok(!("menu" in item));
    assert.ok(!("hasMenu" in item));
    assert.deepEqual(item.sameAs, ["https://www.instagram.com/example"]);
  });
});

test("Budda's location photos remain distinct from the logo and illustrative artwork", () => {
  const html = renderToStaticMarkup(<JsonLd data={restaurantLocations.map((location) => ({
    ...location,
    name: `Budda's Hawaiian — ${location.name}`,
    image: buddasDesign.locationImages[location.id],
    logo: "/BUDDAHAWAIIANLOGO.svg",
    description: buddasDesign.description,
  }))} />);
  const graph = JSON.parse(html.match(/<script[^>]*>([\s\S]*?)<\/script>/)![1])["@graph"];
  assert.equal(new Set(graph.map((item: { image: string }) => item.image)).size, 2);
  graph.forEach((item: Record<string, unknown>, index: number) => {
    assert.equal(item.image, getAbsoluteUrl(buddasDesign.locationImages[restaurantLocations[index].id]));
    assert.equal(item.logo, getAbsoluteUrl("/BUDDAHAWAIIANLOGO.svg"));
    assert.equal(item.description, buddasDesign.description);
  });
  assert.ok(!html.includes("hero-reference.png"));
  assert.ok(!html.includes("bento-reference.png"));
});
