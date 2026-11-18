# 王湉甜｜个人 Vibe Coding 作品集

中文静态作品集第一版，使用 Vite、TypeScript、HTML 与 CSS 构建。

在线地址：<https://tiantianwang957-dev.github.io/personal-vibe-portfolio/>

## 本地运行

```powershell
npm install
npm run dev
```

## 验证

```powershell
npm run format:check
npm run typecheck
npm run test
npm run build
```

## 内容边界

- 当前媒体为占位视觉，后续替换个人照片与项目素材。
- 使用率平台页面是基于真实业务经历重构的脱敏演示，不包含生产数据和内部代码。
- 简历 PDF 在公开信息复核完成前不进入仓库。

## 已知依赖告警

截至 2026-11-18，npm 审计对构建工具链间接依赖 `picomatch@4.0.7` 报告高危 ReDoS 告警，注册表暂无更高修复版本。该依赖只用于本地构建与测试，不进入 GitHub Pages 静态产物；后续发布前继续复查并在修复版可用时升级。
