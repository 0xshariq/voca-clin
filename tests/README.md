# Test strategy

Automated tests live outside `src/` and follow the ownership rules in `scope.md`.

## Commands

- `pnpm test` runs unit tests with Vitest.
- `pnpm test:e2e` runs browser checks with Playwright. The Playwright config starts Next.js on port 3000 when no local server is already running, and reuses an existing server outside CI.
- On a fresh machine without a Playwright Chromium browser, run `pnpm exec playwright install chromium` once before `pnpm test:e2e`.

## Test ownership

- `tests/unit/` covers isolated, meaningful logic such as shared navigation behavior.
- `tests/e2e/` checks the rendered public foundation and responsive shell in a real browser.
- Add module, database and API tests only alongside the corresponding approved implementation phases. Keep fixtures and helpers under the existing `tests/fixtures/` and `tests/helpers/` directories.
