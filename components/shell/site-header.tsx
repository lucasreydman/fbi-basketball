"use client";

import Link from "next/link";
import { useState } from "react";
import { Drawer } from "vaul";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Seal } from "@/components/ui/seal";
import { PRIMARY_NAV, DISCORD_URL } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 md:px-10">
        {/* Left — brand mark with year tick */}
        <Link
          href="/"
          className="group flex items-center gap-3 justify-self-start"
          aria-label="Fantasy Basketball International — home"
        >
          <Seal size={28} priority />
          <div className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[14px] font-medium tracking-tight text-ink">
              Fantasy Basketball Int<span className="italic">&apos;</span>l
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.32em] text-ink-dim">
              FBI · est. 2018
            </span>
          </div>
        </Link>

        {/* Center — nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right — CTA */}
        <div className="hidden lg:flex justify-self-end items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
            12k+ members
          </span>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 bg-accent px-4 h-9 font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] duration-200 hover:bg-accent-bright active:scale-[0.98]"
          >
            Discord
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="justify-self-end text-ink lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer — vaul */}
      <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[100] bg-canvas/70 backdrop-blur-sm" />
          <Drawer.Content className="fixed inset-y-0 right-0 z-[101] flex w-[88%] max-w-[420px] flex-col bg-canvas border-l border-rule outline-none">
            <Drawer.Title className="sr-only">Menu</Drawer.Title>
            <div className="flex h-16 items-center justify-between border-b border-rule px-6">
              <Seal size={24} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-ink"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col p-6" aria-label="Mobile">
              {PRIMARY_NAV.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "grid grid-cols-[32px_1fr_auto] items-baseline gap-3 border-b border-rule py-5 transition-colors hover:text-accent-bright",
                  )}
                >
                  <span className="font-mono text-[10px] tabular text-ink-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[22px] text-ink">{item.label}</span>
                  <ArrowUpRight size={16} className="text-ink-mute" />
                </Link>
              ))}
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex items-center justify-center gap-2 bg-accent py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink"
              >
                Join the Discord
                <ArrowUpRight size={14} />
              </a>
            </nav>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </header>
  );
}
