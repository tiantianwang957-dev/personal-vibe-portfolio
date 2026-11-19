import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(
  resolve(import.meta.dirname, "../index.html"),
  "utf8",
);

describe("home page structure", () => {
  it("uses two real top-level tabs", () => {
    expect(home.match(/data-section="projects"/g)).toHaveLength(1);
    expect(home.match(/data-section="operations"/g)).toHaveLength(1);
  });

  it("keeps left and right paging controls", () => {
    expect(home).toContain("data-previous");
    expect(home).toContain("data-next");
  });

  it("does not keep separate vertically stacked hero and about sections", () => {
    expect(home).not.toContain('class="hero"');
    expect(home).not.toContain('class="about"');
  });
});
