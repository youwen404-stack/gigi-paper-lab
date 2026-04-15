window.PAPER_LAB_CONTENT = {
  updatedAt: "2026-04-15",
  focusTrack: "Agent",
  focusSummary: "重新思考 Agent 的状态表示与长程任务中的进度建模。",
  tracks: [
    {
      key: "llm",
      name: "大模型",
      status: "持续观察",
      hotSummary:
        "当前重点会关注训练范式、推理效率、长上下文与 post-training 的新进展。这个区域会随着后续论文阅读逐步补全。",
      intro:
        "大模型区域会优先解释最近一轮值得学习的研究主线，例如训练后对齐、推理效率、长上下文处理和新的能力边界。",
      papers: [],
    },
    {
      key: "rec",
      name: "推荐算法",
      status: "新论文已加入",
      hotSummary:
        "最近推荐方向开始集中出现“agentic recommender”与多智能体推荐系统，重点不再只是排序指标，而是多轮交互、偏好澄清和系统协调。",
      intro:
        "推荐算法区域会更多从问题定义、用户建模变化和系统落地价值来梳理，不只看单篇 paper 的指标提升。",
      papers: [
        {
          title: "CoARS",
          subtitle: "Self-Distilled Reinforcement Learning for Co-Evolving Agentic Recommender Systems",
          date: "2026-04-11",
          takeaway: "把 agentic 推荐中的多轮交互轨迹转成任务级和 token 级监督，让 recommender 与 user agent 在 RL 中共同进化。",
          path: "content/read_paper/推荐算法/2026-04-15_CoARS.md",
          reflectionPath: "content/paper_reflection/推荐算法/2026-04-15_CoARS_reflection.md",
          source: "https://arxiv.org/abs/2604.10029",
          highlights: [
            "interaction reward 强调双 agent 的耦合监督",
            "self-distilled credit assignment 把轨迹变成 token-level credit",
            "把 ARS 从外置记忆推进到经验内化",
          ],
        },
        {
          title: "MAVRS Survey",
          subtitle: "Multi-Agent Video Recommenders: Evolution, Patterns, and Open Challenges",
          date: "2026-04-02",
          takeaway: "用结构化综述梳理视频推荐里的多智能体模式、协调机制和开放挑战，适合快速建立研究地图。",
          path: "content/read_paper/推荐算法/2026-04-15_Multi-Agent-Video-Recommenders.md",
          reflectionPath:
            "content/paper_reflection/推荐算法/2026-04-15_Multi-Agent-Video-Recommenders_reflection.md",
          source: "https://arxiv.org/abs/2604.02211",
          highlights: [
            "给出多智能体视频推荐的 taxonomy",
            "把 LLM-powered recommenders 放进统一演进脉络",
            "挑战更贴近真实平台中的成本、延迟与对齐问题",
          ],
        },
      ],
    },
    {
      key: "agent",
      name: "Agent",
      status: "本轮热点",
      hotSummary:
        "最近值得关注的主线是，不再默认 Agent 必须依赖越来越长的历史上下文，而是显式建模任务进度、状态抽象和层级控制。",
      intro:
        "Agent 区域当前最值得看的，是如何从“堆上下文”转向“做状态表示”。这会直接影响推理成本、长程任务稳定性和泛化。",
      papers: [
        {
          title: "STEP-HRL",
          subtitle: "Hierarchical Reinforcement Learning with Augmented Step-Level Transitions for LLM Agents",
          date: "2026-04-07",
          takeaway: "把决策状态从原始历史改成结构化 progress representation，同时提升性能与 token 效率。",
          path: "content/read_paper/agent/2026-04-15_STEP-HRL.md",
          reflectionPath: "content/paper_reflection/agent/2026-04-15_STEP-HRL_reflection.md",
          source: "https://arxiv.org/abs/2604.05808",
          highlights: [
            "用 global progress 表示任务整体推进",
            "用 local progress 压缩子任务内部历史",
            "让训练与推理都围绕 step-level state 展开",
          ],
        },
      ],
    },
  ],
  featuredPaper: {
    label: "Agent / Featured",
    title: "STEP-HRL",
    fullTitle:
      "Hierarchical Reinforcement Learning with Augmented Step-Level Transitions for LLM Agents",
    date: "2026-04-07",
    authors: "Shuai Zhen, Yanhua Yu, Ruopei Guo, Nan Cheng, Yang Deng",
    overview:
      "这篇论文的核心价值在于，它不再把长历史上下文视为 Agent 决策的默认输入，而是把全局任务进度和局部子任务进度显式建模成一个更轻、更稳定的状态表示。",
    problem:
      "长程任务中的 RL-based LLM Agent 往往会随着轨迹增长而出现 token 成本上升、决策噪音增加和训练不稳定的问题。",
    method:
      "STEP-HRL 用 completed subtasks 表示 global progress，用 local progress module 压缩每个子任务内部的交互历史，让高层与低层策略都能基于 step-level transition 决策。",
    result:
      "在 ScienceWorld 与 ALFWorld 上明显优于多种强基线，并在效率分析中表现出更稳定的单步 token 成本。",
    source: "https://arxiv.org/abs/2604.05808",
    paperPath: "content/read_paper/agent/2026-04-15_STEP-HRL.md",
    reflectionPath: "content/paper_reflection/agent/2026-04-15_STEP-HRL_reflection.md",
  },
  ideas: [
    {
      title: "Progress Verifier",
      summary:
        "给 local progress 增加一个 verifier，专门检查当前 progress 是否遗漏关键状态，减少错误摘要带来的级联误差。",
      footer: "受 STEP-HRL 启发的可靠性增强方向",
    },
    {
      title: "Uncertainty-aware Memory",
      summary:
        "让 progress 不只输出文本摘要，还输出不确定性。当状态不确定时，再有选择地回看更长历史，而不是始终坚持压缩视图。",
      footer: "受 STEP-HRL 启发的自适应上下文方向",
    },
    {
      title: "Tool-grounded State",
      summary:
        "把进度表示绑定到网页状态、数据库状态或工具返回结果上，让 Agent 的 state 从自然语言摘要进一步走向结构化世界状态。",
      footer: "更贴近真实系统 Agent 的落地方向",
    },
    {
      title: "Shared Multi-agent Progress",
      summary:
        "在多 Agent 系统里把 progress 做成共享黑板，让每个 Agent 只消费任务级与子任务级进度，而不必读取全部历史对话。",
      footer: "适合协作式 Agent 的扩展方向",
    },
  ],
};
