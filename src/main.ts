import "./styles/main.css";
import { getItems, type PortfolioItem, type Section } from "./data/content";
import { caseDetails, type CaseSection } from "./data/case-details";

type View = "home" | Section | "resume";

const state: { view: View; indexes: Record<Section, number> } = {
  view: "home",
  indexes: { projects: 0, operations: 0 },
};
let wheelLocked = false;

const panels = Array.from(
  document.querySelectorAll<HTMLElement>("[data-panel]"),
);
const viewButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-view]"),
);
const projectViewport = document.querySelector<HTMLElement>(
  '[data-slide="projects"]',
);
const operationViewport = document.querySelector<HTMLElement>(
  '[data-slide="operations"]',
);
const controls = document.querySelector<HTMLElement>("[data-case-controls]");
const previous = document.querySelector<HTMLButtonElement>("[data-previous]");
const next = document.querySelector<HTMLButtonElement>("[data-next]");
const pageCount = document.querySelector<HTMLElement>("[data-page-count]");
const headerStatus = document.querySelector<HTMLElement>(
  "[data-header-status]",
);
const dialog = document.querySelector<HTMLDialogElement>("[data-case-dialog]");
const dialogContent = document.querySelector<HTMLElement>(
  "[data-dialog-content]",
);
const dialogClose = document.querySelector<HTMLButtonElement>(
  "[data-dialog-close]",
);

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character] ?? character;
  });
}

function twoDigits(value: number): string {
  return String(value).padStart(2, "0");
}

function renderCase(item: PortfolioItem, index: number): string {
  const metrics = item.metrics
    .map((metric) => `<li>${escapeHtml(metric)}</li>`)
    .join("");
  const highlights = item.story
    .slice(0, 3)
    .map(
      (entry) => `
        <li>
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${escapeHtml(entry.body)}</span>
        </li>`,
    )
    .join("");

  return `
    <article class="experience-page" style="--item-accent:${item.accent}">
      <div class="experience-copy">
        <div class="case-kicker"><span>CASE ${twoDigits(index + 1)}</span><p class="eyebrow">${escapeHtml(item.eyebrow)}</p></div>
        <h2>${escapeHtml(item.title)}</h2>
        <p class="slide-summary">${escapeHtml(item.summary)}</p>
        <div class="meta"><span>${escapeHtml(item.role)}</span><span>${escapeHtml(item.period)}</span></div>
        <p class="evidence-label">关键结果 / EVIDENCE</p>
        <ul class="metric-list">${metrics}</ul>
        <ol class="slide-highlights">${highlights}</ol>
        <button class="case-link" type="button" data-open-case="${escapeHtml(item.id)}">查看完整案例 <span aria-hidden="true">↗</span></button>
      </div>
      <div class="experience-visual" role="img" aria-label="${escapeHtml(item.visualLabel)}">
        <span class="visual-index">${twoDigits(index + 1)}</span>
        <div class="visual-orbit orbit-a"></div><div class="visual-orbit orbit-b"></div>
        <div class="visual-ticket"><span>PROJECT EVIDENCE</span><p>${escapeHtml(item.visualLabel)}</p><small>素材到位后替换为真实截图</small></div>
      </div>
    </article>`;
}

function renderSection(section: Section): void {
  const viewport = section === "projects" ? projectViewport : operationViewport;
  if (!viewport) return;
  const current = state.indexes[section];
  viewport.innerHTML = getItems(section)
    .map(
      (item, index) =>
        `<div class="case-frame${index === current ? " is-current" : ""}">${renderCase(item, index)}</div>`,
    )
    .join("");
}

function updateChrome(): void {
  const isSection = state.view === "projects" || state.view === "operations";
  controls?.toggleAttribute("hidden", !isSection);

  if (isSection) {
    const section = state.view as Section;
    const items = getItems(section);
    const index = state.indexes[section];
    if (pageCount) {
      pageCount.textContent = `${twoDigits(index + 1)} / ${twoDigits(items.length)}`;
    }
    previous?.toggleAttribute("disabled", index === 0);
    next?.toggleAttribute("disabled", index === items.length - 1);
  }

  const labels: Record<View, string> = {
    home: "首页 · 01",
    projects: "项目经历",
    operations: "运营经历",
    resume: "简历 · 01",
  };
  if (headerStatus) headerStatus.textContent = labels[state.view];
}

