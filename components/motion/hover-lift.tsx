"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function HoverLift({
  children,
  className,
  scale = 1.01,
  y = -2,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? {} : { scale, y }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
