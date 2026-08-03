"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AuthBookButton } from "@/components/auth/auth-book-button";
import { IMAGES } from "@/constants/images";

export function Hero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden">
      <Image
        src={IMAGES.beforeAfter}
        alt="Clean footwear delivered fast"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/90 via-[#0B1B3A]/45 to-[#0B1B3A]/20" />

      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-white/80 uppercase">
            Plugzzy Clean
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Clean shoes in 6–10 hours
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Pickup from your door. Cleaned and returned the same day. Pay after
            cleaning.
          </p>
          <AuthBookButton className="mt-8 h-12 rounded-full px-7 text-base">
            Book Cleaning
            <ArrowRight className="ml-1 h-4 w-4" />
          </AuthBookButton>
        </motion.div>
      </div>
    </section>
  );
}
