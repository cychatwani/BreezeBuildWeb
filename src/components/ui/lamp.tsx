"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/*
 * Aceternity LampContainer, adapted for BreezeBuild.
 *
 * Changes from the source:
 *  - the stray duplicate `LampDemo` is removed; it referenced LampContainer
 *    before definition and does not belong in the component file
 *  - `bg-gradient-conic` is a Tailwind v3 class with no v4 equivalent, and the
 *    from-/via-/to- stops it depended on are replaced by explicit inline
 *    conic-gradients, so the beams do not rely on --tw-gradient-stops
 *  - cyan -> BreezeBuild orange, slate-950 -> the page's #0a0a0a
 */

const BEAM = "#F97316";
const CORE = "#FB923C";
const SURFACE = "#0a0a0a";

export const LampContainer = ({
  children,
  className,
  contentClassName,
}: {
  children: React.ReactNode;
  className?: string;
  /** Overrides the content wrapper, whose default centres and lifts children 20rem. */
  contentClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md",
        className,
      )}
      style={{ backgroundColor: SURFACE }}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${BEAM}, transparent, transparent)`,
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible text-white"
        >
          <div
            className="absolute bottom-0 left-0 z-20 h-40 w-[100%] [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ backgroundColor: SURFACE }}
          />
          <div
            className="absolute bottom-0 left-0 z-20 h-[100%] w-40 [mask-image:linear-gradient(to_right,white,transparent)]"
            style={{ backgroundColor: SURFACE }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${BEAM})`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white"
        >
          <div
            className="absolute right-0 bottom-0 z-20 h-[100%] w-40 [mask-image:linear-gradient(to_left,white,transparent)]"
            style={{ backgroundColor: SURFACE }}
          />
          <div
            className="absolute right-0 bottom-0 z-20 h-40 w-[100%] [mask-image:linear-gradient(to_top,white,transparent)]"
            style={{ backgroundColor: SURFACE }}
          />
        </motion.div>

        <div
          className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"
          style={{ backgroundColor: SURFACE }}
        />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: BEAM }}
        />

        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{ backgroundColor: CORE }}
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
          style={{ backgroundColor: CORE }}
        />

        <div
          className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"
          style={{ backgroundColor: SURFACE }}
        />
      </div>

      <div
        className={cn(
          "relative z-50 flex -translate-y-80 flex-col items-center px-5",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default LampContainer;
