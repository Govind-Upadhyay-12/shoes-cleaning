"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FOOTWEAR_SHOWCASE } from "@/constants/images";

export function Results() {
  return (
    <section id="results" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
            Real results
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Before dirty. After Plugzzy Clean.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Sneakers, slippers, sandals, soles — cleaned properly, delivered
            fast.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {FOOTWEAR_SHOWCASE.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className={`relative overflow-hidden rounded-3xl bg-secondary ${
                index === 0
                  ? "col-span-2 aspect-[16/10] md:col-span-2 md:aspect-[16/11] lg:col-span-2"
                  : "aspect-[4/5]"
              }`}
            >
              <Image
                src={item.image}
                alt={`${item.label} — ${item.hint}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 sm:p-4">
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-white/75">{item.hint}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
