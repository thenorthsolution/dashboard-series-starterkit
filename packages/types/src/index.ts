/**
 * packages/types/src/index.ts
 *
 * Shared TypeScript interfaces used by both apps/web and apps/bot.
 *
 * Keeping types in a dedicated package means:
 *   - No circular dependencies between apps
 *   - A single source of truth for data shapes that cross the API boundary
 *   - The sidecar request/response contracts are enforced at compile time
 *
 * Types are added per-episode as each feature is built:
 *   Episode 2  — GuildSummary, GuildSettings
 *   Episode 6  — SidecarRequest, SidecarResponse
 *   Episode 7  — ModerationCase, WarnPayload
 *   Episode 9  — WelcomeConfig
 *   Episode 11 — AutoRoleConfig
 */

// ─── Discord OAuth session ────────────────────────────────────────────────────

/**
 * The shape of a Discord guild as returned by Discord's /users/@me/guilds API.
 * We store a trimmed version of this in the session after login.
 */
export interface DiscordGuild {
  /** Guild snowflake ID (string — JS cannot safely handle 64-bit integers) */
  id: string;
  name: string;
  /** Icon hash — build the URL with:
   *  https://cdn.discordapp.com/icons/{id}/{icon}.webp
   */
  icon: string | null;
  /** True if the authed user has MANAGE_GUILD permission */
  owner: boolean;
  /** Bitfield of the user's permissions in this guild */
  permissions: string;
}

/**
 * Minimal Discord user stored in the NextAuth session.
 */
export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  /** Avatar hash */
  avatar: string | null;
  email?: string;
}

// ─── Sidecar API contracts (stubs — fully typed in Episode 6) ─────────────────

/**
 * Generic wrapper for all sidecar HTTP responses.
 * Using a discriminated union lets callers narrow on `ok` before accessing `data`.
 */
export type SidecarResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

// ─── Feature configs (stubs — expanded per episode) ──────────────────────────

/** Placeholder — replaced with full type in Episode 2. */
export interface GuildSummary {
  id: string;
  name: string;
  iconUrl: string | null;
  memberCount?: number;
}
