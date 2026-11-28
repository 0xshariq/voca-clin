# VocaClin Release 1 Implementation Scope

**Document type:** Internal engineering implementation roadmap  
**Project:** VocaClin  
**Scope:** Release 1  
**Status:** Initial roadmap for review; phases require review and approval before implementation  
**Stack direction:** One Next.js App Router application, TypeScript, Node.js, MongoDB and a separately executable Node.js worker

---

## 1. Purpose and authority

This file is VocaClin's internal implementation roadmap. It is written for the people implementing the project. It is not a stakeholder proposal, product presentation or replacement for the PRD.

Its purpose is to answer, in implementation order:

- What functionality must be implemented in each phase?
- Which business logic must be written first, and why?
- Which existing files must be modified?
- Which exact new files are expected, and what logic belongs in each?
- Which modules, frontend features, routes, infrastructure and data stores are involved?
- Which tests must prove the work?
- What must be true before a phase can be marked complete?

The roadmap is deliberately file-oriented. A phase is not planned well enough merely because it names a feature or module. It must identify implementation responsibilities and expected file paths.

### 1.1 Source of truth

Use this order when resolving a question:

1. Explicit decisions approved by the product owner during VocaClin planning discussions.
2. This `scope.md`, after the relevant phase has been reviewed and approved.
3. VocaClin PRD v0.4(1), for product requirements, acceptance conditions, release boundaries and open specifications.
4. Existing architecture and development documents in `docs/`.
5. Current implementation, provided it does not contradict an approved decision.

The PRD is a proposed document and contains matters subsequently clarified during discussions. Approved discussions take precedence where they explicitly supersede an earlier PRD statement. This scope must not silently turn an unresolved PRD item into an approved product decision.

### 1.2 Status conventions

- **Approved:** The product owner approved the architectural or product direction.
- **Proposed:** A file path, implementation detail or sequence is recommended here and still requires phase review.
- **Open:** A product, company, legal, academic or technical decision is unresolved.
- **Conditional:** Create or implement only if the actual workflow requires it and the phase review confirms it.
- **Existing:** Present in the project tree supplied on 21 November 2026.
- **Modify:** Existing file to extend or update.
- **Create:** New file expected when its phase is approved.

A planned path is not proof that the file currently exists. File lists describe intended work, not a command to generate empty files in advance.

### 1.3 Change control

- Review and approve each phase before implementation.
- If implementation discovers a necessary change to an approved phase, record the reason and update this file before the change spreads.
- Do not silently expand Release 1 scope.
- Do not change an approved ownership boundary merely for implementation convenience.
- Keep future-release foundations separate from future user-facing functionality.
- If a proposed file proves unnecessary, omit it and record why during phase review. Do not create it merely because it appears in this proposal.
- Update paths and exit criteria when an approved plan changes.

---

## 2. Release 1 product outcome

Release 1 must deliver a usable, secure, responsive healthcare-language learning and assessment platform for individuals and institutions, together with the operational capabilities required for VocaClin to govern and run the platform.

### 2.1 Five required outcomes

1. **An individual can learn:** Register, create independent learning goals, optionally complete placement, access an appropriate English learning path and complete learning activities.
2. **An individual can improve:** Review skill-wise progress and evidence, practise, attempt assessments, understand results and receive useful recommendations.
3. **An institution can operate:** Manage members, roles and cohorts; assign platform programmes and private examinations; and access authorized reports.
4. **VocaClin can maintain trusted content:** Manage platform-owned curricula and examinations, preserve content and assessment history, and administer users and organizations.
5. **VocaClin can operate and govern itself:** Staff can use all eight Platform Operations workspaces with role-appropriate permissions, MFA, dual approval, audit integrity and operational workflows, without manual database changes or unauthorized workarounds.

### 2.2 Five web experiences

All five experiences are delivered by one responsive website. This scope does not include a native mobile application.

| Experience | Release 1 implementation |
|---|---|
| Public | Product information, supported-offer information, sign-up/sign-in entry, institutional enquiry and public discovery of eligible platform-owned learning/examination information. |
| Learner | Personal home, learning goals, optional placement, learning, practice, examinations, results, progress, credentials, profile and settings. |
| Institution | Organization setup, memberships, roles, cohorts, platform-course assignments, private examinations, authorized learner/cohort reports and institution settings. |
| Contributor | Foundation and narrow administrator-side handling of contributor-submitted examination material only. No public contributor application, public profile, public discovery or general publishing experience in R1. |
| Platform Operations | Complete R1 staff workspace with the eight approved functional areas and shared governance/security/operational capabilities. |

### 2.3 Release 1 content and assessment boundaries

- English is the first implemented learning language.
- Curriculum and data structures must be language-independent. Full German and French learning delivery is R2.
- Launch content is a shared healthcare-language foundation, relevant general-language foundations and selected professional pathways. First professions, English proficiency coverage, destination priorities and external examination programmes remain open specifications.
- The curriculum supports four interconnected layers: general language, healthcare language, professional learning, and destination/examination preparation. They are not mandatory sequential stages.
- Placement is optional, recommended and skippable. Its outcomes are indicative evidence, not official CEFR certification or prediction of external examination results.
- One generic examination engine serves platform, personal-private and institution-private examinations.
- Institutions may create private healthcare-language and medical-knowledge examinations. Institutional medical-knowledge content/results remain the institution's responsibility and are never treated as VocaClin language-proficiency evidence.
- Public contributor publishing and public question-bank publishing are deferred. R1 includes only the specified administrator-side handling of contributor-submitted public examination material; intake method and contributor eligibility remain open.
- VocaClin course-completion records are in R1. Validated VocaClin language-proficiency credentials are R3.
- AI is optional. Core learning, assessment and progress must work without it. The provider boundary, output provenance and consent/safety boundaries are established, but an optional R1 AI feature requires a separate decision.

### 2.4 Explicit Release 1 exclusions

Do not implement these as R1 user-facing capabilities:

- Full German and French curricula.
- Complete pathways for every profession, specialty or destination.
- Institution-created full courses and programmes.
- Public contributor registration, verification, profiles, public discovery and marketplace.
- Public question-bank publishing and public question-bank reuse.
- AI learning assistant, voice/text role-play, automated AI speaking assessment or AI-only high-stakes grading.
- Validated VocaClin language-proficiency credential issuance and public credential verification.
- Advanced adaptive learning, adaptive question selection and predictive analytics.
- Advanced reporting builder, scheduled advanced reports, advanced bulk operations and advanced case automation.
- Advanced multi-campus administration and complex external LMS/roster integrations.
- Medical diagnosis, treatment recommendations or a general medical-education curriculum.

R1 foundations may support later capabilities without implementing those capabilities prematurely.

---

## 3. Approved architecture and project rules

### 3.1 Application architecture

- One Next.js App Router application containing the experiences; do not introduce `apps/`, `packages/` or a monorepo layout.
- TypeScript and Node.js.
- Modular monolith with domain-owned modules.
- Domain and application logic must not depend on Next.js, React, Clerk SDKs or MongoDB driver objects.
- Server Components by default. Client Components only where interaction requires them.
- Server Actions for suitable UI-triggered mutations.
- Versioned REST Route Handlers under `/api/v1` for external/client APIs and integrations that need HTTP endpoints.
- Server Components call application operations directly; do not make unnecessary internal HTTP requests.
- A separately executable Node.js worker uses the same codebase and module/application logic.

**Company approval note:** Next.js as both frontend and backend is a product-owner-selected architecture requiring the Ricoz Express.js exception. Vercel, Clerk and managed MongoDB hosting also have separate company approval requirements. Do not describe product-owner selection as company approval. The Express.js fallback must preserve the same domain/application boundaries.

### 3.2 Backend module rules

- Each module owns its domain concepts, application operations and persisted data.
- Other modules use deliberate public operations exposed through the owning module's `index.ts`; they must not import another module's private domain or infrastructure implementation.
- A module must not query or modify another module's MongoDB collections directly.
- Module-to-module synchronous collaboration uses explicit application-facing interfaces.
- Domain events and background jobs are introduced only where asynchronous work or independent processing genuinely requires them.
- Use transactions only where atomicity requires them. Protect concurrent and repeatable operations with uniqueness, idempotency and concurrency controls.
- A module can be implemented across multiple phases. Do not create placeholder implementations for modules whose prerequisites have not arrived.

### 3.3 Type and contract rules

- Do not create a universal `src/types/` folder or central type registry.
- Domain types/entities/value objects/interfaces are owned by their domain module.
- Frontend feature view models/types belong with the relevant feature.
- Component-only prop types remain beside the component.
- Persistence document types and mappers belong to the relevant module's infrastructure.
- API request/response contracts that genuinely cross client/server boundaries are canonical under `src/shared/contracts/`, organized by capability and operation.
- Runtime schemas are co-located with the relevant contract or feature boundary where appropriate. Do not duplicate a type separately when it can be inferred from the canonical schema.
- Do not expose domain entities or internal persistence documents as public API responses.
- Zod 4 is the selected runtime validation library for shared and boundary schemas, recorded during Phase 2. This engineering choice does not approve any open product, provider or deployment decision.
- TypeScript compile-time typing does not replace validation of untrusted input.
- Do not add universal barrels that re-export every contract or every module's private types.

### 3.4 UI and frontend rules

- Use the approved UX Pilot design system as the visual reference.
- Translate the design system's palette, typography, spacing, component states, navigation and accessibility rules into the website.
- Use shadcn/ui primitives as the starting point for reusable components; customize them for VocaClin rather than rebuilding standard interaction primitives from scratch.
- Add only the shadcn components actually needed by implemented screens.
- Organize frontend implementation in `src/features/` by product capability, not by the five experiences.
- `src/app/` owns routes, layouts, loading/error/not-found boundaries, metadata and Route Handlers; it composes features rather than owning full business features.
- `src/components/ui/` owns reusable generic UI primitives; `src/components/shell/` owns shared layout/navigation building blocks. Feature-specific composite UI remains inside its feature unless genuine reuse is proven.
- Responsive website behaviour is required for desktop, tablet and mobile. No native app work.
- Accessibility and English-first localization foundations are Release 1 requirements. Specific formal accessibility standard/compliance target remains open.

### 3.5 Testing rules

All automated tests live outside `src/` in `tests/`.

- Unit tests verify domain rules and isolated application logic.
- Module integration tests verify public module boundaries and cross-module workflows.
- Database integration tests use a real test database and verify repository, index, transaction and migration behaviour.
- API contract tests exercise the actual HTTP entry point and response, not only the underlying service.
- End-to-end tests verify complete learner, institution and Platform Operations workflows.
- Test fixtures and helpers remain under `tests/fixtures/` and `tests/helpers/`.
- Tests must not use production data or credentials and must not leak test-only code into production builds.
- No dummy tests, meaningless snapshots or tests created solely to inflate counts.
- A test must verify expected and failure behaviour at the appropriate boundary.

### 3.6 Data and persistence rules

- One MongoDB database with domain-owned collections.
- Official MongoDB Node.js Driver with typed repositories as the selected initial data-access direction.
- MongoDB ObjectId for document identifiers; Clerk IDs remain external identifiers mapped to internal VocaClin users.
- Hybrid embedding/referencing based on ownership, lifecycle and access patterns.
- Application validation plus MongoDB collection validators where appropriate.
- Query-driven indexes, uniqueness constraints and selective transactions.
- Versioned migrations.
- Object storage for large media, MongoDB for metadata and references.
- Private media by default; authorized temporary upload URLs; validate, quarantine and process lifecycle.
- Backups and tested restore procedures.
- Do not finalize exact schemas, indexes or collections before the phase's access patterns and workflows are understood.

### 3.7 Security, privacy and governance invariants

These apply in every phase and must not be postponed:

- Backend authorization on every protected operation; navigation visibility is never authorization.
- Current role, grant, restriction, scope and expiry are checked when access is exercised.
- Personal learning is private from institutions by default; institution access is limited to assigned and otherwise explicitly authorized data.
- Strict multi-tenant isolation.
- Consent is granular and withdrawable where applicable. Recordings/transcripts and AI processing require appropriate consent and transparency.
- No personal information sold or used for learner-data advertising.
- No private user data used to train AI without appropriate explicit authorization.
- Staff learner-data access categories A-F and access operations (view/modify/download/export/delete) are separately enforced. Categories C-F require documented case, minimum necessary scope, duration, independent approval, automatic expiry and audit.
- No staff impersonation or silent entry into a learner account.
- Mandatory MFA for all staff, secure sessions and fresh authentication for sensitive operations.
- High-impact actions require independent two-person approval; requester cannot approve own request; conflicts of interest block independent approval/review.
- Audit records are append-only and tamper-evident. Critical actions must fail safely if required audit records cannot be durably recorded.
- The Auditor is independently authorized and read-only; audit access does not grant access to underlying private learner data.
- Historical content, examinations, results, evidence and case records must not be silently overwritten or deleted.
- No secrets, tokens, full private conversations, recordings or unnecessary sensitive data in ordinary logs or audit payloads.

---

## 4. Existing project structure baseline

The project structure supplied on 21 November 2026 is the baseline. The following paths were present in that tree. Existing placeholder `index.ts` or README files should be extended only when they have a real purpose; they must not be treated as proof that a feature has been implemented.

```text
voca-clin/
├── AGENTS.md
├── README.md
├── biome.json
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
├── public/ (Next.js starter assets)
├── docs/
│   ├── architecture/{dependency-rules.md,module-boundaries.md,project-structure.md}
│   ├── decisions/README.md
│   └── development/local-development.md
├── src/
│   ├── app/
│   │   ├── (admin)/admin/
│   │   ├── (contributor)/contributor/
│   │   ├── (institution)/institution/
│   │   ├── (learner)/learn/
│   │   ├── api/v1/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/{shell,ui}/
│   ├── features/README.md
│   ├── server/
│   │   ├── application/workflows/index.ts
│   │   ├── infrastructure/integrations/{ai,clerk,email,object-storage}/index.ts
│   │   ├── infrastructure/observability/index.ts
│   │   ├── infrastructure/persistence/mongodb/index.ts
│   │   └── modules/ (19 modules; each has domain, application, ports, infrastructure and root index.ts)
│   ├── shared/{README.md,constants/index.ts,contracts/index.ts,schemas/index.ts,types/index.ts,utils/index.ts}
│   └── worker/{handlers,jobs}/ and index.ts
└── tests/{README.md,api-contract,database-integration,e2e,fixtures,helpers,module-integration,unit}/
```

### 4.1 Existing backend modules

The following module directories already exist under `src/server/modules/`:

1. `identity-access`
2. `learner-profile-goals`
3. `organizations`
4. `curriculum`
5. `learning`
6. `question-bank`
7. `examinations`
8. `evaluation`
9. `progress-competencies`
10. `placement-assessment`
11. `governance`
12. `credentials`
13. `commercial`
14. `reporting`
15. `trust-safety`
16. `audit-oversight`
17. `platform-operations`
18. `community`
19. `ai-assistance`

Do not rename these module folders or introduce a second directory layout without an approved reason.

---

## 5. Phase overview

The roadmap has Phase 0 through Phase 15. The order is dependency-driven. A module may be touched in more than one phase: its foundational capability is implemented when first required, and its remaining Release 1 workflows are completed later.

