"use client";

import { ArrowUpRight } from "lucide-react";
import { DISCORD_URL } from "@/lib/nav";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SealWatermark } from "@/components/ui/seal";

export function DiscordCta() {
  return (
    <section className="relative border-t border-rule">
      <SealWatermark className="-right-40 top-0 hidden lg:block" />
      <Container size="2xl" className="relative py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-4 border-b border-rule pb-5">
              <span className="font-mono text-[11px] tabular text-accent">§ 07</span>
              <span className="label label-accent">The room itself</span>
            </div>
            <Reveal>
              <h2 className="display-6 mt-8 max-w-3xl text-ink">
                The Discord is{" "}
                <span className="italic text-accent">where it actually happens.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-[17px] leading-[1.6] text-ink-soft">
                Daily trade talk, in-game reactions, league-finder threads, mock
                draft rooms, and the channel where Matt drops rankings the
                second they publish. Free, always. No bots, no spam, no funnel.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4">
            <div className="flex flex-col gap-4">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-14 items-center justify-center gap-2.5 bg-accent px-8 font-mono text-[12px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.98]"
              >
                Join the Discord
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim text-center">
                12k+ members · 8 years live · No bots
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
