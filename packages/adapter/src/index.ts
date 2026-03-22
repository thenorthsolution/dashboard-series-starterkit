/**
 * packages/adapter/src/index.ts
 *
 * The dashboard-adapter package is the bridge between the Next.js web app
 * and the Discord.js bot's Express sidecar.
 *
 * Architecture overview:
 *
 *   apps/web  ──→  /lib/sidecar.ts  ──→  @repo/adapter  ──→  HTTP  ──→  apps/bot Express
 *
 * Why a separate package?
 *   - Centralises the HTTP client logic — one place to add auth headers,
 *     retries, and error handling.
 *   - Both the web app and (in theory) other consumers can import it without
 *     duplicating fetch logic.
 *   - The sidecar contract (routes, payloads) lives in @repo/types and is
 *     shared, so a change to a response shape is a compile error everywhere.
 *
 * This file is a stub. The full implementation is built in Episode 6.
 */

export type { SidecarResponse } from "@repo/types";

/**
 * Placeholder — replaced in Episode 6 with a real typed HTTP client.
 */
export const adapter = {
  /** @internal stub */
  _ready: false,
} as const;
