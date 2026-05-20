"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { LEAGUE_OFFERINGS } from "@/lib/data/leagues";
import { Dot } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { EditorialHeader, EditorialSection } from "./editorial-section";

const STATUS_DOT: Record<string, "accent" | "positive" | "dim"> = {
  open: "positive",
  waitlist: "accent",
  full: "dim",
};
const STATUS_LABEL: Record<string, string> = {
  open: "Open · register now",
  waitlist: "Waitlist · contact",
  full: "Full · closed",
};

export function LeaguesStrip() {
  return (
    <EditorialSection>
      <EditorialHeader
        number="§ 01"
        marker="Leagues"
        title={
          <>
            Four formats.{" "}
            <span className="italic text-accent">One commissioner standard.</span>
          </>
        }
        lede="From draft-and-log-off to year-round dynasty wars. Every league is vet-managed, commissioner-run, and full of people who'll actually trade with you."
        cta={{ href: "/leagues", label: "All formats" }}
      />

      <Stagger className="mt-16 grid gap-px overflow-hidden border border-rule bg-rule md:grid-cols-2 lg:grid-cols-4">
        {LEAGUE_OFFERINGS.map((l, i) => (
          <StaggerItem key={l.slug}>
            <Link
              href="/leagues"
              className="group relative flex h-full flex-col gap-6 bg-canvas-soft p-7 transition-colors hover:bg-surface"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tabular text-ink-dim">
                  {String(i + 1).padStart(2, "0")} / 04
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  <Dot tone={STATUS_DOT[l.spots]} />
                  {STATUS_LABEL[l.spots]}
                </span>
              </div>

              <div>
                <h3 className="display-3 text-ink group-hover:text-accent-bright transition-colors">
                  {l.name}
                </h3>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {l.format}
                </div>
              </div>

              <p className="text-[14px] leading-[1.65] text-ink-soft flex-1">{l.blurb}</p>

              <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-rule pt-4">
                <Meta label="Size" value={l.size} />
                <Meta label="Cadence" value={l.cadence.split(" · ")[0]} />
              </div>

              <ArrowUpRight
                size={16}
                className="absolute right-7 bottom-7 text-ink-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </EditorialSection>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-dim">{label}</div>
      <div className="mt-1 text-[12.5px] text-ink-soft">{value}</div>
    </div>
  );
}