| Phase | Name | Main outcome |
|---:|---|---|
| 0 | Scope and engineering baseline | Reviewed implementation scope, design inventory, dependency rules and unresolved-decision gates |
| 1 | Project/tooling and web foundation | Reliable local development, Next.js shell, design-system setup and responsive UI foundations |
| 2 | Server conventions, contracts and composition | Validated environment, common errors, runtime validation conventions and application composition |
| 3 | MongoDB and persistence foundation | Database lifecycle, migrations, repository conventions, indexes and test database support |
| 4 | Identity, authorization and audit core | Internal identity, Clerk, actor resolution, staff permission foundation and durable audit recording |
| 5 | Profiles, consent, reference data and goals | First complete personal identity/profile/goal workflow |
| 6 | Organizations and commercial foundation | Multi-tenant organization, membership, cohort and entitlement foundation |
| 7 | Governance, curriculum and media | Controlled content lifecycle, curriculum structures, published versions and secure media processing |
| 8 | Learning delivery and activities | Learner enrolment, published lesson delivery, activity attempts, saving and resumption |
| 9 | Competencies, evidence and learning paths | Evidence-based progress, proficiency representations and explainable rule-based paths |
| 10 | Question bank and examination engine | Reusable versioned questions, examination builder, attempts and secure responses |
| 11 | Evaluation and placement | Objective/manual evaluation, results, placement journey and evidence handoff |
| 12 | Credentials and complete learner journey | Course-completion credentials and end-to-end individual learner experience |
| 13 | Institutional workflows and reporting | Institution assignments, private exams, tenant-scoped reports and institution experience |
| 14 | Platform Operations, Trust & Safety, community and AI foundations | Two coordinated workstreams: complete the internal operational experience, then close the limited community/AI foundations and remaining cross-experience integrations |
| 15 | Release hardening and launch readiness | Complete acceptance, security, recovery, accessibility, deployment and operational verification |

# 6. Phase 0: Scope and engineering baseline

## 6.1 Purpose

Finalize the engineering roadmap before production implementation begins. This phase makes the order, boundaries and open dependencies explicit. It is not a phase for creating empty implementation files.

## 6.2 Decisions and work

1. Review this complete `scope.md` and approve/revise each phase.
2. Confirm the module dependency graph and prohibited import directions.
3. Confirm the project-folder responsibilities already discussed.
4. Map the original 68 UX Pilot experience designs (34 desktop and 34 mobile) and the subsequently added public/authentication references (39 desktop and 35 mobile screen files total) to experiences, routes and frontend features. The design system is the visual source of truth. Confirm that all screens are website designs, not native mobile-app screens.
5. Identify which designs are Release 1 screens and which represent later-release concepts. A screen in the design set does not automatically authorize its full functionality in R1.
6. Confirm which screens share a responsive route and which are distinct route-level workflows.
7. Review the existing `AGENTS.md`, README and architecture documents for consistency with the approved project structure.
8. Decide the testing framework and test commands before writing production logic.
9. Decide the runtime validation library before creating shared runtime schemas.
10. Record required Ricoz approvals and technical dependencies separately from product-owner approvals.
11. Confirm initial profession, English coverage, content scope and any other launch-critical academic specifications before publishing claims that depend on them.
12. Confirm staff operational dependencies: enough eligible people for independent approvals, MFA mechanism, notification channels and initial operational coverage.

## 6.3 Files

| Path | Action | Responsibility |
|---|---|---|
| `scope.md` | Create (this file), then modify as phases are approved | Internal implementation roadmap and file-level plan |
| `AGENTS.md` | Modify only if needed | Repository-wide agent/development rules; include links to the approved scope and no-placeholder rule |
| `docs/architecture/project-structure.md` | Review/modify | Ensure it matches the actual approved project tree |
| `docs/architecture/module-boundaries.md` | Review/modify | Record the 19 module ownership boundaries |
| `docs/architecture/dependency-rules.md` | Review/modify | Record allowed dependencies, public interfaces and forbidden imports |
| `docs/development/local-development.md` | Review/modify | Ensure setup instructions match actual toolchain decisions |
| `docs/decisions/README.md` | Review/modify | Explain how approved/superseded engineering decisions are recorded |
| `docs/design-inventory.md` | Create/modify | Map the paired desktop/mobile designs to proposed experiences/routes/features and identify Release 1 versus later concepts |
| `docs/open-decisions.md` | Create/modify | Group scope decision IDs by owner and implementation gate without inventing approvals |
| `README.md` | Review/modify | Keep project overview, setup entry point and links accurate |

No production source files or test files are required in Phase 0.

## 6.4 Outputs

- Approved phase order.
- Approved design-to-route/feature inventory.
- Approved module dependency graph.
- Reviewed engineering conventions and testing strategy.
- Open-decision register with a blocking/non-blocking classification.
- No invented prices, assessment standards, review SLAs, retention periods or legal claims.

### Phase 0 review package (prepared, approvals pending)

The Phase 0 documentation baseline is prepared in `docs/architecture/project-structure.md`, `docs/architecture/module-boundaries.md`, `docs/architecture/dependency-rules.md`, `docs/design-inventory.md`, `docs/open-decisions.md`, `docs/development/local-development.md` and `docs/decisions/README.md`. The screen/route and module-dependency maps remain proposals except where the product owner has explicitly directed implementation. The added public references now cover the homepage, sign-in, sign-up and institutional enquiry screens; there is no mobile-specific reference for the latter three, so use their desktop designs as the source and adapt responsively. Confirm the 10 Platform Operations design screens against the eight approved functional areas and approve any other proposed URLs/release mappings before implementing those screens.

The repository review package records the observed structure, tooling and unresolved decisions; it does not authorize framework/provider choices or resolve the gates in `docs/open-decisions.md`. The Phase 0 documentation deliverable is in place, while Phase 0 review/approval exit criteria remain pending until the required reviews are recorded. This distinction does not block the explicitly requested Phase 1 public-page implementation.

## 6.5 Exit criteria

- Every phase has been reviewed and approved at the level needed to start it.
- Phase 1 package/tooling choices and company-approval constraints are understood.
- No unresolved decision blocks the first implementation slice.
- The design inventory is available for frontend planning (original paired experience screens plus added public/authentication references, currently 39 desktop and 35 mobile files).

---

# 7. Phase 1: Project/tooling and web foundation

## 7.1 Purpose

Make the existing Next.js project a reliable, consistent development environment and establish the minimal visual foundation for the website. Do not implement business features in this phase.

## 7.2 Implementation order

1. Inspect the generated Next.js project and remove only starter content that will not be used.
2. Confirm package manager and repository scripts.
3. Configure type checking, formatting, linting and build verification.
4. Configure path aliases and shadcn/ui to use the approved source layout.
5. Establish server-safe environment configuration entry points; actual environment validation logic is completed in Phase 2.
6. Apply the approved VocaClin global design tokens and typography.
7. Establish accessible shared layout primitives and the responsive shell required by approved screens.
8. Establish component conventions and add only the primitives needed by the shell.
9. Ensure the app can build and run on desktop and narrow/mobile viewports.

## 7.3 Files to modify

| Path | Responsibility |
|---|---|
| `package.json` | Add reviewed scripts for development, build, start, typecheck, format/lint and tests as tooling is selected; do not add speculative dependencies |
| `pnpm-lock.yaml` | Generated lockfile updates only when dependencies are actually installed/changed |
| `biome.json` | Configure formatting and lint rules consistently |
| `tsconfig.json` | Configure strict TypeScript and agreed path aliases |
| `next.config.ts` | Configure the selected Next.js application settings without deployment-specific assumptions that reduce portability |
| `src/app/layout.tsx` | Root HTML/layout, global stylesheet and metadata foundation |
| `src/app/globals.css` | VocaClin design tokens, responsive base styles, typography and global accessible defaults |
| `src/app/page.tsx` | Public landing page entry using the approved design; detailed content depends on the design inventory |
| `src/components/ui/` | Add shadcn-generated primitives only when required by the approved shell/screens |
| `src/components/shell/` | Add the shared shell components below |
| `README.md` | Update the actual install/dev/check commands after tooling is finalized |

## 7.4 Files to create

| Path | Responsibility |
|---|---|
| `components.json` | shadcn/ui CLI configuration and aliases, if the selected shadcn setup requires it |
| `.env.example` | Names and safe descriptions of required environment variables; never real secrets |
| `src/components/shell/app-brand.tsx` | Shared VocaClin brand mark/name treatment if reused across experiences |
| `src/components/shell/account-menu.tsx` | Shared account-control presentation; authentication behaviour comes later |
| `src/components/shell/experience-shell.tsx` | Shared structural shell with slots/regions for experience-specific navigation |
| `src/components/shell/primary-navigation.tsx` | Desktop primary-navigation structure |
| `src/components/shell/mobile-navigation.tsx` | Responsive mobile navigation behaviour |
| `src/shared/utils/cn.ts` | Class-name composition helper required by shadcn components, if not already provided by the chosen setup |

Only create individual files under `src/components/ui/` when Phase 1 or a later phase first needs them. Initial likely primitives are `button.tsx`, `avatar.tsx`, `dropdown-menu.tsx`, `separator.tsx`, `sheet.tsx`, `tooltip.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`, `radio-group.tsx`, `tabs.tsx`, `table.tsx`, `badge.tsx`, `progress.tsx` and `dialog.tsx`. This is a candidate inventory, not a requirement to install every component immediately.

## 7.5 Tests and verification

| Path | Responsibility |
|---|---|
| `tests/README.md` | Update test commands and test-level ownership once framework is selected |
| `tests/e2e/app-shell.spec.ts` | Verify public entry and shell render at desktop/mobile viewport sizes, if E2E tooling is configured in this phase |
| `tests/unit/shared/cn.test.ts` | Test the class helper only if it contains meaningful logic and is not adequately covered by its use |

Also verify clean install, development server, production build, TypeScript and Biome checks. Do not create a test solely for a trivial library wrapper.

## 7.6 Exit criteria

- A clean dependency install succeeds.
- Build, typecheck, formatting/lint and test commands are defined and usable.
- The VocaClin shell and design tokens render responsively.
- shadcn primitives are integrated using the repository's approved aliases.
- No business logic is implemented in route components or UI components.
- No monorepo `apps/` or `packages/` layout has been introduced.

---

# 8. Phase 2: Server conventions, contracts and composition

## 8.1 Purpose

Establish the small set of cross-cutting server conventions used by all modules: environment validation, server-only boundaries, error representation, request validation and application composition. Do not create a universal framework that every module must use regardless of need.

## 8.2 Implementation order

1. Define server-only environment access and validate required configuration at startup/runtime boundaries.
2. Define the application error categories and safe external error mapping.
3. Use the Phase 2 engineering selection, Zod 4, for runtime validation and inferred contract types.
4. Define the convention for application operations and dependency injection/composition.
5. Define API response/error conventions for versioned Route Handlers.
6. Define the shared contract/schema organization and inference rules.
7. Establish request correlation identifiers and safe structured logging context.
8. Prove the conventions with one small real example rather than generating a library of unused helpers.

## 8.3 Files to create

| Path | Responsibility |
|---|---|
| `src/server/infrastructure/config/env.ts` | Parse/validate server environment variables; never expose secrets to client code |
| `src/server/application/errors/application-error.ts` | Application-level error representation and safe error categories |
| `src/server/application/errors/error-code.ts` | Stable application error codes only when required by actual error mapping |
| `src/server/application/composition/create-application.ts` | Compose real application dependencies; add only once modules have concrete services to wire |
| `src/shared/contracts/common/api-error.ts` | Canonical public API error shape if shared API responses require it |
| `src/shared/schemas/common/api-error.schema.ts` | Runtime schema corresponding to the shared error contract, using the library selected in Phase 0/2 |
| `src/server/infrastructure/observability/logger.ts` | Structured logger entry point with sensitive-data redaction |
| `src/server/infrastructure/observability/request-context.ts` | Request/correlation context only if needed by the selected observability implementation |

## 8.4 Existing files to modify

- `src/shared/contracts/index.ts`: keep minimal or remove the assumption that it is a global registry; do not re-export every contract.
- `src/shared/schemas/index.ts`: same rule; retain only useful intentional exports.
- `src/shared/utils/index.ts`: avoid turning this into a universal dump. Add direct exports only when justified.
- `src/server/infrastructure/observability/index.ts`: expose the real observability entry points when implemented.
- `src/server/README.md`, `src/shared/README.md`: document conventions actually adopted.
- `docs/architecture/dependency-rules.md`: record the agreed composition and import direction.

## 8.5 Tests

- `tests/unit/server/application-error.test.ts`
- `tests/unit/server/env-validation.test.ts`
- `tests/unit/server/api-error-mapping.test.ts`
- Add tests only for behaviour implemented; do not test a schema library's own functionality.

## 8.6 Exit criteria

- Server secrets cannot be imported into browser code through the agreed boundary.
- Invalid required environment configuration fails clearly and safely.
- Internal errors are not leaked as stack traces/secrets in public responses.
- Runtime validation convention is documented and usable.
- Dependency composition does not create circular module imports.
- Shared contracts are organized by capability/operation rather than giant global files.

---

# 9. Phase 3: MongoDB and persistence foundation

## 9.1 Purpose

Implement the shared MongoDB connection and lifecycle, database access conventions, migrations, indexes and real database test support. Domain-specific repositories are added in the phase that introduces their first actual collection.

## 9.2 Implementation order

1. Confirm the managed/local MongoDB connection options and environment variables.
2. Implement one reusable MongoDB client lifecycle with safe connection reuse.
3. Expose a database handle without exposing the client throughout domain code.
4. Define migration conventions and migration execution.
5. Define how module-owned collections, validators and indexes are registered/created.
6. Establish typed repository conventions using the official MongoDB Node.js Driver.
7. Establish test database setup and cleanup.
8. Verify uniqueness constraints, transaction support where required, migration repeatability and recovery behaviour.

## 9.3 Files to create

| Path | Responsibility |
|---|---|
| `src/server/infrastructure/persistence/mongodb/client.ts` | Create/reuse the MongoDB client and manage connection lifecycle |
| `src/server/infrastructure/persistence/mongodb/database.ts` | Provide the configured database handle |
| `src/server/infrastructure/persistence/mongodb/migration.ts` | Migration metadata/type and execution contract, only if needed by the chosen migration runner |
| `src/server/infrastructure/persistence/mongodb/migration-runner.ts` | Discover/apply versioned migrations with recorded execution state |
| `src/server/infrastructure/persistence/mongodb/index.ts` | Export only the actual shared database facilities |
| `tests/helpers/mongodb-test-database.ts` | Create/connect/clean isolated test database resources |
| `tests/database-integration/migrations/migration-runner.test.ts` | Verify migration ordering, repeatability and failure handling |

Module-owned indexes, validators and migrations must be located under the respective module's `infrastructure/persistence/mongodb/` area when that module first introduces its collection. Do not create nineteen empty migration directories.

## 9.4 Files to modify

- `src/server/infrastructure/persistence/mongodb/index.ts` (existing placeholder).
- `src/server/README.md` and `docs/development/local-development.md` for connection/setup instructions.
- `package.json` for migration/test scripts once the runner is selected.
- `.env.example` for database variable names only.

## 9.5 Tests

- `tests/database-integration/mongodb-connection.test.ts`
- `tests/database-integration/migrations/migration-runner.test.ts`
- `tests/helpers/mongodb-test-database.ts`
- Add a real module repository integration test alongside the first repository in the later phase; do not create a generic fake repository test suite now.

## 9.6 Exit criteria

- Database connection lifecycle is reusable and safe for the selected runtime.
- Domain/application code does not create its own MongoDB client.
- Versioned migration execution is repeatable and failure-aware.
- Index and validator creation can be owned by the module adding the data.
- Test data is isolated from production data and credentials.
- The official Node.js Driver is accessed through typed, module-owned repository implementations.

# 10. Phase 4: Identity, authorization and audit core

## 10.1 Purpose

Implement the internal identity foundation and the minimum staff governance/audit controls before protected personal, institutional and administrative workflows are built.

This phase establishes the initial core of `identity-access`, `platform-operations` and `audit-oversight`. Their remaining user-facing and operational capabilities are completed later.

## 10.2 Implementation order

1. Define internal user and external authentication identity domain concepts.
2. Define repository ports owned by `identity-access`.
3. Implement MongoDB persistence and unique identity mapping constraints.
4. Implement the Clerk adapter behind the authentication-provider port.
5. Verify Clerk webhook signatures and handle events idempotently.
6. Implement internal user provisioning/resolution and limited profile synchronization.
7. Implement authenticated actor resolution.
8. Establish authorization context and the staff-policy provider inversion boundary.
9. Implement the first staff identity/role/permission model and current permission evaluation.
10. Implement append-only audit recording before enabling consequential operations.
11. Decide and implement the audit integrity and storage-access separation mechanism; do not claim a normal MongoDB collection is inherently tamper-proof.
12. Establish staff MFA enforcement, session revocation and reauthentication rules through the selected Clerk capabilities. Exact timeout and MFA recovery implementation remain gated by open specifications.
13. Add the sign-in/sign-up experience and protected-route checks.

