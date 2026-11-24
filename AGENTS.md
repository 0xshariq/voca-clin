<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## VocaClin Release 1 implementation guidance

- Implement **Release 1 only**. The attached intern discussion describes the broader, long-term product direction; treat later-release ideas as context, not authorization to build them. Do not expand scope into deferred capabilities without explicit approval.
- `scope.md` is the implementation plan and source of truth for Release 1 scope, phase order, planned files, acceptance/exit criteria, and open decisions. Read the relevant sections before implementing a feature. Follow its review gates and do not silently resolve open product decisions or skip required phase approval.
- Product designs and screen references are in `designs/`. Before building or changing a screen, locate and review its relevant desktop and mobile design, and use `designs/design-system.png` for the visual system. Preserve responsive behavior and do not invent a conflicting UI where a design exists.
- Keep future-facing foundations distinct from future user-facing functionality. Build only the Release 1 behaviors defined in `scope.md`; defer explicit exclusions and later phases until approved.
- If the implementation plan and a design appear inconsistent, do not silently broaden or reinterpret Release 1. Record the discrepancy and ask for clarification when it blocks implementation.

