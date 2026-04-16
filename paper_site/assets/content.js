window.PAPER_LAB_CONTENT = {
  updatedAt: "2026-04-16",
  focusTrack: "Agent",
  focusSummary: "这一轮更值得追的是 agent state 走向可追踪、可定位错误起点的系统对象，而不是继续把所有问题都留在长上下文里。",
  tracks: [
    {
      key: "llm",
      name: "大模型",
      status: "新论文已加入",
      hotSummary:
        "最近大模型方向里最值得追的是两条并行变化：一条在重写 inference-time candidate structure，另一条在重新定义 reasoning post-training 的训练契约与基础设施成本。",
      intro:
        "大模型区域当前会优先关注推理效率、后训练方法与长上下文处理，尤其是那些真正重写训练或生成结构，而不只是微调超参的工作。",
      papers: [
        {
          id: "ddtree",
          title: "DDTree",
          subtitle: "Accelerating Speculative Decoding with Block Diffusion Draft Trees",
          date: "2026-04-15",
          authors: "Liran Ringel, Yaniv Romano",
          venue: "arXiv preprint",
          takeaway: "用一次 block diffusion 生成 draft tree，再由 target model 一次前向并行验证，继续压榨 speculative decoding 的延迟收益。",
          detailOverview:
            "DDTree 的关键不是把 speculative decoding 再做快一点，而是把 drafter 本身从 autoregressive 生成改成 block-level、tree-structured 的候选生成。",
          problem:
            "传统 speculative decoding 虽然能加速 target model，但草稿模型自身往往还是逐 token 自回归，这会限制整体并行收益，尤其在多分支和高温度场景下更明显。",
          method:
            "DDTree 先用 block diffusion drafter 一次性预测整段 token block 的分布，再构建 draft tree，让 target model 在一次 forward pass 里并行验证整棵树。",
          result:
            "论文项目页与摘要显示，该方法在 GSM8K、MATH-500 等任务上相对 autoregressive decoding 给出显著加速，并超过强基线 DFlash。",
          whyInteresting:
            "它说明大模型推理优化不只是 kernel 和 cache 的问题，候选生成结构本身也可以重新设计，draft 与 verify 可以采用不同时间展开方式。",
          critique:
            "我最关心 block diffusion drafter 的训练和部署成本，以及速度收益对硬件、温度和任务分布是否足够稳健；开放式生成下的质量校准也值得继续验证。",
          possibleIdeas:
            "后续可以探索 adaptive candidate structure、quality-aware speculative routing，以及专门为 verifier 友好性做 distillation 的草稿模型。",
          path: "content/read_paper/大模型/2026-04-16_DDTree.md",
          reflectionPath: "content/paper_reflection/大模型/web/2026-04-16_DDTree_reflection.md",
          source: "https://arxiv.org/abs/2604.12989",
          highlights: [
            "一次 block diffusion 生成整段候选",
            "draft tree 而不是单路径草稿",
            "把推理加速改写成候选结构设计问题",
          ],
        },
        {
          id: "lightning-opd",
          title: "Lightning OPD",
          subtitle:
            "Efficient Post-Training for Large Reasoning Models with Offline On-Policy Distillation",
          date: "2026-04-14",
          authors: "Yecheng Wu, Song Han, Hai Cai",
          venue: "arXiv preprint",
          takeaway:
            "把 OPD 能否离线化的关键归结为 teacher consistency，在不挂 live teacher server 的情况下显著降低 reasoning post-training 成本。",
          detailOverview:
            "Lightning OPD 不是单纯把在线蒸馏换成缓存文件，而是指出：只要 SFT 与 OPD 共享同一个 teacher，就能把 offline OPD 做成与标准 OPD 共享最优点的低基础设施 recipe。",
          problem:
            "标准 on-policy distillation 往往需要 live teacher inference server，训练门槛高；而直接离线缓存 teacher supervision 又常常达不到 online OPD 的效果。",
          method:
            "论文提出用 teacher consistency 解释 offline OPD 失败根因，并在这个约束下预计算 teacher log-probabilities，构造无需持续 teacher serving 的 Lightning OPD 训练流程。",
          result:
            "摘要与论文索引页显示，从 Qwen3-8B-Base 出发，Lightning OPD 在 30 GPU hours 内把 AIME 2024 做到 69.9%，并相对标准 OPD 获得 4.0x 训练加速。",
          whyInteresting:
            "它把后训练里很多被当作系统细节的部分，重新暴露为算法成立条件本身，也让 academia 更有机会复现高质量 reasoning post-training。",
          critique:
            "我最关心 teacher consistency 在多 teacher、持续升级 teacher 或更长 rollout 场景下是否仍足够稳健，以及 speedup 是否会随任务和模型规模明显波动。",
          possibleIdeas:
            "后续可以探索 teacher-consistent post-training stack、只刷新局部 rollout 的 adaptive offline refresh，以及专门审计 distillation pipeline 漂移的诊断工具。",
          path: "content/read_paper/大模型/2026-04-16_Lightning-OPD.md",
          reflectionPath: "content/paper_reflection/大模型/web/2026-04-16_Lightning-OPD_reflection.md",
          source: "https://arxiv.org/abs/2604.13010",
          highlights: [
            "teacher consistency 是离线 OPD 的关键约束",
            "预计算 teacher log-probs 替代 live teacher server",
            "把 reasoning 后训练往低基础设施门槛推进",
          ],
        },
      ],
    },
    {
      key: "rec",
      name: "推荐算法",
      status: "新论文已加入",
      hotSummary:
        "推荐方向一边继续出现 agentic recommender 叙事，另一边也在回到冷启动这类长期核心问题：新内容如何在几乎没有交互时获得被看见的机会。",
      intro:
        "推荐算法区域会更多从问题定义、用户建模变化和系统落地价值来梳理，不只看单篇 paper 的指标提升。",
      papers: [
        {
          id: "semco",
          title: "SEMCo",
          subtitle: "Sparse Contrastive Learning for Content-Based Cold Item Recommendation",
          date: "2026-04-15",
          authors: "Gregor Meehan, Johan Pauwels",
          venue: "SIGIR 2026; arXiv preprint",
          takeaway: "不再把冷启动 item 生硬映射到 warm CF 空间，而是用更稀疏的内容对比学习目标直接学 cold-start 表示。",
          detailOverview:
            "这篇论文把冷启动推荐重新表述成 purely content-based 的 item-item similarity 学习问题，试图让新 item 不必依赖 warm model 的 embedding 对齐才能被推荐。",
          problem:
            "传统 cold-start 方法常把内容特征映射到已有协同过滤空间，但这既容易继承 popularity bias，也未必能充分表达真正新的 item 类型。",
          method:
            "作者提出 SEMCo，用 sparse generalization of sampled softmax 和 alpha-entmax 对比学习目标，让不重要负样本的梯度直接归零，从而学习更锋利的内容相似空间。",
          result:
            "根据摘要，SEMCo 在 ranking accuracy 上优于现有 cold-start 方法和标准 sampled softmax，并且还能与 knowledge distillation 结合进一步提升效果。",
          whyInteresting:
            "它把 cold-start 从 warm recommendation 的附庸任务里拉了出来，提醒我们新物品推荐也许需要独立的目标，而不是只会模仿历史热门物品。",
          critique:
            "我最关心 purely content-based 表示会不会过度依赖元数据质量，以及它在线上是否真的能转化成更健康的曝光和探索收益，而不只是离线排序提升。",
          possibleIdeas:
            "可以继续探索 bias-aware cold-start objective、warm-cold dynamic switching、内容不确定性估计，以及和 agentic recommender 结合后的解释式试探曝光策略。",
          path: "content/read_paper/推荐算法/2026-04-16_SEMCo.md",
          reflectionPath: "content/paper_reflection/推荐算法/web/2026-04-16_SEMCo_reflection.md",
          source: "https://arxiv.org/abs/2604.12990",
          highlights: [
            "purely content-based cold-start framing",
            "用 alpha-entmax 做稀疏负样本选择",
            "不把 warm CF embedding 当成唯一目标空间",
          ],
        },
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
          reflectionPath: "content/paper_reflection/推荐算法/web/2026-04-15_CoARS_reflection.md",
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
            "content/paper_reflection/推荐算法/web/2026-04-15_Multi-Agent-Video-Recommenders_reflection.md",
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
      status: "新论文已加入",
      hotSummary:
        "最近值得关注的主线是，Agent 不再只是学会完成任务，还要学会暴露可追踪状态、定位 failure onset，并把长程执行变成可诊断的系统过程。",
      intro:
        "Agent 区域当前最值得看的，是如何从“堆上下文”转向“做状态表示与状态诊断”。这会直接影响长程任务稳定性、调试成本和真实系统可运维性。",
      papers: [
        {
          id: "codetracer",
          title: "CodeTracer",
          subtitle: "Towards Traceable Agent States",
          date: "2026-04-13",
          authors:
            "Han Li, Yifan Yao, Letian Zhu, Rili Feng, Hongyi Ye, Jiaming Wang, Yancheng He, Pengyu Zou, Lehan Zhang, Xinping Lei, Haoyang Huang, Ken Deng, Ming Sun, Zhaoxiang Zhang, He Ye, Jiaheng Liu",
          venue: "arXiv preprint",
          takeaway:
            "把 code agent 的失败诊断做成 state tracing 与 failure onset localization 问题，而不再只是人工读日志。",
          detailOverview:
            "CodeTracer 的重点不是给 agent 写更长的总结，而是重建跨框架的状态转移树，定位最早失败点，再把诊断信号 replay 回原始执行流。",
          problem:
            "多工具、多阶段的 coding agent workflow 很容易在早期一次错误定位后级联失效，但现有日志分析难以系统化定位 failure onset 和错误传播链。",
          method:
            "论文统一解析不同 agent framework 的异构运行产物，构建 hierarchical trace tree 与 persistent memory，并在 CodeTraceBench 上评估 stage-level 与 step-level 的 failure localization。",
          result:
            "摘要与数据集页面显示，CodeTraceBench 收集了 4,316 条 agent 轨迹；CodeTracer 在 failure localization 上优于 prompting 基线，并能通过 replay 诊断信号挽回一部分失败 run。",
          whyInteresting:
            "它把 agent 评测从 success rate 往 diagnosability 推进了一步，也让 agent state 更像真正可运维、可回放的系统对象。",
          critique:
            "我最关心 trace tree 质量对底层日志完整性有多敏感，以及这种 tracing 框架迁移到网页代理或企业 workflow agent 后是否还保留同样优势。",
          possibleIdeas:
            "可以继续做 trace contract、把 failure onset 定位接到 corrective training 上，以及研究 state tracing 与 progress memory、tool-grounded state 的统一接口。",
          path: "content/read_paper/agent/2026-04-16_CodeTracer.md",
          reflectionPath: "content/paper_reflection/agent/web/2026-04-16_CodeTracer_reflection.md",
          source: "https://arxiv.org/abs/2604.11641",
          highlights: [
            "failure onset localization 而不只是结果判定",
            "跨框架重建 hierarchical trace tree",
            "诊断信号可 replay 回原始运行流程",
          ],
        },
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
          reflectionPath: "content/paper_reflection/agent/web/2026-04-15_STEP-HRL_reflection.md",
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
    id: "codetracer",
    label: "Agent / Featured",
    title: "CodeTracer",
    fullTitle: "Towards Traceable Agent States",
    date: "2026-04-13",
    authors:
      "Han Li, Yifan Yao, Letian Zhu, Rili Feng, Hongyi Ye, Jiaming Wang, Yancheng He, Pengyu Zou, Lehan Zhang, Xinping Lei, Haoyang Huang, Ken Deng, Ming Sun, Zhaoxiang Zhang, He Ye, Jiaheng Liu",
    overview:
      "这篇论文最值得停下来细读的地方，在于它把 code agent 的失败分析从“读日志”推进成“重建状态树并定位最早失败点”的系统问题。",
    problem:
      "多阶段 coding agent 常常在很早一步就开始跑偏，但现有工具很难系统地指出错误是从哪里起、又如何一路传播开的。",
    method:
      "CodeTracer 统一解析不同 agent 框架的异构运行痕迹，构建 hierarchical trace tree，并在 CodeTraceBench 上做 failure onset localization。",
    result:
      "摘要与数据集页面显示，它在 failure localization 上显著优于 prompting 基线，并且 replay 诊断信号后能挽回一部分失败的 agent run。",
    source: "https://arxiv.org/abs/2604.11641",
    paperPath: "content/read_paper/agent/2026-04-16_CodeTracer.md",
    reflectionPath: "content/paper_reflection/agent/web/2026-04-16_CodeTracer_reflection.md",
  },
  ideas: [
    {
      title: "Trace Contracts",
      summary:
        "让 agent framework 在运行时主动暴露结构化状态与阶段边界，降低 tracing 对后处理 extractor 的依赖。",
      footer: "受 CodeTracer 启发的 agent observability 方向",
    },
    {
      title: "Teacher-consistent Training Stack",
      summary:
        "把 SFT、OPD 和后续推理后训练放进同一个 teacher contract 里，先检查一致性，再谈更复杂的优化目标。",
      footer: "受 Lightning OPD 启发的后训练配方方向",
    },
    {
      title: "Adaptive Candidate Structures",
      summary:
        "让系统根据上下文难度在单路径、树结构和更宽候选图之间切换，而不是固定一种 speculative drafting 形态。",
      footer: "受 DDTree 启发的推理结构设计方向",
    },
    {
      title: "Bias-aware Cold Start",
      summary:
        "在内容冷启动目标里直接加入 long-tail coverage 或 exposure fairness 约束，避免模型只学会复制已有热门分布。",
      footer: "受 SEMCo 启发的推荐目标重写方向",
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
      title: "Failure Onset Benchmarks",
      summary:
        "把 agent 评测从最终成功率扩展到最早失败点定位、错误传播链与恢复能力，而不是只看终局 outcome。",
      footer: "受 CodeTracer 启发的 agent evaluation 方向",
    },
  ],
};
