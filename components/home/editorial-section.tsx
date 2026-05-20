import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function EditorialHeader({
  number,
  marker,
  title,
  lede,
  cta,
  className,
}: {
  number: string;
  marker: string;
  title: React.ReactNode;
  lede?: string;
  cta?: { href: string; label: string };
  className?: string;
}) {
  return (
    <header className={cn("grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end", className)}>
      <div>
        <div className="flex items-baseline gap-4 border-b border-rule pb-5">
          <span className="font-mono text-[11px] tabular text-accent">{number}</span>
          <span className="label label-accent">{marker}</span>
        </div>
        <Reveal>
          <h2 className="display-5 mt-8 max-w-2xl text-ink">{title}</h2>
        </Reveal>
        {lede && (
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-ink-soft">{lede}</p>
          </Reveal>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="group inline-flex items-center gap-2 self-end font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-mute transition-colors hover:text-accent-bright"
        >
          {cta.label}
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </header>
  );
}

export function EditorialSection({
  children,
  className,
  containerSize = "2xl",
}: {
  children: React.ReactNode;
  className?: string;
  containerSize?: "md" | "lg" | "xl" | "2xl";
}) {
  return (
    <Section className={className}>
      <Container size={containerSize}>{children}</Container>
    </Section>
  );
}
