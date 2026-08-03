"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AuthBookButton } from "@/components/auth/auth-book-button";
import { IMAGES } from "@/constants/images";

const tiers = [
  {
    name: "Basic",
    price: "₹299",
    time: "6 hours",
    text: "Dust, light stains, odor refresh",
  },
  {
    name: "Deep",
    price: "₹399",
    time: "8 hours",
    text: "Mud, stains, sole scrub",
    featured: true,
  },
  {
    name: "Premium",
    price: "₹599",
    time: "10 hours",
    text: "Leather & delicate care",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
              Low prices
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Fast cleaning that stays affordable
            </h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Clear pricing. No surprise fees. Pay only after your pair is
              cleaned.
            </p>

            <div className="mt-8 space-y-3">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-4 sm:px-5 ${
                    tier.featured
                      ? "border-primary/30 bg-accent"
                      : "border-border bg-background"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-foreground">
                      {tier.name}
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        · {tier.time}
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {tier.text}
                    </p>
                  </div>
                  <p className="shrink-0 text-2xl font-semibold text-primary">
                    {tier.price}
                  </p>
                </div>
              ))}
            </div>

            <AuthBookButton className="mt-8 h-12 rounded-full px-6">
              Get your price
              <ArrowRight className="ml-1 h-4 w-4" />
            </AuthBookButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[5/6] lg:aspect-auto lg:min-h-[520px]"
          >
            <Image
              src={IMAGES.cleaningProcess}
              alt="Professional footwear cleaning in progress"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
