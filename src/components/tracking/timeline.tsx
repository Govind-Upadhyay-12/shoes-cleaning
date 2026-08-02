"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TRACKING_STEPS } from "@/constants";
import { cn } from "@/lib/utils";

type Props = {
  currentIndex: number;
};

export function Timeline({ currentIndex }: Props) {
  return (
    <ol className="space-y-0">
      {TRACKING_STEPS.map((step, index) => {
        const done = index <= currentIndex;
        const active = index === currentIndex;
        return (
          <motion.li
            key={step}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {index < TRACKING_STEPS.length - 1 && (
              <span
                className={cn(
                  "absolute left-[15px] top-8 h-[calc(100%-16px)] w-px",
                  index < currentIndex ? "bg-primary" : "bg-border"
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                done
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-white text-muted-foreground"
              )}
            >
              {done ? <Check className="h-4 w-4" /> : index + 1}
            </span>
            <div className="pt-1">
              <p className={cn("font-medium", active && "text-primary")}>{step}</p>
              {active && (
                <p className="mt-1 text-sm text-muted-foreground">In progress</p>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
