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
          id: "coars",
          title: "CoARS",
          subtitle: "Self-Distilled Reinforcement Learning for Co-Evolving Agentic Recommender Systems",
          date: "2026-04-11",
          authors: "Zongwei Wang, Min Gao, Hongzhi Yin, Junliang Yu, Tong Chen, Shazia Sadiq, Tianrui Li",
          venue: "arXiv preprint",
          takeaway: "把 agentic 推荐中的多轮交互轨迹转成任务级和 token 级监督，让 recommender 与 user agent 在 RL 中共同进化。",
          detailOverview:
            "CoARS 把推荐系统中的多轮交互过程当作可学习信号本身，试图让 recommender agent 与 user agent 一起从交互中共同演化，而不是只靠外置 memory 做推理。",
          problem:
            "很多 agentic recommender systems 仍然主要依赖把交互历史存成文本记忆再检索进 prompt，这让经验留在外部上下文里，而不是沉淀进模型参数。",
          method:
            "CoARS 同时引入 interaction reward 和 self-distilled credit assignment：前者给 recommender 与 user 两个 agent 构造耦合奖励，后者把历史轨迹转成 token-level 的稠密监督。",
          result:
            "论文报告 CoARS 在多个数据集上的推荐效果与 user alignment 上优于代表性 ARS baseline，证明交互轨迹本身可以成为更细粒度的训练监督。",
          whyInteresting:
            "这篇论文的重要性在于，它把 agentic 推荐从“检索记忆 + 通用推理”推进到“交互经验内化 + 双智能体共同训练”，更贴近真正的长期推荐能力学习。",
          critique:
            "我最关心 user agent 的真实性与分布稳定性。如果共同演化发生在一个不够真实的用户模拟器上，系统可能会变得自洽，但不一定更接近真实用户行为。",
          possibleIdeas:
            "可继续探索的方向包括：对 user agent 做更强约束、给 token-level credit 加不确定性估计、以及引入反事实用户或对抗用户来削弱共同偏差。",
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
          id: "mavrs-survey",
          title: "MAVRS Survey",
          subtitle: "Multi-Agent Video Recommenders: Evolution, Patterns, and Open Challenges",
          date: "2026-04-02",
          authors: "Srivaths Ranganathan, Abhishek Dharmaratnakar, Anushree Sinha, Debanshu Das",
          venue: "WSDM Companion 2026; arXiv preprint",
          takeaway: "用结构化综述梳理视频推荐里的多智能体模式、协调机制和开放挑战，适合快速建立研究地图。",
          detailOverview:
            "这是一篇面向多智能体视频推荐系统的路线图式综述，它把 MARL、LLM-powered recommenders 与系统设计挑战放进一张更完整的研究地图里。",
          problem:
            "视频推荐越来越动态、多模态且带有强反馈回路，传统单模型方法很难同时处理解释性、可控性、在线反馈和系统复杂度。",
          method:
            "作者并没有提出单一算法，而是回顾 MAVRS 的演进，归纳协作模式与协调机制，并通过代表性框架总结不同设计取舍与开放问题。",
          result:
            "这篇论文的价值不在单一指标，而在于给出 taxonomy、challenge map 和研究入口，让你更快定位“多智能体推荐”真正值得做的方向。",
          whyInteresting:
            "如果你想做 agentic recommender，这类综述比单篇方法论文更适合作为研究地图，因为它能帮你看清楚结构性空白和评测缺口。",
          critique:
            "综述虽然给了路线图，但这一方向真正卡住的往往是 benchmark 与可复现协议。没有统一任务和评测，很多方法很难做公平比较。",
          possibleIdeas:
            "可以从标准化多轮交互 benchmark、可验证协调机制、RL-LLM 层级职责划分、以及隐私与实时性约束下的轻量化 agent 设计切入。",
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
          id: "step-hrl",
          title: "STEP-HRL",
          subtitle: "Hierarchical Reinforcement Learning with Augmented Step-Level Transitions for LLM Agents",
          date: "2026-04-07",
          authors: "Shuai Zhen, Yanhua Yu, Ruopei Guo, Nan Cheng, Yang Deng",
          venue: "ACL 2026 Main Conference; arXiv preprint",
          takeaway: "把决策状态从原始历史改成结构化 progress representation，同时提升性能与 token 效率。",
          detailOverview:
            "STEP-HRL 最值得注意的地方，不是它做了一个新的 HRL agent，而是它重新定义了 LLM agent 在长程任务里的状态表示，让进度本身成为显式可学习状态。",
          problem:
            "长程任务中的 LLM agent 往往不断依赖更长的历史上下文，这会带来 token 成本增长、关键信息被淹没，以及训练和 credit assignment 一起恶化的问题。",
          method:
            "STEP-HRL 用 global progress 表示已完成的子任务，用 local progress 压缩当前子任务里的动作与观察，再用 step-level transition 做 BC 与 offline RL。",
          result:
            "论文报告它在 ScienceWorld 和 ALFWorld 上都比多种强基线表现更好，同时单步 token 成本更稳，说明它在效果和效率上都吃到了状态重写的红利。",
          whyInteresting:
            "它让我觉得 agent 研究正在从“怎么给模型更多上下文”转向“怎么给模型更好的状态表示”，这比单纯压缩 prompt 更有研究价值。",
          critique:
            "我会继续追问 local progress 的错误传播问题，以及高层子任务分解是否决定了方法的最终上限。另一点是 benchmark 仍然偏 text-based，离真实工具使用还有距离。",
          possibleIdeas:
            "后续可以探索 progress verifier、不确定性感知的 progress memory、tool-grounded state，以及多 agent 之间共享 progress blackboard 这类扩展方向。",
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
