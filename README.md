# Discord Dashboard — The North Solution

> Open-source, production-ready Discord bot dashboard starter kit.  
> Built live across a 16-episode YouTube tutorial series.

[![License: MIT](https://img.shields.io/badge/License-MIT-blurple.svg)](LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-orange)](https://pnpm.io)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Discord.js](https://img.shields.io/badge/Discord.js-v14-5865F2)](https://discord.js.org)

---

## What is this?

A full-stack starter kit that gives you a production-ready dashboard for your Discord bot — with authentication, per-guild settings, moderation tools, welcome messages, and more — all wired up and ready to customise.

**Tech stack:**

| Layer      | Technology                                         |
| ---------- | -------------------------------------------------- |
| Frontend   | Next.js 16, App Router, Tailwind CSS v4, shadcn/ui |
| Auth       | NextAuth v5, Discord OAuth2                        |
| Bot        | Discord.js v14, TypeScript                         |
| Database   | Prisma ORM + PostgreSQL (Neon.tech)                |
| Bridge     | Express sidecar (bot ↔ dashboard)                  |
| Monorepo   | Turborepo + pnpm workspaces                        |
| Deployment | Vercel (web) · Railway (bot + DB)                  |

---

## Monorepo Structure

```
discord-dashboard/
├── apps/
│   ├── web/          → Next.js 16 dashboard
│   └── bot/          → Discord.js v14 bot
├── packages/
│   ├── database/     → Prisma client + schema (shared)
│   ├── types/        → Shared TypeScript interfaces
│   └── adapter/      → HTTP bridge (web → bot sidecar)
├── turbo.json
├── pnpm-workspace.yaml
└── .env.example
```

---

## Quick Start

### Prerequisites

- **Node.js** ≥ 20 — [nodejs.org](https://nodejs.org)
- **pnpm** ≥ 9 — `npm install -g pnpm`
- A **Discord Application** — [discord.com/developers](https://discord.com/developers/applications) (free)
- A **Neon.tech** PostgreSQL database — [neon.tech](https://neon.tech) (free tier works)

### 1 — Clone & install

```bash
git clone https://github.com/your-org/discord-dashboard.git
cd discord-dashboard
pnpm install
```

### 2 — Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

- `DATABASE_URL` + `DIRECT_URL` from your Neon dashboard
- `DISCORD_TOKEN` from your bot's settings page
- `DISCORD_CLIENT_ID` + `DISCORD_CLIENT_SECRET` from OAuth2 settings
- `AUTH_SECRET` — generate with `openssl rand -base64 32`

### 3 — Push the database schema

```bash
pnpm db:push
```

### 4 - Add ShadCN

- Go to [https://ui.shadcn.com/create](https://ui.shadcn.com/create)

```bash
cd apps/web
```

Paste pnpm command created by the page into terminal. After that is done, run:

```bash
pnpm dlx shadcn@latest add button card badge separator avatar skeleton switch tabs sheet dialog sonner select dropdown-menu
```

---

### 5 — Run in development

```bash
pnpm dev
```

- Web dashboard: [http://localhost:3000](http://localhost:3000)
- Bot sidecar: [http://localhost:4000](http://localhost:4000)

---

## Deployment

### Web (Vercel)

1. Connect your GitHub repo in the Vercel dashboard
2. Set **Root Directory** to `apps/web`
3. Add all env variables from `.env.example`
4. Deploy — Vercel detects Next.js automatically

### Bot + Database (Railway)

1. Create a new Railway project
2. Add a **PostgreSQL** service (or keep using Neon)
3. Add a new service from your repo, set root to `apps/bot`
4. Set all env variables
5. Railway builds and deploys automatically on push

Full deployment walkthrough in **Episode 15**.

---

## Contributing

This repo is the reference implementation for the tutorial series.  
Issues and PRs welcome — please open a discussion first for large changes.

---

## License

MIT — see [LICENSE](LICENSE) for details.
