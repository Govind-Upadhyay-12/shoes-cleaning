"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AuthBookButton } from "@/components/auth/auth-book-button";
import { IMAGES } from "@/constants/images";

export function Hero() {
  return (
    <section className="relative isolate min-h-[85svh] overflow-hidden bg-[#0B1B3A]">
      <Image
        src={IMAGES.beforeAfter}
        alt="Dirty sneakers cleaned and restored by Plugzzy Clean"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,27,58,0.35)_0%,rgba(11,27,58,0.55)_45%,rgba(11,27,58,0.92)_100%)]" />

      <div className="relative mx-auto flex min-h-[85svh] w-full max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold tracking-[0.22em] text-blue-200 uppercase sm:text-base">
            Plugzzy Clean
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Not 24–48 hours.
            <span className="mt-1 block text-blue-300">Back in 6–10.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            First cleaning up to 50% off. Same-day return in 6–10 hours. Pay
            after cleaning.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <AuthBookButton className="h-12 rounded-full px-7 text-base shadow-lg shadow-black/20">
              Book · up to 50% off
              <ArrowRight className="ml-1 h-4 w-4" />
            </AuthBookButton>
            <p className="text-sm text-white/65 sm:pl-2">
              From ₹149 on first clean
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
