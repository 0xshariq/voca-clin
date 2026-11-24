# Project structure

This document describes the current repository layout and the intended Release 1 responsibilities. `scope.md` is authoritative if this summary and the detailed phase plan differ. The repository is a single Next.js App Router application; it is not a monorepo.

## Current baseline

Present at Phase 0 review:

- Root: `AGENTS.md`, `README.md`, `scope.md`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `tsconfig.json`, `next.config.ts`, `biome.json`.
- Design references: `designs/design-system.png`, `designs/desktop/{admin,contributor,institution,learner}/`, and `designs/mobile/{admin,contributor,institution,learner}/`.
- Web routes: `src/app/`, with route-group placeholders for admin, contributor, institution and learner, plus `src/app/api/v1/`.
- UI: `src/components/{shell,ui}/`; capability-specific UI belongs in `src/features/`.
- Backend: `src/server/application/`, `src/server/infrastructure/`, and `src/server/modules/`.
- Shared contracts/utilities: `src/shared/`.
- Background execution: `src/worker/`.
- Test categories: `tests/{api-contract,database-integration,e2e,fixtures,helpers,module-integration,unit}/`.
- Planning docs: `docs/architecture/`, `docs/development/`, and `docs/decisions/`.

Most current source directories contain starter files or placeholders. Their existence does not mean their feature is implemented.

## Ownership rules

| Path | Owns |
|---|---|
| `src/app/` | URL structure, layouts, route composition, metadata, route-level loading/error boundaries, and HTTP Route Handlers. Do not place complete product features or domain rules here. |
| `src/features/<capability>/` | UI, view models, and client interactions for a product capability, shared across relevant experiences when appropriate. |
| `src/components/ui/` | Generic accessible UI primitives, added only when needed. |
| `src/components/shell/` | Shared navigation and experience-specific layout building blocks. |
| `src/server/modules/<module>/` | Module-owned domain rules, application operations, ports, persistence implementation and public module entry point. |
| `src/server/application/` | Cross-module application composition and workflows; not a second domain owner. |
| `src/server/infrastructure/` | External system adapters (Clerk, MongoDB, email, object storage, AI, observability). Domain logic must not depend on adapter SDKs. |
| `src/shared/contracts/` | Explicit client/server or external API contracts only; no universal domain type registry. |
| `src/shared/schemas/` | Shared runtime schemas where a genuinely shared boundary requires them; choose the validator before creating schemas. |
| `src/worker/` | Worker entry point, job handlers and scheduling/queue adapters. Reuse application operations; do not duplicate business logic. |
| `tests/` | Unit, module, database, API-contract and end-to-end tests, fixtures and helpers. Keep all automated tests outside `src/`. |
| `designs/` | Read-only product design references. `designs/design-system.png` is the visual source of truth; desktop/mobile screen files guide responsive implementation. |

## Backend modules

The 19 module directories already present under `src/server/modules/` are retained: `identity-access`, `learner-profile-goals`, `organizations`, `curriculum`, `learning`, `question-bank`, `examinations`, `evaluation`, `progress-competencies`, `placement-assessment`, `governance`, `credentials`, `commercial`, `reporting`, `trust-safety`, `audit-oversight`, `platform-operations`, `community`, and `ai-assistance`.

Each module owns its data and exposes intentional cross-module operations through its root `index.ts`. Do not import another module's private domain/infrastructure files or access its collections directly. Do not create empty module layers just to match a template; implement a layer when it has real responsibility.

## Route groups

Existing route-group roots are `(learner)/learn`, `(institution)/institution`, `(contributor)/contributor`, and `(admin)/admin`. Public routes belong outside authenticated experience groups. A route group is an organization/layout boundary and does not appear in the URL. Use one responsive website route for corresponding desktop/mobile designs; the mobile references are not native-app screens. The proposed per-screen route map and open mappings are in [the design inventory](../design-inventory.md).

## Status and change control

This structure documents the supplied baseline plus the Phase 0 intended ownership model. Product and company approvals remain distinct. Changes to boundaries require a recorded decision and updates to this document and `scope.md`; do not infer approval from a planned path or design mockup.
