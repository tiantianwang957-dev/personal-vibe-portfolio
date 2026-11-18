import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(
  resolve(import.meta.dirname, "../index.html"),
  "utf8",
);

describe("home page structure", () => {
  it("keeps two real tabs inside the work section", () => {
    expect(home.match(/data-section="projects"/g)).toHaveLength(1);
    expect(home.match(/data-section="operations"/g)).toHaveLength(1);
    expect(home.indexOf('class="work"')).toBeLessThan(
      home.indexOf('data-section="projects"'),
    );
  });

  it("keeps left and right paging controls", () => {
    expect(home).toContain("data-previous");
    expect(home).toContain("data-next");
  });

  it("restores the personal hero, portrait and about sections", () => {
    expect(home).toContain('class="hero"');
    expect(home).toContain('class="portrait-placeholder"');
    expect(home).toContain('class="about"');
  });

  it("lets top navigation select the corresponding work tab", () => {
    expect(home.match(/data-nav-section="projects"/g)).toHaveLength(2);
    expect(home.match(/data-nav-section="operations"/g)).toHaveLength(2);
  });

  it("does not place tabs in the site header", () => {
    const header = home.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "";
    expect(header).not.toContain("data-section=");
  });
});
