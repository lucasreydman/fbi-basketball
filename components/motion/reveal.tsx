"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 16,
  duration = 0.6,
  className,
  as = "div",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const Component = motion[as as "div"] ?? motion.div;
  return (
    <Component
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.06,
  start = 0.04,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  start?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const reduce = useReducedMotion();
  const Component = motion[as as "div"] ?? motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : gap,
            delayChildren: reduce ? 0 : start,
          },
        },
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  y = 14,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const Component = motion[as as "div"] ?? motion.div;
  return (
    <Component
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 280, damping: 28 },
        },
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