## 10.3 `identity-access` files

| Path | Responsibility |
|---|---|
| `src/server/modules/identity-access/domain/user/user.ts` | Internal VocaClin user identity and invariants |
| `src/server/modules/identity-access/domain/user/user-status.ts` | Account status and permitted transitions |
| `src/server/modules/identity-access/domain/auth-identity/auth-identity.ts` | Internal user to external provider identity mapping |
| `src/server/modules/identity-access/domain/errors/identity-error.ts` | Identity-specific domain failures |
| `src/server/modules/identity-access/application/identity/ensure-internal-user.ts` | Idempotently create or retrieve the internal user for a verified identity |
| `src/server/modules/identity-access/application/identity/resolve-authenticated-actor.ts` | Resolve authenticated provider identity to internal actor context |
| `src/server/modules/identity-access/application/identity/synchronize-identity-profile.ts` | Synchronize only the approved minimal external identity projection |
| `src/server/modules/identity-access/ports/user-repository.ts` | User persistence contract |
| `src/server/modules/identity-access/ports/auth-identity-repository.ts` | External identity mapping persistence contract |
| `src/server/modules/identity-access/ports/authentication-provider.ts` | Provider-neutral authentication/session capability needed by the module |
| `src/server/modules/identity-access/ports/access-policy-provider.ts` | Inverted policy-provider boundary for staff and other policy domains |
| `src/server/modules/identity-access/infrastructure/persistence/mongodb/user-mongo-repository.ts` | MongoDB implementation of user repository |
| `src/server/modules/identity-access/infrastructure/persistence/mongodb/auth-identity-mongo-repository.ts` | MongoDB implementation of external identity mapping repository |
| `src/server/modules/identity-access/infrastructure/persistence/mongodb/mappers/user-mapper.ts` | Convert persisted user document to/from domain representation |
| `src/server/modules/identity-access/infrastructure/persistence/mongodb/mappers/auth-identity-mapper.ts` | Convert identity mapping document to/from domain representation |
| `src/server/modules/identity-access/index.ts` | Export deliberate public identity/actor operations and types |

## 10.4 Clerk integration files

| Path | Responsibility |
|---|---|
| `src/server/infrastructure/integrations/clerk/clerk-authentication-provider.ts` | Clerk adapter implementing the identity-owned provider port |
| `src/server/infrastructure/integrations/clerk/clerk-webhook-verifier.ts` | Verify provider webhook authenticity |
| `src/server/infrastructure/integrations/clerk/clerk-webhook-handler.ts` | Translate verified provider events into identity application operations; idempotent handling |
| `src/server/infrastructure/integrations/clerk/index.ts` | Export implemented Clerk integration capabilities |
| `src/app/api/v1/webhooks/clerk/route.ts` | Clerk webhook HTTP entry point; delegates to the verified adapter/application workflow |

Authentication UI route paths must follow the Phase 0 design/route inventory and the actual Clerk integration. Do not create duplicate auth pages or implement custom credential storage.

## 10.5 Initial staff governance files

| Path | Responsibility |
|---|---|
| `src/server/modules/platform-operations/domain/staff-governance/staff-member.ts` | Staff membership/status linked to internal user ID |
| `src/server/modules/platform-operations/domain/staff-governance/staff-role.ts` | Seven approved role identifiers and role assignment rules |
| `src/server/modules/platform-operations/domain/staff-governance/effective-permissions.ts` | Pure permission composition: role permissions + grants - restrictions, with safeguards |
| `src/server/modules/platform-operations/application/staff/activate-staff-member.ts` | Controlled staff activation |
| `src/server/modules/platform-operations/application/staff/assign-staff-role.ts` | Assign/remove approved staff roles under authority checks |
| `src/server/modules/platform-operations/application/staff/grant-staff-permission.ts` | Create a documented scoped individual permission grant |
| `src/server/modules/platform-operations/application/staff/restrict-staff-permission.ts` | Add an overriding individual restriction |
| `src/server/modules/platform-operations/ports/staff-repository.ts` | Staff governance persistence port |
| `src/server/modules/platform-operations/ports/staff-permission-policy.ts` | Staff permission policy provider contract/implementation boundary |
| `src/server/modules/platform-operations/infrastructure/authorization/staff-access-policy-provider.ts` | Implements the identity-access policy-provider port using current staff role/grant/restriction state |
| `src/server/modules/platform-operations/infrastructure/persistence/mongodb/staff-mongo-repository.ts` | Persist staff identity/status and role relationships |
| `src/server/modules/platform-operations/infrastructure/persistence/mongodb/staff-permission-mongo-repository.ts` | Persist individual grants/restrictions if a separate lifecycle is required |
| `src/server/modules/platform-operations/index.ts` | Export approved staff governance operations and the policy provider |

The exact default role-permission contents must follow the approved Appendix D matrix. Do not invent permissions. Do not allow self-modification outside authorized governance.

## 10.6 Initial audit files

| Path | Responsibility |
|---|---|
| `src/server/modules/audit-oversight/domain/audit-record/audit-record.ts` | Required actor/action/resource/time/outcome/reason/approval attribution |
| `src/server/modules/audit-oversight/application/recording/append-audit-record.ts` | Validate and append an audit record |
| `src/server/modules/audit-oversight/ports/audit-record-repository.ts` | Append/query port with no ordinary update/delete operation |
| `src/server/modules/audit-oversight/ports/audit-integrity-verifier.ts` | Integrity verification contract |
| `src/server/modules/audit-oversight/infrastructure/persistence/mongodb/audit-record-mongo-repository.ts` | MongoDB persistence under separated audit storage permissions |
| `src/server/modules/audit-oversight/infrastructure/persistence/mongodb/mappers/audit-record-mapper.ts` | Persisted record mapping |
| `src/server/modules/audit-oversight/infrastructure/integrity/audit-integrity-verifier.ts` | Selected tamper-evidence verification implementation; exact mechanism approved in this phase |
| `src/server/modules/audit-oversight/index.ts` | Expose append and authorized read capabilities |

Audit write authority, read-only Auditor authority and database/operator permissions must be separated as far as the selected hosting/runtime permits. Critical action failure behaviour must be implemented before high-impact actions are exposed.

## 10.7 Frontend and API files

- Add staff sign-in route and staff access denial/verification states according to the approved design inventory.
- Add `src/app/(admin)/admin/layout.tsx` only when the protected staff shell is ready.
- Add the initial personal sign-in/sign-up routes according to the approved route map.
- Add API/webhook routes only for actual external integration requirements; do not create Route Handlers for every application operation.

## 10.8 Tests

- `tests/unit/identity-access/user.test.ts`
- `tests/unit/identity-access/auth-identity.test.ts`
- `tests/unit/platform-operations/effective-permissions.test.ts`
- `tests/unit/audit-oversight/audit-record.test.ts`
- `tests/module-integration/identity-access/internal-user-provisioning.test.ts`
- `tests/module-integration/identity-access/clerk-webhook-idempotency.test.ts`
- `tests/module-integration/platform-operations/staff-authorization-provider.test.ts`
- `tests/database-integration/identity-access/identity-repositories.test.ts`
- `tests/database-integration/audit-oversight/audit-append-and-integrity.test.ts`
- `tests/api-contract/clerk-webhook.test.ts`
- `tests/e2e/authentication/internal-identity.spec.ts`
- `tests/e2e/platform-operations/staff-authentication.spec.ts`

## 10.9 Exit criteria

- One verified external identity maps to exactly one internal VocaClin user.
- Duplicate/concurrent provisioning cannot create duplicate internal identities.
- Webhook authenticity is verified and webhook handling is idempotent.
- Authentication and authorization are separate.
- Staff permission evaluation uses current grants/restrictions and expiry.
- MFA policy is enforced for staff using the approved provider capability.
- Audit records are append-only and integrity-verifiable with separated access.
- Critical audited actions fail safely when durable audit recording fails.
- No protected route relies only on hidden navigation controls.

---

# 11. Phase 5: Profiles, consent, reference data and learning goals

## 11.1 Purpose

Complete the first personal workflow on top of authenticated internal identity: profile and preferences, privacy/consent, canonical reference data and independent learning goals.

## 11.2 Implementation order

1. Implement controlled reference data needed to create a learning goal: languages, countries/destinations, professions, specialties, CEFR levels, language skills and external examination frameworks. Competencies remain owned by `progress-competencies` and are introduced in Phase 9.
2. Implement profile and preferences.
3. Implement consent record and withdrawal behaviour for data categories actually collected.
4. Implement learning-goal domain invariants and ownership.
5. Implement repositories and indexes.
6. Implement application operations for create/list/retrieve/update/archive.
7. Implement shared request/response contracts and runtime validation for the operations that cross boundaries.
8. Implement Server Actions for interactive UI mutations and Route Handlers only where a client/external API is required.
9. Implement goal selection and management UI.
10. Verify goal independence and record preservation.

## 11.3 `curriculum` reference data files

| Path | Responsibility |
|---|---|
| `src/server/modules/curriculum/domain/reference-data/reference-item.ts` | Stable controlled reference item and lifecycle |
| `src/server/modules/curriculum/application/reference-data/list-reference-items.ts` | Retrieve supported reference items by category |
| `src/server/modules/curriculum/application/reference-data/get-reference-item.ts` | Retrieve/validate a referenced item where a use case needs it |
| `src/server/modules/curriculum/ports/reference-data-repository.ts` | Canonical reference-data read/persistence contract |
| `src/server/modules/curriculum/infrastructure/persistence/mongodb/reference-data-mongo-repository.ts` | MongoDB reference data repository |
| `src/server/modules/curriculum/infrastructure/persistence/mongodb/seed-reference-data.ts` | Seed only approved launch reference values; no invented profession/destination list |
| `src/server/modules/curriculum/index.ts` | Export the narrow reference-data reader operations |

## 11.4 `learner-profile-goals` files

| Path | Responsibility |
|---|---|
| `src/server/modules/learner-profile-goals/domain/profile/profile.ts` | Editable VocaClin personal profile |
| `src/server/modules/learner-profile-goals/domain/preferences/user-preferences.ts` | Interface language and notification preferences |
| `src/server/modules/learner-profile-goals/domain/consent/consent-record.ts` | Purpose/data-category consent decision and history |
| `src/server/modules/learner-profile-goals/domain/learning-goal/learning-goal.ts` | Independent goal dimensions, state and invariants |
| `src/server/modules/learner-profile-goals/application/profile/get-profile.ts` | Retrieve current profile |
| `src/server/modules/learner-profile-goals/application/profile/update-profile.ts` | Update editable profile fields |
| `src/server/modules/learner-profile-goals/application/preferences/get-preferences.ts` | Retrieve preferences |
| `src/server/modules/learner-profile-goals/application/preferences/update-preferences.ts` | Update preferences |
| `src/server/modules/learner-profile-goals/application/consent/record-consent.ts` | Record a consent decision for an actual processing purpose |
| `src/server/modules/learner-profile-goals/application/consent/withdraw-consent.ts` | Record withdrawal and enforce it for subsequent optional processing |
| `src/server/modules/learner-profile-goals/application/consent/get-consent-history.ts` | Retrieve consent history |
| `src/server/modules/learner-profile-goals/application/learning-goals/create-learning-goal.ts` | Create a goal after reference validation |
| `src/server/modules/learner-profile-goals/application/learning-goals/list-learning-goals.ts` | List goals owned by the authenticated user |
| `src/server/modules/learner-profile-goals/application/learning-goals/get-learning-goal.ts` | Retrieve one owned goal |
| `src/server/modules/learner-profile-goals/application/learning-goals/update-learning-goal.ts` | Update a goal without reassigning old evidence |
| `src/server/modules/learner-profile-goals/application/learning-goals/archive-learning-goal.ts` | Archive without deleting evidence |
| `src/server/modules/learner-profile-goals/ports/profile-repository.ts` | Profile persistence port |
| `src/server/modules/learner-profile-goals/ports/preferences-repository.ts` | Preferences persistence port |
| `src/server/modules/learner-profile-goals/ports/consent-repository.ts` | Consent persistence port |
| `src/server/modules/learner-profile-goals/ports/learning-goal-repository.ts` | Goal persistence port |
| `src/server/modules/learner-profile-goals/ports/reference-data-reader.ts` | Read canonical curriculum reference data without accessing its collections |
| `src/server/modules/learner-profile-goals/infrastructure/persistence/mongodb/profile-mongo-repository.ts` | Profile repository implementation |
| `src/server/modules/learner-profile-goals/infrastructure/persistence/mongodb/preferences-mongo-repository.ts` | Preferences repository implementation; may be embedded with profile if access/lifecycle justify it |
| `src/server/modules/learner-profile-goals/infrastructure/persistence/mongodb/consent-mongo-repository.ts` | Append/history-aware consent persistence |
| `src/server/modules/learner-profile-goals/infrastructure/persistence/mongodb/learning-goal-mongo-repository.ts` | Goal persistence with owner-scoped queries |
| `src/server/modules/learner-profile-goals/index.ts` | Export profile, preferences, consent and goal operations/types |

The preferences collection is not mandatory. The final model may embed small preferences in the one-user profile document if the access/update lifecycle supports it. Do not create a separate collection without justification.

## 11.5 Contracts, server actions, routes and frontend files

Contracts (create only the operations exposed to a real client boundary):

- `src/shared/contracts/learner-profile-goals/create-learning-goal.ts`
- `src/shared/contracts/learner-profile-goals/update-learning-goal.ts`
- `src/shared/contracts/learner-profile-goals/learning-goal-response.ts`
- `src/shared/contracts/learner-profile-goals/profile-response.ts`
- `src/shared/contracts/learner-profile-goals/consent-update.ts`
- Matching runtime schemas under `src/shared/schemas/learner-profile-goals/` using the approved schema library.

Server Actions:

- `src/server/actions/learner-profile-goals/create-learning-goal.ts`
- `src/server/actions/learner-profile-goals/update-learning-goal.ts`
- `src/server/actions/learner-profile-goals/archive-learning-goal.ts`
- `src/server/actions/learner-profile-goals/update-profile.ts`
- `src/server/actions/learner-profile-goals/update-consent.ts`

Use Server Actions for the UI where appropriate. Add REST handlers only where there is a real API consumer; do not create duplicate routes solely to mirror each action.

Frontend:

- `src/features/profile/components/profile-form.tsx`
- `src/features/profile/components/preferences-form.tsx`
- `src/features/profile/components/consent-settings.tsx`
- `src/features/learning-goals/components/learning-goal-form.tsx`
- `src/features/learning-goals/components/learning-goal-card.tsx`
- `src/features/learning-goals/components/learning-goal-list.tsx`
- `src/features/learning-goals/components/learning-goal-selector.tsx`
- `src/features/learning-goals/types/learning-goal-view-model.ts` (only if a frontend-specific shape is genuinely needed)
- `src/app/(learner)/learn/goals/page.tsx`
- `src/app/(learner)/learn/goals/new/page.tsx`
- `src/app/(learner)/learn/goals/[goalId]/page.tsx`
- `src/app/(learner)/learn/profile/page.tsx`

Route details and page titles must match the Phase 0 UX design inventory. Existing route groups are retained.

## 11.6 Tests

- `tests/unit/learner-profile-goals/learning-goal.test.ts`
- `tests/unit/learner-profile-goals/consent-record.test.ts`
- `tests/module-integration/learner-profile-goals/create-learning-goal.test.ts`
- `tests/module-integration/learner-profile-goals/goal-independence.test.ts`
- `tests/database-integration/learner-profile-goals/profile-and-goal-repositories.test.ts`
- `tests/database-integration/curriculum/reference-data-repository.test.ts`
- `tests/api-contract/learner-profile-goals/learning-goal-contract.test.ts` (if REST/client contract is used)
- `tests/e2e/learner/learning-goal-management.spec.ts`
- `tests/e2e/learner/profile-and-consent.spec.ts`

## 11.7 Exit criteria

