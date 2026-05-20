"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PODCASTS } from "@/lib/data/podcasts";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { EditorialHeader, EditorialSection } from "./editorial-section";

export function PodcastsRow() {
  return (
    <EditorialSection className="bg-canvas-soft border-t border-rule">
      <EditorialHeader
        number="§ 04"
        marker="Three pods · one feed"
        title={
          <>
            The shows that <span className="italic text-accent">anchor the week.</span>
          </>
        }
        lede="Balls Deep is the flagship. NBA Dynasty is Matt's deep-dive on the rankings. Tank Me Later is the rebuild bible. New episode every couple of days."
        cta={{ href: "/podcasts", label: "All episodes" }}
      />

      <Stagger className="mt-16 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-3">
        {PODCASTS.map((p, i) => (
          <StaggerItem key={p.slug}>
            <Link
              href={`/podcasts#${p.slug}`}
              className="group relative flex h-full flex-col gap-6 bg-canvas p-7 transition-colors hover:bg-canvas-soft"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] tabular text-ink-dim">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  {p.cadence.split(" · ")[0]}
                </span>
              </div>

              <div className="flex items-start gap-5">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center border border-accent/30 bg-[var(--accent-soft-bg)] font-display text-[20px] text-accent"
                  style={{ fontVariationSettings: '"opsz" 36', fontWeight: 500 }}
                >
                  {p.cover}
                </div>
                <div>
                  <h3 className="display-3 text-[1.6rem] text-ink group-hover:text-accent-bright transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">{p.tagline}</p>
                </div>
              </div>

              <div className="mt-auto border-t border-rule pt-5">
                <div className="label">Latest episode</div>
                <div className="mt-3 text-[14.5px] leading-snug text-ink">
                  {p.episodes[0].title}
                </div>
                <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                  <span>ep {p.episodes[0].number} · {p.episodes[0].duration}</span>
                  <span className="inline-flex items-center gap-1 text-accent">
                    Play <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </EditorialSection>
  );
}
