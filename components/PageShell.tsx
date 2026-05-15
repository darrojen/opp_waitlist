"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import Link from "next/link";
import { Logo } from "@/components/logo/logo";
import { useTheme } from "next-themes";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    const dt = document as typeof document & { startViewTransition?: (cb: () => void) => void };
    const apply = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
    };
    if (dt.startViewTransition) { dt.startViewTransition(apply); } else { apply(); }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-12 h-16 backdrop-blur-xl"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-nav)" }}
      >
        <Logo />

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: "var(--surface2)",
              color: "var(--muted)",
              border: "1px solid var(--border)",
            }}
            aria-label="Toggle dark mode"
          >
            {isDark
              ? <Sun size={15} weight="fill" style={{ color: "var(--accent)" }} />
              : <Moon size={15} weight="fill" />
            }
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-opacity hover:opacity-80"
            style={{
              border: "1px solid rgba(233,127,59,0.4)",
              background: "rgba(233,127,59,0.08)",
              color: "var(--accent)",
            }}
          >
            Join waitlist
          </Link>
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer
        className="mt-auto"
        style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="max-w-5xl mx-auto px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px]" style={{ color: "var(--muted)" }}>
            © 2026 Opphex. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[12px]" style={{ color: "var(--muted)" }}>
            <Link href="/about" className="transition-opacity hover:opacity-70">About</Link>
            <Link href="/contact" className="transition-opacity hover:opacity-70">Contact</Link>
            <Link href="/privacy" className="transition-opacity hover:opacity-70">Privacy Policy</Link>
            <Link href="/terms" className="transition-opacity hover:opacity-70">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
