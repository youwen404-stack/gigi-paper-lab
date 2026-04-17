# Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering

- Authors: Chenyu Zhou, Huacan Chai, Wenteng Chen, Zihan Guo, Rong Shan, Yuanyi Song, Tianyi Xu, Yingxuan Yang, Aofan Yu, Weiming Zhang, Congming Zheng, Jiachen Zhu, Zeyu Zheng, Zhuosheng Zhang, Xingyu Lou, Changwang Zhang, Zhihui Fu, Jun Wang, Weiwen Liu, Jianghao Lin, Weinan Zhang
- Date: 2026-04-09
- Category: agent
- Source: https://arxiv.org/abs/2604.08224

## Why this paper

This paper is unusually relevant to current agent practice because it does not treat agent improvement as only a model-weight problem. Instead, it explains why practical gains often come from pushing cognition outward into memory, reusable skills, interaction protocols, and the execution harness itself.

## Core problem

As LLM agents are deployed on longer and more realistic tasks, raw model capability alone is not enough. Agents need durable state, reusable procedures, coordination structure, and runtime safeguards. The paper asks how to organize these external components into a coherent view rather than treating them as scattered engineering tricks.

## Main thesis

The central thesis is that many agent capabilities are now "externalized":

- Memory externalizes state across time.
- Skills externalize procedural know-how.
- Protocols externalize interaction structure across tools, users, or multiple agents.
- Harness engineering externalizes control, governance, reliability, and orchestration.

Under this lens, agent progress increasingly comes from redesigning the system around the model, not merely from scaling the model itself.

## What the paper covers

- A historical shift from relying on model weights, to context engineering, to broader harness-centric agent systems.
- A structured review of memory systems, skill libraries, and coordination protocols for LLM agents.
- A systems-level view of harness engineering as the layer that integrates storage, execution rules, tool use, evaluation, and safety controls.
- Open challenges around evaluation, governance, and how externalized infrastructure co-evolves with stronger base models.

## Key contributions

1. It offers a unifying vocabulary for several threads that are often discussed separately.
2. It frames agent engineering as a cognitive-systems design problem rather than a bag of ad hoc tricks.
3. It highlights coupling effects: memory, skills, protocols, and harnesses are not independent modules, and their interactions often determine reliability.
4. It surfaces a concrete research direction: better agent systems may come from better external structures even when the underlying model changes little.

## Concise summary

The paper argues that modern LLM agent capability is increasingly created outside the model weights. Memory stores, skill repositories, interaction protocols, and runtime harnesses act as cognitive infrastructure that makes difficult tasks more tractable and reliable. The review is useful because it supplies a clean systems frame for understanding why agent performance often improves through architecture and orchestration rather than pure pretraining or finetuning.
