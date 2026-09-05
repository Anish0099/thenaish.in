"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** When true, animate on scroll into view. Default false — animates on mount. */
  onView?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  y = 12,
  onView = false,
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>
    );
  }

  const transition = {
    duration: 0.5,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  if (onView) {
    return (
      <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={transition}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
