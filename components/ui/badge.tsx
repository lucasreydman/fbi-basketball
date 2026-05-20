import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 whitespace-nowrap",
    "font-mono uppercase tracking-[0.22em] text-[10px] font-medium",
    "px-2.5 py-1",
  ],
  {
    variants: {
      tone: {
        ink:      "text-ink-mute border border-rule",
        accent:   "text-accent border border-accent/40 bg-[var(--accent-soft-bg)]",
        solid:    "text-accent-ink bg-accent",
        positive: "text-positive border border-positive/40",
        negative: "text-negative border border-negative/40",
        dim:      "text-ink-dim border border-rule-soft",
      },
    },
    defaultVariants: { tone: "ink" },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export function Dot({ tone = "accent" }: { tone?: "accent" | "positive" | "negative" | "dim" }) {
  const map = {
    accent: "bg-accent",
    positive: "bg-positive",
    negative: "bg-negative",
    dim: "bg-ink-dim",
  };
  return <span className={cn("inline-block size-1.5 rounded-full", map[tone])} aria-hidden />;
}
