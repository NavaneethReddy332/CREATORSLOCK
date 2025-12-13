import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
  },
};

const pageTransition = {
  duration: 0.25,
  ease: "easeOut" as const,
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

interface ExpandTransitionProps {
  children: ReactNode;
  isVisible: boolean;
}

const expandVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    height: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    height: "auto",
  },
};

const expandTransition = {
  duration: 0.3,
  ease: "easeOut" as const,
};

export function ExpandTransition({ children, isVisible }: ExpandTransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={expandVariants}
          transition={expandTransition}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
