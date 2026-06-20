# Discord Bot Boilerplate

Reusable TypeScript Discord.js v14 starter for Personal Discord bot projects.

This boilerplate follows the shared architecture used by:

- `discord-image-upload-control-bot`
- `discord-color-bot`

It includes a working `/ping` command, command deployment, centralized environment parsing, guild-scoped JSON storage, logging, linting, and type checking.

## Requirements

- Node.js 20+
- Discord bot token
- Discord application client ID
- Development Discord guild ID

## Setup

Install dependencies:

```bash
npm install
```

Create environment files from `.env.example`:

```text
DISCORD_TOKEN=...
CLIENT_ID=...
GUILD_ID=... # dev only
DATA_DIR=./data-dev
NODE_ENV=development
```

Use `.env.dev` for guild-scoped development commands and `.env.prod` for production.

## Scripts

```bash
npm run verify
npm run deploy:dev
npm run start:dev
npm run deploy:prod
npm run start:prod
```

`start:prod` deploys production commands before starting the bot.

## Structure

```text
src/
  index.ts
  deploy-commands.ts
  client/
    client.ts
  commands/
    base.ts
    definitions.ts
    registry.ts
    ping/
      definition.ts
      build.ts
      handlers.ts
      index.ts
  config/
    app.ts
    constants.ts
    env.ts
  handlers/
    interaction.ts
  storage/
    storage.ts
  types/
    types.ts
  utilities/
    logger.ts
    utilities.ts
```

## Adding A Command

1. Add the command name to `src/commands/definitions.ts`.
2. Create `src/commands/<feature>/definition.ts`.
3. Build the slash command in `src/commands/<feature>/build.ts`.
4. Put command behavior in `src/commands/<feature>/handlers.ts`.
5. Export the command contract from `src/commands/<feature>/index.ts`.
6. Register the command in `src/commands/registry.ts`.

Feature-specific interactions such as buttons, select menus, and autocomplete should be routed in `src/handlers/interaction.ts`.

## Storage

Guild data is stored under:

```text
DATA_DIR/guilds/<guild-id>/store.json
```

Storage modules normalize all loaded JSON before returning it to the rest of the app. Invalid JSON is backed up with an `.invalid-<timestamp>` suffix and replaced with default data.
