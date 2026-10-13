import assert from "node:assert/strict";
import { test } from "node:test";
import { bakeryDemoProfile } from "./buddas-profile";
import { getProfileMetadata } from "./profile-metadata";
import { getAbsoluteUrl } from "./seo-utils";

test("sparse profiles never inherit restaurant images or index demo/draft content", () => {
  const demo = getProfileMetadata(bakeryDemoProfile);
  assert.deepEqual(demo.robots, { index: false, follow: false });
  assert.equal(demo.title, "Bakery template");
  assert.equal(demo.alternates?.canonical, getAbsoluteUrl("/examples/bakery"));
  assert.equal(demo.openGraph?.images, undefined);
  const published = { ...bakeryDemoProfile, isDemo: false, canonicalPath: "/p/new-bakery" };
  assert.deepEqual(getProfileMetadata(published, true).robots, { index: false, follow: false });
  assert.deepEqual(getProfileMetadata(published).robots, { index: true, follow: true });
});
