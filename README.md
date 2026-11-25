# VocaClin

VocaClin is a healthcare-language learning and assessment platform. This repository is implementing Release 1 in the phase order defined by [`scope.md`](./scope.md). The current app is a responsive Phase 1 foundation preview; learner, institution, contributor and Platform Operations workflows are not yet implemented.

## Start here

- [`AGENTS.md`](./AGENTS.md): repository-wide implementation rules and release boundaries.
- [`scope.md`](./scope.md): authoritative Release 1 implementation plan, phase order, acceptance criteria and open decisions.
- [`docs/design-inventory.md`](./docs/design-inventory.md): proposed mapping of supplied desktop/mobile screen references; route and release decisions require review.
- [`docs/open-decisions.md`](./docs/open-decisions.md): owner-dependent implementation and launch gates.
- [`docs/architecture/`](./docs/architecture/): project structure, module ownership and dependency constraints.
- [`docs/development/local-development.md`](./docs/development/local-development.md): setup, development and verification commands.
- [`docs/decisions/README.md`](./docs/decisions/README.md): how durable engineering decisions are recorded.
- [`designs/design-system.png`](./designs/design-system.png): VocaClin visual source of truth; responsive screen references live under `designs/desktop/` and `designs/mobile/`.

## Current state

Phase 1 establishes the VocaClin design tokens, shared responsive shell, public foundation preview and developer checks. The public landing-page design and proposed feature routes still require product review; no account, learner, institution or operations workflow is implied by this preview. Do not implement deferred capabilities or infer features solely from a mockup.

## Local development

Use pnpm 11.21.0. Install with `pnpm install --frozen-lockfile`, then run `pnpm dev`. Available verification scripts are `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm test:e2e` and `pnpm build`. See [`docs/development/local-development.md`](./docs/development/local-development.md) for details. Do not commit environment files or credentials.
