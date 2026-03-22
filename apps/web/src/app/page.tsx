/**
 * apps/web/src/app/page.tsx
 *
 * Root landing page — placeholder until Episode 3 (Auth).
 * Shows the project name and confirms the stack is wired up correctly.
 * Once auth is added this will redirect logged-in users to /dashboard.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
          D
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Discord Dashboard</h1>
        <p className="text-muted-foreground">
          The North Solution — open-source starter kit
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
        <p>
          ✅ Next.js 15 · Tailwind v4 · shadcn/ui · TypeScript
        </p>
      </div>
    </main>
  );
}
