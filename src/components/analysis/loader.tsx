"use client";

import { motion } from "framer-motion";

export function AnalysisLoader() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        className="relative h-20 w-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-accent" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary" />
      </motion.div>
      <motion.h1
        className="mt-8 text-2xl font-semibold tracking-tight sm:text-3xl"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        Calculating your estimate...
      </motion.h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Matching footwear type, dirt level and stains to our cleaning time rules.
      </p>
    </div>
  );
}
