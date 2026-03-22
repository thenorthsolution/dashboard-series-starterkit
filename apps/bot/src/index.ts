/**
 * apps/bot/src/index.ts
 *
 * Entry point for the Discord.js v14 bot.
 *
 * What lives here right now (Episode 1):
 *   - Load env vars from the monorepo root .env
 *   - Create a minimal Client with the intents we'll need throughout the series
 *   - Log a ready message so we can confirm the bot connects during setup
 *
 * What gets added in later episodes:
 *   - Command handler (Episode 5)
 *   - Event handler (Episode 5)
 *   - Express sidecar server (Episode 6)
 *   - Feature modules: moderation, welcome, auto-role, etc.
 */

import path from "node:path";
import { config } from "dotenv";
import { Client, GatewayIntentBits, Partials } from "discord.js";

/**
 * Load .env from the monorepo root.
 *
 * `import "dotenv/config"` resolves .env relative to the CWD. When
 * ts-node-dev or `node dist/index.js` is launched by Turborepo, the CWD
 * is apps/bot — so the root .env is never found without an explicit path.
 *
 * path.resolve(__dirname, "../../.env") works in both environments:
 *   dev:  __dirname = apps/bot/src   → ../../.env = discord-dashboard/.env ✓
 *   prod: __dirname = apps/bot/dist  → ../../.env = discord-dashboard/.env ✓
 */
config({ path: path.resolve(__dirname, "../../../.env") });

/**
 * Validate that the required env variable is present before doing anything.
 * Failing loudly here prevents confusing runtime errors later.
 */
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error(
    "[bot] ❌  DISCORD_TOKEN is not set. Copy .env.example → .env and fill it in.",
  );
  process.exit(1);
}

/**
 * The Discord.js Client.
 *
 * Intents declare which gateway events Discord will send us.
 * We request a broad set upfront so we don't have to revisit this
 * each episode. Only request what your bot actually needs in production —
 * privileged intents (GuildMembers, MessageContent) must be enabled in the
 * Discord Developer Portal under your app → Bot → Privileged Gateway Intents.
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // guild create/update/delete
    GatewayIntentBits.GuildMembers, // member join/leave (privileged)
    GatewayIntentBits.GuildMessages, // messages in guild channels
    GatewayIntentBits.MessageContent, // read message content (privileged)
    GatewayIntentBits.GuildModeration, // bans, timeouts
    GatewayIntentBits.GuildVoiceStates, // voice channel events
  ],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember],
});

/**
 * ready fires once the bot has connected and is ready to receive events.
 * { once: true } ensures this handler only runs on the first ready event —
 * Discord.js can emit ready again after a reconnect, and we don't want
 * to re-run initialisation logic in that case.
 */
client.once("ready", (readyClient) => {
  console.log(`[bot] ✅  Logged in as ${readyClient.user.tag}`);
  console.log(`[bot]     Serving ${readyClient.guilds.cache.size} guild(s)`);
});

/**
 * Global error handlers — keeps the process alive on unhandled promise
 * rejections (common when Discord's API returns an unexpected error).
 */
process.on("unhandledRejection", (error) => {
  console.error("[bot] Unhandled rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("[bot] Uncaught exception:", error);
  process.exit(1);
});

// Connect to Discord
client.login(token);
