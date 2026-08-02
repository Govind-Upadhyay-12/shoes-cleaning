"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, Clock3, Timer, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SpeedUsp() {
  return (
    <section id="speed" className="scroll-mt-20 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#111827] text-white shadow-xl">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-200">
              <Zap className="h-3.5 w-3.5" />
              Our #1 advantage
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              2–3× faster than typical shoe cleaning
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Most services take{" "}
              <span className="font-semibold text-white/90">24–48 hours</span>.
              ShoeSwift cleans and delivers in{" "}
              <span className="font-semibold text-blue-300">8–10 hours</span> —
              pick type &amp; dirt level, get price and delivery time instantly.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-white/45">
                  Others
                </p>
                <p className="mt-1 text-2xl font-semibold line-through decoration-red-400/80">
                  24–48h
                </p>
                <p className="mt-1 text-xs text-white/50">Slow turnaround</p>
              </div>
              <div className="rounded-2xl border border-primary/40 bg-primary/20 p-4">
                <p className="text-xs uppercase tracking-wide text-blue-200">
                  ShoeSwift
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">8–10h</p>
                <p className="mt-1 text-xs text-blue-100">Same-day delivery</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
              <ClipboardList className="h-4 w-4" />
              Instant rule-based estimate
            </div>
            <ul className="mt-5 space-y-4">
              {[
                {
                  icon: ClipboardList,
                  title: "You pick type & dirt",
                  text: "Sneakers, slippers, sandals + Low / Medium / High dirt.",
                },
                {
                  icon: Timer,
                  title: "We map clean time",
                  text: "Basic ₹299 · Deep ₹399 · Leather/Premium ₹599.",
                },
                {
                  icon: Clock3,
                  title: "Exact delivery window",
                  text: "Know when your pair returns before you book pickup.",
                },
              ].map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex gap-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/25 text-blue-200">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/55">
                      {item.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/upload"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 h-11 w-full rounded-full text-sm"
              )}
            >
              Get Instant Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
