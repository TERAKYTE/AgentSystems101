#!/usr/bin/env python3
"""Small RAG and memory workflow without external dependencies."""

from __future__ import annotations

from dataclasses import dataclass, field


DOCUMENTS = [
    "Agent memory should be separated into short-term state, durable user preferences, and retrieved external knowledge.",
    "RAG systems need chunking, retrieval, reranking, citation, and freshness policies.",
    "Context windows are limited, so production agents need explicit context budget management.",
    "Observability should capture prompts, retrieved context, tool calls, latency, cost, and errors.",
]


@dataclass
class ConversationMemory:
    facts: list[str] = field(default_factory=list)

    def remember(self, fact: str) -> None:
        self.facts.append(fact)

    def recent(self, limit: int = 2) -> list[str]:
        return self.facts[-limit:]


def retrieve(query: str, limit: int = 2) -> list[str]:
    terms = {term.lower().strip(".,?") for term in query.split()}
    scored = []
    for document in DOCUMENTS:
        score = sum(1 for term in terms if term in document.lower())
        if score:
            scored.append((score, document))
    scored.sort(reverse=True)
    return [document for _, document in scored[:limit]]


def build_context(query: str, memory: ConversationMemory, budget: int = 320) -> str:
    sections = [
        "Recent memory:",
        *memory.recent(),
        "Retrieved knowledge:",
        *retrieve(query),
        "User question:",
        query,
    ]
    context = "\n".join(section for section in sections if section)
    return context[:budget]


if __name__ == "__main__":
    memory = ConversationMemory()
    memory.remember("The user is building an agent handbook for engineers.")
    memory.remember("The user prefers grounded production tradeoffs over hype.")

    question = "How should an agent manage memory, RAG, and context windows?"
    print(build_context(question, memory))
