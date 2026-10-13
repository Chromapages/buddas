import assert from "node:assert/strict";
import { test } from "node:test";
import { trackAction } from "./analytics";

test("optional analytics preserves stable identifiers and tolerates unavailable collectors", () => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const events: Record<string, unknown>[] = [];
  try {
    Object.defineProperty(globalThis, "window", { configurable: true, value: { dataLayer: events } });
    trackAction("order_tap", { profile: "bakery", link_id: "primary", placement: "hero" });
    assert.deepEqual(events, [{ event: "order_tap", profile: "bakery", link_id: "primary", placement: "hero" }]);
    Object.defineProperty(globalThis, "window", { configurable: true, value: {} });
    assert.doesNotThrow(() => trackAction("order_tap"));
    Object.defineProperty(globalThis, "window", { configurable: true, value: { get dataLayer() { throw new Error("unavailable"); } } });
    assert.doesNotThrow(() => trackAction("order_tap"));
  } finally {
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else Reflect.deleteProperty(globalThis, "window");
  }
});
