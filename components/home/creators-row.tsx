"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CREATORS } from "@/lib/data/creators";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { EditorialHeader, EditorialSection } from "./editorial-section";

export function CreatorsRow() {
  return (
    <EditorialSection>
      <EditorialHeader
        number="§ 05"
        marker="The voices"
        title={
          <>
            Three creators. <span className="italic text-accent">Same standard.</span>
          </>
        }
        lede="The people behind the rankings, the bracket, and every take that makes it onto the feed. Their individual work is worth subscribing to, separately."
        cta={{ href: "/creators", label: "Full bios" }}
      />

      <Stagger className="mt-16 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-3">
        {CREATORS.map((c, i) => (
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
                    {c.role.split(" · ").slice(0, 2).join(" · ")}
                  </div>
                </div>
              </div>

              <p className="text-[14px] leading-[1.65] text-ink-soft flex-1">{c.bio}</p>

              <div className="flex flex-wrap gap-2 border-t border-rule pt-5">
                {c.patreon && (
                  <a
                    href={c.patreon}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-accent/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent hover:text-accent-ink"
                  >
                    Patreon <ArrowUpRight size={11} />
                  </a>
                )}
                {c.twitter && (
                  <a
                    href={c.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                  >
                    X / Twitter <ArrowUpRight size={11} />
                  </a>
                )}
                <Link
                  href={`/creators#${c.slug}`}
                  className="inline-flex items-center gap-1.5 border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:border-accent hover:text-ink"
                >
                  Bio
                </Link>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </EditorialSection>
  );
}