- An authenticated person has one internal user identity and one personal profile.
- Controlled references are used instead of free-text classification for supported catalog values.
- A learner can create multiple goals with independent IDs and contexts.
- Updating/archiving one goal does not alter another goal or erase evidence.
- Consent is recorded and optional consent can be withdrawn.
- Ownership is enforced on every profile/goal operation.
- Responsive goal/profile screens work against persisted records.

# 12. Phase 6: Organizations and commercial foundation

## 12.1 Purpose

Implement the organization side of the shared platform foundation: organizations, memberships, invitations, roles, cohorts, cohort enrolments, assignments and entitlement resolution. Do not build the complete institutional course-authoring platform or payment checkout.

## 12.2 Implementation order

1. Implement organization identity, profile and lifecycle.
2. Implement memberships keyed by internal user ID and organization ID.
3. Implement invitation lifecycle and secure acceptance.
4. Implement the six approved organization roles and permission evaluation.
5. Implement cohorts and separate cohort-membership relationships.
6. Implement course/examination assignment records that reference owned resources rather than copying them.
7. Implement commercial entitlement policies and grants.
8. Implement personal/institution entitlement resolution and overlap rules.
9. Implement capacity checks using organization membership data and concurrency protection.
10. Integrate assignment notifications using the email adapter (provider decision remains open).
11. Implement first institution routes/screens for setup and member management according to UX designs.

## 12.3 `organizations` files

Domain:

- `src/server/modules/organizations/domain/organization/organization.ts`
- `src/server/modules/organizations/domain/membership/membership.ts`
- `src/server/modules/organizations/domain/membership/organization-role.ts`
- `src/server/modules/organizations/domain/invitation/organization-invitation.ts`
- `src/server/modules/organizations/domain/cohort/cohort.ts`
- `src/server/modules/organizations/domain/cohort/cohort-membership.ts`
- `src/server/modules/organizations/domain/assignment/organization-assignment.ts`

Application:

- `src/server/modules/organizations/application/organizations/register-organization.ts`
- `src/server/modules/organizations/application/organizations/get-organization.ts`
- `src/server/modules/organizations/application/organizations/update-organization.ts`
- `src/server/modules/organizations/application/memberships/invite-member.ts`
- `src/server/modules/organizations/application/memberships/accept-invitation.ts`
- `src/server/modules/organizations/application/memberships/change-member-roles.ts`
- `src/server/modules/organizations/application/memberships/remove-member.ts`
- `src/server/modules/organizations/application/memberships/list-members.ts`
- `src/server/modules/organizations/application/cohorts/create-cohort.ts`
- `src/server/modules/organizations/application/cohorts/update-cohort.ts`
- `src/server/modules/organizations/application/cohorts/manage-cohort-membership.ts`
- `src/server/modules/organizations/application/assignments/create-assignment.ts`
- `src/server/modules/organizations/application/assignments/update-assignment.ts`
- `src/server/modules/organizations/application/assignments/list-assignments.ts`

Ports:

- `src/server/modules/organizations/ports/organization-repository.ts`
- `src/server/modules/organizations/ports/membership-repository.ts`
- `src/server/modules/organizations/ports/invitation-repository.ts`
- `src/server/modules/organizations/ports/cohort-repository.ts`
- `src/server/modules/organizations/ports/cohort-membership-repository.ts`
- `src/server/modules/organizations/ports/assignment-repository.ts`
- `src/server/modules/organizations/ports/user-identity-reader.ts`
- `src/server/modules/organizations/ports/assignment-resource-reader.ts`
- `src/server/modules/organizations/ports/entitlement-checker.ts`

Infrastructure:

- `src/server/modules/organizations/infrastructure/persistence/mongodb/organization-mongo-repository.ts`
- `src/server/modules/organizations/infrastructure/persistence/mongodb/membership-mongo-repository.ts`
- `src/server/modules/organizations/infrastructure/persistence/mongodb/invitation-mongo-repository.ts`
- `src/server/modules/organizations/infrastructure/persistence/mongodb/cohort-mongo-repository.ts`
- `src/server/modules/organizations/infrastructure/persistence/mongodb/cohort-membership-mongo-repository.ts`
- `src/server/modules/organizations/infrastructure/persistence/mongodb/assignment-mongo-repository.ts`

## 12.4 `commercial` files

- `src/server/modules/commercial/domain/entitlement-policy/entitlement-policy.ts`
- `src/server/modules/commercial/domain/entitlement-grant/entitlement-grant.ts`
- `src/server/modules/commercial/domain/entitlement-usage/entitlement-usage.ts` (only when an R1 plan has a real usage limit)
- `src/server/modules/commercial/application/policies/get-entitlement-policy.ts`
- `src/server/modules/commercial/application/entitlements/grant-entitlement.ts`
- `src/server/modules/commercial/application/entitlements/revoke-entitlement.ts`
- `src/server/modules/commercial/application/access/evaluate-entitlement.ts`
- `src/server/modules/commercial/application/access/check-institution-capacity.ts`
- `src/server/modules/commercial/ports/entitlement-policy-repository.ts`
- `src/server/modules/commercial/ports/entitlement-grant-repository.ts`
- `src/server/modules/commercial/ports/capacity-usage-reader.ts`
- `src/server/modules/commercial/infrastructure/persistence/mongodb/entitlement-policy-mongo-repository.ts`
- `src/server/modules/commercial/infrastructure/persistence/mongodb/entitlement-grant-mongo-repository.ts`

Do not implement payment transactions, checkout, invoices, refunds or provider webhooks until payment provider and company billing decisions are approved.

## 12.5 Contracts, routes, actions and frontend files

Contracts:

- `src/shared/contracts/organizations/create-organization.ts`
- `src/shared/contracts/organizations/invite-member.ts`
- `src/shared/contracts/organizations/accept-invitation.ts`
- `src/shared/contracts/organizations/update-member-roles.ts`
- `src/shared/contracts/organizations/create-cohort.ts`
- `src/shared/contracts/organizations/create-assignment.ts`
- `src/shared/contracts/commercial/entitlement-decision.ts`
- Add corresponding runtime schemas only where input crosses an untrusted/client boundary.

Server Actions:

- `src/server/actions/organizations/create-organization.ts`
- `src/server/actions/organizations/invite-member.ts`
- `src/server/actions/organizations/manage-membership.ts`
- `src/server/actions/organizations/manage-cohort.ts`
- `src/server/actions/organizations/create-assignment.ts`

Frontend:

- `src/features/organizations/components/organization-form.tsx`
- `src/features/organizations/components/organization-switcher.tsx`
- `src/features/organizations/components/member-list.tsx`
- `src/features/organizations/components/member-invitation-form.tsx`
- `src/features/organizations/components/role-assignment-control.tsx`
- `src/features/organizations/components/cohort-list.tsx`
- `src/features/organizations/components/cohort-form.tsx`
- `src/features/organizations/components/assignment-form.tsx`
- `src/features/organizations/types/organization-view-model.ts` (if needed)
- `src/app/(institution)/institution/page.tsx`
- `src/app/(institution)/institution/organizations/new/page.tsx`
- `src/app/(institution)/institution/members/page.tsx`
- `src/app/(institution)/institution/cohorts/page.tsx`
- `src/app/(institution)/institution/assignments/page.tsx`

Add or adjust route files to match the Phase 0 design inventory. Avoid duplicate page implementations for mobile; the same website route must respond at mobile breakpoints.

## 12.6 Tests

- `tests/unit/organizations/membership-permissions.test.ts`
- `tests/unit/organizations/invitation-lifecycle.test.ts`
- `tests/unit/commercial/entitlement-resolution.test.ts`
- `tests/module-integration/organizations/invitation-and-membership.test.ts`
- `tests/module-integration/organizations/entitlement-capacity.test.ts`
- `tests/database-integration/organizations/organization-repositories.test.ts`
- `tests/database-integration/organizations/tenant-isolation.test.ts`
- `tests/e2e/institution/organization-members-and-cohorts.spec.ts`

## 12.7 Exit criteria

- One user can have several organization memberships without identity duplication.
- Organization roles are distinct from platform staff roles.
- All organization queries and writes enforce tenant context.
- Invitation acceptance is secure and idempotent.
- Cohort relationships support multiple cohorts per learner.
- Assignments reference resources and preserve their source/ownership.
- Personal and institution entitlements remain independent.
- Capacity checks cannot be bypassed through concurrent requests.
- No payment provider or pricing assumptions have been implemented.

---

# 13. Phase 7: Governance, curriculum and media

## 13.1 Purpose

Implement the trusted educational-content foundation: ownership and licensing metadata, review and publication governance, controlled curriculum hierarchy, immutable published content references and the media lifecycle required by learning content.

## 13.2 Implementation order

1. Implement the common content registry and source/owner references.
2. Implement rights and permission records without inventing legal licence wording.
3. Implement content review records and content-type-specific review dimensions.
4. Implement approval/publication eligibility and publication state transitions.
5. Integrate exact type-specific version references; do not move payload/version ownership into governance.
6. Implement curriculum hierarchy and associations to published content versions.
7. Implement curriculum selection by language/profession/specialty/level using approved controlled references.
8. Implement secure upload metadata and object-storage adapter.
9. Implement temporary upload URL, validation, quarantine, processing and controlled delivery.
10. Add worker processing only for real media jobs. Queue/provider choice is subject to company approval.
11. Build platform editorial screens for the approved R1 content lifecycle.

## 13.3 `governance` files

Domain:

- `src/server/modules/governance/domain/content-record/content-record.ts`
- `src/server/modules/governance/domain/ownership-rights/content-rights.ts`
- `src/server/modules/governance/domain/review/content-review.ts`
- `src/server/modules/governance/domain/publication/publication-decision.ts`

Application:

- `src/server/modules/governance/application/content/register-content-record.ts`
- `src/server/modules/governance/application/content/get-content-governance.ts`
- `src/server/modules/governance/application/rights/record-content-permission.ts`
- `src/server/modules/governance/application/review/start-content-review.ts`
- `src/server/modules/governance/application/review/record-review-decision.ts`
- `src/server/modules/governance/application/publication/check-publication-eligibility.ts`
- `src/server/modules/governance/application/publication/publish-content-version.ts`
- `src/server/modules/governance/application/publication/unpublish-content.ts`
- `src/server/modules/governance/application/publication/retire-content.ts`

Ports/infrastructure:

- `src/server/modules/governance/ports/content-registry-repository.ts`
- `src/server/modules/governance/ports/content-review-repository.ts`
- `src/server/modules/governance/ports/content-version-reader.ts`
- `src/server/modules/governance/ports/content-access-policy.ts`
- `src/server/modules/governance/infrastructure/persistence/mongodb/content-registry-mongo-repository.ts`
- `src/server/modules/governance/infrastructure/persistence/mongodb/content-review-mongo-repository.ts`
- `src/server/modules/governance/infrastructure/persistence/mongodb/content-permission-mongo-repository.ts`

The `contentPermissions` persistence implementation is conditional on the approved rights-record lifecycle. Do not create duplicate rights fields in every content module.

## 13.4 `curriculum` files

- `src/server/modules/curriculum/domain/curriculum/curriculum.ts`
- `src/server/modules/curriculum/domain/curriculum/curriculum-node.ts`
- `src/server/modules/curriculum/domain/curriculum/published-content-reference.ts`
- `src/server/modules/curriculum/application/curriculum/create-curriculum.ts`
- `src/server/modules/curriculum/application/curriculum/get-curriculum.ts`
- `src/server/modules/curriculum/application/curriculum/update-curriculum-structure.ts`
- `src/server/modules/curriculum/application/curriculum/list-available-curricula.ts`
- `src/server/modules/curriculum/ports/curriculum-repository.ts`
- `src/server/modules/curriculum/ports/published-content-reader.ts`
- `src/server/modules/curriculum/infrastructure/persistence/mongodb/curriculum-mongo-repository.ts`
- `src/server/modules/curriculum/infrastructure/persistence/mongodb/curriculum-node-mongo-repository.ts` (only if nodes are separately persisted)

## 13.5 Media infrastructure and worker files

- `src/server/infrastructure/integrations/object-storage/object-storage-provider.ts`
- `src/server/infrastructure/integrations/object-storage/create-upload-url.ts`
- `src/server/infrastructure/integrations/object-storage/create-download-url.ts`
- `src/server/infrastructure/integrations/object-storage/index.ts`
- `src/server/infrastructure/persistence/mongodb/media-metadata-mongo-repository.ts` (only if a shared metadata capability is justified; ownership and access policy stay with the relevant domain)
- `src/worker/index.ts` (modify to become a real independently startable process when worker technology is approved)
- `src/worker/bootstrap.ts`
- `src/worker/jobs/media/process-upload.ts`
- `src/worker/handlers/media/process-upload-handler.ts`

The exact queue adapter/connection files depend on the approved queue technology. BullMQ + managed Redis is a candidate, not a confirmed decision. Do not create a fake queue implementation. Add quarantine and evidence-file access controls as separate policies; Trust & Safety evidence must not share ordinary public media delivery.

## 13.6 Frontend files

- `src/features/curriculum/components/curriculum-tree.tsx`
- `src/features/curriculum/components/curriculum-node-form.tsx`
- `src/features/content-governance/components/content-review-panel.tsx`
- `src/features/content-governance/components/publication-status.tsx`
- `src/features/content-governance/components/content-version-history.tsx`
- `src/server/actions/governance/submit-content-for-review.ts`
- `src/server/actions/governance/record-review-decision.ts`
- `src/server/actions/governance/publish-content.ts`
- `src/app/(admin)/admin/content/page.tsx`
- `src/app/(admin)/admin/curriculum/page.tsx`

Only include authoring/review screens present in the approved UX inventory. Institution-created full course authoring remains R2.

## 13.7 Tests

- `tests/unit/governance/content-rights.test.ts`
- `tests/unit/governance/publication-lifecycle.test.ts`
- `tests/unit/curriculum/curriculum-hierarchy.test.ts`
- `tests/module-integration/governance/publish-content-version.test.ts`
- `tests/module-integration/curriculum/published-content-reference.test.ts`
- `tests/database-integration/governance/content-governance-repositories.test.ts`
- `tests/database-integration/curriculum/curriculum-repositories.test.ts`
- `tests/e2e/platform-operations/platform-content-lifecycle.spec.ts`
- `tests/module-integration/media/secure-upload-lifecycle.test.ts`

## 13.8 Exit criteria

- Platform-owned content follows draft/review/approval/publication lifecycle.
- Owner and permitted-use information are preserved without assuming legal wording.
- Published versions cannot be silently edited in place.
- Curriculum nodes reference the appropriate published content version.
- Historical curriculum use can be reconstructed.
- Content modules retain their own content payloads and versions.
- Media is private by default and follows authorized temporary upload, validation, quarantine and processing.
- Background media processing is durable/idempotent under the selected approved worker/queue setup.

---

# 14. Phase 8: Learning delivery and activities

## 14.1 Purpose

Implement the actual learner experience of enrolling in an eligible learning programme, accessing published content, completing activities, preserving responses and resuming interrupted work.

## 14.2 Implementation order

1. Define learning enrolment and its relationship to the internal user, learning goal, curriculum/content version and optional organization assignment.
2. Implement enrolment creation/eligibility checks through organizations and commercial ports.
3. Implement published curriculum/content retrieval through public module operations.
4. Define the extensible activity representation and type-specific payloads for R1 activity types.
5. Implement activity attempt lifecycle and response persistence.
6. Implement save/resume/complete behaviour with idempotency and concurrency handling.
7. Implement course/lesson navigation and activity delivery.
8. Implement audio/video playback using authorized media delivery.
9. Implement healthcare communication practice scenarios that do not provide diagnosis or treatment decisions.
10. Connect activity completion to progress evidence in Phase 9; do not calculate proficiency inside learning.

## 14.3 `learning` files

Domain:

- `src/server/modules/learning/domain/enrolment/learning-enrolment.ts`
- `src/server/modules/learning/domain/activity/learning-activity.ts`
- `src/server/modules/learning/domain/activity/activity-content.ts`
- `src/server/modules/learning/domain/activity/activity-attempt.ts`
- `src/server/modules/learning/domain/activity/activity-response.ts`

