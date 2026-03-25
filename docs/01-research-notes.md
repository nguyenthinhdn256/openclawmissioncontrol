# OpenClaw Mission Control Research Notes

## What OpenClaw already provides
OpenClaw’s official docs describe it as a self-hosted gateway that connects chat apps to agents, tools, nodes, and sessions. The Gateway is the long-lived control plane, while UI clients connect to it over WebSocket. The docs also call out a Control UI / dashboard, multi-agent routing, first-class tools, sessions, approvals, and nodes.

This means a Mission Control for OpenClaw should not replace the Gateway. It should sit above it as an operator-facing orchestration layer that consumes and manages the Gateway’s real control primitives.

## Key upstream primitives from OpenClaw
- Gateway as source of truth for sessions, channels, tools, events, and approvals
- Control UI / dashboard entrypoint exposed by the gateway
- Multi-agent routing through isolated agents and bindings
- Session ownership by the gateway, not by UI clients
- Tool layer + skill layer + plugin layer
- Approval flows for exec and device pairing
- Nodes for remote execution and host separation
- Gateway protocol exposing status, chat, sessions, nodes, approvals, and more

## Operational conclusion
A practical Mission Control for OpenClaw should be an operations layer with these responsibilities:
1. Observe: give one dashboard for mission queues, dispatches, QA, approvals, agents, nodes, and audits.
2. Orchestrate: turn user work into structured dispatches with explicit ownership and state transitions.
3. Govern: enforce rules, approval gates, retry policy, stop policy, and acceptance criteria.
4. Verify: validate outputs before marking work done.
5. Persist: maintain a domain-specific state store for missions independent from raw OpenClaw sessions.
