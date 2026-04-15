# Multi-Agent Video Recommenders: Evolution, Patterns, and Open Challenges

- Category: 推荐算法
- Read date: 2026-04-15
- Paper date: 2026-04-02
- Authors: Srivaths Ranganathan, Abhishek Dharmaratnakar, Anushree Sinha, Debanshu Das
- Venue/Status: WSDM Companion 2026 (accepted); arXiv preprint
- Source: https://arxiv.org/abs/2604.02211
- PDF: https://arxiv.org/pdf/2604.02211
- DOI: https://doi.org/10.48550/arXiv.2604.02211

## What this paper is about

视频推荐正在从“单一模型 + 静态指标优化”走向更动态的系统形态：在推荐过程中引入多个具备专长的 agent（例如视频理解、推理、记忆、反馈），通过协作与协调来提升推荐的准确性、可解释性与适应性。

这篇论文是一篇 survey，聚焦 **Multi-Agent Video Recommender Systems (MAVRS)**，并把多智能体推荐、基础模型（foundation models）、对话式 AI 以及 **LLM 驱动的多智能体推荐** 联系起来，尝试给出系统化的梳理。

## Main contents (high level)

- 回顾 MAVRS 的演进脉络：从早期多智能体强化学习（MARL）系统，到近期 LLM-powered 的多智能体架构。
- 给出 taxonomy：总结在不同视频域（短视频、教育等）下，常见协作模式与协调机制。
- 讨论代表性框架/系统（论文摘要中提到 MMRF、MACRec、Agent4Rec 等）以帮助理解模式差异。
- 总结开放挑战：可扩展性、多模态理解、激励/对齐等，并提出方向（如 RL-LLM 混合、终身个性化、自我改进推荐）。

## Quick takeaway

一句话：这是一个面向“视频推荐中的多智能体/LLM-agent化”的结构化综述，主要价值在于给出 taxonomy + challenges，帮助你快速定位研究切入点与评测/系统落地障碍。