The activity payload should be type-specific/discriminated. Do not create one huge generic object with irrelevant optional fields for every activity.

Application:

- `src/server/modules/learning/application/enrolment/enrol-in-learning-resource.ts`
- `src/server/modules/learning/application/delivery/get-learning-content.ts`
- `src/server/modules/learning/application/activity/start-activity-attempt.ts`
- `src/server/modules/learning/application/activity/save-activity-response.ts`
- `src/server/modules/learning/application/activity/resume-activity-attempt.ts`
- `src/server/modules/learning/application/activity/complete-activity-attempt.ts`
- `src/server/modules/learning/application/activity/get-learning-history.ts`

Ports:

- `src/server/modules/learning/ports/learning-repository.ts`
- `src/server/modules/learning/ports/activity-attempt-repository.ts`
- `src/server/modules/learning/ports/curriculum-reader.ts`
- `src/server/modules/learning/ports/learning-goal-reader.ts`
- `src/server/modules/learning/ports/assignment-reader.ts`
- `src/server/modules/learning/ports/entitlement-checker.ts`

Infrastructure:

- `src/server/modules/learning/infrastructure/persistence/mongodb/learning-enrolment-mongo-repository.ts`
- `src/server/modules/learning/infrastructure/persistence/mongodb/activity-attempt-mongo-repository.ts`

Add a separate response collection only if response size, concurrency or lifecycle requires it. Keep bounded activity response state within the attempt where appropriate.

## 14.4 Contracts, actions and frontend files

Contracts:

- `src/shared/contracts/learning/start-activity-attempt.ts`
- `src/shared/contracts/learning/save-activity-response.ts`
- `src/shared/contracts/learning/complete-activity-attempt.ts`
- `src/shared/contracts/learning/activity-delivery.ts`

Server Actions:

- `src/server/actions/learning/start-activity.ts`
- `src/server/actions/learning/save-activity-response.ts`
- `src/server/actions/learning/complete-activity.ts`

Frontend:

- `src/features/learning/components/course-overview.tsx`
- `src/features/learning/components/lesson-viewer.tsx`
- `src/features/learning/components/activity-renderer.tsx`
- `src/features/learning/components/activity-navigation.tsx`
- `src/features/learning/components/activity-progress.tsx`
- `src/features/learning/components/media-player.tsx`
- `src/features/learning/components/practice-scenario.tsx`
- `src/app/(learner)/learn/learning/page.tsx`
- `src/app/(learner)/learn/learning/[courseId]/page.tsx`
- `src/app/(learner)/learn/learning/[courseId]/lessons/[lessonId]/page.tsx`
- `src/app/(learner)/learn/practice/page.tsx`

Exact route names must match the UX inventory approved in Phase 0.

## 14.5 Tests

- `tests/unit/learning/activity-content.test.ts`
- `tests/unit/learning/activity-attempt.test.ts`
- `tests/module-integration/learning/published-content-delivery.test.ts`
- `tests/module-integration/learning/activity-save-resume.test.ts`
- `tests/database-integration/learning/learning-repositories.test.ts`
- `tests/e2e/learner/lesson-activity-completion.spec.ts`
- `tests/e2e/learner/resume-interrupted-activity.spec.ts`

## 14.6 Exit criteria

- Learner can access only published, authorized content.
- Activity types support the R1 list without hardcoding the entire engine to one type.
- Activity responses persist and can be resumed after interruption.
- Repeated saves/completion requests do not create duplicate completion outcomes.
- Learning goal and organization contexts are preserved.
- Healthcare practice scenarios remain communication-only, not clinical decision tools.
- No AI dependency exists in the learning workflow.

# 15. Phase 9: Competencies, evidence and learning paths

## 15.1 Purpose

Implement canonical competency definitions and the evidence/progress foundation. Build explainable rule-based learning paths from a goal, curriculum prerequisites and available evidence. This phase extends the progress module first introduced through reference-data ownership decisions.

## 15.2 Implementation order

1. Define the competency hierarchy and stable identifiers owned by `progress-competencies`.
2. Connect curriculum and learning activity mappings to these canonical competency IDs.
3. Define eligible evidence types and evidence source references.
4. Implement idempotent evidence intake from completed learning activities.
5. Implement competency state representation: Not assessed, Developing, Demonstrated, Needs reassessment.
6. Implement skill-wise proficiency evidence and confidence as separate information.
7. Implement source-specific evidence intake from evaluation/placement later in Phase 11.
8. Implement goal-specific progress summaries without duplicating source records.
9. Implement rule-based learning-path generation inside the learning application layer.
10. Explain why each recommended next activity is suggested.
11. Keep exact thresholds/interpretation rules open until academically specified and validated; do not infer CEFR from quiz percentages.

## 15.3 `progress-competencies` files

Domain:

- `src/server/modules/progress-competencies/domain/competency/competency.ts`
- `src/server/modules/progress-competencies/domain/evidence/progress-evidence.ts`
- `src/server/modules/progress-competencies/domain/proficiency/proficiency-estimate.ts`
- `src/server/modules/progress-competencies/domain/progress/competency-progress.ts`
- `src/server/modules/progress-competencies/domain/progress/progress-summary.ts`

Application:

- `src/server/modules/progress-competencies/application/competencies/list-competencies.ts`
- `src/server/modules/progress-competencies/application/evidence/record-progress-evidence.ts`
- `src/server/modules/progress-competencies/application/evidence/list-progress-evidence.ts`
- `src/server/modules/progress-competencies/application/proficiency/get-skill-proficiency.ts`
- `src/server/modules/progress-competencies/application/progress/get-goal-progress.ts`
- `src/server/modules/progress-competencies/application/progress/update-competency-state.ts` (only when transition rules are specified and evidence-backed)

Ports:

- `src/server/modules/progress-competencies/ports/competency-repository.ts`
- `src/server/modules/progress-competencies/ports/evidence-repository.ts`
- `src/server/modules/progress-competencies/ports/progress-repository.ts`
- `src/server/modules/progress-competencies/ports/evidence-source-reader.ts`

Infrastructure:

- `src/server/modules/progress-competencies/infrastructure/persistence/mongodb/competency-mongo-repository.ts`
- `src/server/modules/progress-competencies/infrastructure/persistence/mongodb/evidence-mongo-repository.ts`
- `src/server/modules/progress-competencies/infrastructure/persistence/mongodb/competency-progress-mongo-repository.ts`
- `src/server/modules/progress-competencies/infrastructure/persistence/mongodb/progress-summary-mongo-repository.ts` (only if persisted summaries are needed for real access patterns; otherwise compute summary from authoritative records)

## 15.4 `learning` learning-path files

- `src/server/modules/learning/domain/learning-path/learning-path-recommendation.ts`
- `src/server/modules/learning/application/learning-path/generate-learning-path.ts`
- `src/server/modules/learning/application/learning-path/explain-learning-recommendation.ts`
- `src/server/modules/learning/ports/progress-evidence-reader.ts`
- `src/server/modules/learning/ports/competency-reader.ts`

Do not create a generic recommendation engine or a persisted `learningPaths` collection unless a real requirement demonstrates it is needed.

## 15.5 Frontend files

- `src/features/progress/components/goal-progress-overview.tsx`
- `src/features/progress/components/skill-progress-card.tsx`
- `src/features/progress/components/competency-progress-list.tsx`
- `src/features/progress/components/evidence-history.tsx`
- `src/features/learning-path/components/learning-path-view.tsx`
- `src/features/learning-path/components/recommendation-reason.tsx`
- `src/app/(learner)/learn/progress/page.tsx`
- `src/app/(learner)/learn/learning-path/page.tsx`

## 15.6 Tests

- `tests/unit/progress-competencies/competency-state.test.ts`
- `tests/unit/progress-competencies/proficiency-evidence.test.ts`
- `tests/module-integration/progress-competencies/learning-evidence-ingestion.test.ts`
- `tests/module-integration/learning/learning-path-generation.test.ts`
- `tests/database-integration/progress-competencies/progress-repositories.test.ts`
- `tests/e2e/learner/progress-and-learning-path.spec.ts`

## 15.7 Exit criteria

- Competency definitions have one canonical owner.
- Activity completion can create traceable evidence exactly once.
- Evidence records refer to source records rather than copying entire source payloads.
- Competency states are supported without invented thresholds.
- Language skill proficiency is represented separately by skill; confidence remains distinct.
- Medical-knowledge evidence is kept separate from healthcare-language proficiency/communication competency.
- Multiple goals retain independent evidence, progress and path context.
- Every recommendation has an understandable reason and respects applicable prerequisites.

---

# 16. Phase 10: Question bank and examination engine

## 16.1 Purpose

Implement the generic, reusable assessment engine. Question definitions and versions are owned by `question-bank`; examination definitions, examination versions, attempts and responses are owned by `examinations`.

## 16.2 Implementation order

1. Implement question identity, question type and classification.
2. Implement personal, institution-owned and platform-owned question-bank ownership/access.
3. Implement type-specific question payloads and shared passage/audio/case stimulus relationships.
4. Implement draft/edit/retire lifecycle and immutable question versions once used.
5. Implement examination identity, source, ownership, domain, visibility, purpose, difficulty and framework classification.
6. Implement examination builder and settings.
7. Validate and pin exact question-version references into a new examination version.
8. Publish/activate eligible examination versions through governance where applicable.
9. Implement attempt start and access eligibility.
10. Implement question order/option order and persist the presentation order for each attempt.
11. Implement response saving, review-before-submit, confirmed submission, timing, attempt limits and interruption recovery.
12. Construct learner-safe question delivery models that never expose protected answer keys.
13. Preserve attempt/examination/question version relationships.

## 16.3 `question-bank` files

Domain:

- `src/server/modules/question-bank/domain/question/question.ts`
- `src/server/modules/question-bank/domain/question/question-content.ts`
- `src/server/modules/question-bank/domain/question/question-version.ts`
- `src/server/modules/question-bank/domain/question-bank/question-bank.ts`
- `src/server/modules/question-bank/domain/question-bank/question-bank-membership.ts` (only if membership has an independent lifecycle/queries)

Application:

- `src/server/modules/question-bank/application/questions/create-question.ts`
- `src/server/modules/question-bank/application/questions/update-question-draft.ts`
- `src/server/modules/question-bank/application/questions/create-question-version.ts`
- `src/server/modules/question-bank/application/questions/retire-question.ts`
- `src/server/modules/question-bank/application/questions/get-question-version.ts`
- `src/server/modules/question-bank/application/banks/create-question-bank.ts`
- `src/server/modules/question-bank/application/banks/list-accessible-question-banks.ts`
- `src/server/modules/question-bank/application/banks/add-question-to-bank.ts`

Ports:

- `src/server/modules/question-bank/ports/question-repository.ts`
- `src/server/modules/question-bank/ports/question-version-repository.ts`
- `src/server/modules/question-bank/ports/question-bank-repository.ts`
- `src/server/modules/question-bank/ports/question-access-policy.ts`

Infrastructure:

- `src/server/modules/question-bank/infrastructure/persistence/mongodb/question-mongo-repository.ts`
- `src/server/modules/question-bank/infrastructure/persistence/mongodb/question-version-mongo-repository.ts`
- `src/server/modules/question-bank/infrastructure/persistence/mongodb/question-bank-mongo-repository.ts`

## 16.4 `examinations` files

Domain:

- `src/server/modules/examinations/domain/examination/examination.ts`
- `src/server/modules/examinations/domain/examination-version/examination-version.ts`
- `src/server/modules/examinations/domain/attempt/examination-attempt.ts`
- `src/server/modules/examinations/domain/attempt/examination-response.ts`

Application:

- `src/server/modules/examinations/application/examinations/create-examination.ts`
- `src/server/modules/examinations/application/examinations/update-examination-draft.ts`
- `src/server/modules/examinations/application/examinations/create-examination-version.ts`
- `src/server/modules/examinations/application/examinations/publish-examination.ts`
- `src/server/modules/examinations/application/examinations/get-examination-delivery.ts`
- `src/server/modules/examinations/application/attempts/start-examination-attempt.ts`
- `src/server/modules/examinations/application/attempts/get-examination-attempt.ts`
- `src/server/modules/examinations/application/attempts/save-examination-response.ts`
- `src/server/modules/examinations/application/attempts/submit-examination-attempt.ts`
- `src/server/modules/examinations/application/attempts/list-examination-history.ts`

Ports:

- `src/server/modules/examinations/ports/examination-repository.ts`
- `src/server/modules/examinations/ports/examination-version-repository.ts`
- `src/server/modules/examinations/ports/attempt-repository.ts`
- `src/server/modules/examinations/ports/response-repository.ts` (only if response lifecycle/storage is separate)
- `src/server/modules/examinations/ports/question-version-reader.ts`
- `src/server/modules/examinations/ports/evaluation-service.ts`
- `src/server/modules/examinations/ports/examination-access-policy.ts`

Infrastructure:

- `src/server/modules/examinations/infrastructure/persistence/mongodb/examination-mongo-repository.ts`
- `src/server/modules/examinations/infrastructure/persistence/mongodb/examination-version-mongo-repository.ts`
- `src/server/modules/examinations/infrastructure/persistence/mongodb/attempt-mongo-repository.ts`
- `src/server/modules/examinations/infrastructure/persistence/mongodb/response-mongo-repository.ts` (conditional)

## 16.5 Contracts and frontend files

Contracts:

- `src/shared/contracts/question-bank/create-question.ts`
- `src/shared/contracts/question-bank/question-version-response.ts`
- `src/shared/contracts/examinations/create-examination.ts`
- `src/shared/contracts/examinations/start-examination-attempt.ts`
- `src/shared/contracts/examinations/save-examination-response.ts`
- `src/shared/contracts/examinations/examination-delivery.ts`
- `src/shared/contracts/examinations/submit-examination-attempt.ts`

Server Actions:

- `src/server/actions/question-bank/create-question.ts`
- `src/server/actions/question-bank/update-question.ts`
- `src/server/actions/examinations/create-examination.ts`
- `src/server/actions/examinations/start-attempt.ts`
- `src/server/actions/examinations/save-response.ts`
- `src/server/actions/examinations/submit-attempt.ts`

Frontend:

- `src/features/question-bank/components/question-editor.tsx`
- `src/features/question-bank/components/question-type-fields.tsx`
- `src/features/question-bank/components/question-bank-list.tsx`
- `src/features/examinations/components/examination-builder.tsx`
- `src/features/examinations/components/examination-settings-form.tsx`
- `src/features/examinations/components/examination-player.tsx`
- `src/features/examinations/components/examination-question.tsx`
- `src/features/examinations/components/examination-timer.tsx`
- `src/features/examinations/components/examination-review.tsx`
- `src/app/(admin)/admin/examinations/page.tsx`
- `src/app/(admin)/admin/question-banks/page.tsx`
- `src/app/(learner)/learn/assessments/page.tsx`
- `src/app/(learner)/learn/assessments/[examinationId]/page.tsx`

Institution examination creation and assignment UI is completed in Phase 13 after institution workflows are connected.

## 16.6 Tests

- `tests/unit/question-bank/question-versioning.test.ts`
- `tests/unit/question-bank/question-classification.test.ts`
- `tests/unit/examinations/examination-version.test.ts`
- `tests/unit/examinations/attempt-lifecycle.test.ts`
- `tests/module-integration/examinations/question-version-snapshot.test.ts`
- `tests/module-integration/examinations/answer-key-protection.test.ts`
- `tests/module-integration/examinations/attempt-save-resume.test.ts`
- `tests/database-integration/question-bank/question-repositories.test.ts`
- `tests/database-integration/examinations/examination-and-attempt-repositories.test.ts`
- `tests/api-contract/examinations/examination-contracts.test.ts`
- `tests/e2e/learner/examination-attempt-and-resume.spec.ts`
- `tests/e2e/platform-operations/examination-governance.spec.ts`

## 16.7 Exit criteria

