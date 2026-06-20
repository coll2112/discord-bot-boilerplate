# Discord Bot Architecture Ruleset

This project is the reusable baseline for Personal TypeScript Discord bots.

Use `AGENTS.md` as the short operational ruleset. This document is a human-readable companion that explains the intended shape:

- Bootstrap in `src/index.ts`.
- Gateway intents in `src/client/client.ts`.
- Environment parsing in `src/config/env.ts`.
- Slash command registration and command error handling in `src/commands/registry.ts`.
- One folder per command feature.
- Interaction routing in `src/handlers/interaction.ts`.
- Guild-scoped JSON storage in `src/storage/storage.ts`.
- Shared domain types in `src/types/types.ts`.
- Reusable pure helpers in `src/utilities/`.

When adding features, keep bot-specific behavior in feature modules. Only move code into shared utilities after at least two modules need it or the helper is clearly infrastructural.
