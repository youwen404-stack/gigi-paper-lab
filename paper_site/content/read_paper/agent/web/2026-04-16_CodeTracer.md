# CodeTracer: Towards Traceable Agent States

- Category: agent
- Read date: 2026-04-16
- Paper date: 2026-04-13
- Authors: Han Li, Yifan Yao, Letian Zhu, Rili Feng, Hongyi Ye, Jiaming Wang, Yancheng He, Pengyu Zou, Lehan Zhang, Xinping Lei, Haoyang Huang, Ken Deng, Ming Sun, Zhaoxiang Zhang, He Ye, Jiaheng Liu
- Venue/Status: arXiv preprint
- Source: https://arxiv.org/abs/2604.11641
- PDF: https://arxiv.org/pdf/2604.11641
- Dataset: https://huggingface.co/datasets/NJU-LINK/CodeTraceBench

## Why this paper

这篇 paper 很值得收，因为它讨论的是 agent 真正走向生产后一定会遇到的问题：不是 agent 会不会做任务，而是失败时你能不能知道它到底从哪一步开始偏了。随着 coding agent 越来越多地并行调用工具、跨阶段执行工作流，debug agent 自身正在变成独立研究问题。

## Core problem

作者抓住了 code agent 调试里最痛的几个点：

1. 多工具、多阶段工作流会让状态转移和错误传播链条难以观测。
2. agent 很容易在早期一次错误定位之后陷入无效循环，后面再多动作也只是继续放大误差。
3. 现有 tracing 分析要么太简单，只看局部交互；要么太依赖小规模人工 inspection，难以用于真实 coding workflow。

所以核心问题不是“agent 有没有错”，而是“最早的 failure onset 在哪里，以及后面是怎么一路级联的”。

## Main method

CodeTracer 的方法可以分成三块：

1. Heterogeneous artifact parsing
它先把不同 agent 框架产生的异构运行产物统一解析出来，而不是假设大家共享同一种轨迹格式。

2. Hierarchical trace tree
再把完整状态转移历史重建成 hierarchical trace tree，并配上 persistent memory，让错误链条变得可追踪。

3. Failure onset localization
最后专门定位最早失败点，而不只是判断“这次任务失败了”，从而识别下游错误传播路径。

为了评估这件事，作者还构建了 CodeTraceBench：一个来自四种常见 coding agent framework 的大规模执行轨迹基准，覆盖 bug fixing、refactoring、terminal interaction 等任务，并提供 stage-level 与 step-level 的 failure localization 标注。

## What the paper claims

根据论文摘要与数据集页面，CodeTraceBench 共收集了 `4,316` 条 agent 轨迹，其中包含人工核验的 step-level 标注子集。实验结果表明，CodeTracer 在 failure localization 上显著优于 direct prompting 与轻量基线，并且把它给出的诊断信号 replay 回原始运行后，在相同预算下能稳定挽回部分原本失败的 agent run。

## Why it matters

我觉得这篇论文的重要性在于，它把 agent 可解释性从“生成事后总结”推进到了“重建状态转移并定位错误起点”。这比简单日志聚合更接近真正能用的 agent debugging infrastructure。

它还释放了两个值得继续追的信号：

1. agent 的 state 不该只是 prompt history，还应该是可追踪、可诊断、可回放的执行对象。
2. 未来 agent 评测不该只看 success rate，也该看 failure localization、error chain recovery 这类运维向能力。

## Quick takeaway

一句话总结：CodeTracer 把 code agent 的“失败诊断”从小规模人工读日志，推进到系统化的状态重建、错误起点定位和诊断信号回放。
