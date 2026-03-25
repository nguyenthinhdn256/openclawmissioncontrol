# OpenClaw Mission Control Research Notes

## What OpenClaw already provides

OpenClaw’s official docs describe it as a self-hosted gateway that connects chat apps to agents, tools, nodes, and sessions. The Gateway is the long-lived control plane, while UI clients connect to it over WebSocket. The docs also call out a Control UI / dashboard, multi-agent routing, first-class tools, sessions, approvals, and nodes.

This means a “Mission Control” for OpenClaw should not replace the Gateway; it should sit above it as an operator-facing orchestration layer that consumes and manages the Gateway’s real control primitives.

Key upstream primitives from OpenClaw:
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

## Recommended architecture

### Layer 1: OpenClaw Runtime
- Gateway
- Agents
- Sessions
- Skills / tools / plugins
- Nodes
- Approvals

### Layer 2: Mission Control Domain
- Mission registry
- Dispatch queue
- QA gate engine
- Artifact registry
- Run timeline / event log
- Policy / rules engine
- Dashboard read models

### Layer 3: Operator UX
- Dashboard
- Boards / queues
- Mission detail
- Dispatch detail
- QA review
- Settings / policies / health

## How Mission Control should operate

### 1. Intake
An operator creates a mission, or a mission is created from a channel event, webhook, or manual action.

### 2. Planning
Mission Control decomposes the mission into code work packages, called dispatches. Each dispatch targets a bounded area and has:
- objective
- file scope
- inputs
- expected outputs
- validation steps
- acceptance criteria
- dependencies

### 3. Assignment
A dispatch is routed to an execution agent or worker lane.

### 4. Execution
The agent executes the task and returns outputs, artifacts, logs, changed files, and test evidence.

### 5. QA Gate
Mission Control verifies:
- required files exist
- schema contracts are respected
- tests pass
- artifacts are complete
- cross-module dependencies remain compatible

### 6. Decision
Mission Control marks the dispatch:
- approved
- needs_revision
- blocked
- failed

### 7. Mission resolution
When all required dispatches pass QA and dependency graph is satisfied, the mission becomes done.

## Design principles
- OpenClaw-native: use real upstream concepts like gateway, sessions, approvals, nodes, and agent routing.
- Deterministic state: never infer mission status only from chat text.
- Explicit contracts: every dispatch should have machine-checkable fields.
- Human override: operators can force-stop, retry, reassign, or approve.
- Auditability: every state transition should be evented and timestamped.
- Modularity: UI, contracts, state engine, dispatch engine, and QA engine should be separable.

## Important boundary

This kit includes:
- a researched architecture
- a full specification
- a runnable skeleton project
- coordinated prompts to parallelize coding work

This kit does **not** claim to be an official OpenClaw product spec. It is a practical Mission Control design built on top of current OpenClaw capabilities.
