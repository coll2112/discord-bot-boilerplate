# Agent Rules

Use these rules when building from this boilerplate.

## Project Defaults

- Use TypeScript, Node.js 20+, `discord.js` v14, ESM, and `tsx`.
- Keep `package.json` at `1.0.0` for a fresh bot. Increment deliberately after the bot has real releases.
- Keep secrets in env files. Never hardcode tokens, client IDs, guild IDs, channel IDs, role IDs, or data paths.
- Run `npm run verify` before considering work complete.
- Prefer focused feature folders over large shared files.

## Architecture

- `src/index.ts` only bootstraps the client, registers Discord event listeners, logs readiness, and routes events to handlers.
- `src/client/client.ts` owns gateway intents.
- `src/config/env.ts` owns environment access and path resolution.
- `src/config/app.ts` owns app metadata and schema version.
- `src/config/constants.ts` owns reusable user-facing messages and static constants.
- `src/handlers/interaction.ts` routes Discord interaction types.
- `src/commands/registry.ts` is the single command lookup, deployment data, and command error boundary.
- `src/storage/storage.ts` owns file-backed persistence and normalization.
- `src/types/types.ts` owns shared domain types.
- `src/utilities/` is for reusable pure helpers and small infrastructure helpers.

## Command Pattern

Each command feature should use:

```text
src/commands/<feature>/
  definition.ts
  build.ts
  handlers.ts
  index.ts
```

- Put names, descriptions, subcommand names, option names, and literal types in `definition.ts`.
- Build `SlashCommandBuilder` objects only in `build.ts`.
- Put behavior in `handlers.ts`.
- Export one command object from `index.ts` that satisfies the shared `Command` contract.
- Register top-level commands in `src/commands/registry.ts`.
- Use ephemeral replies for errors, admin actions, and user-specific state unless the feature needs public output.
- Defer replies for operations that touch Discord APIs, storage, network calls, or multiple messages.

## Interaction Pattern

- Route autocomplete, buttons, select menus, modals, and slash commands from `src/handlers/interaction.ts`.
- Return immediately after handling an interaction.
- Scope custom IDs with stable prefixes such as `feature:action:value`.
- Do not let one feature respond to another feature's custom IDs.
- Check `interaction.guild` before guild-only behavior.

## Storage Pattern

- Store guild state under `DATA_DIR/guilds/<guild-id>/`.
- Normalize all JSON loaded from disk before returning it.
- Ignore invalid rows where reasonable instead of taking the bot offline.
- Back up invalid JSON before replacing it.
- Keep schema versions in app/config data.
- Expose update helpers for common mutations rather than scattering load/save calls.

## Discord API Rules

- Fetch Discord resources by stored ID when available.
- Treat slash command values, custom IDs, autocomplete values, env values, and disk JSON as untrusted input.
- Prefer idempotent mutations. Tolerate missing deleted resources and stale stored IDs.
- Keep bot role hierarchy and permissions in mind before mutating roles, messages, channels, or members.

## Deployment

- Keep deployment in `src/deploy-commands.ts`.
- Deploy dev commands to `GUILD_ID` for fast iteration.
- Deploy production commands globally.
- Reuse `getCommandData()` from the command registry.
- Do not duplicate command JSON in deployment code.
