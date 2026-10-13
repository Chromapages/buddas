import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import { GET as preview } from "./preview/route";
import { GET as revalidationGet, POST as revalidation } from "./revalidate/route";

test("preview and publishing endpoints reject unauthenticated requests", async () => {
  assert.equal((await preview(new NextRequest("https://restaurant.test/api/preview"))).status, 401);
  assert.equal((await revalidation(new NextRequest("https://restaurant.test/api/revalidate", { method: "POST" }))).status, 401);
  assert.equal((await revalidationGet()).status, 405);
});
