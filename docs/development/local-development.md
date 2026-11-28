# Local development

Use the repository's declared package manager and scripts. This phase configures local development and browser preview only; it does not select production hosting or service providers.

## Toolchain

- Package manager: pnpm `11.21.0`.
- Runtime: Next.js `16.4.6`, React `19.3.0`, TypeScript `^5`.
- Styling/components: Tailwind CSS v4 and shadcn/ui Base components.
- Formatting/lint: Biome `2.4.2`.
- Tests: Vitest for unit tests and Playwright for browser tests.
- The registered workspace preview runs `pnpm dev` on port 3000. Playwright reuses that development server locally when available.

## Setup and checks

1. Install the supported Node.js version and pnpm 11.21.0.
2. Run `pnpm install --frozen-lockfile`.
3. Run `pnpm dev` to start the app.
4. Use `pnpm typecheck`, `pnpm lint`, and `pnpm test` for local checks.
5. Install Playwright Chromium once if needed with `pnpm exec playwright install chromium`, then run `pnpm test:e2e`.
6. Run `pnpm build` for a production build. Do not use it to start the development preview.

No application environment variables are required for the Phase 1 foundation. Do not commit `.env` files, secrets, user data or copied credentials. Production integrations and providers must be approved and connected in their relevant phases.

## Still open

- Product-owner review gates for proposed feature routes and R1/later-release mappings remain open; the public homepage was explicitly authorized as a Phase 1 presentation surface.
- Database provider/hosting, authentication provider approval, production hosting, worker/queue hosting and CI remain later-phase decision gates in `scope.md`.
