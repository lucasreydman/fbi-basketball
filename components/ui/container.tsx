import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  size = "xl",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: "md" | "lg" | "xl" | "2xl" }) {
  const widths = {
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    "2xl": "max-w-[1440px]",
  };
  return (
    <div
      className={cn("mx-auto w-full px-6 md:px-10", widths[size], className)}
      {...props}
    />
  );
}

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-24 md:py-32", className)} {...props} />;
}

export function SectionMarker({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline gap-4 border-b border-rule pb-6", className)}>
      <span className="font-mono text-[11px] tabular text-accent">{number}</span>
      <span className="label label-accent">{label}</span>
    </div>
  );
}
