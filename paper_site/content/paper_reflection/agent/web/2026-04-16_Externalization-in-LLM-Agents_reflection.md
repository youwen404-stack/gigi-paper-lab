# Reflection on Externalization in LLM Agents

## Core problem

LLM agents struggle when tasks require persistent state, multi-step procedural reuse, coordination, and reliability over long horizons. Treating all of that as something the model should solve internally makes systems brittle and hard to control.

## Main method

The paper is a unifying review. Its main move is conceptual: it groups agent advances into four externalization channels, namely memory, skills, protocols, and harness engineering, then explains how these channels reduce cognitive burden on the model by changing the structure of the overall system.

## Key contributions

1. It gives a strong systems abstraction for agent design that is broader than "add memory" or "add tools".
2. It makes harness engineering first-class, which matches real deployments much better than model-only narratives.
3. It clarifies that agent quality depends on module interaction, not just module presence.
4. It points toward governance and evaluation questions that will matter more as agents become shared infrastructure rather than isolated prompts.

## Short takeaway summary

My main takeaway is that agent progress is becoming an external systems problem. Better memory schemas, skill packaging, execution protocols, and runtime control may provide larger reliability gains than small base-model improvements.

## My thoughts

This framing is useful because it matches what actually works in practice. Many agent failures are not failures of raw language modeling; they are failures of state management, decomposition, interface design, or execution governance.

The most interesting extension is to move from static externalization to adaptive externalization:

- Which information should stay parametric versus be pushed into memory?
- When should a successful trajectory become a reusable skill?
- How should protocols evolve as agent populations become multi-user and multi-agent?
- Can the harness learn to reconfigure itself based on failure modes instead of relying on hand-written policies?

I would also want sharper empirical work after this review. The paper's conceptual taxonomy is strong, but the next step is a benchmark that isolates the marginal value of each externalization layer and their interactions. For example, compare the same base model under: model-only, memory-only, memory+skills, memory+skills+protocols, and full harness governance.

One critique is that "harness engineering" can become too broad and absorb everything. The idea is directionally right, but future work should make the boundaries more operational so systems can be compared cleanly rather than described with overlapping terminology.

Overall, this is a paper worth keeping in mind when designing agent systems. It does not present a new single trick; it presents a better map. That is valuable because research on agents is still fragmented, and good maps often unlock better experiments.
