"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { ArrowUpRight } from "lucide-react";
import { Seal } from "@/components/ui/seal";
import { Container } from "@/components/ui/container";
import { DISCORD_URL } from "@/lib/nav";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div className="spotlight absolute inset-0" aria-hidden />
      <div className="hardwood absolute inset-0 opacity-50" aria-hidden />

      <Container size="2xl" className="relative pt-16 md:pt-24 pb-20 md:pb-28">
        {/* Edition slug — top-of-page identifier */}
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between border-b border-rule pb-4"
        >
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-dim">
              Vol. 8 · Issue 21 · 2026.05
            </span>
            <span className="hidden h-3 w-px bg-rule sm:block" aria-hidden />
            <span className="hidden sm:block font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent">
              World Cup ’26 · Registration · September
            </span>
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-dim">
            ISSN 0000-FBI
          </span>
        </motion.div>

        {/* Headline grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <motion.h1
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="display-7 text-ink"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
            >
              The bracket. The boards.
              <br />
              <span className="italic text-accent">The room.</span>
            </motion.h1>

            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-[17px] leading-[1.6] text-ink-soft"
            >
              The FBI World Cup is the centerpiece. The dynasty rankings are
              the boards everyone quotes. The Discord is the room behind both.
              Eight years live, no funnel, no newsletter shake.
            </motion.p>

            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/world-cup"
                className="group inline-flex h-12 items-center gap-2 bg-accent px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-ink transition-[background-color,transform] duration-200 hover:bg-accent-bright active:scale-[0.98]"
              >
                World Cup ’26
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-12 items-center gap-2 border border-rule px-7 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-[border-color,color] hover:border-accent hover:text-accent-bright"
              >
                Join the Discord
                <ArrowUpRight size={14} className="text-ink-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Sidebar — the giant seal, treated as a printed stamp */}
          <motion.aside
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.94, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex lg:col-span-4 items-center justify-center"
          >
            <div className="relative">
              <Seal size={300} className="opacity-95" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-ink-dim">
                Stamped 2018 · Renewed 2026
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Stat strip — almanac numbers across the bottom */}
        <motion.dl
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden border-y border-rule sm:grid-cols-4"
        >
          <Stat label="Years live" value={8} suffix="" />
          <Stat label="Active leagues" value={42} suffix="+" />
          <Stat label="Discord members" value={12} suffix="K+" />
          <Stat label="World Cups" value={5} suffix=" / 5" />
        </motion.dl>
      </Container>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="flex flex-col gap-4 bg-canvas px-6 py-7">
      <span className="label">{label}</span>
      <span
        className="font-display text-ink"
        style={{
          fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
          lineHeight: 0.9,
          fontWeight: 400,
          fontVariationSettings: '"opsz" 96',
        }}
      >
        <NumberFlow value={value} />
        <span className="text-accent">{suffix}</span>
      </span>
    </div>
  );
}
