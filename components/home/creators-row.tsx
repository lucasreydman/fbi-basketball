"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CREATORS, type FollowLink } from "@/lib/data/creators";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { EditorialHeader, EditorialSection } from "./editorial-section";

const PLATFORM_LABEL: Record<FollowLink["platform"], string> = {
  Patreon: "Patreon",
  Substack: "Substack",
  X: "X",
  YouTube: "YouTube",
  RotoWire: "RotoWire",
  RotoBaller: "RotoBaller",
  Bluesky: "Bluesky",
  Linktree: "Linktree",
  "Ko-fi": "Ko-fi",
};

export function CreatorsRow() {
  return (
    <EditorialSection>
      <EditorialHeader
        number="§ 04"
        marker="The voices"
        title={
          <>
            Three creators.{" "}
            <span className="italic text-accent">Subscribe to the source.</span>
          </>
        }
        lede="The people behind the rankings, the bracket, and every take that runs the day. Each of them publishes on a different platform — Patreon, Substack, RotoWire, X — whichever one's yours, subscribe direct."
        cta={{ href: "/creators", label: "Full bios" }}
      />

      <Stagger className="mt-16 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-3">
        {CREATORS.map((c, i) => {
          const primary = c.links.find((l) => l.primary) ?? c.links[0];
          const secondary = c.links.filter((l) => l !== primary);
          return (
            <StaggerItem key={c.slug}>
              <div className="relative flex h-full flex-col gap-6 bg-canvas-soft p-7">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] tabular text-ink-dim">
                    {String(i + 1).padStart(2, "0")} / 03
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                    {c.handle}
                  </span>
                </div>

                <div className="flex items-start gap-5">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center border border-accent/30 bg-[var(--accent-soft-bg)] font-display text-[26px] text-accent"
                    style={{ fontVariationSettings: '"opsz" 48' }}
                  >
                    {c.name[0]}
                  </div>
                  <div>
                    <h3 className="display-3 text-[1.6rem] text-ink">{c.name}</h3>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                      {c.role}
                    </div>
                  </div>
                </div>

                <p className="text-[14px] leading-[1.65] text-ink-soft flex-1">{c.bio}</p>

                <div className="flex flex-col gap-2 border-t border-rule pt-5">
                  <a
                    href={primary.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-between bg-accent px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink transition-colors hover:bg-accent-bright"
                  >
                    <span>{primary.label}</span>
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  {secondary.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {secondary.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                        >
                          {PLATFORM_LABEL[l.platform]} <ArrowUpRight size={11} />
                        </a>
                      ))}
                      <Link
                        href={`/creators#${c.slug}`}
                        className="inline-flex items-center gap-1.5 border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                      >
                        Bio
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </EditorialSection>
  );
}