- Reusable private personal/institution question banks and platform-owned banks work.
- All approved R1 question types are represented with suitable type-specific structures.
- Shared passage/audio/case material stays associated with its questions.
- Used question versions cannot be silently changed.
- One generic engine supports platform, personal-private and institution-private exams.
- Examination versions pin exact question versions and settings.
- Timed/untimed attempts, answer saving, review and confirmed submission work.
- Interruption does not lose saved answers or randomized question order.
- Unpublished answer keys are never exposed.
- Historical attempts remain tied to their original examination and question versions.

# 17. Phase 11: Evaluation and placement

## 17.1 Purpose

Implement authoritative automatic and human evaluation, rubrics, result finalization and the placement journey by reusing the examination engine.

## 17.2 Implementation order

1. Implement rubric identity, criteria, scoring definitions and immutable rubric versions.
2. Implement automatic objective evaluation based on the marking definitions pinned to the attempted question/examination version.
3. Implement evaluation records with method, actor/system provenance and rubric version.
4. Implement explicit evaluator authorization using organization/platform policy capabilities.
5. Implement manual evaluation queue/assignment where needed, criterion marking and feedback.
6. Implement result aggregation and prevent finalization while required manual evaluation remains pending.
7. Preserve finalized result history and corrections.
8. Implement placement journey and its association with a learning goal.
9. Implement the two placement areas and references to generic examination attempts.
10. Implement skip and self-reported starting levels with explicit provenance.
11. Pass eligible evaluated placement evidence to progress; never create a duplicate proficiency source.
12. Keep the exact placement methodology, scoring and CEFR interpretation blocked until academic specifications are validated.

## 17.3 `evaluation` files

- `src/server/modules/evaluation/domain/rubric/rubric.ts`
- `src/server/modules/evaluation/domain/rubric/rubric-version.ts`
- `src/server/modules/evaluation/domain/evaluation/evaluation-record.ts`
- `src/server/modules/evaluation/domain/result/assessment-result.ts`
- `src/server/modules/evaluation/application/automatic/evaluate-objective-responses.ts`
- `src/server/modules/evaluation/application/manual/assign-manual-evaluation.ts`
- `src/server/modules/evaluation/application/manual/submit-manual-evaluation.ts`
- `src/server/modules/evaluation/application/results/finalize-assessment-result.ts`
- `src/server/modules/evaluation/application/results/get-assessment-result.ts`
- `src/server/modules/evaluation/ports/rubric-repository.ts`
- `src/server/modules/evaluation/ports/evaluation-repository.ts`
- `src/server/modules/evaluation/ports/result-repository.ts`
- `src/server/modules/evaluation/ports/submitted-response-reader.ts`
- `src/server/modules/evaluation/ports/evaluator-access-policy.ts`
- `src/server/modules/evaluation/infrastructure/persistence/mongodb/rubric-mongo-repository.ts`
- `src/server/modules/evaluation/infrastructure/persistence/mongodb/evaluation-mongo-repository.ts`
- `src/server/modules/evaluation/infrastructure/persistence/mongodb/result-mongo-repository.ts`

## 17.4 `placement-assessment` files

- `src/server/modules/placement-assessment/domain/placement/placement-assessment.ts`
- `src/server/modules/placement-assessment/domain/placement/placement-area.ts`
- `src/server/modules/placement-assessment/application/placement/initiate-placement.ts`
- `src/server/modules/placement-assessment/application/placement/skip-placement.ts`
- `src/server/modules/placement-assessment/application/placement/record-self-reported-levels.ts`
- `src/server/modules/placement-assessment/application/placement/associate-examination-attempt.ts`
- `src/server/modules/placement-assessment/application/placement/complete-placement.ts`
- `src/server/modules/placement-assessment/application/placement/get-placement-history.ts`
- `src/server/modules/placement-assessment/ports/placement-repository.ts`
- `src/server/modules/placement-assessment/ports/learning-goal-reader.ts`
- `src/server/modules/placement-assessment/ports/examination-service.ts`
- `src/server/modules/placement-assessment/ports/evaluation-result-reader.ts`
- `src/server/modules/placement-assessment/ports/progress-evidence-service.ts`
- `src/server/modules/placement-assessment/infrastructure/persistence/mongodb/placement-mongo-repository.ts`

## 17.5 Contracts and frontend files

- `src/shared/contracts/evaluation/manual-evaluation.ts`
- `src/shared/contracts/evaluation/assessment-result.ts`
- `src/shared/contracts/placement-assessment/placement-status.ts`
- `src/shared/contracts/placement-assessment/self-reported-levels.ts`
- `src/server/actions/evaluation/submit-manual-evaluation.ts`
- `src/server/actions/placement-assessment/start-placement.ts`
- `src/server/actions/placement-assessment/skip-placement.ts`
- `src/server/actions/placement-assessment/submit-self-reported-levels.ts`
- `src/features/evaluation/components/rubric-evaluation-form.tsx`
- `src/features/evaluation/components/evaluation-feedback.tsx`
- `src/features/placement-assessment/components/placement-introduction.tsx`
- `src/features/placement-assessment/components/placement-progress.tsx`
- `src/features/placement-assessment/components/self-reported-level-form.tsx`
- `src/features/placement-assessment/components/placement-results.tsx`
- `src/app/(learner)/learn/placement/page.tsx`
- `src/app/(learner)/learn/assessments/results/[attemptId]/page.tsx`
- `src/app/(institution)/institution/evaluations/page.tsx` (only if present in the approved institution design inventory)

## 17.6 Tests

- `tests/unit/evaluation/objective-marking.test.ts`
- `tests/unit/evaluation/rubric-version.test.ts`
- `tests/unit/evaluation/result-finalization.test.ts`
- `tests/module-integration/evaluation/mixed-automatic-manual-result.test.ts`
- `tests/module-integration/placement-assessment/placement-examination-flow.test.ts`
- `tests/module-integration/placement-assessment/skip-and-self-report.test.ts`
- `tests/database-integration/evaluation/evaluation-repositories.test.ts`
- `tests/database-integration/placement-assessment/placement-repository.test.ts`
- `tests/e2e/learner/placement-flow.spec.ts`
- `tests/e2e/evaluator/manual-evaluation.spec.ts`

## 17.7 Exit criteria

- Objective responses are evaluated against the exact marking definition used.
- Manual evaluators require explicit current permissions.
- Evaluation records identify automatic/human/AI-assisted provenance and rubric version as applicable.
- Mixed automatic/manual assessment is not finalized before required human marking completes.
- Result corrections preserve historical result information.
- Placement is optional and skippable.
- Self-reported levels are labelled as self-reported, not assessed.
- Placement retains skill-wise results and the two assessment areas separately.
- No official CEFR certification or external exam prediction is claimed.
- Placement uses the generic examination/evaluation capabilities.

---

# 18. Phase 12: Credentials and complete learner journey

## 18.1 Purpose

Complete Release 1 VocaClin course-completion credential handling and close the connected individual learner journey from registration through learning, assessment, progress and results.

## 18.2 Implementation order

1. Implement the five-category credential taxonomy in a way that distinguishes authority and release availability.
2. Implement eligibility reading from learning/course completion.
3. Implement VocaClin course-completion issuance and duplicate-event protection.
4. Implement credential status/correction history and authorized administration.
5. Implement learner-supplied institution/external credential claims and supported verification information.
6. Ensure VocaClin cannot modify/revoke institution-issued or external credentials.
7. Connect course-completion status to the learner experience without treating it as proficiency.
8. Complete learner dashboard, recent activity, progress, result and credential views using authoritative module data.
9. Complete navigation and experience-switcher behaviour required by the selected initial navigation approach.

## 18.3 `credentials` files

- `src/server/modules/credentials/domain/credential/credential.ts`
- `src/server/modules/credentials/domain/credential/credential-category.ts`
- `src/server/modules/credentials/domain/credential/credential-status.ts`
- `src/server/modules/credentials/domain/credential-claim/credential-claim.ts`
- `src/server/modules/credentials/application/issuance/check-course-completion-eligibility.ts`
- `src/server/modules/credentials/application/issuance/issue-course-completion-credential.ts`
- `src/server/modules/credentials/application/claims/record-credential-claim.ts`
- `src/server/modules/credentials/application/claims/update-verification-status.ts`
- `src/server/modules/credentials/application/administration/correct-credential.ts`
- `src/server/modules/credentials/application/administration/change-credential-status.ts`
- `src/server/modules/credentials/application/administration/get-credential-history.ts`
- `src/server/modules/credentials/ports/credential-repository.ts`
- `src/server/modules/credentials/ports/credential-claim-repository.ts`
- `src/server/modules/credentials/ports/completion-eligibility-reader.ts`
- `src/server/modules/credentials/infrastructure/persistence/mongodb/credential-mongo-repository.ts`
- `src/server/modules/credentials/infrastructure/persistence/mongodb/credential-claim-mongo-repository.ts`

## 18.4 Frontend and server action files

- `src/server/actions/credentials/record-credential-claim.ts`
- `src/server/actions/credentials/issue-course-completion.ts` (only if an authorized UI workflow requires a Server Action; automated eligibility/issuance may be invoked by an application workflow)
- `src/features/credentials/components/credential-list.tsx`
- `src/features/credentials/components/credential-details.tsx`
- `src/features/credentials/components/credential-claim-form.tsx`
- `src/app/(learner)/learn/credentials/page.tsx`
- `src/app/(learner)/learn/page.tsx` (complete the learner dashboard using authoritative data from goals, learning, progress, evaluation and credentials)

Shell/navigation files may be modified to expose the approved routes. Do not create navigation links to R2/R3 functionality as though it were available.

## 18.5 Tests

- `tests/unit/credentials/credential-lifecycle.test.ts`
- `tests/unit/credentials/course-completion-eligibility.test.ts`
- `tests/module-integration/credentials/course-completion-issuance.test.ts`
- `tests/module-integration/credentials/external-credential-claim.test.ts`
- `tests/database-integration/credentials/credential-repositories.test.ts`
- `tests/e2e/learner/course-completion-credential.spec.ts`
- `tests/e2e/learner/complete-learning-journey.spec.ts`

## 18.6 Exit criteria

- Eligible course completion can produce a VocaClin course-completion record once.
- Course completion is never labelled as a proficiency level or official external qualification.
- Institution-issued and external credentials remain under their original issuers' authority.
- Credential status/correction history is preserved.
- Required administrative approvals are enforced for high-impact actions.
- Learner can complete the personal end-to-end journey and view meaningful progress/results.

---

# 19. Phase 13: Institutional workflows and reporting

## 19.1 Purpose

Complete the institutional experience over the shared learning and assessment engines, enforce strict tenant isolation, and deliver basic learner/cohort reporting plus the required report foundations.

## 19.2 Implementation order

1. Connect organization assignments to platform curriculum/course resources.
2. Connect assignments to private platform/institution examinations.
3. Implement learner enrolment from an authorized organization assignment.
4. Enforce assignment deadlines, availability and attempt limits through the owning modules.
5. Implement teacher/evaluator permission boundaries.
6. Implement institution learner and cohort views using organization-owned records.
7. Implement reporting read capabilities from source modules; do not directly query their collections.
8. Implement learner report and institution report definitions/metrics.
9. Implement staff analytics source interfaces required by Platform Operations, while the staff UI is completed in Phase 14.
10. Implement aggregated exports only where the R1 reporting requirement needs them, with separate authorization and audit.
11. Verify personal and institutional access never merge merely because one person belongs to an institution.

## 19.3 `reporting` files

- `src/server/modules/reporting/domain/report-definition/report-definition.ts`
- `src/server/modules/reporting/domain/report-definition/metric-definition.ts`
- `src/server/modules/reporting/domain/report-access/report-access-classification.ts`
- `src/server/modules/reporting/application/learner-reports/get-learner-progress-report.ts`
- `src/server/modules/reporting/application/institution-reports/get-institution-learner-report.ts`
- `src/server/modules/reporting/application/institution-reports/get-cohort-report.ts`
- `src/server/modules/reporting/application/staff-analytics/get-platform-metrics.ts`
- `src/server/modules/reporting/application/report-export/export-aggregated-report.ts`
- `src/server/modules/reporting/ports/learner-report-source.ts`
- `src/server/modules/reporting/ports/institution-report-source.ts`
- `src/server/modules/reporting/ports/platform-metrics-source.ts`
- `src/server/modules/reporting/index.ts`

No reporting MongoDB collection is required by default. Persist generated report configuration/artifacts only if an R1 workflow needs them. Metric definitions should be version-controlled and domain-owner reviewed; do not create a database-driven report/metric editor in R1.

## 19.4 Frontend files

- `src/features/organizations/components/assignment-list.tsx`
- `src/features/organizations/components/assignment-details.tsx`
- `src/features/organizations/components/cohort-overview.tsx`
- `src/features/reporting/components/learner-progress-report.tsx`
- `src/features/reporting/components/cohort-report.tsx`
- `src/features/reporting/components/report-filters.tsx`
- `src/app/(institution)/institution/assignments/page.tsx`
- `src/app/(institution)/institution/assignments/new/page.tsx`
- `src/app/(institution)/institution/cohorts/[cohortId]/page.tsx`
- `src/app/(institution)/institution/reports/page.tsx`
- `src/app/(learner)/learn/results/page.tsx`

## 19.5 Tests

- `tests/module-integration/organizations/course-assignment-flow.test.ts`
- `tests/module-integration/organizations/examination-assignment-flow.test.ts`
- `tests/module-integration/reporting/institution-report-data-scope.test.ts`
- `tests/module-integration/reporting/goal-specific-learner-report.test.ts`
- `tests/module-integration/commercial/institution-capacity-concurrency.test.ts`
- `tests/e2e/institution/course-assignment-and-progress.spec.ts`
- `tests/e2e/institution/private-examination-assignment.spec.ts`
- `tests/e2e/institution/cohort-report.spec.ts`

## 19.6 Exit criteria

- Institution can invite/manage authorized members, roles and cohorts.
- Institution can assign platform learning programmes and private examinations.
- Assigned learners can complete the same shared learning/examination workflows as individuals.
- Institution reports show only permitted learners and data.
- One learner's membership in multiple institutions does not leak data across tenants.
- Personal learning remains private by default outside assigned/explicitly authorized scope.
- Basic learner, institution and staff report capabilities have centrally defined metrics and authorization.
- Viewing, downloading, exporting and external sharing are separate permissions.

# 20. Phase 14A: Platform Operations, Trust & Safety and remaining foundations

## 20.1 Purpose

Complete the internal staff operating experience and the Trust & Safety case lifecycle, using the identity, staff policy, approval, audit, domain modules and reporting foundations already implemented.

This is the largest operational phase. It does not create duplicate business-management modules; Platform Operations composes the workspaces from the owning modules.

## 20.2 Implementation order

1. Complete seven staff roles and the approved default permission matrix.
2. Complete staff invitations, activation/deactivation, offboarding, role combinations, grants, restrictions, expiry and access reviews.
3. Complete mandatory MFA, session visibility/revocation, sensitive reauthentication and security-event workflows.
4. Implement Approval Center: requester, eligible independent approvers, conflict/self-approval checks, expiry, decisions and authorized execution handoff.
5. Implement privileged learner-data request/scope/dual-approval/grant/expiry/termination workflow across categories A-F and separate access operations.
6. Implement emergency access, notifications, expiry and retrospective review.
7. Complete `audit-oversight`: seven categories, search/filter, review flags, read-only Auditor workspace, findings, corrective actions and independent verification.
8. Implement Trust & Safety report intake and report categorization; identified/anonymous handling as approved.
9. Implement case lifecycle, case assignments, evidence references, append-only case entries, internal/external communication boundaries and appeals.
10. Connect enforcement operations to owning modules; never change their records directly.
11. Implement operational workspace, assigned/shared queues, P0-P3 priorities, handoffs, notifications and recurring responsibilities.
12. Implement platform incidents, change/release records, readiness checks, deployment history and rollback/mitigation documentation.
13. Implement internal runbooks/procedures and essential platform configuration with required approvals.
14. Complete all eight Platform Operations workspaces and dashboard using reporting/domain interfaces.
15. Complete basic authorized global search across permitted staff records; no advanced search/bulk system.
16. Verify the Panel can operate the platform without manual database changes or unauthorized workarounds.

## 20.3 `platform-operations` files

Staff/permission governance files created initially in Phase 4 are extended, not duplicated.

