import assert from "node:assert/strict";
import { test } from "node:test";
import { getProfilePath, isProfileSlug } from "./profile-routes";

test("profiles have one canonical route and cannot inject paths", () => {
  assert.equal(getProfilePath("buddas"), "/buddas");
  assert.equal(getProfilePath("neighborhood-bakery"), "/p/neighborhood-bakery");
  for (const invalid of ["", "../privacy", "a/b", "a\\b", "UPPER", "-start", "end-", "a".repeat(97), null]) {
    assert.equal(isProfileSlug(invalid), false);
  }
});
