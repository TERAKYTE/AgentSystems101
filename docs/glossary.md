# Glossary

## Agent

A system that uses a model or policy to choose actions based on observations, state, tools, and goals. In this repository, an agent is an engineered system, not an inherently autonomous entity.

## Agent Loop

The repeated sequence of observe, reason, act, and update state. ReAct-style systems make this loop explicit through reasoning traces, tool calls, and observations.

## Tool

A callable capability exposed to an agent, usually through a typed contract. Examples include search, file access, calculators, databases, APIs, browsers, and internal services.

## Tool Contract

The schema, preconditions, side effects, and error behavior of a tool. Weak tool contracts are a common cause of agent failures.

## Context Window

The bounded input space available to an LLM at inference time. Context window management is the practice of deciding what information enters that space.

## Context Engineering

The design of retrieval, summarization, memory, state, prompts, tool outputs, and ordering rules that shape the model's working context.

## Memory

Persisted information used across turns, sessions, or tasks. Agent memory can be episodic, semantic, procedural, or user-specific. Memory is not automatically reliable; it requires retrieval, update, and deletion policies.

## RAG

Retrieval-Augmented Generation. A system retrieves external information and supplies it to the model as grounded context before generation.

## Orchestration

The control logic that routes work among models, tools, workflows, humans, and other agents. Orchestration can be prompt-driven, graph-based, event-driven, or code-defined.

## Multi-Agent System

A system with multiple agents or roles that coordinate through messages, shared state, tools, or workflow control. Multi-agent design can improve specialization but also increases latency, cost, and debugging complexity.

## Evaluation

The process of measuring whether an agent system completes tasks reliably. Useful evaluation covers final answers, intermediate tool calls, state updates, safety constraints, and cost.

## Agentic RL

Training or optimizing models for agent-like tasks, often involving tool use, long-horizon reasoning, reward models, preference optimization, or reinforcement learning methods such as GRPO.

## Observability

The ability to inspect model inputs, outputs, tool calls, state transitions, retrieval results, latency, cost, and failures after the system runs.

