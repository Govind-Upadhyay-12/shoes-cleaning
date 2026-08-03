"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/constants/images";

const steps = [
  {
    n: "01",
    title: "Share your pair",
    text: "Upload photos and pick type + dirt level. Instant price and time.",
    image: IMAGES.soleCompare,
  },
  {
    n: "02",
    title: "We pick up",
    text: "Doorstep pickup at your preferred slot. No store visit needed.",
    image: IMAGES.delivery,
  },
  {
    n: "03",
    title: "Back in 6–10 hours",
    text: "Cleaned, checked, delivered. Pay only after cleaning.",
    image: IMAGES.beforeAfter,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
            Simple process
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            How Plugzzy Clean works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three clear steps from dirty pair to doorstep delivery.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="overflow-hidden rounded-[1.5rem] border border-border bg-background"
            >
              <div className="relative aspect-[16/11]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-sm font-semibold text-primary">{step.n}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