Domain:

- `src/server/modules/platform-operations/domain/approval/approval-request.ts`
- `src/server/modules/platform-operations/domain/approval/approval-decision.ts`
- `src/server/modules/platform-operations/domain/privileged-access/privileged-access-request.ts`
- `src/server/modules/platform-operations/domain/privileged-access/privileged-access-grant.ts`
- `src/server/modules/platform-operations/domain/operations/operational-task.ts`
- `src/server/modules/platform-operations/domain/operations/platform-incident.ts`
- `src/server/modules/platform-operations/domain/operations/platform-change.ts`
- `src/server/modules/platform-operations/domain/operations/platform-release.ts`
- `src/server/modules/platform-operations/domain/operations/operational-procedure.ts`
- `src/server/modules/platform-operations/domain/configuration/platform-setting.ts`

Application:

- `src/server/modules/platform-operations/application/approvals/create-approval-request.ts`
- `src/server/modules/platform-operations/application/approvals/record-approval-decision.ts`
- `src/server/modules/platform-operations/application/approvals/execute-approved-action.ts`
- `src/server/modules/platform-operations/application/privileged-access/request-learner-data-access.ts`
- `src/server/modules/platform-operations/application/privileged-access/grant-approved-access.ts`
- `src/server/modules/platform-operations/application/privileged-access/expire-or-revoke-access.ts`
- `src/server/modules/platform-operations/application/workspace/get-staff-workspace.ts`
- `src/server/modules/platform-operations/application/operations/manage-operational-task.ts`
- `src/server/modules/platform-operations/application/operations/manage-incident.ts`
- `src/server/modules/platform-operations/application/operations/manage-change.ts`
- `src/server/modules/platform-operations/application/operations/manage-release.ts`
- `src/server/modules/platform-operations/application/operations/manage-operational-procedure.ts`
- `src/server/modules/platform-operations/application/configuration/update-platform-setting.ts`
- `src/server/modules/platform-operations/application/search/search-authorized-platform-records.ts`

Ports (add only those needed by actual use cases):

- `src/server/modules/platform-operations/ports/approval-repository.ts`
- `src/server/modules/platform-operations/ports/privileged-access-repository.ts`
- `src/server/modules/platform-operations/ports/operational-task-repository.ts`
- `src/server/modules/platform-operations/ports/incident-repository.ts`
- `src/server/modules/platform-operations/ports/change-repository.ts`
- `src/server/modules/platform-operations/ports/release-repository.ts`
- `src/server/modules/platform-operations/ports/procedure-repository.ts`
- `src/server/modules/platform-operations/ports/platform-setting-repository.ts`
- `src/server/modules/platform-operations/ports/approval-authority-reader.ts`
- `src/server/modules/platform-operations/ports/audit-recorder.ts`

Infrastructure:

- `src/server/modules/platform-operations/infrastructure/persistence/mongodb/approval-mongo-repository.ts`
- `src/server/modules/platform-operations/infrastructure/persistence/mongodb/privileged-access-mongo-repository.ts`
- `src/server/modules/platform-operations/infrastructure/persistence/mongodb/operational-task-mongo-repository.ts`
- `src/server/modules/platform-operations/infrastructure/persistence/mongodb/incident-mongo-repository.ts`
- `src/server/modules/platform-operations/infrastructure/persistence/mongodb/change-mongo-repository.ts`
- `src/server/modules/platform-operations/infrastructure/persistence/mongodb/release-mongo-repository.ts`
- `src/server/modules/platform-operations/infrastructure/persistence/mongodb/procedure-mongo-repository.ts`
- `src/server/modules/platform-operations/infrastructure/persistence/mongodb/platform-setting-mongo-repository.ts`

Do not create a second audit repository, generic workflow engine, full CI/CD platform, duplicate Trust & Safety case repository or duplicate business records.

## 20.4 `audit-oversight` remaining files

- `src/server/modules/audit-oversight/domain/audit-review/audit-review.ts`
- `src/server/modules/audit-oversight/domain/audit-finding/audit-finding.ts`
- `src/server/modules/audit-oversight/application/review/search-audit-records.ts`
- `src/server/modules/audit-oversight/application/review/get-triggered-audit-reviews.ts`
- `src/server/modules/audit-oversight/application/findings/create-audit-finding.ts`
- `src/server/modules/audit-oversight/application/findings/record-corrective-action.ts`
- `src/server/modules/audit-oversight/application/findings/verify-corrective-action.ts`
- `src/server/modules/audit-oversight/ports/audit-finding-repository.ts`
- `src/server/modules/audit-oversight/infrastructure/persistence/mongodb/audit-finding-mongo-repository.ts`

## 20.5 `trust-safety` files

Domain:

- `src/server/modules/trust-safety/domain/report/report.ts`
- `src/server/modules/trust-safety/domain/case/trust-safety-case.ts`
- `src/server/modules/trust-safety/domain/evidence/case-evidence.ts`
- `src/server/modules/trust-safety/domain/enforcement/enforcement-decision.ts`
- `src/server/modules/trust-safety/domain/appeal/appeal.ts`

Application:

- `src/server/modules/trust-safety/application/reports/submit-report.ts`
- `src/server/modules/trust-safety/application/reports/assess-and-route-report.ts`
- `src/server/modules/trust-safety/application/cases/create-case.ts`
- `src/server/modules/trust-safety/application/cases/assign-case.ts`
- `src/server/modules/trust-safety/application/cases/record-investigation-entry.ts`
- `src/server/modules/trust-safety/application/evidence/attach-case-evidence.ts`
- `src/server/modules/trust-safety/application/enforcement/request-enforcement-action.ts`
- `src/server/modules/trust-safety/application/enforcement/record-enforcement-outcome.ts`
- `src/server/modules/trust-safety/application/appeals/submit-appeal.ts`
- `src/server/modules/trust-safety/application/appeals/review-appeal.ts`
- `src/server/modules/trust-safety/application/appeals/close-appeal.ts`

Ports:

- `src/server/modules/trust-safety/ports/report-repository.ts`
- `src/server/modules/trust-safety/ports/case-repository.ts`
- `src/server/modules/trust-safety/ports/case-evidence-repository.ts`
- `src/server/modules/trust-safety/ports/appeal-repository.ts`
- `src/server/modules/trust-safety/ports/enforcement-action-provider.ts`

Infrastructure:

- `src/server/modules/trust-safety/infrastructure/persistence/mongodb/report-mongo-repository.ts`
- `src/server/modules/trust-safety/infrastructure/persistence/mongodb/case-mongo-repository.ts`
- `src/server/modules/trust-safety/infrastructure/persistence/mongodb/case-evidence-mongo-repository.ts`
- `src/server/modules/trust-safety/infrastructure/persistence/mongodb/appeal-mongo-repository.ts`

Evidence files use separately protected object-storage access and recorded access. Never use normal public media delivery for investigation evidence.

## 20.6 Reporting completion files

Extend `reporting` with staff-specific report operations and access classification:

- `src/server/modules/reporting/application/staff-analytics/get-content-governance-metrics.ts`
- `src/server/modules/reporting/application/staff-analytics/get-credential-metrics.ts`
- `src/server/modules/reporting/application/staff-analytics/get-trust-safety-metrics.ts`
- `src/server/modules/reporting/application/staff-analytics/get-operational-metrics.ts`
- `src/server/modules/reporting/domain/report-access/report-access-policy.ts`

Only add source-specific reader ports required for these reports. Staff dashboard default must be aggregated/de-identified, Operations Analyst has no individual-level access by default, small cohorts must protect against re-identification, and sensitive reports must follow the privileged learner-data access workflow.

## 20.7 Frontend files

Shared staff shell/workspace:

- `src/app/(admin)/admin/layout.tsx`
- `src/app/(admin)/admin/page.tsx`
- `src/features/platform-operations/components/staff-workspace.tsx`
- `src/features/platform-operations/components/staff-navigation.tsx`
- `src/features/platform-operations/components/work-queue.tsx`
- `src/features/platform-operations/components/approval-center.tsx`
- `src/features/platform-operations/components/approval-request-details.tsx`
- `src/features/platform-operations/components/privileged-access-request-form.tsx`
- `src/features/platform-operations/components/operational-task-details.tsx`
- `src/features/platform-operations/components/incident-details.tsx`
- `src/features/platform-operations/components/change-release-details.tsx`
- `src/features/platform-operations/components/platform-configuration-form.tsx`

Workspace route pages (adjust only to match the Phase 0 approved screen inventory):

- `src/app/(admin)/admin/users/page.tsx`
- `src/app/(admin)/admin/organizations/page.tsx`
- `src/app/(admin)/admin/content/page.tsx`
- `src/app/(admin)/admin/examinations/page.tsx`
- `src/app/(admin)/admin/credentials/page.tsx`
- `src/app/(admin)/admin/trust-safety/page.tsx`
- `src/app/(admin)/admin/activity/page.tsx`
- `src/app/(admin)/admin/analytics/page.tsx`
- `src/app/(admin)/admin/audit/page.tsx`
- `src/app/(admin)/admin/approvals/page.tsx`
- `src/app/(admin)/admin/settings/page.tsx`

Feature components for specific workspaces should be placed under `src/features/` by capability, not all inside one large Platform Operations feature:

- `src/features/trust-safety/components/report-inbox.tsx`
- `src/features/trust-safety/components/case-investigation.tsx`
- `src/features/trust-safety/components/appeal-review.tsx`
- `src/features/audit-oversight/components/audit-search.tsx`
- `src/features/audit-oversight/components/audit-finding-details.tsx`
- `src/features/reporting/components/platform-analytics-dashboard.tsx`
- `src/features/credentials/components/admin-credential-details.tsx`
- `src/features/governance/components/admin-content-review.tsx`
- `src/features/organizations/components/admin-organization-details.tsx`

## 20.8 Tests

- `tests/unit/platform-operations/approval-independence.test.ts`
- `tests/unit/platform-operations/privileged-access-scope.test.ts`
- `tests/unit/platform-operations/operational-priority.test.ts`
- `tests/unit/trust-safety/report-and-case-lifecycle.test.ts`
- `tests/unit/trust-safety/appeal-independence.test.ts`
- `tests/module-integration/platform-operations/dual-approval-execution.test.ts`
- `tests/module-integration/platform-operations/privileged-learner-access.test.ts`
- `tests/module-integration/platform-operations/emergency-access-review.test.ts`
- `tests/module-integration/trust-safety/enforcement-through-owning-module.test.ts`
- `tests/module-integration/audit-oversight/critical-action-audit-failure.test.ts`
- `tests/database-integration/platform-operations/approval-and-access-repositories.test.ts`
- `tests/database-integration/trust-safety/case-evidence-history.test.ts`
- `tests/e2e/platform-operations/all-eight-workspaces-permissions.spec.ts`
- `tests/e2e/platform-operations/dual-approval.spec.ts`
- `tests/e2e/platform-operations/privileged-learner-access.spec.ts`
- `tests/e2e/platform-operations/auditor-read-only.spec.ts`
- `tests/e2e/platform-operations/trust-safety-case-and-appeal.spec.ts`
- `tests/e2e/platform-operations/incident-and-release-management.spec.ts`

## 20.9 Exit criteria

- All eight staff workspaces are usable with role-appropriate permissions.
- Seven staff roles and effective permission rules match approved matrices.
- MFA/session security and backend authorization are enforced.
- Approval requests cannot execute before required independent approvals; no alternate route bypasses approval.
- Sensitive learner data access is case-based, scoped, time-limited, dual-approved and audited; view permission does not imply modify/download/export/delete.
- Emergency access is logged, scoped, expires and receives the required independent review.
- Audit records cannot be edited/deleted through the Panel, including by Platform Owner; Auditor is read-only.
- Trust & Safety can complete reports, investigations, enforcement coordination and appeals with evidence/history.
- Native operational tasks, incidents, changes, releases and runbooks work end to end.
- Staff reports obey aggregation and sensitive data rules.
- Staff can operate the platform without manual DB changes or unauthorized workarounds.

---

# 21. Phase 14B: Community, AI foundations and remaining cross-experience integrations

## 21.1 Purpose

Finish the explicitly required R1 community foundation and AI boundary, then close the remaining public/discovery/navigation/notification/localization integration gaps. Do not expand into the R2 contributor or AI experiences.

## 21.2 Implementation order

1. Confirm the Release 1 contributor examination-submission intake mechanism and contributor eligibility decision (SPEC-22). If unresolved, do not invent an intake flow; leave the dependent feature gated and record the blocker.
2. Implement only the submission provenance/attribution capability required by that approved mechanism.
3. Connect submission intake to governance review and Platform Operations staff handling.
4. Establish the provider-neutral AI task boundary and consent/policy checks. Do not implement an actual AI user feature unless SPEC-15 is separately approved.
5. Complete search for published platform learning/examination information with full-text search behind an abstraction; provider depends on MongoDB hosting decision.
6. Complete invitation, assignment and staff notifications through an email adapter; channels/providers remain open.
7. Complete polling-first updates where required. Do not introduce SSE/WebSockets without a measured need.
8. Complete Option B navigation: personal home, experience switcher, institution selector, remembered last active experience and always-reachable personal home.
9. Complete public information/enquiry pages and approved public discovery screens.
10. Ensure Contributor entry-point treatment follows approved design while not implying public contributor onboarding or publishing is available in R1.
11. Complete English interface localization readiness, Unicode/accent handling and language-independent data structures.
12. Review all five experiences against the 68 approved desktop/mobile design screens.

## 21.3 `community` files

Only after the submission intake mechanism is approved:

- `src/server/modules/community/domain/contribution-submission/contribution-submission.ts`
- `src/server/modules/community/application/submissions/register-contribution-submission.ts`
- `src/server/modules/community/application/submissions/get-contribution-submission.ts`
- `src/server/modules/community/ports/contribution-submission-repository.ts`
- `src/server/modules/community/ports/contribution-source-reader.ts`
- `src/server/modules/community/infrastructure/persistence/mongodb/contribution-submission-mongo-repository.ts` (only if provenance cannot be safely maintained within existing governance intake records)
- `src/server/modules/community/index.ts`
- `src/features/community/components/contribution-submission-status.tsx` (only if a contributor-facing R1 submission status screen is approved; otherwise staff-only)

Do not create a public contributor profile, verification or marketplace implementation.

## 21.4 `ai-assistance` files

Foundation only:

- `src/server/modules/ai-assistance/domain/task-policy/ai-task-policy.ts`
- `src/server/modules/ai-assistance/ports/ai-provider.ts`
- `src/server/modules/ai-assistance/application/task-execution/execute-approved-ai-task.ts` (conditional on an approved actual task)
- `src/server/modules/ai-assistance/index.ts`
- `src/server/infrastructure/integrations/ai/provider-adapter.ts` (only when a provider is selected and an R1 task is approved)
- `src/server/infrastructure/integrations/ai/index.ts`

Consent must be checked through `learner-profile-goals`; commercial usage entitlement through `commercial`; AI-provider credentials remain server-side. No AI database collections by default. No AI assistant, conversation store, memory system or agent framework in R1.

## 21.5 Search and notification files

- `src/server/modules/reporting` is not the search owner. Add a dedicated search module only if the approved module architecture changes; otherwise place a narrow search application capability under the module that owns the searchable resource and share only the provider adapter.
- `src/server/infrastructure/integrations/email/email-provider.ts`
- `src/server/infrastructure/integrations/email/send-email.ts`
- `src/server/infrastructure/integrations/email/index.ts`
- `src/server/infrastructure/integrations/search/full-text-search-provider.ts` (new integration directory only if full-text search is used and the provider is approved)
- `src/server/infrastructure/integrations/search/index.ts` (conditional)
- `src/app/api/v1/health/route.ts` (only if required by the selected hosting/health-check design)

Do not create notification database collections until notification history/preferences/acknowledgement requirements and retention are specified. Staff notification persistence, if needed for OPS-001/005, belongs to Platform Operations.

## 21.6 Navigation and public frontend files

