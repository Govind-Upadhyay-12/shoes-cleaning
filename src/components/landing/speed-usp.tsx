"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/constants/images";

export function SpeedUsp() {
  return (
    <section id="speed" className="scroll-mt-20 bg-[#0B1B3A] text-white">
      <div className="mx-auto grid max-w-6xl items-stretch lg:grid-cols-2">
        <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
          <Image
            src={IMAGES.delivery}
            alt="Doorstep delivery of cleaned footwear"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-transparent to-transparent lg:bg-gradient-to-r" />
        </div>

        <div className="px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-[0.18em] text-blue-300 uppercase">
              Our USP
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              2–3× faster than typical shoe cleaning
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Most services take a day or two. Plugzzy Clean is built for
              same-day turnaround — so you get your pair back while you still
              need them.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <p className="text-xs tracking-wide text-white/45 uppercase">
                  Others
                </p>
                <p className="mt-2 text-2xl font-semibold line-through decoration-red-400/80 sm:text-3xl">
                  24–48h
                </p>
                <p className="mt-1 text-sm text-white/50">Slow wait</p>
              </div>
              <div className="rounded-2xl border border-blue-400/40 bg-blue-500/20 p-4 sm:p-5">
                <p className="text-xs tracking-wide text-blue-200 uppercase">
                  Plugzzy Clean
                </p>
                <p className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  6–10h
                </p>
                <p className="mt-1 text-sm text-blue-100">Same-day delivery</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
