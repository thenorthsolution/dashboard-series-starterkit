/**
 * packages/database/prisma.config.ts
 *
 * Prisma v7 configuration file.
 *
 * --- Why this file exists ---
 * Prisma v7 removes the `url` property from the `datasource` block in
 * `schema.prisma`. All connection configuration now lives here instead.
 * This is a hard breaking change — prisma generate / db push will throw
 * error P1012 if you still have `url = env(...)` in your schema file.
 *
 * --- Why we load .env from the monorepo root ---
 * Prisma v7 no longer auto-loads .env files. We must load it manually.
 * We anchor to __dirname (packages/database) and resolve ../../.env so
 * the correct root .env is found regardless of the CWD at invocation time.
 *
 * path.resolve(__dirname, "../../.env") works in both environments:
 *   CLI run from packages/database:  __dirname = packages/database → ../../.env ✓
 *   CLI run from repo root:          __dirname = packages/database → ../../.env ✓
 *
 * --- Neon + two URLs ---
 * Neon provides two connection strings:
 *   DATABASE_URL  — pooled (PgBouncer). Used at runtime by the PrismaNeon
 *                   adapter in src/index.ts. Toggle "Connection pooling: ON"
 *                   in the Neon dashboard to get this string.
 *   DIRECT_URL    — direct (non-pooled). Used by the Prisma CLI here via
 *                   datasource.url. Migrations need a direct connection;
 *                   PgBouncer blocks the session-level DDL statements that
 *                   `prisma migrate` and `prisma db push` send.
 *                   Toggle "Connection pooling: OFF" to get this string.
 *
 * Concretely:
 *   prisma.config.ts datasource.url       → DIRECT_URL  (CLI / migrations)
 *   PrismaNeon adapter connectionString   → DATABASE_URL (runtime queries)
 */

import path from "node:path";
import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

/**
 * Explicitly load .env from the monorepo root before Prisma reads any
 * env() calls below. Without this, `env("DIRECT_URL")` would return
 * undefined because Prisma v7 no longer auto-loads .env files.
 */
config({ path: path.resolve(__dirname, "../../.env") });

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),

  migrations: {
    path: path.join("prisma", "migrations"),
  },

  /**
   * datasource.url is used exclusively by the Prisma CLI.
   * We use DIRECT_URL here so CLI commands bypass PgBouncer, which does
   * not support the session-level DDL statements that migrations require.
   *
   * If you only have one URL (e.g. a self-hosted Postgres without pooling),
   * you can use DATABASE_URL here and remove DIRECT_URL from your .env.
   */
  datasource: {
    url: env("DIRECT_URL"),
  },
});
