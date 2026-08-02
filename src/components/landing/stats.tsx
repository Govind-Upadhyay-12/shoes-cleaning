"use client";

import { motion } from "framer-motion";
import { Bot, Clock3, Timer, Zap } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: "8–10h",
    label: "Our delivery",
    sub: "vs 24–48h others",
    highlight: true,
  },
  {
    icon: Bot,
    value: "AI",
    label: "Dirt detection",
    sub: "Instant scan",
    highlight: false,
  },
  {
    icon: Timer,
    value: "6–10h",
    label: "Time predicted",
    sub: "Per clean type",
    highlight: false,
  },
  {
    icon: Clock3,
    value: "Same day",
    label: "Pickup + return",
    sub: "Door to door",
    highlight: false,
  },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-8 sm:gap-4 sm:px-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className={
              stat.highlight
                ? "rounded-3xl border border-primary/30 bg-accent p-4 text-center sm:p-5"
                : "rounded-3xl border border-border bg-background p-4 text-center sm:p-5"
            }
          >
            <stat.icon
              className={`mx-auto h-4 w-4 ${stat.highlight ? "text-primary" : "text-muted-foreground"}`}
            />
            <p
              className={`mt-2 text-2xl font-semibold tracking-tight sm:text-3xl ${stat.highlight ? "text-primary" : ""}`}
            >
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium">{stat.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{stat.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
