# Dependency rules

These rules summarize `scope.md` for implementation reviews. The architecture and candidate dependency sequence are in [module boundaries](./module-boundaries.md). Items labeled proposed remain subject to phase review; product-owner approval does not replace Ricoz/company approval.

## Dependency direction

- `src/app/` composes route-level UI and handlers; it may use feature and application-facing operations. Server Components call application operations directly rather than making unnecessary internal HTTP calls.
- `src/features/` owns capability UI and view models. It does not access persistence or import private backend internals.
- `src/server/modules/<owner>/` owns domain/application logic and data. Other modules use its explicit public entry point only.
- Module domain/application logic does not depend on Next.js, React, Clerk SDK types, MongoDB driver objects, or other adapter implementations.
- Module infrastructure implements its own ports and adapts external services. It cannot become a shared domain owner.
- `src/server/application/` coordinates module public operations; `src/worker/` invokes application operations for background jobs.
- `src/shared/contracts/` holds only stable client/server or external API contracts. Domain types stay with their module; UI types stay with their feature.
- Automated tests live under `tests/`, organized by the boundary they verify.

## Cross-module access

1. Call a deliberate public operation from the owning module's `index.ts`.
2. Do not reach into private module folders or access another module's collection.
3. Use an application workflow for multi-module transactions and orchestration. Each module remains responsible for its own invariants.
4. Introduce events/queues only for work that must be asynchronous or independently retried; persist idempotency/concurrency controls where needed.
5. Avoid circular module dependencies. If a proposed edge creates a cycle, move orchestration to the application layer or revise ownership with a recorded decision.

## Client, API and trust boundaries

- Browser input, URL/query parameters, cookies, external webhooks and database documents are untrusted until validated at their boundary.
- Backend authorization is required for every protected operation; navigation visibility is not authorization.
- Tenant identity and permissions are resolved server-side. Personal learner data is private by default and institution access is explicitly scoped.
- API Route Handlers under `/api/v1` expose versioned external/client contracts; do not expose domain entities or persistence documents.
- Server Actions are for suitable UI-triggered mutations and must apply the same authorization, validation, idempotency and audit invariants.
- Critical changes that require audit must fail safely if a durable audit record cannot be created. Sensitive staff access follows scope's case, purpose, duration and independent-approval rules.

## Persistence and providers

- MongoDB collections and repositories are owned by their domain module. Use the official Node.js Driver as specified by scope; exact schemas/indexes follow known access patterns.
- Validate inputs in application boundaries and use database validators/constraints where appropriate. Use transactions only for required atomicity.
- Clerk, email, object storage, AI, observability, database and queue providers are accessed through infrastructure adapters. Do not allow vendor types to leak into domain contracts.
- Secrets and sensitive learner content must not appear in source, logs, audit payloads or committed setup instructions.

## Phase gate

Before implementing runtime schemas, select and approve a runtime validation library. Select the test framework and commands during Phase 0, then add or change test scripts in the relevant approved implementation phase, such as Phase 1. Phase 0 records current tooling and unresolved choices; it does not install dependencies or begin feature implementation.
