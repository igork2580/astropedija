"use client";

import { m } from "framer-motion";

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export function AnimatedPage({
  children,
  className,
  delay = 0,
}: AnimatedPageProps) {
  return (
    <m.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay,
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Staggered children — animates each child in sequence               */
/* ------------------------------------------------------------------ */

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child in seconds */
  stagger?: number;
}

const listVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

export function AnimatedList({
  children,
  className,
  stagger = 0.05,
}: AnimatedListProps) {
  return (
    <m.div
      variants={{
        ...listVariants,
        animate: { transition: { staggerChildren: stagger } },
      }}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </m.div>
  );
}

export function AnimatedListItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div variants={itemVariants} className={className}>
      {children}
    </m.div>
  );
}
