# Local development baseline

This is the observed repository baseline as of the Phase 0 review. Follow repository scripts rather than substituting another package manager. This document does not add or approve production infrastructure.

## Current toolchain

- Package manager: pnpm `11.21.0` (declared in `package.json`).
- Runtime dependency: Next.js `16.4.6`, React `19.3.0`, TypeScript `^5`.
- Formatter/linter: Biome `2.4.2`.
- Local website: `pnpm dev` (script `next dev`). The existing workspace preview uses port 3000; a port is not a hard requirement for other local environments.
- Current scripts: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint` (`biome check`), and `pnpm format` (`biome format --write`).
- No test runner, typecheck script, database migration command or worker runner is configured in the current package manifest.

## Setup and checks

1. Install the Node.js version supported by the repository/workspace and pnpm 11.21.0.
2. Install dependencies with `pnpm install --frozen-lockfile` when the lockfile is current.
3. Run `pnpm dev` for the development server.
4. `pnpm lint` runs the configured Biome check. `pnpm build` is a production build, not a preview startup command.
5. Before production logic is written, Phase 0 decisions must select the test framework and runtime validation library; an approved later phase must add their dependencies, scripts and conventions.

Do not assume database, Clerk, object storage, email, AI or queue credentials exist. Use only approved project integrations and documented environment-variable names. Never commit `.env` files, secrets, user data or copied credentials. The Vercel preview environment may inject configured values; do not print their values during diagnostics.

## Known gaps (not Phase 0 implementation)

- The starter README previously described generic create-next-app instructions rather than VocaClin setup; it is replaced with project links and scope boundaries.
- No `docs/` files or testing framework are present in the checked-out baseline; Phase 0 adds architecture and decision guidance only, not dependencies or production code.
- Supported Node.js version, runtime schema library, test framework, CI commands, database provider/hosting, authentication provider approval and worker/queue hosting remain decision gates in `scope.md`.
