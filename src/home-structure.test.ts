import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const home = readFileSync(
  resolve(import.meta.dirname, "../index.html"),
  "utf8",
);
const script = readFileSync(resolve(import.meta.dirname, "./main.ts"), "utf8");
const styles = readFileSync(
  resolve(import.meta.dirname, "./styles/main.css"),
  "utf8",
);

describe("presentation website structure", () => {
  it("provides the four confirmed primary views", () => {
    for (const view of ["home", "projects", "operations", "resume"]) {
      expect(home).toContain(`data-panel="${view}"`);
      expect(home).toContain(`data-view="${view}"`);
    }
  });

  it("keeps independent project and operation case surfaces", () => {
    expect(home).toContain('data-slide="projects"');
    expect(home).toContain('data-slide="operations"');
    expect(home).toContain("data-previous");
    expect(home).toContain("data-next");
    expect(home).toContain("data-page-count");
  });

  it("opens full cases in an in-page dialog", () => {
    expect(home).toContain("data-case-dialog");
    expect(home).toContain("data-dialog-content");
    expect(script).toContain("showModal()");
    expect(script).toContain("[data-open-case]");
  });

  it("retains the personal introduction and photo area", () => {
    expect(home).toContain("把复杂问题");
    expect(home).toContain('class="portrait-placeholder"');
  });

  it("does not use separate case pages as primary navigation", () => {
    expect(home).not.toMatch(/href="\.\/cases\//);
  });

  it("keeps case content reachable on short desktop screens", () => {
    expect(styles).toContain("@media (max-height: 760px)");
    expect(styles).toContain("overflow-y: auto");
  });
});
