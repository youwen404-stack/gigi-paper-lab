# Reflection on DDTree

## What I think the paper is really saying

我觉得这篇论文真正值得记住的，不只是“又快了一些”，而是它说明 speculative decoding 这条路线还远没有榨干。以前很多工作默认 drafter 仍然应该是一个小型 autoregressive model，只是比 target model 更轻。DDTree 则在问：如果 drafter 本身就不是 AR 的，会怎样？

## Why this is interesting

这会把大模型推理优化带向一个更结构化的问题：

1. 草稿应该长什么样，而不是只关心草稿长度。
2. verifier 应该验证一条路径，还是验证一组结构化候选。
3. draft 和 verify 之间的信息接口，是否还能继续抽象成“tree”“lattice”或更一般的 candidate graph。

如果这条线继续往前走，后面的突破可能不只是更强的近似解码器，而是新的 candidate structure。

## Possible weaknesses

我会继续追问几个点：

1. block diffusion drafter 的训练成本和部署复杂度是否会抵消一部分在线收益。
2. 当任务分布变化、temperature 提高或 target model 更大时，tree 构造策略是否还能稳定受益。
3. 速度收益是否过度依赖特定实现细节，例如 batch 组织、硬件并行度或 verifier 内核。
4. 这类方法对生成质量和校准是否始终安全，尤其在开放式生成场景里。

## Ideas this paper suggests

1. Adaptive candidate structure
可以考虑让系统根据上下文难度动态决定用单路径、树结构还是更宽的候选图，而不是固定一个 draft 形态。

2. Quality-aware speculative routing
在 block draft 之前，先判断当前 token 区段是否适合 aggressive speculation。简单区域走 DDTree，困难区域退回更保守模式。

3. Retrieval- or tool-grounded verification
如果 target generation 和外部工具或检索结果紧密绑定，候选树也许可以显式携带结构化约束，而不只是 token 候选。

4. Distillation for verifier friendliness
未来也许不只是训练 drafter 去“像 target 一样说话”，而是训练 drafter 产出“更容易被 verifier 高效验证”的候选结构。

## My short summary

DDTree 对我最大的启发是：大模型推理优化不一定只是近似 target model，本身也可以重新设计生成过程。真正值得追的是“生成结构”和“验证结构”的共同设计。

## One-line takeaway

推理加速的下一步，可能不是更快地生成一条草稿，而是更聪明地生成一组可验证的候选结构。