function renderView(): void {
  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === state.view);
  });
  viewButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  if (state.view === "projects" || state.view === "operations") {
    renderSection(state.view);
  }
  updateChrome();
}

function selectView(view: View): void {
  state.view = view;
  renderView();
}

function moveCase(direction: number): void {
  if (state.view !== "projects" && state.view !== "operations") return;
  const items = getItems(state.view);
  const current = state.indexes[state.view];
  state.indexes[state.view] = Math.max(
    0,
    Math.min(items.length - 1, current + direction),
  );
  renderSection(state.view);
  updateChrome();
}

function openCase(item: PortfolioItem): void {
  if (!dialog || !dialogContent) return;
  const detail = caseDetails[item.id];
  if (!detail) return;
  const renderSection = (entry: CaseSection) => `
    <article class="case-study-section" id="case-${escapeHtml(item.id)}-${escapeHtml(entry.id)}">
      <p class="case-study-label">${escapeHtml(entry.label)}</p>
      <h3>${escapeHtml(entry.title)}</h3>
      <p class="case-study-lead">${escapeHtml(entry.lead)}</p>
      ${entry.bullets ? `<ul>${entry.bullets.map((text) => `<li>${escapeHtml(text)}</li>`).join("")}</ul>` : ""}
      ${entry.flow ? `<div class="case-flow">${entry.flow.map((text, index) => `<span><small>${twoDigits(index + 1)}</small>${escapeHtml(text)}</span>`).join("")}</div>` : ""}
      ${entry.note ? `<aside class="case-note"><strong>表达边界</strong><p>${escapeHtml(entry.note)}</p></aside>` : ""}
      ${entry.media ? `<div class="case-media-placeholder"><span>素材位置</span><p>${escapeHtml(entry.media)}</p></div>` : ""}
    </article>`;
  const navigation = detail.sections
    .map(
      (entry) =>
        `<a href="#case-${escapeHtml(item.id)}-${escapeHtml(entry.id)}">${escapeHtml(entry.label)}</a>`,
    )
    .join("");
  const stories = detail.sections.map(renderSection).join("");
  dialogContent.innerHTML = `
    <div class="case-study" style="--item-accent:${item.accent}">
    <header class="dialog-header">
      <p class="eyebrow">${escapeHtml(item.eyebrow)}</p>
      <h2>${escapeHtml(item.title)}</h2>
      <p>${escapeHtml(item.summary)}</p>
      <div class="case-facts"><span><small>我的角色</small>${escapeHtml(item.role)}</span><span><small>项目周期</small>${escapeHtml(item.period)}</span><span><small>当前状态</small>${escapeHtml(detail.status)}</span></div>
      <div class="case-evidence">${item.metrics.map((metric) => `<strong>${escapeHtml(metric)}</strong>`).join("")}</div>
    </header>
    <div class="case-study-layout">
      <aside class="case-study-nav"><p>CASE FILE</p><nav>${navigation}</nav><div><small>证据状态</small><span>${escapeHtml(detail.evidence)}</span></div></aside>
      <section class="dialog-story"><div class="responsibility"><span>MY ROLE</span><p>${escapeHtml(detail.responsibility)}</p></div>${stories}</section>
    </div></div>`;
  dialog.showModal();
}

viewButtons.forEach((button) => {
  button.addEventListener("click", () =>
    selectView(button.dataset.view as View),
  );
});
previous?.addEventListener("click", () => moveCase(-1));
next?.addEventListener("click", () => moveCase(1));
dialogClose?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const button = target.closest<HTMLButtonElement>("[data-open-case]");
  if (!button) return;
  const item = [...getItems("projects"), ...getItems("operations")].find(
    (entry) => entry.id === button.dataset.openCase,
  );
  if (item) openCase(item);
});
document.addEventListener("keydown", (event) => {
  if (dialog?.open) return;
  if (event.key === "ArrowLeft") moveCase(-1);
  if (event.key === "ArrowRight") moveCase(1);
});

document.addEventListener(
  "wheel",
  (event) => {
    if (
      dialog?.open ||
      wheelLocked ||
      !window.matchMedia("(min-width: 851px)").matches ||
      (state.view !== "projects" && state.view !== "operations") ||
      Math.abs(event.deltaY) < 24
    ) {
      return;
    }
    event.preventDefault();
    wheelLocked = true;
    moveCase(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLocked = false;
    }, 650);
  },
  { passive: false },
);

renderSection("projects");
renderSection("operations");
renderView();
