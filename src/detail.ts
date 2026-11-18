import "./styles/main.css";
import { getItem } from "./data/content";

const root = document.querySelector<HTMLElement>("[data-case-id]");
const item = root?.dataset.caseId ? getItem(root.dataset.caseId) : undefined;

if (!root || !item) {
  document.body.innerHTML = `<main class="not-found"><h1>案例暂未找到</h1><a href="../index.html">返回作品集首页</a></main>`;
} else {
  document.title = `${item.title}｜王湉甜作品集`;
  root.style.setProperty("--item-accent", item.accent);
  root.innerHTML = `
    <header class="case-hero">
      <a class="back-link" href="../index.html">← 返回作品集</a>
      <p class="eyebrow">${item.eyebrow}</p>
      <h1>${item.title}</h1>
      <p class="case-lead">${item.summary}</p>
      <div class="meta"><span>${item.role}</span><span>${item.period}</span></div>
      <ul class="metric-list">${item.metrics.map((metric) => `<li>${metric}</li>`).join("")}</ul>
    </header>
    <section class="case-visual" aria-label="项目素材占位">
      <div><span>MEDIA PLACEHOLDER</span><strong>${item.visualLabel}</strong><p>后续可直接替换为照片、截图、GIF 或视频，不改变页面结构。</p></div>
    </section>
    <section class="story-grid">
      ${item.story.map((entry, index) => `<article><span>0${index + 1}</span><h2>${entry.title}</h2><p>${entry.body}</p></article>`).join("")}
    </section>
    <aside class="next-step"><p>这份案例仍在持续补充真实素材。</p><a href="../index.html#work">查看其他项目 →</a></aside>`;
}
