export type Section = "projects" | "operations";

export interface PortfolioItem {
  id: string;
  section: Section;
  order: number;
  title: string;
  eyebrow: string;
  summary: string;
  role: string;
  period: string;
  metrics: string[];
  href: string;
  accent: string;
  visualLabel: string;
  story: Array<{ title: string; body: string }>;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "hisense",
    section: "projects",
    order: 1,
    title: "海信 AI 全链路售后服务闭环",
    eyebrow: "AI PRODUCT · SERVICE DESIGN",
    summary: "让 AI 不只回答问题，而是参与诊断、派单、履约、回访与持续改进。",
    role: "项目负责人兼 AI 产品经理",
    period: "2026.07—2026.10",
    metrics: ["全国铜奖", "2.3 次 → 1.2 次", "65% → 90%+"],
    href: "./cases/hisense.html",
    accent: "#2f6252",
    visualLabel: "AI 服务闭环 · 五模块演示",
    story: [
      {
        title: "业务背景",
        body: "家电售后横跨设备、客服、工程师、备件和回访，多系统断点让用户反复描述、等待和确认。",
      },
      {
        title: "我的判断",
        body: "项目终点不应是工单关闭，而应是用户确认问题真正解决，并让结果反哺下一次诊断。",
      },
      {
        title: "产品方案",
        body: "设计智能预诊、VOC 诊断、协同调度、AI 工牌和闭环回访五个模块，明确 AI 建议、系统执行与人工确认的责任边界。",
      },
      {
        title: "测试结果",
        body: "项目测试中平均上门次数由 2.3 次降至 1.2 次，配件一次携带率由 65% 提升至 90% 以上；方案测算年度节省约 1.3 亿元。",
      },
      {
        title: "我的贡献",
        body: "负责产品框架、角色链路、功能取舍、项目推进、演示叙事和现场交付，协同团队完成 Demo 与路演。",
      },
      {
        title: "复盘",
        body: "AI 产品必须同时设计异常续办、证据留痕、人工兜底和反馈闭环，不能只展示一次漂亮回答。",
      },
    ],
  },
  {
    id: "aigc",
    section: "projects",
    order: 2,
    title: "AIGC 数字设计与非遗文创",
    eyebrow: "AIGC · CULTURAL CREATIVE",
    summary:
      "把复杂的创意生产流程，变成普通用户也能参与的数字设计与实物交付体验。",
    role: "产品负责人／PMO",
    period: "2024.12—2025.09",
    metrics: ["10+ 轮测试", "10+ 款实体产品", "内容—转化—交付"],
    href: "./cases/aigc.html",
    accent: "#6f815f",
    visualLabel: "AI 设计 · 非遗纹样 · 实物产品",
    story: [
      {
        title: "机会",
        body: "非专业用户有表达和定制需求，但传统 3D 与文创设计工具门槛高，非遗内容也缺少年轻化参与方式。",
      },
      {
        title: "产品思路",
        body: "以自然语言创意输入、在线编辑、数字预览和实物交付组成最小闭环，不把 AI 生成停留在图片展示。",
      },
      {
        title: "运营闭环",
        body: "围绕内容获客、私域沟通、方案确认、供应商协作和交付复盘组织流程。",
      },
      {
        title: "我的贡献",
        body: "负责 MVP、关键链路、里程碑、测试与跨团队协作，并推动数字创意转成可展示的实体产品。",
      },
      {
        title: "待补素材",
        body: "小程序录屏、产品图和路演材料已经存在；第一版先完成排版，后续筛选公开素材替换占位视觉。",
      },
    ],
  },
  {
    id: "usage-platform",
    section: "projects",
    order: 3,
    title: "汽车产品使用率 AI 平台",
    eyebrow: "B2B PRODUCT · DATA OPERATIONS",
    summary:
      "把分散的使用数据，变成异常定位、责任触达、整改、审核与复盘的运营闭环。",
    role: "产品经理",
    period: "2026.09—2026.11",
    metrics: ["使用率 70% → 95%", "邀约率 54% → 69%", "三级指标体系"],
    href: "./cases/usage-platform.html",
    accent: "#1f5948",
    visualLabel: "脱敏重构演示 · 全部为虚构数据",
    story: [
      {
        title: "问题",
        body: "使用数据依赖人工表格汇总，发现低活跃后缺少统一的责任定位和后续整改追踪。",
      },
      {
        title: "产品判断",
        body: "真正目标不是做一个更大的看板，而是让异常能够被发现、被负责、被处理并被复盘。",
      },
      {
        title: "方案",
        body: "统一战区、督导、门店三级指标，以 Web 看板和任务卡串联异常定位、触达、整改、审核与复盘。",
      },
      {
        title: "结果",
        body: "项目材料记录使用率由 70% 提升至 95%，预约邀约率由 54% 提升至 69%，即提升 15 个百分点。",
      },
      {
        title: "公开边界",
        body: "本页只展示产品逻辑和虚构数据的脱敏重构，不包含内部代码、真实人名、门店、账号、字段或生产备份。",
      },
      {
        title: "复盘",
        body: "内部产品不能只把管理要求系统化，还要让被管理者看到个人收益和明确可执行的下一步。",
      },
    ],
  },
  {
    id: "pocket-park",
    section: "projects",
    order: 4,
    title: "口袋公园产品开发",
    eyebrow: "USER RESEARCH · PUBLIC SERVICE",
    summary: "从城市微空间调研出发，把居民需求转化为产品方案与社区治理建议。",
    role: "项目负责人",
    period: "2023.11—2024.05",
    metrics: ["用户调研", "数据分析", "产品方案"],
    href: "./cases/pocket-park.html",
    accent: "#7a8f65",
    visualLabel: "调研过程与产品原型待补",
    story: [
      {
        title: "研究主题",
        body: "围绕城市口袋公园的使用体验、绿色建设和社区参与展开调研。",
      },
      {
        title: "方法",
        body: "结合问卷、访谈和现场观察识别不同人群的空间使用需求，并整理为可比较的问题结构。",
      },
      {
        title: "产品转化",
        body: "把调研发现转成 APP 方案、空间服务建议和社区治理动作，而不是停留在研究报告。",
      },
      {
        title: "我的贡献",
        body: "负责项目推进、研究框架、数据分析、产品构想和结题表达。",
      },
      {
        title: "待补素材",
        body: "后续补充现场照片、问卷分析图、原型与结题成果，替换当前占位视觉。",
      },
    ],
  },
  {
    id: "weibo",
    section: "operations",
    order: 1,
    title: "新浪微博策略运营",
    eyebrow: "CONTENT · CAMPAIGN · CREATOR",
    summary: "从活动链路、内容供给和创作者协同三个方向推动参与与传播。",
    role: "策略运营",
    period: "2025.07—2025.12",
    metrics: ["活动增长", "内容运营", "创作者协同"],
    href: "./cases/weibo.html",
    accent: "#e86f3d",
    visualLabel: "活动与代表内容截图待补",
    story: [
      {
        title: "运营目标",
        body: "围绕活动参与、话题阅读、粉丝增长与互动效率构建运营动作。",
      },
      {
        title: "增长链路",
        body: "梳理内容触达、活动进入、用户参与和互动关注的关键节点，并针对流失点优化内容与合作方式。",
      },
      {
        title: "内容与创作者",
        body: "参与原创内容生产、KOL 资源沉淀与跨团队协同，让单次活动形成可复用的内容和合作资产。",
      },
      {
        title: "待补素材",
        body: "后续加入可公开的活动页、代表内容和脱敏数据图。",
      },
    ],
  },
  {
    id: "photography",
    section: "operations",
    order: 2,
    title: "摄影垂类自媒体",
    eyebrow: "0→1 · CONTENT GROWTH",
    summary:
      "从账号定位到内容测试、用户转化与商业化，独立跑通个人内容增长闭环。",
    role: "内容运营",
    period: "时间待补",
    metrics: ["账号从 0 到 1", "内容 A/B 测试", "商业化探索"],
    href: "./cases/photography.html",
    accent: "#d58a48",
    visualLabel: "主页与代表作品待补",
    story: [
      {
        title: "账号定位",
        body: "围绕摄影垂类用户的审美、工具与学习需求建立内容方向。",
      },
      {
        title: "内容实验",
        body: "通过选题、封面、结构和发布时间测试优化内容表现，而不是只依赖个人感觉。",
      },
      {
        title: "增长与转化",
        body: "连接公域曝光、用户互动、私域承接和商业化合作，形成可复盘的个人运营闭环。",
      },
      {
        title: "待补素材",
        body: "后续补充账号主页、代表内容与经过脱敏的商业化证明。",
      },
    ],
  },
  {
    id: "jd-home",
    section: "operations",
    order: 3,
    title: "家装用户增长与 AI 工具运营",
    eyebrow: "USER GROWTH · AI ADOPTION",
    summary:
      "把用户增长、服务流程和 AI 工具推广连接起来，提升一线团队的使用与服务效率。",
    role: "用户运营",
    period: "2026.01—2026.08",
    metrics: ["增长链路", "AI 工具推广", "服务闭环"],
    href: "./cases/jd-home.html",
    accent: "#c65f37",
    visualLabel: "内部素材仅做脱敏重构",
    story: [
      {
        title: "业务链路",
        body: "围绕引流、加粉、探需、报价、邀约、回访和转化拆解用户增长过程。",
      },
      {
        title: "运营动作",
        body: "通过需求入口、知识与报价口径、系统标签和派单机制连接不同服务角色。",
      },
      {
        title: "AI 工具",
        body: "参与 AI 陪练与相关工具的推广、使用反馈和迭代，让工具进入新人培训与日常服务流程。",
      },
      {
        title: "公开边界",
        body: "只展示脱敏后的能力与方法，不公开公司内部页面、用户信息、业务明细或受限数据。",
      },
    ],
  },
];

export function getItems(section: Section): PortfolioItem[] {
  return portfolioItems
    .filter((item) => item.section === section)
    .sort((a, b) => a.order - b.order);
}

export function getItem(id: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.id === id);
}
