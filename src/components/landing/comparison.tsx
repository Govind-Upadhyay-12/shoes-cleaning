"use client";

import { Check, X, Zap } from "lucide-react";
import { motion } from "framer-motion";

const others = [
  "24–48 hours turnaround",
  "Manual inspection only",
  "No ETA until late",
  "Slow pickup slots",
  "No live tracking",
];

const ours = [
  "8–10 hours turnaround",
  "Instant dirt → time rules",
  "Instant delivery window",
  "Same-day pickup",
  "Live order tracking",
];

export function Comparison() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
            <Zap className="h-3.5 w-3.5" />
            Speed is our USP
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Why wait 24–48 hours?
          </h2>
          <p className="mt-2 text-muted-foreground">
            ShoeSwift is built for same-day cleaning — powered by AI estimates.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          <div className="rounded-3xl border border-border bg-background p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-muted-foreground">
                Others
              </h3>
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-destructive">
                24–48h
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {others.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-destructive">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-primary/30 bg-accent/60 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">ShoeSwift</h3>
              <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                8–10h
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {ours.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-success">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
