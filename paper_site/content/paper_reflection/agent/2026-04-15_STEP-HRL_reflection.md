Paper path: content/read_paper/agent/2026-04-15_STEP-HRL.md

# Reflection on STEP-HRL

## Core problem

这篇论文要解决的核心不是单纯“agent 不够聪明”，而是 LLM agent 的决策表示方式本身有些笨重。很多方法把历史轨迹越堆越长，希望模型自己从中恢复状态，但这样会让训练、推理和 credit assignment 一起恶化。

## My understanding of the method

我对这篇论文的理解是:

1. 它把“状态”从原始历史改成了“压缩后的进度表示”。
2. 它把进度拆成了两层:
全局层面用已完成子任务表示任务推进情况，局部层面用 local progress 表示当前子任务里已经发生了什么。
3. 它不是只在推理时做压缩，而是从训练目标开始就按 step-level transition 来定义，这样 BC 和 offline RL 都围绕同一个状态空间进行。

这点很关键。很多 agent 工作会在 inference 时加 memory/summarization，但训练阶段仍然默认全历史条件化，所以训练和部署之间其实并不完全一致。STEP-HRL 相对更统一。

## Why it may matter

我觉得这类思路对 agent 很重要，因为它触碰到一个更一般的问题:

“LLM agent 到底应该把什么当作 state?”

如果 state 是原始文本历史，那么 agent 会越来越像一个被动的 next-token machine。
如果 state 是显式构造过的 progress representation，那么 agent 才更像一个真正的 sequential decision maker。

## Contributions I think are most valuable

1. 它把 local progress 变成可学习模块，而不是手写摘要器。
2. 它把 hierarchical decomposition 和 compact state representation 结合起来，而不是各做各的。
3. 它证明了 step-level RL 在 LLM agent 上是可行的，而且不仅能提效，还能提泛化。

## Possible weaknesses

这篇论文也有几个我会继续追问的地方:

1. Local progress 的质量上限是否受 backbone 语言能力强约束。
如果 progress 本身总结错了，低层策略可能会被系统性误导。

2. 子任务分解质量是否决定了上限。
如果高层子任务不合理，局部 progress 再好也可能只是在错误分解上做优化。

3. 当前验证环境仍然偏 text-based benchmark。
ScienceWorld 和 ALFWorld 很适合验证序列决策，但离真实工具使用、网页操作、多agent协作还有距离。

4. near-saturated 的 ALFWorld 结果虽然亮眼，但也可能意味着 benchmark 天花板已接近，后续需要更强任务验证其外推能力。

## Ideas inspired by this paper

下面这些是我觉得可以继续扩展的方向:

1. Learnable progress verifier
除了生成 local progress，还增加一个 verifier 去判断“当前 progress 是否遗漏关键状态”。这样可以减少错误摘要带来的级联误差。

2. Uncertainty-aware progress memory
让 progress 不只输出文本摘要，还输出不确定性标记。遇到高不确定状态时，策略可以主动回看更多历史，而不是永远只依赖压缩状态。

3. Tool-grounded progress state
把 progress 绑定到结构化变量上，例如网页状态、数据库状态、工具调用结果，而不是只用自然语言摘要。这样更适合真实 agent 系统。

4. Adaptive hierarchy
不是固定高层/低层两级，而是根据任务难度动态调整层级深度。简单任务直接平铺，复杂任务自动细分更多层。

5. Multi-agent progress sharing
如果是多 agent 协作系统，progress 可以变成共享黑板。每个 agent 不必读取全部对话历史，只需要读取任务级和子任务级共享进度。

## My short summary

我会把这篇论文看成一个很有代表性的信号: agent 研究正在从“给模型更多上下文”转向“给模型更好的状态表示”。如果这个方向继续往前走，后面的突破点可能不只是更大的模型，而是更合理的 state abstraction、progress modeling 和 hierarchical control。

## One-line takeaway

与其让 agent 记住一切，不如让 agent 在每一步只看到“当前真正重要的进度表示”。
