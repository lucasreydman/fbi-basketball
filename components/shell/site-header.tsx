"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { PRIMARY_NAV, DISCORD_URL } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center" aria-label="FBI home">
          <Wordmark size="md" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-ash transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-orange px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-obsidian transition-colors hover:bg-orange-bright"
            style={{ borderRadius: 2 }}
          >
            Join Discord →
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-bone lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-rule bg-canvas lg:hidden",
          open ? "max-h-[600px]" : "max-h-0",
          "transition-all duration-200",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 font-mono text-[12px] uppercase tracking-[0.22em] text-ash hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block bg-orange px-5 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-obsidian"
            style={{ borderRadius: 2 }}
          >
            Join Discord →
          </a>
        </nav>
      </div>
    </header>
  );
}
