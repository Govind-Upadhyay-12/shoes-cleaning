"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Clock3, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { FOOTWEAR_SHOWCASE, IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.14),transparent_45%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm">
              <Zap className="h-3.5 w-3.5" />
              6–10 hrs · not 24–48
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
              <Bot className="h-3.5 w-3.5 text-primary" />
              Instant time estimate
            </span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
            India&apos;s{" "}
            <span className="text-primary">fastest</span> footwear cleaning
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Why wait{" "}
            <span className="font-semibold text-foreground/80 line-through decoration-destructive/60">
              24–48 hours
            </span>
            ? ShoeSwift cleans shoes, slippers &amp; sandals and delivers in{" "}
            <span className="font-semibold text-primary">6–10 hours</span>. Tell
            us the type &amp; dirt — get price and delivery time instantly.
          </p>

          <div className="mt-5 grid max-w-md grid-cols-3 gap-2">
            {[
              { value: "₹299", label: "Basic · 6h" },
              { value: "₹399", label: "Deep · 8h" },
              { value: "₹599", label: "Leather · 10h" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-white px-2 py-3 text-center shadow-sm"
              >
                <p className="text-lg font-bold text-primary">{item.value}</p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/upload"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-full px-6 text-base"
              )}
            >
              Get Instant Estimate
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="/#speed"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-full px-6 text-base"
              )}
            >
              Why we&apos;re faster
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_30px_80px_-40px_rgba(17,24,39,0.4)]">
            <Image
              src={IMAGES.beforeAfter}
              alt="Before and after shoe cleaning — dirty sneakers restored to clean white"
              width={900}
              height={1100}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="absolute left-3 top-3 rounded-2xl border border-border bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Clock3 className="h-3.5 w-3.5" />
              Delivery today
            </p>
            <p className="text-[11px] text-muted-foreground">Before 9 PM</p>
          </div>

          <div className="absolute -bottom-3 left-4 right-4 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:left-6 sm:right-auto sm:min-w-[240px]">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <Bot className="h-4 w-4 text-primary" />
              Estimate: Deep Clean
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              ETA 8 hours · ₹399 · same-day return
            </p>
          </div>
        </motion.div>
      </div>

      <div id="results" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-8 sm:px-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold sm:text-xl">
            Fast clean. Visible results.
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Professional cleaning proof — not product photos.
          </p>
        </div>

        <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
          {FOOTWEAR_SHOWCASE.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="w-[42vw] max-w-[160px] shrink-0 sm:w-auto sm:max-w-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary">
                <Image
                  src={item.image}
                  alt={`${item.label} cleaning`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 42vw, 180px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-[11px] text-white/75">{item.hint}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
