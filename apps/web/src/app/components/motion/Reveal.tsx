import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import { revealVariants, revealViewport } from "@/app/components/motion/motionPresets.ts";

type RevealProps = ComponentPropsWithoutRef<typeof motion.div>;

export function Reveal({ children, ...props }: RevealProps) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}
