/**
 * packages/database/src/index.ts
 *
 * Prisma v7 singleton — using the @prisma/adapter-neon driver adapter.
 *
 * --- What changed in Prisma v7 ---
 *
 * 1. Driver adapters are now required.
 *    Prisma v7 removed the built-in Rust query engine. You must pass a
 *    driver adapter to `new PrismaClient({ adapter })`. For Neon we use
 *    `@prisma/adapter-neon`, which is Neon's official first-party adapter.
 *
 * 2. Import path changed.
 *    The client is no longer generated into node_modules. It's generated
 *    into the path specified by `output` in schema.prisma — in our case
 *    `./generated/client`. Always import from that path, not `@prisma/client`.
 *
 * 3. Singleton must also cover the adapter/pool.
 *    The adapter wraps a connection pool. To get the same hot-reload
 *    protection we had before, we store both the pool and the client
 *    on globalThis so they survive Next.js module reloads.
 *
 * --- DATABASE_URL vs DIRECT_URL ---
 *
 *   prisma.config.ts  →  DIRECT_URL   (CLI / migrations — bypasses PgBouncer)
 *   PrismaNeon here   →  DATABASE_URL (runtime queries  — uses Neon's pooler)
 *
 * Usage in any app or package:
 *   import { db } from "@repo/database";
 *   const guild = await db.guild.findUnique({ where: { id: "..." } });
 */

import path from "node:path";
import { config } from "dotenv";
import { PrismaClient } from "./generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";

/**
 * Load .env from the monorepo root.
 *
 * This file may be imported by Next.js (which handles its own env loading)
 * or by the bot/sidecar (which does not). Calling config() here is safe in
 * both cases — dotenv skips any variable that is already set in process.env,
 * so Next.js's own values are never overwritten.
 *
 * path.resolve(__dirname, "../../../.env") works in both environments:
 *   dev:  __dirname = packages/database/src   → ../../../.env = discord-dashboard/.env ✓
 *   prod: __dirname = packages/database/dist  → ../../../.env = discord-dashboard/.env ✓
 */
config({ path: path.resolve(__dirname, "../../../.env") });

// We type globalThis loosely so TypeScript doesn't complain about the
// custom properties we're adding. These are development-only guards.
const globalForPrisma = globalThis as unknown as {
  __prismaClient: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "[database] DATABASE_URL is not set. Copy .env.example → .env and fill it in.",
    );
  }

  /**
   * PrismaNeon accepts the pooled Neon connection string directly.
   * It handles WebSocket-based connections internally, which is how
   * Neon's HTTP/WS pooler works in serverless environments.
   */
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const db = globalForPrisma.__prismaClient ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prismaClient = db;
}

// Re-export generated types so consumers don't need to import directly
// from the generated path (which is an implementation detail they
// shouldn't need to know about).
export * from "./generated/client";
