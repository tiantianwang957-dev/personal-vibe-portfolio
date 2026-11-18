import { describe, expect, it } from "vitest";
import { getItem, getItems, portfolioItems } from "./content";
import { caseDetails } from "./case-details";

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
      const detail = caseDetails[item.id];
      expect(item.href).toMatch(/^\.\/cases\/.+\.html$/);
      expect(item.story.length).toBeGreaterThanOrEqual(4);
      expect(detail).toBeDefined();
      expect(detail?.sections.length).toBeGreaterThanOrEqual(6);
    }
  });

  it("gives each full case a role and evidence boundary", () => {
    for (const item of portfolioItems) {
      const detail = caseDetails[item.id];
      expect(detail).toBeDefined();
      expect(detail?.responsibility.length).toBeGreaterThan(20);
      expect(detail?.evidence.length).toBeGreaterThan(10);
    }
  });

  it("finds the sanitized usage platform entry", () => {
    expect(getItem("usage-platform")?.visualLabel).toContain("虚构数据");
  });
});
