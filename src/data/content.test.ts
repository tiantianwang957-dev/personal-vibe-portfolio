import { describe, expect, it } from "vitest";
import { getItem, getItems, portfolioItems } from "./content";

describe("portfolio content", () => {
  it("keeps four projects in the confirmed order", () => {
    expect(getItems("projects").map((item) => item.id)).toEqual([
      "hisense",
      "aigc",
      "usage-platform",
      "pocket-park",
    ]);
  });

  it("keeps three operations entries", () => {
    expect(getItems("operations")).toHaveLength(3);
  });

  it("gives every entry a detail page and story", () => {
    for (const item of portfolioItems) {
      expect(item.href).toMatch(/^\.\/cases\/.+\.html$/);
      expect(item.story.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("finds the sanitized usage platform entry", () => {
    expect(getItem("usage-platform")?.visualLabel).toContain("虚构数据");
  });
});
