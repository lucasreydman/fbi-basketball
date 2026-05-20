import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-mono uppercase tracking-[0.22em]",
    "transition-[transform,background-color,border-color,color] duration-200",
    "ease-[cubic-bezier(0.22,1,0.36,1)]",
    "select-none",
    "active:scale-[0.98]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-accent-ink",
          "hover:bg-accent-bright",
          "shadow-[0_1px_0_oklch(0.50_0.130_50)]",
          "hover:shadow-[0_2px_0_oklch(0.50_0.130_50)]",
        ],
        secondary: [
          "border border-rule text-ink",
          "hover:border-accent hover:text-accent-bright",
        ],
        ghost: [
          "text-ink-mute hover:text-ink",
        ],
        link: [
          "text-ink-mute hover:text-accent-bright underline-offset-4 hover:underline tracking-[0.22em]",
        ],
      },
      size: {
        sm:   "h-8  px-4   text-[10px]",
        md:   "h-10 px-5   text-[11px]",
        lg:   "h-12 px-7   text-[12px]",
        xl:   "h-14 px-9   text-[13px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & { external?: boolean };

export function ButtonLink({
  className,
  variant,
  size,
  external,
  ...props
}: ButtonLinkProps) {
  if (external) {
    return (
      <a
        href={typeof props.href === "string" ? props.href : "#"}
        target="_blank"
        rel="noreferrer"
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {props.children}
      </a>
    );
  }
  return (
    <Link
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
}
