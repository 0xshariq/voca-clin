# VocaClin

VocaClin is a healthcare-language learning and assessment platform. This repository is currently in Phase 0: Release 1 scope and engineering-baseline review. The long-term product direction is context only; implementation is limited to the approved Release 1 scope.

## Start here

- [`AGENTS.md`](./AGENTS.md): repository-wide implementation rules.
- [`scope.md`](./scope.md): authoritative Release 1 implementation plan, phase order, boundaries, acceptance criteria and open decisions.
- [`docs/design-inventory.md`](./docs/design-inventory.md): proposed mapping of the 34 desktop/mobile screen pairs in `designs/` to experiences and routes. Route/release decisions require review.
- [`docs/open-decisions.md`](./docs/open-decisions.md): owner-dependent implementation and launch gates.
- [`docs/architecture/`](./docs/architecture/): project structure, module ownership and dependency constraints.
- [`docs/development/local-development.md`](./docs/development/local-development.md): observed package/runtime commands and setup gaps.
- [`docs/decisions/README.md`](./docs/decisions/README.md): how durable engineering decisions are recorded.
- [`designs/design-system.png`](./designs/design-system.png): VocaClin visual source of truth; paired responsive screen references live under `designs/desktop/` and `designs/mobile/`.

## Current state

The repository contains a Next.js starter and planned source/test directory scaffolding. Most feature files are placeholders; directory presence is not evidence of an implemented capability. Phase 0 is documentation/review work and must not add production source or test files. Do not implement a future-release capability solely because it appears in the long-term discussion or a design mockup.

## Local development

The observed package manager is pnpm 11.21.0. Install from the lockfile with `pnpm install --frozen-lockfile`, then run `pnpm dev`. See [`docs/development/local-development.md`](./docs/development/local-development.md) for the available scripts and unresolved tooling decisions. Do not commit environment files or credentials.
