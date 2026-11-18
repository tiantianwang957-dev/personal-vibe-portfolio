import "./styles/main.css";
import { getItems, type PortfolioItem, type Section } from "./data/content";

const state: { section: Section; index: number } = {
  section: "projects",
  index: 0,
};

const viewport = document.querySelector<HTMLElement>("[data-slide]");
const tabs = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-section]"),
);
const previous = document.querySelector<HTMLButtonElement>("[data-previous]");
const next = document.querySelector<HTMLButtonElement>("[data-next]");

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

function renderItem(item: PortfolioItem, total: number): string {
  const metrics = item.metrics
    .map((metric) => `<li>${escapeHtml(metric)}</li>`)
    .join("");
  return `
    <article class="slide-card" style="--item-accent:${item.accent}">
      <div class="slide-copy">
        <p class="eyebrow">${escapeHtml(item.eyebrow)}</p>
        <h2>${escapeHtml(item.title)}</h2>
        <p class="slide-summary">${escapeHtml(item.summary)}</p>
        <div class="meta"><span>${escapeHtml(item.role)}</span><span>${escapeHtml(item.period)}</span></div>
        <ul class="metric-list">${metrics}</ul>
        <a class="case-link" href="${item.href}">查看完整案例 <span aria-hidden="true">↗</span></a>
      </div>
      <div class="slide-visual" role="img" aria-label="${escapeHtml(item.visualLabel)}">
        <div class="orb orb-one"></div><div class="orb orb-two"></div>
        <span class="visual-index">0${state.index + 1}</span>
        <p>${escapeHtml(item.visualLabel)}</p>
      </div>
      <div class="slide-count"><strong>0${state.index + 1}</strong><span>/ 0${total}</span></div>
    </article>`;
}

function render(): void {
  if (!viewport) return;
  const items = getItems(state.section);
  state.index = Math.min(state.index, items.length - 1);
  const current = items[state.index];
  if (!current) return;
  viewport.innerHTML = renderItem(current, items.length);
  tabs.forEach((tab) => {
    const selected = tab.dataset.section === state.section;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  previous?.setAttribute("aria-disabled", String(state.index === 0));
  next?.setAttribute("aria-disabled", String(state.index === items.length - 1));
}

function move(direction: number): void {
  const lastIndex = getItems(state.section).length - 1;
  state.index = Math.max(0, Math.min(lastIndex, state.index + direction));
  render();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    state.section = tab.dataset.section as Section;
    state.index = 0;
    render();
  });
});
previous?.addEventListener("click", () => move(-1));
next?.addEventListener("click", () => move(1));
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === "ArrowRight") move(1);
});

render();
