# Module boundaries

`scope.md` defines the Release 1 architecture and phase sequence. This document makes the ownership boundary explicit. The dependency relationships below are **proposed sequencing constraints derived from the scope roadmap**, not a final approved import graph. Confirm exact call directions and public contracts during phase reviews before implementing cross-module calls.

## Rules

1. A module is the sole owner of its domain rules, application operations and persisted records.
2. Cross-module collaboration uses operations deliberately exported from the owning module's `index.ts` (or a contract owned by the caller when appropriate). Never import another module's private implementation.
3. A module never queries or updates another module's MongoDB collections directly.
4. Keep domain/application code independent of Next.js, React, Clerk SDKs and MongoDB driver objects.
5. Use an explicit application workflow for multi-module orchestration. Add domain events/jobs only when asynchronous processing or independent execution requires them.
6. Shared contracts contain only real cross-boundary contracts. Avoid universal barrels, generic service locators and duplicated domain types.
7. Respect tenant and privacy boundaries: personal learner data is private by default; institution access is limited to authorized assigned data; staff access is separately governed and audited.
8. Foundations for later releases do not authorize later-release workflows.

## Ownership and proposed dependencies

| Module | Owns | Proposed collaborators / prerequisite direction |
|---|---|---|
| `identity-access` | Internal user identity, actor resolution, authentication integration boundary, roles and grants | Foundation; no domain-module dependency |
| `learner-profile-goals` | Learner profile, consent and independent language-learning goals | `identity-access`; reference data owned by `curriculum` only through its public interface |
| `organizations` | Organization, membership, roles, cohorts and tenant scope | `identity-access`; commercial entitlement check through `commercial` public operations where needed |
| `curriculum` | Language reference data, curriculum, courses, lessons and published content versions | `governance` for controlled review/publication workflow; must not depend on learner UI |
| `governance` | Content/examination review, approval, publication and immutable version lifecycle | `identity-access`, `audit-oversight`; invokes owner-module operations rather than owning their records |
| `learning` | Enrollment/assignment context, lesson delivery, learner activity and resumable attempts | `curriculum`, `identity-access`; `organizations` when institution assignment/scope applies |
| `question-bank` | Versioned reusable questions and their ownership/availability rules | `curriculum` reference values and `governance` publication boundary, as applicable |
| `examinations` | Examination definition/configuration, secure attempts and response history | `question-bank`, `identity-access`; `organizations` for tenant-private exams |
| `evaluation` | Objective/manual marking, evaluation provenance and finalized results | `examinations`; rules must preserve institution-owned medical-knowledge results as distinct from VocaClin language evidence |
| `progress-competencies` | Canonical competency definitions/model, evidence and skill-wise progress | `learning`, `evaluation`; does not claim official proficiency certification |
| `placement-assessment` | Optional placement journey and indicative placement evidence | `learner-profile-goals`, `curriculum`, `evaluation`; placement does not issue CEFR certification |
| `credentials` | Issuer-aware course-completion records and credential lifecycle | `curriculum`, `learning`, `evaluation`; Release 1 excludes validated VocaClin proficiency credentials |
| `commercial` | Product access, subscription/entitlement records and commercial policy | `identity-access`, `organizations`; payment provider integration is an adapter, not domain ownership |
| `reporting` | Tenant-scoped and privacy-guarded report projections | `organizations`, `learning`, `examinations`, `evaluation`, `progress-competencies`; access checks remain mandatory |
| `audit-oversight` | Append-only audit records, evidence integrity and authorized audit access | Called by critical mutations across modules; do not make audit records mutable or expose learner data by default |
| `trust-safety` | Reports, cases, enforcement/appeal workflows and safety decisions | `identity-access`, `audit-oversight`; restricted access and dual approval apply where specified |
| `platform-operations` | Staff workspaces, operational work assignment and orchestration | Uses public APIs of `identity-access`, `organizations`, `governance`, `trust-safety`, `audit-oversight`, `credentials` and `reporting`; does not own their entities |
| `community` | Limited Release 1 contributor-submission intake foundation/handling only | `governance`, `question-bank`, `identity-access`; public profiles, discovery, publishing and marketplace are deferred |
| `ai-assistance` | Optional AI orchestration boundary, consent/safety/provenance controls | May collaborate with learning/evaluation only after a separate R1 decision; core workflows work without AI |

`src/server/infrastructure/` contains adapters, not domain owners. `src/server/application/` composes public operations. `src/worker/` executes application jobs and does not duplicate business logic.

## Proposed phase dependency sequence

The minimum dependency order expressed in `scope.md` is: (1) engineering/web baseline; (2) server conventions and contracts; (3) persistence foundation; (4) identity/authorization/audit; (5) profile, reference data and goals; (6) organizations/commercial foundation; (7) governance/curriculum/media; (8) learning delivery; (9) competencies/progress; (10) question bank/examinations; (11) evaluation/placement; (12) credentials and learner journey; (13) institutional/reporting workflows; (14) Platform Operations, Trust & Safety and limited integrations; (15) release hardening. Cross-module edges above are working hypotheses constrained by this order, not permission to skip a phase gate.

## Forbidden directions and checks

- `src/app/`, UI features and integration SDKs must not own or be imported by domain logic.
- A module cannot import another module's `/domain`, `/infrastructure`, repository, collection or private application implementation.
- Infrastructure may implement ports owned by its module; domain code must not import infrastructure.
- UI features call server operations through intentional server boundaries, not MongoDB directly.
- No cross-tenant query is valid without explicit scope/authorization; no client-supplied organization ID establishes authorization.

During implementation, enforce these rules with dependency review and tests/lint checks selected before production logic. Do not add a lint plugin or test framework in Phase 0.
