"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/constants/images";

const steps = [
  { title: "Upload dirty pair", image: IMAGES.cleaningProcess },
  { title: "AI checks dirt level", image: IMAGES.sandalsCleaning },
  { title: "Get clean estimate", image: IMAGES.soleCompare },
  { title: "We pick up", image: IMAGES.delivery },
  { title: "Back fresh in 8–10h", image: IMAGES.beforeAfter },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          How cleaning works
        </h2>
        <p className="mt-2 text-muted-foreground">
          From dirty footwear to doorstep delivery.
        </p>
      </div>

      <div className="hide-scrollbar -mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="w-[70vw] max-w-[220px] shrink-0 overflow-hidden rounded-3xl border border-border bg-white shadow-sm md:w-auto md:max-w-none"
          >
            <div className="relative h-36">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
                sizes="220px"
              />
              <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold shadow">
                {index + 1}
              </span>
            </div>
            <div className="p-4">
              <p className="font-semibold">{step.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
