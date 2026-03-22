/**
 * apps/web/src/app/layout.tsx
 *
 * Root layout — wraps every page in the app.
 * - Sets dark mode class on <html> (shadcn/ui reads this)
 * - Loads Geist font (Next.js built-in, no external request)
 * - Renders the Toaster for global toast notifications (added later)
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Discord Dashboard",
    template: "%s — Discord Dashboard",
  },
  description: "Open-source Discord bot dashboard starter kit — The North Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
