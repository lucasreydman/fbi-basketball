import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "relative flex flex-col",
    "transition-[border-color,background-color,transform] duration-200",
    "ease-[cubic-bezier(0.22,1,0.36,1)]",
  ],
  {
    variants: {
      variant: {
        bordered: "border border-rule bg-canvas-soft",
        flat:     "bg-canvas-soft",
        bare:     "bg-transparent",
        accent:   "border border-accent/30 bg-[var(--accent-soft-bg)]",
      },
      padding: {
        none: "",
        sm:   "p-5",
        md:   "p-6",
        lg:   "p-8",
        xl:   "p-10",
      },
      interactive: {
        true: "hover:border-accent hover:bg-surface cursor-pointer hover:-translate-y-0.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "bordered",
      padding: "md",
      interactive: false,
    },
  }
);

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export function Card({ className, variant, padding, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      {...props}
    />
  );
}
