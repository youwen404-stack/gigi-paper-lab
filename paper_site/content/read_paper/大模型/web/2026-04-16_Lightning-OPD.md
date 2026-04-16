# Lightning OPD: Efficient Post-Training for Large Reasoning Models with Offline On-Policy Distillation

- Category: 大模型
- Read date: 2026-04-16
- Paper date: 2026-04-14
- Authors: Yecheng Wu, Song Han, Hai Cai
- Venue/Status: arXiv preprint
- Source: https://arxiv.org/abs/2604.13010
- PDF: https://arxiv.org/pdf/2604.13010

## Why this paper

这篇 paper 值得收，是因为它把一个很现实的大模型后训练瓶颈说清楚了：很多 OPD 工作在算法上看起来成立，但训练基础设施门槛太高，尤其需要一直挂着 live teacher server。Lightning OPD 讨论的不是再换一种奖励，而是怎样把这条路线做成更低成本、可复现的训练配方。

## Core problem

on-policy distillation 这两年已经成为 reasoning model 后训练里的重要路线，但标准 OPD 有两个现实问题：

1. 训练全程需要 live teacher inference server，基础设施开销很高。
2. 直接把 teacher log-prob 预先算好、离线复用，看起来简单，但效果往往达不到在线 OPD。
3. 大家知道 offline OPD 常常不行，但失败原因过去并不够清楚。

所以关键问题不是“能不能离线化”，而是“离线化到底破坏了什么条件”。

## Main method

Lightning OPD 给出的核心解释是 `teacher consistency`。

作者认为，SFT 阶段和 OPD 阶段必须使用同一个 teacher；一旦 teacher 不一致，就会引入不可消除的 gradient bias，让 offline 和 online 两种训练都收敛到次优点。

在这个判断上，Lightning OPD 的做法很直接：

1. 保持 teacher consistency
用同一个 teacher 负责 SFT 与后续 OPD 所依赖的监督。

2. Precompute teacher log-probs
在 SFT rollout 上提前计算 teacher log-probabilities，避免训练时持续调用 live teacher server。

3. Offline OPD with bounded mismatch
在 teacher consistency 成立时，论文证明 Lightning OPD 与标准 OPD 共享同一个最优点，同时梯度偏差有界，还会带来一定的 policy drift 抑制效果。

## What the paper claims

根据论文摘要与论文索引页，Lightning OPD 在数学推理和代码生成任务上都给出很强结果。作者报告：从 SFT 初始化的 `Qwen3-8B-Base` 出发，Lightning OPD 在 30 GPU hours 内把 AIME 2024 做到 `69.9%`，同时相对标准 OPD 获得 `4.0x` 的训练加速。

## Why it matters

这篇论文的重要性在于，它把“高质量后训练”从一个强依赖大规模 teacher serving 的流程，往“更低基础设施门槛的可复现实验范式”推进了一步。

我觉得这里有两个更值得记住的点：

1. 后训练算法的上限不只受目标函数影响，也受训练数据生成方式和 teacher 管线一致性影响。
2. 很多看似是“系统优化”的改动，实际上会反过来暴露算法成立的必要条件。

## Quick takeaway

一句话总结：Lightning OPD 不是简单把在线蒸馏离线化，而是指出“teacher consistency”才是 OPD 能否稳定成立的关键约束，并在此基础上把推理后训练的成本显著降下来。