- `src/app/layout.tsx` (complete global metadata/shell integration)
- `src/app/page.tsx` (complete public landing experience)
- `src/components/shell/experience-switcher.tsx`
- `src/components/shell/institution-selector.tsx`
- `src/components/shell/notification-menu.tsx`
- `src/features/navigation/experience-preference.ts` (only if a frontend model is needed; persistence owned by profile/preferences)
- Add public route pages under `src/app/` only as identified in the UX design inventory; do not invent marketing page scope.

## 21.7 Tests

- `tests/module-integration/community/submission-governance-handoff.test.ts` (conditional)
- `tests/unit/ai-assistance/task-policy.test.ts`
- `tests/module-integration/ai-assistance/consent-and-provider-boundary.test.ts` (only if a real task exists)
- `tests/e2e/navigation/experience-switching.spec.ts`
- `tests/e2e/public/public-information-and-enquiry.spec.ts`
- `tests/e2e/search/published-content-search.spec.ts`
- `tests/e2e/notifications/invitation-and-assignment-notifications.spec.ts`

## 21.8 Exit criteria

- R1 contributor submission handling exists only if intake mechanism/eligibility are approved; otherwise the open decision remains clearly gated.
- Ownership, licence and review remain in governance; examination payload remains in examinations/question-bank.
- AI provider can be replaced through the provider-neutral boundary.
- No R1 workflow depends on AI.
- Optional AI processing cannot bypass consent or commercial usage rules.
- Published platform content is discoverable through the approved search capability.
- Required email notifications work without exposing unnecessary learner information.
- Experience switching works without signing out; institution selection is scoped; personal home remains reachable.
- Contributor shell entry does not imply public contributor functionality.
- Public and shared navigation screens match the design inventory.

---

# 22. Phase 15: Release hardening and launch readiness

## 22.1 Purpose

Verify the entire Release 1 product against functional acceptance, security, privacy, data integrity, accessibility, responsive design, observability, backup/restore and operational readiness. This phase is not a place to add new unapproved features.

## 22.2 Implementation order

1. Run all unit and module-integration suites.
2. Run database integration tests against isolated test databases.
3. Run API contract tests against actual Route Handlers.
4. Run all primary learner, institution and staff E2E journeys at desktop and mobile breakpoints.
5. Verify all 29 PRD acceptance conditions ACC-001 through ACC-029, including the revised Platform Operations requirements and release exclusions.
6. Perform authorization and tenant-isolation testing on direct route/API/Server Action calls.
7. Perform sensitive learner-data access, consent withdrawal and deletion/export/correction policy tests.
8. Verify examination integrity, attempt recovery, immutable versions, answer-key protection and evaluation finalization.
9. Verify audit integrity, audit write failure handling, dual approval and emergency review.
10. Verify object storage upload quarantine, private delivery and evidence access controls.
11. Verify worker retry/idempotency/dead-letter/failure handling and monitoring for actual jobs.
12. Verify logs contain no secrets or unnecessary sensitive data.
13. Verify backup restoration and migration recovery.
14. Verify keyboard, screen-reader, focus, contrast, forms, responsive layout and non-audio alternatives.
15. Verify no R2/R3 UI is presented as available R1 functionality.
16. Complete production configuration, deployment approval, release record, monitoring and rollback/mitigation plan.
17. Obtain company approvals and launch-specific legal/academic decisions required for the selected release scope.

## 22.3 Files to add/modify as needed

- `README.md` — verified setup, build, test and deployment entry points.
- `AGENTS.md` — final development rules and links to current scope/architecture docs.
- `docs/development/local-development.md` — actual environment and run/test commands.
- `docs/architecture/project-structure.md` — reflect the implemented structure, not a speculative one.
- `docs/architecture/module-boundaries.md` — final module ownership and public operations.
- `docs/architecture/dependency-rules.md` — final allowed dependency graph and import constraints.
- `docs/decisions/` — record decisions made during implementation, including superseded choices and approved provider/hosting/security mechanisms.
- `tests/README.md` — verified test commands and test data rules.
- `tests/e2e/release-acceptance/learner-core-journey.spec.ts`
- `tests/e2e/release-acceptance/institution-core-journey.spec.ts`
- `tests/e2e/release-acceptance/platform-operations-core.spec.ts`
- `tests/e2e/release-acceptance/privacy-and-authorization.spec.ts`
- `tests/e2e/release-acceptance/examination-integrity.spec.ts`
- Add operational runbook and release documentation under `docs/development/` only where the team will actually use it.

Do not add artificial `release-report.ts`, `compliance-proof.ts` or generic health abstractions unless a concrete implementation requirement exists.

## 22.4 Exit criteria

- Every R1 acceptance condition has a passing test or documented, approved manual verification where automation is unsuitable.
- No critical authorization, tenant-isolation, privacy, audit-integrity or examination-integrity defect remains open.
- Desktop/mobile designs are implemented as responsive web pages.
- Production configuration contains no committed secrets.
- Backup restoration is tested.
- Migrations and worker jobs are observable and failure-aware.
- Operational staff can perform required R1 tasks from the Panel.
- Deployment and rollback/mitigation procedures are documented and verified.
- All required company, legal and academic approvals/specifications are resolved for the actual launch scope.
- Product owner signs off the Release 1 acceptance checklist.

---

## 23. Cross-phase file and implementation rules

### 23.1 Exact path rule

Every phase review must update the file list to the final exact paths before that phase begins. The paths proposed above are the initial detailed plan. During review, a path may be moved or removed if the responsibility is better owned elsewhere, but the change must be agreed and reflected here.

### 23.2 No-formality rule

Do not create:

- Empty `index.ts` files in every subfolder.
- Interfaces with no real consumer or dependency inversion need.
- Repository wrappers around simple data access that provide no boundary value.
- Generic managers/factories/services for every domain object.
- Duplicate API DTOs, frontend models and domain types with identical responsibilities.
- A universal types folder.
- Placeholder modules or fake adapters.
- Unused database collections, event types or queue jobs.
- A generic workflow engine when a direct application workflow is sufficient.
- Abstractions for hypothetical future providers/features without a current requirement.

A file must exist because it owns meaningful logic, a necessary boundary, a real adapter, a tested contract or a user-facing composition responsibility.

### 23.3 Public module interface rule

Each module's root `index.ts` exposes only deliberate public operations and public types. Internal files should be imported directly only within that module. Do not use a root barrel to expose all implementation details.

### 23.4 Server Action and API rule

- Server Actions are server-side entry points for appropriate UI mutations and live under `src/server/` as approved.
- Route Handlers live under `src/app/api/v1/` and remain thin HTTP adapters.
- Both call the same application operations when they represent the same business use case.
- Do not duplicate domain logic in React components, Route Handlers or Server Actions.
- Do not create REST endpoints for every internal operation when no HTTP consumer exists.

### 23.5 UI rule

- Design screens are route/feature compositions, not independent business modules.
- Shared primitives come from shadcn/ui and are customized as needed.
- Keep feature-specific state and view types inside the owning frontend feature.
- Do not build desktop/mobile as separate apps. Use responsive layouts and the approved designs.
- Loading, empty, error, success, disabled, locked and validation states must be implemented where relevant.

### 23.6 Data and history rule

- Every persisted entity must have a clear owner and lifecycle.
- Referential integrity, unique constraints, indexes, transaction boundaries and idempotency are planned with the workflow that needs them.
- Immutable versions must be enforced by application and persistence policies, not just UI conventions.
- Business history and authoritative audit records remain distinct.
- Exact retention periods and legal wording must not be invented.

### 23.7 Worker rule

- Worker code shares application/domain logic with the web process.
- Jobs are idempotent, have bounded retries/backoff and observable failure/dead-letter behaviour.
- Use queue/outbox patterns where workflow consistency requires them; not for every operation.
- Never rely on a web request staying alive for long-running media or other asynchronous processing.

---

## 24. Global Definition of Done

A feature or phase is not complete just because a screen renders, an endpoint responds or TypeScript compiles.

For each implemented capability, verify the applicable items:

1. Correct business logic exists in the owning module.
2. The implementation follows the approved module dependency rules.
3. Inputs are validated at untrusted boundaries.
4. Authentication and authorization are enforced on the server.
5. Tenant, ownership and learning-goal context are validated.
6. Data changes preserve required history and immutable versions.
7. Duplicate requests and relevant concurrency cases are handled safely.
8. Errors are safe and understandable; secrets and sensitive data are not leaked.
9. Loading, empty, error, success and relevant edge states are handled in the UI.
10. Desktop and mobile website layouts follow the approved designs.
11. Required unit/module/database/API/E2E tests pass.
12. Documentation reflects the implementation and actual decisions.
13. No unused placeholder files, speculative features or unnecessary abstractions were introduced.
14. The feature does not accidentally activate an R2/R3 capability.

---

## 25. Open specifications and implementation gates

These items are not to be guessed. They must be resolved before the implementation step that depends on them. A non-blocking open item may remain open while independent work continues.

| ID / area | Open decision | Blocks or gates |
|---|---|---|
| APP-01 | Ricoz approval for Next.js backend exception; fallback Express.js uses same domain/application layers | Final backend framework approval/deployment |
| APP-02 | Ricoz approval for Vercel-first deployment | Production hosting |
| APP-03 | Managed MongoDB provider/hosting approval; search choice depends on it | Production DB/search |
| APP-04 | Ricoz approval for Clerk | Production authentication |
| APP-05 | Worker hosting: Vercel Daemons or managed container host | Production worker deployment |
| APP-06 | BullMQ + managed Redis candidate/provider approval | Durable worker queue |
| SPEC-01 | First profession pathways | Launch curriculum/content and goal catalogs |
| SPEC-02 | English proficiency coverage at launch | Placement design, content and learning paths |
| SPEC-03 | Destination priorities | Goal/reference data and curriculum scope |
| SPEC-04 | External examination programmes | Exam-preparation curriculum and mapping |
| SPEC-05 | Contributor/organization verification evidence | R2 contributor ecosystem; R1 intake eligibility if affected |
| SPEC-06 | Evaluator qualifications and permissions | Manual evaluation assignments and policy |
| SPEC-07 | Placement methodology, validation and score interpretation | Assessed placement outputs/level claims |
| SPEC-08 | Content review staffing and service levels | Editorial operating readiness |
| SPEC-09 | Subscription pricing, free-tier limits, usage limits, checkout/payment/refund policies | Activation of paid commercial workflows |
| SPEC-11 | Success targets | Pilot and launch performance evaluation |
| SPEC-12 | Product name, trademark and domain | Public commercial launch as appropriate |
| SPEC-13 | Institutional content sharing/public submission rules | Any institutional content-sharing expansion |
| SPEC-14 | Formal proficiency credential standards | R3 proficiency credentials |
| SPEC-15 | Whether limited optional AI learning support enters R1 | Any actual R1 AI task |
| SPEC-16 | Applicable accessibility standard and compliance target | Formal accessibility compliance claims |
| SPEC-17 | P0-P3 response/resolution targets and escalation timings | Operational SLA configuration |
| SPEC-18 | Staffing, coverage and enough eligible approvers | Operational readiness/dual-approval availability |
| SPEC-19 | Staff session inactivity and maximum lifetime values | Final session security configuration |
| SPEC-20 | Notification providers and channels | Production notification delivery |
| SPEC-21 | MFA mechanism and recovery design | Production staff authentication configuration |
| SPEC-22 | R1 contributor submission intake mechanism and eligibility | Community R1 submission workflow |
| SPEC-23 | Learning-achievement credential definition/criteria | Any learning-achievement issuance |
| SPEC-24 | Release cadence, maintenance windows, deployment/CI tooling | Production release process |
| SPEC-25 | Queue/workflow engine for approvals, work items and scheduled reports | Durable workflow/job implementation where needed |
| SPEC-26 | Detailed permission templates beyond approved matrices; learner visibility of significant staff access | Related detailed staff permissions/UI |
| LEG-01 | Creator licence wording and permissions | Content rights/licensing activation |
| LEG-02 | Retention periods by category | Retention/deletion scheduling and production policy |
| LEG-03 | Age eligibility/minor protections | Registration eligibility and public launch |
| LEG-04 | Credential/result wording and jurisdiction-specific obligations | Credential/public claims and market launch |
| LEG-05 | AI provider data handling, consent and model-training terms | Any external AI processing |
| LEG-06 | Jurisdiction-specific security/privacy notification duties | Incident-response legal procedures |

Company approval and legal review are separate from product-owner architecture approval. A technically implemented foundation is not permission to make unsupported legal, academic or regulatory claims.

---

## 26. Requirement traceability

During phase reviews and implementation, link each relevant PRD requirement/acceptance ID to the phase and tests that satisfy it. The following acceptance conditions are mandatory Release 1 checkpoints:

- `ACC-001`: independent learning goals and explainable path/prerequisite handling.
- `ACC-002`: optional placement and self-reported starting levels clearly labelled.
- `ACC-003`: interrupted examination attempt recovery and immutable examination/question/marking versions.
- `ACC-004`: mixed automatic/manual result finalization and evaluation provenance.
- `ACC-005`: institution private examination creation/assignment/access/results/history.
- `ACC-006`: institution member/role/cohort/assignment/report workflow.
- `ACC-007`: data separation between organizations and personal learning.
- `ACC-008`: platform content draft/review/approval/publication and immutable versions.
- `ACC-009`: issuer-aware results/credentials; course completion is not proficiency.
- `ACC-010`: personal subscriptions and institution-sponsored access operate independently.
- `ACC-011`: navigation/experience switcher and direct-request authorization.
- `ACC-012`: consent withdrawal, recording/AI safeguards and user data export.
- `ACC-013`: meaningful free learning and selected platform-created practice examinations.
- `ACC-014`: all eight Platform Operations areas usable with correct permissions.
- `ACC-015`: seven staff roles, grants/restrictions, expiry and permission history.
- `ACC-016`: staff MFA, session limits/revocation and fresh authentication.
- `ACC-017`: backend authorization on direct protected operations.
- `ACC-018`: independent dual approval, no self/conflicted approval and no bypass route.
- `ACC-019`: case-based scoped/time-limited dual-approved learner-data access and separated operations.
- `ACC-020`: append-only/tamper-evident audit, failure alerts, critical action fail-safe and read-only Auditor.
- `ACC-021`: scoped emergency access, expiry, notification and retrospective review.
- `ACC-022`: complete enforcement, content/exam lifecycle, credential administration and Trust & Safety case workflows.
- `ACC-023`: operational work assignment, handoffs, priorities and notifications.
- `ACC-024`: aggregated staff analytics, privacy guards, exports and operational monitoring.
- `ACC-025`: incident lifecycle and corrective actions.
- `ACC-026`: change/release records, readiness, deployment history and rollback/mitigation.
- `ACC-027`: operational Release 1 without manual DB changes or unauthorized workarounds.
- `ACC-028`: ownership boundaries; suspensions do not cascade incorrectly; institution/external credentials are not altered or revoked by VocaClin.
- `ACC-029`: no R1 public contributor applications/profiles/discovery/marketplace, no proficiency credential issuance and correct appeal boundary.

The full acceptance wording remains in PRD v0.4(1), Section 21.3. This list is a traceability index, not a replacement for the actual acceptance tests.

---

## 27. Phase completion record

Use this table during implementation. Do not mark a phase complete on the basis of file creation alone.

| Phase | Reviewed/approved | Implemented | Tests passed | Exit criteria verified | Notes |
|---:|---|---|---|---|---|
| 0 | Pending | — | — | — | |
| 1 | Pending | — | — | — | |
| 2 | Pending | — | — | — | |
| 3 | Pending | — | — | — | |
| 4 | Pending | — | — | — | |
| 5 | Pending | — | — | — | |
| 6 | Pending | — | — | — | |
| 7 | Pending | — | — | — | |
| 8 | Pending | — | — | — | |
| 9 | Pending | — | — | — | |
| 10 | Pending | — | — | — | |
| 11 | Pending | — | — | — | |
| 12 | Pending | — | — | — | |
| 13 | Pending | — | — | — | |
| 14 | Pending | — | — | — | |
| 15 | Pending | — | — | — | |

**Current status:** This document is an initial, detailed proposal for review. No implementation phase is marked complete by creating this file. Each phase must be discussed and approved before its implementation begins.
